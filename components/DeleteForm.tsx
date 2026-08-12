"use client";
import React, { SyntheticEvent, useTransition } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import deleteProperty from "@/lib/actions/delete-property-action";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Props {
  isOpenDel: boolean;
  setIsOpenDel: React.Dispatch<React.SetStateAction<boolean>>;
  propertyId: string;
}

const DeleteForm = ({ isOpenDel, setIsOpenDel, propertyId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await deleteProperty(propertyId);
        toast.success("Property deleted successfully!");
        setIsOpenDel(false);
      } catch (err) {
        toast.error("Failed to delete property. Please try again.");
      }
    });
  };
  return (
    <Dialog open={isOpenDel} onOpenChange={setIsOpenDel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold text-slate-900">
            Delete Property
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            Are you sure you want to delete this property from the marketplace?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex items-center gap-3 sm:justify-end mt-4">
          <Button
            onClick={() => setIsOpenDel(false)}
            type="button"
            variant="outline"
            disabled={isPending}
            className="flex-1 sm:flex-none cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            type="submit"
            variant="destructive"
            className="flex-1 sm:flex-none cursor-pointer bg-red-700 hover:bg-red-800 text-white transition-colors duration-200"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Deleting...</span>
              </div>
            ) : (
              "Delete Property"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteForm;
