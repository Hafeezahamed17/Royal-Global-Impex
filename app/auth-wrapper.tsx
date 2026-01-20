'use client'

import { ReactNode } from 'react'
import { AuthProvider } from '@/components/auth-provider'

export function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
