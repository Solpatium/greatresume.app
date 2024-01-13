import { Dialog, Transition } from "@headlessui/react";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React, { Fragment, useEffect } from "react";
import { Button } from "../atoms/button";
import cn from "classnames";
import { useHistoryPush } from "../../utils/hooks";

export const BigModal: React.FC<{ 
  title: React.ReactNode; children: React.ReactNode; 
  onClose: () => void; 
  show?: boolean,
  historyKey?: string;
}> = ({
  title,
  children,
  onClose,
  show,
  historyKey,
}) => {
  // Usually there is just one modal.
  const history = useHistoryPush(historyKey ?? "big-modal", onClose);
  useEffect(() => {
    if (show) {
      history.push();
    } else {
      history.maybePop();
    }
  }, [show]);
    return (
      <Transition.Root show={show ?? false} as={Fragment} appear>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-hidden" onClose={onClose}>
          <div className="min-h-screen h-full h-[100lvh] min-h-[100lvh] flex justify-center items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-40 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-40 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className={cn("relative block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all flex flex-col",
                "w-full h-full lg:max-w-4xl lg:h-auto lg:p-2 lg:rounded-xl"
              )}>
                <div className="flex flex-row space-between gap-2 align-center items-center p-4">
                  <Dialog.Title as="h3" className="flex-grow text-lg leading-6 font-bold text-gray-900 truncate">
                    {title}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 self-start mt-1 lg:m-0"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="overflow-y-auto overflow-x-hidden w-full px-4 flex flex-col grow flex flex-col">
                  <div className="pb-[20px] grow">
                    {children}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    );
  };
