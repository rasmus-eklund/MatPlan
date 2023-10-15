import { CategoryItem as CategoryItemComponent } from "@/types";
import { FC, useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DraggableIcon from "../icons/DraggableIcon";
import { capitalize } from "../../utils/utils";
import MinimizeIcon from "../icons/MinimizeIcon";
import MaximizeIcon from "../icons/MaximizeIcon";

type CategoryProps = {
  category: CategoryItemComponent;
};

const CategoryItemComponent: FC<CategoryProps> = ({
  category: { id, name, subcategories },
}) => {
  const [open, setOpen] = useState(false);
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id });

  useEffect(() => {
    setOpen(false);
  }, [isDragging]);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex flex-col gap-2 rounded-md bg-c4 px-2 py-1"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div ref={setActivatorNodeRef} {...attributes} {...listeners}>
            <DraggableIcon className="w-8 fill-c3" />
          </div>
          <h3 className="text-xl font-bold text-c2 select-none">
            {capitalize(name)}
          </h3>
        </div>
        <div onClick={() => setOpen(!open)}>
          {open ? (
            <MinimizeIcon className="h-8 fill-c2 hover:scale-110" />
          ) : (
            <MaximizeIcon className="h-8 fill-c2 hover:scale-110" />
          )}
        </div>
      </div>
      {open && (
        <ul className="flex flex-col gap-1">
          {subcategories.map(({ name, id }) => (
            <li
              key={name + id}
              className="flex justify-between rounded-md font-semibold bg-c3 px-2 py-1"
            >
              <p className="text-c5 select-none">{capitalize(name)}</p>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default CategoryItemComponent;
