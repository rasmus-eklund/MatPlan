'use client';

import { useEffect, useState } from 'react';
import { Recipe } from '@/types';

const page = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/recipes')
      .then(res => res.json())
      .then((data: Recipe[]) => setRecipes(data));
  }, []);
  return (
    <>
      {recipes.map(r => (
        <p>{r.name}</p>
      ))}
    </>
  );
};

export default page;
