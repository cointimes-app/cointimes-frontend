import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './extension/popup/App';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { Button } from '@mui/material';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#f44804'
    }
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);


