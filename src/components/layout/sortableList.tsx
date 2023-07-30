import React, { Fragment, ReactElement, useCallback, useState } from "react";
import { Label } from "../atoms/fields/label";
import { Button } from "../atoms/button";
import { ArrowDownCircleIcon, Bars2Icon as MenuIcon } from "@heroicons/react/20/solid";
import { ArrowsUpDownIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
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
import useTranslation from "next-translate/useTranslation";
import { ListItem } from "../atoms/listItem";
import cn from "classnames";
import { Transition } from "@headlessui/react";
import { useToggle } from "react-use";

export interface SortableListProps<Type> {
  stateProxy: Type[];
  render: (state: Type, index: number) => ReactElement;
  className?: string;
  onAddNew?: () => void;
  label?: string;
  buttonText?: string;
}

interface SortableItemProps<Type> {
  sortable?: boolean;
  index: number;
  stateProxy: Type;
  render: (state: Type, index: number) => ReactElement;
}

const SortingToggle: React.FC<{ enabled: boolean, toggle: () => void }> = ({ enabled, toggle }) => {
  const icon = enabled ? PencilIcon : ArrowsUpDownIcon;
  const text = enabled ? "Edit" : "Reorder"
  return (
    <Button role="switch" aria-checked={enabled} secondary onClick={toggle} icon={icon}>
      <span className="text-base font-bold">{text}</span>
    </Button>
  )
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
    <ListItem
      ref={setNodeRef}
      style={style}
      // TODO CHECK
      aria-live="polite">
      <Transition
        show={props.sortable ?? true}
        as={Fragment}
        enter="ease-out duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="absolute inset-0 flex justify-end rounded-xl transition-opacity bg-red-800"
          style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,1) 80%)" }}
        >
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="touch-none	cursor-grab p-4">
            <MenuIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>
      </Transition>
      {props.render(props.stateProxy, props.index)}
    </ListItem>
  );
};

export const SortableList = <Type extends HasId>({
  stateProxy,
  render,
  className,
  onAddNew,
  label,
  buttonText,
}: SortableListProps<Type>): ReactElement => {
  const { t } = useTranslation("app");
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

  const [sortable, toggle] = useToggle(false);
  return (
    <div className={className}>
      {label && <Label name={label} />}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        {/*Ids have to be mapped, otherwise it doesn't work properly*/}
        <SortableContext items={stateProxy.map(e => e.id)} strategy={verticalListSortingStrategy}>
          {elements.map((v, i) => (
            <SortableItem key={v.id} index={i} sortable={sortable} stateProxy={stateProxy[i] as Type} render={render} />
          ))}
        </SortableContext>
      </DndContext>
      {onAddNew && (
        <div className="flex flex-row justify-between">
          <Button icon={PlusIcon} onClick={onAddNew} disabled={sortable}>
            <span className="text-base font-bold">{buttonText ?? t("addNewEntry")}</span>
          </Button>
          {elements.length > 1 && <SortingToggle enabled={sortable} toggle={toggle} />}
        </div>
      )}
    </div>
  );
};
