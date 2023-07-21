import React from 'react';

type Props = { callback: () => void };

const DeleteButton = ({ callback }: Props) => {
  return (
    <>
      <button
        className="border-2 rounded-md border-black bg-red-400"
        onClick={() => callback()}
      >
        delete
      </button>
    </>
  );
};

export default DeleteButton;
