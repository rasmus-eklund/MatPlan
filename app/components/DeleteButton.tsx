import React from 'react';

type Props = { callback: () => void };

const DeleteButton = ({ callback }: Props) => {
  return (
    <>
      <button
        className="border-2 p-1.5 px-4 rounded-md border-black m-4 bg-red-400"
        onClick={() => callback()}
      >
        delete
      </button>
    </>
  );
};

export default DeleteButton;
