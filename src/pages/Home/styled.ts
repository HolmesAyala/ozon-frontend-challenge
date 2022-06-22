import { styled, css } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';
import BaseFooter from './components/Footer';

export const Home = styled('div')(
	({ theme }) => css`
		padding: ${theme.spacing(2)} ${theme.spacing(4)} 0 ${theme.spacing(4)};
		max-width: 1024px;
		margin: 0 auto;

		${theme.breakpoints.down('sm')} {
			padding-left: ${theme.spacing(2)};
			padding-right: ${theme.spacing(2)};
		}
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
		gap: ${theme.spacing(2)};

		${theme.breakpoints.down('sm')} {
			grid-template-columns: 1fr;
		}
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
		padding: ${theme.spacing(2)} 0;
	`
);

export const PaginationContainer = styled('div')(
	({ theme }) => css`
		padding: ${theme.spacing(2)} 0;
	`
);

export const EmptyMessage = styled(Typography)<TypographyProps>(
	({ theme }) => css`
		padding: ${theme.spacing(2)};
		text-align: center;
		background-color: white;
		border-radius: 8px;
	`
);

export const Footer = styled(BaseFooter)(
	({ theme }) => css`
		margin-top: ${theme.spacing(4)};
	`
);
