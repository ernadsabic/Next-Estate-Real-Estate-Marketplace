import { FormData } from "../../Types/formType";

type Props = {
  step: number;
  formValues: FormData;
  setFormValues: React.Dispatch<React.SetStateAction<FormData>>;
};

const StepFour = ({ step, formValues, setFormValues }: Props) => {
  return (
    <>
      <div className="flex justify-between mb-6">
        <span className="text-gray-500">{`Step ${step} of 6`}</span>
        <h1 className="font-medium">Property description</h1>
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <input
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, title: e.target.value }))
          }
          value={formValues.title}
          type="text"
          placeholder="Property Title"
          className="px-4 py-2 h-14 border border-black/10 rounded-xl"
        />
        <textarea
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, description: e.target.value }))
          }
          value={formValues.description}
          placeholder="Description..."
          className="px-4 py-2 h-20 border border-black/10 rounded-xl"
        />
      </div>
    </>
  );
};

export default StepFour;
