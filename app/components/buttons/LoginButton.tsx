'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import UserCard from '../layout/UserCard';

const LoginButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex flex-row font-semibold mr-2">
        <button
          className="text-end text-4 mr-4"
          onClick={async () => await signOut({ callbackUrl: '/' })}
          type="button"
        >
          Logga ut
        </button>
        <UserCard user={session.user} />
      </div>
    );
  } else {
    return (
      <button
        className="text-center text-4 mr-4"
        onClick={() => {
          signIn('google', { callbackUrl: '/menu' });
        }}
        type="button"
      >
        Logga in
      </button>
    );
  }
};

export default LoginButton;
