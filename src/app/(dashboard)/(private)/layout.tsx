// Type Imports
import type { ChildrenType } from '@core/types'

// Layout Imports
import VerticalLayout from '@layouts/VerticalLayout'

// Component Imports
import Providers from '@components/Providers'
import Navbar from '@components/layout/vertical/Navbar'
import AuthGuard from '@/hocs/AuthGuard'

const Layout = async ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return (
    <Providers direction={direction}>
      <AuthGuard>
        <div className='flex justify-center items-start min-h-screen bg-white'>
          <div className='w-[80vw]'>
            <VerticalLayout navbar={<Navbar />}>{children}</VerticalLayout>
          </div>
        </div>
      </AuthGuard>
    </Providers>
  )
}

export default Layout
