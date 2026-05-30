import { Link } from 'react-router-dom'

export function LegalPageLayout({ title, children }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-10">
      <div className="mb-10 space-y-3">
        <Link to="/" className="text-sm text-[#C4B5FD] hover:text-white transition-colors">
          ← Natrag na početnu
        </Link>
        <h1 className="text-3xl sm:text-4xl font-geist text-white">{title}</h1>
        <p className="text-sm text-white/50">Zadnje ažuriranje: {new Date().toLocaleDateString('hr-HR')}</p>
      </div>
      <article className="legal-prose space-y-6 text-sm leading-relaxed text-white/75">{children}</article>
    </div>
  )
}
