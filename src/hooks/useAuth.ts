import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthUser {
  id: string
  email: string
  name?: string
  role?: string
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    handleAuthFlow()

    // Listen for auth changes from Supabase
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Supabase auth state changed:', _event, session)
      setSession(session)
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.fullName || session.user.user_metadata?.name,
          role: session.user.user_metadata?.role
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleAuthFlow = async () => {
    try {
      // Check for authorization code in URL parameters
      const params = new URLSearchParams(window.location.search)
      const code = params.get('code')
      
      if (code) {
        console.log('Authorization code found, exchanging for tokens...')
        
        try {
          // Exchange code for tokens
          const response = await fetch(`https://essu-systems-launchpad.netlify.app/.netlify/functions/exchange?code=${code}`)
          
          if (!response.ok) {
            throw new Error(`Exchange failed: ${response.status}`)
          }
          
          const { access_token, refresh_token, user_data } = await response.json()
          
          if (access_token && refresh_token) {
            console.log('Tokens received, setting Supabase session...')
            
            const { data, error } = await supabase.auth.setSession({
              access_token,
              refresh_token
            })
            
            if (error) {
              console.error('Error setting Supabase session:', error)
              // Fall back to user data from exchange
              if (user_data) {
                setUser({
                  id: user_data.id,
                  email: user_data.email,
                  name: user_data.fullName || user_data.name,
                  role: user_data.role
                })
              }
              setSession(null)
            } else {
              console.log('Session restored successfully!', data.session)
              setSession(data.session)
              setUser({
                id: data.session?.user.id || user_data?.id,
                email: data.session?.user.email || user_data?.email,
                name: data.session?.user.user_metadata?.fullName || user_data?.fullName || user_data?.name,
                role: data.session?.user.user_metadata?.role || user_data?.role
              })
            }
            
            // Clean up URL by removing the code parameter
            const newUrl = new URL(window.location.href)
            newUrl.searchParams.delete('code')
            window.history.replaceState({}, document.title, newUrl.toString())
          } else {
            console.error('No tokens received from exchange')
            setUser(null)
            setSession(null)
          }
        } catch (error) {
          console.error('Token exchange failed:', error)
          setUser(null)
          setSession(null)
        }
      } else {
        // No code parameter, check for existing Supabase session
        console.log('No authorization code, checking existing session...')
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          console.log('Existing session found:', session)
          setSession(session)
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.fullName || session.user.user_metadata?.name,
            role: session.user.user_metadata?.role
          })
        } else {
          console.log('No existing session found')
          setUser(null)
          setSession(null)
        }
      }
    } catch (error) {
      console.error('Error in auth flow:', error)
      setUser(null)
      setSession(null)
    } finally {
      setLoading(false)
    }
  }

  const checkAuthentication = async () => {
    await handleAuthFlow()
  }

  const signOut = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) console.error('Error signing out from Supabase:', error)

      setUser(null)
      setSession(null)
      console.log('Signed out successfully')
    } catch (error) {
      console.error('Error during sign out:', error)
    } finally {
      setLoading(false)
      window.location.href = 'https://essu-systems-launchpad.netlify.app/'
    }
  }

  return {
    user,
    session,
    loading,
    signOut,
    isAuthenticated: !!user,
    checkAuthentication
  }
}