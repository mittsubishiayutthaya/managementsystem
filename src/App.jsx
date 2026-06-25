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
  Sparkles,
  CheckCircle2,
  ChevronRight,
  LayoutDashboard,
  Car,
  Calendar,
  Users,
  CreditCard,
  Truck,
  FileText,
  TrendingUp,
  DollarSign,
  Boxes,
  ShieldAlert,
  Award,
  Smartphone,
  Monitor
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' or 'mobile-sim'
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

  // Format currency
  const formatBaht = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)} ล้านบาท`;
    }
    return `${value.toLocaleString()} บาท`;
  };

  // Helper to resolve branch name
  const getBranchName = (bId) => {
    const branch = mockData.branches.find(b => b.id === bId);
    return branch ? branch.name : bId;
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
            />
          );
        case 'inventory':
          return <InventoryView />;
        case 'sales':
          return (
            <SalesView 
              selectedBranch={selectedBranch} 
              setSelectedBranch={setSelectedBranch} 
            />
          );
        case 'settings':
          return <MobileSettingsView />;
        default:
          return (
            <DashboardView 
              selectedBranch={selectedBranch} 
              setSelectedBranch={setSelectedBranch} 
            />
          );
      }
    };

    return (
      <div className="min-h-full bg-slate-950 text-slate-100 flex flex-col no-scrollbar">
        {/* Brand Header */}
        <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center glow-blue">
                <Sparkles size={16} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-wide font-prompt leading-tight">SHOWROOM</span>
                <span className="text-[8px] text-slate-500 tracking-widest leading-none font-bold uppercase">MANAGEMENT SYSTEM</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Live System</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full bg-slate-950 overflow-y-auto">
          {renderActiveView()}
        </main>

        {/* Bottom Navigation */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    );
  };

  // --- RENDER FULL DESKTOP VIEW (Matching the provided showroom dashboard image) ---
  const renderDesktopView = () => {
    // Top KPIs matching mock data & image values
    const kpis = [
      { title: 'ยอดจองวันนี้', val: '18 คัน', sub: 'เมื่อวาน 12 คัน', trend: '+ 50.00%', color: 'blue' },
      { title: 'ยอดส่งมอบวันนี้', val: '14 คัน', sub: 'เมื่อวาน 9 คัน', trend: '+ 55.56%', color: 'green' },
      { title: 'ยอดขายเดือนนี้', val: '156 คัน', sub: 'เป้าหมาย 200 คัน', trend: '78%', progress: 78, color: 'purple' },
      { title: 'กำไรขั้นต้นเดือนนี้', val: '28.45 ล้านบาท', sub: 'เป้าหมาย 35.00 ลบ.', trend: '81%', progress: 81, color: 'orange' }
    ];

    // Branch performance totals for donut representation
    const branchPerformance = [
      { name: 'Mitsubishi อยุธยา 1', sales: 198, percent: '35.5%', color: '#3b82f6' },
      { name: 'Mitsubishi อยุธยา 2', sales: 162, percent: '29.0%', color: '#a855f7' },
      { name: 'OMODA & JAECOO อยุธยา', sales: 198, percent: '35.5%', color: '#22c55e' }
    ];

    // Aging report breakdown
    const agingReport = [
      { range: '0 - 30 วัน', count: 145, value: '116,000,000', percent: '20.5%', color: 'bg-emerald-500' },
      { range: '31 - 60 วัน', count: 124, value: '99,200,000', percent: '17.6%', color: 'bg-green-600' },
      { range: '61 - 90 วัน', count: 87, value: '69,600,000', percent: '12.3%', color: 'bg-amber-500' },
      { range: '91 - 120 วัน', count: 42, value: '33,600,000', percent: '6.0%', color: 'bg-orange-500' },
      { range: 'มากกว่า 120 วัน', count: 22, value: '17,600,000', percent: '3.1%', color: 'bg-rose-500' }
    ];

    // Over 90 Days Inventory
    const over90Days = [
      { vin: 'MHRKA8120PJ100001', model: 'HR-V EL', color: 'ขาวพรีเมียม', branch: 'อยุธยา 1', age: 132 },
      { vin: 'MR2B381H0PJ200002', model: 'CIVIC EL+', color: 'เทาเมทัลลิก', branch: 'อยุธยา 2', age: 121 },
      { vin: 'PM2E381A0PJ300003', model: 'MAZDA 3 S', color: 'แดง', branch: 'OMODA อยุธยา', age: 118 },
      { vin: 'MZ2E481H0PJ400004', model: 'CX-30 C', color: 'น้ำเงิน', branch: 'อยุธยา 1', age: 115 },
      { vin: 'PL2BA81A0PJ500005', model: 'MG 5 D', color: 'ดำ', branch: 'อยุธยา 2', age: 102 }
    ];

    // Ready for Delivery List
    const readyDeliveries = [
      { plate: '1ชช 1234', model: 'TOYOTA YARIS ATIV 1.2 Smart', branch: 'สาขาบางนา', date: 'นัดส่ง 25 พ.ค. 67' },
      { plate: '2กก 5678', model: 'HONDA CITY 1.0 Turbo SV', branch: 'สาขารังสิต', date: 'นัดส่ง 25 พ.ค. 67' },
      { plate: '3ขข 9101', model: 'MG 5 1.5 D Plus', branch: 'สาขาแจ้งวัฒนะ', date: 'นัดส่ง 26 พ.ค. 67' }
    ];

    return (
      <div className="flex h-screen bg-[#070b19] overflow-hidden text-slate-100 font-prompt">
        {/* Left Sidebar */}
        <aside className="w-64 bg-[#0a0e21] border-r border-slate-900 flex flex-col justify-between p-4 shrink-0">
          <div className="space-y-6">
            {/* Showroom Logo */}
            <div className="flex items-center space-x-3 px-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center glow-blue">
                <Sparkles size={20} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-wider font-prompt leading-tight">SHOWROOM</span>
                <span className="text-[9px] text-slate-500 tracking-widest leading-none font-bold">MANAGEMENT SYSTEM</span>
              </div>
            </div>

            {/* Menu List */}
            <nav className="space-y-1">
              {[
                { label: 'หน้าหลัก', icon: LayoutDashboard, active: true },
                { label: 'Dashboard', icon: LayoutDashboard },
                { label: 'รถยนต์', icon: Car, count: '320' },
                { label: 'การจอง', icon: Calendar, count: '87' },
                { label: 'ลูกค้า (CRM)', icon: Users },
                { label: 'ไฟแนนซ์', icon: CreditCard },
                { label: 'ส่งมอบรถ', icon: Truck },
                { label: 'รายงาน', icon: FileText },
                { label: 'ผู้ใช้งาน', icon: Users },
                { label: 'การตั้งค่า', icon: Settings }
              ].map((item, idx) => (
                <button
                  key={idx}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    item.active
                      ? 'bg-blue-600 text-white glow-blue'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {item.count && (
                    <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded-full text-slate-400 font-bold">
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* User profile section */}
          <div className="border-t border-slate-900 pt-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 border border-slate-700">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="avatar" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-slate-200">คุณสมชาย วัฒนกิจ</span>
                <span className="text-[9px] text-slate-500">เจ้าของกิจการ</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Dashboard Area */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-[#070b19]">
          
          {/* Header */}
          <header className="sticky top-0 z-30 bg-[#070b19]/80 backdrop-blur-md border-b border-slate-900 px-6 py-4 flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-base font-bold text-white font-prompt">Executive Dashboard</h2>
              <p className="text-[10px] text-slate-400">ภาพรวมธุรกิจ - ทุกสาขา</p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-[11px] font-medium text-slate-300">
                📅 25 พฤษภาคม 2569
              </div>
              <select className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-[11px] font-medium text-slate-300 focus:outline-none">
                <option>ทุกสาขา</option>
                {mockData.branches.map(b => (
                  <option key={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
          </header>

          {/* Grid Content */}
          <div className="p-6 space-y-6">
            
            {/* Top 4 KPI Cards Grid */}
            <div className="grid grid-cols-4 gap-4">
              {kpis.map((kpi, idx) => (
                <div key={idx} className="glass-card rounded-2xl p-5 border border-slate-850 flex flex-col justify-between h-36">
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-slate-400 font-semibold">{kpi.title}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      kpi.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                      kpi.color === 'green' ? 'bg-emerald-500/10 text-emerald-400' :
                      kpi.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                      'bg-orange-500/10 text-orange-400'
                    }`}>
                      {kpi.trend}
                    </span>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">{kpi.val}</h3>
                    <p className="text-[10px] text-slate-500 mt-1">{kpi.sub}</p>
                  </div>

                  {kpi.progress && (
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden mt-3">
                      <div 
                        className={`h-full rounded-full ${
                          kpi.color === 'purple' ? 'bg-purple-500' : 'bg-orange-500'
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
              
              {/* Grouped Bar Chart (Sales Comparison) */}
              <div className="col-span-2 glass-card rounded-2xl p-5 border border-slate-850 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase">ยอดขายรายเดือน เปรียบเทียบปี 2568 - 2569</h3>
                  <div className="flex space-x-3 text-[10px] text-slate-400">
                    <div className="flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <span>ปี 2569</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                      <span>ปี 2568</span>
                    </div>
                  </div>
                </div>

                {/* SVG Double Grouped Bar Chart */}
                <div className="h-56 w-full flex items-end justify-between pt-4 px-2">
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
                    <div key={index} className="flex flex-col items-center flex-1 h-full justify-end space-y-2">
                      <div className="flex items-end space-x-0.5 h-40">
                        {/* 2568 Bar */}
                        <div 
                          className="w-2.5 bg-slate-700 rounded-t-sm" 
                          style={{ height: `${d.v2}%` }}
                        />
                        {/* 2569 Bar */}
                        <div 
                          className="w-2.5 bg-blue-500 rounded-t-sm glow-blue" 
                          style={{ height: `${d.v1}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-slate-500 font-medium">{d.m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Branch Share & Top 5 Salespersons */}
              <div className="glass-card rounded-2xl p-5 border border-slate-850 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-3">ยอดขายสะสมรายสาขา</h3>
                  
                  {/* Branch Share HTML bars */}
                  <div className="space-y-3">
                    {branchPerformance.map((b, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-medium">
                          <span className="text-slate-300">{b.name}</span>
                          <span className="text-white">{b.sales} คัน ({b.percent})</span>
                        </div>
                        <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full"
                            style={{ width: b.percent, backgroundColor: b.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-900 pt-4 mt-4">
                  <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-2">TOP 5 พนักงานขาย</h3>
                  <div className="space-y-2.5">
                    {mockData.salesperson_ranking.slice(0, 3).map((rep, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="text-amber-400 font-bold">#{idx + 1}</span>
                          <span className="text-slate-300">{rep.name}</span>
                        </div>
                        <span className="font-bold text-white">{rep.sales} คัน</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Section: Stock Status Row */}
            <div className="glass-card rounded-2xl p-4 border border-slate-850">
              <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-3">สถานะรถยนต์ทั้งหมด</h3>
              <div className="grid grid-cols-5 gap-3">
                {[
                  { label: 'พร้อมขาย', val: '320 คัน', desc: '45.1%', color: 'text-blue-400 bg-blue-500/5' },
                  { label: 'จองแล้ว', val: '87 คัน', desc: '12.3%', color: 'text-emerald-400 bg-emerald-500/5' },
                  { label: 'รอไฟแนนซ์', val: '56 คัน', desc: '7.9%', color: 'text-purple-400 bg-purple-500/5' },
                  { label: 'รอส่งมอบ', val: '24 คัน', desc: '3.4%', color: 'text-orange-400 bg-orange-500/5' },
                  { label: 'ส่งมอบแล้ว (เดือนนี้)', val: '156 คัน', desc: '22.0%', color: 'text-emerald-400 bg-emerald-500/5' }
                ].map((s, idx) => (
                  <div key={idx} className={`p-3.5 rounded-xl border border-slate-900 flex flex-col justify-between h-20 ${s.color}`}>
                    <span className="text-[10px] text-slate-400">{s.label}</span>
                    <div className="flex items-end justify-between mt-1">
                      <span className="text-base font-bold text-white">{s.val}</span>
                      <span className="text-[9px] text-slate-500 font-medium">{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Tables: Aging and Over 90 Days Stock */}
            <div className="grid grid-cols-3 gap-6">
              
              {/* Aging Report table */}
              <div className="glass-card rounded-2xl p-5 border border-slate-850 space-y-3">
                <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Aging Report (อายุสต็อกรถ)</h3>
                
                <div className="space-y-2.5 pt-1">
                  {agingReport.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${item.color}`} />
                        <span className="text-slate-300 w-24">{item.range}</span>
                      </div>
                      <span className="text-slate-400">{item.count} คัน</span>
                      <span className="font-bold text-slate-200">{item.value} ฿</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Over 90 Days stock list */}
              <div className="col-span-2 glass-card rounded-2xl p-5 border border-slate-850 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase">รถค้างสต็อกเกิน 90 วัน (ต้องติดตาม)</h3>
                  <span className="text-[10px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full font-medium">ด่วนที่สุด</span>
                </div>

                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-900 text-slate-500 pb-2">
                        <th className="pb-2 font-medium">VIN</th>
                        <th className="pb-2 font-medium">รุ่นรถ</th>
                        <th className="pb-2 font-medium">สี</th>
                        <th className="pb-2 font-medium">สาขา</th>
                        <th className="pb-2 font-medium text-right">อายุสต็อก</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900/60">
                      {over90Days.map((c, idx) => (
                        <tr key={idx} className="text-slate-300">
                          <td className="py-2.5 font-mono text-[10px] text-slate-400">{c.vin}</td>
                          <td className="py-2.5 font-bold text-white">{c.model}</td>
                          <td className="py-2.5">{c.color}</td>
                          <td className="py-2.5 text-slate-400">{c.branch}</td>
                          <td className="py-2.5 text-right font-bold text-rose-400">{c.age} วัน</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    );
  };

  // --- RENDER MAIN LAYOUT (Supports toggles and viewport simulation) ---
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Top bar for view simulation toggle (Only visible when browser is on desktop width) */}
      {windowWidth >= 768 && (
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs z-50 text-slate-300 shrink-0">
          <div className="flex items-center space-x-1">
            <span className="font-bold text-white">🎛️ เครื่องมือตรวจดูตัวอย่าง:</span>
            <span className="text-[10px] text-slate-500">(สามารถกดสลับโหมดพรีวิวหน้าจอที่นี่ได้เลย)</span>
          </div>

          <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-md transition-colors ${
                viewMode === 'desktop'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor size={12} />
              <span>โหมดคอมพิวเตอร์ (ตามรูปภาพแดชบอร์ด)</span>
            </button>
            
            <button
              onClick={() => setViewMode('mobile-sim')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-md transition-colors ${
                viewMode === 'mobile-sim'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone size={12} />
              <span>โหมดมือถือ (Mobile UI)</span>
            </button>
          </div>
        </div>
      )}

      {/* Render selected view */}
      {viewMode === 'desktop' ? (
        renderDesktopView()
      ) : (
        // Simulated Mobile Device frame container
        <div className="flex-1 flex items-center justify-center p-4 bg-slate-900/40 relative overflow-hidden">
          {windowWidth >= 768 ? (
            /* Outer smartphone border mock frame */
            <div className="w-[375px] h-[780px] bg-slate-950 rounded-[40px] border-[12px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden relative flex flex-col outline outline-1 outline-slate-850">
              {/* Speaker & camera notch mockup */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-32 bg-slate-800 rounded-b-2xl z-50 flex items-center justify-center">
                <div className="w-10 h-1 bg-slate-950 rounded-full mb-1" />
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

// Mobile Settings Sub-Component
function MobileSettingsView() {
  const [lineAlerts, setLineAlerts] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  return (
    <div className="pb-32 pt-4 px-4 max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white font-prompt">การตั้งค่าระบบ</h1>
        <p className="text-xs text-slate-400">ข้อมูลบัญชี สาขา และความปลอดภัยของข้อมูล</p>
      </div>

      <div className="glass-card rounded-2xl p-4 flex items-center space-x-4 border border-slate-800/60 glow-blue">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white">
          <User size={22} />
        </div>
        <div className="flex-1">
          <h3 className="text-xs font-bold text-white font-prompt">คุณสมชาย วัฒนกิจ</h3>
          <p className="text-[10px] text-slate-400">เจ้าของกิจการ / Owner</p>
          <div className="inline-block text-[8px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-semibold mt-1">
            Super Admin Access
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-4 space-y-3.5">
        <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase flex items-center space-x-1.5 font-prompt">
          <MapPin size={12} className="text-slate-500" />
          <span>เชื่อมต่อสาขาระบบเครือข่าย</span>
        </h3>

        <div className="space-y-2">
          {mockData.branches.map(b => (
            <div key={b.id} className="flex items-center justify-between p-2.5 bg-slate-950/40 rounded-xl border border-slate-900/60">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-300">{b.name}</span>
                <span className="text-[8px] text-slate-500 font-mono">Branch ID: {b.id}</span>
              </div>
              <span className="text-[9px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center">
                <CheckCircle2 size={9} className="mr-1" /> เชื่อมต่อแล้ว
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-4 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase flex items-center space-x-1.5 font-prompt">
          <Bell size={12} className="text-slate-500" />
          <span>การตั้งค่าระบบแจ้งเตือน</span>
        </h3>

        <div className="space-y-4 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex flex-col pr-4">
              <span className="text-xs font-semibold text-slate-300">ส่งแจ้งเตือนผ่าน LINE Notify</span>
              <span className="text-[9px] text-slate-500">แจ้งเตือนเรื่องอะไหล่หมดหรือยอดจองใหม่ทันที</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={lineAlerts} 
                onChange={() => setLineAlerts(!lineAlerts)} 
                className="sr-only peer" 
              />
              <div className="w-9 h-5 bg-slate-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col pr-4">
              <span className="text-xs font-semibold text-slate-300">ซิงก์ข้อมูลอัตโนมัติ (Background Sync)</span>
              <span className="text-[9px] text-slate-500">ดึงข้อมูลคลังสินค้าใหม่ทุกๆ 5 นาที</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={autoSync} 
                onChange={() => setAutoSync(!autoSync)} 
                className="sr-only peer" 
              />
              <div className="w-9 h-5 bg-slate-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-4 space-y-3">
        <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase flex items-center space-x-1.5 font-prompt">
          <Database size={12} className="text-slate-500" />
          <span>ซ่อมบำรุงและข้อมูลระบบ</span>
        </h3>

        <div className="space-y-2">
          <button 
            onClick={() => alert('จำลองการล้างแคชและซิงก์เรียบร้อยแล้ว')}
            className="w-full text-left text-xs font-medium text-slate-300 bg-slate-950/40 border border-slate-900 hover:bg-slate-900/60 p-3 rounded-xl flex items-center justify-between"
          >
            <span>ล้างข้อมูลแคชชั่วคราวในเบราว์เซอร์</span>
            <ChevronRight size={14} className="text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
