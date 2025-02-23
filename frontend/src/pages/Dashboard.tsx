/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import api from "../services/api";
import { IUserResponse } from "../services/interface";
import useEmailStorage from "../hooks/useEmailStorage";
import { useNavigate } from 'react-router-dom';
import { TableUser } from "../components/table.user";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { email, removeEmail } = useEmailStorage();
  const [generalData, setGeneralData] = useState({
    email: '',
    Streak: '',
    lastOpenedAt: ''
  })
  const [opning, setOpning] = useState<any>();
  const [badge, setBadge] = useState<any>();

  useEffect(()=>{
    const handleUserDataREpositorie = async () => {
      const response: IUserResponse = await api.post('/user', {
        email: email,
      });

      setGeneralData({
        email: response.user.email,
        Streak: String(response.user.streak),
        lastOpenedAt: response.user.lastOpenedAt
      })
      setOpning(response.user.openings)
      setBadge && setBadge(response.user.badges)
    };

    handleUserDataREpositorie();
  }, []);


  const handleLogout = () =>{
    removeEmail();
    navigate('/login');
  }

  const tabelaHistoricoAberturas = [
    { label: "Data da Abertura", key: "dataAbertura" },
    { label: "Post ID", key: "postId" },
    { label: "UTM Source", key: "utmSource" },
    { label: "UTM Medium", key: "utmMedium" },
    { label: "UTM Campaign", key: "utmCampaign" }
  ];

  const tabelaBadgesConquistados = [
    { label: "Nome do Badge", key: "nomeBadge" },
    { label: "Descrição", key: "descricaoBadge" },
    { label: "Data de Conquista", key: "dataConquista" }
  ];

  const tabelaInformacoesGerais = [
    { label: "Email", key: "email" },
    { label: "Streak Atual", key: "streakAtual" },
    { label: "Última Abertura", key: "ultimaAbertura" }
  ];



  return (
   <>
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Área do usuário</h1>
        <button 
          className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:opacity-90"
          onClick={()=> handleLogout()}
        >Sair</button>
      </div>

      {/* {Tabelas} */}
      <TableUser array={opning} labelHead={"Histórico de Aberturas"} tableHeadLebal={tabelaHistoricoAberturas} type="opning"/>
      <TableUser array={badge} labelHead={"Badges Conquistados"} tableHeadLebal={tabelaBadgesConquistados} type="badge"/>
      <TableUser array={[generalData]} labelHead={"Gerais do Usuário"} tableHeadLebal={tabelaInformacoesGerais} type="general__data"/>
    </div>
   </>
  );
};

