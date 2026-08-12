"use client";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { SyntheticEvent, useState, useTransition } from "react";
import updateProperty from "@/lib/actions/update-property-action";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  propertyId: string;
}

const initialFormValues = {
  type: "FOR_SALE" as const,
  price: 0,
  title: "",
  description: "",
  parkings: 0,
};

const UpdateForm = ({ isOpen, setIsOpen, propertyId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleInputValues = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await updateProperty(formValues, propertyId);
        toast.success("Property updated successfully!");
        setFormValues(initialFormValues);
        setIsOpen(false);
      } catch (err) {
        toast.error("Failed to update property. Please try again.");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="space-y-2">
            <label htmlFor="type" className="block">
              Type
            </label>
            <select
              value={formValues.type}
              onChange={handleInputValues}
              name="type"
              className="w-full border placeholder:text-gray-400 border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={"FOR_SALE"}>For Sale</option>
              <option value={"FOR_RENT"}>For Rent</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="price" className="block">
              New Price
            </label>
            <input
              onChange={handleInputValues}
              value={formValues.price === 0 ? "" : formValues.price}
              min={1}
              name="price"
              type="number"
              placeholder="Update price..."
              className="w-full border placeholder:text-gray-400 border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="title" className="block">
              Title
            </label>
            <input
              onChange={handleInputValues}
              value={formValues.title}
              name="title"
              type="text"
              placeholder="Update title..."
              className="w-full border placeholder:text-gray-400 border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="block">
              Description
            </label>
            <input
              onChange={handleInputValues}
              value={formValues.description}
              name="description"
              type="text"
              placeholder="Update title..."
              className="w-full border placeholder:text-gray-400 border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="parkings" className="block">
              Parking Spaces
            </label>
            <input
              onChange={handleInputValues}
              value={formValues.parkings === 0 ? "" : formValues.parkings}
              min={1}
              name="parkings"
              type="number"
              placeholder="Update parking spaces..."
              className="w-full border placeholder:text-gray-400 border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Button
              onClick={() => setIsOpen(false)}
              type="button"
              variant={"outline"}
              className="py-6 flex-1 text-base border-slate-300 text-slate-800 font-medium hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors duration-300 shadow-xs hover:shadow-md cursor-pointer"
            >
              <span>Cancel</span>
            </Button>
            <Button
              disabled={isPending}
              type="submit"
              variant={"default"}
              className="py-6 flex-1 text-base bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-colors duration-300 ease-in"
            >
              {isPending ? `Updating...` : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateForm;
