"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

const BlogPage = () => {
  return (
    <>
      <h1>BlogPage</h1>
      <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
    >
      Logout
    </button>

    </>
  )
}

export default BlogPage
