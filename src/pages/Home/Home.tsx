import { useState, useEffect, useMemo, useCallback, ChangeEvent } from 'react';
import { escapeRegExp } from 'lodash';

import * as styled from './styled';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import PokemonItem from './components/PokemonItem';

import characterPlaceholderImage from './assets/character-placeholder.webp';

import { getPokemonList, PokemonListResult, PokemonResultItem } from '../../api/get-pokemon-list';
import { getPokemonDetail } from '../../api/get-pokemon-detail';

const DEFAULT_PAGE_SIZE: number = 28;

const getPokemonListBySearch = (search: string, pokemonList: PokemonResultItem[]) => {
	const regExp = new RegExp(escapeRegExp(search), 'gi');

	return pokemonList.filter((resultItem) => resultItem.name.match(regExp));
};

const getPokemonListPaginated = (
	page: number,
	pokemonList: PokemonResultItem[]
): PokemonResultItem[] => {
	const startIndex: number = (page - 1) * DEFAULT_PAGE_SIZE;

	const pokemonListPaginated = pokemonList.slice(startIndex, startIndex + DEFAULT_PAGE_SIZE);

	return pokemonListPaginated;
};

type PokemonDetail = {
	imageUrl: string;
};

const Home = () => {
	const [pokemonListResult, setPokemonListResult] = useState<PokemonListResult>({ results: [] });

	const [pokemonDetailMap, setPokemonDetailMap] = useState<{
		[pokemonUrl: string]: PokemonDetail | undefined;
	}>({});

	const [searchValue, setSearchValue] = useState<string>('');

	const [pokemonListBySearch, setPokemonListBySearch] = useState<PokemonResultItem[]>([]);

	const [currentPage, setCurrentPage] = useState<number>(1);

	const totalPages: number = useMemo(
		() => Math.ceil(pokemonListBySearch.length / DEFAULT_PAGE_SIZE),
		[pokemonListBySearch]
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
		const pokemonListPaginated = getPokemonListPaginated(1, pokemonListFilteredBySearch);

		setPokemonListBySearch(pokemonListFilteredBySearch);
		setPokemonListByPagination(pokemonListPaginated);
		loadPokemonDetail(pokemonListPaginated.map((pokemonItem) => pokemonItem.url));
	}, [pokemonListResult, loadPokemonDetail]);

	const onClickFromSearchButton = useCallback(() => {
		setCurrentPage(1);

		const pokemonListFilteredBySearch = getPokemonListBySearch(
			searchValue,
			pokemonListResult.results
		);
		const pokemonListPaginated = getPokemonListPaginated(1, pokemonListFilteredBySearch);
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
		loadPokemonDetail(pokemonUrlsToLoad);
	}, [pokemonListResult, searchValue, pokemonDetailMap, loadPokemonDetail]);

	const onChangeFromSearchField = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	}, []);

	const onChangeFromPagination = useCallback(
		(event: ChangeEvent<unknown>, newPage: number) => {
			setCurrentPage(newPage);

			const pokemonListPaginated = getPokemonListPaginated(newPage, pokemonListBySearch);

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
		[pokemonListBySearch, loadPokemonDetail, pokemonDetailMap]
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

	const withoutResults: JSX.Element | undefined =
		searchValue.trim() && pokemonListByPagination.length === 0 ? (
			<styled.WithoutResults variant='body1'>
				No hay elementos que coincidan con la búsqueda
			</styled.WithoutResults>
		) : undefined;

	return (
		<styled.Home>
			<Typography variant='h3' component='h1' sx={{ fontWeight: 'bold' }}>
				Pokemon finder
			</Typography>

			<styled.SubTitle variant='subtitle1'>El que quiere Pokemons, que los busque.</styled.SubTitle>

			<styled.SearchContainer>
				<TextField
					placeholder='Ingrese el nombre a buscar'
					variant='outlined'
					size='small'
					onChange={onChangeFromSearchField}
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

			{withoutResults}

			{pagination}
		</styled.Home>
	);
};

export default Home;
