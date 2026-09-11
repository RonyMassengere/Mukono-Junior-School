// Staff directory. Names below are PLACEHOLDERS — replace with the school's
// real staff. Add an `image` field (e.g. "/images/staff/name.png") to show a
// photo; otherwise a warm monogram is displayed automatically.

export type StaffMember = {
  name: string
  role: string
  bio?: string
  image?: string
}

export const leadership: StaffMember[] = [
  {
    name: 'Head Teacher (Name)',
    role: 'Head Teacher',
    bio: 'Leads the school with a focus on academic excellence and strong character.',
  },
  {
    name: 'Deputy Head (Name)',
    role: 'Deputy Head Teacher',
    bio: 'Supports daily school life, discipline, and pupil wellbeing.',
  },
  {
    name: 'Director of Studies (Name)',
    role: 'Director of Studies',
    bio: 'Oversees the curriculum and prepares pupils for their examinations.',
  },
]

export const teachers: StaffMember[] = [
  { name: 'Teacher (Name)', role: 'Baby & Nursery Class' },
  { name: 'Teacher (Name)', role: 'Lower Primary (P.1 – P.3)' },
  { name: 'Teacher (Name)', role: 'Upper Primary (P.4 – P.7)' },
  { name: 'Teacher (Name)', role: 'Games & Sports Coach' },
  { name: 'Teacher (Name)', role: 'Debating Club Patron' },
  { name: 'Teacher (Name)', role: 'Librarian & Resource Centre' },
]

export function initials(name: string): string {
  const cleaned = name.replace(/\(.*?\)/g, '').trim()
  const parts = cleaned.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'MJS'
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}
