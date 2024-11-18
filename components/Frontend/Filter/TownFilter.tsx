import React, { useState, useRef, useCallback } from "react";
import { Search } from "lucide-react";
import { useClickOutside } from "@/lib/useClickOutside";

type Town = {
  id: string;
  title: string;
};

type TownFilterProps = {
  towns: Town[];
  onSelect: (townId: string) => void;
};

const TownFilter: React.FC<TownFilterProps> = ({ towns, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const ref = useClickOutside(() => setIsOpen(false)); // Close dropdown on outside click

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  }, []);

  const filteredTowns = towns.filter((town) =>
    town.title.toLowerCase().includes(searchTerm)
  );

  const handleSelect = (townId: string) => {
    onSelect(townId);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        className="w-full bg-white border flex justify-between border-gray-300 rounded-md px-4 py-2 text-left focus:outline-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {searchTerm || "Select Town"}
        <Search className="w-4 h-4 ml-2 inline-block text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-2 w-full">
          <input
            type="text"
            placeholder="Search towns..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border-b border-gray-300 px-4 py-2 focus:outline-none"
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredTowns.map((town) => (
              <li
                key={town.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(town.id)}
              >
                {town.title}
              </li>
            ))}
            {filteredTowns.length === 0 && (
              <li className="px-4 py-2 text-gray-500">No towns found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TownFilter;
