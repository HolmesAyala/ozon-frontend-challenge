import { css } from '@mui/material/styles';
import { IMPORT_FONTS } from './fonts';
import { DEFAULT_THEME } from './default-theme';

export const GLOBAL_STYLES = css`
	${IMPORT_FONTS};

	html {
		background-color: ${DEFAULT_THEME.palette.gray.secondary};
	}

	body {
		margin: 0;
	}
`;
