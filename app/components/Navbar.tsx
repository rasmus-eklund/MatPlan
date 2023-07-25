'use client';
import React from 'react';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

const Navbar = () => {
  return (
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
  );
};

export default Navbar;
