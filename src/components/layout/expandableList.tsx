import React, { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../atoms/button";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import cn from "classnames";
import { HasId } from "../../utils/lists";
import { UncontrolledSortableList } from "./sortableList";
import { proxy, subscribe, useSnapshot } from "valtio";
import useTranslation from "next-translate/useTranslation";
import { useIsMobile } from "../../utils/hooks";
import { BigModal } from "./bigModal";
import { ListItem } from "../atoms/listItem";
import { PencilIcon } from "@heroicons/react/24/outline";

export interface ExpandableListProps<Type> {
  stateProxy: Type[];
  renderPreview: (state: Type) => React.ReactNode;
  render: (state: Type) => ReactElement;
  createName?: (state: Type) => string;
  className?: string;
  onAddNew?: () => void;
  label?: string;
  buttonText?: string;
  itemClassName?: string;
  mobileTitle?: ReactElement;
}

interface ExpandableItemProps<Type> {
  index: number;
  name?: string;
  id: string;
  stateProxy: Type;
  renderPreview: (state: Type) => React.ReactNode;
  render: (state: Type) => ReactElement;
  onDelete: (index: number) => void;
  defaultOpen?: boolean;
  open?: boolean;
  onToggle: (id: string) => void;
  className?: string;
  mobileTitle?: ReactElement
}

export const ExpandableItem = <Type extends HasId>(props: ExpandableItemProps<Type>) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation("app");
  const close = () => props.onToggle(props.id);
  const preview = props.renderPreview(props.stateProxy);
  const content = (
    <div className="flex flex-col justify-between min-h-full">
      <fieldset className="grid md:grid-cols-1 gap-4">
        {props.render(props.stateProxy)}
      </fieldset>
    </div>)
  // TODO: accessibility
  return (
    <div className="w-full flex flex-col items-center justify-between">
      <dt className="w-full">
        <button type="button" onClick={close} className={cn("text-left w-full flex justify-between items-center text-gray-900", props.className)}>
          <span className="min-h-[38px] flex items-center font-medium truncate w-full">
            {preview}
          </span>
          <span className="ml-6 h-7 flex items-center">
            <ChevronDownIcon
              className={cn(props.open ? "-rotate-180" : "rotate-0", "h-6 w-6 transform hidden md:block")}
              aria-hidden="true"
            />
            <PencilIcon className={"h-6 w-6 block md:hidden text-stone-500"}
              aria-hidden="true" />
          </span>
        </button>
      </dt>

      {props.open && !isMobile && <dd className="mt-2 mr-1 w-full">
        {content}
      </dd>}

      <BigModal historyKey={`expandable-item-${props.id}`} title={<>{props.mobileTitle}{preview}</>} show={isMobile && props.open} onClose={close}>
        {content}
      </BigModal>
    </div>
  );
};

export const useOpenTracking = (): { 
  add: (id: string) => void;
  remove: (id: string) => void;
  removeAll: () => void;
  toggle: (id: string) => void;
  stateProxy: Record<string, true>;
} => {
  const [state,] = useState(() => proxy({} as Record<string, true>));
  const isMobile = useIsMobile();

  const result = useMemo(() => {
    const removeAll = () => Object.keys(state).forEach(key => {
      delete state[key];
    });
    const add = (id: string) => {
      if (isMobile) {
        removeAll();
      }
      state[id] = true;
    };
    const remove = (id: string) => {
      delete state[id];
    };
    return {
      removeAll,
      add,
      remove,
      toggle: (id: string) => {
        if (state[id]) {
          remove(id);
        } else {
          add(id);
        }
      },
      stateProxy: state,
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      const [key] = Object.keys(state);
      // Leave only one id open.
      if (key) {
        result.removeAll();
        result.add(key);
      }
    }
  }, [isMobile]);

  return result;
}

export const ExpandableList = <Type extends HasId>({
  stateProxy,
  render,
  renderPreview,
  createName,
  className,
  onAddNew,
  label,
  buttonText,
  itemClassName,
  mobileTitle,
}: ExpandableListProps<Type>): ReactElement => {
  const { t } = useTranslation("app");
  const state = useOpenTracking();
  const onDelete = useCallback(
    (index: number) => {
      state.remove(stateProxy[index]?.id ?? "");
      stateProxy.splice(index, 1);
    },
    [stateProxy],
  );
  useEffect(() => {
    let idsBefore = new Set(stateProxy.map(e => e.id));
    const handler = () => {
      stateProxy.forEach(entry => {
        if (!idsBefore.has(entry.id)) {
          state.add(entry.id);
          idsBefore.add(entry.id);
        }
      });
    };
    return subscribe(stateProxy, handler);
  }, [onAddNew, stateProxy]);

  useSnapshot(stateProxy);

  const openSections = useSnapshot(state.stateProxy);
  return (
    <UncontrolledSortableList
      label={label}
      stateProxy={stateProxy}
      onAddNew={onAddNew}
      className={className}
      buttonText={buttonText}
      itemClassName={itemClassName}
      onDelete={onDelete}
      onSort={state.removeAll}
      render={(s, i) => (
        <ExpandableItem
          stateProxy={s}
          render={render}
          renderPreview={renderPreview}
          name={createName?.(s)}
          index={i}
          id={s.id}
          onToggle={state.toggle}
          open={openSections[s.id]}
          mobileTitle={mobileTitle}
        />
      )}
    />
  );
};
