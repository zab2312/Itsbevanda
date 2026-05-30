import { supabase } from '../lib/supabaseClient'

async function invokeMemberFunction(name, body) {
  const { data, error } = await supabase.functions.invoke(name, { body })

  if (error) {
    throw new Error(error.message || `Greška pri pozivu funkcije ${name}`)
  }

  if (data?.error) {
    throw new Error(data.error)
  }

  return data
}

export async function getMembers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, role, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export async function updateMemberRole(id, role) {
  const { data, error } = await supabase.from('profiles').update({ role }).eq('id', id).select().single()

  if (error) {
    throw error
  }

  return data
}

export async function createMember({ email, password, role }) {
  return invokeMemberFunction('create-member', { email, password, role })
}

export async function deleteMember(userId) {
  return invokeMemberFunction('delete-member', { userId })
}
