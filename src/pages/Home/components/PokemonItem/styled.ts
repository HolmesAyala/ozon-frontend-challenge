import { styled, css } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';

export const PokemonItem = styled('div')(() => css``);

export const PokemonImage = styled('img')(
	({ theme }) => css`
		box-sizing: border-box;
		width: 128px;
		height: 128px;
		overflow: hidden;
		border-radius: 8px;
		object-fit: cover;
		border: 1px solid ${theme.palette.gray.primary};
		user-select: none;
		background-color: white;
	`
);

export const PokemonTitle = styled(Typography)<TypographyProps>(
	({ theme }) => css`
		font-weight: 500;
		text-align: center;
		margin-top: ${theme.spacing(1)};
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	`
);
