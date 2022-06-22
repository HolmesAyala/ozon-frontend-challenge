import { styled, css } from '@mui/material/styles';

export const Footer = styled('footer')(
	({ theme }) => css`
		display: grid;
		grid-template-columns: 1fr 300px;
		padding: ${theme.spacing(4)} 0;
		border-top: 1px solid ${theme.palette.gray.primary};
		align-items: center;
		gap: ${theme.spacing(2)};

		${theme.breakpoints.down('sm')} {
			grid-template-columns: 1fr;
		}
	`
);
