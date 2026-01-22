import React, { ChangeEvent } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="relative w-full group">
      {/* Gradient Border Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-500 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300"></div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <Search className="h-5 w-5 text-teal-500 transition-colors group-focus-within:text-teal-600" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-12 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 
                     focus:outline-none focus:border-transparent focus:ring-0
                     text-base font-medium shadow-sm
                     transition-all duration-300"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.blur();
            }
          }}
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};
