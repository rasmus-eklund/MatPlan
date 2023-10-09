import { FC } from 'react';

type DraggableIconProps = {
  className: string;
};

const DraggableIcon: FC<DraggableIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M21 11H3V9H21V11M21 13H3V15H21V13Z" />
    </svg>
  );
};

export default DraggableIcon;
