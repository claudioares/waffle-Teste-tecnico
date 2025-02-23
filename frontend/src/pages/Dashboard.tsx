/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import api from "../services/api";
import { IUserResponse } from "../services/interface";
import { formatToBrazilianTime } from "../utils/formatToBrazilTime";
import useEmailStorage from "../hooks/useEmailStorage";
import { useNavigate } from 'react-router-dom';
import {  
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent, } from "../components/ui/chart";
import {CartesianGrid, Line, LineChart, XAxis} from "recharts";
import { TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";





export const Dashboard = () => {
  const navigate = useNavigate();
  const { email, removeEmail } = useEmailStorage();
  const [userData, setUserData] = useState<IUserResponse>();
  useEffect(()=>{
    const handleUserDataREpositorie = async () => {
      const response: IUserResponse = await api.post('/user', {
        email: email,
      });

      setUserData(response)
    };

    handleUserDataREpositorie();
  }, []);


  const handleLogout = () =>{
    removeEmail();
    navigate('/login');
  }

  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ]

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#6666",
    },
  } satisfies ChartConfig
  
  return (
   <>
    <Card className="w-2xl">
      <CardHeader>
        <CardTitle>Line Chart - Linear</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={true}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Área do usuário</h1>
        <button 
          className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:opacity-90"
          onClick={()=> handleLogout()}
        >Sair</button>
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
          <li>Total de newsletters lidas: {userData?.user.openings.length}</li>
        </ul>
      </div>
    </div>
   </>
  );
};

