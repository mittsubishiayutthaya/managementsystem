import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Calendar, 
  User, 
  Building,
  CheckCircle,
  Clock,
  Car
} from 'lucide-react';
import { mockData } from '../data/mockData';

export default function SalesView({ selectedBranch, setSelectedBranch, isDarkMode }) {
  const [filterType, setFilterType] = useState('ALL'); // ALL, จอง, ส่งมอบ

  // Helper to resolve branch name
  const getBranchName = (bId) => {
    const branch = mockData.branches.find(b => b.id === bId);
    return branch ? branch.name : bId;
  };

  // Filter transactions
  const filteredSales = mockData.recent_sales.filter(sale => {
    const matchesBranch = selectedBranch === 'ALL' || sale.branch === selectedBranch;
    const matchesType = filterType === 'ALL' || sale.type === filterType;
    return matchesBranch && matchesType;
  });

  // Calculate totals for filtered list
  const totalAmount = filteredSales.reduce((acc, sale) => acc + sale.amount, 0);
  const countBookings = filteredSales.filter(s => s.type === 'จอง').length;
  const countDeliveries = filteredSales.filter(s => s.type === 'ส่งมอบ').length;

  return (
    <div className="pb-32 pt-4 px-4 max-w-md mx-auto space-y-6 font-prompt">
      
      {/* Page Header */}
      <div>
        <h1 className={`text-lg font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>ประวัติยอดขายรถยนต์สะสม</h1>
        <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>รายการรับจองและส่งมอบรถยนต์ล่าสุดทุกศูนย์บริการ</p>
      </div>

      {/* Transaction type filter chips */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setFilterType('ALL')}
          className={`text-xs font-bold py-3 rounded-xl border text-center transition-all ${
            filterType === 'ALL'
              ? (isDarkMode ? 'bg-slate-900 text-blue-400 border-blue-500/30 shadow-sm' : 'bg-blue-50 text-blue-650 border-blue-200 shadow-sm')
              : (isDarkMode ? 'bg-slate-900/40 text-slate-400 border-slate-800' : 'bg-white text-slate-600 border-slate-205 hover:bg-slate-50')
          }`}
        >
          ทั้งหมด ({filteredSales.length})
        </button>
        <button
          onClick={() => setFilterType('จอง')}
          className={`text-xs font-bold py-3 rounded-xl border text-center transition-all ${
            filterType === 'จอง'
              ? (isDarkMode ? 'bg-blue-600/10 text-blue-400 border-blue-500/30' : 'bg-blue-50 text-blue-650 border-blue-200')
              : (isDarkMode ? 'bg-slate-900/40 text-slate-400 border-slate-800' : 'bg-white text-slate-655 border-slate-205 hover:bg-slate-50')
          }`}
        >
          รายการจอง ({mockData.recent_sales.filter(s => (selectedBranch === 'ALL' || s.branch === selectedBranch) && s.type === 'จอง').length})
        </button>
        <button
          onClick={() => setFilterType('ส่งมอบ')}
          className={`text-xs font-bold py-3 rounded-xl border text-center transition-all ${
            filterType === 'ส่งมอบ'
              ? (isDarkMode ? 'bg-emerald-600/10 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-650 border-emerald-200')
              : (isDarkMode ? 'bg-slate-900/40 text-slate-400 border-slate-800' : 'bg-white text-slate-655 border-slate-205 hover:bg-slate-50')
          }`}
        >
          ส่งมอบรถ ({mockData.recent_sales.filter(s => (selectedBranch === 'ALL' || s.branch === selectedBranch) && s.type === 'ส่งมอบ').length})
        </button>
      </div>

      {/* Summary Stats Panel */}
      <div className={`rounded-2xl p-4.5 flex justify-between items-center relative overflow-hidden border transition-all duration-300 ${
        isDarkMode ? 'dark-glass border-slate-800' : 'light-glass border-slate-200 shadow-sm'
      }`}>
        <div className="space-y-1">
          <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>รวมมูลค่าธุรกรรมที่ทำรายการ</span>
          <h2 className={`text-xl font-bold font-prompt ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{(totalAmount / 1000000).toFixed(2)} ล้านบาท</h2>
        </div>
        
        <div className="flex space-x-3 text-right shrink-0">
          <div className="flex flex-col">
            <span className={`text-[10px] font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>ยอดรับจอง</span>
            <span className={`text-sm font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-650'}`}>{countBookings} คัน</span>
          </div>
          <div className="flex flex-col">
            <span className={`text-[10px] font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>ส่งมอบแล้ว</span>
            <span className={`text-sm font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-650'}`}>{countDeliveries} คัน</span>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredSales.length > 0 ? (
          filteredSales.map((sale) => (
            <div 
              key={sale.id}
              className={`rounded-xl p-4 border space-y-3.5 relative overflow-hidden transition-all duration-300 ${
                isDarkMode ? 'dark-glass border-slate-800' : 'light-glass border-slate-205 shadow-sm'
              }`}
            >
              {/* Top Row: Type Indicator and Status */}
              <div className="flex justify-between items-center">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  sale.type === 'จอง' 
                    ? (isDarkMode ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' : 'text-blue-650 bg-blue-50 border-blue-150') 
                    : (isDarkMode ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-emerald-650 bg-emerald-50 border-emerald-150')
                }`}>
                  {sale.type === 'จอง' ? 'ใบเสนอจองรถยนต์' : 'ส่งมอบรถยนต์'}
                </span>
                
                <span className={`text-xs font-bold flex items-center ${
                  sale.status === 'สำเร็จ' 
                    ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-650') 
                    : (isDarkMode ? 'text-amber-400' : 'text-amber-600')
                }`}>
                  {sale.status === 'สำเร็จ' ? <CheckCircle size={12} className="mr-1" /> : <Clock size={12} className="mr-1" />}
                  <span>{sale.status}</span>
                </span>
              </div>

              {/* Middle Section: Car Model and Branch */}
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <Car size={15} className="text-slate-400 shrink-0" />
                  <h3 className={`text-sm font-bold truncate ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{sale.car_model}</h3>
                </div>
                
                <div className={`flex items-center space-x-1.5 text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  <Building size={13} className="text-slate-505 shrink-0" />
                  <span>{getBranchName(sale.branch)}</span>
                </div>
              </div>

              {/* Bottom Row: Customer & Date and Amount */}
              <div className={`flex items-center justify-between pt-3 text-xs border-t ${
                isDarkMode ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <div className={`flex items-center space-x-4 font-medium ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  <span className="flex items-center">
                    <User size={12} className="mr-1.5 text-slate-500" />
                    {sale.customer}
                  </span>
                  <span className="flex items-center font-mono">
                    <Calendar size={12} className="mr-1.5 text-slate-500" />
                    {sale.date}
                  </span>
                </div>

                {/* Amount */}
                <div className="text-right">
                  <span className={`text-sm font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-850'}`}>
                    {sale.amount.toLocaleString()} ฿
                  </span>
                </div>
              </div>

              {/* Decorative side accent line */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                sale.type === 'จอง' ? 'bg-blue-500' : 'bg-emerald-500'
              }`} />
            </div>
          ))
        ) : (
          <div className={`rounded-xl p-8 flex flex-col items-center justify-center space-y-2 border transition-all duration-300 ${
            isDarkMode ? 'bg-slate-900/20 border-slate-800 text-slate-500' : 'bg-white border-slate-200 text-slate-400'
          }`}>
            <ShoppingBag size={32} className="text-slate-500" />
            <p className="text-xs font-bold">ไม่พบประวัติการทำยอดขายในรอบนี้</p>
          </div>
        )}
      </div>

    </div>
  );
}
