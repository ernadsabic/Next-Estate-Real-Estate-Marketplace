"use client";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Building,
  Building2,
  Hotel,
  House,
  HousePlus,
  Store,
} from "lucide-react";
import { FormData } from "../../Types/formType";

type Props = {
  step: number;
  formValues: FormData;
  setFormValues: React.Dispatch<React.SetStateAction<FormData>>;
};

const StepOne = ({ step, formValues, setFormValues }: Props) => {
  return (
    <>
      <div className="flex justify-between mb-6">
        <span className="text-gray-500">{`Step ${step} of 6`}</span>
        <h1 className="font-medium">Select property type.</h1>
      </div>
      <RadioGroup
        value={formValues.category}
        onValueChange={(value) =>
          setFormValues((prev) => ({ ...prev, category: value }))
        }
        className="max-w-sm grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        {properties.map((p, index) => (
          <FieldLabel
            htmlFor={p.htmlfor}
            className="hover:border-slate-900/50 transition-colors duration-200 ease"
            key={index}
          >
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>{p.title}</FieldTitle>
                <FieldDescription className="text-lg font-medium">
                  {p.description}
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem
                value={p.value}
                id={p.htmlfor}
                className="sr-only"
              />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </>
  );
};

export default StepOne;

const properties = [
  {
    htmlfor: "house-property",
    title: <House className="w-10 h-10 mb-2 text-slate-800" />,
    description: "House",
    value: "house",
  },
  {
    htmlfor: "apartment-property",
    title: <Building className="w-10 h-10 mb-2 text-slate-800" />,
    description: "Apartment",
    value: "apartment",
  },
  {
    htmlfor: "penthouse-property",
    title: <Building2 className="w-10 h-10 mb-2 text-slate-800" />,
    description: "Penthouse",
    value: "penthouse",
  },
  {
    htmlfor: "villa-property",
    title: <HousePlus className="w-10 h-10 mb-2 text-slate-800" />,
    description: "Villa",
    value: "villa",
  },
  {
    htmlfor: "commercial-property",
    title: <Store className="w-10 h-10 mb-2 text-slate-800" />,
    description: "Commercial",
    value: "commercial",
  },
  {
    htmlfor: "hotel-property",
    title: <Hotel className="w-10 h-10 mb-2 text-slate-800" />,
    description: "Hotel",
    value: "hotel",
  },
];
