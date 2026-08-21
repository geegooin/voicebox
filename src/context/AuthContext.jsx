import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useToast } from './ToastContext'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const { showToast } = useToast()

  useEffect(() => {
    let cancelled = false

    async function loadProfile(userId) {
      const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
      if (!cancelled) setProfile(data ?? null)
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (cancelled) return
      setUser(session?.user ?? null)

      if (event === 'INITIAL_SESSION') {
        if (session?.user) await loadProfile(session.user.id)
        setLoading(false)
        return
      }

      if (event === 'SIGNED_IN' && session?.user) {
        const { data: existing } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', session.user.id)
          .maybeSingle()

        if (!existing) {
          const meta = session.user.user_metadata || {}
          await supabase.from('profiles').insert({
            id: session.user.id,
            display_name: meta.full_name || meta.name || '',
            avatar_url: meta.avatar_url || meta.picture || '',
          })
          showToast('가입을 마쳤습니다. 환영해요!')
        } else {
          showToast('로그인되었습니다.')
        }
        await loadProfile(session.user.id)
      }

      if (event === 'SIGNED_OUT') {
        setProfile(null)
      }
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [showToast])

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` },
    })

  const signOut = () => supabase.auth.signOut()

  const value = { user, profile, loading, signInWithGoogle, signOut }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
