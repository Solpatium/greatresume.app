import React, { useState } from "react";
import { Input } from "../../atoms/fields/input";
import { StateSetter, useNestObjectState } from "../../../utils/mutators";
import { RichTextEditor } from "../../atoms/fields/richText";
import { PhotoEditor } from "../../molecules/photoEdit";
import { StepWrapper } from "../../molecules/stepWrapper";
import { FormStep } from "./types";
import { Label } from "../../atoms/fields/label";
import { Switch } from "@headlessui/react";
import classNames from "classnames";
import { Location } from "../../../models/v1";
import { Button } from "../../atoms/button";

import { Transition, Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

function Disclosured() {
  return (
    <div className="w-full px-4 pt-16">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-indigo-100 px-4 py-2 text-left text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                <span>What is your refund policy?</span>
                <ChevronUpIcon
                  className={`${open ? "rotate-180 transform" : ""} h-5 w-5 text-indigo-500`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0">
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  If you're unhappy with your purchase for any reason, email us within 90 days and
                  we'll refund you in full, no questions asked.
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-indigo-100 px-4 py-2 text-left text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                <span>Do you offer technical support?</span>
                <ChevronUpIcon
                  className={`${open ? "rotate-180 transform" : ""} h-5 w-5 text-indigo-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}

function Example() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch.Group as="div" className="flex items-center justify-between">
      <span className="flex flex-grow flex-col">
        <Switch.Label as="span" className="text-sm font-medium text-gray-900" passive>
          Available to hire
        </Switch.Label>
        <Switch.Description as="span" className="text-sm text-gray-500">
          Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
        </Switch.Description>
      </span>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? "bg-indigo-600" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        )}>
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          )}
        />
      </Switch>
    </Switch.Group>
  );
}

const LocationForm: React.FC<{ state: Location; setState: StateSetter<Location> }> = ({
  state,
  setState,
}) => {
  const makeSetter = useNestObjectState(setState);
  return (
    <fieldset>
      {/*<Example />*/}
      <hr />
      <legend className="sr-only">Address</legend>
      <div className="text-base font-medium text-gray-900 mb-5" aria-hidden="true">
        Address
      </div>
      <div className="grid md:grid-cols-6 gap-4">
        <Input
          label="Country"
          className="md:col-span-3"
          onChange={makeSetter("country")}
          value={state["country"]}
        />
        <Input
          label="City"
          className="md:col-span-3"
          onChange={makeSetter("city")}
          value={state["city"]}
        />
        <Input
          label="Street"
          className="md:col-span-3"
          onChange={makeSetter("address")}
          value={state["address"]}
        />
        <Input
          label="Street"
          className="md:col-span-3"
          onChange={makeSetter("postalCode")}
          value={state["postalCode"]}
        />
      </div>
      <Button ghost>Advanced fields</Button>
      <Disclosured />
    </fieldset>
  );
};

export const PersonalInformation: FormStep = ({ imageDataUrl, state, setState, ...props }) => {
  const makeSetter = useNestObjectState(useNestObjectState(setState)("personalInformation"));
  const setImage = useNestObjectState(setState)("image");
  const formState = state.personalInformation;
  return (
    <StepWrapper {...props}>
      <Input
        label="Name"
        className="md:col-span-2"
        onChange={makeSetter("name")}
        value={formState["name"]}
      />
      <Input
        label="Last Name"
        className="md:col-span-2"
        onChange={makeSetter("surname")}
        value={formState["surname"]}
      />
      <Input
        label="Job Title"
        className="md:col-span-4"
        onChange={makeSetter("jobTitle")}
        value={formState["jobTitle"]}
      />
      <div className="row-start-1 md:row-end-3 md:col-span-2 md:col-start-5">
        <Label target="edit-image" name="Image" className="flex" />
        <PhotoEditor buttonId="edit-image" image={state.image} setImage={setImage} />
      </div>
      <Input
        label="Phone number"
        className="md:col-span-3"
        onChange={makeSetter("phone")}
        value={formState["phone"]}
      />
      <Input
        label="Email"
        className="md:col-span-3"
        onChange={makeSetter("email")}
        value={formState["email"]}
      />
      <div className="col-span-full">
        <LocationForm setState={makeSetter("location")} state={formState["location"]} />
      </div>
      <RichTextEditor
        className="col-span-full"
        label="Short description"
        onChange={makeSetter("shortDescription")}
        value={formState["shortDescription"]}
      />
    </StepWrapper>
  );
};
