'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface PhoneFrameProps {
  children: React.ReactNode
  className?: string
  onDark?: boolean
  showStatusBar?: boolean
  allowToggle?: boolean
}

export function PhoneFrame({
  children,
  className,
}: PhoneFrameProps) {
  return (
    <div className={cn('min-h-screen w-full max-w-lg mx-auto flex flex-col bg-background text-foreground shadow-sm', className)}>
      {children}
    </div>
  )
}
