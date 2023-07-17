import React from 'react'
import { useUser } from '@auth0/nextjs-auth0/dist/client/use-user'

type Props = {}

export default function page({}: Props) {
  return (
    <div>Hello world <br/> Use recipes, food is good for you <br/>
    <a href="/api/auth/login">Login</a></div>
  )
}