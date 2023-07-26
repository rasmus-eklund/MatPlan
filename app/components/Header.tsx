'use client';
import React, { useEffect } from 'react';
import { randomizeLetters } from './UIhelperfunctions';
import Login from './LoginButton';

const Header = () => {
  useEffect(() => {
    const h1Element = document.querySelector('h1');
    if (h1Element) {
      randomizeLetters(h1Element);
    }
  }, []);
  return (
    <header className="bg-1 flex justify-between text-white items-center">
      <h1
        data-value="RECIPE JAR"
        className=" text-5 font-mono text-left p-2 py-4 text-4xl"
      >
        RECIPE JAR
      </h1>
      <div className="justify-items-end">
        <Login />
      </div>
    </header>
  );
};

export default Header;
