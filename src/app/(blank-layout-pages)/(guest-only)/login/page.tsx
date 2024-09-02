// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Login from '@views/Login'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Faça login na sua conta'
}

const LoginPage = () => {
  // Vars

  return <Login />
}

export default LoginPage
