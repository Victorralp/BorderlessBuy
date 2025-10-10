"use client"

import { useState, useEffect } from 'react'

export function useSafeCurrency() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const formatCurrency = (amount: number, currency: string = 'GBP') => {
    if (!isClient) {
      // Return a simple format for SSR
      return `£${amount.toFixed(2)}`
    }

    try {
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount)
    } catch (error) {
      // Fallback if Intl.NumberFormat fails
      return `£${amount.toFixed(2)}`
    }
  }

  return {
    formatCurrency,
    isClient
  }
}