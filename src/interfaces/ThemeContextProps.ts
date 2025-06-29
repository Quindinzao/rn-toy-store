export type ThemeMode = 'light' | 'dark';

export interface ThemeContextProps {
  toggleTheme: () => void;
  themeMode: ThemeMode;
}
