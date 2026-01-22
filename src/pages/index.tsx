import Head from "next/head";
import { useMemo, useState } from "react";
import rawData from "../data/imamnagar_all.json";
import { Root, VoterWithGender, VoterStatus, MetaData } from "../types/voter";
import { VoterHeader } from "../components/voter/VoterHeader";
import { SearchBar } from "../components/voter/SearchBar";
import { Filters } from "../components/voter/Filters";
import { VoterList } from "../components/voter/VoterList";
import { VoterDetailModal } from "../components/voter/VoterDetailModal";
import { useDebounce } from "../hooks/useDebounce";
import { Languages } from "lucide-react";

// Process data locally
const data = rawData as unknown as Root;

const flattenedVoters: VoterWithGender[] = [
  ...(data.male_list?.voters.map((v) => ({ ...v, gender: "male" as const })) || []),
  ...(data.female_list?.voters.map((v) => ({ ...v, gender: "female" as const })) || []),
];

const uniqueProfessions = Array.from(
  new Set(flattenedVoters.map((v) => JSON.stringify({ label: v.profession_bn, value: v.profession_en })))
)
  .map((s) => JSON.parse(s))
  .sort((a, b) => a.label.localeCompare(b.label));

export default function VoterSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 400);

  const [genderFilter, setGenderFilter] = useState<"all" | "female" | "male">("all");
  const [statusFilter, setStatusFilter] = useState<VoterStatus[]>([]);
  const [professionFilter, setProfessionFilter] = useState("");
  
  const [selectedVoter, setSelectedVoter] = useState<VoterWithGender | null>(null);
  const [isBangla, setIsBangla] = useState(false);

  const filteredVoters = useMemo(() => {
    return flattenedVoters.filter((voter) => {
      // 1. Gender Filter
      if (genderFilter !== "all" && voter.gender !== genderFilter) return false;

      // 2. Status Filter (if any selected, must match one of them)
      if (statusFilter.length > 0 && !statusFilter.includes(voter.status)) return false;

      // 3. Profession Filter
      if (professionFilter && voter.profession_en !== professionFilter) return false;

      // 4. Search Filter
      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase().trim();
        const searchFields = [
          voter.name_bn,
          voter.name_en,
          voter.voter_no,
          voter.father_bn,
          voter.father_en,
          voter.mother_bn,
          voter.mother_en,
          voter.spouse_bn,
          voter.spouse_en,
          voter.address_bn,
          voter.address_en,
        ];
        
        // Check if ANY field contains the query substring
        const matches = searchFields.some((field) => field && field.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    });
  }, [debouncedSearch, genderFilter, statusFilter, professionFilter]);

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Imamnagar Voter Search</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Search and browse voter information for Imamnagar union" />
      </Head>

      <VoterHeader meta={data.meta}>
        {/* Search Panel - Now inside the header's gradient backdrop */}
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal-100/40 to-cyan-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-100/40 to-purple-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar 
                value={searchQuery} 
                onChange={setSearchQuery} 
                placeholder={isBangla ? "নাম, ভোটার নং, বা ঠিকানা দিয়ে খুঁজুন..." : "Search by name, voter no, father, mother, spouse, address..."}
              />
            </div>
            
            {/* Filters */}
            <Filters
              gender={genderFilter}
              setGender={setGenderFilter}
              status={statusFilter}
              setStatus={setStatusFilter}
              profession={professionFilter}
              setProfession={setProfessionFilter}
              uniqueProfessions={uniqueProfessions}
              isBangla={isBangla}
            />
          </div>
        </div>
      </VoterHeader>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header & Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-800">
              {isBangla ? 'ভোটার তালিকা' : 'Voter List'}
            </h2>
            <span className="inline-flex items-center justify-center min-w-[2.5rem] h-8 px-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-bold rounded-full shadow-md shadow-teal-200">
              {filteredVoters.length}
            </span>
          </div>
          
          <button
            onClick={() => setIsBangla(!isBangla)}
            className="group flex items-center gap-3 px-4 py-2.5 bg-white border-2 border-slate-200 rounded-xl hover:border-teal-300 hover:shadow-md transition-all duration-200"
          >
            <Languages className="w-5 h-5 text-teal-600" />
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className={`px-2 py-1 rounded-md transition-all ${
                isBangla 
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}>
                বাংলা
              </span>
              <span className="text-slate-300">|</span>
              <span className={`px-2 py-1 rounded-md transition-all ${
                !isBangla 
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}>
                English
              </span>
            </div>
          </button>
        </div>

        {/* Results Area */}
        <VoterList 
          voters={filteredVoters} 
          totalCount={filteredVoters.length} 
          onVoterClick={setSelectedVoter}
          isBangla={isBangla}
        />
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-500">
            <span className="font-medium text-slate-700">Imamnagar Voter Search Portal</span>
            <span className="mx-2">•</span>
            Data sourced from official voter registry
          </p>
        </div>
      </footer>

      <VoterDetailModal 
        voter={selectedVoter} 
        onClose={() => setSelectedVoter(null)} 
        isBangla={isBangla}
      />
    </div>
  );
}
