import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Routes from './routes';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
