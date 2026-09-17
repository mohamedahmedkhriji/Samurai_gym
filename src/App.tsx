import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isSupabaseConfigured, supabase } from './lib/supabase'
import {
  ArrowRight,
  Bike,
  CalendarDays,
  Check,
  Flame,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plus,
  Save,
  Shield,
  Sparkles,
  Timer,
  Trash2,
  X,
  Zap,
} from 'lucide-react'
import achrefCoach from '../assets/photos/Achref coach.png'
import ahmedCoach from '../assets/photos/Ahmed coach.png'
import facebookIcon from '../assets/icons/facebook.png'
import heroVideo from '../assets/photos/INTRO BACKGROUND VEDIO .mp4'
import instagramIcon from '../assets/icons/instagram.png'
import nourhenCoach from '../assets/photos/Coach Nourhen.png'
import phoneWhatsappIcon from '../assets/icons/phone and whatsapp.png'
import samuraiLogo from '../assets/photos/LOGo.png'

gsap.registerPlugin(ScrollTrigger)

type ContactForm = {
  name: string
  phone: string
  goal: string
}

type CoachScheduleSlot = {
  day: string
  from: string
  to: string
  role: string
}

type CoachProfile = {
  name: string
  title: string
  phone: string
  email: string
  image: string
  schedule: CoachScheduleSlot[]
}

type EditableCoach = CoachProfile & {
  id: string
}

type AgendaSession = {
  coach: string
  discipline: string
  duration: string
  filter: string
}

type AgendaRow = {
  from: string
  to: string
  sessions: (AgendaSession | null)[]
}

type DbScheduleRow = {
  day_name: string
  start_time: string
  end_time: string
  class_name: string
  duration_minutes: number
  coaches: {
    name: string
    speciality: string
    image_url: string
    phone: string | null
    email: string | null
  } | null
}

type DbCoachRow = {
  id: number
  name: string
  speciality: string
  image_url: string
  phone: string | null
  email: string | null
}

const usFlag =
  "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='512'%20height='512'%20viewBox='0%200%20512%20512'%3e%3cmask%20id='a'%3e%3ccircle%20cx='256'%20cy='256'%20r='256'%20fill='%23fff'/%3e%3c/mask%3e%3cg%20mask='url(%23a)'%3e%3cpath%20fill='%23eee'%20d='M256%200h256v64l-32%2032%2032%2032v64l-32%2032%2032%2032v64l-32%2032%2032%2032v64l-256%2032L0%20448v-64l32-32-32-32v-64z'/%3e%3cpath%20fill='%23d80027'%20d='M224%2064h288v64H224Zm0%20128h288v64H256ZM0%20320h512v64H0Zm0%20128h512v64H0Z'/%3e%3cpath%20fill='%230052b4'%20d='M0%200h256v256H0Z'/%3e%3cpath%20fill='%23eee'%20d='m187%20243%2057-41h-70l57%2041-22-67zm-81%200%2057-41H93l57%2041-22-67zm-81%200%2057-41H12l57%2041-22-67zm162-81%2057-41h-70l57%2041-22-67zm-81%200%2057-41H93l57%2041-22-67zm-81%200%2057-41H12l57%2041-22-67Zm162-82%2057-41h-70l57%2041-22-67Zm-81%200%2057-41H93l57%2041-22-67zm-81%200%2057-41H12l57%2041-22-67Z'/%3e%3c/g%3e%3c/svg%3e"
const frFlag =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'%3e%3cmask id='a'%3e%3ccircle cx='256' cy='256' r='256' fill='%23fff'/%3e%3c/mask%3e%3cg mask='url(%23a)'%3e%3cpath fill='%23eee' d='M0 0h512v512H0z'/%3e%3cpath fill='%230052b4' d='M0 0h170.7v512H0z'/%3e%3cpath fill='%23d80027' d='M341.3 0H512v512H341.3z'/%3e%3c/g%3e%3c/svg%3e"

const navItems = [
  { id: 'home', label: 'nav.home' },
  { id: 'services', label: 'nav.services' },
  { id: 'about', label: 'nav.about' },
  { id: 'pricing', label: 'nav.pricing' },
  { id: 'contact', label: 'nav.contact' },
]

const serviceDefinitions = [
  {
    icon: Flame,
    key: 'kickboxing',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=900&q=85',
  },
  {
    icon: Shield,
    key: 'taekwondo',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=900&q=85',
  },
  {
    icon: Zap,
    key: 'kungfu',
    image: 'https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?auto=format&fit=crop&w=900&q=85',
  },
  {
    icon: Sparkles,
    key: 'gymnastique',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85',
  },
  {
    icon: Shield,
    key: 'specialiteFemme',
    image: 'https://images.unsplash.com/photo-1518310952931-b1de897abd40?auto=format&fit=crop&w=900&q=85',
  },
  {
    icon: Bike,
    key: 'cardio',
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=85',
  },
]

const agendaDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

const dbDayToAgendaIndex: Record<string, number> = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
}

const agendaFilters = [
  { label: 'Tout', value: 'all' },
  { label: 'Body Combat', value: 'body-combat' },
  { label: 'ABS', value: 'abs' },
  { label: 'Cross Training', value: 'cross-training' },
  { label: 'Musculation', value: 'musculation' },
  { label: 'Gymnastique', value: 'gymnastique' },
  { label: 'Step', value: 'step' },
  { label: 'Cardio', value: 'cardio' },
  { label: 'Tabata', value: 'tabata' },
  { label: 'Kung Fu', value: 'kung-fu' },
  { label: 'Taekwondo', value: 'taekwondo' },
  { label: 'Boxe', value: 'boxe' },
  { label: 'Renforcement', value: 'renforcement' },
  { label: 'Circuit Training', value: 'circuit-training' },
]

const agendaSession = (coach: string, discipline: string, duration: string, filter: string): AgendaSession => ({
  coach,
  discipline,
  duration,
  filter,
})

const weeklyAgenda: AgendaRow[] = [
  {
    from: '08:00',
    to: '09:00',
    sessions: [
      agendaSession('Maha', 'Body Combat', '60 min', 'body-combat'),
      null,
      agendaSession('Maha', 'ABS', '60 min', 'abs'),
      null,
      agendaSession('Maha', 'Cross Training', '60 min', 'cross-training'),
      null,
      agendaSession('Nourhen', 'Musculation', '60 min', 'musculation'),
    ],
  },
  {
    from: '09:00',
    to: '10:00',
    sessions: [
      null,
      agendaSession('Nourhen', 'Gymnastique', '60 min', 'gymnastique'),
      null,
      agendaSession('Nourhen', 'Gymnastique', '60 min', 'gymnastique'),
      null,
      agendaSession('Maha', 'Step', '60 min', 'step'),
      agendaSession('Nourhen', 'Gymnastique', '60 min', 'gymnastique'),
    ],
  },
  {
    from: '10:00',
    to: '11:00',
    sessions: [
      agendaSession('Siwar', 'Cardio', '60 min', 'cardio'),
      null,
      agendaSession('Siwar', 'Step', '60 min', 'step'),
      null,
      agendaSession('Siwar', 'Tabata', '60 min', 'tabata'),
      null,
      null,
    ],
  },
  {
    from: '10:30',
    to: '12:00',
    sessions: [
      null,
      agendaSession('Nourhen', 'Kung Fu', '90 min', 'kung-fu'),
      null,
      agendaSession('Nourhen', 'Kung Fu', '90 min', 'kung-fu'),
      null,
      agendaSession('Ahlem', 'Taekwondo', '90 min', 'taekwondo'),
      agendaSession('Nourhen', 'Kung Fu', '90 min', 'kung-fu'),
    ],
  },
  {
    from: '17:00',
    to: '18:00',
    sessions: [
      agendaSession('Maha', 'Body Combat', '60 min', 'body-combat'),
      null,
      agendaSession('Maha', 'ABS', '60 min', 'abs'),
      null,
      agendaSession('Nourhen', 'ABS', '60 min', 'abs'),
      null,
      null,
    ],
  },
  {
    from: '18:00',
    to: '19:00',
    sessions: [
      agendaSession('Nourhen', 'Step', '60 min', 'step'),
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  },
  {
    from: '18:30',
    to: '20:00',
    sessions: [
      null,
      agendaSession('Ahlem', 'Taekwondo', '90 min', 'taekwondo'),
      agendaSession('Med Jaber', 'Boxe', '90 min', 'boxe'),
      agendaSession('Ahlem', 'Taekwondo', '90 min', 'taekwondo'),
      agendaSession('Med Jaber', 'Boxe', '90 min', 'boxe'),
      null,
      null,
    ],
  },
  {
    from: '19:00',
    to: '20:00',
    sessions: [
      agendaSession('Med Jaber', 'Boxe', '60 min', 'boxe'),
      null,
      null,
      null,
      null,
      agendaSession('Nourhen', 'Cardio', '60 min', 'cardio'),
      null,
    ],
  },
  {
    from: '20:00',
    to: '21:00',
    sessions: [
      null,
      agendaSession('Nourhen', 'Renforcement', '60 min', 'renforcement'),
      agendaSession('Ahmed', 'Cross Training', '60 min', 'cross-training'),
      agendaSession('Nourhen', 'Circuit Training', '60 min', 'circuit-training'),
      agendaSession('Ahmed', 'Cross Training', '60 min', 'cross-training'),
      null,
      null,
    ],
  },
  {
    from: '20:30',
    to: '21:30',
    sessions: [
      agendaSession('Ahmed', 'Cross Training', '60 min', 'cross-training'),
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  },
]

const normalizeTime = (time: string) => time.slice(0, 5)

const englishDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const toAgendaFilter = (discipline: string) =>
  discipline
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const normalizeScheduleDay = (day: string) => {
  const normalized = day.trim().toLowerCase()
  const aliases: Record<string, string> = {
    monday: 'Monday',
    lundi: 'Monday',
    tuesday: 'Tuesday',
    mardi: 'Tuesday',
    wednesday: 'Wednesday',
    mercredi: 'Wednesday',
    thursday: 'Thursday',
    jeudi: 'Thursday',
    friday: 'Friday',
    vendredi: 'Friday',
    saturday: 'Saturday',
    samedi: 'Saturday',
    sunday: 'Sunday',
    dimanche: 'Sunday',
  }

  return aliases[normalized]
}

const expandScheduleDays = (day: string) => {
  if (day.toLowerCase().includes('every day')) {
    return englishDays
  }

  return day
    .split(',')
    .map(normalizeScheduleDay)
    .filter((value): value is string => Boolean(value))
}

const normalizeDbTime = (time: string) => {
  const match = time.match(/\d{1,2}:\d{2}/)

  if (!match) {
    return null
  }

  const [hour, minute] = match[0].split(':')
  return `${hour.padStart(2, '0')}:${minute}:00`
}

const durationBetweenTimes = (from: string, to: string) => {
  const [fromHour, fromMinute] = from.split(':').map(Number)
  const [toHour, toMinute] = to.split(':').map(Number)
  const start = fromHour * 60 + fromMinute
  const end = toHour * 60 + toMinute

  return Math.max(15, end - start)
}

const createEmptyAgendaRow = (from: string, to: string): AgendaRow => ({
  from,
  to,
  sessions: Array.from({ length: agendaDays.length }, () => null),
})

const buildAgendaFromSchedule = (schedule: DbScheduleRow[]): AgendaRow[] => {
  const rows = new Map<string, AgendaRow>()

  schedule.forEach((slot) => {
    const dayIndex = dbDayToAgendaIndex[slot.day_name]

    if (dayIndex === undefined || !slot.coaches) {
      return
    }

    const from = normalizeTime(slot.start_time)
    const to = normalizeTime(slot.end_time)
    const key = `${from}-${to}`
    const row = rows.get(key) ?? createEmptyAgendaRow(from, to)

    row.sessions[dayIndex] = agendaSession(
      slot.coaches.name,
      slot.class_name,
      `${slot.duration_minutes} min`,
      toAgendaFilter(slot.class_name),
    )
    rows.set(key, row)
  })

  return Array.from(rows.values()).sort((left, right) => left.from.localeCompare(right.from) || left.to.localeCompare(right.to))
}

const buildCoachesFromDatabase = (coaches: DbCoachRow[], schedule: DbScheduleRow[]): EditableCoach[] =>
  coaches.map((coach) => ({
    id: String(coach.id),
    name: coach.name,
    title: coach.speciality,
    image: coach.image_url,
    phone: coach.phone || '+216 ',
    email: coach.email || 'coach@samuraigym.tn',
    schedule: schedule
      .filter((slot) => slot.coaches?.name === coach.name)
      .map((slot) => ({
        day: slot.day_name,
        from: normalizeTime(slot.start_time),
        to: normalizeTime(slot.end_time),
        role: slot.class_name,
      })),
  }))

const plans = [
  {
    key: 'one',
    price: '80',
    currency: 'DT',
  },
  {
    key: 'collective',
    price: '50',
    currency: 'DT',
  },
  {
    key: 'three',
    oldPrice: '240 DT',
    price: '200',
    currency: 'DT',
    discount: 'Save 17%',
    featured: true,
  },
  {
    key: 'six',
    oldPrice: '480 DT',
    price: '320',
    currency: 'DT',
    discount: 'Save 33%',
  },
  {
    key: 'twelve',
    oldPrice: '960 DT',
    price: '550',
    currency: 'DT',
    discount: 'Save 43%',
  },
]

const defaultCoaches: EditableCoach[] = [
  {
    id: 'achref',
    name: 'Achref',
    title: 'Strength Coach',
    image: achrefCoach,
    phone: '+216 24 000 101',
    email: 'achref@samuraigym.tn',
    schedule: [
      { day: 'Every day (7/7)', from: '14:00', to: '22:00', role: 'Coach plateau' },
    ],
  },
  {
    id: 'siwar',
    name: 'Siwar',
    title: 'Coach plateau',
    image: samuraiLogo,
    phone: '+216 24 000 102',
    email: 'siwar@samuraigym.tn',
    schedule: [
      { day: 'Every day (7/7)', from: '08:00', to: '10:00', role: 'Coach plateau' },
      { day: 'Monday', from: '10:00', to: '11:00', role: 'Cardio' },
      { day: 'Wednesday', from: '10:00', to: '11:00', role: 'Step' },
      { day: 'Friday', from: '10:00', to: '11:00', role: 'Tabata' },
    ],
  },
  {
    id: 'maha',
    name: 'Maha',
    title: 'Group Classes Coach',
    image: samuraiLogo,
    phone: '+216 24 000 103',
    email: 'maha@samuraigym.tn',
    schedule: [
      { day: 'Monday', from: '08:00', to: '09:00', role: 'Body Combat' },
      { day: 'Monday', from: '17:00', to: '18:00', role: 'Body Combat' },
      { day: 'Wednesday', from: '08:00', to: '09:00', role: 'ABS' },
      { day: 'Wednesday', from: '17:15', to: '18:15', role: 'ABS' },
      { day: 'Friday', from: '08:00', to: '09:00', role: 'Cross Training' },
      { day: 'Saturday', from: '08:00', to: '09:00', role: 'Cross Training' },
      { day: 'Saturday', from: '09:00', to: '10:00', role: 'Step' },
    ],
  },
  {
    id: 'nourhen',
    name: 'Nourhen',
    title: 'Group Classes Coach',
    image: nourhenCoach,
    phone: '+216 24 000 104',
    email: 'nourhen@samuraigym.tn',
    schedule: [
      { day: 'Monday', from: '18:00', to: '19:00', role: 'Step' },
      { day: 'Tuesday, Thursday', from: '09:00', to: '10:00', role: 'Gymnastique' },
      { day: 'Tuesday, Thursday', from: '10:30', to: '12:00', role: 'Kung Fu' },
      { day: 'Tuesday', from: '20:00', to: '21:00', role: 'Renforcement' },
      { day: 'Thursday', from: '20:00', to: '21:00', role: 'Circuit Training' },
      { day: 'Friday', from: '17:00', to: '18:00', role: 'ABS' },
      { day: 'Saturday', from: '20:00', to: '21:00', role: 'Cardio' },
      { day: 'Sunday', from: '08:00', to: '09:00', role: 'Musculation' },
      { day: 'Sunday', from: '10:00', to: '11:00', role: 'Gymnastique' },
      { day: 'Sunday', from: '10:30', to: '12:00*', role: 'Kung Fu' },
    ],
  },
  {
    id: 'ahlem',
    name: 'Ahlem',
    title: 'Taekwondo Coach',
    image: samuraiLogo,
    phone: '+216 24 000 105',
    email: 'ahlem@samuraigym.tn',
    schedule: [
      { day: 'Tuesday, Thursday', from: '18:30', to: '20:00', role: 'Taekwondo' },
      { day: 'Saturday', from: '10:30', to: '12:00', role: 'Taekwondo' },
    ],
  },
  {
    id: 'mohamed-jaber',
    name: 'Mohamed Jaber',
    title: 'Boxing Coach',
    image: samuraiLogo,
    phone: '+216 24 000 106',
    email: 'mohamed.jaber@samuraigym.tn',
    schedule: [
      { day: 'Monday, Wednesday, Friday', from: '18:30', to: 'end unspecified', role: 'Boxing' },
    ],
  },
  {
    id: 'ahmed',
    name: 'Ahmed',
    title: 'Cross Training Coach',
    image: ahmedCoach,
    phone: '+216 24 000 107',
    email: 'ahmed@samuraigym.tn',
    schedule: [
      { day: 'Monday', from: '20:30', to: '21:30', role: 'Cross Training' },
      { day: 'Wednesday, Friday', from: '20:00', to: '21:00', role: 'Cross Training' },
    ],
  },
]

const gallery = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=85',
]

const logoModules = import.meta.glob('../assets/logos/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const brandLogos = Object.entries(logoModules)
  .sort(([first], [second]) => first.localeCompare(second))
  .map(([, src]) => src)

function SamuraiMark({ className = '' }: { className?: string }) {
  return (
    <div className={`samurai-mark ${className}`} aria-label="SAMURAI GYM logo mark">
      <img src={samuraiLogo} alt="" />
    </div>
  )
}

function MagneticButton({
  children,
  href,
  variant = 'primary',
}: {
  children: React.ReactNode
  href: string
  variant?: 'primary' | 'ghost'
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'}`}
    >
      {children}
      <ArrowRight size={18} />
    </motion.a>
  )
}

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="section-header reveal">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}

const coachStorageKey = 'samurai-coaches-v2'
const adminCode = '1255'

const createCoach = (): EditableCoach => ({
  id: `coach-${Date.now()}`,
  name: 'New Coach',
  title: 'Coach Speciality',
  image: samuraiLogo,
  phone: '+216 ',
  email: 'coach@samuraigym.tn',
  schedule: [{ day: 'Monday', from: '08:00', to: '12:00', role: 'Coach plateau' }],
})

const loadSavedCoaches = () => {
  if (typeof window === 'undefined') {
    return defaultCoaches
  }

  try {
    const saved = window.localStorage.getItem(coachStorageKey)
    if (!saved) {
      return defaultCoaches
    }

    const parsed = JSON.parse(saved) as EditableCoach[]
    if (!Array.isArray(parsed)) {
      return defaultCoaches
    }

    return parsed.map((coach, index) => ({
      id: coach.id || `coach-${index}`,
      name: coach.name || 'Coach',
      title: coach.title || 'Coach',
      image: coach.image || samuraiLogo,
      phone: coach.phone || '+216 ',
      email: coach.email || 'coach@samuraigym.tn',
      schedule:
        Array.isArray(coach.schedule) && coach.schedule.length > 0
          ? coach.schedule.map((slot) => ({
              day: slot.day || 'Monday',
              from: slot.from || '08:00',
              to: slot.to || '12:00',
              role: slot.role || coach.title || 'Coach plateau',
            }))
          : [{ day: 'Monday', from: '08:00', to: '12:00', role: 'Coach plateau' }],
    }))
  } catch {
    return defaultCoaches
  }
}

function FooterTagline({ onOpenAdmin }: { onOpenAdmin: () => void }) {
  return (
    <p>
      Power. Discipline. Respect.{' '}
      <button type="button" className="font-inherit text-inherit underline-offset-4 hover:text-samurai-red hover:underline" onClick={onOpenAdmin}>
        Strength.
      </button>
    </p>
  )
}

function AdminLogin({ onBack, onUnlock }: { onBack: () => void; onUnlock: () => void }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const verify = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (code.trim() === adminCode) {
      setError('')
      onUnlock()
      return
    }

    setError('Wrong verification code')
  }

  return (
    <div className="min-h-screen bg-samurai-black px-5 py-28 text-white">
      <div className="mx-auto max-w-md rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_28px_90px_rgba(0,0,0,.45)]">
        <SamuraiMark className="mb-6 h-14 w-14 text-2xl" />
        <span className="text-xs font-black uppercase tracking-[0.28em] text-samurai-red">Admin verification</span>
        <h1 className="mt-3 font-display text-5xl uppercase">Coach Desk</h1>
        <form className="mt-8 grid gap-4" onSubmit={verify}>
          <input
            className="h-14 rounded-2xl border border-white/10 bg-black/40 px-4 font-bold text-white outline-none transition focus:border-samurai-red"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Verification code"
            aria-label="Verification code"
            type="password"
          />
          {error && <p className="text-sm font-bold text-samurai-red">{error}</p>}
          <button type="submit" className="flex h-14 items-center justify-center gap-2 rounded-full bg-samurai-red px-5 text-sm font-black uppercase tracking-wide text-white shadow-red transition hover:bg-samurai-accent">
            Open Admin <ArrowRight size={18} />
          </button>
          <button type="button" className="h-12 rounded-full border border-white/10 text-sm font-black uppercase tracking-wide text-white/70 transition hover:border-white/30 hover:text-white" onClick={onBack}>
            Back to site
          </button>
        </form>
      </div>
    </div>
  )
}

function CoachAdminPage({
  coaches,
  onChange,
  onSave,
  onBack,
}: {
  coaches: EditableCoach[]
  onChange: (coaches: EditableCoach[]) => void
  onSave: () => void
  onBack: () => void
}) {
  const updateCoach = (coachId: string, updates: Partial<EditableCoach>) => {
    onChange(coaches.map((coach) => (coach.id === coachId ? { ...coach, ...updates } : coach)))
  }

  const updateCoachImage = (coachId: string, file: File | undefined) => {
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateCoach(coachId, { image: reader.result })
      }
    }
    reader.readAsDataURL(file)
  }

  const updateSlot = (coachId: string, slotIndex: number, updates: Partial<CoachScheduleSlot>) => {
    onChange(
      coaches.map((coach) =>
        coach.id === coachId
          ? {
              ...coach,
              schedule: coach.schedule.map((slot, index) => (index === slotIndex ? { ...slot, ...updates } : slot)),
            }
          : coach,
      ),
    )
  }

  const addSlot = (coachId: string) => {
    onChange(coaches.map((coach) => (coach.id === coachId ? { ...coach, schedule: [...coach.schedule, { day: 'Monday', from: '08:00', to: '12:00', role: 'Coach plateau' }] } : coach)))
  }

  const removeSlot = (coachId: string, slotIndex: number) => {
    onChange(coaches.map((coach) => (coach.id === coachId ? { ...coach, schedule: coach.schedule.filter((_, index) => index !== slotIndex) } : coach)))
  }

  return (
    <div className="min-h-screen bg-samurai-black px-5 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.28em] text-samurai-red">SAMURAI GYM Admin</span>
            <h1 className="mt-3 font-display text-5xl uppercase md:text-7xl">Coaches</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" className="flex h-12 items-center gap-2 rounded-full border border-white/10 px-5 text-sm font-black uppercase tracking-wide transition hover:border-white/30" onClick={onBack}>
              <X size={17} /> Close
            </button>
            <button type="button" className="flex h-12 items-center gap-2 rounded-full border border-white/10 px-5 text-sm font-black uppercase tracking-wide transition hover:border-white/30" onClick={() => onChange([...coaches, createCoach()])}>
              <Plus size={17} /> Add Coach
            </button>
            <button type="button" className="flex h-12 items-center gap-2 rounded-full bg-samurai-red px-5 text-sm font-black uppercase tracking-wide shadow-red transition hover:bg-samurai-accent" onClick={onSave}>
              <Save size={17} /> Save
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-5">
          {coaches.map((coach) => (
            <section key={coach.id} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
              <div className="grid gap-5 lg:grid-cols-[180px_1fr]">
                <div>
                  <div className="grid h-56 place-items-end overflow-hidden rounded-[24px] border border-white/10 bg-black/40">
                    <img className="h-full w-full object-contain object-bottom" src={coach.image} alt={`${coach.name} preview`} />
                  </div>
                  <label className="mt-3 flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/10 px-4 text-xs font-black uppercase tracking-wide text-white/80 transition hover:border-samurai-red hover:text-white">
                    <Plus size={15} /> Upload Image
                    <input className="sr-only" type="file" accept="image/*" onChange={(event) => updateCoachImage(coach.id, event.target.files?.[0])} />
                  </label>
                </div>

                <div>
                  <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto]">
                    <input className="h-12 rounded-2xl border border-white/10 bg-black/40 px-4 font-bold outline-none focus:border-samurai-red" value={coach.name} onChange={(event) => updateCoach(coach.id, { name: event.target.value })} aria-label="Coach name" />
                    <input className="h-12 rounded-2xl border border-white/10 bg-black/40 px-4 font-bold outline-none focus:border-samurai-red" value={coach.title} onChange={(event) => updateCoach(coach.id, { title: event.target.value })} aria-label="Coach speciality" />
                    <input className="h-12 rounded-2xl border border-white/10 bg-black/40 px-4 font-bold outline-none focus:border-samurai-red" value={coach.phone} onChange={(event) => updateCoach(coach.id, { phone: event.target.value })} aria-label="Coach phone" />
                    <button type="button" className="grid h-12 w-12 place-items-center rounded-full border border-white/10 text-white/70 transition hover:border-samurai-red hover:text-samurai-red" onClick={() => onChange(coaches.filter((item) => item.id !== coach.id))} aria-label={`Remove ${coach.name}`}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <input className="mt-4 h-12 w-full rounded-2xl border border-white/10 bg-black/40 px-4 font-bold outline-none focus:border-samurai-red" value={coach.email} onChange={(event) => updateCoach(coach.id, { email: event.target.value })} aria-label="Coach email" />

                  <div className="mt-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h2 className="text-xs font-black uppercase tracking-[0.24em] text-white/70">Agenda</h2>
                      <button type="button" className="flex h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-xs font-black uppercase tracking-wide transition hover:border-white/30" onClick={() => addSlot(coach.id)}>
                        <Plus size={15} /> Add Time
                      </button>
                    </div>
                    <div className="grid gap-3">
                      {coach.schedule.map((slot, slotIndex) => (
                        <div key={`${coach.id}-${slotIndex}`} className="grid gap-3 md:grid-cols-[1fr_140px_140px_1fr_auto]">
                          <input className="h-11 rounded-2xl border border-white/10 bg-black/40 px-4 font-bold outline-none focus:border-samurai-red" value={slot.day} onChange={(event) => updateSlot(coach.id, slotIndex, { day: event.target.value })} aria-label="Agenda day" />
                          <input className="h-11 rounded-2xl border border-white/10 bg-black/40 px-4 font-bold outline-none focus:border-samurai-red" value={slot.from} onChange={(event) => updateSlot(coach.id, slotIndex, { from: event.target.value })} aria-label="Start time" />
                          <input className="h-11 rounded-2xl border border-white/10 bg-black/40 px-4 font-bold outline-none focus:border-samurai-red" value={slot.to} onChange={(event) => updateSlot(coach.id, slotIndex, { to: event.target.value })} aria-label="End time" />
                          <input className="h-11 rounded-2xl border border-white/10 bg-black/40 px-4 font-bold outline-none focus:border-samurai-red" value={slot.role} onChange={(event) => updateSlot(coach.id, slotIndex, { role: event.target.value })} aria-label="Class or role" />
                          <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white/70 transition hover:border-samurai-red hover:text-samurai-red" onClick={() => removeSlot(coach.id, slotIndex)} aria-label="Remove agenda time">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

function CoachProfileModal({ coach, onClose }: { coach: CoachProfile; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-black/85 px-4 py-8 backdrop-blur-xl" role="presentation" onClick={onClose}>
      <motion.div
        className="relative my-auto w-full max-w-6xl overflow-visible rounded-[32px] border border-white/[0.05] bg-[linear-gradient(135deg,#1B1B1B,#222222)] shadow-[0_36px_120px_rgba(0,0,0,.72)] backdrop-blur-[15px] md:min-h-[620px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="coach-modal-title"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-4 z-30 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[0.08] text-white shadow-[0_12px_36px_rgba(0,0,0,.35)] transition duration-200 hover:rotate-90 hover:border-samurai-red/60 hover:bg-samurai-red"
          onClick={onClose}
          aria-label="Close coach contact"
        >
          <X size={22} />
        </button>

        <motion.img
          className="pointer-events-none relative z-20 mx-auto -mt-16 h-[24rem] w-full max-w-[20rem] object-contain object-bottom drop-shadow-[0_20px_60px_rgba(0,0,0,.55)] md:absolute md:bottom-0 md:left-[-1.5rem] md:mt-0 md:h-[112%] md:max-w-[33rem] lg:left-[1.5rem] lg:max-w-[38rem]"
          src={coach.image}
          alt={`${coach.name} profile`}
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.19, 1, 0.22, 1] }}
        />

        <motion.div
          className="relative z-10 px-6 pb-7 pt-2 md:ml-auto md:w-[68%] md:py-12 md:pl-[11rem] md:pr-10 lg:w-[64%] lg:pl-[13rem] lg:pr-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.16, ease: [0.19, 1, 0.22, 1] }}
        >
          <motion.span
            className="block text-xs font-black uppercase tracking-[0.28em] text-samurai-red"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.22 }}
          >
            Coach
          </motion.span>
          <motion.h3
            id="coach-modal-title"
            className="mt-3 max-w-[10ch] origin-left -skew-x-[8deg] -rotate-2 font-[Knewave,Allan,cursive] text-[clamp(3.1rem,10vw,6.4rem)] uppercase leading-[0.88] tracking-[-0.03em] text-white [filter:contrast(1.12)] [text-shadow:3px_3px_0_rgba(0,0,0,.8),6px_6px_12px_rgba(0,0,0,.4),0_0_22px_rgba(225,6,0,.22)]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.28 }}
          >
            {coach.name}
          </motion.h3>
          <motion.p
            className="mt-4 text-base font-black text-[#d4af37]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.34 }}
          >
            {coach.title}
          </motion.p>

          <motion.div
            className="mt-8 grid gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <a
              className="flex h-14 items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 font-extrabold text-white transition duration-200 hover:-translate-y-0.5 hover:border-samurai-red/70 hover:shadow-[0_18px_44px_rgba(225,6,0,.16)]"
              href={`tel:${coach.phone.replace(/\s/g, '')}`}
            >
              <Phone className="text-samurai-red" size={20} />
              {coach.phone}
            </a>
            <a
              className="flex h-14 items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 font-extrabold text-white transition duration-200 hover:-translate-y-0.5 hover:border-samurai-red/70 hover:shadow-[0_18px_44px_rgba(225,6,0,.16)]"
              href={`mailto:${coach.email}`}
            >
              <Mail className="text-samurai-red" size={20} />
              {coach.email}
            </a>
          </motion.div>

          <motion.div
            className="mt-5 rounded-[24px] border border-white/[0.06] bg-white/[0.035] p-5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.46 }}
          >
            <h4 className="text-xs font-black uppercase tracking-[0.24em] text-white">Availability</h4>
            <ul className="mt-4 divide-y divide-white/[0.06]">
              {coach.schedule.map((slot) => (
                <li key={`${slot.day}-${slot.from}-${slot.role}`} className="grid gap-3 py-3 first:pt-0 last:pb-0 sm:grid-cols-[1fr_auto] sm:items-center">
                  <span className="flex min-w-0 items-center gap-3 font-extrabold text-white">
                    <CalendarDays className="shrink-0 text-samurai-red" size={18} />
                    <span className="min-w-0">
                      <span className="block truncate">{slot.day}</span>
                      <span className="mt-1 block text-xs font-black uppercase tracking-[0.16em] text-[#d4af37]">{slot.role}</span>
                    </span>
                  </span>
                  <span className="text-sm font-bold text-white/55 sm:text-right">
                    {slot.from} - {slot.to}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function App() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [coachProfiles, setCoachProfiles] = useState<EditableCoach[]>(loadSavedCoaches)
  const [selectedCoach, setSelectedCoach] = useState<EditableCoach | null>(null)
  const [adminView, setAdminView] = useState<'site' | 'verify' | 'admin'>(() => (window.location.hash === '#coach-admin' ? 'verify' : 'site'))
  const [saveMessage, setSaveMessage] = useState('')
  const [activeAgendaFilters, setActiveAgendaFilters] = useState<string[]>([])
  const [agendaRows, setAgendaRows] = useState<AgendaRow[]>(weeklyAgenda)
  const [agendaMode, setAgendaMode] = useState<'fallback' | 'database'>('fallback')
  const [stats, setStats] = useState({ members: 0, days: 0, motivation: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const { register, handleSubmit, reset } = useForm<ContactForm>()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 22 })
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 22 })
  const heroRotateX = useTransform(smoothY, [0, 1], [7, -7])
  const heroRotateY = useTransform(smoothX, [0, 1], [-7, 7])
  const currentLanguage = i18n.resolvedLanguage || i18n.language
  const isFrench = currentLanguage.startsWith('fr')
  const activeFlag = isFrench ? frFlag : usFlag

  const changeLanguage = () => {
    const nextLanguage = isFrench ? 'en' : 'fr'
    i18n.changeLanguage(nextLanguage)
    localStorage.setItem('samurai-language', nextLanguage)
  }

  const toggleAgendaFilter = (filter: string) => {
    if (filter === 'all') {
      setActiveAgendaFilters([])
      return
    }

    setActiveAgendaFilters((current) =>
      current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter],
    )
  }

  const openAdminVerification = () => {
    window.location.hash = 'coach-admin'
    setAdminView('verify')
    setSaveMessage('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeAdmin = () => {
    window.history.pushState('', document.title, window.location.pathname + window.location.search)
    setAdminView('site')
    setSaveMessage('')
  }

  const loadDatabaseSchedule = async () => {
    if (!isSupabaseConfigured || !supabase) {
      return false
    }

    const [scheduleResult, coachesResult] = await Promise.all([
      supabase
        .from('coach_schedule')
        .select('day_name, start_time, end_time, class_name, duration_minutes, coaches(name, speciality, image_url, phone, email)')
        .order('start_time', { ascending: true }),
      supabase
        .from('coaches')
        .select('id, name, speciality, image_url, phone, email')
        .order('name', { ascending: true }),
    ])

    if (scheduleResult.error) {
      console.warn('Could not load coach schedule from Supabase:', scheduleResult.error.message)
      return false
    }

    if (coachesResult.error) {
      console.warn('Could not load coaches from Supabase:', coachesResult.error.message)
      return false
    }

    const schedule = (scheduleResult.data ?? []) as unknown as DbScheduleRow[]
    const databaseCoaches = (coachesResult.data ?? []) as DbCoachRow[]

    if (schedule.length > 0) {
      setAgendaRows(buildAgendaFromSchedule(schedule))
    }

    if (databaseCoaches.length > 0) {
      setCoachProfiles(buildCoachesFromDatabase(databaseCoaches, schedule))
    }

    if (schedule.length > 0 || databaseCoaches.length > 0) {
      setAgendaMode('database')
      return true
    }

    return false
  }

  const saveCoaches = async () => {
    localStorage.setItem(coachStorageKey, JSON.stringify(coachProfiles))

    if (!isSupabaseConfigured || !supabase) {
      setSaveMessage('Saved locally. Add Supabase keys to save to the database.')
      window.setTimeout(() => setSaveMessage(''), 3200)
      return
    }

    const coachRows = coachProfiles.map((coach) => ({
      name: coach.name,
      speciality: coach.title,
      image_url: coach.image,
      phone: coach.phone,
      email: coach.email,
      updated_at: new Date().toISOString(),
    }))

    const { data: savedCoaches, error: coachError } = await supabase
      .from('coaches')
      .upsert(coachRows, { onConflict: 'name' })
      .select('id, name')

    if (coachError || !savedCoaches) {
      console.warn('Could not save coaches to Supabase:', coachError?.message)
      setSaveMessage('Saved locally, but database save failed.')
      window.setTimeout(() => setSaveMessage(''), 3200)
      return
    }

    const coachIdByName = new Map(savedCoaches.map((coach) => [coach.name, coach.id as number]))
    const coachIds = savedCoaches.map((coach) => coach.id as number)
    const scheduleRows = coachProfiles.flatMap((coach) => {
      const coachId = coachIdByName.get(coach.name)

      if (!coachId) {
        return []
      }

      return coach.schedule.flatMap((slot) => {
        const startTime = normalizeDbTime(slot.from)
        const endTime = normalizeDbTime(slot.to)

        if (!startTime || !endTime) {
          return []
        }

        return expandScheduleDays(slot.day).map((dayName) => ({
          coach_id: coachId,
          day_name: dayName,
          start_time: startTime,
          end_time: endTime,
          class_name: slot.role || coach.title,
          duration_minutes: durationBetweenTimes(startTime, endTime),
        }))
      })
    })

    if (coachIds.length > 0) {
      const { error: deleteError } = await supabase
        .from('coach_schedule')
        .delete()
        .in('coach_id', coachIds)

      if (deleteError) {
        console.warn('Could not replace coach schedule in Supabase:', deleteError.message)
        setSaveMessage('Coaches saved, but agenda update failed.')
        window.setTimeout(() => setSaveMessage(''), 3200)
        return
      }
    }

    if (scheduleRows.length > 0) {
      const { error: scheduleError } = await supabase
        .from('coach_schedule')
        .insert(scheduleRows)

      if (scheduleError) {
        console.warn('Could not save coach schedule to Supabase:', scheduleError.message)
        setSaveMessage('Coaches saved, but agenda update failed.')
        window.setTimeout(() => setSaveMessage(''), 3200)
        return
      }
    }

    await loadDatabaseSchedule()
    setSaveMessage('Saved to database. The coach cards and agenda are live.')
    window.setTimeout(() => setSaveMessage(''), 2600)
  }

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return
    }

    let isMounted = true

    loadDatabaseSchedule().then((loaded) => {
      if (!isMounted || !loaded) {
        return
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        '.reveal',
        { autoAlpha: 0, y: 42 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: 'body', start: 'top top' },
        },
      )

      gsap.utils.toArray<HTMLElement>('.scroll-reveal').forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 58, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 82%' },
          },
        )
      })
    })

    return () => {
      context.revert()
    }
  }, [])

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  useEffect(() => {
    const duration = 1600
    const startedAt = performance.now()
    let frame = 0

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setStats({
        members: Math.round(500 * eased),
        days: Math.round(7 * eased),
        motivation: Math.round(100 * eased),
      })

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frame)
  }, [])

  const onSubmit = (data: ContactForm) => {
    const subject = encodeURIComponent(t('contact.emailSubject'))
    const body = t('contact.emailBody', data)
    window.location.href = `mailto:ramrocki@hotmail.com?subject=${subject}&body=${body}`
    reset()
  }

  if (adminView === 'verify') {
    return <AdminLogin onBack={closeAdmin} onUnlock={() => setAdminView('admin')} />
  }

  if (adminView === 'admin') {
    return (
      <>
        <CoachAdminPage coaches={coachProfiles} onChange={setCoachProfiles} onSave={saveCoaches} onBack={closeAdmin} />
        {saveMessage && <div className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 rounded-full bg-samurai-red px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-red">{saveMessage}</div>}
      </>
    )
  }

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-samurai-black text-white"
      onMouseMove={(event) => {
        mouseX.set(event.clientX / window.innerWidth)
        mouseY.set(event.clientY / window.innerHeight)
      }}
    >
      <div className="fixed inset-0 pointer-events-none">
        <div className="noise" />
        <div className="energy energy-one" />
        <div className="energy energy-two" />
        <div className="particles" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-black/30 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-3 font-display text-2xl tracking-wide">
            <SamuraiMark className="h-11 w-11 text-lg" />
            <span className="nav-brand-text">SAMURAI GYM</span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="nav-link">
                {t(item.label)}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="#contact" className="rounded-full bg-samurai-red px-5 py-3 text-sm font-black uppercase tracking-wide shadow-red transition hover:bg-samurai-accent">
              {t('nav.join')}
            </a>
            <button className="language-button" type="button" aria-label={t('nav.languageLabel')} onClick={changeLanguage}>
              <img src={activeFlag} alt="" />
              <span>{isFrench ? 'FR' : 'EN'}</span>
            </button>
          </div>

          <button className="icon-button lg:hidden" type="button" aria-label="Toggle menu" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="border-t border-white/10 bg-black/95 px-5 py-5 lg:hidden">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="block py-3 text-sm font-bold uppercase tracking-[0.24em]" onClick={() => setMenuOpen(false)}>
                {t(item.label)}
              </a>
            ))}
            <button className="language-button mt-4" type="button" aria-label={t('nav.languageLabel')} onClick={changeLanguage}>
              <img src={activeFlag} alt="" />
              <span>{isFrench ? 'FR' : 'EN'}</span>
            </button>
          </motion.div>
        )}
      </header>

      <main>
        <section id="home" className="hero-section">
          <video className="hero-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="hero-grid mx-auto grid max-w-7xl items-center gap-12 px-5 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div className="relative z-10">
              <div className="reveal mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-samurai-muted">
                <Flame size={16} className="text-samurai-red" />
                {t('hero.eyebrow')}
              </div>
              <h1 className="reveal hero-title samurai-logo" aria-label="SAMURAI GYM">
                <span className="samurai-word">{t('hero.titleSamurai')}</span>
                <span className="gym-word">{t('hero.titleGym')}</span>
              </h1>
              <p className="reveal mt-5 max-w-2xl text-2xl font-semibold text-white md:text-4xl">
                {t('hero.subtitleA')} <span className="text-samurai-red">{t('hero.subtitleB')}</span>
              </p>
              <p className="reveal mt-6 max-w-xl text-base leading-8 text-samurai-muted md:text-lg">
                {t('hero.text')}
              </p>
              <div className="reveal mt-9 flex flex-col gap-4 sm:flex-row">
                <MagneticButton href="#contact">{t('hero.start')}</MagneticButton>
                <MagneticButton href="#pricing" variant="ghost">{t('hero.memberships')}</MagneticButton>
              </div>
            </div>

            <motion.div className="hero-logo reveal" style={{ rotateX: heroRotateX, rotateY: heroRotateY }}>
              <div className="hero-orbit" />
              <SamuraiMark className="hero-emblem" />
              <div className="stat-card stat-one">
                <strong>{stats.members}+</strong>
                <span>{t('hero.stats.members')}</span>
              </div>
              <div className="stat-card stat-two">
                <strong>{stats.days} {t('hero.stats.daysUnit')}</strong>
                <span>{t('hero.stats.open')}</span>
              </div>
              <div className="stat-card stat-three">
                <strong>{stats.motivation}%</strong>
                <span>{t('hero.stats.motivation')}</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="logo-strip" aria-label="SAMURAI GYM brand carousel">
          <div className="marquee-wrap">
            <div className="marquee-track">
              {[...brandLogos, ...brandLogos].map((logo, index) => (
                <div className="brand-single-box" key={`${logo}-${index}`}>
                  <img src={logo} alt={`SAMURAI GYM brand logo ${index + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="quote-band scroll-reveal">
          <p>"{t('quote')}"</p>
        </section>

        <section id="services" className="section">
          <SectionHeader eyebrow={t('services.eyebrow')} title={t('services.title')} text={t('services.text')} />
          <div className="mx-auto mt-14 grid max-w-7xl gap-5 px-5 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {serviceDefinitions.map(({ icon: Icon, key, image }) => {
              const copy = t(`services.items.${key}`, { returnObjects: true }) as string[]

              return (
              <motion.article key={key} whileHover={{ y: -8 }} className="service-card scroll-reveal">
                <img className="service-card-image" src={image} alt="" loading="lazy" />
                <div className="service-card-content">
                  <Icon className="text-samurai-red" size={30} />
                  <h3>{copy[0]}</h3>
                  <p>{copy[1]}</p>
                </div>
              </motion.article>
              )
            })}
          </div>
        </section>

        <section id="about" className="section section-split">
          <SectionHeader eyebrow={t('coaches.eyebrow')} title={t('coaches.title')} text={t('coaches.text')} />
          <div className="coach-grid mx-auto mt-14 grid max-w-7xl gap-5 px-5 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
            {coachProfiles.map((coach) => (
              <motion.button
                key={coach.name}
                type="button"
                whileHover={{ y: -10, scale: 1.015 }}
                className="coach-card scroll-reveal"
                onClick={() => setSelectedCoach(coach)}
                aria-label={`Open contact details for ${coach.name}`}
              >
                <div className="coach-image">
                  <img className="coach-portrait" src={coach.image} alt={`${coach.name} from SAMURAI GYM coaching team`} loading="lazy" />
                </div>
                <div className="coach-info">
                  <span>{t('coaches.label')}</span>
                  <h3>{coach.name}</h3>
                  <p>{coach.title}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        <section className="section weekly-planner-section">
          <div className="planning-shell mx-auto max-w-7xl px-5 lg:px-8">
            <div className="planning-title reveal">
              <span>Planning</span>
              <h2>Planning d'entraînement</h2>
              <p>
                Agenda complet de la semaine, avec les horaires, coachs, disciplines, et durées de chaque cours.
                <span className="planning-source"> Source: {agendaMode === 'database' ? 'database live' : 'local fallback'}</span>
              </p>
            </div>

            <div className="planning-legend scroll-reveal" aria-label="Filtrer le planning par discipline">
              {agendaFilters.map((filter) => {
                const isActive = filter.value === 'all' ? activeAgendaFilters.length === 0 : activeAgendaFilters.includes(filter.value)

                return (
                  <button
                    key={filter.value}
                    type="button"
                    className="planning-chip"
                    data-filter={filter.value}
                    aria-pressed={isActive}
                    onClick={() => toggleAgendaFilter(filter.value)}
                  >
                    <span aria-hidden="true" />
                    {filter.label}
                  </button>
                )
              })}
            </div>

            <div className="planning-wrap scroll-reveal">
              <table className="planning-table">
                <caption className="sr-only">Planning hebdomadaire des cours Samurai Gym</caption>
                <thead>
                  <tr>
                    <th scope="col">Heure</th>
                    {agendaDays.map((day) => (
                      <th key={day} scope="col">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {agendaRows.map((row) => (
                    <tr key={`${row.from}-${row.to}`}>
                      <th scope="row" className="planning-time">
                        <span>{row.from}</span>
                        <span className="planning-dash">-</span>
                        <span>{row.to}</span>
                      </th>
                      {row.sessions.map((session, sessionIndex) => {
                        const day = agendaDays[sessionIndex]
                        const dimmed = Boolean(session && activeAgendaFilters.length > 0 && !activeAgendaFilters.includes(session.filter))

                        return (
                          <td key={`${row.from}-${day}`} data-day={day} className={session ? undefined : 'planning-empty'}>
                            {session && (
                              <article className={`planning-session ${dimmed ? 'is-dim' : ''}`} data-discipline={session.filter}>
                                <span className="planning-coach">{session.coach}</span>
                                <h3>{session.discipline}</h3>
                                <span className="planning-duration">
                                  <Timer size={11} aria-hidden="true" />
                                  {session.duration}
                                </span>
                              </article>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="pricing" className="section">
          <SectionHeader eyebrow={t('pricing.eyebrow')} title={t('pricing.title')} text={t('pricing.text')} />
          <div className="mx-auto mt-14 grid max-w-7xl gap-6 px-5 md:grid-cols-2 xl:grid-cols-5 lg:px-8">
            {plans.map((plan) => {
              const copy = t(`pricing.plans.${plan.key}`, { returnObjects: true }) as [string, string, string, string[]]

              return (
              <motion.article key={plan.key} whileHover={{ y: -10, scale: 1.01 }} className={`price-card scroll-reveal ${plan.featured ? 'featured' : ''}`}>
                {plan.featured && <span className="popular">{t('pricing.popular')}</span>}
                {plan.discount && <span className="offer-badge">{plan.discount}</span>}
                <h3>{copy[0]}</h3>
                <p>{copy[1]}</p>
                <div className="price-stack">
                  {plan.oldPrice && <del>{plan.oldPrice}</del>}
                  <div className="price-line">
                    <strong>{plan.price}</strong>
                    <span>{plan.currency}</span>
                  </div>
                  <small>{t('pricing.only')} {copy[2]}</small>
                </div>
                <ul className="features">
                  {copy[3].map((perk) => (
                    <li key={perk}>
                      <Check size={17} />
                      {perk}
                    </li>
                  ))}
                </ul>
                <a href="#contact">{t('pricing.select')}</a>
              </motion.article>
              )
            })}
          </div>
        </section>

        <section className="section">
          <SectionHeader eyebrow={t('gallery.eyebrow')} title={t('gallery.title')} text={t('gallery.text')} />
          <div className="gallery-grid mx-auto mt-14 max-w-7xl px-5 lg:px-8">
            {gallery.map((image, index) => (
              <button key={image} type="button" className={`gallery-item item-${index + 1} scroll-reveal`} onClick={() => setLightbox(image)}>
                <img src={image} alt={t('gallery.alt', { number: index + 1 })} loading="lazy" />
              </button>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <SectionHeader eyebrow={t('contact.eyebrow')} title={t('contact.title')} text={t('contact.text')} />
          <div className="contact-grid mx-auto mt-14 grid max-w-7xl gap-6 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div className="contact-panel scroll-reveal">
              <a href="tel:+21624928016"><img className="contact-icon" src={phoneWhatsappIcon} alt="" /> 24928016</a>
              <a href="mailto:ramrocki@hotmail.com"><MessageCircle size={20} /> ramrocki@hotmail.com</a>
              <a href="https://www.google.com/maps/place/Samurai+Gym/@33.8863793,9.8076742,17z" target="_blank" rel="noreferrer"><MapPin size={20} /> {t('contact.map')}</a>
              <div className="social-row">
                <a href="https://www.facebook.com/Samurai.tunisia" target="_blank" rel="noreferrer" aria-label="Facebook"><img src={facebookIcon} alt="" /></a>
                <a href="https://www.instagram.com/samurai.tunisia/" target="_blank" rel="noreferrer" aria-label="Instagram"><img src={instagramIcon} alt="" /></a>
                <a href="https://www.google.com/maps/place/Samurai+Gym/@33.8863793,9.8076742,17z" target="_blank" rel="noreferrer" aria-label="Google Maps"><MapPin size={21} /></a>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name', { required: true })} placeholder={t('contact.name')} aria-label={t('contact.name')} />
                <input {...register('phone', { required: true })} placeholder={t('contact.phone')} aria-label={t('contact.phone')} />
                <textarea {...register('goal', { required: true })} placeholder={t('contact.goal')} aria-label={t('contact.goal')} />
                <button type="submit">{t('contact.send')} <ArrowRight size={18} /></button>
              </form>
            </div>
            <iframe
              className="map-frame scroll-reveal"
              title="SAMURAI GYM location"
              loading="lazy"
              src="https://www.google.com/maps?q=Samurai%20Gym%20Tunisia&output=embed"
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-4 lg:px-8">
          <div>
            <SamuraiMark className="mb-4 h-14 w-14 text-2xl" />
            <h2>SAMURAI GYM</h2>
            <FooterTagline onOpenAdmin={openAdminVerification} />
          </div>
          <div>
            <h3>{t('footer.links')}</h3>
            {navItems.map((item) => <a key={item.id} href={`#${item.id}`}>{t(item.label)}</a>)}
          </div>
          <div>
            <h3>{t('footer.hours')}</h3>
            <p><CalendarDays size={17} /> {t('footer.open')}</p>
            <p><Timer size={17} /> {t('footer.schedule')}</p>
          </div>
          <div>
            <h3>{t('footer.contact')}</h3>
            <p>24928016</p>
            <p>ramrocki@hotmail.com</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs uppercase tracking-[0.26em] text-samurai-muted">
          {t('footer.copyright')}
        </div>
      </footer>

      {lightbox && (
        <button type="button" className="lightbox" onClick={() => setLightbox(null)} aria-label="Close image preview">
          <X className="absolute right-6 top-6" size={30} />
          <img src={lightbox} alt={t('gallery.preview')} />
        </button>
      )}

      {selectedCoach && (
        <CoachProfileModal
          coach={{
            name: selectedCoach.name,
            title: selectedCoach.title,
            phone: selectedCoach.phone,
            email: selectedCoach.email,
            image: selectedCoach.image,
            schedule: selectedCoach.schedule,
          }}
          onClose={() => setSelectedCoach(null)}
        />
      )}

      <button
        type="button"
        className={`progress-wrap ${scrollProgress > 0.02 ? 'active-progress' : ''}`}
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
          <defs>
            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E10600" />
              <stop offset="100%" stopColor="#F8D86B" />
            </linearGradient>
          </defs>
          <path
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
            style={{
              strokeDasharray: '307.919, 307.919',
              strokeDashoffset: 307.919 - scrollProgress * 307.919,
            }}
          />
        </svg>
        <span>↑</span>
      </button>
    </div>
  )
}

export default App
