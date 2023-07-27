import React from 'react';

type Props = {
  callback: () => void;
};

const SaveButton = ({ callback }: Props) => {
  return (
    <button
      className="bg-4 text-2 px-2 rounded-md"
      onClick={e => {
        e.preventDefault();
        callback();
      }}
    >
      Spara
    </button>
  );
};

export default SaveButton;
