import { useState, useEffect, useMemo, useCallback, ChangeEvent, KeyboardEvent } from 'react';

import * as styled from './styled';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import PokemonItem from './components/PokemonItem';

import characterPlaceholderImage from './assets/character-placeholder.webp';

import { getPokemonList, PokemonListResult, PokemonResultItem } from '../../api/get-pokemon-list';
import { getPokemonDetail } from '../../api/get-pokemon-detail';

import { getPokemonListPaginated, getPokemonListBySearch } from './utils';

export const MAIN_TITLE = 'Pokemon finder';

export const PLACEHOLDER = {
	SEARCH_FIELD: 'Ingrese el nombre a buscar',
};

export const MESSAGES = {
	EMPTY_SEARCH: 'No hay elementos que coincidan con la búsqueda',
	WITHOUT_ITEMS_TO_SHOW: 'No hay elementos que mostrar',
};

const DEFAULT_PAGE_SIZE: number = 28;

type PokemonDetail = {
	imageUrl: string;
};

type HomeProps = {
	pageSize?: number;
};

const Home = ({ pageSize = DEFAULT_PAGE_SIZE }: HomeProps) => {
	const [pokemonListResult, setPokemonListResult] = useState<PokemonListResult>({ results: [] });

	const [pokemonDetailMap, setPokemonDetailMap] = useState<{
		[pokemonUrl: string]: PokemonDetail | undefined;
	}>({});

	const [searchValue, setSearchValue] = useState<string>('');

	const [pokemonListBySearch, setPokemonListBySearch] = useState<PokemonResultItem[]>([]);

	const [currentPage, setCurrentPage] = useState<number>(1);

	const totalPages: number = useMemo(
		() => Math.ceil(pokemonListBySearch.length / pageSize),
		[pokemonListBySearch, pageSize]
	);

	const [pokemonListByPagination, setPokemonListByPagination] = useState<PokemonResultItem[]>([]);

	const loadPokemonDetail = useCallback(async (urls: string[]) => {
		try {
			const pokemonDetailList = await Promise.all(urls.map((url) => getPokemonDetail(url)));

			setPokemonDetailMap((currentValue) => {
				const currentValueCopy = { ...currentValue };

				pokemonDetailList.forEach((pokemonDetail, index) => {
					currentValueCopy[urls[index]] = {
						imageUrl: pokemonDetail.sprites.front_default ?? characterPlaceholderImage,
					};
				});

				return currentValueCopy;
			});
		} catch (error) {
			console.error(error);
		}
	}, []);

	const searchPockemonItems = useCallback(
		(search: string) => {
			setCurrentPage(1);

			const pokemonListFilteredBySearch = getPokemonListBySearch(search, pokemonListResult.results);
			const pokemonListPaginated = getPokemonListPaginated(
				1,
				pageSize,
				pokemonListFilteredBySearch
			);
			const pokemonUrlAlreadyLoaded = Object.keys(pokemonDetailMap);

			const pokemonUrlsToLoad: string[] = pokemonListPaginated
				.filter((pokemonResultItem) =>
					pokemonUrlAlreadyLoaded.every(
						(urlAlreadyLoaded) => pokemonResultItem.url !== urlAlreadyLoaded
					)
				)
				.map((pokemonResultItem) => pokemonResultItem.url);

			setPokemonListBySearch(pokemonListFilteredBySearch);
			setPokemonListByPagination(pokemonListPaginated);

			if (pokemonUrlsToLoad.length > 0) loadPokemonDetail(pokemonUrlsToLoad);
		},
		[pokemonListResult, pokemonDetailMap, loadPokemonDetail, pageSize]
	);

	useEffect(() => {
		const loadAndSortPokemonList = async () => {
			try {
				const pokemonListResult: PokemonListResult = await getPokemonList({
					query: { limit: 10000 },
				});

				pokemonListResult.results.sort((itemA, itemB) => itemA.name.localeCompare(itemB.name));

				setPokemonListResult(pokemonListResult);
			} catch (error) {
				console.error(error);
			}
		};

		loadAndSortPokemonList();
	}, []);

	useEffect(() => {
		const pokemonListFilteredBySearch = getPokemonListBySearch('', pokemonListResult.results);
		const pokemonListPaginated = getPokemonListPaginated(1, pageSize, pokemonListFilteredBySearch);

		setPokemonListBySearch(pokemonListFilteredBySearch);
		setPokemonListByPagination(pokemonListPaginated);
		loadPokemonDetail(pokemonListPaginated.map((pokemonItem) => pokemonItem.url));
	}, [pokemonListResult, loadPokemonDetail, pageSize]);

	const onClickFromSearchButton = useCallback(() => {
		searchPockemonItems(searchValue);
	}, [searchPockemonItems, searchValue]);

	const onChangeFromSearchField = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const { value: searchValue } = event.target;

			setSearchValue(searchValue);

			if (searchValue === '') {
				searchPockemonItems('');
			}
		},
		[searchPockemonItems]
	);

	const onKeyDownFromSearchField = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				searchPockemonItems(searchValue);
			}
		},
		[searchPockemonItems, searchValue]
	);

	const onChangeFromPagination = useCallback(
		(event: ChangeEvent<unknown>, newPage: number) => {
			setCurrentPage(newPage);

			const pokemonListPaginated = getPokemonListPaginated(newPage, pageSize, pokemonListBySearch);

			const pokemonUrlAlreadyLoaded = Object.keys(pokemonDetailMap);

			const pokemonUrlsToLoad: string[] = pokemonListPaginated
				.filter((pokemonResultItem) =>
					pokemonUrlAlreadyLoaded.every(
						(urlAlreadyLoaded) => pokemonResultItem.url !== urlAlreadyLoaded
					)
				)
				.map((pokemonResultItem) => pokemonResultItem.url);

			setPokemonListByPagination(pokemonListPaginated);
			loadPokemonDetail(pokemonUrlsToLoad);
		},
		[pokemonListBySearch, loadPokemonDetail, pokemonDetailMap, pageSize]
	);

	const pokemonItems: JSX.Element[] = pokemonListByPagination.map((resultItem) => (
		<PokemonItem
			key={resultItem.url}
			imageUrl={pokemonDetailMap[resultItem.url]?.imageUrl ?? characterPlaceholderImage}
			title={resultItem.name}
		/>
	));

	const pagination: JSX.Element | undefined =
		totalPages > 1 ? (
			<styled.PaginationContainer>
				<Pagination
					color='primary'
					size='large'
					page={currentPage}
					count={totalPages}
					onChange={onChangeFromPagination}
				/>
			</styled.PaginationContainer>
		) : undefined;

	const emptyMessage: JSX.Element | undefined =
		pokemonListByPagination.length === 0 ? (
			<styled.EmptyMessage variant='body1' role='alert'>
				{searchValue.trim() ? MESSAGES.EMPTY_SEARCH : MESSAGES.WITHOUT_ITEMS_TO_SHOW}
			</styled.EmptyMessage>
		) : undefined;

	return (
		<styled.Home>
			<Typography variant='h3' component='h1' sx={{ fontWeight: 'bold' }}>
				{MAIN_TITLE}
			</Typography>

			<styled.SubTitle variant='subtitle1'>El que quiere Pokemons, que los busque.</styled.SubTitle>

			<styled.SearchContainer>
				<TextField
					placeholder={PLACEHOLDER.SEARCH_FIELD}
					variant='outlined'
					size='small'
					onChange={onChangeFromSearchField}
					onKeyDown={onKeyDownFromSearchField}
				/>

				<Button variant='contained' size='small' onClick={onClickFromSearchButton}>
					Buscar
				</Button>
			</styled.SearchContainer>

			<styled.ResultsTitle variant='h4'>Resultados de la búsqueda</styled.ResultsTitle>

			{pagination}

			{pokemonItems.length > 0 && (
				<styled.PokemonItemsContainer>{pokemonItems}</styled.PokemonItemsContainer>
			)}

			{emptyMessage}

			{pagination}
		</styled.Home>
	);
};

export default Home;
