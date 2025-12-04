import anime from 'animejs/lib/anime.es.js'

const noop = () => {}

export function initAnimations() {
  if (typeof window === 'undefined') return noop

  const heroGlowEl = document.querySelector('.hero-glow')
  const sectionEls = document.querySelectorAll('.section-reveal')
  const iconEls = document.querySelectorAll('.icon-float')
  const cardEls = document.querySelectorAll('.animated-card')

  let heroGlowAnimation = null
  let iconFloatAnimation = null
  let sectionObserver = null
  const cardListeners = []

  if (heroGlowEl) {
    heroGlowAnimation = anime({
      targets: heroGlowEl,
      opacity: [0.25, 0.4],
      duration: 5000,
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true,
    })
  }

  if (iconEls.length) {
    iconFloatAnimation = anime({
      targets: iconEls,
      translateY: [-4, 0, -4],
      duration: 4000,
      easing: 'easeInOutSine',
      loop: true,
    })
  }

  if (sectionEls.length) {
    sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          anime({
            targets: entry.target,
            translateY: [30, 0],
            opacity: [0, 1],
            delay: anime.stagger(120),
            duration: 900,
            easing: 'easeOutQuad',
          })

          sectionObserver?.unobserve(entry.target)
        })
      },
      { threshold: 0.2 },
    )

    sectionEls.forEach((section) => sectionObserver?.observe(section))
  }

  if (cardEls.length) {
    cardEls.forEach((card) => {
      const onEnter = () => {
        anime({
          targets: card,
          translateY: -6,
          boxShadow: '0 0 25px rgba(150, 80, 255, 0.25)',
          duration: 300,
          easing: 'easeOutQuad',
        })
      }

      const onLeave = () => {
        anime({
          targets: card,
          translateY: 0,
          boxShadow: '0 0 0 rgba(0,0,0,0)',
          duration: 300,
          easing: 'easeOutQuad',
        })
      }

      card.addEventListener('mouseenter', onEnter)
      card.addEventListener('mouseleave', onLeave)
      cardListeners.push({ card, onEnter, onLeave })
    })
  }

  return () => {
    heroGlowAnimation?.pause()
    iconFloatAnimation?.pause()
    sectionObserver?.disconnect()
    cardListeners.forEach(({ card, onEnter, onLeave }) => {
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mouseleave', onLeave)
    })
  }
}

