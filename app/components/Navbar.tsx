'use client'
import React, { useEffect } from 'react';
import Link from 'next/link';
import { randomizeLetters } from './UIhelperfunctions';

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
   <h1 data-value='RECIPE JAR' className="bg-black text-white p-4 text-5xl font-mono">RECIPE JAR</h1>
    <nav className=''>
      <ul>
        <Link href={'/menu'}>
          <li>Meny</li>
        </Link>
        <Link href={'/recipes'}>
          <li>Maträtter</li>
        </Link>
        <Link href={'/ingredients'}>
          <li>Varor</li>
        </Link>
        <Link href={'/shoppingList'}>
          <li>Inköpslista</li>
        </Link>
        <Link href={'/'}>
          <li>Butiker</li>
        </Link>
      </ul>
    </nav></>
  );
};

export default Navbar;
