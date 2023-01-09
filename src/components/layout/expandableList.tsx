import React, { ReactElement, useCallback, useEffect, useRef } from "react";
import { Button } from "../atoms/button";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/20/solid";
import cn from "classnames";
import { HasId } from "../../utils/lists";
import { SortableList } from "./sortableList";
import { subscribe } from "valtio";
import useTranslation from "next-translate/useTranslation";

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
  stateProxy: Type;
  renderPreview: (state: Type) => React.ReactNode;
  render: (state: Type) => ReactElement;
  onDelete: (index: number) => void;
  defaultOpen?: boolean;
}

const ExpandableItem = <Type extends HasId>(props: ExpandableItemProps<Type>) => {
  const { t } = useTranslation("app");
  return (
    <Disclosure
      defaultOpen={props.defaultOpen}
      as="div"
      className="sortable-list flex-1 items-center p-2">
      {({ open }) => (
        <>
          <dt>
            <Disclosure.Button className="text-left w-full flex justify-between items-center text-gray-900">
              <span className="min-h-[38px] flex items-center font-medium">
                {props.renderPreview(props.stateProxy)}
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
            <fieldset className="grid md:grid-cols-2 gap-4">
              {props.render(props.stateProxy)}
            </fieldset>
            <div className="flex justify-end mt-6 mb-2">
              <Button icon={TrashIcon} onClick={() => props.onDelete(props.index)} danger>
                {t`delete`}
              </Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
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
  // Variable needed to set defaultOpen for new entries
  const recentlyAddedId = useRef<string | undefined>();
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
          recentlyAddedId.current = entry.id;
        }
      });
      idsBefore = new Set(stateProxy.map(e => e.id));
    };
    handler();
    return subscribe(stateProxy, handler);
  }, [onAddNew, stateProxy]);

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
          defaultOpen={recentlyAddedId.current === s.id}
        />
      )}
    />
  );
};
