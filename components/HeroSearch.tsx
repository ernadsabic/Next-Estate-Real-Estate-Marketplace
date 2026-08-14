"use client";
import { SyntheticEvent, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const HeroSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      return router.push(`/marketplace`);
    }
    const params = new URLSearchParams({ location: inputValue });
    router.push(`/marketplace?${params}`);
  };
  return (
    <form
      onSubmit={handleSearch}
      className="border truncate w-full md:w-2/3 lg:w-1/2 text-white border-white/10 bg-slate-900/40 backdrop-blur-md rounded-3xl p-4 flex items-center gap-4"
    >
      <input
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        type="text"
        placeholder="Search by city, neighborhood, or address"
        className="border border-white/10 h-14 p-4 rounded-2xl flex-1 outline-none focus:ring-1 focus:ring-[#4F46E5]"
      />
      <Button
        type="submit"
        variant={"default"}
        className="h-14 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-colors duration-200 ease-in"
      >
        Search Properties
      </Button>
    </form>
  );
};

export default HeroSearch;
