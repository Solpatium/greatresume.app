import React, { ReactElement, useCallback } from "react";
import { Label } from "../atoms/fields/label";
import { Button } from "../atoms/button";
import { Bars2Icon as MenuIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useSnapshot } from "valtio";
import {
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { HasId } from "../../utils/lists";

export interface SortableListProps<Type> {
  stateProxy: Type[];
  render: (state: Type, index: number) => ReactElement;
  className?: string;
  onAddNew?: () => void;
  label?: string;
}

interface SortableItemProps<Type> {
  index: number;
  stateProxy: Type;
  render: (state: Type, index: number) => ReactElement;
}

const SortableItem = <Type extends HasId>(props: SortableItemProps<Type>) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.stateProxy.id,
  });

  const style = {
    // We don't want to scale items
    // @ts-ignore
    transform: CSS.Transform.toString({ ...transform, scaleX: 1, scaleY: 1 }),
    transition,
  };

  return (
    <div
      className="flex rounded-md my-2 border border-gray-200 bg-white align-center"
      ref={setNodeRef}
      style={style}
      // TODO CHECK
      aria-live="polite">
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="touch-none	cursor-grab px-2 py-4 flex justify-center items-center">
        <MenuIcon className="h-6 w-6 text-gray-800" />
      </button>
      {props.render(props.stateProxy, props.index)}
    </div>
  );
};

export const SortableList = <Type extends HasId>({
  stateProxy,
  render,
  className,
  onAddNew,
  label,
}: SortableListProps<Type>): ReactElement => {
  const onDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!over || active.id === over.id) {
        return;
      }
      const oldIndex = stateProxy.findIndex(obj => obj.id === active.id);
      const newIndex = stateProxy.findIndex(obj => obj.id === over.id);
      const [el] = stateProxy.splice(oldIndex, 1);
      stateProxy.splice(newIndex, 0, el as Type);
    },
    [stateProxy],
  );

  const elements = useSnapshot(stateProxy);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <div className={className}>
      {label && <Label name={label} />}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        {/*Ids have to be mapped, otherwise it doesn't work properly*/}
        <SortableContext items={stateProxy.map(e => e.id)} strategy={verticalListSortingStrategy}>
          {elements.map((v, i) => (
            <SortableItem key={v.id} index={i} stateProxy={stateProxy[i] as Type} render={render} />
          ))}
        </SortableContext>
      </DndContext>
      {onAddNew && (
        <div className="flex flex-col items-stretch max-w-[200px]">
          <Button secondary icon={PlusIcon} onClick={onAddNew}>
            Add new
          </Button>
        </div>
      )}
    </div>
  );
};
