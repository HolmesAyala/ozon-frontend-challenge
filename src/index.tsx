import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { DEFAULT_THEME } from './styles/default-theme';
import { GLOBAL_STYLES } from './styles/global-styles';

const globalStyles = <GlobalStyles styles={GLOBAL_STYLES} />;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<ThemeProvider theme={DEFAULT_THEME}>
			{globalStyles}

			<App />
		</ThemeProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
