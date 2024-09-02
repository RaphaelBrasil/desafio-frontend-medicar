'use client'

import { useSession } from 'next-auth/react'
import classnames from 'classnames'

import UserDropdown from '@components/layout/shared/UserDropdown'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'
import Logo from '../shared/Logo'

const NavbarContent = () => {
  function capitalizeFirstLetter(str: string) {
    if (str.length === 0) return str // Retorna a string vazia se o input for vazio

    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const { data: session } = useSession()

  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <Logo width={90} height={25} />{' '}
      <div className='flex items-center'>
        <>{capitalizeFirstLetter(session?.user?.name || '')}</>
        <UserDropdown />
      </div>
    </div>
  )
}

export default NavbarContent
