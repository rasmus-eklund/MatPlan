'use client'
import React, { useEffect } from 'react';
import Link from 'next/link';
import { randomizeLetters } from './UIhelperfunctions';
import 'tailwindcss/tailwind.css';


type Props = {};

const Navbar = (props: Props) => {

  useEffect(() => {
    const h1Element = document.querySelector("h1");
    if (h1Element) {
      randomizeLetters(h1Element);
    }
  }, []);
  
  return (
    <>
      <h1 data-value='RECIPE JAR' className="bg-black text-white font-mono text-left p-2 py-4 text-4xl">
        RECIPE JAR
      </h1>
      <nav>
        <ul className='flex flex-row m-0 max-w-full'>
          <Link href={'/menu'}>
            <li className='font-bold py-2 underline m-0.5'>Meny</li>
          </Link>
          <Link href={'/recipes'}>
            <li className='font-bold py-2 underline m-0.5'>Maträtter</li>
          </Link>
          <Link href={'/ingredients'}>
            <li className='font-bold py-2 underline m-0.5'>Varor</li>
          </Link>
          <Link href={'/shoppingList'}>
            <li className='font-bold py-2 underline m-0.5'>Inköpslista</li>
          </Link>
          <Link href={'/'}>
            <li className='font-bold py-2 underline m-0.5'>Butiker</li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Navbar