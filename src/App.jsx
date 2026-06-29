import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import InventoryView from './components/InventoryView';
import SalesView from './components/SalesView';
import { mockData } from './data/mockData';
import { 
  Settings, 
  User, 
  MapPin, 
  Database, 
  Bell, 
  CheckCircle2, 
  ChevronRight,
  LayoutDashboard,
  Car,
  Calendar,
  Users,
  CreditCard,
  Truck,
  FileText,
  Smartphone,
  Monitor,
  Building,
  Sun,
  Moon,
  Download,
  Share2,
  PlusSquare
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [period, setPeriod] = useState('june'); // 'june' or 'may'
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' or 'mobile-sim'
  const [isDarkMode, setIsDarkMode] = useState(false); // default false: โทนสีขาวสบายตา
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Monitor window resize to auto-adapt defaults
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setViewMode('mobile-sim'); // force mobile view on small screens
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // trigger initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync isDarkMode to html element to support potential tailwind styling hooks
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle branch and period filters from desktop view
  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  // --- RENDER MOBILE VIEW (Simulated or native) ---
  const renderMobileView = () => {
    const renderActiveView = () => {
      switch (activeTab) {
        case 'dashboard':
          return (
            <DashboardView 
              selectedBranch={selectedBranch} 
              setSelectedBranch={setSelectedBranch} 
              period={period}
              setPeriod={setPeriod}
              isDarkMode={isDarkMode}
            />
          );
        case 'inventory':
          return <InventoryView isDarkMode={isDarkMode} />;
        case 'sales':
          return (
            <SalesView 
              selectedBranch={selectedBranch} 
              setSelectedBranch={setSelectedBranch} 
              isDarkMode={isDarkMode}
            />
          );
        case 'settings':
          return <MobileSettingsView isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
        default:
          return (
            <DashboardView 
              selectedBranch={selectedBranch} 
              setSelectedBranch={setSelectedBranch} 
              period={period}
              setPeriod={setPeriod}
              isDarkMode={isDarkMode}
            />
          );
      }
    };

    return (
      <div className={`min-h-full flex flex-col no-scrollbar transition-colors duration-300 ${
        isDarkMode ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
      }`}>
        {/* Brand Header */}
        <header className={`sticky top-0 z-40 px-4 py-3.5 border-b transition-colors duration-300 ${
          isDarkMode ? 'bg-[#0f172a]/95 border-slate-800' : 'bg-white/95 border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Building size={16} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-bold tracking-wide font-prompt leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  ระบบบริหารงานศูนย์บริการ
                </span>
                <span className={`text-[10px] tracking-wider font-semibold font-prompt uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Auto Center System
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Light/Dark Toggle Icon */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-xl transition-colors ${
                  isDarkMode ? 'bg-slate-900 border border-slate-800 text-amber-400' : 'bg-slate-100 border border-slate-200 text-slate-700'
                }`}
                title={isDarkMode ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด'}
              >
                {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              <div className={`flex items-center space-x-1.5 px-2 py-1 rounded-full border text-[10px] font-bold font-prompt ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>เชื่อมต่อสด</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full overflow-y-auto">
          {renderActiveView()}
        </main>

        {/* Bottom Navigation */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
      </div>
    );
  };

  // --- RENDER FULL DESKTOP VIEW (Refined to support Light/Dark theme & Dynamic metrics mapping) ---
  const renderDesktopView = () => {
    // Determine dynamic multipliers based on selected branch and period for realistic simulation
    let branchMultiplier = 1.0;
    let periodMultiplier = 1.0;
    
    if (selectedBranch === 'B01') branchMultiplier = 0.40;
    else if (selectedBranch === 'B02') branchMultiplier = 0.33;
    else if (selectedBranch === 'B03') branchMultiplier = 0.27;

    if (period === 'may') periodMultiplier = 0.92; // simulate lower sales in May

    // Rendered KPIs
    const bookingsTodayVal = Math.round(18 * branchMultiplier);
    const deliveriesTodayVal = Math.round(14 * branchMultiplier);
    const mtdSalesVal = 28.45 * branchMultiplier * periodMultiplier;
    const mtdCarsVal = Math.round(156 * branchMultiplier * periodMultiplier);

    const targetCarsVal = Math.round(200 * branchMultiplier);
    const targetSalesVal = 35.00 * branchMultiplier;

    const kpis = [
      { 
        title: 'ยอดจองวันนี้', 
        val: `${bookingsTodayVal} คัน`, 
        sub: `เมื่อวาน ${Math.round(12 * branchMultiplier)} คัน`, 
        trend: '+ 50.00%', 
        color: 'blue' 
      },
      { 
        title: 'ยอดส่งมอบวันนี้', 
        val: `${deliveriesTodayVal} คัน`, 
        sub: `เมื่อวาน ${Math.round(9 * branchMultiplier)} คัน`, 
        trend: '+ 55.56%', 
        color: 'green' 
      },
      { 
        title: 'ยอดขายรถยนต์สะสม', 
        val: `${mtdCarsVal} คัน`, 
        sub: `เป้าหมาย ${targetCarsVal} คัน`, 
        trend: `${Math.round((mtdCarsVal / targetCarsVal) * 100)}%`, 
        progress: Math.round((mtdCarsVal / targetCarsVal) * 100), 
        color: 'purple' 
      },
      { 
        title: 'กำไรขั้นต้นสะสม', 
        val: `${mtdSalesVal.toFixed(2)} ล้านบาท`, 
        sub: `เป้าหมาย ${targetSalesVal.toFixed(2)} ล้านบาท`, 
        trend: `${Math.round((mtdSalesVal / targetSalesVal) * 100)}%`, 
        progress: Math.round((mtdSalesVal / targetSalesVal) * 100), 
        color: 'orange' 
      }
    ];

    // Branch performance totals
    const branchPerformance = [
      { name: 'Mitsubishi อยุธยา 1', sales: 198, percent: '35.5%', color: '#3b82f6', active: selectedBranch === 'ALL' || selectedBranch === 'B01' },
      { name: 'Mitsubishi อยุธยา 2', sales: 162, percent: '29.0%', color: '#a855f7', active: selectedBranch === 'ALL' || selectedBranch === 'B02' },
      { name: 'OMODA & JAECOO อยุธยา', sales: 198, percent: '35.5%', color: '#10b981', active: selectedBranch === 'ALL' || selectedBranch === 'B03' }
    ];

    // Aging report breakdown
    const agingReport = [
      { range: '0 - 30 วัน', count: Math.round(145 * branchMultiplier), value: (116.0 * branchMultiplier).toFixed(1), percent: '20.5%', color: 'bg-emerald-600' },
      { range: '31 - 60 วัน', count: Math.round(124 * branchMultiplier), value: (99.2 * branchMultiplier).toFixed(1), percent: '17.6%', color: 'bg-green-700' },
      { range: '61 - 90 วัน', count: Math.round(87 * branchMultiplier), value: (69.6 * branchMultiplier).toFixed(1), percent: '12.3%', color: 'bg-amber-600' },
      { range: '91 - 120 วัน', count: Math.round(42 * branchMultiplier), value: (33.6 * branchMultiplier).toFixed(1), percent: '6.0%', color: 'bg-orange-600' },
      { range: 'มากกว่า 120 วัน', count: Math.round(22 * branchMultiplier), value: (17.6 * branchMultiplier).toFixed(1), percent: '3.1%', color: 'bg-rose-600' }
    ];

    // Over 90 Days Inventory
    const over90Days = [
      { vin: 'MHRKA8120PJ100001', model: 'HR-V EL', color: 'ขาวพรีเมียม', branch: 'อยุธยา 1', age: 132 },
      { vin: 'MR2B381H0PJ200002', model: 'CIVIC EL+', color: 'เทาเมทัลลิก', branch: 'อยุธยา 2', age: 121 },
      { vin: 'PM2E381A0PJ300003', model: 'MAZDA 3 S', color: 'แดง', branch: 'OMODA อยุธยา', age: 118 },
      { vin: 'MZ2E481H0PJ400004', model: 'CX-30 C', color: 'น้ำเงิน', branch: 'อยุธยา 1', age: 115 },
      { vin: 'PL2BA81A0PJ500005', model: 'MG 5 D', color: 'ดำ', branch: 'อยุธยา 2', age: 102 }
    ].filter(car => {
      if (selectedBranch === 'ALL') return true;
      if (selectedBranch === 'B01' && car.branch === 'อยุธยา 1') return true;
      if (selectedBranch === 'B02' && car.branch === 'อยุธยา 2') return true;
      if (selectedBranch === 'B03' && car.branch === 'OMODA อยุธยา') return true;
      return false;
    });

    const isDark = isDarkMode;

    return (
      <div className={`flex h-screen overflow-hidden font-prompt transition-colors duration-300 ${
        isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#f8fafc] text-[#0f172a]'
      }`}>
        {/* Left Sidebar (Stays elegant dark slate in both modes) */}
        <aside className="w-64 bg-[#0f172a] border-r border-slate-800 flex flex-col justify-between p-4 shrink-0">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 px-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                <Building size={18} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-wider leading-tight">ระบบบริหารศูนย์บริการ</span>
                <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">AUTO CENTER SYSTEM</span>
              </div>
            </div>

            <nav className="space-y-1">
              {[
                { label: 'หน้าหลัก (Home)', icon: LayoutDashboard, active: activeTab === 'dashboard', tabId: 'dashboard' },
                { label: 'สถิติคลังอะไหล่', icon: Boxes, active: activeTab === 'inventory', tabId: 'inventory' },
                { label: 'ประวัติยอดขายรถ', icon: Car, active: activeTab === 'sales', count: '5', tabId: 'sales' },
                { label: 'การตั้งค่าระบบ', icon: Settings, active: activeTab === 'settings', tabId: 'settings' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(item.tabId)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    item.active
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon size={15} />
                    <span>{item.label}</span>
                  </div>
                  {item.count && (
                    <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded-full text-slate-300 font-bold border border-slate-800">
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 border border-slate-700">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="avatar" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-200">คุณสมชาย วัฒนกิจ</span>
                <span className="text-[10px] text-slate-500">เจ้าของกิจการ</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content Dashboard */}
        <main className={`flex-1 flex flex-col overflow-y-auto transition-colors duration-300 ${
          isDark ? 'bg-[#0b0f19]' : 'bg-[#f8fafc]'
        }`}>
          {/* Header */}
          <header className={`sticky top-0 z-30 transition-colors duration-300 border-b ${
            isDark ? 'bg-[#0f172a]/95 border-slate-800' : 'bg-white/95 border-slate-200 shadow-sm'
          } px-6 py-4 flex items-center justify-between`}>
            <div className="flex flex-col">
              <h2 className={`text-lg font-bold font-prompt ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {activeTab === 'dashboard' ? 'แผงควบคุมระบบ (Executive Dashboard)' :
                 activeTab === 'inventory' ? 'ระบบตรวจคลังสินค้าอะไหล่ (Inventory Manager)' :
                 activeTab === 'sales' ? 'ระบบสถิติประวัติยอดขายรถยนต์ (Sales Tracker)' : 'การตั้งค่าระบบ (Settings Portal)'}
              </h2>
              <p className="text-xs text-slate-400">ภาพรวมการควบคุมงานสาขากรุงเทพฯ และเขตภาคตะวันออก</p>
            </div>

            <div className="flex items-center space-x-3">
              {/* Theme Toggle Button */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2.5 rounded-xl border flex items-center justify-center transition-colors ${
                  isDark ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
                title={isDark ? 'เปิดโหมดสว่าง' : 'เปิดโหมดมืด'}
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              <div className={`border rounded-xl px-3 py-2 text-xs font-bold ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                รอบบัญชี: {period === 'june' ? 'มิถุนายน 2569 (ปัจจุบัน)' : 'พฤษภาคม 2569'}
              </div>

              {/* Branch Filter dropdown */}
              <select 
                value={selectedBranch}
                onChange={handleBranchChange}
                className={`border rounded-xl px-3 py-2 text-xs font-bold focus:outline-none ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <option value="ALL">แสดงผล: รวมทุกสาขา</option>
                {mockData.branches.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
          </header>

          {/* Render correct tab content or default dashboard grid */}
          {activeTab !== 'dashboard' ? (
            <div className="p-6">
              {activeTab === 'inventory' && <InventoryView isDarkMode={isDarkMode} />}
              {activeTab === 'sales' && <SalesView selectedBranch={selectedBranch} setSelectedBranch={setSelectedBranch} isDarkMode={isDarkMode} />}
              {activeTab === 'settings' && <DesktopSettingsView isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
            </div>
          ) : (
            /* Dashboard layout */
            <div className="p-6 space-y-6">
              {/* Top 4 KPI Cards Grid */}
              <div className="grid grid-cols-4 gap-4">
                {kpis.map((kpi, idx) => (
                  <div key={idx} className={`rounded-2xl p-5 flex flex-col justify-between h-36 border transition-all duration-300 ${
                    isDark ? 'dark-glass border-slate-850' : 'light-glass border-slate-200/80'
                  }`}>
                    <div className="flex items-start justify-between">
                      <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{kpi.title}</span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                        kpi.color === 'blue' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                        kpi.color === 'green' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        kpi.color === 'purple' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                        'bg-orange-500/10 text-orange-500 border-orange-500/20'
                      }`}>
                        {kpi.trend}
                      </span>
                    </div>

                    <div className="mt-2">
                      <h3 className={`text-2xl font-bold tracking-tight font-prompt ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {kpi.val}
                      </h3>
                      <p className={`text-xs mt-1 font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        {kpi.sub}
                      </p>
                    </div>

                    {kpi.progress && (
                      <div className={`w-full h-2 rounded-full overflow-hidden mt-3 border ${
                        isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
                      }`}>
                        <div 
                          className={`h-full rounded-full ${
                            kpi.color === 'purple' ? 'bg-purple-600' : 'bg-orange-500'
                          }`}
                          style={{ width: `${kpi.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Middle Section: Comparison Chart & Branch Breakdowns */}
              <div className="grid grid-cols-3 gap-6">
                
                {/* Grouped Bar Chart */}
                <div className={`col-span-2 rounded-2xl p-5 border transition-all duration-300 ${
                  isDark ? 'dark-glass border-slate-850' : 'light-glass border-slate-200/80'
                } space-y-4`}>
                  <div className="flex justify-between items-center">
                    <h3 className={`text-xs font-bold tracking-wider uppercase ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      เปรียบเทียบยอดจำหน่ายรถยนต์สะสมรายเดือน (ปี 2568 - 2569)
                    </h3>
                    <div className="flex space-x-3 text-[11px] font-bold text-slate-400">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2.5 h-2.5 rounded bg-blue-500" />
                        <span>ปี 2569</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2.5 h-2.5 rounded bg-slate-400" />
                        <span>ปี 2568</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Double Grouped Bar Chart with Grid Lines */}
                  <div className="relative h-60 w-full pt-4">
                    <div className="absolute inset-x-0 top-4 bottom-8 flex flex-col justify-between pointer-events-none">
                      <div className={`w-full border-t ${isDark ? 'border-slate-800/40' : 'border-slate-200/60'}`} />
                      <div className={`w-full border-t ${isDark ? 'border-slate-800/40' : 'border-slate-200/60'}`} />
                      <div className={`w-full border-t ${isDark ? 'border-slate-800/40' : 'border-slate-200/60'}`} />
                      <div className={`w-full border-t ${isDark ? 'border-slate-800/40' : 'border-slate-200/60'}`} />
                      <div className={`w-full border-b ${isDark ? 'border-slate-700' : 'border-slate-300'}`} />
                    </div>

                    <div className="h-full w-full flex items-end justify-between px-2 relative z-10">
                      {[
                        { m: 'ม.ค.', v1: 90, v2: 60 },
                        { m: 'ก.พ.', v1: 100, v2: 65 },
                        { m: 'มี.ค.', v1: 110, v2: 70 },
                        { m: 'เม.ย.', v1: 95, v2: 80 },
                        { m: 'พ.ค.', v1: 156, v2: 90 },
                        { m: 'มิ.ย.', v1: 140, v2: 100 },
                        { m: 'ก.ค.', v1: 120, v2: 110 },
                        { m: 'ส.ค.', v1: 135, v2: 95 },
                        { m: 'ก.ย.', v1: 150, v2: 105 },
                        { m: 'ต.ค.', v1: 130, v2: 115 },
                        { m: 'พ.ย.', v1: 145, v2: 120 },
                        { m: 'ธ.ค.', v1: 160, v2: 130 }
                      ].map((d, index) => (
                        <div key={index} className="flex flex-col items-center flex-1 h-full justify-end pb-8">
                          <div className="flex items-end space-x-1 h-36">
                            <div 
                              className={`w-3 rounded-t ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} 
                              style={{ height: `${d.v2 * branchMultiplier}%` }}
                            />
                            <div 
                              className="w-3 bg-blue-500 rounded-t" 
                              style={{ height: `${d.v1 * branchMultiplier * periodMultiplier}%` }}
                            />
                          </div>
                          <span className={`text-[10px] font-bold mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{d.m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Branch Share & Top 5 Salespersons */}
                <div className={`rounded-2xl p-5 border transition-all duration-300 ${
                  isDark ? 'dark-glass border-slate-850' : 'light-glass border-slate-200/80'
                } flex flex-col justify-between`}>
                  <div>
                    <h3 className={`text-xs font-bold tracking-wider uppercase mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      สัดส่วนยอดจำหน่ายแบ่งตามรายสาขา
                    </h3>
                    
                    <div className="space-y-4">
                      {branchPerformance.map((b, idx) => (
                        <div key={idx} className={`space-y-1 ${b.active ? 'opacity-100' : 'opacity-30'}`}>
                          <div className="flex justify-between text-xs font-bold">
                            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{b.name}</span>
                            <span className={isDark ? 'text-white' : 'text-slate-900'}>{Math.round(b.sales * periodMultiplier)} คัน</span>
                          </div>
                          <div className={`w-full h-2.5 rounded-full overflow-hidden border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                            <div 
                              className="h-full rounded-full"
                              style={{ width: b.percent, backgroundColor: b.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} pt-4 mt-4`}>
                    <h3 className={`text-xs font-bold tracking-wider uppercase mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      อันดับยอดขายพนักงานดีเด่น
                    </h3>
                    <div className="space-y-3">
                      {mockData.salesperson_ranking.slice(0, 3).map((rep, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2">
                            <span className="text-amber-500 font-bold">#{idx + 1}</span>
                            <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{rep.name}</span>
                          </div>
                          <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{rep.sales} คัน</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Section: Stock Status Row */}
              <div className={`rounded-2xl p-4 border transition-all duration-300 ${
                isDark ? 'dark-glass border-slate-850' : 'light-glass border-slate-200/80'
              }`}>
                <h3 className={`text-xs font-bold tracking-wider uppercase mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  สรุปรายละเอียดปริมาณยานยนต์ในระบบ
                </h3>
                <div className="grid grid-cols-5 gap-3">
                  {[
                    { label: 'พร้อมขายทั้งหมด', val: `${Math.round(320 * branchMultiplier)} คัน`, desc: 'สัดส่วน 45.1%', color: isDark ? 'text-blue-400 bg-blue-500/5' : 'text-blue-600 bg-blue-500/5 border border-blue-100' },
                    { label: 'ทำสัญญาจองแล้ว', val: `${Math.round(87 * branchMultiplier)} คัน`, desc: 'สัดส่วน 12.3%', color: isDark ? 'text-emerald-400 bg-emerald-500/5' : 'text-emerald-600 bg-emerald-500/5 border border-emerald-100' },
                    { label: 'ลูกค้าขอไฟแนนซ์', val: `${Math.round(56 * branchMultiplier)} คัน`, desc: 'สัดส่วน 7.9%', color: isDark ? 'text-purple-400 bg-purple-500/5' : 'text-purple-600 bg-purple-500/5 border border-purple-100' },
                    { label: 'รอตรวจรถส่งมอบ', val: `${Math.round(24 * branchMultiplier)} คัน`, desc: 'สัดส่วน 3.4%', color: isDark ? 'text-orange-400 bg-orange-500/5' : 'text-orange-600 bg-orange-500/5 border border-orange-100' },
                    { label: 'ส่งมอบสำเร็จแล้ว', val: `${Math.round(156 * branchMultiplier * periodMultiplier)} คัน`, desc: 'สัดส่วน 22.0%', color: isDark ? 'text-emerald-400 bg-emerald-500/5' : 'text-emerald-600 bg-emerald-500/5 border border-emerald-100' }
                  ].map((s, idx) => (
                    <div key={idx} className={`p-4 rounded-xl flex flex-col justify-between h-20 ${s.color}`}>
                      <span className={`text-[11px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{s.label}</span>
                      <div className="flex items-end justify-between mt-1">
                        <span className={`text-base font-bold font-prompt ${isDark ? 'text-white' : 'text-slate-900'}`}>{s.val}</span>
                        <span className="text-[10px] font-bold">{s.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tables: Aging and Over 90 Days Stock */}
              <div className="grid grid-cols-3 gap-6">
                
                {/* Aging Report table */}
                <div className={`rounded-2xl p-5 border transition-all duration-300 ${
                  isDark ? 'dark-glass border-slate-850' : 'light-glass border-slate-200/80'
                } space-y-4`}>
                  <h3 className={`text-xs font-bold tracking-wider uppercase ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Aging Report (อายุสต็อกค้างของศูนย์)
                  </h3>
                  
                  <div className="space-y-3 pt-1">
                    {agingReport.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                          <span className={`font-bold w-24 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item.range}</span>
                        </div>
                        <span className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.count} คัน</span>
                        <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Over 90 Days stock list */}
                <div className={`col-span-2 rounded-2xl p-5 border transition-all duration-300 ${
                  isDark ? 'dark-glass border-slate-850' : 'light-glass border-slate-200/80'
                } space-y-4`}>
                  <div className="flex justify-between items-center">
                    <h3 className={`text-xs font-bold tracking-wider uppercase ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      รายการตัวถังรถยนต์จอดค้างสต็อกเกิน 90 วัน
                    </h3>
                    <span className="text-xs text-rose-600 bg-rose-500/10 border border-rose-500/25 px-2.5 py-0.5 rounded-full font-bold">ต้องติดตามผล</span>
                  </div>

                  <div className="overflow-x-auto w-full custom-scrollbar">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className={`border-b text-[11px] pb-2 font-bold ${
                          isDark ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'
                        }`}>
                          <th className="pb-2">เลขตัวถัง (VIN)</th>
                          <th className="pb-2">รุ่นรถยนต์</th>
                          <th className="pb-2">สีภายนอก</th>
                          <th className="pb-2">สาขาถึอครอง</th>
                          <th className="pb-2 text-right">อายุสต็อก</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDark ? 'divide-slate-850' : 'divide-slate-100'}`}>
                        {over90Days.map((c, idx) => (
                          <tr key={idx} className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                            <td className="py-3 font-mono text-xs text-slate-400">{c.vin}</td>
                            <td className={`py-3 font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{c.model}</td>
                            <td className="py-3 font-semibold">{c.color}</td>
                            <td className="py-3 font-semibold">{c.branch}</td>
                            <td className="py-3 text-right font-bold text-rose-500">{c.age} วัน</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>
          )}
        </main>
      </div>
    );
  };

  // --- RENDER MAIN LAYOUT ---
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#f8fafc] text-[#0f172a]'
    }`}>
      {/* Top bar for view simulation toggle */}
      {windowWidth >= 768 && (
        <div className={`border-b px-4 py-2 flex items-center justify-between text-xs z-50 shrink-0 font-prompt transition-colors duration-300 ${
          isDarkMode ? 'bg-[#0f172a] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-600 shadow-sm'
        }`}>
          <div className="flex items-center space-x-1.5">
            <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>⚙️ ระบบทดสอบแบบจำลอง:</span>
            <span className="text-[11px] text-slate-400 font-medium">(คลิกสลับมุมมองในการตรวจสอบที่นี่)</span>
          </div>

          <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-md transition-colors font-medium ${
                viewMode === 'desktop'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor size={12} />
              <span>โหมดเดสก์ท็อป (รายงาน 12 เดือนเต็ม)</span>
            </button>
            
            <button
              onClick={() => setViewMode('mobile-sim')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-md transition-colors font-medium ${
                viewMode === 'mobile-sim'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone size={12} />
              <span>โหมดโทรศัพท์มือถือ (Mobile View)</span>
            </button>
          </div>
        </div>
      )}

      {/* Render selected view */}
      {viewMode === 'desktop' ? (
        renderDesktopView()
      ) : (
        // Simulated Mobile Device frame container
        <div className={`flex-1 flex items-center justify-center p-4 relative overflow-hidden transition-colors ${
          isDarkMode ? 'bg-slate-900/20' : 'bg-slate-100/50'
        }`}>
          {windowWidth >= 768 ? (
            /* Outer smartphone border mock frame */
            <div className={`w-[375px] h-[780px] rounded-[40px] border-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative flex flex-col outline outline-1 ${
              isDarkMode ? 'bg-slate-950 border-slate-800 outline-slate-800' : 'bg-white border-slate-300 outline-slate-200'
            }`}>
              {/* Speaker & camera notch mockup */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-5 w-32 rounded-b-2xl z-50 flex items-center justify-center ${
                isDarkMode ? 'bg-slate-850' : 'bg-slate-200'
              }`}>
                <div className={`w-10 h-1 rounded-full mb-1 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-400'}`} />
              </div>
              <div className="flex-1 overflow-hidden relative flex flex-col mt-2 rounded-[28px]">
                {renderMobileView()}
              </div>
            </div>
          ) : (
            /* Direct viewport on real mobile device */
            <div className="fixed inset-0 w-full h-full">
              {renderMobileView()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Mobile Settings Sub-Component (Larger texts + PWA Guidelines)
function MobileSettingsView({ isDarkMode, setIsDarkMode }) {
  const [lineAlerts, setLineAlerts] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  return (
    <div className="pb-32 pt-4 px-4 max-w-md mx-auto space-y-6 font-prompt">
      <div>
        <h1 className="text-lg font-bold tracking-tight">การตั้งค่าระบบ</h1>
        <p className="text-xs text-slate-400">ข้อมูลบัญชี สาขา และการติดตั้งเป็นแอปมือถือ</p>
      </div>

      {/* Account Info */}
      <div className={`rounded-2xl p-4 flex items-center space-x-4 border shadow-sm ${
        isDarkMode ? 'dark-glass border-slate-800' : 'light-glass border-slate-200'
      }`}>
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
          <User size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold truncate">คุณสมชาย วัฒนกิจ</h3>
          <p className="text-xs text-slate-500">เจ้าของกิจการ / Owner</p>
          <div className="inline-block text-[10px] bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold mt-1.5">
            สิทธิ์การเข้าถึง: Super Admin
          </div>
        </div>
      </div>

      {/* PWA Setup Guide Card (Requested to be here to avoid clutter) */}
      <div className={`rounded-2xl p-4 border space-y-4 ${
        isDarkMode ? 'dark-glass border-slate-800' : 'light-glass border-slate-200'
      }`}>
        <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center space-x-1.5">
          <Smartphone size={13} className="text-blue-500" />
          <span>วิธีการติดตั้งเป็นแอปบนมือถือ (PWA)</span>
        </h3>

        <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
          <p className="font-semibold text-slate-800 dark:text-slate-100">
            คุณสามารถติดตั้งหน้าแดชบอร์ดนี้เป็นแอปพลิเคชันบนหน้าจอหลักของโทรศัพท์เพื่อเปิดดูแบบเต็มจอได้ง่ายๆ:
          </p>
          
          <div className="space-y-3 pl-1 border-l-2 border-blue-500/40">
            <div className="space-y-1">
              <p className="font-bold flex items-center text-slate-800 dark:text-slate-100">
                <span className="w-5 h-5 rounded-full bg-blue-600/10 text-blue-500 flex items-center justify-center text-[10px] mr-2">1</span>
                สำหรับโทรศัพท์ iPhone (Safari):
              </p>
              <p className="pl-7 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                แตะที่ปุ่ม <span className="font-bold text-slate-700 dark:text-slate-200 inline-flex items-center"><Share2 size={11} className="mx-0.5" /> แชร์ (Share)</span> ด้านล่างของ Safari แล้วเลือก <span className="font-bold text-slate-700 dark:text-slate-200 inline-flex items-center"><PlusSquare size={11} className="mx-0.5" /> "เพิ่มไปยังหน้าจอโฮม" (Add to Home Screen)</span>
              </p>
            </div>

            <div className="space-y-1">
              <p className="font-bold flex items-center text-slate-800 dark:text-slate-100">
                <span className="w-5 h-5 rounded-full bg-blue-600/10 text-blue-500 flex items-center justify-center text-[10px] mr-2">2</span>
                สำหรับโทรศัพท์ Android (Chrome):
              </p>
              <p className="pl-7 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                แตะที่ <span className="font-bold text-slate-700 dark:text-slate-200">ปุ่ม 3 จุด</span> มุมขวาบน แล้วเลือกเมนู <span className="font-bold text-slate-700 dark:text-slate-200 inline-flex items-center"><Download size={11} className="mx-0.5" /> "ติดตั้งแอป" (Install app)</span> หรือ "เพิ่มลงในหน้าจอหลัก"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Branches list */}
      <div className={`rounded-2xl p-4 space-y-3 border ${
        isDarkMode ? 'dark-glass border-slate-800' : 'light-glass border-slate-200'
      }`}>
        <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center space-x-1.5">
          <MapPin size={13} className="text-slate-500" />
          <span>ศูนย์บริการเชื่อมต่อโครงข่าย</span>
        </h3>

        <div className="space-y-2">
          {mockData.branches.map(b => (
            <div key={b.id} className={`flex items-center justify-between p-3 rounded-xl border ${
              isDarkMode ? 'bg-slate-900/30 border-slate-900' : 'bg-slate-50 border-slate-150'
            }`}>
              <div className="flex flex-col">
                <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>{b.name}</span>
                <span className="text-[10px] text-slate-500 font-mono font-semibold">ID: {b.id}</span>
              </div>
              <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                ออนไลน์
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Configurations Card */}
      <div className={`rounded-2xl p-4 space-y-4 border ${
        isDarkMode ? 'dark-glass border-slate-800' : 'light-glass border-slate-200'
      }`}>
        <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center space-x-1.5 font-prompt">
          <Bell size={13} className="text-slate-500" />
          <span>การแจ้งเตือนและการสลับโหมด</span>
        </h3>

        <div className="space-y-4 pt-1">
          {/* Toggle Theme */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col pr-4">
              <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>เปิดโหมดมืด (Dark Mode)</span>
              <span className="text-[10px] text-slate-500 mt-0.5">เปลี่ยนหน้าตาเว็บเป็นสีคาร์บอนกรมท่าขรึม</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input 
                type="checkbox" 
                checked={isDarkMode} 
                onChange={() => setIsDarkMode(!isDarkMode)} 
                className="sr-only peer" 
              />
              <div className="w-10 h-6 bg-slate-300 dark:bg-slate-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col pr-4">
              <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>ส่งแจ้งเตือนผ่าน LINE Notify</span>
              <span className="text-[10px] text-slate-500 mt-0.5">แจ้งเตือนเรื่องอะไหล่ใกล้หมดหรือยอดจองใหม่ทันที</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input 
                type="checkbox" 
                checked={lineAlerts} 
                onChange={() => setLineAlerts(!lineAlerts)} 
                className="sr-only peer" 
              />
              <div className="w-10 h-6 bg-slate-300 dark:bg-slate-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col pr-4">
              <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>ซิงก์ข้อมูลอัตโนมัติ (Background Sync)</span>
              <span className="text-[10px] text-slate-500 mt-0.5">ดึงข้อมูลสต็อกแยกรายสาขาใหม่ในเบื้องหลังทุก 5 นาที</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input 
                type="checkbox" 
                checked={autoSync} 
                onChange={() => setAutoSync(!autoSync)} 
                className="sr-only peer" 
              />
              <div className="w-10 h-6 bg-slate-300 dark:bg-slate-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white"></div>
            </label>
          </div>
        </div>
      </div>

      <div className={`rounded-2xl p-4 space-y-3 border ${
        isDarkMode ? 'dark-glass border-slate-800' : 'light-glass border-slate-200'
      }`}>
        <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center space-x-1.5 font-prompt">
          <Database size={13} className="text-slate-500" />
          <span>การจัดการฐานข้อมูล</span>
        </h3>

        <div className="space-y-2">
          <button 
            onClick={() => alert('ล้างแคชบราวเซอร์จำลองสำเร็จ')}
            className={`w-full text-left text-xs font-bold border hover:bg-slate-800/20 p-3.5 rounded-xl flex items-center justify-between ${
              isDarkMode ? 'bg-slate-950/40 border-slate-900 text-slate-300' : 'bg-white border-slate-150 text-slate-700'
            }`}
          >
            <span>ล้างข้อมูลที่บันทึกชั่วคราวในอุปกรณ์</span>
            <ChevronRight size={14} className="text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Desktop Settings Sub-Component (PWA Guidelines included)
function DesktopSettingsView({ isDarkMode, setIsDarkMode }) {
  return (
    <div className="space-y-6 font-prompt max-w-4xl">
      <div className="grid grid-cols-2 gap-6">
        
        {/* PWA Guidelines Card */}
        <div className={`rounded-2xl p-5 border space-y-4 ${
          isDarkMode ? 'dark-glass border-slate-800' : 'light-glass border-slate-200'
        }`}>
          <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center space-x-1.5">
            <Smartphone size={15} className="text-blue-500" />
            <span>การติดตั้งเป็นแอปบนมือถือสำหรับผู้บริหาร (PWA Installation)</span>
          </h3>

          <div className="space-y-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            <p className="font-semibold text-slate-800 dark:text-slate-100">
              หน้าแดชบอร์ดนี้รองรับเทคโนโลยี PWA ทำให้คุณติดตั้งลงบนหน้าจอมือถือเปรียบเสมือนแอปพลิเคชันจริงได้ เพื่อเปิดดูแบบเต็มตาโดยไม่มีแถบ URL บดบัง:
            </p>
            
            <div className="space-y-3.5">
              <div className="space-y-1">
                <p className="font-bold text-slate-800 dark:text-slate-100 flex items-center">
                  📱 ระบบปฏิบัติการ iOS (iPhone / Safari):
                </p>
                <p className="pl-4 text-slate-500 dark:text-slate-400">
                  1. เปิด Safari แล้วเข้าลิงก์เว็บแอปพลิเคชันนี้<br />
                  2. แตะปุ่ม <span className="font-bold text-slate-700 dark:text-slate-200">"แชร์" (Share - ไอคอนกล่องพร้อมลูกศรชี้ขึ้น)</span> ที่แถบเครื่องมือล่าง<br />
                  3. เลื่อนหาและเลือกคำสั่ง <span className="font-bold text-slate-700 dark:text-slate-200">"เพิ่มไปยังหน้าจอโฮม" (Add to Home Screen)</span>
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-slate-800 dark:text-slate-100 flex items-center">
                  🤖 ระบบปฏิบัติการ Android (Google Chrome):
                </p>
                <p className="pl-4 text-slate-500 dark:text-slate-400">
                  1. เปิด Chrome แล้วเข้าลิงก์เว็บแอปพลิเคชันนี้<br />
                  2. แตะที่ <span className="font-bold text-slate-700 dark:text-slate-200">ปุ่มจุดสามจุด</span> ที่มุมขวาบนของเบราว์เซอร์<br />
                  3. แตะเลือกคำสั่ง <span className="font-bold text-slate-700 dark:text-slate-200">"ติดตั้งแอป" (Install app)</span> หรือ "เพิ่มลงในหน้าจอหลัก"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Configuration Toggles */}
        <div className={`rounded-2xl p-5 border space-y-4 ${
          isDarkMode ? 'dark-glass border-slate-800' : 'light-glass border-slate-200'
        }`}>
          <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3">การปรับแต่งรูปลักษณ์ภายนอก</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>เปิดโหมดมืด (Dark Mode Override)</span>
                <span className="text-[10px] text-slate-500">ปรับเปลี่ยนการแสดงผลทั้งหมดเป็นธีมคาร์บอนกรมท่าขรึม</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input 
                  type="checkbox" 
                  checked={isDarkMode} 
                  onChange={() => setIsDarkMode(!isDarkMode)} 
                  className="sr-only peer" 
                />
                <div className="w-10 h-6 bg-slate-350 dark:bg-slate-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white"></div>
              </label>
            </div>

            <div className={`p-4 rounded-xl text-xs leading-relaxed ${
              isDarkMode ? 'bg-slate-950/40 text-slate-400' : 'bg-slate-50 text-slate-600'
            }`}>
              <p className="font-bold mb-1">💡 เกร็ดความรู้:</p>
              แผงรายงานนี้ถูกออกแบบด้วยโครงสร้าง CSS สากลทำให้คุณสามารถปรับสลับโหมดสีได้ทันทีโดยไม่จำเป็นต้องโหลดข้อมูลสถิติใหม่จากเซิร์ฟเวอร์
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
