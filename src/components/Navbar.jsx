import React from 'react';
import { LayoutDashboard, Boxes, FileSpreadsheet, Settings } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, isDarkMode }) {
  const navItems = [
    { id: 'dashboard', label: 'หน้าหลัก', icon: LayoutDashboard },
    { id: 'inventory', label: 'คลังอะไหล่', icon: Boxes },
    { id: 'sales', label: 'ยอดขาย', icon: FileSpreadsheet },
    { id: 'settings', label: 'ตั้งค่า', icon: Settings },
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 px-4 pb-5 pt-2 bg-gradient-to-t transition-colors duration-300 ${
      isDarkMode ? 'from-slate-950 via-slate-950/90' : 'from-slate-50 via-slate-50/90'
    } to-transparent`}>
      <div className={`max-w-md mx-auto flex items-center justify-around h-16 rounded-2xl px-2 transition-all duration-300 border ${
        isDarkMode 
          ? 'dark-glass border-slate-800 shadow-[0_4px_30px_rgba(0,0,0,0.3)]' 
          : 'light-glass border-slate-200/80 shadow-[0_4px_25px_rgba(15,23,42,0.08)]'
      }`}>
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
                    ? (isDarkMode ? 'text-blue-400 bg-blue-500/10 scale-110' : 'text-blue-600 bg-blue-500/5 scale-110')
                    : (isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700')
                }`}
              >
                <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
              </div>
              <span
                className={`text-[10px] mt-0.5 font-bold transition-all duration-300 ${
                  isActive 
                    ? (isDarkMode ? 'text-blue-400 font-semibold' : 'text-blue-600 font-bold') 
                    : (isDarkMode ? 'text-slate-500' : 'text-slate-500')
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className={`absolute top-0 w-8 h-1 bg-blue-500 rounded-full ${
                  isDarkMode ? 'shadow-[0_0_8px_#3b82f6]' : 'shadow-[0_0_6px_rgba(37,99,235,0.4)]'
                }`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
