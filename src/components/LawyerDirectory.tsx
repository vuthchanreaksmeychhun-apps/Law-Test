import React, { useState } from 'react';
import { Search, MapPin, Star, Phone, Mail, Calendar, Award, Globe, Clock, ChevronRight, Filter, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { Lawyer } from '../types';
import { MOCK_LAWYERS } from '../mockData';

interface LawyerDirectoryProps {
  onBackToHome: () => void;
  onSelectLawyerForChat: (lawyerName: string) => void;
}

export default function LawyerDirectory({ onBackToHome, onSelectLawyerForChat }: LawyerDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  
  // Appointment booking state
  const [isBooking, setIsBooking] = useState(false);
  const [bookingDate, setBookingDate] = useState('2026-07-15');
  const [bookingTime, setBookingTime] = useState('09:00 AM');
  const [bookingReason, setBookingReason] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const specialties = ['All', 'Commercial Law', 'Family Law', 'Real Estate', 'Criminal Law', 'Labor Law'];

  const filteredLawyers = MOCK_LAWYERS.filter((lawyer) => {
    const matchesSearch = 
      lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.nameKh.includes(searchQuery) ||
      lawyer.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      lawyer.specialtiesKh.some(s => s.includes(searchQuery));
      
    const matchesSpecialty = 
      selectedSpecialty === 'All' || 
      lawyer.specialties.includes(selectedSpecialty);

    return matchesSearch && matchesSpecialty;
  });

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(false);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingReason('');
    }, 5000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 font-sans" id="lawyer-directory-container">
      {/* Header */}
      <div className="bg-[#0B1B3D] text-white px-4 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <button 
            onClick={selectedLawyer ? () => setSelectedLawyer(null) : onBackToHome}
            className="p-1 hover:bg-slate-800 rounded-full transition-colors"
            id="back-button"
          >
            <ArrowLeft className="w-5 h-5 text-amber-400" />
          </button>
          <div>
            <h1 className="text-base font-bold tracking-tight">
              {selectedLawyer ? 'Lawyer Profile' : 'Lawyer Directory'}
            </h1>
            <p className="text-[10px] text-amber-300 font-mono">
              {selectedLawyer ? 'ប្រវត្តិរូបមេធាវី' : 'បញ្ជីឈ្មោះមេធាវី'}
            </p>
          </div>
        </div>
        <span className="bg-red-600 text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase animate-pulse">
          {filteredLawyers.length} Active
        </span>
      </div>

      {bookingSuccess && (
        <div className="bg-emerald-600 text-white p-3 text-xs flex items-center space-x-2 animate-fade-in shadow" id="booking-success-toast">
          <Check className="w-4 h-4 shrink-0 bg-emerald-700 p-0.5 rounded-full" />
          <div className="flex-1">
            <p className="font-semibold">Appointment Booked Successfully!</p>
            <p className="text-[10px] opacity-90">កក់ការណាត់ជួបបានជោគជ័យ - Our staff will call to confirm.</p>
          </div>
        </div>
      )}

      {/* Profile Detail View */}
      {selectedLawyer ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-4" id="lawyer-detail-view">
          {/* Avatar and Basic Info */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="relative">
              <img 
                src={selectedLawyer.avatar} 
                alt={selectedLawyer.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-full object-cover border-2 border-[#0B1B3D] shadow-sm"
              />
              <span className="absolute bottom-0 right-1 bg-emerald-500 w-3 h-3 rounded-full border-2 border-white"></span>
            </div>
            
            <h2 className="text-lg font-bold text-[#0B1B3D] mt-2">{selectedLawyer.name}</h2>
            <p className="text-sm font-semibold text-red-600">{selectedLawyer.nameKh}</p>
            <p className="text-xs text-slate-500 font-medium mt-1">{selectedLawyer.title}</p>
            <p className="text-[10px] text-slate-400 italic">{selectedLawyer.titleKh}</p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2 w-full mt-4 pt-4 border-t border-slate-100 text-center">
              <div>
                <p className="text-xs font-bold text-[#0B1B3D]">{selectedLawyer.experience} Years</p>
                <p className="text-[9px] text-slate-400">Experience / បទពិសោធន៍</p>
              </div>
              <div className="border-x border-slate-100">
                <p className="text-xs font-bold text-amber-500 flex items-center justify-center">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-0.5" />
                  {selectedLawyer.rating}
                </p>
                <p className="text-[9px] text-slate-400">({selectedLawyer.reviewsCount} Reviews)</p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#0B1B3D]">{selectedLawyer.fee}</p>
                <p className="text-[9px] text-slate-400">Hourly Fee / តម្លៃសេវា</p>
              </div>
            </div>
          </div>

          {/* Quick Contact Bar */}
          <div className="grid grid-cols-2 gap-2">
            <a 
              href={`tel:${selectedLawyer.phone}`}
              className="bg-white hover:bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center justify-center space-x-2 text-[#0B1B3D] text-xs font-semibold shadow-sm transition"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>Call / ទូរស័ព្ទ</span>
            </a>
            <button 
              onClick={() => onSelectLawyerForChat(selectedLawyer.name)}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl p-2.5 flex items-center justify-center space-x-2 text-xs font-semibold shadow-sm transition"
            >
              <Mail className="w-4 h-4 text-amber-300" />
              <span>Chat / ជជែក</span>
            </button>
          </div>

          {/* Detailed specialties */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
            <h3 className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wider flex items-center">
              <Award className="w-4 h-4 mr-1 text-red-600" />
              Areas of Practice / ជំនាញឯកទេស
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {selectedLawyer.specialties.map((spec, idx) => (
                <span 
                  key={idx} 
                  className="bg-indigo-50 text-[#0B1B3D] text-[10px] px-2.5 py-1 rounded-full font-medium"
                >
                  {spec} / {selectedLawyer.specialtiesKh[idx]}
                </span>
              ))}
            </div>
          </div>

          {/* Professional Bio */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
            <h3 className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wider">Biography / ប្រវត្តិរូបសង្ខេប</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">{selectedLawyer.bio}</p>
            <p className="text-xs text-slate-500 leading-relaxed italic border-t border-dashed border-slate-100 pt-2">{selectedLawyer.bioKh}</p>
          </div>

          {/* Office & Locations */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
            <h3 className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wider flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-amber-500" />
              Office Location / ការិយាល័យ
            </h3>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-700">{selectedLawyer.location}</p>
              <p className="text-xs text-slate-500">{selectedLawyer.locationKh}</p>
            </div>
            
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center">
                <Globe className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Languages:
              </span>
              <span className="font-semibold text-slate-600">{selectedLawyer.languages.join(', ')}</span>
            </div>
          </div>

          {/* Action Button to schedule */}
          <button 
            onClick={() => setIsBooking(true)}
            className="w-full bg-[#0B1B3D] hover:bg-slate-900 text-white rounded-xl py-3.5 text-xs font-bold shadow-md transition flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Book Consultation / កក់ការប្រឹក្សា</span>
          </button>
        </div>
      ) : (
        /* List View */
        <div className="flex-1 flex flex-col min-h-0">
          {/* Search and Filters */}
          <div className="bg-white p-3 shadow-sm border-b border-slate-200 shrink-0 space-y-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search lawyers, specialties... (ស្វែងរកមេធាវី)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#0B1B3D] transition"
                id="lawyer-search-input"
              />
            </div>

            {/* Horizontal Specialty Pills */}
            <div className="flex overflow-x-auto space-x-1.5 pb-1 -mx-1 px-1 scrollbar-none" id="specialty-pills">
              {specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all ${
                    selectedSpecialty === spec 
                      ? 'bg-[#0B1B3D] text-white shadow-sm' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {spec === 'All' ? 'All specialties' : spec}
                </button>
              ))}
            </div>
          </div>

          {/* Lawyers List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3" id="lawyers-scroll-container">
            {filteredLawyers.length > 0 ? (
              filteredLawyers.map((lawyer) => (
                <div 
                  key={lawyer.id}
                  onClick={() => setSelectedLawyer(lawyer)}
                  className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm hover:border-[#0B1B3D] transition cursor-pointer flex space-x-3 group"
                >
                  <img 
                    src={lawyer.avatar} 
                    alt={lawyer.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-full object-cover shrink-0 border border-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xs font-bold text-[#0B1B3D] group-hover:text-red-600 transition-colors">
                        {lawyer.name}
                      </h3>
                      <div className="flex items-center text-[10px] text-amber-500 font-bold shrink-0">
                        <Star className="w-3 h-3 fill-amber-500 mr-0.5" />
                        {lawyer.rating}
                      </div>
                    </div>
                    <p className="text-[11px] font-semibold text-red-600">{lawyer.nameKh}</p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">{lawyer.title}</p>
                    
                    <div className="flex items-center text-[9px] text-slate-400 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400 mr-0.5 shrink-0" />
                      <span className="truncate">{lawyer.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {lawyer.specialties.slice(0, 2).map((s, i) => (
                        <span key={i} className="bg-slate-50 text-[#0B1B3D] text-[8px] px-1.5 py-0.5 rounded font-medium border border-slate-100">
                          {s}
                        </span>
                      ))}
                      {lawyer.specialties.length > 2 && (
                        <span className="text-[8px] text-slate-400 self-center">+{lawyer.specialties.length - 2} more</span>
                      )}
                    </div>
                  </div>
                  <div className="self-center shrink-0 text-slate-300 group-hover:text-[#0B1B3D] transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 space-y-2">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-medium text-slate-500">No lawyers found matching your query.</p>
                <p className="text-[10px] text-slate-400">មិនរកឃើញមេធាវីដែលស្របតាមលក្ខខណ្ឌរបស់អ្នកឡើយ។</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Booking Dialog Modal Backdrop */}
      {isBooking && selectedLawyer && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-center z-50 animate-fade-in" id="booking-modal-overlay">
          <div className="bg-white rounded-t-2xl w-full max-h-[85%] overflow-y-auto p-4 space-y-4 shadow-xl flex flex-col translate-y-0 transition-transform">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Book Consultation</h3>
                <h4 className="text-sm font-bold text-[#0B1B3D]">With {selectedLawyer.name}</h4>
              </div>
              <button 
                onClick={() => setIsBooking(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold px-2 py-1 rounded hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleBookAppointment} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block uppercase">Select Date / ជ្រើសរើសថ្ងៃ</label>
                <input 
                  type="date" 
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#0B1B3D]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block uppercase">Select Time / ជ្រើសរើសម៉ោង</label>
                <select 
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#0B1B3D] bg-white"
                >
                  <option>09:00 AM</option>
                  <option>10:30 AM</option>
                  <option>02:00 PM</option>
                  <option>03:30 PM</option>
                  <option>05:00 PM</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block uppercase">Brief Legal Issue / ព័ត៌មានសង្ខេបពីករណីច្បាប់</label>
                <textarea 
                  rows={3}
                  placeholder="Tell us what you need help with (e.g. business lease contract dispute)..."
                  value={bookingReason}
                  onChange={(e) => setBookingReason(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#0B1B3D] resize-none"
                  required
                />
              </div>

              <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-[10px] text-amber-800 space-y-1">
                <p className="font-bold flex items-center">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 mr-1 shrink-0" />
                  Bilingual Support Provided
                </p>
                <p>Consultations are fully available in Khmer, English, and selected custom translation streams.</p>
              </div>

              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 text-xs font-bold shadow transition"
              >
                Confirm Booking / បញ្ជាក់ការកក់ទុក
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
