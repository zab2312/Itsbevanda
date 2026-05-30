import { useEffect, useState } from 'react'
import { SuperadminGate } from '../../components/auth/SuperadminGate'
import { AdminMembersTable } from '../../components/admin/AdminMembersTable'
import { createMember, deleteMember, getMembers, updateMemberRole } from '../../services/memberService'
import { useAuth } from '../../context/AuthContext'
import { ROLES, ROLE_LABELS } from '../../constants/roles'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

export function AdminMembersPage() {
  const { user } = useAuth()
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: ROLES.AUTHOR
  })

  const loadMembers = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getMembers()
      setMembers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMembers()
  }, [])

  const showSuccess = (message) => {
    setSuccess(message)
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await createMember(form)
      setForm({ email: '', password: '', role: ROLES.AUTHOR })
      await loadMembers()
      showSuccess('Član je uspješno dodan.')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleRoleChange = async (id, role) => {
    setError('')
    try {
      await updateMemberRole(id, role)
      await loadMembers()
      showSuccess('Uloga je ažurirana.')
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const handleDelete = async (id) => {
    setError('')
    try {
      await deleteMember(id)
      await loadMembers()
      showSuccess('Član je obrisan.')
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return (
    <SuperadminGate>
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 space-y-8">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Tim</p>
          <h1 className="text-3xl font-geist text-white">Članovi</h1>
        </div>

        <Card className="bg-[#1B1B21] border-white/10">
          <CardHeader>
            <p className="text-lg font-semibold text-white">Dodaj novog člana</p>
            <p className="text-sm text-white/60">Kreira novi račun s emailom, lozinkom i ulogom.</p>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" onSubmit={handleCreate}>
              <div className="space-y-2">
                <Label htmlFor="member-email">Email</Label>
                <Input
                  id="member-email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="member-password">Lozinka</Label>
                <Input
                  id="member-password"
                  type="password"
                  minLength={8}
                  value={form.password}
                  onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="member-role">Uloga</Label>
                <select
                  id="member-role"
                  value={form.role}
                  onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
                  className="flex h-11 w-full rounded-full border border-white/10 bg-[#15141B] px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/60"
                >
                  <option value={ROLES.AUTHOR}>{ROLE_LABELS[ROLES.AUTHOR]}</option>
                  <option value={ROLES.SUPERADMIN}>{ROLE_LABELS[ROLES.SUPERADMIN]}</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? 'Dodavanje...' : 'Dodaj člana'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {error ? <p className="text-red-400 text-sm">{error}</p> : null}
        {success ? <p className="text-sm text-[#C4B5FD]">{success}</p> : null}

        {loading ? (
          <div className="text-white/70">Učitavanje...</div>
        ) : (
          <AdminMembersTable
            members={members}
            currentUserId={user?.id}
            onRoleChange={handleRoleChange}
            onDelete={handleDelete}
          />
        )}
      </div>
    </SuperadminGate>
  )
}
