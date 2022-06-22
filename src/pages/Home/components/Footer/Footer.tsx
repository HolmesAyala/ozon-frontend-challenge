import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import * as styled from './styled';

type FooterProps = {
	className?: string;
};

const Footer = ({ className }: FooterProps) => {
	return (
		<styled.Footer className={className}>
			<Typography variant='body1'>
				Hecho por <strong>Holmes Ayala</strong>
			</Typography>

			<Link
				aria-label='Ir a repositorio'
				href='https://github.com/HolmesAyala/ozon-frontend-challenge'
				target='_blank'
				sx={{ display: 'block' }}
			>
				<Button variant='contained' color='primary' fullWidth>
					Link a mi repo
				</Button>
			</Link>
		</styled.Footer>
	);
};

export default Footer;
