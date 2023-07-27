'use client';
import React, { useEffect } from 'react';
import { checkNewUser } from '../db/user';
import TrendingRecipeCard from '../components/TrendingRecipeCard';

export default function Landing() {
  useEffect(() => {
    (async () => await checkNewUser())();
  }, []);
  return (
    <main className='bg-2 h-screen'>
      <p className='text-4'>Startsida</p>
    </main>
  );
}
