import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useForm } from 'react-hook-form'
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
import heroBackground from '../assets/photos/background.jpg'
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

const navItems = ['Home', 'Services', 'About', 'Pricing', 'Contact']

const services = [
  { icon: Dumbbell, title: 'Weight Training', text: 'Strength zones built for beginners, athletes, and serious lifters.' },
  { icon: Bike, title: 'Cardio', text: 'Conditioning work that builds stamina without stealing your power.' },
  { icon: Zap, title: 'Functional Training', text: 'Explosive circuits, mobility, balance, and battle-ready movement.' },
  { icon: Trophy, title: 'Personal Coaching', text: 'Direct guidance, form correction, and programs shaped around you.' },
  { icon: Beef, title: 'Nutrition Advice', text: 'Practical eating guidance to support muscle, energy, and recovery.' },
  { icon: Users, title: 'Group Classes', text: 'High-energy sessions with a disciplined, motivating community.' },
]

const values = [
  ['Mission', 'Build stronger bodies and sharper minds through disciplined coaching, respect, and modern training.'],
  ['Vision', 'Become Tunisia\'s most trusted transformation ground for beginners, athletes, and committed lifters.'],
  ['Values', 'Power, discipline, respect, consistency, community, and the warrior mentality to keep showing up.'],
]

const reasons = [
  { icon: professionalCoachesIcon, title: 'Professional Coaches', text: 'Clear instruction, smart progressions, and accountability from day one.' },
  { icon: modernEquipmentIcon, title: 'Modern Equipment', text: 'A complete training floor for strength, conditioning, and transformation.' },
  { icon: friendlyIcon, title: 'Friendly Community', text: 'A serious gym culture without intimidation. Respect comes first.' },
  { icon: motivatingIcon, title: 'Motivating Atmosphere', text: 'Dark, focused, energetic, and made for people who came to work.' },
  { icon: affordableIcon, title: 'Affordable Pricing', text: 'Premium standards with accessible membership options.' },
]

const plans = [
  {
    name: '1 Month',
    price: '80',
    currency: 'DT',
    monthly: '80 DT / month',
    text: 'Start strong and feel the atmosphere.',
    perks: ['Full gym access', 'Training floor access', 'Community support', 'Flexible start'],
  },
  {
    name: '3 Months',
    oldPrice: '240 DT',
    price: '200',
    currency: 'DT',
    monthly: '66.7 DT / month',
    discount: 'Save 17%',
    text: 'Build consistency and visible momentum.',
    perks: ['Full gym access', 'Coach guidance', 'Better monthly value', 'Progress rhythm'],
    featured: true,
  },
  {
    name: '6 Months',
    oldPrice: '480 DT',
    price: '380',
    currency: 'DT',
    monthly: '63.3 DT / month',
    discount: 'Save 21%',
    text: 'Commit to a serious transformation phase.',
    perks: ['Full gym access', 'Long-term value', 'Coach check-ins', 'Discipline plan'],
  },
  {
    name: '12 Months',
    oldPrice: '960 DT',
    price: '600',
    currency: 'DT',
    monthly: '50 DT / month',
    discount: 'Save 38%',
    text: 'The warrior year for total commitment.',
    perks: ['Best value', 'Full gym access', 'Year-round consistency', 'Priority support'],
  },
]

const coaches = [
  { name: 'Achref', role: 'Strength Coach', image: achrefCoach },
  { name: 'Ahmed', role: 'Performance Coach', image: ahmedCoach },
  { name: 'Coach Nermin', role: 'Fitness Coach', image: nerminCoach },
  { name: 'Coach Nourhen', role: 'Women\'s Coaching', image: nourhenCoach },
  { name: 'Coach Zouhour', role: 'Group Classes Coach', image: zouhourCoach },
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const { register, handleSubmit, reset } = useForm<ContactForm>()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 22 })
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 22 })
  const heroRotateX = useTransform(smoothY, [0, 1], [7, -7])
  const heroRotateY = useTransform(smoothX, [0, 1], [-7, 7])

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

  const onSubmit = (data: ContactForm) => {
    const message = encodeURIComponent(`Hi SAMURAI GYM, my name is ${data.name}. Phone: ${data.phone}. Goal: ${data.goal}`)
    window.open(`https://wa.me/21624928016?text=${message}`, '_blank', 'noopener,noreferrer')
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
            <span>SAMURAI GYM</span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
                {item}
              </a>
            ))}
          </div>

          <a href="#contact" className="hidden rounded-full bg-samurai-red px-5 py-3 text-sm font-black uppercase tracking-wide shadow-red transition hover:bg-samurai-accent lg:block">
            Join Now
          </a>

          <button className="icon-button lg:hidden" type="button" aria-label="Toggle menu" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="border-t border-white/10 bg-black/95 px-5 py-5 lg:hidden">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block py-3 text-sm font-bold uppercase tracking-[0.24em]" onClick={() => setMenuOpen(false)}>
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </header>

      <main>
        <section id="home" className="hero-section" style={{ '--hero-bg': `url(${heroBackground})` } as React.CSSProperties}>
          <div className="hero-grid mx-auto grid max-w-7xl items-center gap-12 px-5 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div className="relative z-10">
              <div className="reveal mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-samurai-muted">
                <Flame size={16} className="text-samurai-red" />
                Tunisia's warrior fitness ground
              </div>
              <h1 className="reveal hero-title samurai-logo" aria-label="SAMURAI GYM">
                <span className="samurai-word">SAMURAI</span>
                <span className="gym-word">GYM</span>
              </h1>
              <p className="reveal mt-5 max-w-2xl text-2xl font-semibold text-white md:text-4xl">
                Forge Your Strength. <span className="text-samurai-red">Master Your Discipline.</span>
              </p>
              <p className="reveal mt-6 max-w-xl text-base leading-8 text-samurai-muted md:text-lg">
                A premium training atmosphere built on power, respect, Japanese spirit, and modern fitness.
              </p>
              <div className="reveal mt-9 flex flex-col gap-4 sm:flex-row">
                <MagneticButton href="#contact">Start Today</MagneticButton>
                <MagneticButton href="#pricing" variant="ghost">View Memberships</MagneticButton>
              </div>
            </div>

            <motion.div className="hero-logo reveal" style={{ rotateX: heroRotateX, rotateY: heroRotateY }}>
              <div className="hero-orbit" />
              <SamuraiMark className="hero-emblem" />
              <div className="stat-card stat-one">
                <strong>500+</strong>
                <span>Members</span>
              </div>
              <div className="stat-card stat-two">
                <strong>7 Days</strong>
                <span>Open</span>
              </div>
              <div className="stat-card stat-three">
                <strong>100%</strong>
                <span>Motivation</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="quote-band scroll-reveal">
          <p>"Respect the process. Sharpen the body. Command the mind."</p>
        </section>

        <section id="services" className="section">
          <SectionHeader eyebrow="Services" title="Training Built For Transformation" text="Everything you need to start, grow, and stay dangerous to your old limits." />
          <div className="mx-auto mt-14 grid max-w-7xl gap-5 px-5 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {services.map(({ icon: Icon, title, text }) => (
              <motion.article key={title} whileHover={{ y: -8 }} className="service-card scroll-reveal">
                <Icon className="text-samurai-red" size={30} />
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="about" className="section section-split">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div className="scroll-reveal">
              <SectionHeader eyebrow="About" title="Discipline Has A Home" text="SAMURAI GYM is where strength, health, and mental relief meet under one disciplined roof." />
              <div className="arabic-panel" dir="rtl" lang="ar">
                <p>مرحبا بيك في Samurai Gym</p>
                <p>وين القوة، الصحة و الراحة النفسية يجتمعو</p>
                <p>جو حماسي و محفّز يخليك تعطي أقصى ما عندك</p>
                <p>ابدأ التغيير متاعك من توّا</p>
              </div>
            </div>
            <div className="grid gap-5">
              {values.map(([title, text]) => (
                <article key={title} className="value-card scroll-reveal">
                  <span>{title}</span>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <SectionHeader eyebrow="Why Choose Us" title="A Serious Room With Real Support" text="Premium does not mean cold. Here, discipline and community push in the same direction." />
          <div className="timeline mx-auto mt-16 max-w-6xl px-5 lg:px-8">
            {reasons.map(({ icon, title, text }, index) => (
              <div key={title} className="timeline-item scroll-reveal">
                <div className="timeline-index">{String(index + 1).padStart(2, '0')}</div>
                <img className="timeline-icon" src={icon} alt="" loading="lazy" />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="section">
          <SectionHeader eyebrow="Pricing" title="Choose Your Path" text="Simple membership plans with stronger value the longer you commit." />
          <div className="mx-auto mt-14 grid max-w-7xl gap-6 px-5 md:grid-cols-2 xl:grid-cols-4 lg:px-8">
            {plans.map((plan) => (
              <motion.article key={plan.name} whileHover={{ y: -10, scale: 1.01 }} className={`price-card scroll-reveal ${plan.featured ? 'featured' : ''}`}>
                {plan.featured && <span className="popular">Most Popular</span>}
                {plan.discount && <span className="offer-badge">{plan.discount}</span>}
                <h3>{plan.name}</h3>
                <p>{plan.text}</p>
                <div className="price-stack">
                  {plan.oldPrice && <del>{plan.oldPrice}</del>}
                  <div className="price-line">
                    <strong>{plan.price}</strong>
                    <span>{plan.currency}</span>
                  </div>
                  <small>Only {plan.monthly}</small>
                </div>
                <ul className="features">
                  {plan.perks.map((perk) => (
                    <li key={perk}>
                      <Check size={17} />
                      {perk}
                    </li>
                  ))}
                </ul>
                <a href="#contact">Select Plan</a>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section">
          <SectionHeader eyebrow="Coaches" title="Meet The Sensei Team" text="Real transformation needs sharp eyes, clear standards, and coaches who bring discipline to every rep." />
          <div className="coach-grid mx-auto mt-14 grid max-w-7xl gap-5 px-5 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
            {coaches.map((coach) => (
              <motion.article key={coach.name} whileHover={{ y: -10, scale: 1.015 }} className="coach-card scroll-reveal">
                <div className="coach-image">
                  <img className="coach-portrait" src={coach.image} alt={`${coach.name} from SAMURAI GYM coaching team`} loading="lazy" />
                </div>
                <div className="coach-info">
                  <span>Coach</span>
                  <h3>{coach.name}</h3>
                  <p>{coach.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section">
          <SectionHeader eyebrow="Gallery" title="Inside The Forge" text="Dark training atmosphere, focused equipment, and the energy of people becoming harder to stop." />
          <div className="gallery-grid mx-auto mt-14 max-w-7xl px-5 lg:px-8">
            {gallery.map((image, index) => (
              <button key={image} type="button" className={`gallery-item item-${index + 1} scroll-reveal`} onClick={() => setLightbox(image)}>
                <img src={image} alt={`SAMURAI GYM atmosphere ${index + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <SectionHeader eyebrow="Contact" title="Begin The Change Today" text="Call, message, or visit SAMURAI GYM. Your first step is the one that matters." />
          <div className="contact-grid mx-auto mt-14 grid max-w-7xl gap-6 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div className="contact-panel scroll-reveal">
              <a href="tel:+21624928016"><img className="contact-icon" src={phoneWhatsappIcon} alt="" /> 24928016</a>
              <a href="mailto:ramrocki@hotmail.com"><MessageCircle size={20} /> ramrocki@hotmail.com</a>
              <a href="https://www.google.com/maps/place/Samurai+Gym/@33.8863793,9.8076742,17z" target="_blank" rel="noreferrer"><MapPin size={20} /> Find us on Google Maps</a>
              <div className="social-row">
                <a href="https://www.facebook.com/Samurai.tunisia" target="_blank" rel="noreferrer" aria-label="Facebook"><img src={facebookIcon} alt="" /></a>
                <a href="https://www.instagram.com/samurai.tunisia/" target="_blank" rel="noreferrer" aria-label="Instagram"><img src={instagramIcon} alt="" /></a>
                <a href="https://www.google.com/maps/place/Samurai+Gym/@33.8863793,9.8076742,17z" target="_blank" rel="noreferrer" aria-label="Google Maps"><MapPin size={21} /></a>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name', { required: true })} placeholder="Your name" aria-label="Your name" />
                <input {...register('phone', { required: true })} placeholder="Phone number" aria-label="Phone number" />
                <textarea {...register('goal', { required: true })} placeholder="Your training goal" aria-label="Your training goal" />
                <button type="submit">Send WhatsApp Message <ArrowRight size={18} /></button>
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
            <p>Power. Discipline. Respect. Strength.</p>
          </div>
          <div>
            <h3>Quick Links</h3>
            {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
          </div>
          <div>
            <h3>Working Hours</h3>
            <p><CalendarDays size={17} /> Open 7 Days</p>
            <p><Timer size={17} /> Contact for daily schedule</p>
          </div>
          <div>
            <h3>Contact</h3>
            <p>24928016</p>
            <p>ramrocki@hotmail.com</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs uppercase tracking-[0.26em] text-samurai-muted">
          Copyright 2026 SAMURAI GYM. All rights reserved.
        </div>
      </footer>

      {lightbox && (
        <button type="button" className="lightbox" onClick={() => setLightbox(null)} aria-label="Close image preview">
          <X className="absolute right-6 top-6" size={30} />
          <img src={lightbox} alt="SAMURAI GYM enlarged gallery preview" />
        </button>
      )}
    </div>
  )
}

export default App
