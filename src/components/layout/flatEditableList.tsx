import React, { ReactElement, useCallback, useEffect, useRef } from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { HasId } from "../../utils/lists";
import { SortableList } from "./sortableList";
import { subscribe } from "valtio";
import useTranslation from "next-translate/useTranslation";

export interface FlatEditableListProps<Type> {
    stateProxy: Type[];
    render: (state: Type) => ReactElement;
    className?: string;
    onAddNew?: () => void;
    label?: string;
    deletionConfirmation?: string;
}

interface FlatEditableItemProps<Type> {
    index: number;
    stateProxy: Type;
    render: (state: Type) => ReactElement;
    onDelete: (index: number) => void;
    defaultOpen?: boolean;
}

const FlatEditableItem = <Type extends HasId>(props: FlatEditableItemProps<Type>) => {
    const { t } = useTranslation("app");
    return (
        <>
            {props.render(props.stateProxy)}
            <div className="ml-auto px-2 flex items-center">
                <button
                    onClick={() => props.onDelete(props.index)}
                    type="button"
                    aria-label={t`delete`}
                    className="inline-flex items-center rounded-full border p-2 bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 text-white"
                >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
        </>
    );
};

export const FastEditableList = <Type extends HasId>({
    stateProxy,
    render,
    className,
    onAddNew,
    label,
    deletionConfirmation,
}: FlatEditableListProps<Type>): ReactElement => {
    // Variable needed to set defaultOpen for new entries
    const recentlyAddedId = useRef<string | undefined>();
    const onDelete = useCallback(
        (index: number) => {
            if (!deletionConfirmation || confirm(deletionConfirmation)) {
                stateProxy.splice(index, 1);
            }
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
                <FlatEditableItem
                    stateProxy={s}
                    onDelete={onDelete}
                    render={render}
                    index={i}
                    defaultOpen={recentlyAddedId.current === s.id}
                />
            )}
        />
    );
};
