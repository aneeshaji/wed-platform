import { useEffect, useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import {
  ArrowUpIcon,
  BedIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  CloseIcon,
  CopyIcon,
  EnvelopeIcon,
  GlassIcon,
  GlobeIcon,
  HeartIcon,
  HelpIcon,
  MapPinIcon,
  MenuIcon,
  MusicIcon,
  MusicMutedIcon,
  PhoneIcon,
  PlaneIcon,
  RingsIcon,
  ShareIcon,
  SparklesIcon,
  TrainIcon,
} from './icons'
import { Diya } from './decor'
import config from './config'
import './App.css'

/* ------------------------------------------------------------------
   Config — imported per-couple from src/config/ (chosen at build time
   by VITE_COUPLE). Couple content lives in src/config/couples/<slug>.js,
   shared UI labels in src/config/base.js. Keep this block read-only.
------------------------------------------------------------------ */
const {
  L,
  navLinks,
  venueUrl,
  venueAddress,
  venueName,
  venueMapEmbed,
  receptionVenue,
  highlights,
  schedule,
  sparkles,
  petals,
  events,
  faqs,
  travelData,
  calendar,
} = config

const weddingTarget = new Date(config.weddingTarget).getTime()
const { name1, name2, initials, brandDate, heroImage, heroAlt } = config.brand

/* Map icon string keys (used in the couple config) to icon components. */
const ICONS = {
  mappin: MapPinIcon,
  heart: HeartIcon,
  rings: RingsIcon,
  glass: GlassIcon,
  plane: PlaneIcon,
  train: TrainIcon,
  bed: BedIcon,
  phone: PhoneIcon,
}



/* ---------------- Small helpers ---------------- */

function splitWord(word) {
  return word.split('').map((ch, i) => (
    <span className="letter" key={i} style={{ '--li': i }}>
      {ch}
    </span>
  ))
}

function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(false)
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      setShowTop(window.scrollY > 520)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return { scrolled, showTop }
}

function useReveal() {
  const rootRef = useRef(null)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const targets = root.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return rootRef
}

function useCountdown(target) {
  const compute = () => {
    const diff = Math.max(0, target - Date.now())
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }
  const [countdown, setCountdown] = useState(compute)
  useEffect(() => {
    const id = setInterval(() => setCountdown(compute()), 1000)
    return () => clearInterval(id)
  }, [target])
  return countdown
}

function App() {
  const [lang, setLang] = useState(() => {
    if (typeof localStorage === 'undefined') return 'en'
    return localStorage.getItem('ml_lang') || 'en'
  })
  const { scrolled, showTop } = useHeaderScroll()
  const pageRef = useReveal()
  const [copied, setCopied] = useState(false)
  const [addressCopied, setAddressCopied] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)
  const countdown = useCountdown(weddingTarget)
  const audioRef = useRef(null)
  const userMutedRef = useRef(false)
  const [musicPlaying, setMusicPlaying] = useState(true)

  const T = L[lang]
  const tr = (o) => (lang === 'ml' ? o.ml : o.en)

  useEffect(() => {
    if (typeof localStorage !== 'undefined') localStorage.setItem('ml_lang', lang)
  }, [lang])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setLightbox(null)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || lightbox !== null ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, lightbox])

  /*
   * Background music autoplay.
   *
   * Every modern browser (Chrome, Safari, Firefox, iOS/Android) FORBIDS
   * unmuted audio from auto-starting on a fresh page load — an
   * anti-interruption platform rule no script can override. The only
   * autoplay a browser permits is *muted* playback.
   *
   * So we: (1) start muted so the track genuinely begins on page load
   * (silent but already playing/pipelined), and (2) unmute instantly on
   * the very first user gesture anywhere on the page — no button needed.
   * The imperatively-set `muted` property is kept OUT of the JSX so React
   * re-renders never re-mute the element.
   */
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.5
    audio.muted = true // start muted so the browser allows autoplay on load

    // Trigger the permitted muted autoplay so playback begins (silently)
    // immediately while the file is still pipelining over the network.
    audio.play().catch(() => {
      /* retried on the first gesture below */
    })

    const start = () => {
      if (userMutedRef.current || !audioRef.current) return
      const el = audioRef.current
      el.muted = false // allowed because this runs inside a user gesture
      el.volume = 0.5
      el.play()
        .then(() => setMusicPlaying(true))
        .catch(() => {
          /* transient media error — retried on the next gesture */
        })
    }

    const onGesture = () => {
      if (!userMutedRef.current) start()
    }

    // NOTE: `scroll` events do NOT bubble. Listening on `window` only catches
    // the document scrolling — never a sidebar or the mobile viewport. So we
    // listen in the CAPTURE phase on `document`, which fires for ANY scrollable
    // element (page body, sidebar/menu, iOS address-bar shift, etc.).
    window.addEventListener('touchstart', onGesture, { passive: true })
    window.addEventListener('pointerdown', onGesture, { passive: true })
    window.addEventListener('click', onGesture, { passive: true })
    window.addEventListener('keydown', onGesture)
    document.addEventListener('scroll', onGesture, { passive: true, capture: true })
    window.addEventListener('wheel', onGesture, { passive: true })

    return () => {
      window.removeEventListener('touchstart', onGesture)
      window.removeEventListener('pointerdown', onGesture)
      window.removeEventListener('click', onGesture)
      window.removeEventListener('keydown', onGesture)
      document.removeEventListener('scroll', onGesture, { capture: true })
      window.removeEventListener('wheel', onGesture)
    }
  }, [])

  const toggleMusic = (e) => {
    if (e) e.stopPropagation()
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      userMutedRef.current = false
      audio.muted = false
      audio.volume = 0.5
      audio.play()
        .then(() => setMusicPlaying(true))
        .catch((err) => console.error('Playback error:', err))
    } else {
      userMutedRef.current = true
      audio.pause()
      setMusicPlaying(false)
    }
  }

  const shareInvite = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: T.shareMailTitle, url })
      } catch {
        /* user dismissed */
      }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      /* clipboard unavailable */
    }
  }

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(venueAddress)
      setAddressCopied(true)
      setTimeout(() => setAddressCopied(false), 2200)
    } catch {
      /* clipboard unavailable */
    }
  }

  const downloadCalendar = () => {
    const pad = (n) => String(n).padStart(2, '0')
    const now = new Date()
    const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(
      now.getUTCHours(),
    )}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//FrameZ Labs//Wedding Invite//EN',
      ...calendar.map((ev) => [
        'BEGIN:VEVENT',
        `UID:${stamp}-${ev.uid}@framezlabs.store`,
        `DTSTAMP:${stamp}`,
        `DTSTART;TZID=Asia/Kolkata:${ev.dtstart}`,
        `DTEND;TZID=Asia/Kolkata:${ev.dtend}`,
        `SUMMARY:${T[ev.summaryKey]}`,
        `LOCATION:${venueAddress}`,
        'END:VEVENT',
      ]).flat(),
      'END:VCALENDAR',
    ].join('\r\n')
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = config.icsFilename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }



  const mailHref = `mailto:?subject=${encodeURIComponent(T.shareMailTitle)}&body=${encodeURIComponent(
    `${T.shareBody} ${window.location.href}`,
  )}`

  const languageSwitch = (
    <span className="lang-switcher" role="group" aria-label="Language / ഭാഷ">
      <button
        type="button"
        className={`lang-opt${lang === 'en' ? ' lang-opt--active' : ''}`}
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
      >
        EN
      </button>
      <span className="lang-sep" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={`lang-opt${lang === 'ml' ? ' lang-opt--active' : ''}`}
        aria-pressed={lang === 'ml'}
        onClick={() => setLang('ml')}
      >
        മല
      </button>
    </span>
  )

  return (
    <div className="page" ref={pageRef}>
      <div className="grain" aria-hidden="true" />
      <div className="aurora aurora--a" aria-hidden="true" />
      <div className="aurora aurora--b" aria-hidden="true" />
      <div className="aurora aurora--c" aria-hidden="true" />
      {sparkles.map((s, i) => (
        <span
          className="sparkle"
          key={i}
          aria-hidden="true"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            '--tw': s.dur,
            animationDelay: s.delay,
          }}
        />
      ))}

      <header className={`topbar${scrolled ? ' topbar--scrolled' : ''}`}>
        <a className="brand" href="#top" aria-label={T.shareMailTitle}>
          <span className="brand-mark">{initials}</span>
          <span className="brand-date">{brandDate}</span>
        </a>
        <nav className="topnav" aria-label="Page navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {tr(link)}
            </a>
          ))}
        </nav>
        <span className="topbar-lang">{languageSwitch}</span>
        <button
          className={`nav-toggle${menuOpen ? ' nav-toggle--open' : ''}`}
          type="button"
          aria-label={menuOpen ? T.closeMenu : T.openMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </header>

      <div
        className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}
        id="mobile-menu"
        aria-hidden={!menuOpen}
      >
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {tr(link)}
          </a>
        ))}
        {languageSwitch}
      </div>

      <main id="top">
        <section className="hero">
          <div className="petals" aria-hidden="true">
            {petals.map((p, i) => (
              <span
                key={i}
                className="petal"
                style={{
                  left: p.left,
                  width: p.size,
                  height: Math.round(p.size * 1.3),
                  '--pd': p.pd,
                  '--pdelay': p.pdelay,
                  '--sway': p.sway,
                }}
              />
            ))}
          </div>
          <div className="hero-copy">
            <p className="eyebrow gradient-text">
              <SparklesIcon size={14} className="eyebrow-icon" /> {T.eyebrow}
            </p>
            <h1 className="hero-title">
              <span className="word">{splitWord(name1)}</span>
              <em className="amp">&amp;</em>
              <span className="word">{splitWord(name2)}</span>
            </h1>
            <p className="hero-date">
              <span>{T.heroDay}</span>
              <i className="hero-sep" aria-hidden="true">
                ✦
              </i>
              <span>{T.heroDate}</span>
              <i className="hero-sep" aria-hidden="true">
                ✦
              </i>
              <span>{T.heroEvent}</span>
            </p>
            <p className="hero-lead">{T.heroLead}</p>
            <div className="hero-cta">
              <button className="btn btn--primary" type="button" onClick={downloadCalendar}>
                <CalendarIcon size={16} /> {T.addToCalendar}
              </button>
              <span className="share-wrap">
                <button
                  className="btn btn--icon"
                  type="button"
                  onClick={shareInvite}
                  aria-label={T.shareAria}
                >
                  {copied ? <CheckIcon size={18} /> : <ShareIcon size={18} />}
                </button>
                <span className={`share-toast${copied ? ' share-toast--show' : ''}`}>
                  {copied ? T.linkCopied : T.share}
                </span>
              </span>
            </div>
          </div>

          <aside className="hero-visual">
            <span className="float-shape shape--heart" aria-hidden="true">
              <HeartIcon size={30} />
            </span>
            <span className="float-shape shape--heart-two" aria-hidden="true">
              <HeartIcon size={22} />
            </span>
            <div className="medallion">
              <div className="medallion-ring" aria-hidden="true" />
              <div className="medallion-caricature-frame">
                <img
                  src={heroImage}
                  alt={heroAlt}
                  className="caricature-hero-img"
                />
              </div>
              <div className="medallion-badge">
                {initials}
              </div>
            </div>
            <div className="float-chip chip--venue">
              {T.detailsKicker}
              <strong>{venueName}</strong>
            </div>
            <div className="float-chip chip--date">
              <CalendarIcon size={12} /> {T.heroDate}
            </div>
          </aside>

          <a className="scroll-cue" href="#story" aria-label={T.scroll}>
            <span aria-hidden="true" />
            {T.scroll}
          </a>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <span className="marquee-content" key={k}>
                {T.marquee.map((item, i) => (
                  <span className="marquee-item" key={i}>
                    {item}
                    {i < T.marquee.length - 1 && <i aria-hidden="true">✦</i>}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <section className="countdown" data-reveal>
          <p className="countdown-label">{T.countdownLabel}</p>
          <div className="countdown-tiles">
            {[
              { v: countdown.days, l: T.days },
              { v: countdown.hours, l: T.hours },
              { v: countdown.minutes, l: T.minutes },
              { v: countdown.seconds, l: T.seconds },
            ].map((t) => (
              <div className="countdown-tile" key={t.l}>
                <strong>{String(t.v).padStart(2, '0')}</strong>
                <span>{t.l}</span>
              </div>
            ))}
          </div>
          <p className="countdown-date" data-reveal style={{ '--d': '200ms' }}>
            {T.until} <strong>{T.countdownDate}</strong>
          </p>
        </section>

        <section className="section events" id="events">
          <div className="section-heading" data-reveal>
            <span className="kicker">
              <i aria-hidden="true" /> <CalendarIcon size={15} className="kicker-icon" />{' '}
              {T.eventsKicker} <i aria-hidden="true" />
            </span>
            <h2>{T.eventsTitle}</h2>
          </div>
          <div className="events-grid" data-reveal>
            {events.map((ev) => {
              const ItemIcon = ICONS[ev.icon]
              return (
                <article className="event-card" key={ev.key}>
                  <span className="event-icon" aria-hidden="true">
                    <ItemIcon size={22} />
                  </span>
                  <span className="event-title">{tr(ev.title)}</span>
                  <p className="event-date">
                    <CalendarIcon size={14} /> {tr(ev.date)}
                  </p>
                  {ev.time && (
                    <p className="event-time">
                      <ClockIcon size={14} /> {tr(ev.time)}
                    </p>
                  )}
                  <p className="event-venue">{ev.venue}</p>
                  <p className="event-address">{ev.address}</p>
                </article>
              )
            })}
          </div>
        </section>

        <div className="diya-row" aria-hidden="true">
          <Diya size={40} />
          <Diya size={56} className="diya--lead" />
          <Diya size={40} />
        </div>

        <section className="section story" id="story">
          <div className="section-heading" data-reveal>
            <span className="kicker">
              <i aria-hidden="true" /> <HeartIcon size={15} className="kicker-icon" />{' '}
              {T.storyKicker} <i aria-hidden="true" />
            </span>
            <h2>{T.storyTitle}</h2>
          </div>
          <div className="story-grid">
            <p className="story-lede" data-reveal style={{ '--d': '120ms' }}>
              {T.storyLede}
            </p>
            <blockquote className="story-quote" data-reveal style={{ '--d': '240ms' }}>
              “{T.storyQuote}”
            </blockquote>
          </div>
        </section>

        <section className="section details" id="details">
          <div className="section-heading" data-reveal>
            <span className="kicker">
              <i aria-hidden="true" /> <SparklesIcon size={15} className="kicker-icon" />{' '}
              {T.detailsKicker} <i aria-hidden="true" />
            </span>
            <h2>{T.detailsTitle}</h2>
          </div>
          <div className="detail-rows">
            {highlights.map((item, i) => {
              const ItemIcon = ICONS[item.icon]
              return (
                <div
                  className="detail-row"
                  key={item.key}
                  data-reveal
                  style={{ '--d': `${i * 90}ms` }}
                >
                  <span className="detail-icon" aria-hidden="true">
                    <ItemIcon size={20} />
                  </span>
                  <div>
                    <span className="detail-label">{tr(item.label)}</span>
                    <h3>{item.value}</h3>
                    <p>{tr(item.detail)}</p>
                  </div>
                  <span className="detail-arrow" aria-hidden="true">
                    →
                  </span>
                </div>
              )
            })}
          </div>
        </section>

        <section className="section venue" id="venue">
          <div className="section-heading" data-reveal>
            <span className="kicker">
              <i aria-hidden="true" /> <MapPinIcon size={15} className="kicker-icon" />{' '}
              {T.venueKicker} <i aria-hidden="true" />
            </span>
            <h2>{T.venueTitle}</h2>
          </div>
          <div className="venue-grid" data-reveal>
            <div className="venue-info">
              <div className="venue-pin" aria-hidden="true">
                <span className="venue-pin-ring" />
                <MapPinIcon size={42} className="venue-pin-icon" />
              </div>
              <h3>{venueName}</h3>
              <p className="venue-address">{venueAddress}</p>
              <p className="venue-note">{T.venueNote}</p>
              <div className="venue-actions">
                <a
                  className="btn btn--primary"
                  href={venueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPinIcon size={16} /> {T.mapsOpen}
                </a>
                <button className="btn btn--ghost" type="button" onClick={copyAddress}>
                  <CopyIcon size={16} /> {addressCopied ? T.copied : T.copyAddress}
                </button>
              </div>
            </div>
            <div className="venue-qr">
              <QRCodeSVG
                value={venueUrl}
                size={176}
                level="M"
                fgColor="#120b0b"
                bgColor="#ffffff"
              />
              <span className="venue-qr-caption">
                <SparklesIcon size={12} /> {T.scanDirections}
              </span>
            </div>
          </div>
          {receptionVenue ? (
            <>
              <div className="venue-map" data-reveal>
                <span className="venue-map-label">
                  {T.venueMapLabel} — {venueName}
                </span>
                <iframe
                  title={`${venueName} — location on Google Maps`}
                  src={venueMapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="venue-map" data-reveal>
                <span className="venue-map-label">
                  {T.receptionMapLabel} — {receptionVenue.name}
                </span>
                <iframe
                  title={`${receptionVenue.name} — location on Google Maps`}
                  src={receptionVenue.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </>
          ) : (
            <div className="venue-map" data-reveal>
              <iframe
                title={`${venueName} — location on Google Maps`}
                src={venueMapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          )}
        </section>

        <section className="section schedule" id="schedule">
          <div className="section-heading" data-reveal>
            <span className="kicker">
              <i aria-hidden="true" /> <ClockIcon size={15} className="kicker-icon" />{' '}
              {T.scheduleKicker} <i aria-hidden="true" />
            </span>
            <h2>{T.scheduleTitle}</h2>
          </div>
          <ol className="timeline" data-reveal>
            {schedule.map((item, i) => {
              const ItemIcon = ICONS[item.icon]
              return (
                <li
                  className="timeline-item"
                  key={i}
                  data-reveal
                  style={{ '--d': `${i * 120}ms` }}
                >
                  <span className="timeline-dot" aria-hidden="true" />
                  <time className="timeline-time">
                    <span className="timeline-icon" aria-hidden="true">
                      <ItemIcon size={18} />
                    </span>
                    {tr(item.time)}
                  </time>
                  <div className="timeline-body">
                    <h3>{tr(item.title)}</h3>
                    <p>{tr(item.note)}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>

        <section className="section travel" id="travel">
          <div className="section-heading" data-reveal>
            <span className="kicker">
              <i aria-hidden="true" /> <PlaneIcon size={15} className="kicker-icon" />{' '}
              {T.travelKicker} <i aria-hidden="true" />
            </span>
            <h2>{T.travelTitle}</h2>
          </div>
          <div className="travel-grid" data-reveal>
            {travelData.map((item) => {
              const ItemIcon = ICONS[item.icon]
              return (
                <div className="travel-card" key={item.title.en}>
                  <span className="travel-icon" aria-hidden="true">
                    <ItemIcon size={20} />
                  </span>
                  <h3>{tr(item.title)}</h3>
                  <p>{tr(item.detail)}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="section-heading" data-reveal>
            <span className="kicker">
              <i aria-hidden="true" /> <HelpIcon size={15} className="kicker-icon" />{' '}
              {T.faqKicker} <i aria-hidden="true" />
            </span>
            <h2>{T.faqTitle}</h2>
          </div>
          <div className="faq-list" data-reveal>
            {faqs.map((f, i) => (
              <div className={`faq-item${openFaq === i ? ' faq-item--open' : ''}`} key={i}>
                <button
                  className="faq-q"
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-a-${i}`}
                >
                  <span>{tr(f.q)}</span>
                  <span className="faq-chev" aria-hidden="true">
                    +
                  </span>
                </button>
                <div className="faq-a" id={`faq-a-${i}`}>
                  <p>{tr(f.a)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-monogram gradient-text">{initials}</div>
        <p>{T.footerDate}</p>
        <p>{T.footerMade}</p>
        <div className="footer-social">
          <button
            className="footer-social-btn"
            type="button"
            onClick={shareInvite}
            aria-label={T.shareAria}
          >
            <ShareIcon size={16} />
          </button>
          <a className="footer-social-btn" href={mailHref} aria-label={T.shareMailAria}>
            <EnvelopeIcon size={16} />
          </a>
          <a
            className="footer-social-btn"
            href="https://framezlabs.store/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="FrameZ Labs website"
          >
            <GlobeIcon size={16} />
          </a>
        </div>
        <div className="footer-brand">
          <p className="footer-credit">
            <span className="footer-brand-label">{T.designedBy}</span>
            <a
              className="footer-brand-link"
              href="https://framezlabs.store/"
              target="_blank"
              rel="noopener noreferrer"
            >
              FrameZ Labs
            </a>
          </p>
          <span className="footer-credit-sep" aria-hidden="true">
            ·
          </span>
          <p className="footer-credit">
            <span className="footer-brand-label">{T.developedBy}</span>
            <a
              className="footer-brand-link"
              href="https://technobyteinnovations.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Technobyte Innovations
            </a>
          </p>
        </div>
        <p className="footer-copyright">
          © {new Date().getFullYear()} {T.allRights}
        </p>
      </footer>

      <button
        className={`to-top${showTop ? ' to-top--show' : ''}`}
        type="button"
        aria-label={T.backTop}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUpIcon size={18} />
      </button>

      {/* ── Floating music player ── */}
      <audio ref={audioRef} src={config.audioSrc} loop autoPlay playsInline preload="auto" />
      <button
        className={`music-btn${musicPlaying ? ' music-btn--playing' : ''}`}
        type="button"
        aria-label={musicPlaying ? 'Pause background music' : 'Play background music'}
        onClick={toggleMusic}
      >
        <span className="music-btn-rings" aria-hidden="true" />
        {musicPlaying ? <MusicIcon size={18} /> : <MusicMutedIcon size={18} />}
        <span className="music-btn-label">{musicPlaying ? 'Music On' : 'Music Off'}</span>
      </button>


    </div>
  )
}

export default App