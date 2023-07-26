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
      <h1 className='text-2xl text-4 mx-4'>Trendande recept</h1>
      <div className='mx-4'>
     <TrendingRecipeCard src='https://images.unsplash.com/photo-1573405618423-1e1a86fbe807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' name={'Pancakes'}/>
     <TrendingRecipeCard src={'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'} name={'Seafood Pasta'}/>
     <TrendingRecipeCard src={'https://images.unsplash.com/photo-1598866594230-a7c12756260f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1008&q=80'} name={'Bolognese'}/>
     </div>
    </main>
  );
}
