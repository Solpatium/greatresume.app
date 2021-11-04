import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import React, { ReactElement, useCallback } from "react";
import arrayMove from "array-move";
import { StateSetter } from "../../utils/mutators";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Collapse } from "antd";
import { Label } from "../atoms/fields/label";

const DragHandle = SortableHandle(() => (
  <div className="text-white rounded-tl-xl rounded-bl-xl cursor-move px-4 py-6 flex justify-center items-center px-5 bg-blue-400 justify-self-stretch">
    <MenuOutlined className="text-white" />
  </div>
));

const SortableItem = SortableElement(props => (
  <div {...props} className="flex rounded-xl my-2 bg-white border-solid border-2 border-gray-100" />
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
}: SortableListProps<Type>) => {
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
          <Collapse className="w-full flex" ghost expandIconPosition="right">
            <Collapse.Panel
              className="sortable-list h-100 flex-1"
              header={
                <div className="h-10 flex items-center font-medium">{renderPreview(v, i)}</div>
              }
              key={0}>
              <fieldset className="grid md:grid-cols-2 gap-4">{render(v, i)}</fieldset>
              <div className="flex justify-end mt-6 mb-2">
                <Button onClick={() => onDelete(i)} danger>
                  Delete entry
                </Button>
              </div>
            </Collapse.Panel>
          </Collapse>
        </SortableItem>
      ))}
      {onAddNew && (
        <button
          onClick={onAddNew}
          type="button"
          className="font-semibold flex items-center justify-center h-16 w-full rounded-xl mt-2 bg-gray-100">
          + Add new
        </button>
      )}
    </SortableWrapper>
  );
};
