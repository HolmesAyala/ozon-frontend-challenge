import { config } from '../../config';

export const POKEMON_LIST_BASE_URL = `${config.api.baseUrl}/pokemon`;

export type PropsOfGetPokemonList = {
	query?: {
		limit?: number;
		offset?: number;
	};
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
		const keys = Object.keys(query) as (keyof PropsOfGetPokemonList['query'])[];

		const tempQuery: { [key: string]: string } = keys.reduce(
			(acumulator, key) => ({
				...acumulator,
				[key]: typeof query[key] !== 'string' ? String(query[key]) : query[key],
			}),
			{}
		);

		urlQuery = new URLSearchParams(tempQuery).toString();
	}

	const response = await fetch(`${POKEMON_LIST_BASE_URL}?${urlQuery}`);

	const body = await response.json();

	return body;
}
