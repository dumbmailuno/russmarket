import { supabaseClient } from './supabase-client'

export async function getValidToken() {
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refresh_token')

  if (!token || !refreshToken) return null

  const { data, error } = await supabaseClient.auth.setSession({
    access_token: token,
    refresh_token: refreshToken
  })

  if (error || !data.session) {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    return null
  }

  localStorage.setItem('token', data.session.access_token)
  localStorage.setItem('refresh_token', data.session.refresh_token)

  return data.session.access_token
}