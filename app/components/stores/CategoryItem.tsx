import { CategoryItem, CategoryItem as CategoryItemComponent } from "@/types";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DraggableIcon from "../icons/DraggableIcon";
import { capitalize } from "../../utils/utils";
import UpIcon from "../icons/UpIcon";
import DownIcon from "../icons/DownIcon";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

type CategoryItemComponentProps = {
  category: CategoryItemComponent;
  setCategoryItems: Dispatch<SetStateAction<CategoryItem[]>>;
  setOrderEdited: (value: boolean) => void;
};

const CategoryItemComponent: FC<CategoryItemComponentProps> = ({
  category: { id, name, subcategories },
  setCategoryItems,
  setOrderEdited,
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

  const touchSensor = useSensor(TouchSensor);
  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(mouseSensor, touchSensor);
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setCategoryItems((items) => {
        const subArrayIndex = items.findIndex((item) => item.id === id);
        const newSubcategories = arrayMove(
          subcategories,
          subcategories.findIndex((item) => item.id === active.id),
          subcategories.findIndex((item) => item.id === over.id),
        );
        const newItems = [...items];
        newItems[subArrayIndex].subcategories = newSubcategories;
        setOrderEdited(true);
        return newItems;
      });
    }
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
            <UpIcon className="h-8 fill-c2 hover:scale-110" />
          ) : (
            <DownIcon className="h-8 fill-c2 hover:scale-110" />
          )}
        </div>
      </div>
      {open && (
        <ul className="flex flex-col gap-1">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            sensors={sensors}
          >
            <SortableContext
              items={subcategories}
              strategy={verticalListSortingStrategy}
            >
              {subcategories.map((subcat) => (
                <SubcategoryItem subcat={subcat} key={subcat.id} />
              ))}
            </SortableContext>
          </DndContext>
        </ul>
      )}
    </li>
  );
};

type SubcategoryItemProps = { subcat: { name: string; id: number } };
const SubcategoryItem: FC<SubcategoryItemProps> = ({
  subcat: { id, name },
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex rounded-md items-center font-semibold bg-c3 px-2 py-1 gap-2"
    >
      <div ref={setActivatorNodeRef} {...attributes} {...listeners}>
        <DraggableIcon className="w-8 fill-c5" />
      </div>
      <p className="text-c5 select-none">{capitalize(name)}</p>
    </li>
  );
};

export default CategoryItemComponent;
