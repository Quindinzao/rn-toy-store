import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import { setupInterceptors } from '../services/interceptors';

interface AuthContextData {
  token: string | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signOut = async () => {
    setIsLoading(true);
    setToken(null);
    await AsyncStorage.removeItem('@app/token');
    setIsLoading(false);
  };

  useEffect(() => {
    setupInterceptors(api, signOut);
  }, []);

  useEffect(() => {
    const loadToken = async () => {
      setIsLoading(true);
      const storedToken = await AsyncStorage.getItem('@app/token');
      if (storedToken) {
        setToken(storedToken);
        api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await api.post('/auth/login', { username, password });
      const receivedToken = response.data.token;
      setToken(receivedToken);
      api.defaults.headers.common.Authorization = `Bearer ${receivedToken}`;
      await AsyncStorage.setItem('@app/token', receivedToken);
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, signIn, signOut, isAuthenticated: !!token, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => useContext(AuthContext);
