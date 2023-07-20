'use client';
import { getRecipeById } from '@/app/db/prisma';
import { FullRecipe } from '@/types';
import React, { useEffect, useState } from 'react';

type Props = {};



const Recipe = ({ params }: { params: { id: string } }) => {
    const [recipe, setRecipe]=useState<FullRecipe | null>(null)
    const handleGetRecipe = async(id:string)=>{
        const res = await getRecipeById(id, "Rasmus");
        const data: FullRecipe = JSON.parse(res)
        setRecipe(data)
    }

    useEffect(()=>{
        handleGetRecipe(params.id)
    },[])
  return <div>{recipe?.name}</div>;
};

export default Recipe;
