import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { supabase } from './lib/supabaseClient'
// ─── Theme context ─────────────────────────────────────────────────────────────
const ThemeCtx = createContext<{ dark: boolean; toggle: () => void }>({ dark: true, toggle: () => {} })
function useTheme() { return useContext(ThemeCtx) }

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

const SKILLS = [
  'Product Design', 'UI/UX Research', 'React / Next.js', 'TypeScript',
  'Node.js', 'Figma', 'Design Systems', 'PostgreSQL', 'AWS', 'GraphQL',
  'Motion Design', 'Tailwind CSS',
]

const VALUES = [
  { icon: '◈', label: 'Craft over speed', desc: 'Details compound into excellence.' },
  { icon: '◉', label: 'Clarity first', desc: 'Every layer should earn its place.' },
  { icon: '◇', label: 'Continuous growth', desc: 'Comfort zones are ceilings.' },
]

const EXPERIENCE = [
  {
    year: '2023 – 2024',
    role: 'Finished high school',
    company: 'Has an excellent degree',
    desc: 'Throughout my 12-year academic journey, I have consistently challenged myself to reach greater heights, embracing every opportunity to grow and striving relentlessly for academic excellence.',
    tags: ['Thpt', 'DongThap', 'school'],
  },
  {
    year: '2024 – 2025',
    role: 'Stepping into university marked the beginning of a new chapter.',
    company: 'Stepping into university, I was still finding my path.',
    desc: 'Here, I had the opportunity to make many new friends, learn from them, and share many happy and memorable moments together. Through these friendships, I gained not only valuable experiences but also a lot of new knowledge. I was able to explore and learn about things that I had never tried or experienced before, which helped me become more open-minded and confident in discovering new things.',
    tags: ['University', 'UTHer', 'HCMcity' ,'BinhThanhcity'],
  },
  {
    year: '2025 – 2026',
    role: 'I gained a great deal of knowledge.',
    company: 'Gaining extensive knowledge in programming and design.',
    desc: 'With this knowledge, I was able to independently build complete websites, applications, and software projects.',
    tags: ['Web Development', 'Application Development', 'Game Development'],
  },
  {
    year: '2024 – Present',
    role: 'B.Sc. Information Technology',
    company: 'HCMC University of Transport',
    desc: 'I actively participate in student organizations, clubs, and various groups, where I have gained valuable experiences and developed my teamwork and communication skills. Through these activities, I have also had the opportunity to challenge myself and achieve positive results in programming competitions.',
    tags: ['Computer Science', 'Information Technology','Research'],
    isEducation: true,
  },
]

const PROJECTS = [
  {
    name: 'A Heartfelt Card for Someone You Love',
    category: 'Online Tet Greeting Cards',
    desc: 'Welcome Tet 2026 – the Year of the Horse with a beautifully crafted online Tet greeting card inspired by traditional Vietnamese New Year celebrations. Send heartfelt wishes of Peace, Prosperity, Happiness, and Good Fortune to your family, friends, and loved ones in a truly special way.',
    tech: ['TypeScript', 'CSS', 'Node.js'],
    image: `${import.meta.env.BASE_URL}png/ThiepTet.png`,
    color: '#1a1508',
    link: '#',
    github: '#',
  },
  {
    name: 'Happy Birthday to a Wonderful Friend!',
    category: 'Online Birthday Greeting Cards',
    desc: 'Make every birthday unforgettable with a personalized online birthday card filled with love, joy, and beautiful surprises. Create a special moment and send your heartfelt wishes to someone who means the world to you.',
    tech: ['JavaScript', 'CSS', 'TypeScript', 'HTML'],
    image: `${import.meta.env.BASE_URL}png/ThiepSN.png`,
    color: '#0a0f1a',
    link: '#',
    github: '#',
  },
  {
    name: 'A Messaging App That Brings People Together',
    category: 'online RoomChat Pro',
    desc: 'RoomChat Pro is a modern messaging application designed to bring people together through simple, convenient, and private conversations. Create an account, join chat rooms, connect with other members, and share your thoughts in real time.',
    tech: ['C#', 'Figma', 'PLpgSQL'],
    image: `${import.meta.env.BASE_URL}png/RoomChat.jpg`,
    color: '#0a1208',
    link: '#',
    github: '#',
  },
]

const CERTS = [
  { name: 'xxxxxxxxxx', issuer: 'xxxxxx', year: 'xxxx', icon: '▲' },
  { name: 'xxxxxxxxxx', issuer: 'xxxxxx', year: 'xxxx', icon: '●' },
  { name: 'xxxxxxxxxx', issuer: 'xxxxxx', year: 'xxxx', icon: '◆' },
  { name: 'xxxxxxxxxx', issuer: 'xxxxxx', year: 'xxxx', icon: '⬡' },
  { name: 'Basic Computer Skills', issuer: 'HCMC University of Transport', year: '2025', icon: '✦', isAward: true },
  { name: 'Basic Programming Certificate', issuer: 'Issued by the Faculty/Institute of Information Technology', year: '2026', icon: '✦', isAward: true },
]

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('visible'); io.unobserve(e.target) } }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ─── Components ───────────────────────────────────────────────────────────────

function ThemeToggle() {
  const { dark, toggle } = useTheme()
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle dark/light mode" title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
      {dark ? (
        // Sun icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        // Moon icon
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  )
}

function Navbar({ scrolled }: { scrolled: boolean }) {
  const { dark } = useTheme()
  const [open, setOpen] = useState(false)
  const navBg = scrolled
    ? dark ? 'rgba(10,10,10,0.92)' : 'rgba(247,245,241,0.92)'
    : 'transparent'
  const borderB = scrolled
    ? dark ? '1px solid rgba(201,169,110,0.08)' : '1px solid rgba(139,102,47,0.1)'
    : 'none'
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: navBg, backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: borderB }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 no-underline">
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#c9a96e', fontStyle: 'italic', letterSpacing: '0.02em' }}> Ngô Thành Đạt</span>
        </a>

        {/* Desktop nav */}
        <nav className="mobile-hide flex items-center gap-8">
          {NAV.map(n => <a key={n.href} href={n.href} className="nav-link">{n.label}</a>)}
        </nav>

        {/* CTA + toggle */}
        <div className="mobile-hide flex items-center gap-3">
          <ThemeToggle />
          <a href="#contact" className="btn-primary" style={{ padding: '9px 20px', fontSize: '0.75rem' }}>Hire Me</a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="flex flex-col gap-[5px] p-2 md:hidden"
          onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          aria-label="Toggle menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{ display: 'block', width: 22, height: 1.5, background: open && i === 1 ? 'transparent' : '#c9a96e', transition: 'all 0.2s', transform: open ? (i===0 ? 'rotate(45deg) translate(4.5px, 4.5px)' : i===2 ? 'rotate(-45deg) translate(4.5px, -4.5px)' : '') : '' }} />
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{ background: dark ? 'rgba(10,10,10,0.97)' : 'rgba(247,245,241,0.97)', borderTop: '1px solid rgba(201,169,110,0.1)', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {NAV.map(n => <a key={n.href} href={n.href} className="nav-link" onClick={() => setOpen(false)} style={{ fontSize: '0.9rem' }}>{n.label}</a>)}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
            <a href="#contact" className="btn-primary" style={{ alignSelf: 'flex-start' }} onClick={() => setOpen(false)}>Hire Me</a>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  )
}

function Hero({ bg, dark }: { bg: string; dark: boolean }) {
  const text = dark ? '#f0ebe3' : '#1a1a1a'
  const muted = dark ? '#a8a8a8' : '#555'
  const subtle = dark ? '#666' : '#999'
  return (
    <section id="hero" className="noise relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ paddingTop: 80, background: bg }}>
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(201,169,110,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.03) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      {/* Glow orb */}
      <div className="absolute pointer-events-none" style={{ top: '20%', left: '60%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)', transform: 'translate(-50%, -50%)' }} />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 gap-12" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', alignItems: 'center' }}>
          {/* Left: Text */}
          <div style={{ maxWidth: 680 }}>
            <p className="animate-fade-up delay-100" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: 24 }}>
              ◈ Available for freelance work · 2026
            </p>

            <h1 className="animate-fade-up delay-200" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 600, lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.02em' }}>
              <span style={{ display: 'block', color: text }}>Ngô Thành</span>
              <span className="gold-shimmer" style={{ display: 'block' }}>Đạt (PooPon).</span>
            </h1>

            <p className="animate-fade-up delay-300" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 300, color: muted, maxWidth: 520, lineHeight: 1.7, marginBottom: 16 }}>
              Senior Product Designer &amp; Full-Stack Engineer
            </p>
            <p className="animate-fade-up delay-400" style={{ fontSize: '1rem', fontStyle: 'italic', fontFamily: 'var(--font-display)', color: subtle, marginBottom: 48 }}>
              "Design is not decoration. It is the architecture of intent."
            </p>

            <div className="animate-fade-up delay-500 flex flex-wrap gap-4">
              <a href="#projects" className="btn-primary">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Xem Dự Án
              </a>
              <a href="#contact" className="btn-outline">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.3"/><path d="M1 4l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                Liên Hệ
              </a>
            </div>

            {/* Stats row */}
            <div className="animate-fade-up delay-600 flex gap-10 mt-16 pt-10" style={{ borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}` }}>
              {[['3+', 'Năm kinh nghiệm'], ['10+', 'Dự án đã thực hiện'], ['0+', 'Giải thưởng & Chứng chỉ']].map(([n, l]) => (
                <div key={l}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#c9a96e', lineHeight: 1 }}>{n}</p>
                  <p style={{ fontSize: '0.75rem', color: subtle, marginTop: 4, letterSpacing: '0.05em' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Profile card */}
          <div className="animate-fade-in delay-400 flex justify-center lg:justify-end">
            <div className="glass-card relative" style={{ borderRadius: 4, overflow: 'hidden', width: 320, flexShrink: 0 }}>
              <img
                  src={`${import.meta.env.BASE_URL}png/TD1.png`}
                  alt="Profile photo"
                  style={{
                    width: '100%',
                    height: 380,
                    objectFit: 'cover',
                    display: 'block',
                    backgroundColor: '#1a1a1a'
                  }}
                />
              <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(201,169,110,0.1)', background: dark ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: 6 }}>Based in</p>
                <p style={{ fontWeight: 500, color: text }}>Hồ Chí Minh City, Vietnam</p>
                <div className="flex gap-3 mt-4">
                  {[
                      { name: 'fb', href: 'https://www.facebook.com/share/1MqAtHoo77/?mibextid=wwXIfr' },
                      { name: 'gh', href: 'https://github.com/ThanhDatttttttt' },
                      { name: 'tk', href: 'https://www.tiktok.com/@thahdat06.pon' },
                      { name: 'ig', href: 'https://www.instagram.com/than.hdta' },
                    ].map(s => (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                        aria-label={s.name}
                      >
                        <SocialIcon name={s.name} />
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 animate-fade-in delay-700" style={{ transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#444', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(201,169,110,0.5), transparent)' }} />
      </div>
    </section>
  )
}

function About({ dark }: { dark: boolean }) {
  const text = dark ? '#f0ebe3' : '#1a1a1a'
  const muted = dark ? '#a8a8a8' : '#555'
  const dim = dark ? '#666' : '#888'
  const cardBg = dark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.03)'
  const cardBorder = dark ? 'rgba(201,169,110,0.1)' : 'rgba(139,102,47,0.12)'
  return (
    <section id="about" style={{ padding: 'clamp(80px, 12vw, 140px) 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-rule mb-20" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 64, alignItems: 'start' }}>
          {/* Left */}
          <div>
            <p className="reveal" style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: 16 }}>01 — Về tôi</p>
            <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em', color: text, marginBottom: 32 }}>
              Kiến trúc sư của<br />
              <em style={{ color: '#c9a96e' }}>trải nghiệm số.</em>
            </h2>
            <p className="reveal" style={{ fontSize: '1rem', lineHeight: 1.85, color: muted, marginBottom: 20 }}>
              Tôi là một designer và engineer với hơn 3 năm kinh nghiệm biến những ý tưởng phức tạp thành sản phẩm số tinh tế và dễ sử dụng. Tôi tin rằng ranh giới giữa thiết kế và kỹ thuật là nơi những sản phẩm thực sự xuất sắc được tạo ra.
            </p>
            <p className="reveal" style={{ fontSize: '1rem', lineHeight: 1.85, color: muted }}>
              Phong cách làm việc của tôi kết hợp tư duy hệ thống với con mắt thẩm mỹ—tôi không chỉ xây dựng giao diện, tôi kiến trúc nên trải nghiệm có khả năng mở rộng theo tầm nhìn.
            </p>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {/* Values */}
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {VALUES.map(v => (
                <div key={v.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '18px 20px', border: `1px solid ${cardBorder}`, borderRadius: 3, background: cardBg }}>
                  <span style={{ fontSize: '1.1rem', color: '#c9a96e', marginTop: 1, flexShrink: 0 }}>{v.icon}</span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', color: text, marginBottom: 4 }}>{v.label}</p>
                    <p style={{ fontSize: '0.85rem', color: dim }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="reveal">
              <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: dim, marginBottom: 16 }}>Core Skills</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SKILLS.map(s => <span key={s} className="skill-badge">{s}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience({ dark, bg }: { dark: boolean; bg: string }) {
  const text = dark ? '#f0ebe3' : '#1a1a1a'
  const muted = dark ? '#888' : '#666'
  const divider = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)'
  const tagColor = dark ? '#888' : '#777'
  const tagBorder = dark ? 'rgba(201,169,110,0.18)' : 'rgba(139,102,47,0.2)'
  return (
    <section id="experience" style={{ padding: 'clamp(80px, 12vw, 140px) 0', background: bg }}>
      <div className="max-w-7xl mx-auto px-6">
        <p className="reveal" style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: 16 }}>02 — Kinh nghiệm</p>
        <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em', color: text, marginBottom: 72 }}>
          Hành trình <em style={{ color: '#c9a96e' }}>sự nghiệp.</em>
        </h2>

        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: 0, top: 8, bottom: 0, width: 1, background: 'linear-gradient(to bottom, rgba(201,169,110,0.3), transparent)', display: 'none' }} className="md-line" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {EXPERIENCE.map((e, i) => (
              <div key={i} className="reveal" style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '0 40px', paddingBottom: i < EXPERIENCE.length - 1 ? 52 : 0, borderBottom: i < EXPERIENCE.length - 1 ? `1px solid ${divider}` : 'none', marginBottom: i < EXPERIENCE.length - 1 ? 52 : 0 }}>
                {/* Year */}
                <div style={{ paddingTop: 4 }}>
                  <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#c9a96e', letterSpacing: '0.05em', fontFamily: 'var(--font-sans)' }}>{e.year}</p>
                  {e.isEducation && <p style={{ fontSize: '0.7rem', color: muted, marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Education</p>}
                </div>

                {/* Content */}
                <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div className="tl-dot" style={{ marginTop: 7 }} />
                  <div>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: text, marginBottom: 4 }}>{e.role}</p>
                    <p style={{ fontSize: '0.85rem', color: '#c9a96e', marginBottom: 12, fontWeight: 500 }}>{e.company}</p>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: muted, marginBottom: 16 }}>{e.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {e.tags.map(t => (
                        <span key={t} style={{ fontSize: '0.72rem', fontWeight: 600, padding: '3px 10px', border: `1px solid ${tagBorder}`, borderRadius: 2, color: tagColor, letterSpacing: '0.05em' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects({ dark }: { dark: boolean }) {
  const text = dark ? '#f0ebe3' : '#1a1a1a'
  const muted = dark ? '#888' : '#666'
  const cardBg = dark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.025)'
  const tagBorder = dark ? 'rgba(201,169,110,0.15)' : 'rgba(139,102,47,0.18)'
  const tagColor = dark ? '#666' : '#777'
  return (
    <section id="projects" style={{ padding: 'clamp(80px, 12vw, 140px) 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 72 }}>
          <div>
            <p className="reveal" style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: 16 }}>03 — Dự án</p>
            <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em', color: text }}>
              Công trình <em style={{ color: '#c9a96e' }}>tiêu biểu.</em>
            </h2>
          </div>
          <a href="#" className="reveal btn-outline" style={{ fontSize: '0.75rem' }}>Tất cả dự án →</a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {PROJECTS.map((p, i) => (
            <div key={p.name} className="project-card reveal glass-card" style={{ borderRadius: 4, overflow: 'hidden', display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr', gap: 0 }}>
              {/* Image side */}
              <div style={{ order: i % 2 === 0 ? 0 : 1, position: 'relative', overflow: 'hidden', background: p.color, minHeight: 300 }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.7, transition: 'opacity 0.3s, transform 0.5s', minHeight: 300 }}
                  onMouseEnter={e => { (e.target as HTMLImageElement).style.opacity = '0.9'; (e.target as HTMLImageElement).style.transform = 'scale(1.04)' }}
                  onMouseLeave={e => { (e.target as HTMLImageElement).style.opacity = '0.7'; (e.target as HTMLImageElement).style.transform = 'scale(1)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${p.color}88 0%, transparent 60%)` }} />
              </div>

              {/* Text side */}
              <div style={{ order: i % 2 === 0 ? 1 : 0, padding: 'clamp(28px, 5vw, 52px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: cardBg }}>
                <p style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: 12, fontWeight: 600 }}>{p.category}</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 600, color: text, marginBottom: 16, lineHeight: 1.2 }}>{p.name}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: muted, marginBottom: 28 }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                  {p.tech.map(t => <span key={t} style={{ fontSize: '0.72rem', fontWeight: 600, padding: '4px 11px', border: `1px solid ${tagBorder}`, borderRadius: 2, color: tagColor, letterSpacing: '0.04em' }}>{t}</span>)}
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <a href={p.link} className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.75rem' }}>Live Demo →</a>
                  <a href={p.github} className="btn-outline" style={{ padding: '9px 20px', fontSize: '0.75rem' }}>GitHub</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Certifications({ dark, bg }: { dark: boolean; bg: string }) {
  const text = dark ? '#f0ebe3' : '#1a1a1a'
  const muted = dark ? '#666' : '#888'
  return (
    <section id="certifications" style={{ padding: 'clamp(80px, 12vw, 140px) 0', background: bg }}>
      <div className="max-w-7xl mx-auto px-6">
        <p className="reveal" style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: 16 }}>04 — Chứng chỉ & Giải thưởng</p>
        <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em', color: text, marginBottom: 72 }}>
          Uy tín <em style={{ color: '#c9a96e' }}>được công nhận.</em>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {CERTS.map((c) => (
            <div key={c.name} className={`cert-card reveal ${c.isAward ? 'award-card' : ''}`} style={c.isAward ? { borderColor: 'rgba(201,169,110,0.3)', background: 'rgba(201,169,110,0.04)' } : {}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ fontSize: '1.1rem', color: c.isAward ? '#c9a96e' : '#444' }}>{c.icon}</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#444', letterSpacing: '0.05em' }}>{c.year}</span>
              </div>
              <p style={{ fontWeight: 600, fontSize: '0.9rem', color: text, lineHeight: 1.4, marginBottom: 8 }}>{c.name}</p>
              <p style={{ fontSize: '0.78rem', color: muted }}>{c.issuer}</p>
              {c.isAward && <span style={{ display: 'inline-block', marginTop: 12, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c9a96e', padding: '2px 8px', border: '1px solid rgba(201,169,110,0.3)', borderRadius: 2 }}>Award</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact({ dark }: { dark: boolean }) {
  const text = dark ? '#f0ebe3' : '#1a1a1a'
  const muted = dark ? '#888' : '#666'
  const dim = dark ? '#444' : '#aaa'
  const iconBorder = dark ? 'rgba(201,169,110,0.2)' : 'rgba(139,102,47,0.2)'
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const { error } = await supabase
      .from('contact_messages')
      .insert([{
        full_name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      }])

    if (error) {
      console.error('Lỗi gửi form:', error)
      alert('Có lỗi xảy ra, vui lòng thử lại.')
      return
    }

    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contact" style={{ padding: 'clamp(80px, 12vw, 140px) 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-rule mb-20" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 64 }}>
          {/* Left */}
          <div>
            <p className="reveal" style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: 16 }}>05 — Liên hệ</p>
            <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em', color: text, marginBottom: 24 }}>
              Hãy cùng nhau<br /><em style={{ color: '#c9a96e' }}>tạo ra điều gì đó.</em>
            </h2>
            <p className="reveal" style={{ fontSize: '0.95rem', lineHeight: 1.8, color: muted, marginBottom: 48, maxWidth: 400 }}>
              Đang tìm kiếm cộng tác cho dự án tiếp theo? Tôi luôn sẵn sàng lắng nghe ý tưởng của bạn và cùng nhau biến nó thành hiện thực.
            </p>

            {/* Contact info */}
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
              {[
                { icon: '✉', label: 'Email', value: 'ngodatthdt2021@gmail.com' },
                { icon: '◎', label: 'Location', value: 'Ho Chi Minh City, Vietnam' },
                { icon: '◷', label: 'Response Time', value: 'Within 24 hours' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <span style={{ width: 36, height: 36, border: `1px solid ${iconBorder}`, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', color: '#c9a96e', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: '0.72rem', color: dim, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>{item.label}</p>
                    <p style={{ fontSize: '0.9rem', color: muted }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="reveal" style={{ display: 'flex', gap: 10 }}>
              {[
                { name: 'ig', href: 'https://www.instagram.com/than.hdta' },
                { name: 'gh', href: 'https://github.com/ThanhDatttttttt' },
                { name: 'em', href: 'mailto:ngodatthdt2021@gmail.com' },
                { name: 'fb', href: 'https://www.facebook.com/share/1MqAtHoo77/?mibextid=wwXIfr' },
                { name: 'tk', href: 'https://www.tiktok.com/@thahdat06.pon' },
              ].map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={s.name}
                >
                  <SocialIcon name={s.name} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal">
            {sent ? (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 48, border: '1px solid rgba(201,169,110,0.2)', borderRadius: 4, textAlign: 'center', background: 'rgba(201,169,110,0.04)' }}>
                <span style={{ fontSize: '2.5rem', color: '#c9a96e' }}>✦</span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: text }}>Tin nhắn đã được gửi!</p>
                <p style={{ color: muted, fontSize: '0.9rem' }}>Tôi sẽ phản hồi trong vòng 24 giờ.</p>
                <button className="btn-outline" onClick={() => setSent(false)} style={{ marginTop: 8 }}>Gửi tin khác</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: dim, display: 'block', marginBottom: 8 }}>Họ tên</label>
                    <input className="form-input" type="text" placeholder="Nguyễn Thị B" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={{ color: text }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: dim, display: 'block', marginBottom: 8 }}>Email</label>
                    <input className="form-input" type="email" placeholder="b@company.com" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={{ color: text }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: dim, display: 'block', marginBottom: 8 }}>Tiêu đề</label>
                  <input className="form-input" type="text" placeholder="Tôi muốn hợp tác về..." required value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} style={{ color: text }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: dim, display: 'block', marginBottom: 8 }}>Nội dung</label>
                  <textarea className="form-input" rows={6} placeholder="Kể tôi nghe về dự án của bạn..." required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ resize: 'vertical', color: text }} />
                </div>
                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: 4 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Gửi tin nhắn
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer({ dark }: { dark: boolean }) {
  const dimColor = dark ? '#333' : '#aaa'
  const footerBg = dark ? '#0a0a0a' : '#ede9e2'
  const borderColor = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.07)'
  return (
    <footer style={{ borderTop: `1px solid ${borderColor}`, padding: '32px 0', background: footerBg }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-4">
        <p style={{ fontSize: '0.78rem', color: dimColor }}>© 2026  Ngô Thành Đạt. All rights reserved.</p>
        <p style={{ fontSize: '0.78rem', color: dimColor }}>Crafted with care — <span style={{ color: '#c9a96e' }}>HCMC, Vietnam</span></p>
      </div>
    </footer>
  )
}

// ─── Social Icon Helper ────────────────────────────────────────────────────────

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    // Instagram
    ig: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),

    // GitHub
    gh: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),

    // Mail
    em: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),

    // Facebook
    fb: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 8h3V4h-3c-3.314 0-5 1.686-5 5v3H6v4h3v8h4v-8h3.5l.5-4H13V9c0-.667.333-1 1-1z" />
      </svg>
    ),

    // TikTok
    tk: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69A4.83 4.83 0 0 1 16 4.5V3h-3.5v12.1a2.9 2.9 0 1 1-2-2.75V8.8a6.4 6.4 0 1 0 5.5 6.3V9.36a8.3 8.3 0 0 0 4.8 1.5V7.4a4.8 4.8 0 0 1-1.21-.71z" />
      </svg>
    ),
  }

  return icons[name] ?? (
    <span style={{ fontSize: '0.7rem' }}>
      {name.toUpperCase()}
    </span>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(true)
  useReveal()

  // Sync body class for CSS light-mode overrides
  useEffect(() => {
    document.body.classList.toggle('light', !dark)
  }, [dark])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggle = () => setDark(d => !d)

  // Dynamic inline style helpers driven by dark flag
  const bg = dark ? '#0a0a0a' : '#f7f5f1'
  const bgAlt = dark ? '#0d0d0d' : '#eeebe5'

  return (
    <ThemeCtx.Provider value={{ dark, toggle }}>
      <div style={{ minHeight: '100vh', background: bg, transition: 'background 0.4s ease' }}>
        <Navbar scrolled={scrolled} />
        <Hero bg={bg} dark={dark} />
        <About dark={dark} />
        <Experience dark={dark} bg={bgAlt} />
        <Projects dark={dark} />
        <Certifications dark={dark} bg={bgAlt} />
        <Contact dark={dark} />
        <Footer dark={dark} />
      </div>
    </ThemeCtx.Provider>
  )
}
// NgoDat#26092006 supabase