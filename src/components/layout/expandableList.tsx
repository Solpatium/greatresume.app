import React, { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../atoms/button";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/20/solid";
import cn from "classnames";
import { HasId } from "../../utils/lists";
import { SortableList } from "./sortableList";
import { subscribe } from "valtio";
import useTranslation from "next-translate/useTranslation";
import { useIsMobile } from "../../utils/hooks";
import { BigModal } from "./bigModal";

export interface ExpandableListProps<Type> {
  stateProxy: Type[];
  renderPreview: (state: Type) => React.ReactNode;
  render: (state: Type) => ReactElement;
  className?: string;
  onAddNew?: () => void;
  label?: string;
}

interface ExpandableItemProps<Type> {
  index: number;
  id: string;
  stateProxy: Type;
  renderPreview: (state: Type) => React.ReactNode;
  render: (state: Type) => ReactElement;
  onDelete: (index: number) => void;
  defaultOpen?: boolean;
  open?: boolean;
  onToggle: (id: string) => void;
}

const ExpandableItem = <Type extends HasId>(props: ExpandableItemProps<Type>) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation("app");
  const close = () => props.onToggle(props.id);
  const preview = props.renderPreview(props.stateProxy);
  const content = (
    <div>
      <fieldset className="grid md:grid-cols-2 gap-4">
        {props.render(props.stateProxy)}
      </fieldset>
      <div className="flex justify-end mt-6 mb-2">
        <Button icon={TrashIcon} onClick={() => props.onDelete(props.index)} danger>
          {t`delete`}
        </Button>
      </div>
    </div>)
  // TODO: accessibility
  return (
    <div className="sortable-list flex-1 items-center p-2">
      <dt>
        <button type="button" onClick={close} className="text-left w-full flex justify-between items-center text-gray-900">
          <span className="min-h-[38px] flex items-center font-medium">
            {preview}
          </span>
          <span className="ml-6 h-7 flex items-center">
            <ChevronDownIcon
              className={cn(props.open ? "-rotate-180" : "rotate-0", "h-6 w-6 transform")}
              aria-hidden="true"
            />
          </span>
        </button>
      </dt>

      {props.open && <dd className="mt-2 mr-1">
        {content}
      </dd>}

      <BigModal title={preview} show={isMobile && props.open} onClose={close}>
        {content}
      </BigModal>
    </div>
  );
};

export const ExpandableList = <Type extends HasId>({
  stateProxy,
  render,
  renderPreview,
  className,
  onAddNew,
  label,
}: ExpandableListProps<Type>): ReactElement => {
  const [open, setOpen] = useState(new Set());
  const onDelete = useCallback(
    (index: number) => {
      stateProxy.splice(index, 1);
    },
    [stateProxy],
  );
  useEffect(() => {
    let idsBefore = new Set(stateProxy.map(e => e.id));
    const handler = () => {
      stateProxy.forEach(entry => {
        if (!idsBefore.has(entry.id)) {
          setOpen(new Set([entry.id]));
        }
      });
      idsBefore = new Set(stateProxy.map(e => e.id));
    };
    return subscribe(stateProxy, handler);
  }, [onAddNew, stateProxy]);

  const onToggle = useCallback((id: string) => setOpen(open => {
    const newOpen = new Set(open);
    if (open.has(id)) {
      newOpen.delete(id);
    } else {
      newOpen.add(id);
    }
    return newOpen;
  }), [setOpen]);

  return (
    <SortableList
      label={label}
      stateProxy={stateProxy}
      onAddNew={onAddNew}
      className={className}
      render={(s, i) => (
        <ExpandableItem
          stateProxy={s}
          onDelete={onDelete}
          render={render}
          renderPreview={renderPreview}
          index={i}
          id={s.id}
          onToggle={onToggle}
          open={open.has(s.id)}
        />
      )}
    />
  );
};
