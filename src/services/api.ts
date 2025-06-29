import axios from 'axios';

export const api = axios.create({
  // MENSAGEM DO JOÃO: Coloque o IP da sua máquina para rodar certinho, OK? 🙂
  baseURL: 'http://192.168.1.9:3000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
