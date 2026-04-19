const SESSION_KEY = 'marinote-current-user-id'

export const saveSessionUserId = (userId) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(SESSION_KEY, String(userId))
}

export const getSessionUserId = () => {
  if (typeof window === 'undefined') return null

  const value = window.localStorage.getItem(SESSION_KEY)
  return value ? Number(value) : null
}

export const clearSessionUserId = () => {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(SESSION_KEY)
}
