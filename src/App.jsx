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
import coupleHeroImg from './assets/couple_hero.png'
import './App.css'

/* ------------------------------------------------------------------
   Translations — EN (English) / ml (Malayalam).
   NOTE: ml values were authored best-effort and should be reviewed by
   a native speaker — edit a single value below and it updates the
   whole site. Strings without a clean ml value fall back to English.
------------------------------------------------------------------ */
const L = {
  en: {
    eyebrow: 'You are invited',
    heroDay: 'Sunday',
    heroDate: '13 September 2026',
    heroEvent: 'Muhurtham · 11:55 AM – 12:15 PM',
    heroLead: 'We invite you to witness a beautifully modern celebration of love, blessings, and a future filled with joy.',
    addToCalendar: 'Add to Calendar',
    shareAria: 'Share invitation',
    linkCopied: 'Link copied!',
    share: 'Share',
    detailsKicker: 'Details',
    scroll: 'Scroll down',
    marquee: ['Sneha & Sarathraj', '13 September 2026', 'Bhama Auditorium, Mayyanad', 'Join Our Celebration'],
    countdownLabel: 'Counting Down to the Muhurtham',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Mins',
    seconds: 'Secs',
    until: 'Until',
    countdownDate: '13 September 2026 · 11:55 AM – 12:15 PM',
    eventsKicker: 'Celebrations',
    eventsTitle: 'Events & Ceremonies',
    storyKicker: 'Our Journey',
    storyTitle: 'Two Hearts, One Journey',
    storyLede: 'Surrounded by family and lifelong friends, we begin our greatest chapter together.',
    storyQuote: 'Love does not consist in gazing at each other, but in looking outward together in the same direction.',
    galleryKicker: 'Moments',
    galleryTitle: 'Photo Gallery',
    openPhoto: 'View photo',
    detailsTitle: 'Event Highlights',
    venueKicker: 'Location',
    venueTitle: 'The Venue & Directions',
    venueNote: 'Located conveniently at Ammachanmukku, Koottikada, Mayyanad, Kollam with ample guest parking.',
    mapsOpen: 'Open in Google Maps',
    copied: 'Copied!',
    copyAddress: 'Copy Address',
    scanDirections: 'Scan for directions',
    scheduleKicker: 'Timeline',
    scheduleTitle: 'Wedding Schedule',
    travelKicker: 'Guest Info',
    travelTitle: 'Travel & Stay',
    faqKicker: 'Questions',
    faqTitle: 'Frequently Asked Questions',
    caricaturesKicker: 'Illustrations',
    caricaturesTitle: 'Couple Caricature Showcase',
    footerDate: 'Sunday · 13 September 2026 · Bhama Auditorium, Mayyanad, Kollam, Kerala',
    footerMade: 'Crafted with love, for our celebration.',
    shareMailAria: 'Share via email',
    designedBy: 'Designed by',
    developedBy: 'Developed by',
    allRights: 'All rights reserved',
    backTop: 'Back to top',
    closeMenu: 'Close menu',
    openMenu: 'Open menu',
    closePhoto: 'Close photo',
    calendarSummary: 'Sneha & Sarathraj — Muhurtham',
    calendarReceptionSummary: 'Sneha & Sarathraj — Reception',
    shareBody: 'You are invited! Join us for the Muhurtham ceremony on Sunday, 13 September 2026 between 11:55 AM and 12:15 PM, at Bhama Auditorium, Ammachanmukku, Koottikada, Mayyanad, Kollam, Kerala.',
    shareMailTitle: 'Sneha & Sarathraj — Wedding Invitation',
  },
  ml: {
    eyebrow: 'നിങ്ങളെ ക്ഷണിക്കുന്നു',
    heroDay: 'ഞായറാഴ്ച',
    heroDate: '13 സെപ്റ്റംബർ 2026',
    heroEvent: 'മുഹൂർത്തം · 11:55 – 12:15',
    heroLead: 'സ്നേഹത്തിന്റെയും അനുഗ്രഹത്തിന്റെയും സന്തോഷം നിറഞ്ഞ ആഘോഷത്തിന് നിങ്ങളെ ക്ഷണിക്കുന്നു.',
    addToCalendar: 'കലണ്ടറിലേക്ക് ചേർക്കുക',
    shareAria: 'ക്ഷണക്കത്ത് പങ്കിടുക',
    linkCopied: 'ലിങ്ക് പകർത്തി!',
    share: 'പങ്കിടുക',
    detailsKicker: 'വിവരങ്ങൾ',
    scroll: 'താഴേക്ക് പോകുക',
    marquee: ['സ്നേഹ & ശരത്‌രാജ്', '13 സെപ്റ്റംബർ 2026', 'ഭാമാ ഓഡിറ്റോറിയം, മയ്യനാട്', 'ഞങ്ങളുടെ ആഘോഷത്തിൽ പങ്കുചേരൂ'],
    countdownLabel: 'മുഹൂർത്തത്തിലേക്കുള്ള സമയം',
    days: 'ദിവസങ്ങൾ',
    hours: 'മണിക്കൂറുകൾ',
    minutes: 'മിനിറ്റുകൾ',
    seconds: 'സെക്കൻഡുകൾ',
    until: 'ഇനി',
    countdownDate: '13 സെപ്റ്റംബർ 2026 · പകൽ 11.55 – 12.15',
    eventsKicker: 'ആഘോഷങ്ങൾ',
    eventsTitle: 'ചടങ്ങുകൾ',
    storyKicker: 'ഞങ്ങളുടെ യാത്ര',
    storyTitle: 'രണ്ട് ഹൃദയങ്ങൾ, ഒരു യാത്ര',
    storyLede: 'കുടുംബത്തിന്റെയും സുഹൃത്തുക്കളുടെയും സാന്നിധ്യത്തിൽ ഞങ്ങൾ പുതിയൊരു ജീവിതത്തിലേക്ക് കടക്കുന്നു.',
    storyQuote: 'സ്നേഹം എന്നത് പരസ്പരം നോക്കിയിരിക്കലല്ല, ഒരേ ദിശയിലേക്ക് ഒരുമിച്ച് നോക്കുന്നതാണ്.',
    galleryKicker: 'ചിത്രങ്ങൾ',
    galleryTitle: 'ഫോട്ടോ ഗ്യാലറി',
    openPhoto: 'ചിത്രം കാണുക',
    detailsTitle: 'പ്രധാന വിവരങ്ങൾ',
    venueKicker: 'വേദി',
    venueTitle: 'വേദിയും വഴിയും',
    venueNote: 'മയ്യനാട്, അമ്മാച്ചൻമുക്കിൽ സ്ഥിതി ചെയ്യുന്ന ഓഡിറ്റോറിയം. വിശാലമായ പാർക്കിംഗ് സൗകര്യം ലഭ്യമാണ്.',
    mapsOpen: 'ഗൂഗിൾ മാപ്പിൽ കാണുക',
    copied: 'പകർത്തി!',
    copyAddress: 'വിലാസം പകർത്തുക',
    scanDirections: 'വഴിയറിയാൻ സ്കാൻ ചെയ്യൂ',
    scheduleKicker: 'സമയക്രമം',
    scheduleTitle: 'വിവാഹ ഷെഡ്യൂൾ',
    travelKicker: 'യാത്രാ വിവരങ്ങൾ',
    travelTitle: 'യാത്രയും താമസവും',
    faqKicker: 'സംശയങ്ങൾ',
    faqTitle: 'ചോദ്യോത്തരം',
    caricaturesKicker: 'ചിത്രരൂപങ്ങൾ',
    caricaturesTitle: 'കരിക്കേച്ചർ ഓർമ്മകൾ',
    footerDate: '13-09-2026 · ഭാമാ ഓഡിറ്റോറിയം · മയ്യനാട്',
    footerMade: 'സ്നേഹത്തോടെ ഞങ്ങൾ നിർമ്മിച്ചത്.',
    shareMailAria: 'ഇമെയിൽ',
    designedBy: 'രൂപകൽപ്പന',
    developedBy: 'സാങ്കേതികം',
    allRights: 'എല്ലാ അവകാശങ്ങളും',
    backTop: 'മുകളിലേക്ക്',
    closeMenu: 'അടയ്ക്കുക',
    openMenu: 'തുറക്കുക',
    closePhoto: 'ചിത്രം അടയ്ക്കുക',
    calendarSummary: 'സ്നേഹ & ശരത്‌രാജ് — മുഹൂർത്തം',
    calendarReceptionSummary: 'സ്നേഹ & ശരത്‌രാജ് — റിസപ്ഷൻ',
    shareBody: '13-09-2026 പകൽ 11.55 നും 12.15 നും ഇടയ്ക്ക്, ഭാമാ ഓഡിറ്റോറിയം, മയ്യനാട്, കൊല്ലം.',
    shareMailTitle: 'സ്നേഹ & ശരത്‌രാജ് — വിവാഹ ക്ഷണം',
  },
}

/* MARKER_X7 */
const navLinks = [
  { href: '#events', en: 'Events', ml: 'ആഘോഷങ്ങൾ' },
  { href: '#story', en: 'Story', ml: 'കഥ' },
  { href: '#venue', en: 'Venue', ml: 'വേദി' },
  { href: '#schedule', en: 'Schedule', ml: 'ഷെഡ്യൂൾ' },
  { href: '#travel', en: 'Travel', ml: 'യാത്ര' },
  { href: '#faq', en: 'FAQs', ml: 'ചോദ്യോത്തരം' },
]


/* ---------------- Content config ---------------- */

const venueUrl =
  'https://www.google.com/maps/dir//Bhama+Auditorium+Mayyanad,+Ammachanmukku,+Koottikada,+Mayyanad,+Kollam,+Kerala+691020/@8.8607411,76.5606201,11.96z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3b05fb5215b0b769:0x435cb23c7801c41f!2m2!1d76.6366936!2d8.8493243?entry=ttu'

const venueAddress = 'Ammachanmukku, Koottikada, Mayyanad, Kollam, Kerala 691020'

const highlights = [
  {
    key: 'venue',
    label: { en: 'Venue', ml: 'വേദി' },
    value: 'Bhama Auditorium',
    detail: { en: venueAddress, ml: 'മയ്യനാട്, കൊല്ലം, കേരളം' },
    icon: MapPinIcon,
  },
  {
    key: 'theme',
    label: { en: 'Theme', ml: 'ആശയം' },
    value: 'Thaali kettu',
    detail: {
      en: 'An auspicious moment — the muhurtham marks our hands joined in blessing.',
      ml: 'ശുഭ മുഹൂർത്തം — കരങ്ങൾ അനുഗ്രഹത്താൽ ചേരുന്ന നിമിഷം.',
    },
    icon: HeartIcon,
  },
]

/* Timeline — the two real events */
const schedule = [
  {
    icon: RingsIcon,
    time: { en: 'Sunday · 11:55 – 12:15', ml: 'ഞായർ · 11:55 – 12:15' },
    title: { en: 'Muhurtham — sacred ceremony', ml: 'മുഹൂർത്തം — ചടങ്ങ്' },
    note: {
      en: 'The vows and blessings are exchanged in a sacred morning ritual, surrounded by family and loved ones.',
      ml: 'കുടുംബത്തോടൊപ്പമുള്ള ഒരു ചടങ്ങ്.',
    },
  },
  {
    icon: GlassIcon,
    time: { en: 'Saturday · 4:00 PM onwards', ml: 'ശനി · വൈകുന്നേരം 4 മണി മുതൽ' },
    title: { en: 'Reception — celebration', ml: 'റിസപ്ഷൻ — ആഘോഷം' },
    note: {
      en: 'An elegant evening of music, joy and togetherness as we celebrate our wedding weekend. Begins at 4:00 PM.',
      ml: 'സംഗീതവും സന്തോഷവും നിറഞ്ഞ ഒരു അവിസ്മരണീയ സന്ധ്യ.',
    },
  },
]

const sparkles = [
  { top: '18%', left: '8%', size: 7, dur: '3.6s', delay: '0s' },
  { top: '30%', left: '90%', size: 5, dur: '4.4s', delay: '0.6s' },
  { top: '62%', left: '4%', size: 6, dur: '5s', delay: '1.2s' },
  { top: '78%', left: '92%', size: 8, dur: '4s', delay: '0.3s' },
  { top: '45%', left: '48%', size: 5, dur: '3.2s', delay: '1.8s' },
  { top: '12%', left: '70%', size: 6, dur: '4.8s', delay: '0.9s' },
  { top: '88%', left: '26%', size: 5, dur: '3.8s', delay: '2.2s' },
  { top: '8%', left: '38%', size: 4, dur: '5.2s', delay: '1.4s' },
]

const petals = [
  { left: '6%', size: 18, pd: '11s', pdelay: '0s', sway: '46px' },
  { left: '20%', size: 12, pd: '14s', pdelay: '2.4s', sway: '-38px' },
  { left: '36%', size: 16, pd: '12s', pdelay: '4.1s', sway: '52px' },
  { left: '52%', size: 13, pd: '15s', pdelay: '1.2s', sway: '-44px' },
  { left: '66%', size: 17, pd: '10.5s', pdelay: '3.3s', sway: '40px' },
  { left: '80%', size: 12, pd: '13s', pdelay: '5.2s', sway: '-34px' },
  { left: '90%', size: 15, pd: '12.5s', pdelay: '0.8s', sway: '48px' },
  { left: '14%', size: 11, pd: '16s', pdelay: '6s', sway: '36px' },
]



const weddingTarget = new Date('2026-09-13T11:55:00+05:30').getTime()

const events = [
  {
    key: 'muhurtham',
    title: { en: 'Muhurtham', ml: 'മുഹൂർത്തം' },
    date: { en: '13 September 2026', ml: '13-09-2026' },
    time: { en: '11:55 – 12:15', ml: '11:55 – 12:15' },
    venue: 'Bhama Auditorium',
    address: venueAddress,
    icon: RingsIcon,
  },
  {
    key: 'reception',
    title: { en: 'Reception', ml: 'റിസപ്ഷൻ' },
    date: { en: '12 September 2026', ml: '12-09-2026' },
    time: { en: '4:00 PM onwards', ml: 'വൈകുന്നേരം 4 മണി മുതൽ' },
    venue: 'Bhama Auditorium',
    address: venueAddress,
    icon: GlassIcon,
  },
]



const faqs = [
  {
    q: { en: 'What time should I arrive?', ml: 'എപ്പോൾ എത്തണം?' },
    a: { en: 'Muhurtham begins at 11:55 AM. Please arrive a little early to settle in.', ml: '11:55-നാണ് മുഹൂർത്തം.' },
  },
  {
    q: { en: 'Are children welcome?', ml: 'കുട്ടികൾ വരാം?' },
    a: { en: 'Yes — the celebration is for the whole family and all are welcome.', ml: 'അതെ, എല്ലാവർക്കും സ്വാഗതം.' },
  },
  {
    q: { en: 'Is parking available at the venue?', ml: 'പാർക്കിങ് ഉണ്ടോ?' },
    a: { en: 'Yes, ample parking is available at Bhama Auditorium.', ml: 'ഉണ്ട്.' },
  },
  {
    q: { en: 'Can I bring a plus one?', ml: 'ഒരാളെ കൂടി കൊണ്ടുവരാമോ?' },
    a: { en: 'Yes, family and guests are welcome to celebrate with us.', ml: 'അതെ, എല്ലാവർക്കും സ്വാഗതം.' },
  },
]

const travelData = [
  {
    icon: PlaneIcon,
    title: { en: 'By air', ml: 'വിമാനം' },
    detail: {
      en: 'Fly into Trivandrum International Airport (TRV), about 50 km away. Cabs take roughly 1–1.5 hours.',
      ml: 'തിരുവനന്തപുരം വിമാനത്താവളം (TRV), ഏകദേശം 50 കി.മീ.',
    },
  },
  {
    icon: TrainIcon,
    title: { en: 'By train', ml: 'ട്രെയിനിൽ' },
    detail: {
      en: 'Kollam Junction railway station is about 9 km from the venue.',
      ml: 'കൊല്ലം ജംഗ്ഷൻ സ്റ്റേഷൻ, ഏകദേശം 9 കി.മീ.',
    },
  },
  {
    icon: MapPinIcon,
    title: { en: 'By road', ml: 'റോഡ് മാർഗം' },
    detail: {
      en: 'The venue sits near Mayyanad on NH66, easy to reach by car.',
      ml: 'മയ്യനാട്, NH66 അടുത്ത്.',
    },
  },
  {
    icon: BedIcon,
    title: { en: 'Where to stay', ml: 'താമസം' },
    detail: {
      en: 'Several comfortable stays are available near Mayyanad and the Ashtamudi backwaters.',
      ml: 'മയ്യനാട്, അഷ്ടമുടിക്കടുത്ത്.',
    },
  },
  {
    icon: PhoneIcon,
    title: { en: 'Need help?', ml: 'സഹായം' },
    detail: {
      en: 'For travel, stay, or anything at all, contact the family: Sreejith N — 70251 82667 or 73566 85094.',
      ml: 'സ്രീജിത്ത് എൻ — 70251 82667 / 73566 85094.',
    },
  },
]

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
      'BEGIN:VEVENT',
      `UID:${stamp}-muhurtham@framezlabs.store`,
      `DTSTAMP:${stamp}`,
      'DTSTART;TZID=Asia/Kolkata:20260913T115500',
      'DTEND;TZID=Asia/Kolkata:20260913T121500',
      `SUMMARY:${T.calendarSummary}`,
      `LOCATION:${venueAddress}`,
      'END:VEVENT',
      'BEGIN:VEVENT',
      `UID:${stamp}-reception@framezlabs.store`,
      `DTSTAMP:${stamp}`,
      'DTSTART;TZID=Asia/Kolkata:20260912T160000',
      'DTEND;TZID=Asia/Kolkata:20260912T220000',
      `SUMMARY:${T.calendarReceptionSummary}`,
      `LOCATION:${venueAddress}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sneha-sarathraj-wedding.ics'
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
          <span className="brand-mark">S ✦ S</span>
          <span className="brand-date">13.09.26</span>
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
              <span className="word">{splitWord('Sneha')}</span>
              <em className="amp">&amp;</em>
              <span className="word">{splitWord('Sarathraj')}</span>
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
                  src={coupleHeroImg}
                  alt="Sneha &amp; Sarathraj Wedding Portrait"
                  className="caricature-hero-img"
                />
              </div>
              <div className="medallion-badge">
                S ✦ S
              </div>
            </div>
            <div className="float-chip chip--venue">
              {T.detailsKicker}
              <strong>Bhama Auditorium</strong>
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
              const ItemIcon = ev.icon
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
              const ItemIcon = item.icon
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
              <h3>Bhama Auditorium</h3>
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
          <div className="venue-map" data-reveal>
            <iframe
              title="Bhama Auditorium — location on Google Maps"
              src="https://www.google.com/maps?q=8.8493233,76.6366936&z=17&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
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
              const ItemIcon = item.icon
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
              const ItemIcon = item.icon
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
        <div className="footer-monogram gradient-text">S ✦ S</div>
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
      <audio ref={audioRef} src="/audio/background.mp3" loop autoPlay playsInline preload="auto" />
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