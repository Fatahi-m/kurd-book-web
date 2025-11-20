import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'احراز هویت - کتابخانەی کوردی',
  description: 'چوونەژوورەوە و دروستکردنی هەژمار بۆ کتابخانەی کوردی'
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}