import { Link } from 'react-router-dom'
import { LEGAL } from '../../constants/legal'
import { LegalPageLayout } from '../../components/legal/LegalPageLayout'

export function CookiePolicyPage() {
  const { name, email, website } = LEGAL

  return (
    <LegalPageLayout title="Politika kolačića">
      <section className="space-y-3">
        <h2 className="text-lg font-geist text-white">1. Što su kolačići</h2>
        <p>
          Kolačići (cookies) su male tekstualne datoteke koje se pohranjuju na vaš uređaj kada posjetite web stranicu{' '}
          <a href={`https://${website}`} className="text-[#C4B5FD] hover:text-white">
            {website}
          </a>
          . Pomažu u radu stranice ili omogućuju određene funkcionalnosti.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-geist text-white">2. Kolačići koje koristimo</h2>

        <h3 className="text-base font-medium text-white/90">Nužni kolačići</h3>
        <p>
          Potrebni su za osnovno funkcioniranje stranice. Bez njih određene funkcije ne bi radile ispravno. Ne zahtijevaju
          privolu prema važećim pravilima.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>tehnički kolačići sesije (npr. prijava u administratorski dio putem Supabase)</li>
          <li>kolačići povezani s radom ugrađenog Calendly widgeta za rezervaciju termina</li>
        </ul>

        <h3 className="text-base font-medium text-white/90 pt-2">Kolačići trećih strana (funkcionalni)</h3>
        <p>
          Kada koristite ugrađene sadržaje, treće strane mogu postaviti vlastite kolačiće:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong className="text-white/90">Calendly</strong> — za rezervaciju termina i prikaz kalendara
          </li>
          <li>
            <strong className="text-white/90">YouTube</strong> — kada reproducirate ugrađeni video (privacy-enhanced
            embed)
          </li>
        </ul>

        <h3 className="text-base font-medium text-white/90 pt-2">Analitički i marketinški kolačići</h3>
        <p>
          <strong className="text-white/90">Ne koristimo</strong> Google Analytics, Google Tag Manager, Meta Pixel ni druge
          alate za analitiku ili remarketing na ovoj stranici. Stoga nema odvojenog bannera za pristanak na takve
          kolačiće.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-geist text-white">3. Kako upravljati kolačićima</h2>
        <p>
          Većinu kolačića možete kontrolirati ili obrisati putem postavki svog internetskog preglednika. Blokiranje svih
          kolačića može utjecati na rad stranice (npr. rezervacija termina putem Calendly widgeta).
        </p>
        <p>Upute za popularne preglednike:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C4B5FD] hover:text-white"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/hr/kb/omogucavanje-i-onemogucavanje-kolacica"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C4B5FD] hover:text-white"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/hr-hr/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C4B5FD] hover:text-white"
            >
              Safari
            </a>
          </li>
        </ul>
        <p>
          Za kolačiće trećih strana (Calendly, YouTube) postavke možete upravljati i putem njihovih politika privatnosti
          ili postavki preglednika za blokiranje trećih strana.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-geist text-white">4. Postavke kolačića na ovoj stranici</h2>
        <p>
          Budući da ne koristimo ne-nužne analitičke ili marketinške kolačiće na samoj stranici, nema posebnog centra za
          postavke kolačića. Ako u budućnosti dodamo takve alate, omogućit ćemo odabir kategorija prije njihovog učitavanja.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-geist text-white">5. Više informacija</h2>
        <p>
          Detalje o obradi osobnih podataka potražite u{' '}
          <Link to="/privacy-policy" className="text-[#C4B5FD] hover:text-white underline underline-offset-2">
            Politici privatnosti
          </Link>
          . Za pitanja pišite na{' '}
          <a href={`mailto:${email}`} className="text-[#C4B5FD] hover:text-white">
            {email}
          </a>{' '}
          ({name}).
        </p>
      </section>
    </LegalPageLayout>
  )
}
