import React from 'react'
import authOptions from '../../../../auth.config'
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

const DashBoardPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin");
  }
  return (
    <div>
      admin page
    </div>
  )
}

export default DashBoardPage
