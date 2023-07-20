import React from 'react';
import Link from 'next/link';
import { randomizeLetters } from './UIhelperfunctions';

type Props = {};

const Navbar = (props: Props) => {
  
  return (
    <>
   <h1>Recipe JAR</h1>
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
