import 'styled-components/native';
import { ThemeProps } from '../interfaces/ThemeProps';

declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeProps {}
}
