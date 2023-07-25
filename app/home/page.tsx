'use client'
import React, { useEffect } from 'react'
import { checkNewUser } from '../db/user';

type Props = {}

const Home = (props: Props) => {
  useEffect(() => {
    (async () => await checkNewUser())();
  }, []);
  return (
    <div>page</div>
  )
}

export default Home