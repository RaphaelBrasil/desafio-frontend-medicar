// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Register from '@views/Register'

export const metadata: Metadata = {
  title: 'Cadastro',
  description: 'Cadastre sua conta'
}

const RegisterPage = () => {
  // Vars

  return <Register />
}

export default RegisterPage
