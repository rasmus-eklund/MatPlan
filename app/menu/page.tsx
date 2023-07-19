'use client';
import { getMenuItems } from '../api/prismaServer';
import { Recipe, MenuItem } from '@/types';
import React, { useEffect, useState } from 'react';

type Props = {};

const page = (props: Props) => {
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    getMenuItems('Rasmus').then(res => console.log(res));
  }, []);
  return;
};

export default page;
