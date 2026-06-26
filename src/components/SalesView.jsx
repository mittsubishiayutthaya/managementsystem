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

export default function SalesView({ selectedBranch }) {
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
        <h1 className="text-lg font-bold tracking-tight text-white">ประวัติยอดขายรถยนต์สะสม</h1>
        <p className="text-xs text-slate-400">รายการรับจองและส่งมอบรถยนต์ล่าสุดทุกศูนย์บริการ</p>
      </div>

      {/* Transaction type filter chips */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setFilterType('ALL')}
          className={`text-xs font-bold py-3 rounded-xl border text-center transition-all ${
            filterType === 'ALL'
              ? 'bg-slate-900 text-blue-400 border-blue-500/30 shadow-sm'
              : 'bg-slate-900/40 text-slate-400 border-slate-800'
          }`}
        >
          ทั้งหมด ({filteredSales.length})
        </button>
        <button
          onClick={() => setFilterType('จอง')}
          className={`text-xs font-bold py-3 rounded-xl border text-center transition-all ${
            filterType === 'จอง'
              ? 'bg-blue-600/10 text-blue-400 border-blue-500/30'
              : 'bg-slate-900/40 text-slate-400 border-slate-800'
          }`}
        >
          รายการจอง ({mockData.recent_sales.filter(s => (selectedBranch === 'ALL' || s.branch === selectedBranch) && s.type === 'จอง').length})
        </button>
        <button
          onClick={() => setFilterType('ส่งมอบ')}
          className={`text-xs font-bold py-3 rounded-xl border text-center transition-all ${
            filterType === 'ส่งมอบ'
              ? 'bg-emerald-600/10 text-emerald-400 border-emerald-500/30'
              : 'bg-slate-900/40 text-slate-400 border-slate-800'
          }`}
        >
          ส่งมอบรถ ({mockData.recent_sales.filter(s => (selectedBranch === 'ALL' || s.branch === selectedBranch) && s.type === 'ส่งมอบ').length})
        </button>
      </div>

      {/* Summary Stats Panel */}
      <div className="glass-card rounded-2xl p-4.5 flex justify-between items-center relative overflow-hidden border border-slate-800">
        <div className="space-y-1">
          <span className="text-xs text-slate-400 font-bold">รวมมูลค่าธุรกรรมที่ทำรายการ</span>
          <h2 className="text-xl font-bold text-white font-prompt">{(totalAmount / 1000000).toFixed(2)} ล้านบาท</h2>
        </div>
        
        <div className="flex space-x-3 text-right shrink-0">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold">ยอดรับจอง</span>
            <span className="text-sm font-bold text-blue-400">{countBookings} คัน</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold">ส่งมอบแล้ว</span>
            <span className="text-sm font-bold text-emerald-400">{countDeliveries} คัน</span>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredSales.length > 0 ? (
          filteredSales.map((sale) => (
            <div 
              key={sale.id}
              className="glass-card rounded-xl p-4 border border-slate-800 space-y-3.5 relative overflow-hidden"
            >
              {/* Top Row: Type Indicator and Status */}
              <div className="flex justify-between items-center">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  sale.type === 'จอง' 
                    ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' 
                    : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                }`}>
                  {sale.type === 'จอง' ? 'ใบเสนอจองรถยนต์' : 'ส่งมอบรถยนต์'}
                </span>
                
                <span className={`text-xs font-bold flex items-center ${
                  sale.status === 'สำเร็จ' ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {sale.status === 'สำเร็จ' ? <CheckCircle size={12} className="mr-1" /> : <Clock size={12} className="mr-1" />}
                  <span>{sale.status}</span>
                </span>
              </div>

              {/* Middle Section: Car Model and Branch */}
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <Car size={15} className="text-slate-400 shrink-0" />
                  <h3 className="text-sm font-bold text-slate-100">{sale.car_model}</h3>
                </div>
                
                <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-bold">
                  <Building size={13} className="text-slate-500 shrink-0" />
                  <span>{getBranchName(sale.branch)}</span>
                </div>
              </div>

              {/* Bottom Row: Customer & Date and Amount */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-900/60 text-xs">
                <div className="flex items-center space-x-4 text-slate-300 font-medium">
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
                  <span className="text-sm font-bold text-slate-200">
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
          <div className="glass-card rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 space-y-2 border border-slate-800">
            <ShoppingBag size={32} className="text-slate-600 animate-pulse" />
            <p className="text-xs font-bold">ไม่พบประวัติการทำยอดขายในรอบนี้</p>
          </div>
        )}
      </div>

    </div>
  );
}
