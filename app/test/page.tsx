'use client';
import { useState } from 'react';

const Page = () => {
  const [s, setS] = useState('');
  return (
    <div className="grow bg-2">
      <input type="text" value={s} onChange={e => setS(e.target.value)} />
    </div>
  );
};

export default Page;
