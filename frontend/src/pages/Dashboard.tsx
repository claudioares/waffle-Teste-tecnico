/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

export const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    // Simular um fetch de dados para o usuário logado
    const getStats = async () => {
      const response = await fetchUserStats();
      setStats(response);
    };

    getStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Seu Dashboard</h1>
      {stats ? (
        <div>
          <p>Streak: {stats.streak} dias consecutivos</p>
          <p>Aberturas Totais: {stats.totalOpenings}</p>
        </div>
      ) : (
        <p>Carregando suas estatísticas...</p>
      )}
    </div>
  );
};
function fetchUserStats() {
    throw new Error('Function not implemented.');
}

