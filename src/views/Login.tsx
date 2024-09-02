'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import { useRouter, useSearchParams } from 'next/navigation'

// MUI Imports
import { Card, CardContent, Button, InputAdornment, IconButton } from '@mui/material'

// Third-party Imports
import { signIn } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, minLength, string, pipe, nonEmpty } from 'valibot'
import type { SubmitHandler } from 'react-hook-form'
import type { InferInput } from 'valibot'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

type ErrorType = {
  invalid_credentials: string[]
}

type FormData = InferInput<typeof schema>

const schema = object({
  username: pipe(string(), minLength(1, 'Campo obrigatório')),
  password: pipe(string(), nonEmpty('Campo obrigatório'), minLength(5, 'Senha tem que ter pelo menos 5 caracteres'))
})

const Login = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [errorState, setErrorState] = useState<ErrorType | null>(null)

  // Hooks
  const router = useRouter()
  const searchParams = useSearchParams()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      username: 'intmed',
      password: 'challenge'
    }
  })

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const res = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false
    })

    if (res && res.ok && res.error === null) {
      // Vars

      const redirectURL = searchParams.get('redirectTo') ?? '/'

      router.replace(redirectURL)
    } else {
      if (res?.error) {
        const error = JSON.parse(res.error)

        console.log(JSON.stringify(error))
        setErrorState(error)
      }
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Card className='flex flex-col sm:is-[450px] shadow-none bg-transparent'>
        <CardContent className='sm:!p-12'>
          <div className='flex justify-center mbe-6'>
            <Logo width={180} height={50} />
          </div>
          <form
            noValidate
            autoComplete='off'
            action={() => {}}
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-6'
          >
            <Controller
              name='username'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  autoFocus
                  fullWidth
                  placeholder='Email ou Login'
                  onChange={e => {
                    field.onChange(e.target.value)
                    errorState !== null && setErrorState(null)
                  }}
                  {...((errors.username || errorState !== null) && {
                    error: true,
                    helperText:
                      errors?.username?.message ||
                      (errorState?.invalid_credentials
                        ? `${errorState?.invalid_credentials} (Resposta do servidor)`
                        : 'Login ou senha incorretos')
                  })}
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  placeholder='Senha'
                  id='login-password'
                  type={isPasswordShown ? 'text' : 'password'}
                  onChange={e => {
                    field.onChange(e.target.value)
                    errorState !== null && setErrorState(null)
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                          <FontAwesomeIcon icon={isPasswordShown ? faEye : faEyeSlash} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  {...(errors.password && { error: true, helperText: errors.password.message })}
                />
              )}
            />

            <div className='flex flex-row justify-center items-center gap-2'>
              <Button fullWidth variant='outlined' href={'/register'} className='hover:bg-[#D9F1F3] border-none'>
                Criar Conta
              </Button>
              <Button fullWidth variant='contained' type='submit' className='text-white'>
                Acessar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
