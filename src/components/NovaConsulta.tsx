'use client'
import React, { useEffect, useState } from 'react'

import { useForm, Controller } from 'react-hook-form'

import { MenuItem, TextField, Button, Card, CardContent, CardHeader } from '@mui/material'

import api from '@/libs/api'
import formatDate from './formatDate'

interface Especialidade {
  nome: string
}
interface Medico {
  nome: string
}

interface NovaConsultaProps {
  handleClose: () => void
  fetchData: () => void
}

const NovaConsulta: React.FC<NovaConsultaProps> = ({ handleClose, fetchData }) => {
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      especialidade: '',
      medico: '',
      data: '',
      hora: ''
    }
  })

  const [especialidades, setEspecialidades] = useState<Especialidade[]>([])
  const [medicos, setMedicos] = useState<Medico[]>([])
  const [datas, setDatas] = useState<[]>([])
  const [horarios, setHorarios] = useState<[]>([])

  const especialidadeSelecionada = watch('especialidade')
  const medicoSelecionado = watch('medico')
  const dataSelecionada = watch('data')
  const horaSelecionada = watch('hora')

  const handleEspecialidadeChange = (especialidade: string) => {
    setMedicos([])
    setDatas([])
    setHorarios([])
    setValue('medico', '')
    setValue('data', '')
    setValue('hora', '')

    api
      .get(`/medicos`)
      .then(response => {
        const medicosFiltrados = response.data.filter(
          (medico: { especialidade: { nome: string } }) => medico.especialidade.nome === especialidade
        )

        setMedicos(medicosFiltrados)
      })
      .catch(error => {
        console.error('Error fetching medicos:', error)
      })
  }

  const handleMedicoChange = (medico: string) => {
    setDatas([])
    setHorarios([])
    setValue('data', '')
    setValue('hora', '')

    api
      .get(`/agendas`)
      .then(response => {
        const datasFiltradas = response.data.filter(
          (agenda: { medico: { nome: string } }) => agenda.medico.nome === medico
        )

        setDatas(datasFiltradas.map((agenda: any) => agenda.dia))
      })
      .catch(error => {
        console.error('Error fetching datas:', error)
      })
  }

  const handleDataChange = (data: string) => {
    setHorarios([])
    setValue('hora', '')

    if (data) {
      api
        .get(`/agendas`)
        .then(response => {
          const datasFiltradas = response.data.filter(
            (agenda: { medico: { nome: string } }) => agenda.medico.nome === medicoSelecionado
          )

          const horariosFiltrados = datasFiltradas.flatMap((agenda: any) => agenda.horarios)

          setHorarios(horariosFiltrados)
        })
        .catch(error => {
          console.error('Error fetching datas:', error)
        })
    }
  }

  const onSubmit = (data: { especialidade: string; medico: string; data: string; hora: string }) => {
    // Estrutura do payload para a requisição POST
    const payload = {
      especialidade: data.especialidade,
      medico: data.medico,
      data: data.data,
      hora: data.hora
    }

    // Envia a requisição POST para o backend
    api
      .post('/consultas', payload)
      .then(() => {
        fetchData()
        handleClose()
      })
      .catch(error => {
        console.error('Erro ao marcar consulta:', error)
      })
  }

  useEffect(() => {
    api
      .get('/especialidades')
      .then(response => {
        setEspecialidades(response.data)
      })
      .catch(error => {
        console.error('Error fetching especialidades:', error)
      })
  }, [])

  return (
    <Card className='shadow-none w-[480px] bg-white rounded-lg shadow-lg p-4'>
      <CardHeader title={<h3>Nova Consulta</h3>} />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <Controller
            name='especialidade'
            control={control}
            render={({ field }) => (
              <TextField
                select
                label='Especialidade'
                {...field}
                onChange={e => {
                  field.onChange(e)
                  handleEspecialidadeChange(e.target.value)
                }}
              >
                {especialidades.map(option => (
                  <MenuItem key={option.nome} value={option.nome}>
                    {option.nome}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name='medico'
            control={control}
            render={({ field }) => (
              <TextField
                select
                label='Médico'
                {...field}
                onChange={e => {
                  field.onChange(e)
                  handleMedicoChange(e.target.value)
                }}
                disabled={!especialidadeSelecionada}
              >
                {medicos.map(option => (
                  <MenuItem key={option.nome} value={option.nome}>
                    {option.nome}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name='data'
            control={control}
            render={({ field }) => (
              <TextField
                select
                label='Data'
                {...field}
                onChange={e => {
                  field.onChange(e)
                  handleDataChange(e.target.value)
                }}
                disabled={!medicoSelecionado}
              >
                {datas.map(dia => (
                  <MenuItem key={dia} value={dia}>
                    {formatDate(dia)}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name='hora'
            control={control}
            render={({ field }) => (
              <TextField select label='Hora' {...field} onChange={e => field.onChange(e)} disabled={!dataSelecionada}>
                {horarios.map(hora => (
                  <MenuItem key={hora} value={hora}>
                    {hora}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <div className='flex justify-between'>
            <Button variant='outlined' color='primary' onClick={handleClose} className='border-none'>
              Cancelar
            </Button>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              disabled={!horaSelecionada}
              className='text-white'
            >
              Confirmar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default NovaConsulta
