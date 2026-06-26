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
  Building
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
      <div className="min-h-full bg-[#0b0f19] text-slate-100 flex flex-col no-scrollbar">
        {/* Brand Header */}
        <header className="sticky top-0 z-40 bg-[#0f172a]/95 border-b border-slate-800 px-4 py-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Building size={16} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-wide font-prompt leading-tight">ระบบบริหารงานศูนย์บริการ</span>
                <span className="text-[10px] text-slate-400 tracking-wider font-semibold font-prompt uppercase">Auto Center System</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-2 py-1 rounded-full">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">เชื่อมต่อสด</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full bg-[#0b0f19] overflow-y-auto">
          {renderActiveView()}
        </main>

        {/* Bottom Navigation */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    );
  };

  // --- RENDER FULL DESKTOP VIEW (Matching the provided showroom dashboard image, refined) ---
  const renderDesktopView = () => {
    // Top KPIs matching mock data & image values
    const kpis = [
      { title: 'ยอดจองวันนี้', val: '18 คัน', sub: 'เมื่อวาน 12 คัน', trend: '+ 50.00%', color: 'blue' },
      { title: 'ยอดส่งมอบวันนี้', val: '14 คัน', sub: 'เมื่อวาน 9 คัน', trend: '+ 55.56%', color: 'green' },
      { title: 'ยอดขายเดือนนี้', val: '156 คัน', sub: 'เป้าหมาย 200 คัน', trend: '78% สำเร็จ', progress: 78, color: 'purple' },
      { title: 'กำไรขั้นต้นเดือนนี้', val: '28.45 ล้านบาท', sub: 'เป้าหมาย 35.00 ล้านบาท', trend: '81% สำเร็จ', progress: 81, color: 'orange' }
    ];

    // Branch performance totals for donut representation
    const branchPerformance = [
      { name: 'Mitsubishi อยุธยา 1', sales: 198, percent: '35.5%', color: '#3b82f6' },
      { name: 'Mitsubishi อยุธยา 2', sales: 162, percent: '29.0%', color: '#a855f7' },
      { name: 'OMODA & JAECOO อยุธยา', sales: 198, percent: '35.5%', color: '#10b981' }
    ];

    // Aging report breakdown
    const agingReport = [
      { range: '0 - 30 วัน', count: 145, value: '116.0 ล้านบาท', percent: '20.5%', color: 'bg-emerald-600' },
      { range: '31 - 60 วัน', count: 124, value: '99.2 ล้านบาท', percent: '17.6%', color: 'bg-green-700' },
      { range: '61 - 90 วัน', count: 87, value: '69.6 ล้านบาท', percent: '12.3%', color: 'bg-amber-600' },
      { range: '91 - 120 วัน', count: 42, value: '33.6 ล้านบาท', percent: '6.0%', color: 'bg-orange-600' },
      { range: 'มากกว่า 120 วัน', count: 22, value: '17.6 ล้านบาท', percent: '3.1%', color: 'bg-rose-600' }
    ];

    // Over 90 Days Inventory
    const over90Days = [
      { vin: 'MHRKA8120PJ100001', model: 'HR-V EL', color: 'ขาวพรีเมียม', branch: 'อยุธยา 1', age: 132 },
      { vin: 'MR2B381H0PJ200002', model: 'CIVIC EL+', color: 'เทาเมทัลลิก', branch: 'อยุธยา 2', age: 121 },
      { vin: 'PM2E381A0PJ300003', model: 'MAZDA 3 S', color: 'แดง', branch: 'OMODA อยุธยา', age: 118 },
      { vin: 'MZ2E481H0PJ400004', model: 'CX-30 C', color: 'น้ำเงิน', branch: 'อยุธยา 1', age: 115 },
      { vin: 'PL2BA81A0PJ500005', model: 'MG 5 D', color: 'ดำ', branch: 'อยุธยา 2', age: 102 }
    ];

    return (
      <div className="flex h-screen bg-[#0b0f19] overflow-hidden text-slate-100 font-prompt">
        {/* Left Sidebar */}
        <aside className="w-64 bg-[#0f172a] border-r border-slate-800 flex flex-col justify-between p-4 shrink-0">
          <div className="space-y-6">
            {/* Showroom Logo */}
            <div className="flex items-center space-x-3 px-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                <Building size={18} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-wider font-prompt leading-tight">ระบบบริหารศูนย์บริการ</span>
                <span className="text-[10px] text-slate-400 font-bold tracking-wider">AUTO CENTER SYSTEM</span>
              </div>
            </div>

            {/* Menu List */}
            <nav className="space-y-1">
              {[
                { label: 'หน้าหลัก (Home)', icon: LayoutDashboard, active: true },
                { label: 'สรุปแผงภาพรวม', icon: LayoutDashboard },
                { label: 'รายงานรถยนต์พร้อมขาย', icon: Car, count: '320' },
                { label: 'รายการจองรถยนต์', icon: Calendar, count: '87' },
                { label: 'ฐานลูกค้า (CRM)', icon: Users },
                { label: 'จัดการไฟแนนซ์', icon: CreditCard },
                { label: 'การส่งมอบรถยนต์', icon: Truck },
                { label: 'รายงานสถิติรวม', icon: FileText },
                { label: 'ผู้ใช้งานระบบ', icon: Users },
                { label: 'การตั้งค่าระบบ', icon: Settings }
              ].map((item, idx) => (
                <button
                  key={idx}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    item.active
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
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

          {/* User profile section */}
          <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 border border-slate-700">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="avatar" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-200">คุณสมชาย วัฒนกิจ</span>
                <span className="text-[10px] text-slate-500">เจ้าของกิจการ (Super Admin)</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Dashboard Area */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-[#0b0f19]">
          
          {/* Header */}
          <header className="sticky top-0 z-30 bg-[#0f172a]/95 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-white font-prompt">แผงรายงานสำหรับผู้บริหาร (Executive Dashboard)</h2>
              <p className="text-xs text-slate-400">ภาพรวมการบริหารงานและยอดขายของทุกสาขา</p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-300">
                ประจำวันที่ 25 พฤษภาคม 2569
              </div>
              <select className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-300 focus:outline-none">
                <option>ทุกสาขา (รวม 3 ศูนย์)</option>
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
                <div key={idx} className="glass-card rounded-2xl p-5 flex flex-col justify-between h-36 border border-slate-800">
                  <div className="flex items-start justify-between">
                    <span className="text-xs text-slate-400 font-bold">{kpi.title}</span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      kpi.color === 'blue' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      kpi.color === 'green' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      kpi.color === 'purple' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                      'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    }`}>
                      {kpi.trend}
                    </span>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-2xl font-bold text-white tracking-tight font-prompt">{kpi.val}</h3>
                    <p className="text-[11px] text-slate-400 mt-1 font-semibold">{kpi.sub}</p>
                  </div>

                  {kpi.progress && (
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden mt-3 border border-slate-800">
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
              <div className="col-span-2 glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase">สถิติเปรียบเทียบยอดขายรายเดือน ปี 2568 - 2569 (จำนวนรถยนต์)</h3>
                  <div className="flex space-x-3 text-[11px] text-slate-400 font-semibold">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-blue-500" />
                      <span>ปี 2569 (ปัจจุบัน)</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-slate-700" />
                      <span>ปี 2568</span>
                    </div>
                  </div>
                </div>

                {/* SVG Double Grouped Bar Chart with Grid Lines */}
                <div className="relative h-60 w-full pt-4">
                  {/* Background grid lines */}
                  <div className="absolute inset-x-0 top-4 bottom-8 flex flex-col justify-between pointer-events-none">
                    <div className="w-full border-t border-slate-800/40" />
                    <div className="w-full border-t border-slate-800/40" />
                    <div className="w-full border-t border-slate-800/40" />
                    <div className="w-full border-t border-slate-800/40" />
                    <div className="w-full border-b border-slate-700" />
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
                          {/* 2568 Bar */}
                          <div 
                            className="w-3 bg-slate-750 rounded-t" 
                            style={{ height: `${d.v2}%` }}
                            title={`ปี 2568: ${d.v2} คัน`}
                          />
                          {/* 2569 Bar */}
                          <div 
                            className="w-3 bg-blue-500 rounded-t" 
                            style={{ height: `${d.v1}%` }}
                            title={`ปี 2569: ${d.v1} คัน`}
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold mt-2">{d.m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Branch Share & Top 5 Salespersons */}
              <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase mb-4">สัดส่วนยอดขายสะสมรายสาขา</h3>
                  
                  {/* Branch Share HTML bars */}
                  <div className="space-y-4">
                    {branchPerformance.map((b, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-300">{b.name}</span>
                          <span className="text-white">{b.sales} คัน ({b.percent})</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className="h-full rounded-full"
                            style={{ width: b.percent, backgroundColor: b.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-4 mt-4">
                  <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase mb-3">TOP 3 พนักงานขายประจำสาขา</h3>
                  <div className="space-y-3">
                    {mockData.salesperson_ranking.slice(0, 3).map((rep, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="text-amber-500 font-bold">#{idx + 1}</span>
                          <span className="text-slate-200 font-semibold">{rep.name}</span>
                        </div>
                        <span className="font-bold text-white">{rep.sales} คัน</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Section: Stock Status Row */}
            <div className="glass-card rounded-2xl p-4 border border-slate-800">
              <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase mb-3">สถานะรถยนต์ในระบบสะสม</h3>
              <div className="grid grid-cols-5 gap-3">
                {[
                  { label: 'พร้อมขายทั้งหมด', val: '320 คัน', desc: 'สัดส่วน 45.1%', color: 'text-blue-400 bg-blue-500/5' },
                  { label: 'ทำสัญญาจองแล้ว', val: '87 คัน', desc: 'สัดส่วน 12.3%', color: 'text-emerald-400 bg-emerald-500/5' },
                  { label: 'ลูกค้าขอไฟแนนซ์', val: '56 คัน', desc: 'สัดส่วน 7.9%', color: 'text-purple-400 bg-purple-500/5' },
                  { label: 'รอตรวจรถส่งมอบ', val: '24 คัน', desc: 'สัดส่วน 3.4%', color: 'text-orange-400 bg-orange-500/5' },
                  { label: 'ส่งมอบสำเร็จแล้ว', val: '156 คัน', desc: 'สัดส่วน 22.0%', color: 'text-emerald-400 bg-emerald-500/5' }
                ].map((s, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border border-slate-850 flex flex-col justify-between h-20 ${s.color}`}>
                    <span className="text-xs text-slate-400 font-semibold">{s.label}</span>
                    <div className="flex items-end justify-between mt-1">
                      <span className="text-base font-bold text-white font-prompt">{s.val}</span>
                      <span className="text-[10px] text-slate-500 font-bold">{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Tables: Aging and Over 90 Days Stock */}
            <div className="grid grid-cols-3 gap-6">
              
              {/* Aging Report table */}
              <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase">Aging Report (อายุสต็อกรถจอดนาน)</h3>
                
                <div className="space-y-3 pt-1">
                  {agingReport.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${item.color}`} />
                        <span className="text-slate-300 font-semibold w-24">{item.range}</span>
                      </div>
                      <span className="text-slate-400 font-medium">{item.count} คัน</span>
                      <span className="font-bold text-slate-200">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Over 90 Days stock list */}
              <div className="col-span-2 glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-slate-300 tracking-wider uppercase">รายการรถค้างสต็อกเกิน 90 วัน</h3>
                  <span className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full font-bold">แจ้งเตือนด่วน</span>
                </div>

                <div className="overflow-x-auto w-full custom-scrollbar">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-850 text-slate-400 pb-2">
                        <th className="pb-2 font-bold">เลขตัวถัง (VIN)</th>
                        <th className="pb-2 font-bold">รุ่นรถยนต์</th>
                        <th className="pb-2 font-bold">สีตัวรถ</th>
                        <th className="pb-2 font-bold">สาขาผู้ถือครอง</th>
                        <th className="pb-2 font-bold text-right">จำนวนวันจอดสะสม</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900/60">
                      {over90Days.map((c, idx) => (
                        <tr key={idx} className="text-slate-300">
                          <td className="py-2.5 font-mono text-xs text-slate-400">{c.vin}</td>
                          <td className="py-2.5 font-bold text-slate-200">{c.model}</td>
                          <td className="py-2.5 font-semibold">{c.color}</td>
                          <td className="py-2.5 text-slate-400 font-semibold">{c.branch}</td>
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
    <div className="min-h-screen bg-[#0b0f19] flex flex-col">
      {/* Top bar for view simulation toggle (Only visible when browser is on desktop width) */}
      {windowWidth >= 768 && (
        <div className="bg-[#0f172a] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs z-50 text-slate-300 shrink-0 font-prompt">
          <div className="flex items-center space-x-1.5">
            <span className="font-bold text-white">⚙️ ระบบทดสอบแบบจำลอง:</span>
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
        <div className="flex-1 flex items-center justify-center p-4 bg-slate-900/20 relative overflow-hidden">
          {windowWidth >= 768 ? (
            /* Outer smartphone border mock frame */
            <div className="w-[375px] h-[780px] bg-slate-950 rounded-[40px] border-[12px] border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden relative flex flex-col outline outline-1 outline-slate-800">
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

// Mobile Settings Sub-Component (Larger texts for 30-50 year olds)
function MobileSettingsView() {
  const [lineAlerts, setLineAlerts] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  return (
    <div className="pb-32 pt-4 px-4 max-w-md mx-auto space-y-6 font-prompt">
      <div>
        <h1 className="text-lg font-bold tracking-tight text-white font-prompt">การตั้งค่าระบบ</h1>
        <p className="text-xs text-slate-400">ข้อมูลบัญชี สาขา และความปลอดภัยของข้อมูล</p>
      </div>

      <div className="glass-card rounded-2xl p-4 flex items-center space-x-4 border border-slate-855 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
          <User size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-white font-prompt truncate">คุณสมชาย วัฒนกิจ</h3>
          <p className="text-xs text-slate-400">เจ้าของกิจการ / Owner</p>
          <div className="inline-block text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold mt-1.5">
            สิทธิ์การเข้าถึง: Super Admin
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center space-x-1.5 font-prompt">
          <MapPin size={13} className="text-slate-500" />
          <span>ศูนย์บริการทั้งหมดในเครือ</span>
        </h3>

        <div className="space-y-2">
          {mockData.branches.map(b => (
            <div key={b.id} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-xl border border-slate-900/80">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-300">{b.name}</span>
                <span className="text-[10px] text-slate-500 font-mono font-semibold">ID: {b.id}</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                ออนไลน์
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-4 space-y-4">
        <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center space-x-1.5 font-prompt">
          <Bell size={13} className="text-slate-500" />
          <span>การแจ้งเตือนงานระบบ</span>
        </h3>

        <div className="space-y-4 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex flex-col pr-4">
              <span className="text-xs font-bold text-slate-300">แจ้งเตือนผ่าน LINE Notify</span>
              <span className="text-[10px] text-slate-400 mt-0.5">แจ้งเตือนเรื่องอะไหล่ใกล้หมดหรือยอดจองใหม่ทันที</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input 
                type="checkbox" 
                checked={lineAlerts} 
                onChange={() => setLineAlerts(!lineAlerts)} 
                className="sr-only peer" 
              />
              <div className="w-10 h-6 bg-slate-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-slate-400 after:border-slate-350 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col pr-4">
              <span className="text-xs font-bold text-slate-300">ดึงข้อมูลคลังสินค้าใหม่เสมอ</span>
              <span className="text-[10px] text-slate-400 mt-0.5">ดึงข้อมูลสต็อกแยกรายสาขาใหม่ในเบื้องหลังทุก 5 นาที</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input 
                type="checkbox" 
                checked={autoSync} 
                onChange={() => setAutoSync(!autoSync)} 
                className="sr-only peer" 
              />
              <div className="w-10 h-6 bg-slate-950 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-slate-400 after:border-slate-350 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center space-x-1.5 font-prompt">
          <Database size={13} className="text-slate-500" />
          <span>การจัดการฐานข้อมูล</span>
        </h3>

        <div className="space-y-2">
          <button 
            onClick={() => alert('ล้างแคชบราวเซอร์จำลองสำเร็จ')}
            className="w-full text-left text-xs font-bold text-slate-300 bg-slate-950/40 border border-slate-900 hover:bg-slate-900/60 p-3.5 rounded-xl flex items-center justify-between"
          >
            <span>ล้างข้อมูลที่บันทึกชั่วคราวในอุปกรณ์</span>
            <ChevronRight size={14} className="text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
