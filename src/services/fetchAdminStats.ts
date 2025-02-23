import api from "./api";

// Função para buscar as estatísticas gerais para o painel administrativo
export const fetchAdminStats = async () => {
  try {
    const response = await api.get('/admin/dashboard');
    return response; 
  } catch (error) {
    console.error('Erro ao buscar estatísticas do painel:', error);
    throw error;  // Repassa o erro para quem chamou a função
  }
};
