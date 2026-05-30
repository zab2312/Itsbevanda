import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { canAccessCms } from '../../constants/roles'
import { AdminNav } from '../admin/AdminNav'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export function AuthGate({ children }) {
  const { user, role, isSuperadmin, loading, signIn, signOut } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const { error } = await signIn({ email, password })
      if (error) {
        setError(error.message)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-white/70">
        Provjera autentifikacije...
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <Card className="max-w-md w-full bg-[#1B1B21] border-white/10">
          <CardHeader>
            <div className="space-y-2">
              <p className="text-2xl font-semibold text-white">Admin pristup</p>
              <p className="text-sm text-white/60">Prijavite se kako biste nastavili.</p>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Lozinka</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {error ? <p className="text-sm text-red-400">{error}</p> : null}
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? 'Prijava...' : 'Prijava'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!canAccessCms(role)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <Card className="max-w-md w-full bg-[#1B1B21] border-white/10">
          <CardHeader>
            <div className="space-y-2">
              <p className="text-2xl font-semibold text-white">Pristup odbijen</p>
              <p className="text-sm text-white/60">
                Vaš račun ({user.email}) nema pristup CMS-u. Kontaktirajte superadmina za dodjelu uloge.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full" onClick={() => signOut()}>
              Odjava
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-[#181820] px-4 py-3 text-sm text-white/80">
        <div className="flex flex-wrap items-center gap-2">
          <span>
            Prijavljeni kao <span className="font-medium text-white">{user.email}</span>
          </span>
          {isSuperadmin ? (
            <span className="rounded-full bg-[#8B5CF6]/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#C4B5FD]">
              Superadmin
            </span>
          ) : null}
        </div>
        <Button variant="ghost" size="sm" onClick={() => signOut()}>
          Odjava
        </Button>
      </div>
      <AdminNav />
      {children}
    </div>
  )
}
