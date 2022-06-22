import { config } from '../../config';

export const POKEMON_LIST_BASE_URL = `${config.api.baseUrl}/pokemon`;

export type GetPokemonListQuery = {
	limit?: number;
	offset?: number;
};

export type PropsOfGetPokemonList = {
	query?: GetPokemonListQuery;
};

export type PokemonResultItem = {
	name: string;
	url: string;
};

export type PokemonListResult = {
	results: PokemonResultItem[];
};

export async function getPokemonList(props?: PropsOfGetPokemonList): Promise<PokemonListResult> {
	let urlQuery: string = '';

	if (props?.query) {
		const query = props.query;

		urlQuery = new URLSearchParams(queryToStringRecord(query)).toString();
	}

	const response = await fetch(`${POKEMON_LIST_BASE_URL}?${urlQuery}`);

	const body = await response.json();

	return body;
}

export function queryToStringRecord(queryToParse: GetPokemonListQuery): { [key: string]: string } {
	return Object.keys(queryToParse).reduce(
		(result, key) => ({
			...result,
			[key]: String(queryToParse[key as keyof GetPokemonListQuery]),
		}),
		{}
	);
}
