import React, { useEffect, useRef } from 'react'
import {
  MapPin,
  Clock,
  ArrowRight,
  User,
  CalendarX2,
  UserMinus,
  Timer,
  MessageSquare,
  VideoOff,
  Globe2
} from 'lucide-react'
import { initAnimations } from '../scripts/animations'

const CALENDLY_URL = 'https://calendly.com/ivan-bevanda100/besplatni-konzultacijski-poziv-rast-uz-drustvene-mreze'

export function LandingPage() {
  const calendlyContainerRef = useRef(null)
  const calendlySectionRef = useRef(null)

  useEffect(() => {
    const scriptId = 'calendly-widget-script'

    const initializeCalendly = () => {
      if (window.Calendly?.initInlineWidget && calendlyContainerRef.current) {
        calendlyContainerRef.current.innerHTML = ''
        window.Calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: calendlyContainerRef.current
        })
      }
    }

    if (window.Calendly) {
      initializeCalendly()
      return
    }

    let script = document.getElementById(scriptId)
    const handleScriptLoad = () => {
      initializeCalendly()
    }

    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      script.addEventListener('load', handleScriptLoad)
      document.head.appendChild(script)
    } else {
      script.addEventListener('load', handleScriptLoad)
    }

    return () => {
      script?.removeEventListener('load', handleScriptLoad)
    }
  }, [])

  useEffect(() => {
    const cleanup = initAnimations()
    return () => cleanup()
  }, [])

  const scrollToCalendly = () => {
    calendlySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const clientLogos = ['/BeVa.png', '/Lex.png', '/bilijon.png', '/Stridon.png']

  return (
    <div className="min-h-screen bg-[#121216] text-white font-inter selection:bg-[#8B5CF6]/30 selection:text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <header className="section-reveal bg-[#181820] border border-white/5 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.3)] px-6 sm:px-10 py-12 flex flex-col items-center text-center gap-6 relative overflow-hidden">
          <div className="relative flex flex-col items-center w-full">
            <div className="hero-glow" aria-hidden="true"></div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-geist font-light leading-tight tracking-tight text-white text-center relative z-10">
              Postanite glavno mjesto u gradu
            </h1>
          </div>

          <div className="text-[#D4D4D6] text-lg max-w-3xl leading-relaxed space-y-3 text-center">
            <p>Radim s ugostiteljskim objektima koji imaju potencijal i prostor za rast.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#D4D4D6]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8B5CF6] icon-float" />
              Zagreb, Hrvatska
            </div>
            <span className="w-1 h-1 rounded-full bg-white/10"></span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8B5CF6] icon-float" />
              CET (GMT+1)
            </div>
            <span className="w-1 h-1 rounded-full bg-white/10"></span>
            <div className="flex items-center gap-2 font-medium text-white">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse"></span>
              Available for Projects
            </div>
          </div>
        </header>

        <main className="bg-[#181820] border border-white/5 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.3)] px-6 sm:px-10 py-14 space-y-20">
          {/* About */}
          <section className="section-reveal grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="animated-card bg-[#1E1625] border border-white/5 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#261C32]">
                <img
                  src="/portrait.jpg"
                  alt="Ivan Bevanda"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextElementSibling.style.display = 'flex'
                  }}
                />
                <div className="w-full h-full bg-[#261C32] flex items-center justify-center hidden">
                  <span className="text-[#A9A9AF] text-sm">Portrait Photo</span>
                </div>
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2F2240]/90 border border-[#8B5CF6]/40 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
                  <span className="w-2 h-2 rounded-full bg-[#8B5CF6]"></span>
                  <span className="text-xs font-medium text-white">Open to new opportunities</span>
                </div>
              </div>
              <div className="mt-6 space-y-1">
                <p className="text-lg font-geist font-medium text-white">Ja sam Ivan Bevanda</p>
                <p className="text-base text-[#D4D4D6]">Ekspert za video sadržaj i društvene mreže</p>
                <p className="text-sm text-[#A9A9AF]">Fokusiran na stvaranje učinkovitog sadržaja i dosljedno vođenje profila koji donose stvarne rezultate.</p>
              </div>
            </div>

            <div className="animated-card bg-[#1E1625] border border-white/5 rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-3 mb-6 text-white">
                <User className="w-5 h-5 text-[#C084FC] icon-float" />
                <h3 className="text-xl font-geist font-medium">Od konobara do videa preko 1M pregleda</h3>
              </div>
              <div className="text-sm text-[#D4D4D6] leading-relaxed mb-8 space-y-4">
                <p>
                  Ja sam Ivan Bevanda, rođen u Mostaru, u lijepoj obitelji koja me od malih nogu učila važnosti truda i borbe u životu.
                  S 14 godina prvi put sam se osamostalio i otišao u srednju školu u Travniku. Kasnije završavam srednju u Zagrebu i studiram na
                  Ekonomskom fakultetu u Zagrebu (još uvijek aktivno).
                </p>
                <p>
                  Kada sam upisao fakultet, krenuo sam raditi studentski kao konobar i tu sam vidio nedostatke koji guše kafiće. Možeš imati
                  prekrasan lokal, ali ako nitko nije čuo za njega, nitko neće doći.
                </p>
                <p>
                  S 19 godina otišao sam raditi u Nizozemsku i tamo krenuo učiti sve o digitalnim vještinama, da bih shvatio kako su greške na
                  mrežama uvijek iste. Agencije za marketing ili su prespore ili rade samo oglašene objave, što u široj slici nema nikakvog smisla.
                </p>
                <p>
                  Danas radim s ugostiteljskim objektima koji žele svoj biznis dovesti na sljedeću stepenicu i aktivno studiram ekonomiju, što mi
                  pomaže razumjeti cijeli ekosustav.
                </p>
                <p>Nisam savršen – svjestan sam svojih mana, ali uvijek se trudim rasti preko njih.</p>
                <p className="italic text-[#A9A9AF]">„Ako ne postaješ bolji, postaješ gori.“ – Kenen Crnkić</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: '100+', label: 'Završenih projekata' },
                  { value: '10+', label: 'Sretnih klijenata' },
                  { value: '3+', label: 'Godine iskustva' }
                ].map((stat) => (
                  <div key={stat.label} className="animated-card p-4 rounded-xl border border-white/5 bg-[#261C32]">
                    <div className="text-3xl font-geist font-semibold text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-[#A9A9AF]">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="w-full h-px bg-white/5 mb-6"></div>
              <div>
                <h4 className="text-sm font-geist font-medium text-[#A9A9AF] tracking-[0.3em] mb-4">CORE EXPERTISE</h4>
                <div className="flex flex-wrap gap-2">
                  {['Dizajn', 'Video editing', 'Vođenje mreža', 'Skripting', 'Snimanje', 'Web design'].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#261C32] text-white border border-white/5">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Work Reel */}
          <section className="section-reveal flex flex-col items-center gap-8">
            <div className="animated-card w-full relative aspect-video rounded-2xl border border-white/5 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.3)] bg-[#2F2240]">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/mJM_Lv_dwt0?si=atSFc9dDCkpJAHAy"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>

            <button
              onClick={scrollToCalendly}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-sm bg-[#8B5CF6] hover:bg-[#A78BFA] text-white shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-200 active:scale-95"
            >
              Započni svoju transformaciju
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </section>

          {/* Common Challenges */}
          <section className="section-reveal space-y-6">
            <div>
              <h3 className="text-2xl font-geist font-medium tracking-tight text-white">Sigurno imaš probleme oko...</h3>
              <div className="mt-3 h-0.5 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#C084FC] to-transparent w-[380px] max-w-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Eventi ostaju poluprazni',
                  copy: 'Organiziraš događaje, ali stolovi se ne popune jer publika ne razumije zašto bi baš kod tebe došla.',
                  Icon: CalendarX2
                },
                {
                  title: 'Najbolje osoblje brzo ode',
                  copy: 'Talentirani konobari odlaze konkurenciji koja bolje komunicira svoju kulturu i brigu o timu.',
                  Icon: UserMinus
                },
                {
                  title: 'Rupe kroz tjedan',
                  copy: 'Petak i subota gore, a radni tjedan ostane prazan pa nikad ne napuniš puni potencijal prometa.',
                  Icon: Timer
                },
                {
                  title: 'Agencija ne sluša',
                  copy: 'Komunikacija s agencijom svodi se na generičke izvještaje i nitko ne razumije specifičnosti tvog lokala.',
                  Icon: MessageSquare
                },
                {
                  title: 'Nitko ne želi pred kameru',
                  copy: 'Tim se ne osjeća sigurno ispred kamere pa svaki pokušaj videa staje prije nego što priča krene.',
                  Icon: VideoOff
                },
                {
                  title: 'Nisi u Zagrebu, ali želiš rast',
                  copy: 'Radiš izvan glavnog grada i trebaš partnera koji pokriva cijelu regiju i zna kako lokalnu priču plasirati online.',
                  Icon: Globe2
                }
              ].map(({ title, copy, Icon }) => (
                <div key={title} className="animated-card p-6 rounded-2xl border border-white/5 bg-[#1E1625] shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-[#261C32] text-[#C084FC]">
                    <Icon className="w-5 h-5 icon-float" />
                  </div>
                  <h4 className="text-lg font-medium mb-2 font-geist tracking-tight text-white">{title}</h4>
                  <p className="text-sm text-[#D4D4D6] leading-relaxed">{copy}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Calendly */}
          <section ref={calendlySectionRef} className="section-reveal space-y-6">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-geist font-medium tracking-tight text-white">Rezerviraj besplatan strateški poziv</h3>
              <p className="text-sm text-[#D4D4D6] mt-2">Odaberi termin koji ti odgovara i rezerviraj besplatne konzultacije</p>
            </div>
            <div className="animated-card rounded-2xl bg-[#1E1625] border border-white/5 p-4 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              <div ref={calendlyContainerRef} className="w-full" style={{ minWidth: '320px', height: '1100px', overflow: 'hidden' }}></div>
            </div>
          </section>

          {/* Clients */}
          <section className="section-reveal space-y-6">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-geist font-medium tracking-tight text-white">Moji klijenti</h3>
              <p className="text-sm text-[#D4D4D6] mt-2">Brendovi koji su mi ukazali povjerenje</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {clientLogos.map((logo) => (
                <div key={logo} className="animated-card h-24 rounded-2xl border border-white/5 bg-[#1E1625] flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                  <img
                    src={logo}
                    alt="Client logo"
                    className="max-h-16 w-auto object-contain opacity-90"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Why It Works */}
          <section className="section-reveal animated-card rounded-2xl p-8 sm:p-12 text-center bg-[#1E1625] border border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/5 text-xs font-medium bg-[#2F2240] text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C084FC]"></span>
                Dokazana metodologija
              </div>
              <h3 className="text-3xl sm:text-4xl font-geist font-medium tracking-tight text-white">Zašto ovo funkcionira</h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#D4D4D6]">
                Društvene mreže danas su znanost, ali većina ih koristi pogrešno. Umjesto da jurim za jednim “magičnim”
                videom, gradim rezultate kroz dosljednost. Ne postoji jedan potez za 100% bolji ishod, nego 100
                poteza koji svaki donesu 1%.
              </p>
              <div className="pt-4">
                <button
                  onClick={scrollToCalendly}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm bg-[#8B5CF6] hover:bg-[#A78BFA] text-white shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-200"
                >
                  Rezerviraj 15-min konzultacije
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="mt-4 text-xs text-[#A9A9AF]">Bez obveze. Potpuno besplatan razgovor.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

