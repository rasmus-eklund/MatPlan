'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { randomizeLetters } from './UIhelperfunctions';
import 'tailwindcss/tailwind.css';
import Login from './LoginButton';

const Navbar = () => {
  useEffect(() => {
    const h1Element = document.querySelector('h1');
    if (h1Element) {
      randomizeLetters(h1Element);
    }
  }, []);

  return (
    <>
   
      <header className='bg-1 flex justify-between flex-row text-white items-center'>
        
        <h1
          data-value="RECIPE JAR"
          className="bg-1  text-4 font-mono text-left p-2 py-4 text-4xl"
        >
          RECIPE JAR
        </h1>
        <div className='justify-items-end'>
        <Login />
        </div>
    
      
      </header>
      <nav>
        <ul className="flex flex-row m-0 max-w-full justify-center sm:justify-start">
          <li className="font-bold py-2 underline m-0.5">
            <Link href={'/menu'}>Meny</Link>
          </li>

          <li className="font-bold py-2 underline m-0.5">
            <Link href={'/recipes'}>Maträtter</Link>
          </li>

          <li className="font-bold py-2 underline m-0.5">
            <Link href={'/ingredients'}>Varor</Link>
          </li>

          <li className="font-bold py-2 underline m-0.5">
            <Link href={'/shoppingList'}>Inköpslista</Link>
          </li>

          <li className="font-bold py-2 underline m-0.5">
            <Link href={'/stores'}>Butiker</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
