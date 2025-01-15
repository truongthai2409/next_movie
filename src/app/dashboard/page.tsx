import Link from 'next/link'
import React from 'react'

const Homepage = () => {
  return (
    <div>
      <Link href='/dashboard/home'>hi</Link><br></br>
      <Link href='/'>go to home</Link>
    </div>
  )
}

export default Homepage
