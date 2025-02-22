import { useState, useEffect } from 'react';

export const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    // Simular um fetch de dados para o usuário logado
    const getStats = async () => {
      // Dados fictícios para o exemplo
      const fakeStats = {
        streak: 5,
        totalOpenings: 30,
        history: [
          { date: '2025-02-15', opened: true },
          { date: '2025-02-14', opened: true },
          { date: '2025-02-13', opened: true },
          { date: '2025-02-12', opened: false },
          { date: '2025-02-11', opened: true },
        ],
        motivationalMessage: 'Continue assim, você está indo muito bem!',
      };
      setStats(fakeStats);
    };

    getStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Seu Dashboard</h1>
      {stats ? (
        <div>
          <p className="mt-4">Streak: {stats.streak} dias consecutivos</p>
          <p>Aberturas Totais: {stats.totalOpenings}</p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Histórico de Aberturas</h2>
            <table className="min-w-full table-auto mt-2 border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Data</th>
                  <th className="border px-4 py-2">Abertura</th>
                </tr>
              </thead>
              <tbody>
                {stats.history.map((entry: any, index: number) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{entry.date}</td>
                    <td className="border px-4 py-2">
                      {entry.opened ? 'Aberto' : 'Não Aberto'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Mensagem Motivacional</h2>
            <p className="mt-2 italic">{stats.motivationalMessage}</p>
          </div>
        </div>
      ) : (
        <p>Carregando suas estatísticas...</p>
      )}
    </div>
  );
};
