'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import LoginHome from './components/LoginHome';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Landing() {
  const { data: session } = useSession();
  const { push } = useRouter();
  useEffect(() => {
    if (session) {
      push('/home');
    }
  }, [session, push]);

  return (
    <main className="w-full grow flex justify-center flex-col gap-3 items-center text-1">
      <h1 className="font-bold text-6xl bg-3 p-2 w-fit rounded-3xl mx-8 bg-opacity-60">
        Välkommen till Recipe JAR
      </h1>
      <h3 className="text-4xl mb-2 w-100 text-center text-1 bg-3 p-2 w-2/3 rounded-3xl m-8 bg-opacity-60 font-bold">
        Planera måltider, förenkla inköpslistor och förenkla din matupplevelse.
      </h3>
      <LoginHome />

      <Image
        src="/bgimage.png"
        alt="background image"
        layout="fill"
        objectFit="cover"
        objectPosition="center center"
        style={{ pointerEvents: 'none', opacity: 0.6, zIndex: -1 }}
      />
    </main>
  );
}
