type Props = {
  callback: () => void;
};

const EditButton = ({ callback }: Props) => {
  return (
    <button
      className="bg-4 text-1 px-2 rounded-md"
      onClick={e => {
        e.preventDefault();
        callback();
      }}
    >
      Ändra
    </button>
  );
};

export default EditButton;
