import React, { useState } from 'react';
import { 
  Scale, BookOpen, FileText, PhoneCall, MessageSquare, 
  Award, Sparkles, MapPin, Bookmark, ChevronRight, 
  HelpCircle, Info, Lock, Shield, Activity, Smartphone,
  ExternalLink, UserCheck, CheckCircle2, ChevronDown
} from 'lucide-react';
import MobileFrame from './components/MobileFrame';
import LawyerDirectory from './components/LawyerDirectory';
import DocumentTemplates from './components/DocumentTemplates';
import TextbookLibrary from './components/TextbookLibrary';
import LiveChat from './components/LiveChat';

type ScreenType = 'home' | 'lawyers' | 'documents' | 'books' | 'chat';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('home');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [initialLawyerInquiry, setInitialLawyerInquiry] = useState<string | null>(null);
  
  // Showcase simulator state triggers
  const [showNotification, setShowNotification] = useState(true);
  const [activeTab, setActiveTab] = useState<'info' | 'palette' | 'spec'>('info');

  const handleSelectLawyerForChat = (lawyerName: string) => {
    setInitialLawyerInquiry(lawyerName);
    setActiveScreen('chat');
  };

  const handleClearLawyerInquiry = () => {
    setInitialLawyerInquiry(null);
  };

  // Render the current active screen inside the phone simulator
  const renderMobileScreen = () => {
    switch (activeScreen) {
      case 'lawyers':
        return (
          <LawyerDirectory 
            onBackToHome={() => setActiveScreen('home')} 
            onSelectLawyerForChat={handleSelectLawyerForChat}
          />
        );
      case 'documents':
        return (
          <DocumentTemplates 
            onBackToHome={() => setActiveScreen('home')} 
          />
        );
      case 'books':
        return (
          <TextbookLibrary 
            onBackToHome={() => setActiveScreen('home')} 
          />
        );
      case 'chat':
        return (
          <LiveChat 
            onBackToHome={() => setActiveScreen('home')} 
            initialLawyerInquiry={initialLawyerInquiry}
            onClearLawyerInquiry={handleClearLawyerInquiry}
          />
        );
      default:
        return (
          /* Mobile Dashboard Home Screen */
          <div className="flex flex-col h-full bg-[#FAF9F5] text-slate-800 font-sans" id="mobile-home-screen">
            
            {/* Top Branding Header */}
            <div className="bg-[#0B1B3D] text-white px-4 py-3.5 flex items-center justify-between shadow-sm relative shrink-0">
              {/* Gold Ornament Accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-red-600 to-amber-400"></div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-red-600 border border-amber-400 flex items-center justify-center shadow-sm">
                  <Scale className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h1 className="text-xs font-bold leading-none tracking-tight text-white flex items-center">
                    Khmer Law Hub
                  </h1>
                  <p className="text-[8px] text-amber-300 font-bold font-mono mt-0.5">មជ្ឈមណ្ឌលច្បាប់ខ្មែរ</p>
                </div>
              </div>

              {/* Citizen/Lawyer mode badge */}
              <span className="bg-red-600 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-amber-300 shadow-sm">
                Portal
              </span>
            </div>

            {/* Scrollable Dashboard Body */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
              
              {/* Premium Welcome & Disclaimer Banner */}
              <div className="bg-gradient-to-br from-[#0B1B3D] to-[#1e3a75] rounded-2xl p-4 text-white relative overflow-hidden shadow-md">
                
                {/* Background Golden scales faint icon */}
                <Scale className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-amber-400/10 rotate-12" />
                
                <span className="bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded leading-none uppercase tracking-wide">
                  Official Resource
                </span>
                <h2 className="text-xs font-bold text-amber-400 mt-2">Bilingual Legal Gateway</h2>
                <h3 className="text-[10px] font-semibold text-slate-200 mt-0.5">ច្រកទ្វារច្បាប់ទ្វិភាសាកម្ពុជា</h3>
                
                <p className="text-[9px] text-slate-300 mt-2 leading-relaxed">
                  Access lawyer contact books, generate draft agreements compliant with the Civil Code (2007), and read textbooks instantly.
                </p>

                <div className="mt-3 flex items-center space-x-1 text-[8px] text-amber-300 font-semibold bg-black/20 px-2 py-1.5 rounded-lg w-max">
                  <Shield className="w-3 h-3 text-red-500" />
                  <span>100% Secure Server-Side AI</span>
                </div>
              </div>

              {/* Interactive Dashboard Navigation Grid */}
              <div className="space-y-2">
                <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-1">Feature Grid / ផ្នែកសំខាន់ៗ</h3>
                
                <div className="grid grid-cols-2 gap-3" id="feature-dashboard-grid">
                  
                  {/* Grid 1: Lawyer Directory */}
                  <div 
                    onClick={() => setActiveScreen('lawyers')}
                    className="bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl p-3 shadow-sm hover:shadow-md hover:border-[#0B1B3D] transition cursor-pointer flex flex-col justify-between h-[105px] group text-left"
                  >
                    <div className="bg-indigo-50 group-hover:bg-[#0B1B3D] group-hover:text-white transition rounded-xl p-2 w-max text-[#0B1B3D]">
                      <PhoneCall className="w-4 h-4 text-red-600 group-hover:text-amber-300 transition-colors" />
                    </div>
                    <div className="space-y-0.5 mt-2">
                      <h4 className="text-[11px] font-bold text-[#0B1B3D] group-hover:text-red-600 transition-colors">Lawyer Directory</h4>
                      <p className="text-[9px] font-bold text-red-600 leading-none">បញ្ជីឈ្មោះមេធាវី</p>
                      <p className="text-[8px] text-slate-400 mt-0.5 truncate">Experienced advocates</p>
                    </div>
                  </div>

                  {/* Grid 2: Legal Templates */}
                  <div 
                    onClick={() => setActiveScreen('documents')}
                    className="bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl p-3 shadow-sm hover:shadow-md hover:border-[#0B1B3D] transition cursor-pointer flex flex-col justify-between h-[105px] group text-left"
                  >
                    <div className="bg-indigo-50 group-hover:bg-[#0B1B3D] group-hover:text-white transition rounded-xl p-2 w-max text-[#0B1B3D] relative">
                      <FileText className="w-4 h-4 text-red-600 group-hover:text-amber-300 transition-colors" />
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full"></span>
                    </div>
                    <div className="space-y-0.5 mt-2">
                      <h4 className="text-[11px] font-bold text-[#0B1B3D] group-hover:text-red-600 transition-colors">Legal Templates</h4>
                      <p className="text-[9px] font-bold text-red-600 leading-none">គំរូឯកសារច្បាប់</p>
                      <p className="text-[8px] text-slate-400 mt-0.5 truncate">Contracts & lawsuits</p>
                    </div>
                  </div>

                  {/* Grid 3: Textbooks Library */}
                  <div 
                    onClick={() => setActiveScreen('books')}
                    className="bg-white hover:bg-slate-50 border border-slate-200/60 rounded-2xl p-3 shadow-sm hover:shadow-md hover:border-[#0B1B3D] transition cursor-pointer flex flex-col justify-between h-[105px] group text-left"
                  >
                    <div className="bg-indigo-50 group-hover:bg-[#0B1B3D] group-hover:text-white transition rounded-xl p-2 w-max text-[#0B1B3D]">
                      <BookOpen className="w-4 h-4 text-red-600 group-hover:text-amber-300 transition-colors" />
                    </div>
                    <div className="space-y-0.5 mt-2">
                      <h4 className="text-[11px] font-bold text-[#0B1B3D] group-hover:text-red-600 transition-colors">Law Library</h4>
                      <p className="text-[9px] font-bold text-red-600 leading-none">បណ្ណាល័យច្បាប់</p>
                      <p className="text-[8px] text-slate-400 mt-0.5 truncate">Civil & Criminal codes</p>
                    </div>
                  </div>

                  {/* Grid 4: Live AI Support (Crimson Highlighted) */}
                  <div 
                    onClick={() => setActiveScreen('chat')}
                    className="bg-[#C91D31] hover:bg-red-700 text-white rounded-2xl p-3 shadow-md hover:shadow-lg transition cursor-pointer flex flex-col justify-between h-[105px] relative overflow-hidden text-left"
                  >
                    <div className="absolute top-[-10px] right-[-10px] opacity-10">
                      <Sparkles className="w-20 h-20 text-white" />
                    </div>

                    <div className="bg-white/10 rounded-xl p-2 w-max text-amber-300">
                      <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
                    </div>
                    <div className="space-y-0.5 mt-2">
                      <h4 className="text-[11px] font-extrabold text-white">Live AI Support</h4>
                      <p className="text-[9px] font-bold text-amber-300 leading-none">ជំនួយការច្បាប់វៃឆ្លាត</p>
                      <p className="text-[8px] text-red-100 mt-0.5 truncate">Instant legal Q&A</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Notifications & legal Tip feed */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Legal Updates / ព័ត៌មានថ្មីៗ</h3>
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                </div>

                <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm space-y-2.5 text-left">
                  <div className="flex items-start space-x-2 text-xs">
                    <span className="bg-amber-100 text-amber-800 text-[8px] font-bold px-1.5 py-0.5 rounded shrink-0 font-mono">
                      CIVIL CODE
                    </span>
                    <div>
                      <p className="text-[10px] font-bold text-[#0B1B3D]">Ownership definitions clarified</p>
                      <p className="text-[8px] text-slate-400 mt-0.5">Read Civil Code Article 134 regarding the right to freely utilize property.</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-50 pt-2 flex items-start space-x-2 text-xs">
                    <span className="bg-red-100 text-red-800 text-[8px] font-bold px-1.5 py-0.5 rounded shrink-0 font-mono">
                      LABOR LAW
                    </span>
                    <div>
                      <p className="text-[10px] font-bold text-[#0B1B3D]">Work hours limits reminder</p>
                      <p className="text-[8px] text-slate-400 mt-0.5">Labor Law Article 137 reinforces standard working hours of max 48 hours per week.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Live Chat Floating Support Button */}
            <button 
              onClick={() => setActiveScreen('chat')}
              className="absolute bottom-6 right-6 bg-[#C91D31] hover:bg-red-700 text-white p-3 rounded-full shadow-lg hover:scale-105 transition duration-200 z-30 border border-amber-300 flex items-center justify-center"
              id="floating-live-chat-support"
              title="Open Live Legal Chat"
            >
              <MessageSquare className="w-5 h-5 text-amber-300" />
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" id="khmer-law-hub-app">
      
      {/* Top Spec Bar Header (Applet branding) */}
      <header className="bg-[#071124] border-b border-slate-800 py-3.5 px-6 shrink-0 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B1B3D] to-red-600 border border-amber-400 flex items-center justify-center shadow">
            <Scale className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-sm font-black tracking-wider text-white uppercase">
                Khmer Law Hub
              </h1>
              <span className="bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[8px] font-bold px-1.5 py-0.5 rounded leading-none">
                Interactive Showcase
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold font-mono">
              Bilingual Cambodian Legal Hub (មជ្ឈមណ្ឌលច្បាប់ខ្មែរ)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[9px] text-slate-400 font-mono">API State:</span>
          <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 rounded-full px-2.5 py-1 text-[9px] text-slate-300 font-mono">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>Gemini 3.5 Active</span>
          </div>
        </div>
      </header>

      {/* Main Double Column Workspace */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-0">
        
        {/* Left Column: Design Guide, Specs & Shortcuts (7 columns wide) */}
        <div className="lg:col-span-7 bg-[#071124] border border-slate-800 rounded-3xl p-5 flex flex-col space-y-5 justify-between min-h-[400px] shadow-xl text-left">
          <div className="space-y-4">
            {/* Tab navigation headers */}
            <div className="flex border-b border-slate-800 pb-1 shrink-0 space-x-4">
              <button
                onClick={() => setActiveTab('info')}
                className={`pb-2.5 text-xs font-bold relative transition-all ${
                  activeTab === 'info' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Project Concept
              </button>
              <button
                onClick={() => setActiveTab('palette')}
                className={`pb-2.5 text-xs font-bold relative transition-all ${
                  activeTab === 'palette' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Color Palette Specs
              </button>
              <button
                onClick={() => setActiveTab('spec')}
                className={`pb-2.5 text-xs font-bold relative transition-all ${
                  activeTab === 'spec' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Full-Stack Specs
              </button>
            </div>

            {/* TAB 1: Concept details */}
            {activeTab === 'info' && (
              <div className="space-y-4 animate-fade-in text-xs leading-relaxed text-slate-300" id="concept-tab">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">Khmer Law Hub (មជ្ឈមណ្ឌលច្បាប់ខ្មែរ)</h3>
                  <p>
                    A high-fidelity mobile prototype addressing the crucial need for legal clarity in Cambodia. This platform binds complex legal texts with everyday digital needs, supporting both Khmer citizens and legal experts.
                  </p>
                </div>

                {/* Main Interactive Shortcut Actions */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Interactive Simulator Shortcuts</h4>
                  <p className="text-[11px] text-slate-400">Click any shortcut to instantly trigger corresponding screens inside the phone mockup:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1" id="shortcut-grid">
                    <button
                      onClick={() => setActiveScreen('lawyers')}
                      className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400 p-2.5 rounded-xl text-left transition flex items-center justify-between text-xs font-medium"
                    >
                      <span className="flex items-center text-amber-400">
                        <UserCheck className="w-4 h-4 mr-1.5 text-red-500" />
                        Lawyer Directory Profiles
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setActiveScreen('documents')}
                      className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400 p-2.5 rounded-xl text-left transition flex items-center justify-between text-xs font-medium"
                    >
                      <span className="flex items-center text-amber-400">
                        <FileText className="w-4 h-4 mr-1.5 text-red-500" />
                        Document Customizer
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setActiveScreen('books')}
                      className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400 p-2.5 rounded-xl text-left transition flex items-center justify-between text-xs font-medium"
                    >
                      <span className="flex items-center text-amber-400">
                        <BookOpen className="w-4 h-4 mr-1.5 text-red-500" />
                        Bilingual Law E-Reader
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setActiveScreen('chat')}
                      className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400 p-2.5 rounded-xl text-left transition flex items-center justify-between text-xs font-medium"
                    >
                      <span className="flex items-center text-amber-400">
                        <Sparkles className="w-4 h-4 mr-1.5 text-red-500" />
                        Consult Kosal Legal AI
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900/40 rounded-xl p-3 border border-slate-800/60 text-slate-400 space-y-1">
                  <p className="font-bold text-white flex items-center text-[11px]">
                    <Info className="w-3.5 h-3.5 text-amber-400 mr-1 shrink-0" />
                    Bilingual Integration
                  </p>
                  <p className="text-[10px]">
                    This platform integrates elegant Khmer Unicode typography side-by-side with English content, honoring local professional specifications.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: Color Palette */}
            {activeTab === 'palette' && (
              <div className="space-y-4 animate-fade-in text-xs" id="palette-tab">
                <p className="text-slate-300">
                  The design leverages an authoritative, highly professional scheme representing dignity, trust, and national legal authority:
                </p>

                <div className="space-y-2.5">
                  {/* Navy Swatch */}
                  <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0B1B3D] border border-slate-700 shadow-inner"></div>
                      <div>
                        <h4 className="font-bold text-white">Deep Navy Blue</h4>
                        <p className="text-[10px] text-slate-400">Primary trust layer (ក្រសួងយុត្តិធម៌)</p>
                      </div>
                    </div>
                    <code className="text-amber-400 font-mono text-[11px]">#0B1B3D</code>
                  </div>

                  {/* Crimson Swatch */}
                  <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-[#C91D31] border border-slate-700 shadow-inner"></div>
                      <div>
                        <h4 className="font-bold text-white">Vibrant Crimson Red</h4>
                        <p className="text-[10px] text-slate-400">Buttons, highlights, alerts, notifications</p>
                      </div>
                    </div>
                    <code className="text-amber-400 font-mono text-[11px]">#C91D31</code>
                  </div>

                  {/* Gold/Yellow Swatch */}
                  <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F5B82E] border border-slate-700 shadow-inner"></div>
                      <div>
                        <h4 className="font-bold text-white">Warm Royal Yellow</h4>
                        <p className="text-[10px] text-slate-400">Khmer typography highlights & visual crowns</p>
                      </div>
                    </div>
                    <code className="text-amber-400 font-mono text-[11px]">#F5B82E</code>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Tech Specs */}
            {activeTab === 'spec' && (
              <div className="space-y-4 animate-fade-in text-xs text-slate-300" id="tech-specs-tab">
                <p>
                  This showcase is built as a complete, fully functional full-stack application (React SPA + Express Node Server + Gemini API) conforming with safe enterprise key standards:
                </p>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Security</span>
                    </div>
                    <p className="text-[10px] text-slate-400">API keys reside purely server-side. Browser connections call internal `/api/chat` proxies.</p>
                  </div>

                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
                      <Activity className="w-3.5 h-3.5 animate-pulse text-red-500" />
                      <span>Telemetry</span>
                    </div>
                    <p className="text-[10px] text-slate-400">Sets explicit telemetry user agents to maximize server connection logging.</p>
                  </div>
                </div>

                <div className="bg-slate-900/30 p-3 rounded-xl border border-slate-800 space-y-2 font-mono text-[10px] text-slate-400 text-left">
                  <p className="text-white font-bold">// Express Server Config</p>
                  <p>PORT: <span className="text-amber-400">3000</span> (container standard)</p>
                  <p>HOST: <span className="text-amber-400">0.0.0.0</span> (ingress routed)</p>
                  <p>MODEL: <span className="text-amber-400">"gemini-3.5-flash"</span></p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Legal Disclaimer footer */}
          <div className="border-t border-slate-800 pt-4 text-[10px] text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300">Disclaimer / សេចក្តីប្រកាសមិនទទួលខុសត្រូវ៖</p>
            <p className="leading-relaxed">
              This application is a high-fidelity visual and functional mockup. Legal documents and templates generated are for informational draft purposes only. Always consult a registered member of the Bar Association of Cambodia (BAKC) for formal courtroom representation.
            </p>
          </div>
        </div>

        {/* Right Column: Phone Mockup Container (5 columns wide) */}
        <div className="lg:col-span-5 flex items-center justify-center min-h-0">
          <MobileFrame 
            isFullscreen={isFullscreen} 
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
          >
            {renderMobileScreen()}
          </MobileFrame>
        </div>

      </main>
    </div>
  );
}
