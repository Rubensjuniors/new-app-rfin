import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/server/libs/auth'

import { DashboardClient } from './dashboard-client'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo, {session?.user?.name || session?.user?.email}!</h1>

      <div className="bg-white rounded-lg shadow p-6 text-black">
        <h2 className="text-lg font-semibold mb-2">Seus dados:</h2>
        <pre className="bg-gray-10 p-4 rounded">{JSON.stringify(session, null, 2)}</pre>
      </div>

      <DashboardClient />
    </main>
  )
}
