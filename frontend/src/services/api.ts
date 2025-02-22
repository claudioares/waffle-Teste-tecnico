import axios from 'axios';

// Crie uma instância do axios para reutilização
const api = axios.create({
  baseURL: 'https://waffle-teste-tecnico.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para lidar com as respostas
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
