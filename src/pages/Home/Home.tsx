import { useState, useEffect, useMemo, useCallback, ChangeEvent } from 'react';

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

	const [currentPage, setCurrentPage] = useState<number>(1);

	const [pokemonListByPagination, setPokemonListByPagination] = useState<PokemonResultItem[]>([]);

	const totalPages: number = useMemo(
		() => Math.ceil(pokemonListResult.results.length / DEFAULT_PAGE_SIZE),
		[pokemonListResult]
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
		const startIndex: number = (currentPage - 1) * DEFAULT_PAGE_SIZE;

		setPokemonListByPagination(
			pokemonListResult.results.slice(startIndex, startIndex + DEFAULT_PAGE_SIZE)
		);
	}, [pokemonListResult, currentPage]);

	const onChangeFromPagination = useCallback((event: ChangeEvent<unknown>, newPage: number) => {
		setCurrentPage(newPage);
	}, []);

	const pokemonItems: JSX.Element[] = pokemonListByPagination.map((resultItem) => (
		<PokemonItem key={resultItem.url} imageUrl='' title={resultItem.name} />
	));

	const pagination: JSX.Element = (
		<styled.PaginationContainer>
			<Pagination
				color='primary'
				size='large'
				page={currentPage}
				count={totalPages}
				onChange={onChangeFromPagination}
			/>
		</styled.PaginationContainer>
	);

	return (
		<styled.Home>
			<Typography variant='h3' component='h1' sx={{ fontWeight: 'bold' }}>
				Pokemon finder
			</Typography>

			<styled.SubTitle variant='subtitle1'>El que quiere Pokemons, que los busque.</styled.SubTitle>

			<styled.SearchContainer>
				<TextField placeholder='Ingrese el nombre a buscar' variant='outlined' size='small' />

				<Button variant='contained' size='small'>
					Buscar
				</Button>
			</styled.SearchContainer>

			<styled.ResultsTitle variant='h4'>Resultados de la búsqueda</styled.ResultsTitle>

			{pagination}

			<styled.PokemonItemsContainer>{pokemonItems}</styled.PokemonItemsContainer>

			{pagination}
		</styled.Home>
	);
};

export default Home;
