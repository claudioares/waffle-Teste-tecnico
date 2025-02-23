import { Navigate, Outlet } from "react-router-dom";

// Função para verificar se o email do usuário está no localStorage
const isUserLoggedIn = () => {
  return localStorage.getItem("userEmail") !== null;
};

// Rota protegida para o conteúdo do layout
export const PrivateRoute = () => {
  if (isUserLoggedIn()) {
    // Se já estiver logado, renderiza o conteúdo das rotas protegidas
    return <Outlet />;
  }

  // Se não estiver logado, redireciona para a página de login
  return <Navigate to="/login" />;
};

// Rota para redirecionar se o usuário estiver logado
export const PublicRoute = () => {
  if (isUserLoggedIn()) {
    // Se o usuário já estiver logado, redireciona para o Dashboard ou página inicial
    return <Navigate to="/" />;
  }

  // Caso contrário, exibe a página de login
  return <Outlet />;
};
