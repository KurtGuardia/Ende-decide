export type DemoCalendar = {
  today: string
  todayLong: string
  committee: string
  committeeLong: string
  committeeWeekday: string
  committeeDay: string
  committeeMonthYear: string
  daysToCommittee: number
  deadline: string
  deadlineLong: string
  milestones: string[]
}

const weekdays = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
const monthShort = ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.']
const monthLong = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

function addDays(date: Date, days: number) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function nextWeekday(date: Date) {
  const result = new Date(date)
  while (result.getDay() === 0 || result.getDay() === 6) result.setDate(result.getDate() + 1)
  return result
}

function shortDate(date: Date) {
  return `${date.getDate()} ${monthShort[date.getMonth()]} ${date.getFullYear()}`
}

function longDate(date: Date) {
  return `${weekdays[date.getDay()]}, ${date.getDate()} de ${monthLong[date.getMonth()]} de ${date.getFullYear()}`
}

export function createDemoCalendar(now = new Date()): DemoCalendar {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const committee = nextWeekday(addDays(today, 5))
  const deadline = nextWeekday(addDays(committee, 17))
  const milestones = [committee, nextWeekday(addDays(committee, 1)), nextWeekday(addDays(committee, 3)), nextWeekday(addDays(committee, 8)), deadline]

  return {
    today: shortDate(today),
    todayLong: longDate(today),
    committee: shortDate(committee),
    committeeLong: longDate(committee),
    committeeWeekday: weekdays[committee.getDay()].slice(0, 3),
    committeeDay: String(committee.getDate()),
    committeeMonthYear: `${monthLong[committee.getMonth()]} ${committee.getFullYear()}`,
    daysToCommittee: Math.round((committee.getTime() - today.getTime()) / 86_400_000),
    deadline: shortDate(deadline),
    deadlineLong: `${String(deadline.getDate()).padStart(2, '0')}/${String(deadline.getMonth() + 1).padStart(2, '0')}/${deadline.getFullYear()}`,
    milestones: milestones.map(shortDate),
  }
}
