'use client';
import React from 'react';
import 'tailwindcss/tailwind.css';
import {
  IconDefinition,
  faClipboardList,
  faHouseChimney,
  faPizzaSlice,
  faStore,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import NavbarLink from './NavbarLink';

const Navbar = () => {
  const items: { name: string; href: string; icon: IconDefinition }[] = [
    { name: 'Meny', href: '/menu', icon: faHouseChimney },
    { name: 'Maträtter', href: '/recipes', icon: faUtensils },
    { name: 'Varor', href: '/ingredients', icon: faPizzaSlice },
    { name: 'Inköpslista', href: '/shoppingList', icon: faClipboardList },
    { name: 'Butik', href: '/stores', icon: faStore },
  ];
  return (
    <nav className="bg-1">
      <ul className="flex justify-between px-4 py-4">
        {items.map(({ name, href, icon }) => (
          <NavbarLink name={name} href={href} icon={icon} key={href} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
