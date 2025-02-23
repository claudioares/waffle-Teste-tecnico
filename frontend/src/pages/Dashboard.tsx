/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import api from "../services/api";
import { IUserResponse } from "../services/interface";
import { formatToBrazilianTime } from "../utils/formatToBrazilTime";


export const Dashboard = () => {
  const [userData, setUserData] = useState<IUserResponse>();
  useEffect(()=>{
    const handleUserDataREpositorie = async () => {
      const response: IUserResponse = await api.post('/user', {
        email: "test2@email.com",
      });

      setUserData(response)
    };

    handleUserDataREpositorie();
  }, []);

  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Área do usuário</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded">Sair</button>
      </div>

      {/* Streak */}
      <div className="bg-white p-6 rounded shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Seu Streak Atual</h2>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-3xl font-bold">{userData?.user.streak} dias seguidos</h3>
          </div>
        </div>
      </div>

      {/* Histórico de leituras */}
      <div className="bg-white p-6 rounded shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Última Leitura</h2>
        <ul>
          <li className="mb-2 text-gray-700">
              { formatToBrazilianTime(userData?.user.lastOpenedAt ?? '')}
          </li>
        </ul>
      </div>

      {/* Estatísticas */}
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Estatísticas</h2>
        <ul>
          <li>Total de newsletters lidas: {userData?.user.streak}</li>
        </ul>
      </div>
    </div>
  );
};

