import { Link } from 'react-router-dom'

export function FormDisclaimer({ className = '' }) {
  return (
    <p className={`text-xs text-[#A9A9AF] leading-relaxed ${className}`}>
      Podaci iz obrasca koriste se isključivo za obradu rezervacije termina i komunikaciju vezanu uz vaš upit.
      Više informacija dostupno je u{' '}
      <Link to="/privacy-policy" className="text-[#C4B5FD] hover:text-white underline underline-offset-2 transition-colors">
        Politici privatnosti
      </Link>
      .
    </p>
  )
}
