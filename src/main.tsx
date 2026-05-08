import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@delhivery/tarmac';
import '@delhivery/tarmac/dist/style.css';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider
        initialSource="./tarmac-theme.json"
        activeTheme="tarmac-theme"
        showLoadingUntilReady={false}
      >
        <App />
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);
