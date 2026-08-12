"use client";

import { Bath, BedDouble, Minus, Plus, SquareParking } from "lucide-react";
import { Button } from "../ui/button";
import { FormData } from "../../Types/formType";

type Props = {
  step: number;
  formValues: FormData;
  setFormValues: React.Dispatch<React.SetStateAction<FormData>>;
};

const StepThree = ({ step, formValues, setFormValues }: Props) => {

  return (
    <>
      <div className="flex justify-between mb-8">
        <span className="text-gray-500">{`Step ${step} of 6`}</span>
        <h1 className="font-medium">Share some basics about your place</h1>
      </div>

      {/* GRID  */}
      <div className="flex flex-col gap-8 mb-6">
        {/* BEDROOMS  */}
        <div className="flex items-center justify-between pb-4 border-b border-black/20">
          <div className="flex items-center gap-2">
            {" "}
            <BedDouble />
            <span className="font-medium text-lg">Bedrooms</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              disabled={formValues.bedrooms === 0}
              onClick={() =>
                setFormValues((prev) => ({
                  ...prev,
                  bedrooms: prev.bedrooms - 1,
                }))
              }
              variant={"ghost"}
              className="h-6 w-6 p-1 disabled:cursor-not-allowed rounded-full border border-slate-900/20 flex items-center justify-center"
            >
              <Minus className="text-slate-900" />
            </Button>
            <p>{formValues.bedrooms}</p>
            <Button
              onClick={() =>
                setFormValues((prev) => ({
                  ...prev,
                  bedrooms: prev.bedrooms + 1,
                }))
              }
              variant={"ghost"}
              className="h-6 w-6 p-1 rounded-full border border-slate-900/20 flex items-center justify-center"
            >
              <Plus className="text-slate-900" />
            </Button>
          </div>
        </div>
        {/* BATHROOMS  */}
        <div className="flex items-center justify-between pb-4 border-b border-black/20">
          <div className="flex items-center gap-2">
            {" "}
            <Bath />
            <span className="font-medium text-lg">Bathrooms</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              disabled={formValues.bathrooms === 0}
              onClick={() =>
                setFormValues((prev) => ({
                  ...prev,
                  bathrooms: prev.bathrooms - 1,
                }))
              }
              variant={"ghost"}
              className="h-6 w-6 p-1 disabled:cursor-not-allowed rounded-full border border-slate-900/20 flex items-center justify-center"
            >
              <Minus className="text-slate-900" />
            </Button>
            <p>{formValues.bathrooms}</p>
            <Button
              onClick={() =>
                setFormValues((prev) => ({
                  ...prev,
                  bathrooms: prev.bathrooms + 1,
                }))
              }
              variant={"ghost"}
              className="h-6 w-6 p-1 rounded-full border border-slate-900/20 flex items-center justify-center"
            >
              <Plus className="text-slate-900" />
            </Button>
          </div>
        </div>
        {/* PARKING SPACES  */}
        <div className="flex items-center justify-between pb-4 border-b border-black/20">
          <div className="flex items-center gap-2">
            {" "}
            <SquareParking />
            <span className="font-medium text-lg">Parking Spaces</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              disabled={formValues.parkings === 0}
              onClick={() =>
                setFormValues((prev) => ({
                  ...prev,
                  parkings: prev.parkings - 1,
                }))
              }
              variant={"ghost"}
              className="h-6 w-6 p-1 disabled:cursor-not-allowed rounded-full border border-slate-900/20 flex items-center justify-center"
            >
              <Minus className="text-slate-900" />
            </Button>
            <p>{formValues.parkings}</p>
            <Button
              onClick={() =>
                setFormValues((prev) => ({
                  ...prev,
                  parkings: prev.parkings + 1,
                }))
              }
              variant={"ghost"}
              className="h-6 w-6 p-1 rounded-full border border-slate-900/20 flex items-center justify-center"
            >
              <Plus className="text-slate-900" />
            </Button>
          </div>
        </div>
        {/* PROPERTY AREA SIZE  */}
        <input
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, area: e.target.valueAsNumber }))
          }
          value={formValues.area === 0 ? "" : formValues.area}
          type="number"
          placeholder="Property Area (sqft)"
          className="w-full border-b outline-none border-black/20 pb-4"
        />
      </div>
    </>
  );
};

export default StepThree;
