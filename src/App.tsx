import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  Beef,
  Bike,
  CalendarDays,
  Check,
  Dumbbell,
  Flame,
  MapPin,
  Menu,
  MessageCircle,
  Timer,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react'
import affordableIcon from '../assets/icons/Affordable Pricing.png'
import achrefCoach from '../assets/photos/Achref coach.png'
import ahmedCoach from '../assets/photos/Ahmed coach.png'
import facebookIcon from '../assets/icons/facebook.png'
import friendlyIcon from '../assets/icons/Friendly Community.png'
import heroVideo from '../assets/photos/INTRO BACKGROUND VEDIO .mp4'
import instagramIcon from '../assets/icons/instagram.png'
import modernEquipmentIcon from '../assets/icons/Modern Equipment.png'
import motivatingIcon from '../assets/icons/Motivating Atmosphere.png'
import nerminCoach from '../assets/photos/Coach Nermin.png'
import nourhenCoach from '../assets/photos/Coach Nourhen.png'
import phoneWhatsappIcon from '../assets/icons/phone and whatsapp.png'
import professionalCoachesIcon from '../assets/icons/Professional Coaches.png'
import zouhourCoach from '../assets/photos/Coach Zouhour.png'
import samuraiLogo from '../assets/photos/LOGo.png'

gsap.registerPlugin(ScrollTrigger)

type ContactForm = {
  name: string
  phone: string
  goal: string
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
  { icon: Dumbbell, key: 'weights' },
  { icon: Bike, key: 'cardio' },
  { icon: Zap, key: 'functional' },
  { icon: Trophy, key: 'coaching' },
  { icon: Beef, key: 'nutrition' },
  { icon: Users, key: 'classes' },
]

const reasons = [
  { icon: professionalCoachesIcon, key: 'coaches' },
  { icon: modernEquipmentIcon, key: 'equipment' },
  { icon: friendlyIcon, key: 'community' },
  { icon: motivatingIcon, key: 'atmosphere' },
  { icon: affordableIcon, key: 'affordable' },
]

const plans = [
  {
    key: 'one',
    price: '80',
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

const coaches = [
  { name: 'Achref', roleKey: 'achref', image: achrefCoach },
  { name: 'Ahmed', roleKey: 'ahmed', image: ahmedCoach },
  { name: 'Coach Nermin', roleKey: 'nermin', image: nerminCoach },
  { name: 'Coach Nourhen', roleKey: 'nourhen', image: nourhenCoach },
  { name: 'Coach Zouhour', roleKey: 'zouhour', image: zouhourCoach },
]

const gallery = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=85',
]

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

function App() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [stats, setStats] = useState({ members: 0, days: 0, motivation: 0 })
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

        <section className="quote-band scroll-reveal">
          <p>"{t('quote')}"</p>
        </section>

        <section id="services" className="section">
          <SectionHeader eyebrow={t('services.eyebrow')} title={t('services.title')} text={t('services.text')} />
          <div className="mx-auto mt-14 grid max-w-7xl gap-5 px-5 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {serviceDefinitions.map(({ icon: Icon, key }) => {
              const copy = t(`services.items.${key}`, { returnObjects: true }) as string[]

              return (
              <motion.article key={key} whileHover={{ y: -8 }} className="service-card scroll-reveal">
                <Icon className="text-samurai-red" size={30} />
                <h3>{copy[0]}</h3>
                <p>{copy[1]}</p>
              </motion.article>
              )
            })}
          </div>
        </section>

        <section id="about" className="section section-split">
          <SectionHeader eyebrow={t('coaches.eyebrow')} title={t('coaches.title')} text={t('coaches.text')} />
          <div className="coach-grid mx-auto mt-14 grid max-w-7xl gap-5 px-5 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
            {coaches.map((coach) => (
              <motion.article key={coach.name} whileHover={{ y: -10, scale: 1.015 }} className="coach-card scroll-reveal">
                <div className="coach-image">
                  <img className="coach-portrait" src={coach.image} alt={`${coach.name} from SAMURAI GYM coaching team`} loading="lazy" />
                </div>
                <div className="coach-info">
                  <span>{t('coaches.label')}</span>
                  <h3>{coach.name}</h3>
                  <p>{t(`coaches.roles.${coach.roleKey}`)}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section">
          <SectionHeader eyebrow={t('why.eyebrow')} title={t('why.title')} text={t('why.text')} />
          <div className="timeline mx-auto mt-16 max-w-6xl px-5 lg:px-8">
            {reasons.map(({ icon, key }, index) => {
              const copy = t(`why.items.${key}`, { returnObjects: true }) as string[]

              return (
              <div key={key} className="timeline-item scroll-reveal">
                <div className="timeline-index">{String(index + 1).padStart(2, '0')}</div>
                <img className="timeline-icon" src={icon} alt="" loading="lazy" />
                <div>
                  <h3>{copy[0]}</h3>
                  <p>{copy[1]}</p>
                </div>
              </div>
              )
            })}
          </div>
        </section>

        <section id="pricing" className="section">
          <SectionHeader eyebrow={t('pricing.eyebrow')} title={t('pricing.title')} text={t('pricing.text')} />
          <div className="mx-auto mt-14 grid max-w-7xl gap-6 px-5 md:grid-cols-2 xl:grid-cols-4 lg:px-8">
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
            <p>{t('footer.tagline')}</p>
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
    </div>
  )
}

export default App
