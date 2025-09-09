import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react'

interface AuthGuardProps {
  children: React.ReactNode
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, loading, user, checkAuthentication } = useAuth()

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
          <p className="text-sm text-gray-500 mt-2">Verifying session from launchpad</p>
        </div>
      </div>
    )
  }

  // If not authenticated, show message and redirect options
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h1>
          <p className="text-gray-600 mb-6">
            You need to be authenticated to access the ESSU Facilities Management System.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={checkAuthentication}
              className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Authentication</span>
            </button>
            
            <a
              href="https://essu-systems-launchpad.netlify.app/"
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              Go to Launchpad
            </a>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-blue-800">
              Please authenticate through the launchpad first, then return to this page with the authorization code, or click "Refresh Authentication" above.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // If authenticated, render the protected content
  return <>{children}</>
}

export default AuthGuard