import React from 'react';
import Login from './components/login';

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <h3>Login</h3>
      <Login />
    </>
  );
}
