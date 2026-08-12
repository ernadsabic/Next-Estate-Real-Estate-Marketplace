import React from "react";
import { FormData } from "../../Types/formType";
type Props = {
  step: number;
  formValues: FormData;
  setFormValues: React.Dispatch<React.SetStateAction<FormData>>;
};

const StepSix = ({ step, formValues, setFormValues }: Props) => {
  return (
    <>
      <div className="flex justify-between mb-6">
        <span className="text-gray-500">{`Step ${step} of 6`}</span>
        <h1 className="font-medium">Set Property price</h1>
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <select
          value={formValues.type}
          onChange={(e) =>
            setFormValues((prev) => ({
              ...prev,
              type: e.target.value as "FOR_SALE" | "FOR_RENT",
            }))
          }
          className="px-4 py-2 h-14 border border-black/10 rounded-xl"
        >
          <option value="FOR_SALE">For Sale</option>
          <option value="FOR_RENT">For Rent</option>
        </select>
        <input
          value={formValues.price === 0 ? "" : formValues.price}
          onChange={(e) =>
            setFormValues((prev) => ({
              ...prev,
              price: e.target.valueAsNumber || 0,
            }))
          }
          type="number"
          placeholder="Sale Price ($)"
          className="px-4 py-2 h-14 border border-black/10 rounded-xl"
        />
      </div>
    </>
  );
};

export default StepSix;
