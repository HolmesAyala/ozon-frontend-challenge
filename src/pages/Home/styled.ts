import { styled, css } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';

export const Home = styled('div')(
	({ theme }) => css`
		padding: ${theme.spacing(2)} ${theme.spacing(4)};
		max-width: 1024px;
		margin: 0 auto;
	`
);

export const Title = styled(Typography)<TypographyProps>(
	() => css`
		font-weight: bold;
	`
);

export const SubTitle = styled(Typography)<TypographyProps>(
	({ theme }) => css`
		margin-bottom: ${theme.spacing(2)};
	`
);

export const SearchContainer = styled('div')(
	({ theme }) => css`
		display: grid;
		grid-template-columns: minmax(0, 1fr) 200px;
		column-gap: ${theme.spacing(2)};
	`
);

export const ResultsTitle = styled(Typography)<TypographyProps>(
	({ theme }) => css`
		margin: ${theme.spacing(6)} 0 ${theme.spacing(4)} 0;
		font-weight: 600;
	`
);

export const PokemonItemsContainer = styled('div')(
	({ theme }) => css`
		display: grid;
		grid-template-columns: repeat(auto-fill, 128px);
		gap: ${theme.spacing(2)};
		justify-content: center;
	`
);
