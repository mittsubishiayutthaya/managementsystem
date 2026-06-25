import React from 'react';
import { LayoutDashboard, Boxes, FileSpreadsheet, Settings } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'หน้าหลัก', icon: LayoutDashboard },
    { id: 'inventory', label: 'คลังอะไหล่', icon: Boxes },
    { id: 'sales', label: 'ยอดขาย', icon: FileSpreadsheet },
    { id: 'settings', label: 'ตั้งค่า', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-5 pt-2 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 rounded-2xl glass-card px-2 glow-blue">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full relative transition-all duration-300"
            >
              <div
                className={`p-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-blue-400 bg-blue-500/10 scale-110'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
              </div>
              <span
                className={`text-[10px] mt-0.5 font-medium transition-all duration-300 ${
                  isActive ? 'text-blue-400 font-semibold' : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute top-0 w-8 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_#60a5fa]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
