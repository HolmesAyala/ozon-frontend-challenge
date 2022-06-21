import * as styled from './styled';

type PokemonItemProps = {
	imageUrl: string;
	title: string;
};

const PokemonItem = ({ imageUrl, title }: PokemonItemProps) => {
	return (
		<styled.PokemonItem>
			<styled.PokemonImage src={imageUrl} />

			<styled.PokemonTitle title={title} variant='body1'>
				{title}
			</styled.PokemonTitle>
		</styled.PokemonItem>
	);
};

export default PokemonItem;
