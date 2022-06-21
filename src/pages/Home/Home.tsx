import { useState, useEffect, useMemo, useCallback, ChangeEvent } from 'react';
import { debounce, escapeRegExp } from 'lodash';

import * as styled from './styled';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import PokemonItem from './components/PokemonItem';

import { getPokemonList, PokemonListResult, PokemonResultItem } from '../../api/get-pokemon-list';

const DEFAULT_PAGE_SIZE: number = 50;

type PokemonDetail = {
	imageUrl: string;
	loadingData: boolean;
};

const Home = () => {
	const [pokemonListResult, setPokemonListResult] = useState<PokemonListResult>({ results: [] });

	const [pokemonDetailMap, setPokemonDetailMap] = useState<{
		[pokemonId: string]: PokemonDetail | undefined;
	}>({});

	const [searchDebounced, setSearchDebounced] = useState<string>('');

	const [pokemonListBySearch, setPokemonListBySearch] = useState<PokemonResultItem[]>([]);

	const debounceSearch = useMemo(
		() =>
			debounce((searchValue: string) => {
				setSearchDebounced(searchValue);
				setCurrentPage(1);
			}, 250),
		[]
	);

	const [currentPage, setCurrentPage] = useState<number>(1);

	const totalPages: number = useMemo(
		() => Math.ceil(pokemonListBySearch.length / DEFAULT_PAGE_SIZE),
		[pokemonListBySearch]
	);

	const [pokemonListByPagination, setPokemonListByPagination] = useState<PokemonResultItem[]>([]);

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
		const regExp = new RegExp(escapeRegExp(searchDebounced), 'gi');

		setPokemonListBySearch(
			pokemonListResult.results.filter((resultItem) => resultItem.name.match(regExp))
		);
	}, [searchDebounced, pokemonListResult]);

	useEffect(() => {
		const startIndex: number = (currentPage - 1) * DEFAULT_PAGE_SIZE;

		setPokemonListByPagination(
			pokemonListBySearch.slice(startIndex, startIndex + DEFAULT_PAGE_SIZE)
		);
	}, [pokemonListBySearch, currentPage]);

	const onChangeFromSearchField = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			debounceSearch(event.target.value);
		},
		[debounceSearch]
	);

	const onChangeFromPagination = useCallback((event: ChangeEvent<unknown>, newPage: number) => {
		setCurrentPage(newPage);
	}, []);

	const pokemonItems: JSX.Element[] = pokemonListByPagination.map((resultItem) => (
		<PokemonItem key={resultItem.url} imageUrl='' title={resultItem.name} />
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
		searchDebounced.trim() && pokemonListByPagination.length === 0 ? (
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

				<Button variant='contained' size='small'>
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
