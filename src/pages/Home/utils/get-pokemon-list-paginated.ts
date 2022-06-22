import { PokemonResultItem } from '../../../api/get-pokemon-list';

export const getPokemonListPaginated = (
	page: number,
	pageSize: number,
	pokemonList: PokemonResultItem[]
): PokemonResultItem[] => {
	const startIndex: number = (page - 1) * pageSize;

	const pokemonListPaginated = pokemonList.slice(startIndex, startIndex + pageSize);

	return pokemonListPaginated;
};
