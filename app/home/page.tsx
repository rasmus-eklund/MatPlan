'use client';
import React, { useEffect } from 'react';
import { checkNewUser } from '../db/user';

export default function Landing() {
  useEffect(() => {
    (async () => await checkNewUser())();
  }, []);
  return (
    <main>
      <h1>Home Page</h1>
    </main>
  );
}
