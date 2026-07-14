import React, { useState, useEffect } from 'react';
import { Smartphone, RotateCw, Monitor, Zap, Volume2, Wifi, Battery } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export default function MobileFrame({ children, isFullscreen, onToggleFullscreen }: MobileFrameProps) {
  const [deviceType, setDeviceType] = useState<'ios' | 'android'>('ios');
  const [currentTime, setCurrentTime] = useState('');
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(true);

  // Sync real-time formatted clock inside the status bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  // Simulate subtle battery depletion
  useEffect(() => {
    const batteryInterval = setInterval(() => {
      setBatteryLevel(prev => {
        if (prev <= 15) {
          setIsCharging(true);
          return 100; // recharge back to full for endless demo
        }
        return prev - 1;
      });
    }, 45000);

    return () => clearInterval(batteryInterval);
  }, []);

  if (isFullscreen) {
    return (
      <div className="w-full h-full relative" id="standalone-fullscreen-wrapper">
        {children}
        {/* Float floating widget to restore frame mode */}
        <button
          onClick={onToggleFullscreen}
          className="absolute bottom-4 right-4 bg-[#0B1B3D] hover:bg-slate-900 border border-amber-400 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-105 z-50 flex items-center space-x-1.5 text-xs font-bold"
        >
          <Monitor className="w-4 h-4 text-amber-400" />
          <span>Exit Full Screen</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4" id="device-simulator-wrapper">
      
      {/* Device Toolbar Switches */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl px-4 py-2 flex items-center justify-between w-full max-w-sm shrink-0">
        <span className="text-[11px] font-bold text-[#0B1B3D] uppercase tracking-wider">Device Preview</span>
        
        <div className="flex items-center space-x-2">
          {/* iOS Selector */}
          <button
            onClick={() => setDeviceType('ios')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition flex items-center space-x-1 ${
              deviceType === 'ios'
                ? 'bg-[#0B1B3D] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>iPhone</span>
          </button>

          {/* Android Selector */}
          <button
            onClick={() => setDeviceType('android')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition flex items-center space-x-1 ${
              deviceType === 'android'
                ? 'bg-[#0B1B3D] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Android</span>
          </button>

          {/* Fullscreen view */}
          <button
            onClick={onToggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
            title="Expand to Fullscreen"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Realistic Mobile Shell Hardware Frame */}
      <div className="relative mx-auto">
        
        {/* Left Side Physical Buttons (Volume Rockers) */}
        <div className="absolute left-[-3px] top-28 w-[3px] h-10 bg-slate-400 rounded-l shadow-inner z-0"></div>
        <div className="absolute left-[-3px] top-42 w-[3px] h-10 bg-slate-400 rounded-l shadow-inner z-0"></div>
        
        {/* Right Side Physical Button (Power / Wake Lock) */}
        <div className="absolute right-[-3px] top-32 w-[3px] h-14 bg-slate-400 rounded-r shadow-inner z-0"></div>

        {/* Smartphone bezel */}
        <div className="relative w-[340px] h-[670px] bg-slate-950 rounded-[48px] p-3 shadow-2xl border-4 border-slate-800 z-10 flex flex-col overflow-hidden">
          
          {/* Phone Inner Display Bezel Glass */}
          <div className="relative w-full h-full bg-slate-100 rounded-[38px] overflow-hidden flex flex-col select-none">
            
            {/* 1. iOS HARDWARE TOP STYLING (Notch / Dynamic Island) */}
            {deviceType === 'ios' ? (
              <div className="absolute top-0 left-0 right-0 h-9 bg-transparent z-40 flex items-center justify-between px-6 pointer-events-none text-black select-none">
                
                {/* Time Display Left */}
                <span className="text-[11px] font-extrabold text-white mix-blend-difference leading-none">
                  {currentTime || '09:41'}
                </span>

                {/* iPhone Dynamic Island Notch */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-black rounded-full flex items-center justify-end px-2">
                  {/* Subtle Camera Lens reflection dot */}
                  <span className="w-1.5 h-1.5 bg-[#0f172a] rounded-full border border-slate-900 shadow"></span>
                </div>

                {/* System Icons Right */}
                <div className="flex items-center space-x-1.5 text-white mix-blend-difference leading-none">
                  <span className="text-[9px] font-bold tracking-tight">Cellcard 5G</span>
                  <Wifi className="w-3 h-3" />
                  <div className="flex items-center space-x-0.5">
                    <span className="text-[8px] font-bold font-mono">{batteryLevel}%</span>
                    <Battery className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ) : (
              /* 2. ANDROID HARDWARE TOP STYLING (Punch-Hole Camera & Status Icons) */
              <div className="absolute top-0 left-0 right-0 h-7 bg-transparent z-40 flex items-center justify-between px-5 pointer-events-none text-black select-none">
                
                {/* Time Display Left */}
                <span className="text-[10px] font-bold text-white mix-blend-difference leading-none">
                  {currentTime || '09:41'}
                </span>

                {/* Tiny Centered Punch-Hole Camera */}
                <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full flex items-center justify-center">
                  <span className="w-1 h-1 bg-[#1e293b] rounded-full"></span>
                </div>

                {/* Status indicators right */}
                <div className="flex items-center space-x-1 text-white mix-blend-difference leading-none">
                  <span className="text-[8px] font-bold">Smart Axiata</span>
                  <Wifi className="w-2.5 h-2.5" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

            {/* Simulated App screen canvas inside device, pushed down under the status bar */}
            <div className={`w-full h-full pt-${deviceType === 'ios' ? '9' : '7'} pb-1 flex flex-col relative bg-slate-50`}>
              {children}
            </div>

            {/* 3. iOS BOTTOM HOME INDICATOR */}
            {deviceType === 'ios' && (
              <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-black/90 rounded-full z-40 pointer-events-none"></div>
            )}

            {/* 4. ANDROID BOTTOM NAVIGATION BAR (Optional overlay spacer) */}
            {deviceType === 'android' && (
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#0B1B3D] z-40 pointer-events-none flex items-center justify-center space-x-16 px-6">
                <div className="w-2 h-2 border border-white opacity-40 rotate-45 rounded-sm"></div>
                <div className="w-2.5 h-2.5 border-2 border-white opacity-40 rounded-full"></div>
                <div className="w-2.5 h-2.5 border-2 border-white opacity-40 rounded-sm"></div>
              </div>
            )}

          </div>
        </div>
      </div>
      
      {/* Device Specifications subtitle */}
      <p className="text-[9px] text-slate-400 text-center uppercase tracking-wider font-mono">
        Active Connection Status: {isCharging ? ' स्मार्ट Smart 5G' : 'Cellcard LTE'}
      </p>
    </div>
  );
}
