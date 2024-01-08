import React, { Fragment, ReactElement, useCallback, useEffect, useState } from "react";
import { Label } from "../atoms/fields/label";
import { Button } from "../atoms/button";
import { ArrowDownCircleIcon, Bars2Icon as MenuIcon } from "@heroicons/react/20/solid";
import { ArrowsUpDownIcon, CheckIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
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

interface SortableListProps<Type> {
  stateProxy: Type[];
  render: (state: Type, index: number) => ReactElement;
  divider?: ReactElement;
  itemClassName?: string;
  onDelete?: (index: number) => void;
}

interface UncontrolledSortableListProps<Type> extends SortableListProps<Type> {
  onAddNew?: () => void;
  onSort?: () => void;
  buttonText?: string;
}

export interface ControlledSortableListProps<Type> extends SortableListProps<Type> {
  sortingEnabled?: boolean;
}

interface SortableItemProps<Type> {
  sortable?: boolean;
  index: number;
  stateProxy: Type;
  className?: string;
  onDelete?: (index: number) => void;
  render: (state: Type, index: number) => ReactElement;
  canReorder?: boolean;
}

export const SortingToggle: React.FC<{ enabled: boolean, toggle: () => void }> = ({ enabled, toggle }) => {
  const icon = enabled ? CheckIcon : ArrowsUpDownIcon;
  const text = enabled ? "Finish" : "Edit list"
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
      className={props.className}
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
          className="absolute inset-0 flex justify-end items-center rounded-xl transition-opacity z-10"
          style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,1) 80%)" }}
        >
          {props.onDelete &&
              // <Button icon={TrashIcon} onClick={() => props.onDelete?.(props.index)} danger>
              //   {`Delete`}
              // </Button>
            <button
              onClick={() => props.onDelete?.(props.index)}
              type="button"
              aria-label={`delete`}//bg-pink-600 hover:bg-pink-700 focus:ring-pink-500
              className="inline-flex items-center rounded-full border p-2  text-pink-600"
            >
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          }
          <button
            type="button"
            {...attributes}
            {...listeners}
            disabled={!props.canReorder}
            className={cn("p-4 touch-none", props.canReorder ? "cursor-grab" : "opacity-50 pointer-events-none")}>
            <MenuIcon className="h-6 w-6 text-gray-800" />
          </button>
        </div>
      </Transition>
      {props.render(props.stateProxy, props.index)}
    </ListItem>
  );
};

export const UncontrolledSortableList = <Type extends HasId>({
  onAddNew, buttonText, onSort,
  ...props
}: UncontrolledSortableListProps<Type>): ReactElement => {
  const { t } = useTranslation("app");

  const [sortable, toggle] = useToggle(false);
  const elements = useSnapshot(props.stateProxy);
    
  useEffect(() => {
    if (elements.length == 0) {
      toggle(false);
    }
  }, [elements.length]);

  useEffect(() => {
      if (sortable) {
        onSort?.();
      }
  }, [sortable]);

  return (
      <>
      {elements.length > 0 && 
      <div className="flex justify-end"><SortingToggle enabled={sortable} toggle={toggle} /></div>}
      <ControlledSortableList sortingEnabled={sortable} {...props} />
      {onAddNew && (
        <div className="flex flex-row justify-between">
          <Button icon={PlusIcon} onClick={onAddNew} disabled={sortable}>
            <span className="text-base font-bold">{buttonText ?? t("addNewEntry")}</span>
          </Button>
        </div>
      )}
      </>
  );
};


export const ControlledSortableList = <Type extends HasId>({
  stateProxy,
  render,
  sortingEnabled,
  divider,
  itemClassName: itemClassname,
  onDelete,
}: ControlledSortableListProps<Type>): ReactElement => {
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
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      {/*Ids have to be mapped, otherwise it doesn't work properly*/}
      <SortableContext items={stateProxy.map(e => e.id)} strategy={verticalListSortingStrategy}>
        {elements.map((v, i) => (
          <>
            {divider && i !== 0 ? divider : null}
            <SortableItem key={v.id} index={i} sortable={sortingEnabled} stateProxy={stateProxy[i] as Type} className={itemClassname} render={render} onDelete={onDelete} canReorder={stateProxy.length > 1} />
          </>
        ))}
      </SortableContext>
    </DndContext>
  );
};