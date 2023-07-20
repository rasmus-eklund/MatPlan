'use client';
import { getRecipeById } from '@/app/db/prisma';
import { FullRecipe } from '@/types';
import React, { useEffect, useState } from 'react';
import RecipeForm from '../RecipeForm';

const Recipe = ({ params }: { params: { id: string } }) => {
  const [recipe, setRecipe] = useState<FullRecipe | null>(null);
  const [editMode, setEditMode] = useState<Boolean>(false);
  const handleGetRecipe = async (id: string) => {
    const res = await getRecipeById(id, 'Rasmus');
    const data: FullRecipe = JSON.parse(res);
    setRecipe(data);
  };

  useEffect(() => {
    handleGetRecipe(params.id);
  }, []);
  return (
    <>
      {!editMode && (
        <section>
          <h3>{recipe?.name}</h3>
          <p>{recipe?.portions}</p>
          <ul>
            {recipe?.recipe_ingredient.map(i => (
              <li key={i.id}>
                <span>{i.ingredientName}</span>
                <span>{i.quantity}</span>
                <span>{i.unit}</span>
              </li>
            ))}
          </ul>
          <p>{recipe?.instruction}</p>
        </section>
      )}
      {(editMode && recipe) && (<RecipeForm recipe={recipe}/>)}
    <button onClick={()=>{
        setEditMode(true)}}>Edit</button>
    </>
  );
};

export default Recipe;
