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

export default function DashboardView({ selectedBranch, setSelectedBranch }) {
  const [kpiIndex, setKpiIndex] = useState(0);
  const [period, setPeriod] = useState('june'); // june (this month), may (last month)

  // Get current state KPIs based on selected branch and period
  const kpis = mockData.dashboard_kpi;
  const isAllBranches = selectedBranch === 'ALL';
  
  // Calculate display KPI values
  let displaySales = kpis.total_sales_mtd;
  let displayInventory = kpis.inventory_value;
  let displayGrowth = kpis.mom_growth_percent;
  let displayCars = kpis.total_cars_mtd;
  let displayTarget = kpis.target_sales_mtd;
  let displayTargetCars = kpis.target_cars_mtd;

  if (!isAllBranches) {
    const bkpi = kpis.branch_kpi[selectedBranch];
    displaySales = bkpi.total_sales_mtd;
    // Mock branch specific values
    displayInventory = bkpi.inventory_value;
    displayGrowth = bkpi.mom_growth_percent;
    displayCars = bkpi.total_cars_mtd;
    displayTarget = selectedBranch === 'B03' ? 10000000 : 12500000;
    displayTargetCars = selectedBranch === 'B03' ? 60 : 70;
  }

  // Format currency
  const formatBaht = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)} ล้านบาท`;
    }
    return `${value.toLocaleString()} บาท`;
  };

  // Slides for mobile KPI Carousel
  const kpiSlides = [
    {
      title: 'ยอดขายสะสมเดือนนี้',
      value: formatBaht(displaySales),
      target: `เป้าหมาย ${formatBaht(displayTarget)}`,
      percent: Math.round((displaySales / displayTarget) * 100),
      icon: DollarSign,
      color: 'blue',
      glow: 'glow-blue',
      trend: `${displayGrowth}% MoM`
    },
    {
      title: 'มูลค่าอะไหล่คงเหลือ',
      value: formatBaht(displayInventory),
      target: 'จุดสั่งซื้อวิกฤต < 15 รายการ',
      percent: 74, // placeholder percent health
      icon: Boxes,
      color: 'purple',
      glow: 'glow-purple',
      trend: 'เสถียร'
    },
    {
      title: 'ยอดส่งมอบรถยนต์',
      value: `${displayCars} คัน`,
      target: `เป้าหมาย ${displayTargetCars} คัน`,
      percent: Math.round((displayCars / displayTargetCars) * 100),
      icon: Car,
      color: 'green',
      glow: 'glow-green',
      trend: `+12 คันสัปดาห์นี้`
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
    { name: 'อยุธยา 1', value: kpis.branch_kpi.B01.total_sales_mtd, color: '#3b82f6' },
    { name: 'อยุธยา 2', value: kpis.branch_kpi.B02.total_sales_mtd, color: '#a855f7' },
    { name: 'OMODA & JAECOO', value: kpis.branch_kpi.B03.total_sales_mtd, color: '#22c55e' }
  ];

  // Custom SVG Line Chart for 6 months
  const lineChartData = mockData.sales_comparison_mock;
  const maxLineVal = 12000000;
  const chartHeight = 120;
  const chartWidth = 320;
  const padding = 25;

  // Generate SVG coordinates for Line Chart
  const getLineCoordinates = (branchKey) => {
    const points = lineChartData.map((d, index) => {
      const x = padding + (index * (chartWidth - padding * 2)) / (lineChartData.length - 1);
      const y = chartHeight - padding - (d[branchKey] / maxLineVal) * (chartHeight - padding * 2);
      return { x, y };
    });
    return points;
  };

  return (
    <div className="pb-32 pt-4 px-4 max-w-md mx-auto space-y-6">
      
      {/* Filters Header */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-white font-prompt">ภาพรวมธุรกิจ</h1>
            <p className="text-xs text-slate-400">อัปเดตล่าสุด: วันนี้ 14:15 น.</p>
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
              className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            >
              <option value="ALL">เลือก: ทุกสาขา</option>
              {mockData.branches.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
            <div className="absolute right-3 top-3 pointer-events-none text-slate-400">
              <Filter size={14} />
            </div>
          </div>

          {/* Period Dropdown */}
          <div className="flex-1 relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            >
              <option value="june">รอบ: มิ.ย. 2569 (ปัจจุบัน)</option>
              <option value="may">รอบ: พ.ค. 2569</option>
            </select>
            <div className="absolute right-3 top-3 pointer-events-none text-slate-400">
              <ChevronRight size={14} className="rotate-90" />
            </div>
          </div>
        </div>
      </div>

      {/* KPI Carousel Slider (Swipeable Cards on Mobile) */}
      <div className="relative">
        <div className={`rounded-2xl glass-card p-5 relative overflow-hidden ${currentSlide.glow} transition-all duration-500`}>
          {/* Top Info */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-slate-400">{currentSlide.title}</span>
            <div className={`p-2 rounded-xl bg-slate-900/80 text-blue-400`}>
              <SlideIcon size={18} />
            </div>
          </div>

          {/* Main Metric */}
          <div className="space-y-1 mb-4">
            <h2 className="text-2xl font-bold text-white tracking-tight font-prompt">{currentSlide.value}</h2>
            <div className="flex items-center space-x-1.5 text-xs">
              <span className="text-emerald-400 font-semibold flex items-center">
                <TrendingUp size={12} className="mr-0.5" />
                {currentSlide.trend}
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">{currentSlide.target}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-500 font-medium">
              <span>ความคืบหน้า</span>
              <span>{currentSlide.percent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  currentSlide.color === 'blue' ? 'bg-gradient-to-r from-blue-600 to-cyan-400' :
                  currentSlide.color === 'purple' ? 'bg-gradient-to-r from-purple-600 to-pink-400' :
                  'bg-gradient-to-r from-emerald-600 to-teal-400'
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
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 active:bg-slate-800"
          >
            <ChevronLeft size={16} />
          </button>
          
          {/* Navigation dots */}
          <div className="flex space-x-1.5">
            {kpiSlides.map((_, index) => (
              <div 
                key={index} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === kpiIndex ? 'w-4 bg-blue-400' : 'w-1.5 bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={nextKpi}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 active:bg-slate-800"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Showroom Status Stack (Status breakdown) */}
      <div className="glass-card rounded-2xl p-4 space-y-3">
        <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase font-prompt">สถานะสต็อกรถยนต์</h3>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900/80 flex flex-col justify-between">
            <span className="text-[10px] text-slate-400">พร้อมขาย</span>
            <div className="flex items-end justify-between mt-1">
              <span className="text-lg font-bold text-blue-400">320 คัน</span>
              <span className="text-[9px] text-slate-500 font-medium">45.1%</span>
            </div>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900/80 flex flex-col justify-between">
            <span className="text-[10px] text-slate-400">จองแล้ว</span>
            <div className="flex items-end justify-between mt-1">
              <span className="text-lg font-bold text-emerald-400">87 คัน</span>
              <span className="text-[9px] text-slate-500 font-medium">12.3%</span>
            </div>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900/80 flex flex-col justify-between">
            <span className="text-[10px] text-slate-400">รอไฟแนนซ์</span>
            <div className="flex items-end justify-between mt-1">
              <span className="text-lg font-bold text-purple-400">56 คัน</span>
              <span className="text-[9px] text-slate-500 font-medium">7.9%</span>
            </div>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900/80 flex flex-col justify-between">
            <span className="text-[10px] text-slate-400">รอส่งมอบ</span>
            <div className="flex items-end justify-between mt-1">
              <span className="text-lg font-bold text-orange-400">24 คัน</span>
              <span className="text-[9px] text-slate-500 font-medium">3.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Sales Comparison Chart - Displays only if "ALL" is selected */}
      {isAllBranches ? (
        <div className="glass-card rounded-2xl p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase font-prompt">สัดส่วนยอดขายตามสาขา (เดือนนี้)</h3>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium">ยอดรวม</span>
          </div>

          {/* Simple Custom HTML/CSS Bar Chart for Branch Comparison */}
          <div className="space-y-4 pt-1">
            {branchChartData.map((b, idx) => {
              const percentage = Math.round((b.value / maxSales) * 100);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300">{b.name}</span>
                    <span className="text-white">{formatBaht(b.value)}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden flex">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: b.color,
                        boxShadow: `0 0 10px ${b.color}80`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // Render 6-Month Line Trend Chart if single branch is selected
        <div className="glass-card rounded-2xl p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase font-prompt">
              แนวโน้มยอดขายย้อนหลัง 6 เดือน
            </h3>
            <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full font-medium">
              {mockData.branches.find(b => b.id === selectedBranch)?.name}
            </span>
          </div>

          {/* Custom SVG Line Chart */}
          <div className="flex justify-center items-center">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
              {/* Grid Lines */}
              <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="#1e293b" strokeDasharray="3,3" />
              <line x1={padding} y1={chartHeight / 2} x2={chartWidth - padding} y2={chartHeight / 2} stroke="#1e293b" strokeDasharray="3,3" />
              <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#334155" />

              {/* Draw Data Area Line */}
              {(() => {
                const points = getLineCoordinates(selectedBranch);
                const pathD = points.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, '');
                const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`;
                const lineColor = selectedBranch === 'B01' ? '#3b82f6' : selectedBranch === 'B02' ? '#a855f7' : '#22c55e';
                
                return (
                  <>
                    {/* Gradient Fill under Line */}
                    <defs>
                      <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={lineColor} stopOpacity="0.25" />
                        <stop offset="100%" stopColor={lineColor} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d={areaD} fill="url(#chartGlow)" />
                    
                    {/* Line Stroke */}
                    <path d={pathD} fill="none" stroke={lineColor} strokeWidth="2.5" strokeLinecap="round" />

                    {/* Data Points */}
                    {points.map((p, idx) => (
                      <circle key={idx} cx={p.x} cy={p.y} r="3.5" fill="#1e293b" stroke={lineColor} strokeWidth="2" />
                    ))}
                  </>
                );
              })()}

              {/* X Axis Labels */}
              {lineChartData.map((d, index) => {
                const x = padding + (index * (chartWidth - padding * 2)) / (lineChartData.length - 1);
                return (
                  <text 
                    key={index} 
                    x={x} 
                    y={chartHeight - 5} 
                    fill="#64748b" 
                    fontSize="9" 
                    textAnchor="middle"
                    className="font-medium"
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
      <div className="glass-card rounded-2xl p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-semibold text-slate-400 tracking-wider uppercase font-prompt">5 อันดับพนักงานขายยอดเยี่ยม</h3>
          <div className="flex items-center space-x-1 text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full font-medium">
            <Award size={10} />
            <span>พ.ค. - มิ.ย.</span>
          </div>
        </div>

        <div className="divide-y divide-slate-900/60">
          {mockData.salesperson_ranking.map((salesrep, index) => (
            <div key={index} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
              <div className="flex items-center space-x-3">
                {/* Ranking number */}
                <span className={`text-xs font-bold w-4 text-center ${
                  index === 0 ? 'text-amber-400' :
                  index === 1 ? 'text-slate-300' :
                  index === 2 ? 'text-amber-600' : 'text-slate-500'
                }`}>
                  {index + 1}
                </span>

                {/* Avatar */}
                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 border border-slate-700">
                  <img src={salesrep.avatar} alt={salesrep.name} className="w-full h-full object-cover" />
                </div>

                {/* Name & Branch */}
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-200">{salesrep.name}</span>
                  <span className="text-[9px] text-slate-500">{salesrep.branch}</span>
                </div>
              </div>

              {/* Total sales figure */}
              <div className="flex items-center space-x-1">
                <span className="text-xs font-bold text-white">{salesrep.sales}</span>
                <span className="text-[10px] text-slate-500">คัน</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Stock Alerts */}
      <div className="glass-card rounded-2xl p-4 space-y-3">
        <div className="flex justify-between items-center text-rose-400">
          <div className="flex items-center space-x-1.5">
            <ShieldAlert size={14} />
            <h3 className="text-xs font-semibold tracking-wider uppercase font-prompt">การแจ้งเตือนอะไหล่วิกฤต</h3>
          </div>
          <span className="text-[9px] bg-rose-500/10 px-2 py-0.5 rounded-full font-medium">ด่วนที่สุด</span>
        </div>

        <div className="space-y-2">
          <div className="bg-rose-500/5 border border-rose-500/10 rounded-xl p-3 flex items-start space-x-2">
            <div className="text-[10px] text-slate-300 flex-1 space-y-1">
              <p className="font-semibold text-slate-200">ผ้าเบรกหน้า Xpander สต็อกหมดแล้ว</p>
              <p className="text-[9px] text-slate-500">สาขา OMODA & JAECOO อยุธยา สต็อกเหลือ 0 ชิ้น (จุดสั่งสั่งคือ 10 ชิ้น)</p>
            </div>
          </div>
          
          <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-3 flex items-start space-x-2">
            <div className="text-[10px] text-slate-300 flex-1 space-y-1">
              <p className="font-semibold text-slate-200">แบตเตอรี่แห้ง FB 75 ต่ำกว่าเกณฑ์</p>
              <p className="text-[9px] text-slate-500">สาขา Mitsubishi อยุธยา 1 สต็อกเหลือ 8 ชิ้น (ต่ำกว่าจุดสั่งซื้อ 10 ชิ้น)</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
