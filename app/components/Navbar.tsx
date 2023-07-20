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
   <h1 data-value='RECIPE JAR' className="bg-black text-white p-4 text-5xl font-mono text-center">RECIPE JAR</h1>
    <nav>
      <ul className='flex flex-row justify-around'>
        <Link href={'/menu'}>
          <li className='font-bold m-4'>Meny</li>
        </Link>
        <Link href={'/recipes'}>
          <li className='font-bold m-4'>Maträtter</li>
        </Link>
        <Link href={'/ingredients'}>
          <li className='font-bold m-4'>Varor</li>
        </Link>
        <Link href={'/shoppingList'}>
          <li className='font-bold m-4'>Inköpslista</li>
        </Link>
        <Link href={'/'}>
          <li className='font-bold m-4'>Butiker</li>
        </Link>
      </ul>
    </nav></>
  );
};

export default Navbar;
