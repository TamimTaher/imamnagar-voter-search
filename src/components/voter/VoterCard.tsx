import React from "react";
import { VoterWithGender } from "../../types/voter";
import { formatDate } from "../../utils/date";
import { MapPin, Calendar, Hash, ChevronRight } from "lucide-react";

interface VoterCardProps {
  voter: VoterWithGender;
  onClick: () => void;
  isBangla?: boolean;
}

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

export const VoterCard: React.FC<VoterCardProps> = ({ voter, onClick, isBangla }) => {
  return (
    <div 
      className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer
                 transition-all duration-300 ease-out
                 hover:border-teal-300 hover:shadow-xl hover:shadow-teal-100/50 hover:-translate-y-1"
      onClick={onClick}
    >
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="p-5">
        {/* Header Row */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-800 truncate group-hover:text-teal-700 transition-colors">
              {isBangla ? voter.name_bn : voter.name_en}
            </h3>
            <p className="text-sm text-slate-500 truncate mt-0.5">
              {isBangla ? voter.name_en : voter.name_bn}
            </p>
          </div>
          <StatusBadge status={voter.status} />
        </div>
        
        {/* Info Grid */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-50 text-teal-600">
              <Hash className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Voter ID</p>
              <p className="text-sm font-mono font-semibold text-slate-700">{voter.voter_no}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Address</p>
              <p className="text-sm text-slate-700 truncate">
                {isBangla ? voter.address_bn : voter.address_en}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Birthdate</p>
              <p className="text-sm text-slate-700">{formatDate(voter.birthdate)}</p>
            </div>
          </div>
        </div>
        
        {/* View Details Prompt */}
        <div className="flex items-center justify-end mt-4 pt-4 border-t border-slate-100">
          <span className="text-xs font-semibold text-teal-600 flex items-center gap-1 group-hover:gap-2 transition-all">
            View Details
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
};
