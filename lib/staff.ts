// Staff directory. Names below are placeholders; replace them with real
// staff information as the school finalises its leadership and teaching team.

export type StaffMember = {
  name: string
  role: string
  bio?: string
  image?: string
  secondaryImage?: string
  gender?: 'male' | 'female'
}

export const leadership: StaffMember[] = [
  {
    name: 'Katongole Nabil',
    role: 'Head Teacher',
    bio: 'Leads the school with a focus on academic excellence, discipline, and pupil wellbeing.',
    image: '/images/staff/HM_SP.jpeg',
    secondaryImage: '/images/staff/HM.jpeg',
  },
  {
    name: 'Muwonge Daniel',
    role: 'Director of School',
    bio: 'Oversees school operations, strategic planning, and quality learning standards.',
    image: '/images/staff/ACC.jpeg',
  },
  {
    name: 'Nassali Sarah',
    role: 'Deputy Head Teacher',
    bio: 'Supports school administration, pupil welfare, and daily routines across the school community.',
    image: '/images/staff/DeputyHM.jpeg',
  },
]

export const prefectorialBody: StaffMember[] = [
  {
    name: 'School Prefectorial Body',
    role: 'Prefectorial Leadership',
    gender: 'male',
    image: '/images/staff/prefects.jpeg',
  },
]

export const maleTeachers: StaffMember[] = [
  {
    name: 'Male Staff Teachers',
    role: 'School Teaching Team',
    gender: 'male',
    image: '/images/staff/male_teachers.jpeg',
  },
]

export const femaleTeachers: StaffMember[] = [
  {
    name: 'Female Staff Teachers',
    role: 'School Teaching Team',
    gender: 'female',
    image: '/images/staff/female_teachers.jpeg',
  },
]

export function initials(name: string): string {
  const cleaned = name.replace(/\(.*?\)/g, '').trim()
  const parts = cleaned.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'MJS'

  const result = parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')

  return result || 'MJS'
}
