import { Link } from 'react-router-dom'
import { LEGAL } from '../../constants/legal'
import { LegalPageLayout } from '../../components/legal/LegalPageLayout'

export function PrivacyPolicyPage() {
  const { name, email, website, dataRetention } = LEGAL

  return (
    <LegalPageLayout title="Politika privatnosti">
      <section className="space-y-3">
        <h2 className="text-lg font-geist text-white">1. Uvod</h2>
        <p>
          Ova Politika privatnosti objašnjava kako {name} (u daljnjem tekstu: „mi“, „nas“ ili „voditelj obrade“)
          prikuplja, koristi i štiti osobne podatke posjetitelja web stranice{' '}
          <a href={`https://${website}`} className="text-[#C4B5FD] hover:text-white">
            {website}
          </a>{' '}
          u skladu s Općom uredbom o zaštiti podataka (GDPR) i važećim zakonima Republike Hrvatske.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-geist text-white">2. Tko smo</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong className="text-white/90">Ime:</strong> {name}
          </li>
          <li>
            <strong className="text-white/90">E-pošta:</strong>{' '}
            <a href={`mailto:${email}`} className="text-[#C4B5FD] hover:text-white">
              {email}
            </a>
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-geist text-white">3. Koje podatke prikupljamo</h2>
        <p>Možemo obraditi sljedeće kategorije osobnih podataka:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>ime i prezime</li>
          <li>e-mail adresa</li>
          <li>broj telefona (ako ga unesete)</li>
          <li>podaci o odabranom terminu rezervacije</li>
          <li>sadržaj poruke ili napomene uz upit (ako je unesena)</li>
          <li>tehnički podaci (IP adresa, vrsta preglednika, vrijeme posjeta) u logovima hostinga</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-geist text-white">4. Svrha i pravna osnova obrade</h2>
        <p>Osobne podatke obrađujemo u sljedeće svrhe:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong className="text-white/90">Obrada rezervacija i upita</strong> — podaci iz obrasca za rezervaciju
            termina / strateškog poziva koriste se isključivo za dogovor termina, potvrdu rezervacije i komunikaciju
            vezanu uz vaš upit (pravna osnova: izvršenje mjera prije sklapanja ugovora ili legitimni interes).
          </li>
          <li>
            <strong className="text-white/90">Obavijest vlasniku usluge</strong> — podaci iz rezervacije/upita prosljeđuju
            se na e-mail adresu administratora stranice radi obrade vašeg zahtjeva.
          </li>
          <li>
            <strong className="text-white/90">Blog i administracija</strong> — ako koristite administratorski dio
            stranice, podaci za prijavu obrađuju se putem usluge Supabase (autentifikacija).
          </li>
          <li>
            <strong className="text-white/90">Tehničko funkcioniranje stranice</strong> — nužni kolačići i sesije
            potrebni za rad stranice.
          </li>
        </ul>
        <p>Ne koristimo Google Analytics, Google Tag Manager, Meta Pixel ni slične marketinške alate za praćenje na ovoj stranici.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-geist text-white">5. Treće strane (third-party servisi)</h2>
        <p>Na stranici se mogu koristiti sljedeći vanjski servisi:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong className="text-white/90">Calendly</strong> — ugrađeni obrazac za rezervaciju termina. Podatke koje
            unesete u Calendly obrađuje Calendly LLC prema vlastitoj politici privatnosti. Mi primamo obavijest o
            rezervaciji na e-mail administratora radi obrade vašeg upita.
          </li>
          <li>
            <strong className="text-white/90">YouTube</strong> — ugrađeni video player (privacy-enhanced način). YouTube
            može postaviti kolačiće kada reproducirate video. Više u{' '}
            <Link to="/cookie-policy" className="text-[#C4B5FD] hover:text-white underline underline-offset-2">
              Politici kolačića
            </Link>
            .
          </li>
          <li>
            <strong className="text-white/90">Supabase</strong> — hosting baze podataka i autentifikacija za blog/admin
            dio stranice.
          </li>
        </ul>
        <p>
          Prijenos podataka trećim stranama odvija se samo u mjeri potrebnoj za pružanje usluge. Ako se podaci prenose
          izvan EU/EEA, primjenjuju se odgovarajuće zaštitne mjere (npr. standardne ugovorne klauzule).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-geist text-white">6. Rok čuvanja podataka</h2>
        <p>
          Osobne podatke iz rezervacija i upita čuvamo najduže: <strong className="text-white/90">{dataRetention}</strong>
        </p>
        <p>Podatke brišemo ili anonimiziramo kada više nisu potrebni za svrhu za koju su prikupljeni.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-geist text-white">7. Vaša prava prema GDPR-u</h2>
        <p>U skladu s GDPR-om imate pravo na:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>pristup svojim osobnim podacima</li>
          <li>ispravak netočnih podataka</li>
          <li>brisanje podataka („pravo na zaborav“), kada je primjenjivo</li>
          <li>ograničenje obrade</li>
          <li>prijenos podataka</li>
          <li>prigovor na obradu temeljenu na legitimnom interesu</li>
          <li>povlačenje privole, kada je obrada temeljena na privoli</li>
        </ul>
        <p>
          Za ostvarivanje prava kontaktirajte nas na:{' '}
          <a href={`mailto:${email}`} className="text-[#C4B5FD] hover:text-white">
            {email}
          </a>
          . Odgovorit ćemo u roku propisanom zakonom (obično unutar 30 dana).
        </p>
        <p>
          Imate pravo podnijeti pritužbu nadzornom tijelu — Agenciji za zaštitu osobnih podataka (AZOP),{' '}
          <a href="https://azop.hr" target="_blank" rel="noopener noreferrer" className="text-[#C4B5FD] hover:text-white">
            azop.hr
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-geist text-white">8. Sigurnost podataka</h2>
        <p>
          Primjenjujemo odgovarajuće tehničke i organizacijske mjere zaštite kako bismo spriječili neovlašteni pristup,
          gubitak ili zlouporabu osobnih podataka.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-geist text-white">9. Promjene politike</h2>
        <p>
          Ovu politiku možemo povremeno ažurirati. Ažurirana verzija bit će objavljena na ovoj stranici s datumom
          zadnjeg ažuriranja.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-geist text-white">10. Kontakt</h2>
        <p>
          Za sva pitanja vezana uz privatnost i zaštitu osobnih podataka pišite na:{' '}
          <a href={`mailto:${email}`} className="text-[#C4B5FD] hover:text-white">
            {email}
          </a>
        </p>
      </section>
    </LegalPageLayout>
  )
}
