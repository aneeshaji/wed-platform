import { useEffect, useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import {
  ArrowUpIcon,
  BedIcon,
  CalendarIcon,
  CameraIcon,
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
  PhoneIcon,
  PlaneIcon,
  RingsIcon,
  ShareIcon,
  SparklesIcon,
  TrainIcon,
} from './icons'
import { Diya } from './decor'
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
    heroEvent: 'Muhurtham · 11:55',
    heroLead: 'We invite you to witness a beautifully modern celebration of love, blessings, and a future filled with joy.',
    rsvpNow: 'RSVP Now',
    addToCalendar: 'Add to Calendar',
    shareAria: 'Share invitation',
    linkCopied: 'Link copied!',
    share: 'Share',
    scroll: 'Scroll',
    marquee: ['Shubh Vivah', '13 September 2026', 'Muhurtham', 'Reception', 'Bhama Auditorium, Kollam'],
    countdownLabel: 'Counting down to our big day',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    until: 'Until',
    countdownDate: 'Sunday · 13 September 2026 · 11:55',
    eventsKicker: 'Celebrations',
    eventsTitle: 'Two moments, one celebration',
    storyKicker: 'Our story',
    storyTitle: 'A beautiful beginning',
    storyLede: 'From the first spark to this new chapter, every step has led us here with wonder, warmth, and purpose.',
    storyQuote: 'With gratitude in our hearts, we invite you to celebrate this beautiful milestone with us.',
    galleryKicker: 'Moments',
    galleryTitle: 'Our journey in pictures',
    openPhoto: 'Open photo',
    detailsKicker: 'The essentials',
    detailsTitle: 'Everything you need to know',
    venueKicker: 'Getting there',
    venueTitle: 'Find the venue',
    venueNote: 'Scan the code or tap the button for live directions straight to the entrance.',
    mapsOpen: 'Open in Google Maps',
    copyAddress: 'Copy address',
    copied: 'Copied!',
    scanDirections: 'Scan to open directions',
    scheduleKicker: 'Celebration plan',
    scheduleTitle: 'Two events, one weekend',
    travelKicker: 'Plan your visit',
    travelTitle: 'Getting there & staying over',
    faqKicker: 'Good to know',
    faqTitle: 'Frequently asked questions',
    rsvpKicker: 'Kindly respond',
    rsvpThanks: 'Thank you!',
    rsvpSuccess: 'Your response has been noted. We look forward to celebrating with you.',
    rsvpEdit: 'Edit response',
    rsvpHead: 'Your presence completes the celebration',
    rsvpDeadline: 'Kindly share your plans by 1 October 2026.',
    nameLabel: 'Full name',
    namePlaceholder: 'Your full name',
    guestLabel: 'Guest count',
    noteLabel: 'Blessing or note',
    notePlaceholder: 'Leave a kind message',
    confirm: 'Confirm Attendance',
    sending: 'Sending…',
    rsvpError: 'Something went wrong while sending your response. Please try again.',
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
    calendarSummary: 'Sneha & Sarath — Muhurtham',
    calendarReceptionSummary: 'Sneha & Sarath — Reception',
    shareBody: 'You are invited! Join us for the Muhurtham ceremony on Sunday, 13 September 2026 at 11:55, at Bhama Auditorium, Mayyanad, Kollam, Kerala.',
    shareMailTitle: 'Sneha & Sarath — Wedding Invitation',
  },
  ml: {
     eyebrow: 'നിങ്ങളെ ക്ഷണിക്കുന്നു',
     heroDay: 'ഞായറാഴ്ച',
     heroDate: '13 സെപ്റ്റംബർ 2026',
     heroEvent: 'മുഹൂർത്തം 11:55',
     heroLead: 'സ്നേഹത്തിന്റെയും അനുഗ്രഹത്തിന്റെയും സന്തോഷം നിറഞ്ഞ ആഘോഷത്തിന് നിങ്ങളെ ക്ഷണിക്കുന്നു.',
     rsvpNow: 'RSVP',
     addToCalendar: 'കലണ്ടറിൽ',
     shareAria: 'പങ്കിടുക',
     linkCopied: 'പകർത്തി!',
     share: 'പങ്കിടുക',
     scroll: 'താഴേക്ക്',
     marquee: ['വിവാഹം', '13-09-2026', 'മുഹൂർത്തം', 'റിസപ്ഷൻ', 'ഭാമാ ഓഡിറ്റോറിയം, കൊല്ലം'],
     countdownLabel: 'വലിയ ദിവസത്തിലേക്ക്',
     days: 'ദിവസം',
     hours: 'മണിക്കൂർ',
     minutes: 'മിനിറ്റ്',
     seconds: 'സെക്കൻഡ്',
     until: 'വരെ',
     countdownDate: '13-09-2026 · 11:55',
     eventsKicker: 'ആഘോഷങ്ങൾ',
     eventsTitle: 'രണ്ട് ആഘോഷം',
     storyKicker: 'ഞങ്ങളുടെ കഥ',
     storyTitle: 'മനോഹരമായ തുടക്കം',
     storyLede: 'ആദ്യം എന്തായിരുന്നു, ഇന്ന് ഞങ്ങൾ ഒരുമിച്ച്.',
     storyQuote: 'നന്ദിയോടെ, ഞങ്ങളോടൊപ്പം ആഘോഷിക്കാൻ ക്ഷണിക്കുന്നു.',
     galleryKicker: 'നിമിഷങ്ങൾ',
     galleryTitle: 'ചിത്രങ്ങൾ',
     openPhoto: 'ചിത്രം തുറക്കുക',
     detailsKicker: 'അത്യാവശ്യങ്ങൾ',
     detailsTitle: 'എല്ലാം അറിയുക',
     venueKicker: 'എത്താനുള്ള വഴി',
     venueTitle: 'വേദി കണ്ടെത്തുക',
     venueNote: 'അകത്തേക്കുള്ള ദിശയ്ക്ക് QR സ്കാൻ ചെയ്യുക.',
     mapsOpen: 'Google മാപ്സ്',
     copyAddress: 'വിലാസം പകർത്തുക',
     copied: 'പകർത്തി!',
     scanDirections: 'ദിശയ്ക്ക് സ്കാൻ ചെയ്യുക',
     scheduleKicker: 'പരിപാടി',
     scheduleTitle: 'രണ്ട് ആഘോഷം',
     travelKicker: 'യാത്ര',
     travelTitle: 'എങ്ങനെ എത്താം',
     faqKicker: 'അറിയാൻ',
     faqTitle: 'ചോദ്യങ്ങൾ',
     rsvpKicker: 'മറുപടി',
     rsvpThanks: 'നന്ദി!',
     rsvpSuccess: 'നിങ്ങളുടെ മറുപടി ലഭിച്ചു.',
     rsvpEdit: 'മാറ്റുക',
     rsvpHead: 'നിങ്ങള് ആഘോഷം പൂർണം',
     rsvpDeadline: '2026 ഒക്ടോബർ 1-നു മുമ്പ് മറുപടി.',
     nameLabel: 'പേർ',
     namePlaceholder: 'നിങ്ങളുടെ പേർ',
     guestLabel: 'അതിഥികളുടെ എണ്ണം',
     noteLabel: 'അനുഗ്രഹം',
     notePlaceholder: 'വാക്കുകൾ എഴുതുക',
     confirm: 'ഹാജർ രേഖപ്പെടുത്തുക',
     sending: 'അയയ്ക്കുന്നു…',
     rsvpError: 'എന്തോ പിഴവ്. വീണ്ടും ശ്രമിക്കുക.',
     footerDate: '13-09-2026 · ഭാമാ ഓഡിഹിറിയം · മയ്യനാദ്',
     footerMade: 'സ്നേഹത്തോടെ ഞങ്ങൾ നിർമ്മിച്ചത്.',
     shareMailAria: 'ഇമെയിൽ',
     designedBy: 'രൂപകൽപ്പന',
     developedBy: 'സാങ്കേതികം',
     allRights: 'എല്ലാ അവകാശങ്ങളും',
     backTop: 'മുകളിലേക്ക്',
     closeMenu: 'അടയ്ക്കുക',
     openMenu: 'തുറക്കുക',
     closePhoto: 'ചിത്രം അടയ്ക്കുക',
     calendarSummary: 'സ്നേഹ & സാരത് — മുഹൂർത്തം',
     calendarReceptionSummary: 'സ്നേഹ & സാരത് — റിസപ്ഷൻ',
     shareBody: '13-09-2026 11:59, ഭാമാ ഓഡിഹിറിയം, മയ്യനാദ്, കൊല്ലം.',
     shareMailTitle: 'സ്നേഹ & സാരത് — വിവാഹ ക്ഷണം',
  },
}

/* MARKER_X7 */
const navLinks = [
  { href: '#events', en: 'Events', ml: 'ആഘോഷം' },
  { href: '#story', en: 'Story', ml: 'കഥ' },
  { href: '#gallery', en: 'Gallery', ml: 'ചിത്രശാല' },
  { href: '#venue', en: 'Venue', ml: 'വേദി' },
  { href: '#schedule', en: 'Schedule', ml: 'പദ്ധതി' },
  { href: '#travel', en: 'Travel', ml: 'യാത്ര' },
  { href: '#faq', en: 'FAQs', ml: 'ചോദ്യം' },
  { href: '#rsvp', en: 'RSVP', ml: 'RSVP' },
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
    detail: { en: venueAddress, ml: 'മയ്യനാദ്, കൊല്ലം, കേരളം' },
    icon: MapPinIcon,
  },
  {
    key: 'theme',
    label: { en: 'Theme', ml: 'തീം' },
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
    time: { en: 'Saturday · Evening', ml: 'ശനി · വൈകുന്നേരം' },
    title: { en: 'Reception — celebration', ml: 'റിസ്ഷൻ' },
    note: {
      en: 'An elegant evening of music, joy and togetherness as we celebrate our wedding weekend.',
      ml: 'സംഗീതവും സന്തോഷവും നിറഞ്ഞ സന്ധ്യ.',
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

/* Formspree endpoint — leave empty to simulate success */
const rsvpEndpoint = ''

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
    title: { en: 'Reception', ml: 'റിസ്ഷൻ' },
    date: { en: '12 September 2026', ml: '12-09-2026' },
    time: null,
    venue: 'Bhama Auditorium',
    address: venueAddress,
    icon: GlassIcon,
  },
]

const galleryTiles = [
  { c1: '#a78bfa', c2: '#6d28d9', caption: { en: 'Our engagement', ml: 'വിവാഹ്' } },
  { c1: '#f472b6', c2: '#be185d', caption: { en: 'The proposal', ml: 'നിശ്ചയം' } },
  { c1: '#fbbf34', c2: '#d97706', caption: { en: 'Family & friends', ml: 'കുടുംബ' } },
  { c1: '#c4b5fd', c2: '#7c3aed', caption: { en: 'Save the date', ml: 'ദിനം' } },
  { c1: '#fda4af', c2: '#e11d48', caption: { en: 'Haldi moments', ml: 'Haldi' } },
  { c1: '#fcd34d', c2: '#b45309', caption: { en: 'Celebrations', ml: 'ആഘോഷം' } },
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
    q: { en: 'Can I bring a plus one?', ml: 'മറ്റൊരാളെ വരാൻ?' },
    a: { en: 'Please include your guest count in the RSVP so we can plan accordingly.', ml: 'RSVP-ൽ എണ്ണം രേഖപ്പെടുത്തുക.' },
  },
  {
    q: { en: 'What about gifts?', ml: 'സമ്മാനം?' },
    a: { en: 'Your presence is the greatest gift. A blessing or card at the venue is appreciated.', ml: 'നിങ്ങളുടെ സാന്നിധ്യം ഏറ്റം വലിയ സമ്മാനം.' },
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
    title: { en: 'By train', ml: 'റീല്' },
    detail: {
      en: 'Kollam Junction railway station is about 9 km from the venue.',
      ml: 'കൊല്ലം ജംഗ്ഷൻ സ്റ്റേഷൻ, ഏകദേശം 9 കി.മീ.',
    },
  },
  {
    icon: MapPinIcon,
    title: { en: 'By road', ml: 'റൈഡ്' },
    detail: {
      en: 'The venue sits near Mayyanad on NH66, easy to reach by car.',
      ml: 'മയ്യനാദിനടുത്ത്, NH66.',
    },
  },
  {
    icon: BedIcon,
    title: { en: 'Where to stay', ml: 'താമസം' },
    detail: {
      en: 'Several comfortable stays are available near Mayyanad and the Ashtamudi backwaters.',
      ml: 'മയ്യനാദ്, അഷ്ടമുടിക്കടുത്ത്.',
    },
  },
  {
    icon: PhoneIcon,
    title: { en: 'Need help?', ml: 'സഹായം' },
    detail: {
      en: 'For travel, stay, or anything at all, reach out to the family coordinator.',
      ml: 'കുടുംബത്തിന്റെ ഭാരവഹിയുമായി ബന്ധപ്പെടുക.',
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
  const [guests, setGuests] = useState('2')
  const [copied, setCopied] = useState(false)
  const [addressCopied, setAddressCopied] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [rsvpName, setRsvpName] = useState('')
  const [rsvpNote, setRsvpNote] = useState('')
  const [rsvpStatus, setRsvpStatus] = useState('idle') // idle | submitting | success | error
  const [lightbox, setLightbox] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)
  const countdown = useCountdown(weddingTarget)

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
      'DTSTART;TZID=Asia/Kolkata:20260912T183000',
      'DTEND;TZID=Asia/Kolkata:20260912T223000',
      `SUMMARY:${T.calendarReceptionSummary}`,
      `LOCATION:${venueAddress}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sneha-sarath-wedding.ics'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const submitRsvp = async (e) => {
    e.preventDefault()
    if (!rsvpName.trim()) return
    setRsvpStatus('submitting')
    const payload = { name: rsvpName.trim(), guests, note: rsvpNote.trim() }
    try {
      if (rsvpEndpoint) {
        const res = await fetch(rsvpEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('RSVP submission failed')
      } else {
        await new Promise((r) => setTimeout(r, 900))
      }
      setRsvpStatus('success')
    } catch {
      setRsvpStatus('error')
    }
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
        <a className="btn btn--primary topbar-cta" href="#rsvp">
          {T.rsvpNow}
        </a>
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
        <a
          className="btn btn--primary mobile-menu-cta"
          href="#rsvp"
          onClick={() => setMenuOpen(false)}
        >
          {T.rsvpNow}
        </a>
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
              <span className="word">{splitWord('Sarath Raj')}</span>
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
              <a className="btn btn--primary" href="#rsvp">
                {T.rsvpNow}
              </a>
              <button className="btn btn--ghost" type="button" onClick={downloadCalendar}>
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
              <div className="medallion-inner">
                S<br />✦<br />S
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

        <section className="section gallery" id="gallery">
          <div className="section-heading" data-reveal>
            <span className="kicker">
              <i aria-hidden="true" /> <CameraIcon size={15} className="kicker-icon" />{' '}
              {T.galleryKicker} <i aria-hidden="true" />
            </span>
            <h2>{T.galleryTitle}</h2>
          </div>
          <div className="gallery-grid" data-reveal>
            {galleryTiles.map((tile, i) => (
              <button
                className="gallery-tile"
                key={i}
                type="button"
                onClick={() => setLightbox(i)}
                aria-label={`${T.openPhoto} ${tr(tile.caption)}`}
                style={{ background: `linear-gradient(150deg, ${tile.c1}, ${tile.c2})` }}
              >
                <span className="gallery-watermark">S ✦ S</span>
                <span className="gallery-caption">{tr(tile.caption)}</span>
              </button>
            ))}
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

        <section className="section rsvp" id="rsvp">
          <div className="rsvp-card" data-reveal>
            <span className="kicker kicker--center">
              <i aria-hidden="true" /> <EnvelopeIcon size={15} className="kicker-icon" />{' '}
              {T.rsvpKicker} <i aria-hidden="true" />
            </span>
            {rsvpStatus === 'success' ? (
              <div className="rsvp-success">
                <span className="rsvp-check" aria-hidden="true">
                  <CheckIcon size={34} />
                </span>
                <h2>{T.rsvpThanks}</h2>
                <p className="rsvp-intro">{T.rsvpSuccess}</p>
                <button
                  className="btn btn--ghost"
                  type="button"
                  onClick={() => setRsvpStatus('idle')}
                >
                  {T.rsvpEdit}
                </button>
              </div>
            ) : (
              <>
                <h2>{T.rsvpHead}</h2>
                <p className="rsvp-intro">{T.rsvpDeadline}</p>
                <form className="rsvp-form" onSubmit={submitRsvp}>
                  <div className="field">
                    <label htmlFor="rsvp-name">{T.nameLabel}</label>
                    <input
                      id="rsvp-name"
                      type="text"
                      placeholder={T.namePlaceholder}
                      autoComplete="name"
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label id="rsvp-guests-label">{T.guestLabel}</label>
                    <div className="segmented" role="group" aria-labelledby="rsvp-guests-label">
                      {['1', '2', '3', '4'].map((n) => (
                        <button
                          key={n}
                          type="button"
                          className={
                            guests === n ? 'segmented-opt segmented-opt--active' : 'segmented-opt'
                          }
                          aria-pressed={guests === n}
                          onClick={() => setGuests(n)}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="rsvp-note">{T.noteLabel}</label>
                    <textarea
                      id="rsvp-note"
                      rows="3"
                      placeholder={T.notePlaceholder}
                      value={rsvpNote}
                      onChange={(e) => setRsvpNote(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn--primary submit"
                    disabled={rsvpStatus === 'submitting'}
                  >
                    <EnvelopeIcon size={16} />
                    {rsvpStatus === 'submitting' ? T.sending : T.confirm}
                  </button>
                  {rsvpStatus === 'error' && (
                    <p className="rsvp-error" role="alert">
                      {T.rsvpError}
                    </p>
                  )}
                </form>
              </>
            )}
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

      {lightbox !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={tr(galleryTiles[lightbox].caption)}
          onClick={() => setLightbox(null)}
        >
          <div
            className="lightbox-inner"
            style={{
              background: `linear-gradient(150deg, ${galleryTiles[lightbox].c1}, ${galleryTiles[lightbox].c2})`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="lightbox-watermark">S ✦ S</span>
            <p className="lightbox-caption">{tr(galleryTiles[lightbox].caption)}</p>
          </div>
          <button
            className="lightbox-close"
            type="button"
            onClick={() => setLightbox(null)}
            aria-label={T.closePhoto}
          >
            <CloseIcon size={20} />
          </button>
        </div>
      )}
    </div>
  )
}

export default App