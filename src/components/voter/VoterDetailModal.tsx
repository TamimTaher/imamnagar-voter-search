import React, { useEffect, useRef } from "react";
import { VoterWithGender } from "../../types/voter";
import { calculateAge, formatDate } from "../../utils/date";
import { X, Copy, Check, User, MapPin, Calendar, Briefcase, Users, Hash } from "lucide-react";

interface VoterDetailModalProps {
  voter: VoterWithGender | null;
  onClose: () => void;
  isBangla?: boolean;
}

export const VoterDetailModal: React.FC<VoterDetailModalProps> = ({ voter, onClose, isBangla }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (voter) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [voter, onClose]);

  if (!voter) return null;

  const copyToClipboard = () => {
    const text = `
নাম: ${voter.name_bn}
ভোটার নং: ${voter.voter_no}
পিতা: ${voter.father_bn || '-'}
মাতা: ${voter.mother_bn || '-'}
স্বামী/স্ত্রী: ${voter.spouse_bn || '-'}
পেশা: ${voter.profession_bn}
গ্রাম/রাস্তা: ${voter.address_bn}
    `.trim();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusStyles = () => {
    switch (voter.status) {
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

  const InfoCard = ({ 
    icon: Icon, 
    label, 
    valueEn, 
    valueBn, 
    iconColor 
  }: { 
    icon: React.ElementType;
    label: string; 
    valueEn: string | null; 
    valueBn: string | null;
    iconColor: string;
  }) => (
    <div className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors">
      <div className="flex items-start gap-3">
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${iconColor} flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
          <p className="text-base font-semibold text-slate-800 truncate">{valueEn || "—"}</p>
          {valueBn && <p className="text-sm text-slate-500 truncate mt-0.5">{valueBn}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        ref={modalRef}
        className="relative z-10 w-full max-w-lg bg-white shadow-2xl h-full overflow-hidden flex flex-col animate-[slideIn_0.3s_ease-out]"
        style={{
          animation: 'slideIn 0.3s ease-out forwards'
        }}
      >
        {/* Header */}
        <div className="relative overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-cyan-600 to-indigo-600"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          
          <div className="relative z-10 px-6 pt-6 pb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-teal-100 font-medium">
                    {isBangla ? 'ভোটার বিস্তারিত' : 'Voter Details'}
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors border border-white/20"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Name Section */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white leading-tight">
                {voter.name_en}
              </h2>
              <p className="text-lg text-teal-100">{voter.name_bn}</p>
              <div className="flex items-center gap-3 pt-2">
                <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide shadow-lg ${getStatusStyles()}`}>
                  {voter.status}
                </span>
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/20">
                  <Calendar className="w-4 h-4 text-teal-200" />
                  <span className="text-white font-semibold">{calculateAge(voter.birthdate)} years</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Quick Info Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1">Gender</p>
              <p className="text-lg font-bold text-slate-800 capitalize flex items-center gap-2">
                {voter.gender === 'male' ? '👨' : '👩'} {voter.gender}
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">Voter No</p>
              <p className="text-base font-mono font-bold text-slate-800">{voter.voter_no}</p>
            </div>
          </div>

          {/* Family Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4" />
              Family Information
            </h3>
            <div className="grid gap-3">
              <InfoCard
                icon={User}
                label="Father"
                valueEn={voter.father_en}
                valueBn={voter.father_bn}
                iconColor="bg-teal-100 text-teal-600"
              />
              <InfoCard
                icon={User}
                label="Mother"
                valueEn={voter.mother_en}
                valueBn={voter.mother_bn}
                iconColor="bg-cyan-100 text-cyan-600"
              />
              <InfoCard
                icon={User}
                label="Spouse"
                valueEn={voter.spouse_en}
                valueBn={voter.spouse_bn}
                iconColor="bg-indigo-100 text-indigo-600"
              />
            </div>
          </div>

          {/* Other Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Additional Details
            </h3>
            <div className="grid gap-3">
              <InfoCard
                icon={Briefcase}
                label="Profession"
                valueEn={voter.profession_en}
                valueBn={voter.profession_bn}
                iconColor="bg-amber-100 text-amber-600"
              />
              <InfoCard
                icon={Calendar}
                label="Birthdate"
                valueEn={formatDate(voter.birthdate)}
                valueBn={null}
                iconColor="bg-rose-100 text-rose-600"
              />
              <InfoCard
                icon={MapPin}
                label="Address"
                valueEn={voter.address_en}
                valueBn={voter.address_bn}
                iconColor="bg-emerald-100 text-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50">
          <button
            onClick={copyToClipboard}
            disabled={copied}
            className={`w-full flex justify-center items-center gap-2 px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 ${
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 shadow-lg shadow-teal-200 hover:shadow-xl hover:shadow-teal-300'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy Details (বাংলা)
              </>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
