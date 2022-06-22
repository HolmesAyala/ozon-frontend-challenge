import { escapeRegExp } from 'lodash';
import { PokemonResultItem } from '../../../api/get-pokemon-list';

export const getPokemonListBySearch = (search: string, pokemonList: PokemonResultItem[]) => {
	const regExp = new RegExp(escapeRegExp(search), 'gi');

	return pokemonList.filter((resultItem) => resultItem.name.match(regExp));
};
