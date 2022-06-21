import { CSSProperties } from 'react';

declare module '@mui/material/styles' {
	interface Palette {
		gray: {
			primary?: CSSProperties['color'];
			secondary?: CSSProperties['color'];
		};
	}

	interface PaletteOptions {
		gray?: {
			primary?: CSSProperties['color'];
			secondary?: CSSProperties['color'];
		};
	}
}
