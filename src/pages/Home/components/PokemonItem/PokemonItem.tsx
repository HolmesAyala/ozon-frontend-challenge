import * as styled from './styled';

export const ARIA_LABEL = {
	POKEMON_ITEM: 'pokemon',
	POKEMON_IMAGE: 'imagen de pokemon',
	POKEMON_NAME: 'nombre de pokemon',
};

type PokemonItemProps = {
	imageUrl: string;
	title: string;
};

const PokemonItem = ({ imageUrl, title }: PokemonItemProps) => {
	return (
		<styled.PokemonItem aria-label={ARIA_LABEL.POKEMON_ITEM}>
			<styled.PokemonImage aria-label={ARIA_LABEL.POKEMON_IMAGE} src={imageUrl} alt={title} />

			<styled.PokemonTitle aria-label={ARIA_LABEL.POKEMON_NAME} title={title} variant='body1'>
				{title}
			</styled.PokemonTitle>
		</styled.PokemonItem>
	);
};

export default PokemonItem;
