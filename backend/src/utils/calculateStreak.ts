// Função para calcular o streak de dias consecutivos
export function calculateStreak(openings: { date: Date }[]) {
  if (!openings.length) return 0

  let streak = 1
  let lastOpenedDate = new Date(openings[0].date)

  for (let i = 1; i < openings.length; i++) {
    const currentDate = new Date(openings[i].date)
    const diffDays = Math.floor((currentDate.getTime() - lastOpenedDate.getTime()) / (1000 * 3600 * 24))

    // Se o último dia foi ontem, incrementa o streak
    if (diffDays === 1) {
      streak++
    } else if (diffDays > 1) {
      break
    }

    lastOpenedDate = currentDate
  }

  return streak
}
