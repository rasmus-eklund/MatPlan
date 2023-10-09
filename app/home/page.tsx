'use client';
import { useEffect } from 'react';
import { checkNewUser } from '../db/user';
import { useRouter } from 'next/navigation';

export default function Landing() {
  const { push } = useRouter();
  useEffect(() => {
    checkNewUser().then(() => {
      push('/menu');
    });
  }, [push]);

  return (
    <main className="bg-2 grow">
      <p className="text-4 text-6xl">Loading...</p>
    </main>
  );
}
