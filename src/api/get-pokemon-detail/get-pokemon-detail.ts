export type PokemonDetailResponse = {
	sprites: {
		front_default: string | null;
	};
};

export async function getPokemonDetail(url: string): Promise<PokemonDetailResponse> {
	const response = await fetch(url);

	const body = await response.json();

	return body;
}
