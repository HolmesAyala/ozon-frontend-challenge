import { useState, useEffect } from 'react';

import * as styled from './styled';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PokemonItem from './components/PokemonItem';

import { getPokemonList, PokemonListResult } from '../../api/get-pokemon-list';

const Home = () => {
	const [pokemonListResult, setPokemonListResult] = useState<PokemonListResult>({ results: [] });

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

	const pokemonItems: JSX.Element[] = pokemonListResult.results.map((resultItem) => (
		<PokemonItem key={resultItem.url} imageUrl='' title={resultItem.name} />
	));

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

			<styled.PokemonItemsContainer>{pokemonItems}</styled.PokemonItemsContainer>
		</styled.Home>
	);
};

export default Home;
