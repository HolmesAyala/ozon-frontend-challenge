import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { DEFAULT_THEME } from '../../../../styles/default-theme';
import PokemonItem, { ARIA_LABEL } from './PokemonItem';

describe('PokemonItem', () => {
	test('Should render pokemon data', () => {
		const pokemonImageUrl = 'http://custom-url/image';
		const pokemonName = 'Pokemon name';

		render(
			<ThemeProvider theme={DEFAULT_THEME}>
				<PokemonItem imageUrl={pokemonImageUrl} title={pokemonName} />
			</ThemeProvider>
		);

		const imageElement = screen.getByLabelText<HTMLImageElement>(ARIA_LABEL.POKEMON_IMAGE);
		const nameElement = screen.getByLabelText(ARIA_LABEL.POKEMON_NAME);

		expect(imageElement.src).toBe(pokemonImageUrl);
		expect(nameElement).toHaveTextContent(pokemonName);
	});
});
