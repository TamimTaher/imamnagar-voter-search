import React from "react";
import { MetaData } from "../../types/voter";
import { MapPin, Users } from "lucide-react";

interface VoterHeaderProps {
  meta: MetaData;
  children?: React.ReactNode;
}

export const VoterHeader: React.FC<VoterHeaderProps> = ({ meta, children }) => {
  return (
    <header className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-cyan-600 to-indigo-600"></div>
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Floating Shapes */}
      <div className="absolute top-4 right-[10%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-[20%] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-[30%] w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {/* Left Side - Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
              <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight drop-shadow-sm">
                Imamnagar
              </h1>
              <p className="text-sm sm:text-base text-teal-100 font-medium">
                Voter Search Portal
              </p>
            </div>
          </div>
          
          {/* Right Side - Location Info */}
          <div className="flex items-start gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
            <MapPin className="w-4 h-4 text-teal-200 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <div className="font-medium text-white">
                {meta.district_en} • {meta.upazila_en} • {meta.union_en}
              </div>
              <div className="text-teal-200 text-xs mt-0.5">
                {meta.district_bn} • {meta.upazila_bn} • {meta.union_bn}
              </div>
            </div>
          </div>
        </div>
        
        {/* Children (Search Panel) */}
        {children && (
          <div className="pb-6">
            {children}
          </div>
        )}
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="#f0fdfa"/>
        </svg>
      </div>
    </header>
  );
};
