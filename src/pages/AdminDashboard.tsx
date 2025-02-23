/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { fetchAdminStats } from '../services/fetchAdminStats';


export const AdminDashboard = () => {
  const [usersStats, setUsersStats] = useState<any[]>([]);

  useEffect(() => {
    // Chamar a API para obter estatísticas gerais
    const getStats = async () => {
      const response = await fetchAdminStats();
      setUsersStats(response.data);
    };

    getStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Painel Administrativo</h1>
      <div className="mt-4">
        {usersStats.length === 0 ? (
          <p>Carregando as métricas...</p>
        ) : (
          <ul>
            {usersStats.map((user, index) => (
              <li key={user.email} className="py-2">
                <p>{index + 1}. {user.email} - Streak: {user.streak} dias - Aberturas: {user.totalOpenings}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
