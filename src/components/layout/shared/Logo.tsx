'use client'

import Image from 'next/image'

interface LogoProps {
  width: number
  height: number
}

const Logo = ({ width, height }: LogoProps) => {
  return (
    <div className='flex items-center'>
      <Image src='/medicar.png' width={width} height={height} alt='Medicar logo' priority={false} />
    </div>
  )
}

export default Logo
