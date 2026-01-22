import React, { useState } from "react";
import { VoterWithGender } from "../../types/voter";
import { VoterCard } from "./VoterCard";
import { formatDate } from "../../utils/date";
import { ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown, Search } from "lucide-react";

interface VoterListProps {
  voters: VoterWithGender[];
  totalCount: number;
  onVoterClick: (voter: VoterWithGender) => void;
  isBangla?: boolean;
}

type SortKey = "serial" | "name_en" | "birthdate";
type SortOrder = "asc" | "desc";

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'active':
        return 'bg-gradient-to-r from-emerald-500 to-green-500 text-white';
      case 'cut':
        return 'bg-gradient-to-r from-slate-500 to-gray-500 text-white';
      case 'migrated':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white';
      case 'duplicate':
        return 'bg-gradient-to-r from-rose-500 to-red-500 text-white';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide shadow-sm ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

export const VoterList: React.FC<VoterListProps> = ({ voters: initialVoters, totalCount, onVoterClick, isBangla = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;
  const [sortKey, setSortKey] = useState<SortKey>("serial");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Sorting logic
  const sortedVoters = [...initialVoters].sort((a, b) => {
    let valA, valB;
    if (sortKey === "serial") {
      valA = a.serial;
      valB = b.serial;
    } else if (sortKey === "name_en") {
      valA = a.name_en.toLowerCase();
      valB = b.name_en.toLowerCase();
    } else {
      valA = new Date(a.birthdate).getTime();
      valB = new Date(b.birthdate).getTime();
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedVoters.length / pageSize);
  const currentVoters = sortedVoters.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const SortIcon = ({ active, order }: { active: boolean; order: SortOrder }) => {
    if (!active) return <ArrowUpDown className="w-4 h-4 ml-1.5 text-slate-300 group-hover:text-teal-400 transition-colors" />;
    return order === "asc" 
      ? <ArrowUp className="w-4 h-4 ml-1.5 text-teal-500" />
      : <ArrowDown className="w-4 h-4 ml-1.5 text-teal-500" />;
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
          <span className="font-medium">
            {isBangla 
              ? `${(currentPage-1)*pageSize + 1}-${Math.min(currentPage*pageSize, initialVoters.length)} দেখানো হচ্ছে ${initialVoters.length} এর মধ্যে`
              : `Showing ${(currentPage-1)*pageSize + 1}-${Math.min(currentPage*pageSize, initialVoters.length)} of ${initialVoters.length}`}
          </span>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <th 
                  onClick={() => handleSort("serial")}
                  className="group px-5 py-4 text-left cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Serial
                    <SortIcon active={sortKey === "serial"} order={sortOrder} />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort("name_en")}
                  className="group px-5 py-4 text-left cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Name
                    <SortIcon active={sortKey === "name_en"} order={sortOrder} />
                  </div>
                </th>
                <th className="px-5 py-4 text-left">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Voter No</span>
                </th>

                <th className="px-5 py-4 text-left">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Profession</span>
                </th>
                <th 
                  onClick={() => handleSort("birthdate")}
                  className="group px-5 py-4 text-left cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Birthdate
                    <SortIcon active={sortKey === "birthdate"} order={sortOrder} />
                  </div>
                </th>
                <th className="px-5 py-4 text-left">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Address</span>
                </th>
                <th className="px-5 py-4 text-left">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Status</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentVoters.map((voter, index) => (
                <tr 
                  key={voter.voter_no} 
                  onClick={() => onVoterClick(voter)}
                  className={`cursor-pointer transition-all duration-150 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                  } hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50`}
                >
                  <td className="px-5 py-4">
                    <span className="font-mono text-sm font-semibold text-slate-700">{voter.serial}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-800">{isBangla ? voter.name_bn : voter.name_en}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{isBangla ? voter.name_en : voter.name_bn}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-mono text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded">{voter.voter_no}</span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="text-sm text-slate-700">{voter.profession_en}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{voter.profession_bn}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-600 whitespace-nowrap">{formatDate(voter.birthdate)}</span>
                  </td>
                  <td className="px-5 py-4 max-w-[200px]">
                    <div className="text-sm text-slate-700 truncate">{isBangla ? voter.address_bn : voter.address_en}</div>
                    <div className="text-xs text-slate-400 truncate mt-0.5">{isBangla ? voter.address_en : voter.address_bn}</div>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={voter.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {currentVoters.map((voter) => (
          <VoterCard 
            key={voter.voter_no} 
            voter={voter} 
            onClick={() => onVoterClick(voter)} 
            isBangla={isBangla}
          />
        ))}
      </div>
      
      {/* Empty State */}
      {initialVoters.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-1">No voters found</h3>
          <p className="text-slate-500 text-center max-w-sm">
            Try a different spelling or remove some filters to see more results.
          </p>
        </div>
      )}

      {/* Pagination */}
      {initialVoters.length > 0 && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 px-5 py-4 shadow-sm">
          <span className="text-sm text-slate-600">
            Page <span className="font-bold text-slate-800">{currentPage}</span> of <span className="font-bold text-slate-800">{totalPages}</span>
          </span>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            
            <div className="hidden sm:flex items-center gap-1">
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-2 text-slate-400">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={`min-w-[2.5rem] h-10 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md shadow-teal-200'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
