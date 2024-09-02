// next-auth.d.ts
import type { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: string
  }

  interface User extends DefaultUser {
    accessToken: string
  }

  interface JWT {
    accessToken: string
  }
}
