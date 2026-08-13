"use client"

import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useAddPropertyModal } from "./store/use-add-property-modal";

const AddPropertyButton = () => {
  const { onOpen } = useAddPropertyModal();
  return (
    <Button
      onClick={onOpen}
      variant={"default"}
      className="py-6 px-8 cursor-pointer bg-indigo-600 hover:bg-indigo-500 font-medium transition-all shadow-lg shadow-indigo-500/20 rounded-xl"
    >
      Add Property
      <Plus />
    </Button>
  );
};

export default AddPropertyButton;
