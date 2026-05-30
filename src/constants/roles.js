export const ROLES = {
  AUTHOR: 'author',
  SUPERADMIN: 'superadmin'
}

export const CMS_ROLES = [ROLES.AUTHOR, ROLES.SUPERADMIN]

export const ROLE_LABELS = {
  [ROLES.AUTHOR]: 'Autor',
  [ROLES.SUPERADMIN]: 'Superadmin'
}

export function canAccessCms(role) {
  return CMS_ROLES.includes(role)
}

export function isSuperadmin(role) {
  return role === ROLES.SUPERADMIN
}
