'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const NotFound = () => {
  return (
    <div className='flex items-center justify-center min-bs-[100dvh] relative p-6 overflow-x-hidden'>
      <div className='flex items-center flex-col text-center'>
        <div className='flex flex-col gap-2 is-[90vw] sm:is-[unset] mbe-6'>
          <Typography className='font-medium text-8xl' color='text.primary'>
            404
          </Typography>
          <Typography variant='h4'>Página não encontrada ⚠️</Typography>
          <Typography>não encontramos a página procurada</Typography>
        </div>
        <Button href='/' component={Link} variant='contained' className='text-white'>
          Voltar para página inicial
        </Button>
      </div>
    </div>
  )
}

export default NotFound
