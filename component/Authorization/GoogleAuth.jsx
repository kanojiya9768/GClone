'use client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'

const GoogleAuth = ({children}) => {
  return (
    <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  )
}

export default GoogleAuth
