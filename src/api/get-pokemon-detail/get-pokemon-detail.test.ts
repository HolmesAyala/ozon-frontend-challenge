import { getPokemonDetail, PokemonDetailResponse } from './get-pokemon-detail';

describe('getPokemonDetail', () => {
	test('Should get data from body', async () => {
		const mockFetch = jest.spyOn(global, 'fetch');

		const responseBody: PokemonDetailResponse = {
			sprites: {
				front_default: 'http://api/pokemon/image',
			},
		};

		mockFetch.mockResolvedValueOnce(new Response(JSON.stringify(responseBody)));

		const pokemonUrl = 'http://api/pokemon';

		const pokemonDetailResult: PokemonDetailResponse = await getPokemonDetail(pokemonUrl);

		expect(mockFetch).toHaveBeenCalledTimes(1);
		expect(mockFetch).toHaveBeenCalledWith(pokemonUrl);
		expect(pokemonDetailResult).toEqual(responseBody);
	});
});
