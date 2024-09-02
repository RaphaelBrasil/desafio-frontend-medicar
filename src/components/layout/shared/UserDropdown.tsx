'use client'

import Button from '@mui/material/Button'

// Third-party Imports
import { signOut } from 'next-auth/react'

const UserDropdown = () => {
  const handleUserLogout = async () => {
    try {
      // Sign out from the app
      localStorage.removeItem('accessToken')
      await signOut({ callbackUrl: process.env.NEXT_PUBLIC_APP_URL })
    } catch (error) {
      console.error(error)

      // Show above error in a toast like following
      // toastService.error((err as Error).message)
    }
  }

  return (
    <div className='flex items-center plb-2 pli-3'>
      <Button fullWidth variant='outlined' color='primary' onClick={handleUserLogout} className='border-none'>
        Desconectar
      </Button>
    </div>
  )
}

export default UserDropdown
