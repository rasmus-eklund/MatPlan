'use client';
import { useEffect } from 'react';
import { randomizeLetters } from '../utils/utils';
import LoginButton from './buttons/LoginButton';
import Link from 'next/link';

const Header = () => {
  useEffect(() => {
    const h1Element = document.querySelector('h1');
    if (h1Element) {
      randomizeLetters(h1Element);
    }
  }, []);
  return (
    <header className="bg-1 flex justify-between text-white items-center">
      <Link
        href={'/test'}
        data-value="RECIPE JAR"
        className=" text-5 font-mono text-left p-2 py-4 text-2xl md:text-4xl"
      >
        RECIPE JAR
      </Link>
      <div className="justify-items-end">
        <LoginButton />
      </div>
    </header>
  );
};

export default Header;
