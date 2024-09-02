import React from 'react'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'

import api from '@/libs/api'
import formatDate from './formatDate'

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

interface TabelaConsultaProps {
  consultas: Consulta[]
  fetchData: () => void
}

const TabelaConsulta: React.FC<TabelaConsultaProps> = ({ consultas, fetchData }) => {
  function handleDelete(consultaId: number) {
    api
      .delete(`/consultas/${consultaId}`)
      .then(() => {
        fetchData()
      })
      .catch(error => {
        console.error('Error deleting consulta:', error)
      })
  }

  return (
    <TableContainer component={Paper} className='shadow-none'>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <h3 className='text-[#A8A8A8]'>Especialidade</h3>
            </TableCell>
            <TableCell>
              <h3 className='text-[#A8A8A8]'>Profissional</h3>
            </TableCell>
            <TableCell>
              <h3 className='text-[#A8A8A8]'>Data</h3>
            </TableCell>
            <TableCell>
              <h3 className='text-[#A8A8A8]'>Hora</h3>
            </TableCell>
            <TableCell>
              <h3 className='text-[#A8A8A8]' />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {consultas.map((consulta, index) => (
            <TableRow key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F8F8F8]'}`}>
              <TableCell>{consulta.medico.especialidade.nome}</TableCell>
              <TableCell>{consulta.medico.nome}</TableCell>
              <TableCell>{formatDate(consulta.dia)}</TableCell>
              <TableCell>{consulta.horario}</TableCell>
              <TableCell>
                <Button
                  color='primary'
                  onClick={() => handleDelete(consulta.id)}
                  startIcon={<i className='tabler-x' />}
                >
                  Desmarcar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TabelaConsulta
