'use client';
import React from 'react';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faHouseChimney, faPizzaSlice, faStore, faTrashCan, faUtensils } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <nav className='bg-1'>
      <ul className="flex flex-row m-0 max-w-full justify-center sm:justify-start">
        <li >
       
          <Link href={'/menu'}>
          <FontAwesomeIcon className='mx-8 mt-4 px-8' icon={faHouseChimney} size='2xl' style={{color: '#DDE6ED'}}/>
          <h3 className='mx-8 text-4 px-8 font-bold'>Hem</h3>
          </Link>
        </li>

        <li >
          <Link href={'/recipes'}>
          <FontAwesomeIcon className='mx-8 mt-4 px-8' icon={faUtensils} size='2xl' style={{color: '#DDE6ED'}}/>
          <h3 className='mx-8 text-4 font-bold px-8'>Meny</h3>
          </Link>
        </li>

        <li >
          <Link href={'/ingredients'}>   <FontAwesomeIcon className='mx-8 mt-4 px-8' icon={faPizzaSlice} size='2xl' style={{color: '#DDE6ED'}}/>
          <h3 className='mx-8 text-4 font-bold px-8'>Varor</h3>
          </Link>
        </li>

        <li >
          <Link href={'/shoppingList'}>
          <FontAwesomeIcon className='mx-8 mt-4 px-8' icon={faClipboardList} size='2xl' style={{color: '#DDE6ED'}}/>
          <h3 className='mx-8 text-4 font-bold px-2'>Inköpslista</h3>
          </Link>
        </li>

        <li >
          <Link href={'/stores'}>
          <FontAwesomeIcon className='mx-8 mt-4 px-8' icon={faStore} size='2xl' style={{color: '#DDE6ED'}}/>
          <h3 className='mx-8 text-4 font-bold px-8'>Butik</h3>
          </Link>


        </li>
      </ul>
    </nav>
 
  );
};

export default Navbar;
