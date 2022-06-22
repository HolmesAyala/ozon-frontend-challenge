import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';

import { DEFAULT_THEME } from '../../styles/default-theme';

import { PokemonListResult } from '../../api/get-pokemon-list';
import * as getPokemonList from '../../api/get-pokemon-list/get-pokemon-list';
import { PokemonDetailResponse } from '../../api/get-pokemon-detail';
import * as getPokemonDetail from '../../api/get-pokemon-detail/get-pokemon-detail';

import { getPokemonListPaginated } from './utils';

import { ARIA_LABEL as POKEMON_ITEM_ARIA_LABEL } from './components/PokemonItem';
import Home, { PLACEHOLDER as HOME_PLACEHOLDER, MESSAGES as HOME_MESSAGES } from './Home';

describe('Home', () => {
	const mockGetPokemonList = jest.spyOn(getPokemonList, 'getPokemonList');
	const mockGetPokemonDetail = jest.spyOn(getPokemonDetail, 'getPokemonDetail');

	afterEach(() => {
		mockGetPokemonList.mockReset();
		mockGetPokemonDetail.mockReset();
	});

	const mockListResponse: PokemonListResult = {
		results: [
			{
				name: 'ampharos',
				url: 'http://pokeapi/ampharos',
			},
			{
				name: 'buzzwole',
				url: 'http://pokeapi/buzzwole',
			},
			{
				name: 'charizard',
				url: 'http://pokeapi/charizard',
			},
			{
				name: 'drizzile',
				url: 'http://pokeapi/drizzile',
			},
		],
	};

	const mockDetailResponseList: PokemonDetailResponse[] = mockListResponse.results.map(
		(pokemonResultItem) => ({
			sprites: {
				front_default: `${pokemonResultItem.url}/image`,
			},
		})
	);

	test('Should render pokemon list', async () => {
		mockGetPokemonList.mockResolvedValueOnce(mockListResponse);

		mockDetailResponseList.forEach((mockDetailResponse) => {
			mockGetPokemonDetail.mockResolvedValueOnce(mockDetailResponse);
		});

		render(
			<ThemeProvider theme={DEFAULT_THEME}>
				<Home />
			</ThemeProvider>
		);

		const pokemonItems = await screen.findAllByLabelText(POKEMON_ITEM_ARIA_LABEL.POKEMON_ITEM);

		expect(pokemonItems).toHaveLength(mockListResponse.results.length);

		await waitFor(async () => {
			const pokemonImageElements = await screen.findAllByLabelText<HTMLImageElement>(
				POKEMON_ITEM_ARIA_LABEL.POKEMON_IMAGE
			);

			expect(pokemonImageElements).toHaveLength(mockListResponse.results.length);

			pokemonImageElements.forEach((pokemonImageElement, index) =>
				expect(pokemonImageElement.src).toBe(mockDetailResponseList[index].sprites.front_default)
			);
		});

		const pokemonNameElements = screen.getAllByLabelText(POKEMON_ITEM_ARIA_LABEL.POKEMON_NAME);

		expect(pokemonNameElements).toHaveLength(mockListResponse.results.length);

		pokemonNameElements.forEach((pokemonNameElement, index) =>
			expect(pokemonNameElement).toHaveTextContent(mockListResponse.results[index].name)
		);
	});

	test('Should render pokemon items according to search when click in search button', async () => {
		mockGetPokemonList.mockResolvedValueOnce(mockListResponse);

		mockDetailResponseList.forEach((mockDetailResponse) => {
			mockGetPokemonDetail.mockResolvedValueOnce(mockDetailResponse);
		});

		const pageSize: number = 2;

		render(
			<ThemeProvider theme={DEFAULT_THEME}>
				<Home pageSize={pageSize} />
			</ThemeProvider>
		);

		const pokemonItems = await screen.findAllByLabelText(POKEMON_ITEM_ARIA_LABEL.POKEMON_ITEM);

		expect(pokemonItems).toHaveLength(pageSize);

		await waitFor(async () => {
			const pokemonImageElements = await screen.findAllByLabelText<HTMLImageElement>(
				POKEMON_ITEM_ARIA_LABEL.POKEMON_IMAGE
			);

			expect(pokemonImageElements).toHaveLength(pageSize);

			pokemonImageElements.forEach((pokemonImageElement, index) =>
				expect(pokemonImageElement.src).toBe(mockDetailResponseList[index].sprites.front_default)
			);
		});

		userEvent.type(screen.getByPlaceholderText(HOME_PLACEHOLDER.SEARCH_FIELD), 'har');

		userEvent.click(screen.getByRole('button', { name: 'Buscar' }));

		await waitFor(async () => {
			const pokemonImageElements = await screen.findAllByLabelText<HTMLImageElement>(
				POKEMON_ITEM_ARIA_LABEL.POKEMON_IMAGE
			);

			expect(pokemonImageElements).toHaveLength(2);

			pokemonImageElements.forEach((pokemonImageElement, index) =>
				expect(pokemonImageElement.src).toBe(
					[mockDetailResponseList[0], mockDetailResponseList[2]][index].sprites.front_default
				)
			);
		});

		const pokemonNameElements = screen.getAllByLabelText(POKEMON_ITEM_ARIA_LABEL.POKEMON_NAME);

		expect(pokemonNameElements).toHaveLength(2);
		expect(pokemonNameElements[0]).toHaveTextContent(mockListResponse.results[0].name);
		expect(pokemonNameElements[1]).toHaveTextContent(mockListResponse.results[2].name);
	});

	test('Should render pokemon items according to search when enter in search field', async () => {
		mockGetPokemonList.mockResolvedValueOnce(mockListResponse);

		mockDetailResponseList.forEach((mockDetailResponse) => {
			mockGetPokemonDetail.mockResolvedValueOnce(mockDetailResponse);
		});

		render(
			<ThemeProvider theme={DEFAULT_THEME}>
				<Home />
			</ThemeProvider>
		);

		const pokemonItems = await screen.findAllByLabelText(POKEMON_ITEM_ARIA_LABEL.POKEMON_ITEM);

		expect(pokemonItems).toHaveLength(mockListResponse.results.length);

		await waitFor(async () => {
			const pokemonImageElements = await screen.findAllByLabelText<HTMLImageElement>(
				POKEMON_ITEM_ARIA_LABEL.POKEMON_IMAGE
			);

			expect(pokemonImageElements).toHaveLength(mockListResponse.results.length);

			pokemonImageElements.forEach((pokemonImageElement, index) =>
				expect(pokemonImageElement.src).toBe(mockDetailResponseList[index].sprites.front_default)
			);
		});

		const searchField = screen.getByPlaceholderText(HOME_PLACEHOLDER.SEARCH_FIELD);

		userEvent.type(searchField, `${mockListResponse.results[0].name}{Enter}`);

		const pokemonNameElement = screen.getByLabelText(POKEMON_ITEM_ARIA_LABEL.POKEMON_NAME);

		expect(pokemonNameElement).toHaveTextContent(mockListResponse.results[0].name);
	});

	test('Should render initial pokemon list when the search field is cleared', async () => {
		mockGetPokemonList.mockResolvedValueOnce(mockListResponse);

		mockDetailResponseList.forEach((mockDetailResponse) => {
			mockGetPokemonDetail.mockResolvedValueOnce(mockDetailResponse);
		});

		render(
			<ThemeProvider theme={DEFAULT_THEME}>
				<Home />
			</ThemeProvider>
		);

		const pokemonItems = await screen.findAllByLabelText(POKEMON_ITEM_ARIA_LABEL.POKEMON_ITEM);

		expect(pokemonItems).toHaveLength(mockListResponse.results.length);

		await waitFor(async () => {
			const pokemonImageElements = await screen.findAllByLabelText<HTMLImageElement>(
				POKEMON_ITEM_ARIA_LABEL.POKEMON_IMAGE
			);

			expect(pokemonImageElements).toHaveLength(mockListResponse.results.length);

			pokemonImageElements.forEach((pokemonImageElement, index) =>
				expect(pokemonImageElement.src).toBe(mockDetailResponseList[index].sprites.front_default)
			);
		});

		const searchField = screen.getByPlaceholderText(HOME_PLACEHOLDER.SEARCH_FIELD);

		userEvent.type(searchField, `${mockListResponse.results[0].name}{Enter}`);

		const pokemonNameElement = screen.getByLabelText(POKEMON_ITEM_ARIA_LABEL.POKEMON_NAME);

		expect(pokemonNameElement).toHaveTextContent(mockListResponse.results[0].name);

		userEvent.clear(searchField);

		const initialPokemonItems = screen.getAllByLabelText(POKEMON_ITEM_ARIA_LABEL.POKEMON_ITEM);

		expect(initialPokemonItems).toHaveLength(mockListResponse.results.length);

		const pokemonNameElements = screen.getAllByLabelText(POKEMON_ITEM_ARIA_LABEL.POKEMON_NAME);

		expect(pokemonNameElements).toHaveLength(mockListResponse.results.length);

		pokemonNameElements.forEach((pokemonNameElement, index) =>
			expect(pokemonNameElement).toHaveTextContent(mockListResponse.results[index].name)
		);
	});

	test('Should render an empty message when no elements by search', async () => {
		mockGetPokemonList.mockResolvedValueOnce(mockListResponse);

		mockDetailResponseList.forEach((mockDetailResponse) => {
			mockGetPokemonDetail.mockResolvedValueOnce(mockDetailResponse);
		});

		render(
			<ThemeProvider theme={DEFAULT_THEME}>
				<Home />
			</ThemeProvider>
		);

		const pokemonItems = await screen.findAllByLabelText(POKEMON_ITEM_ARIA_LABEL.POKEMON_ITEM);

		expect(pokemonItems).toHaveLength(mockListResponse.results.length);

		await waitFor(async () => {
			const pokemonImageElements = await screen.findAllByLabelText<HTMLImageElement>(
				POKEMON_ITEM_ARIA_LABEL.POKEMON_IMAGE
			);

			expect(pokemonImageElements).toHaveLength(mockListResponse.results.length);

			pokemonImageElements.forEach((pokemonImageElement, index) =>
				expect(pokemonImageElement.src).toBe(mockDetailResponseList[index].sprites.front_default)
			);
		});

		userEvent.type(
			screen.getByPlaceholderText(HOME_PLACEHOLDER.SEARCH_FIELD),
			'UNKNOWN POKEMON NAME'
		);

		userEvent.click(screen.getByRole('button', { name: 'Buscar' }));

		expect(screen.getByRole('alert')).toHaveTextContent(HOME_MESSAGES.EMPTY_SEARCH);
	});

	test('Should render next pokemon page', async () => {
		mockGetPokemonList.mockResolvedValueOnce(mockListResponse);

		mockDetailResponseList.forEach((mockDetailResponse) => {
			mockGetPokemonDetail.mockResolvedValueOnce(mockDetailResponse);
		});

		const pageSize: number = 2;

		render(
			<ThemeProvider theme={DEFAULT_THEME}>
				<Home pageSize={pageSize} />
			</ThemeProvider>
		);

		const pokemonItemsPaginatedByFirstPage = getPokemonListPaginated(
			1,
			pageSize,
			mockListResponse.results
		);

		const pokemonElements = await screen.findAllByLabelText(POKEMON_ITEM_ARIA_LABEL.POKEMON_ITEM);

		expect(pokemonElements).toHaveLength(pokemonItemsPaginatedByFirstPage.length);

		await waitFor(async () => {
			const pokemonImageElements = await screen.findAllByLabelText<HTMLImageElement>(
				POKEMON_ITEM_ARIA_LABEL.POKEMON_IMAGE
			);

			expect(pokemonImageElements).toHaveLength(pokemonItemsPaginatedByFirstPage.length);

			pokemonImageElements.forEach((pokemonImageElement, index) =>
				expect(pokemonImageElement.src).toBe(mockDetailResponseList[index].sprites.front_default)
			);
		});

		userEvent.click(screen.getAllByRole('button', { name: 'Go to next page' })[0]);

		const pokemonItemsPaginatedBySecondPage = getPokemonListPaginated(
			2,
			pageSize,
			mockListResponse.results
		);

		await waitFor(async () => {
			const pokemonImageElements = await screen.findAllByLabelText<HTMLImageElement>(
				POKEMON_ITEM_ARIA_LABEL.POKEMON_IMAGE
			);

			expect(pokemonImageElements).toHaveLength(pokemonItemsPaginatedBySecondPage.length);

			pokemonImageElements.forEach((pokemonImageElement, index) =>
				expect(pokemonImageElement.src).toBe(
					mockDetailResponseList[index + pageSize].sprites.front_default
				)
			);
		});
	});
});
