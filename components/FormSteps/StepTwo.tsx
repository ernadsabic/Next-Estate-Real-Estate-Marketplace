import { FormData } from "../../Types/formType";

type Props = {
  step: number;
  formValues: FormData;
  setFormValues: React.Dispatch<React.SetStateAction<FormData>>;
};
const StepTwo = ({ step, formValues, setFormValues }: Props) => {
  return (
    <>
      <div className="flex justify-between mb-6">
        <span className="text-gray-500">{`Step ${step} of 6`}</span>
        <h1 className="font-medium">Where is the property located?</h1>
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <input
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, location: e.target.value }))
          }
          value={formValues.location}
          type="text"
          placeholder="Location"
          className="px-4 py-2 h-14 border border-black/10 rounded-xl"
        />
        <input
           onChange={(e) =>
            setFormValues((prev) => ({ ...prev, address: e.target.value }))
          }
          value={formValues.address}
          type="text"
          placeholder="Address"
          className="px-4 py-2 h-14 border border-black/10 rounded-xl"
        />
      </div>
    </>
  );
};

export default StepTwo;
