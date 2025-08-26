'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export default function Loading({ size = 'md', text, className = '' }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm', 
    lg: 'text-base'
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        {/* Anel externo com gradiente */}
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-0.5 animate-spin`}>
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
            <Loader2 className={`${
              size === 'sm' ? 'w-2.5 h-2.5' : 
              size === 'md' ? 'w-5 h-5' : 
              'w-8 h-8'
            } animate-spin text-transparent`} />
          </div>
        </div>
        
        {/* Ícone central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className={`${
            size === 'sm' ? 'w-2.5 h-2.5' : 
            size === 'md' ? 'w-5 h-5' : 
            'w-8 h-8'
          } animate-spin text-purple-600`} />
        </div>
      </div>
      
      {text && (
        <p className={`mt-3 text-gray-700 ${textSizes[size]} font-medium animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  )
}