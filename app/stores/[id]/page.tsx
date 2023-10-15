"use client";
import { useEffect, useRef, useState } from "react";
import {
  getStoreById,
  renameStore,
  updateStore,
} from "@/app/server-side/stores";
import CategoryItemComponent from "../../components/stores/CategoryItem";
import { StoreCategory } from "@/types";
import { groupSubcategoryByCategory } from "@/app/utils/utils";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Button from "@/app/components/buttons/Button";

type Props = { params: { id: string } };
const StoreComponent = ({ params: { id } }: Props) => {
  const [categoryItems, setCategoryItems] = useState<CategoryItemComponent[]>(
    [],
  );
  const [editName, setEditName] = useState(false);
  const [orderEdited, setOrderEdited] = useState(false);
  const [name, setName] = useState("");
  const touchSensor = useSensor(TouchSensor);
  const mouseSensor = useSensor(MouseSensor);
  const sensors = useSensors(mouseSensor, touchSensor);
  let originalOrder = useRef<CategoryItemComponent[]>();

  useEffect(() => {
    getStoreById(id).then((s) => {
      setName(s.name);
      const order = groupSubcategoryByCategory(s).map((i) => ({
        ...i,
        id: i.id + 1,
        subcategories: i.subcategories.map((item) => ({
          ...item,
          id: item.id + 1,
        })),
      }));
      setCategoryItems(order);
      originalOrder.current = order;
    });
  }, [id]);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setCategoryItems((items) => {
        setOrderEdited(true);
        return arrayMove(
          items,
          items.findIndex((item) => item.id === active.id),
          items.findIndex((item) => item.id === over.id),
        );
      });
    }
  };

  const handleRenameStore = () => {
    renameStore(id, name).then(() => setEditName(false));
  };

  const handleSaveOrder = () => {
    const data: StoreCategory[] = categoryItems.flatMap((i) =>
      i.subcategories.map((s) => ({
        categoryId: i.id - 1,
        subcategoryId: s.id - 1,
      })),
    );
    updateStore(id, data).then(() => setOrderEdited(false));
  };

  return (
    <div className="bg-c3 rounded-md p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        {!editName && (
          <h2 className="text-c5 text-xl font-bold">{name || "loading"}</h2>
        )}
        {editName && (
          <input
            className="bg-c2 rounded-md text-xl font-bold min-w-0"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        )}
        <div className="flex gap-2">
          {editName ? (
            <>
              <Button name="Spara" callback={handleRenameStore} />
              <Button name="Avbryt" callback={() => setEditName(false)} />
            </>
          ) : (
            <Button name="Ändra" callback={() => setEditName(true)} />
          )}
        </div>
      </div>
      {categoryItems && (
        <ul className="flex flex-col gap-2 bg-c3 rounded-md">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            sensors={sensors}
          >
            <SortableContext
              items={categoryItems}
              strategy={verticalListSortingStrategy}
            >
              {categoryItems.map((item) => (
                <CategoryItemComponent
                  key={item.id}
                  category={item}
                  setCategoryItems={setCategoryItems}
                  setOrderEdited={setOrderEdited}
                />
              ))}
            </SortableContext>
          </DndContext>
        </ul>
      )}
      {orderEdited && (
        <div className="flex items-center gap-4 justify-end absolute bottom-8 left-0 w-full px-10">
          <Button name="Spara" callback={handleSaveOrder} />
          <Button
            name="Avbryt"
            callback={() => {
              setOrderEdited(false);
              setCategoryItems(originalOrder.current!);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default StoreComponent;
