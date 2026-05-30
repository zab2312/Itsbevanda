import { useAuth } from '../../context/AuthContext'
import { Card, CardContent, CardHeader } from '../ui/card'

export function SuperadminGate({ children }) {
  const { isSuperadmin, loading } = useAuth()

  if (loading) {
    return <div className="text-white/70">Učitavanje...</div>
  }

  if (!isSuperadmin) {
    return (
      <Card className="bg-[#1B1B21] border-white/10">
        <CardHeader>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-white">Pristup odbijen</p>
            <p className="text-sm text-white/60">Samo superadmin može pristupiti upravljanju članovima.</p>
          </div>
        </CardHeader>
        <CardContent />
      </Card>
    )
  }

  return children
}
