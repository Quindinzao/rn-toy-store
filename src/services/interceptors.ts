import { AxiosInstance, AxiosError } from 'axios';
import { Alert } from 'react-native';

export function setupInterceptors(api: AxiosInstance, signOut: () => void) {
  api.interceptors.response.use(
    response => response,
    (error: AxiosError<any>) => {
      if (!error.response) {
        console.error(JSON.stringify(error));
        Alert.alert(
          'Erro de conexão',
          'Verifique sua internet e tente novamente.',
        );
        return Promise.reject(error);
      }

      const { status, data } = error.response;

      const errorMsg =
        data?.error ||
        'Ocorreu um erro inesperado. Tente novamente mais tarde.';

      if (status === 400) {
        Alert.alert('Erro', errorMsg);
      }

      if (status === 401) {
        Alert.alert('Sessão expirada', 'Por favor, faça login novamente.');
        signOut();
      }

      if (status === 403) {
        Alert.alert(
          'Acesso negado',
          'Você não tem permissão para acessar este recurso.',
        );
      }

      if (status === 500) {
        Alert.alert(
          'Erro no servidor',
          'Ocorreu um erro inesperado. Tente novamente mais tarde.',
        );
      }

      return Promise.reject(error);
    },
  );
}
