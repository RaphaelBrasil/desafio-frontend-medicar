'use client'
import { useEffect, useState } from 'react'

import { Button, Card, CardContent, CardHeader, Modal } from '@mui/material'

import { useSession } from 'next-auth/react'

import NovaConsulta from '@/components/NovaConsulta'
import TabelaConsulta from '@/components/TabelaConsulta'
import api from '@/libs/api'

interface Especialidade {
  id: number
  nome: string
}

interface Medico {
  id: number
  crm: number
  nome: string
  especialidade: Especialidade
}

interface Consulta {
  id: number
  dia: string
  horario: string
  data_agendamento: string
  medico: Medico
}

export default function Page() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { data: session } = useSession()

  const [consultas, setConsultas] = useState<Consulta[]>([])

  useEffect(() => {
    // This ensures that the token is set in localStorage
    if (session?.accessToken) {
      localStorage.setItem('accessToken', session.accessToken as string)
      fetchData() // Fetch data only after setting the token
    }
  }, [session])

  const fetchData = () => {
    api
      .get('/consultas')
      .then(response => {
        setConsultas(response.data)
      })
      .catch(error => {
        console.error('Error fetching consultas:', error)
      })
  }

  return (
    <Card className='shadow-sm'>
      <CardHeader
        title={<h2>Consulta Clínica</h2>}
        action={
          <Button fullWidth variant='contained' color='primary' className='text-white' onClick={handleOpen}>
            Nova Consulta
          </Button>
        }
      />
      <CardContent>
        <TabelaConsulta consultas={consultas} fetchData={fetchData} />
        <Modal open={open} onClose={handleClose}>
          <div className='flex items-center justify-center h-full'>
            <NovaConsulta handleClose={handleClose} fetchData={fetchData} />
          </div>
        </Modal>
      </CardContent>
    </Card>
  )
}
