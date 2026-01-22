import React from "react";
import { VoterStatus } from "../../types/voter";
import { Users, Briefcase, CheckCircle2 } from "lucide-react";

interface FiltersProps {
  gender: "all" | "female" | "male";
  setGender: (g: "all" | "female" | "male") => void;
  status: VoterStatus[];
  setStatus: (s: VoterStatus[]) => void;
  profession: string;
  setProfession: (p: string) => void;
  uniqueProfessions: { label: string; value: string }[];
  className?: string;
  isBangla?: boolean;
}

export const Filters: React.FC<FiltersProps> = ({
  gender,
  setGender,
  status,
  setStatus,
  profession,
  setProfession,
  uniqueProfessions,
  className = "",
  isBangla = false,
}) => {
  const toggleStatus = (s: VoterStatus) => {
    if (status.includes(s)) {
      setStatus(status.filter((item) => item !== s));
    } else {
      setStatus([...status, s]);
    }
  };

  const statusOptions: { value: VoterStatus; label: string; labelBn: string; bgClass: string; activeClass: string }[] = [
    { 
      value: "active", 
      label: "Active", 
      labelBn: "সক্রিয়",
      bgClass: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
      activeClass: "bg-gradient-to-r from-emerald-500 to-green-500 text-white border-transparent shadow-lg shadow-emerald-200"
    },
    { 
      value: "cut", 
      label: "Cut", 
      labelBn: "কাটা",
      bgClass: "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100",
      activeClass: "bg-gradient-to-r from-slate-500 to-gray-500 text-white border-transparent shadow-lg shadow-slate-200"
    },
    { 
      value: "migrated", 
      label: "Migrated", 
      labelBn: "স্থানান্তরিত",
      bgClass: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
      activeClass: "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent shadow-lg shadow-amber-200"
    },
    { 
      value: "duplicate", 
      label: "Duplicate", 
      labelBn: "ডুপ্লিকেট",
      bgClass: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
      activeClass: "bg-gradient-to-r from-rose-500 to-red-500 text-white border-transparent shadow-lg shadow-rose-200"
    },
  ];

  const genderOptions = [
    { value: "all" as const, label: "All", labelBn: "সকল", icon: "👥" },
    { value: "male" as const, label: "Male", labelBn: "পুরুষ", icon: "👨" },
    { value: "female" as const, label: "Female", labelBn: "মহিলা", icon: "👩" },
  ];

  return (
    <div className={`space-y-5 ${className}`}>
      {/* Row 1: Gender & Status */}
      <div className="flex flex-col lg:flex-row gap-5 lg:items-start">
        {/* Gender Filter */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-2 mb-2.5">
            <Users className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-semibold text-slate-700">
              {isBangla ? 'লিঙ্গ' : 'Gender'}
            </span>
          </div>
          <div className="inline-flex bg-slate-100 rounded-xl p-1.5 gap-1">
            {genderOptions.map((g) => (
              <button
                key={g.value}
                onClick={() => setGender(g.value)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  gender === g.value
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
                }`}
              >
                <span>{g.icon}</span>
                <span>{isBangla ? g.labelBn : g.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2.5">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-semibold text-slate-700">
              {isBangla ? 'অবস্থা' : 'Status'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => {
              const isActive = status.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => toggleStatus(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 flex items-center gap-1.5 ${
                    isActive ? option.activeClass : option.bgClass
                  }`}
                >
                  {isActive && (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {isBangla ? option.labelBn : option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 2: Profession */}
      <div className="flex-1 max-w-md">
        <div className="flex items-center gap-2 mb-2.5">
          <Briefcase className="w-4 h-4 text-teal-600" />
          <span className="text-sm font-semibold text-slate-700">
            {isBangla ? 'পেশা' : 'Profession'}
          </span>
        </div>
        <div className="relative">
          <select
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="block w-full pl-4 pr-10 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-700 font-medium
                       focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100
                       appearance-none cursor-pointer transition-all duration-200
                       hover:border-slate-300"
          >
            <option value="">{isBangla ? "সকল পেশা" : "All professions"}</option>
            {uniqueProfessions.map((p) => (
              <option key={p.value} value={p.value}>
                {isBangla ? p.label : p.value} {isBangla ? '' : `(${p.label})`}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
