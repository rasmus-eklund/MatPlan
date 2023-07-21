'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import UserCard from './UserCard';

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
    <>
      <div className='flex flex-row font-semibold'>
        <button className='text-end' onClick={() => signOut()} type="button">
          Sign out
        </button>
        <UserCard user={session.user} />
        </div>
        </>
    );
  } else {
    return (
      <>
        <button className='text-center' onClick={() => signIn()} type="button">
          Sign in
        </button>
      </>
    );
  }
}
