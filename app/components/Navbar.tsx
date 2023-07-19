import React from 'react';
import Link from 'next/link';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav>
      <ul>
        <Link href={'/menu'}>
          <li>Meny</li>
        </Link>
        <Link href={'/recipes'}>
          <li>Maträtter</li>
        </Link>
        <Link href={'/'}>
          <li>Varor</li>
        </Link>
        <Link href={'/'}>
          <li>Inköpslista</li>
        </Link>
        <Link href={'/'}>
          <li>Butiker</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
