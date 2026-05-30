import { useState } from 'react'
import { ROLES, ROLE_LABELS } from '../../constants/roles'
import { Button } from '../ui/button'

const formatDate = (value) =>
  new Intl.DateTimeFormat('hr-HR', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(value))

export function AdminMembersTable({ members = [], currentUserId, onRoleChange, onDelete }) {
  const [pendingId, setPendingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [roleDrafts, setRoleDrafts] = useState({})

  const getRole = (member) => roleDrafts[member.id] ?? member.role

  const handleSave = async (member) => {
    const nextRole = getRole(member)
    if (nextRole === member.role) return

    setPendingId(member.id)
    try {
      await onRoleChange(member.id, nextRole)
      setRoleDrafts((prev) => {
        const next = { ...prev }
        delete next[member.id]
        return next
      })
    } finally {
      setPendingId(null)
    }
  }

  if (!members.length) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 bg-[#1A1A22] p-10 text-center text-white/70">
        Još nema članova.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/5 bg-[#1B1B24] shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
      <div className="grid grid-cols-4 gap-4 border-b border-white/5 px-6 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
        <span>Email</span>
        <span>Uloga</span>
        <span>Kreirano</span>
        <span className="text-right">Akcije</span>
      </div>
      <div className="divide-y divide-white/5">
        {members.map((member) => {
          const isSelf = member.id === currentUserId
          const draftRole = getRole(member)
          const hasChanges = draftRole !== member.role

          return (
            <div key={member.id} className="grid grid-cols-4 gap-4 px-6 py-4 text-sm text-white/80 items-center">
              <div>
                <p className="font-medium text-white">{member.email || '—'}</p>
                {isSelf ? <p className="text-xs text-white/40">Vi</p> : null}
              </div>
              <div>
                <select
                  value={draftRole}
                  disabled={isSelf || pendingId === member.id}
                  onChange={(event) =>
                    setRoleDrafts((prev) => ({ ...prev, [member.id]: event.target.value }))
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#15141B] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/60 disabled:opacity-50"
                >
                  <option value={ROLES.AUTHOR}>{ROLE_LABELS[ROLES.AUTHOR]}</option>
                  <option value={ROLES.SUPERADMIN}>{ROLE_LABELS[ROLES.SUPERADMIN]}</option>
                </select>
              </div>
              <div className="text-white/60">{formatDate(member.created_at)}</div>
              <div className="flex items-center justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={!hasChanges || isSelf || pendingId === member.id || deletingId === member.id}
                  onClick={() => handleSave(member)}
                >
                  {pendingId === member.id ? 'Spremanje...' : 'Spremi'}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={isSelf || pendingId === member.id || deletingId === member.id}
                  onClick={async () => {
                    const label = member.email || 'ovog člana'
                    if (!window.confirm(`Obriši ${label}?`)) return

                    setDeletingId(member.id)
                    try {
                      await onDelete?.(member.id)
                    } finally {
                      setDeletingId(null)
                    }
                  }}
                >
                  {deletingId === member.id ? 'Brisanje...' : 'Obriši'}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
