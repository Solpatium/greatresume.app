import React, { ReactElement, useCallback, useEffect, useRef } from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { HasId } from "../../utils/lists";
import { UncontrolledSortableList } from "./sortableList";
import { subscribe } from "valtio";
import useTranslation from "next-translate/useTranslation";
import { DeleteButton } from "../atoms/button";

export interface FlatEditableListProps<Type> {
    stateProxy: Type[];
    render: (state: Type) => ReactElement;
    className?: string;
    onAddNew?: () => void;
    label?: string;
    deletionConfirmation?: string;
    buttonText?: string;
}

interface FlatEditableItemProps<Type> {
    index: number;
    stateProxy: Type;
    render: (state: Type) => ReactElement;
    onDelete: (index: number) => void;
}

const FlatEditableItem = React.memo(<Type extends HasId>(props: FlatEditableItemProps<Type>) => {
    const { t } = useTranslation("app");
    return (
        <>
            {props.render(props.stateProxy)}
            <DeleteButton className="md:mt-3" onClick={() => props.onDelete(props.index)}/>
        </>
    );
});

// TODO: Delete this
export const FastEditableList = React.memo(<Type extends HasId>({
    stateProxy,
    render,
    className,
    onAddNew,
    label,
    buttonText,
    deletionConfirmation,
}: FlatEditableListProps<Type>): ReactElement => {
    const onDelete = useCallback(
        (index: number) => {
            if (!deletionConfirmation || confirm(deletionConfirmation)) {
                stateProxy.splice(index, 1);
            }
        },
        [stateProxy],
    );

    const renderItem = useCallback((s: Type, i: number) => (
        <FlatEditableItem
            stateProxy={s}
            onDelete={onDelete}
            render={render}
            index={i}
        />
    ), [onDelete, render])
    return (
        <UncontrolledSortableList
            itemClassName="bg-white"
            label={label}
            onDelete={onDelete}
            buttonText={buttonText}
            stateProxy={stateProxy}
            onAddNew={onAddNew}
            className={className}
            render={renderItem}
        />
    );
});
