import { createTheme, ThemeProvider } from '@mui/material/styles';

import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createTheme({
	palette: {
		primary: {
			main: '#000',
			constrastText: '#fff',
		},
		secondary: {
			main: '#fff',
			constrastText: '#000',
		},
	},
	typography: {
		fontFamily: ['Bebas Neue ', 'cursive'].join(','),
	},
});

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
