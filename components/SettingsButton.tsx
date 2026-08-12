"use client";
import { Settings } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UpdateForm from "./UpdateForm";
import DeleteForm from "./DeleteForm";

const SettingsButton = ({ propertyId }: { propertyId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDel, setIsOpenDel] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-sm">
              <Settings />
            </button>
          }
        ></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Your Property</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsOpen(true)}>
              Update
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsOpenDel(true)}
              className={
                "bg-red-700 mt-1 text-white data-highlighted:bg-red-700 data-highlighted:text-white transition-colors duration-300"
              }
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        propertyId={propertyId}
      />
      <DeleteForm
        isOpenDel={isOpenDel}
        setIsOpenDel={setIsOpenDel}
        propertyId={propertyId}
      />
    </>
  );
};

export default SettingsButton;
