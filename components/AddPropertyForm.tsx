"use client";

import { SyntheticEvent, useState, useTransition } from "react";
import { useAddPropertyModal } from "./store/use-add-property-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import StepOne from "./FormSteps/StepOne";
import StepTwo from "./FormSteps/StepTwo";
import { Button } from "./ui/button";
import StepThree from "./FormSteps/StepThree";
import StepFour from "./FormSteps/StepFour";
import StepSix from "./FormSteps/StepSix";
import StepFive from "./FormSteps/StepFive";
import { FormData } from "../Types/formType";
import { addProperty } from "@/lib/actions/add-property-action";
import { toast } from "sonner";

const initialFormValues: FormData = {
  category: "",
  location: "",
  address: "",
  bedrooms: 1,
  bathrooms: 1,
  parkings: 0,
  area: 0,
  title: "",
  description: "",
  imageUrl: [],
  type: "FOR_SALE",
  price: 0,
};

const AddPropertyForm = () => {
  const { isOpen, onClose } = useAddPropertyModal();
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState<FormData>(initialFormValues);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await addProperty(formValues);
        toast.success("Property created successfully!");
        onClose();
        setStep(1);
        setFormValues(initialFormValues);
      } catch (err) {
        toast.error("Failed to create property. Please try again.");
      }
    });
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          setStep(1);
        }
      }}
    >
      <DialogContent>
        <DialogHeader className="border-b pb-2">
          <DialogTitle className="font-medium text-xl">
            Create a new listing
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <StepOne
              step={step}
              formValues={formValues}
              setFormValues={setFormValues}
            />
          )}
          {step === 2 && (
            <StepTwo
              step={step}
              formValues={formValues}
              setFormValues={setFormValues}
            />
          )}
          {step === 3 && (
            <StepThree
              step={step}
              formValues={formValues}
              setFormValues={setFormValues}
            />
          )}
          {step === 4 && (
            <StepFour
              step={step}
              formValues={formValues}
              setFormValues={setFormValues}
            />
          )}
          {step === 5 && (
            <StepFive
              step={step}
              formValues={formValues}
              setFormValues={setFormValues}
            />
          )}
          {step === 6 && (
            <StepSix
              step={step}
              formValues={formValues}
              setFormValues={setFormValues}
            />
          )}

          <div className="flex items-center gap-2">
            <Button
              type="button"
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              variant={"outline"}
              className="px-8 py-6 flex-1 text-lg border-slate-300 text-slate-800 font-medium hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors duration-300 shadow-xs hover:shadow-md cursor-pointer"
            >
              <span>Back</span>
            </Button>
            {step === 6 && (
              <Button
                disabled={isPending}
                type="submit"
                variant={"default"}
                className="px-8 py-6 flex-1 text-lg bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-colors duration-300 ease-in"
              >
                {isPending ? "Creating..." : "Create Listing"}
              </Button>
            )}
            {step < 6 && (
              <Button
                type="button"
                onClick={() => setStep(step + 1)}
                variant={"default"}
                className="px-8 py-6 flex-1 text-lg bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-colors duration-300 ease-in"
              >
                Next
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPropertyForm;
