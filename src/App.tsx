import Home from './pages/Home';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

import { DEFAULT_THEME } from './styles/default-theme';
import { GLOBAL_STYLES } from './styles/global-styles';

const globalStyles = <GlobalStyles styles={GLOBAL_STYLES} />;

function App() {
	return (
		<ThemeProvider theme={DEFAULT_THEME}>
			{globalStyles}

			<Home />
		</ThemeProvider>
	);
}

export default App;
