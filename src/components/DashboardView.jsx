import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Boxes, 
  Car, 
  ShieldAlert, 
  Award,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';
import { mockData } from '../data/mockData';

export default function DashboardView({ selectedBranch, setSelectedBranch, period, setPeriod, isDarkMode }) {
  const [kpiIndex, setKpiIndex] = useState(0);

  // Get current state KPIs based on selected branch and period
  const kpis = mockData.dashboard_kpi;
  const isAllBranches = selectedBranch === 'ALL';
  
  // Calculate display KPI values
  let branchMultiplier = 1.0;
  let periodMultiplier = 1.0;
  
  if (selectedBranch === 'B01') branchMultiplier = 0.40;
  else if (selectedBranch === 'B02') branchMultiplier = 0.33;
  else if (selectedBranch === 'B03') branchMultiplier = 0.27;

  if (period === 'may') periodMultiplier = 0.92; // simulate lower sales in May

  let displaySales = kpis.total_sales_mtd * branchMultiplier * periodMultiplier;
  let displayInventory = kpis.inventory_value * branchMultiplier;
  let displayGrowth = kpis.mom_growth_percent;
  let displayCars = Math.round(kpis.total_cars_mtd * branchMultiplier * periodMultiplier);
  let displayTarget = kpis.target_sales_mtd * branchMultiplier;
  let displayTargetCars = Math.round(kpis.target_cars_mtd * branchMultiplier);

  // Format currency
  const formatBaht = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)} ล้านบาท`;
    }
    return `${value.toLocaleString()} บาท`;
  };

  // Slides for mobile KPI Carousel (Highly readable font sizes for 30-50 year olds)
  const kpiSlides = [
    {
      title: 'ยอดขายสะสมเดือนนี้',
      value: formatBaht(displaySales),
      target: `เป้าหมาย ${formatBaht(displayTarget)}`,
      percent: Math.round((displaySales / displayTarget) * 100),
      icon: DollarSign,
      color: 'blue',
      trend: `เติบโต ${displayGrowth}% MoM`
    },
    {
      title: 'มูลค่าอะไหล่คงคลังรวม',
      value: formatBaht(displayInventory),
      target: 'เกณฑ์ควบคุมสต็อกต่ำกว่า 15 รายการ',
      percent: 74, // placeholder percent health
      icon: Boxes,
      color: 'purple',
      trend: 'ระดับสต็อกคงที่'
    },
    {
      title: 'ยอดส่งมอบรถยนต์สะสม',
      value: `${displayCars} คัน`,
      target: `เป้าหมายส่งมอบ ${displayTargetCars} คัน`,
      percent: Math.round((displayCars / displayTargetCars) * 100),
      icon: Car,
      color: 'green',
      trend: `สัปดาห์นี้ส่งแล้ว +${Math.round(12 * branchMultiplier)} คัน`
    }
  ];

  const nextKpi = () => {
    setKpiIndex((prev) => (prev + 1) % kpiSlides.length);
  };

  const prevKpi = () => {
    setKpiIndex((prev) => (prev - 1 + kpiSlides.length) % kpiSlides.length);
  };

  const currentSlide = kpiSlides[kpiIndex];
  const SlideIcon = currentSlide.icon;

  // Custom SVG Bar Chart calculation (Sales Comparison between branches)
  const maxSales = 12000000;
  const branchChartData = [
    { name: 'Mitsubishi อยุธยา 1', value: kpis.branch_kpi.B01.total_sales_mtd * periodMultiplier, color: '#3b82f6' },
    { name: 'Mitsubishi อยุธยา 2', value: kpis.branch_kpi.B02.total_sales_mtd * periodMultiplier, color: '#a855f7' },
    { name: 'OMODA & JAECOO อยุธยา', value: kpis.branch_kpi.B03.total_sales_mtd * periodMultiplier, color: '#10b981' }
  ];

  // Custom SVG Line Chart for 6 months (Structured with grids and clear fonts)
  const lineChartData = mockData.sales_comparison_mock;
  const maxLineVal = 12000000;
  const chartHeight = 140;
  const chartWidth = 330;
  const padding = 30;

  // Generate SVG coordinates for Line Chart
  const getLineCoordinates = (branchKey) => {
    const points = lineChartData.map((d, index) => {
      const x = padding + (index * (chartWidth - padding * 2)) / (lineChartData.length - 1);
      const val = d[branchKey] * periodMultiplier;
      const y = chartHeight - padding - (val / maxLineVal) * (chartHeight - padding * 2);
      return { x, y };
    });
    return points;
  };

  return (
    <div className="pb-32 pt-4 px-4 max-w-md mx-auto space-y-6 font-prompt">
      
      {/* Filters Header */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className={`text-lg font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>รายงานผลภาพรวม</h1>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>อัปเดตข้อมูลล่าสุด: วันนี้ 14:15 น.</p>
          </div>
          
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-700">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" />
          </div>
        </div>

        {/* Filters Selectors */}
        <div className="flex space-x-2">
          {/* Branch Dropdown */}
          <div className="flex-1 relative">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className={`w-full text-xs rounded-xl px-3 py-3 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold border transition-colors ${
                isDarkMode ? 'bg-[#0f172a] border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-750 shadow-sm'
              }`}
            >
              <option value="ALL">สาขา: ทุกสาขาในเครือ</option>
              {mockData.branches.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
            <div className={`absolute right-3 top-3.5 pointer-events-none ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <Filter size={14} />
            </div>
          </div>

          {/* Period Dropdown */}
          <div className="flex-1 relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className={`w-full text-xs rounded-xl px-3 py-3 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold border transition-colors ${
                isDarkMode ? 'bg-[#0f172a] border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-750 shadow-sm'
              }`}
            >
              <option value="june">รอบบัญชี: มิ.ย. 2569</option>
              <option value="may">รอบบัญชี: พ.ค. 2569</option>
            </select>
            <div className={`absolute right-3 top-3.5 pointer-events-none ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <ChevronRight size={14} className="rotate-90" />
            </div>
          </div>
        </div>
      </div>

      {/* KPI Carousel Slider (Swipeable Cards on Mobile) */}
      <div className="relative">
        <div className={`rounded-2xl p-5 border transition-all duration-300 ${
          isDarkMode ? 'dark-glass border-slate-800' : 'light-glass border-slate-200/80 shadow-sm'
        }`}>
          {/* Top Info */}
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>{currentSlide.title}</span>
            <div className={`p-2 rounded-xl border ${
              isDarkMode ? 'bg-slate-900 text-blue-400 border-slate-800' : 'bg-blue-50 text-blue-600 border-blue-100'
            }`}>
              <SlideIcon size={18} />
            </div>
          </div>

          {/* Main Metric */}
          <div className="space-y-1.5 mb-4">
            <h2 className={`text-2xl font-bold tracking-tight font-prompt ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{currentSlide.value}</h2>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-emerald-500 dark:text-emerald-400 font-bold flex items-center">
                <TrendingUp size={13} className="mr-0.5" />
                {currentSlide.trend}
              </span>
              <span className={isDarkMode ? 'text-slate-600' : 'text-slate-300'}>|</span>
              <span className={`font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{currentSlide.target}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className={`flex justify-between text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <span>ความคืบหน้าภาพรวม</span>
              <span>{currentSlide.percent}%</span>
            </div>
            <div className={`w-full h-2.5 rounded-full overflow-hidden border transition-colors ${
              isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-slate-100 border-slate-200'
            }`}>
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  currentSlide.color === 'blue' ? 'bg-blue-600' :
                  currentSlide.color === 'purple' ? 'bg-purple-600' :
                  'bg-emerald-600'
                }`}
                style={{ width: `${Math.min(currentSlide.percent, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center justify-between mt-3 px-1">
          <button 
            onClick={prevKpi}
            className={`p-2 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-800 text-slate-400 active:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 active:bg-slate-100 shadow-sm'
            }`}
          >
            <ChevronLeft size={16} />
          </button>
          
          {/* Navigation dots */}
          <div className="flex space-x-1.5">
            {kpiSlides.map((_, index) => (
              <div 
                key={index} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === kpiIndex 
                    ? 'w-5 bg-blue-500' 
                    : `w-2 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`
                }`}
              />
            ))}
          </div>

          <button 
            onClick={nextKpi}
            className={`p-2 rounded-lg border transition-colors ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-800 text-slate-400 active:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 active:bg-slate-100 shadow-sm'
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Showroom Status Stack (Status breakdown) */}
      <div className={`rounded-2xl p-4 space-y-3.5 border transition-all duration-300 ${
        isDarkMode ? 'dark-glass border-slate-800' : 'light-glass border-slate-200 shadow-sm'
      }`}>
        <h3 className={`text-xs font-bold tracking-wider uppercase font-prompt ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>สรุปสถานะรถยนต์ในระบบ</h3>
        
        <div className="grid grid-cols-2 gap-2.5">
          <div className={`p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${
            isDarkMode ? 'bg-slate-900/30 border-slate-850' : 'bg-slate-50 border-slate-150'
          }`}>
            <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>พร้อมจำหน่าย</span>
            <div className="flex items-end justify-between mt-1">
              <span className={`text-lg font-bold font-prompt ${isDarkMode ? 'text-blue-400' : 'text-blue-650'}`}>
                {Math.round(320 * branchMultiplier)} คัน
              </span>
              <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-550' : 'text-slate-400'}`}>45.1%</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${
            isDarkMode ? 'bg-slate-900/30 border-slate-850' : 'bg-slate-50 border-slate-150'
          }`}>
            <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>จองแล้ว</span>
            <div className="flex items-end justify-between mt-1">
              <span className={`text-lg font-bold font-prompt ${isDarkMode ? 'text-emerald-400' : 'text-emerald-650'}`}>
                {Math.round(87 * branchMultiplier)} คัน
              </span>
              <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-550' : 'text-slate-400'}`}>12.3%</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${
            isDarkMode ? 'bg-slate-900/30 border-slate-850' : 'bg-slate-50 border-slate-150'
          }`}>
            <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>ลูกค้ากู้ไฟแนนซ์</span>
            <div className="flex items-end justify-between mt-1">
              <span className={`text-lg font-bold font-prompt ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                {Math.round(56 * branchMultiplier)} คัน
              </span>
              <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-550' : 'text-slate-400'}`}>7.9%</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${
            isDarkMode ? 'bg-slate-900/30 border-slate-850' : 'bg-slate-50 border-slate-150'
          }`}>
            <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>เตรียมส่งมอบ</span>
            <div className="flex items-end justify-between mt-1">
              <span className={`text-lg font-bold font-prompt ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                {Math.round(24 * branchMultiplier)} คัน
              </span>
              <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-550' : 'text-slate-400'}`}>3.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Sales Comparison Chart - Displays only if "ALL" is selected */}
      {isAllBranches ? (
        <div className={`rounded-2xl p-4 space-y-4 border transition-all duration-300 ${
          isDarkMode ? 'dark-glass border-slate-800' : 'light-glass border-slate-200 shadow-sm'
        }`}>
          <div className="flex justify-between items-center">
            <h3 className={`text-xs font-bold tracking-wider uppercase ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>สัดส่วนยอดขายตามสาขา (เดือนปัจจุบัน)</h3>
            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
              isDarkMode ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' : 'text-blue-600 bg-blue-50 border-blue-105'
            }`}>
              สถิติสะสม
            </span>
          </div>

          {/* Simple Custom HTML/CSS Bar Chart for Branch Comparison */}
          <div className="space-y-4 pt-1">
            {branchChartData.map((b, idx) => {
              const percentage = Math.round((b.value / maxSales) * 100);
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className={isDarkMode ? 'text-slate-300' : 'text-slate-650'}>{b.name}</span>
                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{formatBaht(b.value)}</span>
                  </div>
                  <div className={`w-full h-3.5 rounded-full overflow-hidden border flex transition-colors ${
                    isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: b.color
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // Render 6-Month Line Trend Chart if single branch is selected (with clear grid)
        <div className={`rounded-2xl p-4 space-y-4 border transition-all duration-300 ${
          isDarkMode ? 'dark-glass border-slate-800' : 'light-glass border-slate-200 shadow-sm'
        }`}>
          <div className="flex justify-between items-center">
            <h3 className={`text-xs font-bold tracking-wider uppercase ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              แนวโน้มยอดขายรายเดือนย้อนหลัง
            </h3>
            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
              isDarkMode ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' : 'text-blue-600 bg-blue-50 border-blue-105'
            }`}>
              {mockData.branches.find(b => b.id === selectedBranch)?.name}
            </span>
          </div>

          {/* Custom SVG Line Chart with Grid Lines */}
          <div className="flex justify-center items-center">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
              {/* Horizontal Grid lines and values */}
              <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke={isDarkMode ? "#1e293b" : "#e2e8f0"} />
              <line x1={padding} y1={chartHeight / 2} x2={chartWidth - padding} y2={chartHeight / 2} stroke={isDarkMode ? "#1e293b" : "#e2e8f0"} />
              <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke={isDarkMode ? "#334155" : "#cbd5e1"} strokeWidth="1.5" />

              {/* Draw Data Area Line */}
              {(() => {
                const points = getLineCoordinates(selectedBranch);
                const pathD = points.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, '');
                const lineColor = selectedBranch === 'B01' ? '#3b82f6' : selectedBranch === 'B02' ? '#a855f7' : '#10b981';
                
                return (
                  <>
                    {/* Line Stroke */}
                    <path d={pathD} fill="none" stroke={lineColor} strokeWidth="3" strokeLinecap="round" />

                    {/* Data Points */}
                    {points.map((p, idx) => (
                      <circle key={idx} cx={p.x} cy={p.y} r="4" fill={isDarkMode ? "#0b0f19" : "#ffffff"} stroke={lineColor} strokeWidth="2.5" />
                    ))}
                  </>
                );
              })()}

              {/* X Axis Labels (Larger size) */}
              {lineChartData.map((d, index) => {
                const x = padding + (index * (chartWidth - padding * 2)) / (lineChartData.length - 1);
                return (
                  <text 
                    key={index} 
                    x={x} 
                    y={chartHeight - 8} 
                    fill={isDarkMode ? "#94a3b8" : "#64748b"} 
                    fontSize="10.5" 
                    textAnchor="middle"
                    className="font-bold"
                  >
                    {d.month}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* Top Sales Person Leaderboard */}
      <div className={`rounded-2xl p-4 space-y-4 border transition-all duration-300 ${
        isDarkMode ? 'dark-glass border-slate-800' : 'light-glass border-slate-200 shadow-sm'
      }`}>
        <div className="flex justify-between items-center">
          <h3 className={`text-xs font-bold tracking-wider uppercase ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>สรุปผลงานที่ปรึกษาการขายยอดเยี่ยม</h3>
          <div className={`flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full font-bold border ${
            isDarkMode ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-amber-700 bg-amber-50 border-amber-200'
          }`}>
            <Award size={12} />
            <span>ยอดสะสม</span>
          </div>
        </div>

        <div className={`divide-y ${isDarkMode ? 'divide-slate-800/80' : 'divide-slate-100'}`}>
          {mockData.salesperson_ranking.slice(0, 3).map((salesrep, index) => (
            <div key={index} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div className="flex items-center space-x-3.5">
                {/* Ranking number */}
                <span className={`text-xs font-bold w-4 text-center ${
                  index === 0 ? 'text-amber-400' :
                  index === 1 ? 'text-slate-350' :
                  index === 2 ? 'text-amber-600' : 'text-slate-500'
                }`}>
                  #{index + 1}
                </span>

                {/* Avatar */}
                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 border border-slate-700">
                  <img src={salesrep.avatar} alt={salesrep.name} className="w-full h-full object-cover" />
                </div>

                {/* Name & Branch */}
                <div className="flex flex-col">
                  <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{salesrep.name}</span>
                  <span className="text-[10px] text-slate-500 font-semibold">{salesrep.branch}</span>
                </div>
              </div>

              {/* Total sales figure */}
              <div className="flex items-center space-x-1">
                <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{Math.round(salesrep.sales * periodMultiplier)}</span>
                <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-550'}`}>คัน</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Stock Alerts */}
      <div className={`rounded-2xl p-4 space-y-3.5 border transition-all duration-300 ${
        isDarkMode ? 'dark-glass border-slate-800' : 'light-glass border-slate-200 shadow-sm'
      }`}>
        <div className="flex justify-between items-center text-rose-500">
          <div className="flex items-center space-x-1.5">
            <ShieldAlert size={15} />
            <h3 className={`text-xs font-bold tracking-wider uppercase ${isDarkMode ? 'text-rose-400' : 'text-rose-700'}`}>การแจ้งเตือนงานคลังสินค้าวิกฤต</h3>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
            isDarkMode ? 'bg-rose-500/10 border-rose-500/20 text-rose-450' : 'bg-rose-50 border-rose-200 text-rose-700'
          }`}>
            แจ้งเตือนด่วน
          </span>
        </div>

        <div className="space-y-2">
          <div className={`border rounded-xl p-3.5 flex items-start space-x-2 transition-colors ${
            isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-rose-50 border-rose-100'
          }`}>
            <div className="text-xs flex-1 space-y-1">
              <p className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-rose-900'}`}>ผ้าเบรกหน้า Xpander สต็อกหมดแล้ว</p>
              <p className={`text-[10px] font-semibold ${isDarkMode ? 'text-slate-400' : 'text-rose-700'}`}>สาขา OMODA & JAECOO อยุธยา ยอดสต็อก = 0 (จุดสั่งซื้อคือ 10 ชิ้น)</p>
            </div>
          </div>
          
          <div className={`border rounded-xl p-3.5 flex items-start space-x-2 transition-colors ${
            isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-amber-50 border-amber-100'
          }`}>
            <div className="text-xs flex-1 space-y-1">
              <p className={`font-bold ${isDarkMode ? 'text-slate-200' : 'text-amber-900'}`}>แบตเตอรี่แห้ง FB 75 ต่ำกว่าเกณฑ์ที่กำหนด</p>
              <p className={`text-[10px] font-semibold ${isDarkMode ? 'text-slate-400' : 'text-amber-700'}`}>สาขา Mitsubishi อยุธยา 1 สต็อกเหลือ 8 ชิ้น (เกณฑ์ควบคุมคือ 10 ชิ้น)</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
