import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, useColorScheme } from 'react-native';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { ThemeContextProps, ThemeMode } from '../interfaces/ThemeContextProps';
import { darkTheme, lightTheme } from '../styles/theme';

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeProvider');
  }
  return context;
};

const THEME_KEY = '@app/theme';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem(THEME_KEY);

      if (storedTheme === 'light' || storedTheme === 'dark') {
        setThemeMode(storedTheme);
      } else if (
        systemColorScheme === 'light' ||
        systemColorScheme === 'dark'
      ) {
        setThemeMode(systemColorScheme);
      }

      setIsLoading(false);
    };
    loadTheme();
  }, [systemColorScheme]);

  const toggleTheme = async () => {
    const newTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newTheme);
    await AsyncStorage.setItem(THEME_KEY, newTheme);
  };

  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme, themeMode }}>
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
