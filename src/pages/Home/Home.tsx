import * as styled from './styled';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PokemonItem from './components/PokemonItem';

const Home = () => {
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

			<styled.PokemonItemsContainer>
				<PokemonItem
					imageUrl='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg'
					title='ivysaur'
				/>

				<PokemonItem
					imageUrl='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg'
					title='ivysaur with a name very very long'
				/>

				<PokemonItem
					imageUrl='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg'
					title='ivysaur'
				/>

				<PokemonItem
					imageUrl='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg'
					title='ivysaur'
				/>

				<PokemonItem
					imageUrl='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg'
					title='ivysaur'
				/>
			</styled.PokemonItemsContainer>
		</styled.Home>
	);
};

export default Home;
