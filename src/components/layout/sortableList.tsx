import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import React, { ReactElement, useCallback } from "react";
import arrayMove from "array-move";
import { StateSetter } from "../../utils/mutators";
import { Label } from "../atoms/fields/label";
import { Button } from "../atoms/button";
import { Disclosure } from "@headlessui/react";
import {
  ChevronDownIcon,
  MenuAlt4Icon as MenuIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import cn from "classnames";

const DragHandle = SortableHandle(() => (
  <div className="cursor-move px-2 py-4 flex justify-center items-center">
    <MenuIcon className="h-6 w-6 text-gray-800" />
  </div>
));

const SortableItem = SortableElement(props => (
  <div {...props} className="flex rounded-md my-2 border border-gray-200 " />
));
const SortableWrapper = SortableContainer(props => <div {...props} />);

export interface SortableListProps<Type> {
  state: Type[];
  setState: StateSetter<Type[]>;
  renderPreview: (state: Type, index: number) => ReactElement | string;
  render: (state: Type, index: number) => ReactElement;
  className?: string;
  onAddNew?: () => void;
  label?: string;
}

export const SortableList = <Type extends { key: string | number }>({
  state,
  setState,
  render,
  renderPreview,
  className,
  onAddNew,
  label,
}: SortableListProps<Type>): ReactElement => {
  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      if (oldIndex !== newIndex) {
        setState(entries => arrayMove(entries, oldIndex, newIndex));
      }
    },
    [setState],
  );

  const onDelete = useCallback(
    (index: number) => {
      setState(entries => {
        const copy = [...entries];
        copy.splice(index, 1);
        return copy;
      });
    },
    [setState],
  );

  return (
    <SortableWrapper className={className} useDragHandle onSortEnd={onSortEnd}>
      {label && <Label name={label} />}
      {state.map((v, i) => (
        <SortableItem key={v.key} index={i}>
          <DragHandle />
          <Disclosure defaultOpen as="div" className="sortable-list flex-1 items-center p-2">
            {({ open }) => (
              <>
                <dt>
                  <Disclosure.Button className="text-left w-full flex justify-between items-center text-gray-900">
                    <span className="h-10 flex items-center font-medium">
                      {renderPreview(v, i)}
                    </span>
                    <span className="ml-6 h-7 flex items-center">
                      <ChevronDownIcon
                        className={cn(open ? "-rotate-180" : "rotate-0", "h-6 w-6 transform")}
                        aria-hidden="true"
                      />
                    </span>
                  </Disclosure.Button>
                </dt>

                <Disclosure.Panel as="dd" className="mt-2 mr-1">
                  <fieldset className="grid md:grid-cols-2 gap-4">{render(v, i)}</fieldset>
                  <div className="flex justify-end mt-6 mb-2">
                    <Button icon={TrashIcon} onClick={() => onDelete(i)} danger>
                      Delete entry
                    </Button>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </SortableItem>
      ))}
      {onAddNew && (
        <div className="grid grid-cols-1">
          <Button secondary icon={PlusIcon} onClick={onAddNew}>
            Add new
          </Button>
        </div>
      )}
    </SortableWrapper>
  );
};
