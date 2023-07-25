import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

type Props = {
  name: string;
  href: string;
  icon: IconDefinition;
};

const NavbarLink = ({ name, href, icon }: Props) => {
  return (
    <li>
      <Link className="flex flex-col justify-center" href={href}>
        <FontAwesomeIcon
          icon={icon}
          size="2xl"
          style={{ color: '#DDE6ED' }}
        />
        <h3 className="text-4 font-bold">{name}</h3>
      </Link>
    </li>
  );
};

export default NavbarLink;
