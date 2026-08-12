"use client";

import { SyntheticEvent, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { useRouter } from "next/navigation";

const initialFormValues = {
  category: "",
  location: "",
  min_price: "",
  max_price: "",
};

const FilterForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const router = useRouter();

  const handleInputValues = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = (e: SyntheticEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (formValues.category) params.set("category", formValues.category);
    if (formValues.location) params.set("location", formValues.location);
    if (formValues.min_price) params.set("min_price", formValues.min_price);
    if (formValues.max_price) params.set("max_price", formValues.max_price);

    router.push(`/marketplace?${params}`);
    setIsOpen(false);
  };

  const resetFilters = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValues(initialFormValues);
    setIsOpen(false);
    router.push("/marketplace");
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant={"ghost"}
        className="p-6 border-slate-300 text-slate-800 font-medium hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
        Filters
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-6">
          <form onSubmit={applyFilters} className="flex flex-col gap-4 w-full">
            <div className="space-y-2">
              <label htmlFor="" className="block">
                Category
              </label>
              <select
                value={formValues.category}
                onChange={handleInputValues}
                name="category"
                className="w-full border placeholder:text-gray-400 border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={"house"}>House</option>
                <option value={"apartment"}>Apartment</option>
                <option value={"villa"}>Villa</option>
                <option value={"penthouse"}>Penthouse</option>
                <option value={"commercial"}>Commercial</option>
                <option value={"hotel"}>Hotel</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="" className="block">
                Location
              </label>
              <input
                value={formValues.location}
                onChange={handleInputValues}
                name="location"
                type="text"
                placeholder="eg. New York"
                className="w-full border placeholder:text-gray-400 border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="space-y-2 w-1/2">
                <label htmlFor="" className="block">
                  Min Price
                </label>
                <input
                  value={formValues.min_price}
                  onChange={handleInputValues}
                  name="min_price"
                  min={1}
                  type="number"
                  placeholder="100"
                  className="w-full border placeholder:text-gray-400 border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2 w-1/2">
                <label htmlFor="" className="block">
                  Max Price
                </label>
                <input
                  value={formValues.max_price}
                  onChange={handleInputValues}
                  name="max_price"
                  type="number"
                  placeholder="200"
                  className="w-full border placeholder:text-gray-400 border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Button
                onClick={resetFilters}
                type="button"
                variant={"outline"}
                className="py-6 flex-1 text-base border-slate-300 text-slate-800 font-medium hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors duration-300 shadow-xs hover:shadow-md cursor-pointer"
              >
                <span>Reset Filters</span>
              </Button>
              <Button
                type="submit"
                variant={"default"}
                className="py-6 flex-1 text-base bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-colors duration-300 ease-in"
              >
                Apply Filters
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FilterForm;
