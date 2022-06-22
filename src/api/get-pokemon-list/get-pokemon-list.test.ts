import {
	getPokemonList,
	PokemonListResult,
	PropsOfGetPokemonList,
	POKEMON_LIST_BASE_URL,
	queryToStringRecord,
	GetPokemonListQuery,
} from './get-pokemon-list';

describe('getPokemonList', () => {
	test('Should get data from body', async () => {
		const mockFetch = jest.spyOn(global, 'fetch');

		const mockResult: PokemonListResult = {
			results: [
				{
					name: 'Name 1',
					url: 'http://api/name-1',
				},
				{
					name: 'Name 2',
					url: 'http://api/name-2',
				},
			],
		};

		mockFetch.mockResolvedValueOnce(new Response(JSON.stringify(mockResult)));

		const propsOfGetPokemonList: PropsOfGetPokemonList = {
			query: {
				limit: 2,
				offset: 0,
			},
		};

		const pokemonListResponse: PokemonListResult = await getPokemonList(propsOfGetPokemonList);

		const urlSearch = new URLSearchParams(
			queryToStringRecord(propsOfGetPokemonList.query as GetPokemonListQuery)
		);

		expect(mockFetch).toHaveBeenCalledTimes(1);
		expect(mockFetch).toHaveBeenCalledWith(`${POKEMON_LIST_BASE_URL}?${urlSearch}`);
		expect(pokemonListResponse).toEqual(mockResult);
	});
});
