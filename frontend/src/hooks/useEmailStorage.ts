import { useState } from 'react';

function useEmailStorage() {
  // Função para buscar o email no localStorage
  const getStoredEmail = () => {
    try {
      const storedEmail = localStorage.getItem('userEmail');
      return storedEmail || ''; // Retorna o email ou uma string vazia se não houver
    } catch (error) {
      console.error('Error getting email from localStorage', error);
      return ''; // Retorna uma string vazia em caso de erro
    }
  };

  // Inicializa o estado com o valor do localStorage ou uma string vazia
  const [email, setEmail] = useState<string>(getStoredEmail);

  // Função para armazenar o email no localStorage
  const saveEmail = (email: string) => {
    try {
      setEmail(email);
      localStorage.setItem('userEmail', email);
    } catch (error) {
      console.error('Error saving email to localStorage', error);
    }
  };

  // Função para remover o email do localStorage
  const removeEmail = () => {
    try {
      localStorage.removeItem('userEmail');
      setEmail(''); // Reseta o estado para uma string vazia
    } catch (error) {
      console.error('Error removing email from localStorage', error);
    }
  };

  return {
    email,      // Retorna o email armazenado
    saveEmail,  // Função para salvar o email
    removeEmail // Função para remover o email
  };
}

export default useEmailStorage;
