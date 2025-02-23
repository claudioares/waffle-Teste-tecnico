

export const formatToBrazilianTime = (originalDate: string): string => {
  const date = new Date(originalDate);

  // Ajuste de fuso horário (Brasil é UTC-3)
  const offset = -3 * 60; // UTC-3
  date.setMinutes(date.getMinutes() + offset);

  // Arrays de dias da semana e meses em português
  const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const monthsOfYear = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  // Obter o dia da semana e o mês em português
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = String(date.getDate()).padStart(2, '0');
  const month = monthsOfYear[date.getMonth()];
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Retorna a data formatada
  return `${dayOfWeek} ${day} de ${month} às ${hours}:${minutes}:${seconds}`;
};

