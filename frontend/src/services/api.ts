import axios from 'axios';

// Crie uma instância do axios para reutilização
const api = axios.create({
  baseURL: 'http://localhost:3333', // Altere para a URL da sua API
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
