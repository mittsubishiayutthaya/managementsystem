import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeftRight, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Package,
  Layers
} from 'lucide-react';
import { mockData } from '../data/mockData';

export default function InventoryView() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [expandedItem, setExpandedItem] = useState(null);
  
  // States for stock transfer simulation
  const [transferModal, setTransferModal] = useState(null); // stores the part object when active
  const [fromBranch, setFromBranch] = useState('');
  const [toBranch, setToBranch] = useState('');
  const [transferQty, setTransferQty] = useState(1);
  const [transferSuccess, setTransferSuccess] = useState(false);

  // Extract unique categories
  const categories = ['ALL', ...new Set(mockData.inventory_mock.map(item => item.category))];

  // Toggle accordion item
  const toggleAccordion = (partNo) => {
    if (expandedItem === partNo) {
      setExpandedItem(null);
    } else {
      setExpandedItem(partNo);
    }
  };

  // Filter parts list
  const filteredParts = mockData.inventory_mock.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.part_no.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate total stock for an item
  const getItemTotalStock = (item) => {
    return item.stock_B01 + item.stock_B02 + item.stock_B03;
  };

  // Helper for stock health
  const getStockStatus = (item) => {
    const total = getItemTotalStock(item);
    if (total === 0) return { label: 'สินค้าหมด', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', icon: XCircle };
    if (total <= item.reorder_point) return { label: 'สต็อกต่ำ', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', icon: AlertTriangle };
    return { label: 'ปกติ', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle2 };
  };

  // Simulated Transfer Submission
  const handleTransferSubmit = (e) => {
    e.preventDefault();
    if (!fromBranch || !toBranch || transferQty <= 0) return;
    
    // Simulate updating mock stock values in state (would update backend in real life)
    const qtyKeyFrom = `stock_${fromBranch}`;
    const qtyKeyTo = `stock_${toBranch}`;
    
    if (transferModal[qtyKeyFrom] < transferQty) {
      alert('จำนวนอะไหล่ต้นทางไม่เพียงพอสำหรับการโอนย้าย');
      return;
    }

    transferModal[qtyKeyFrom] -= Number(transferQty);
    transferModal[qtyKeyTo] += Number(transferQty);

    setTransferSuccess(true);
    setTimeout(() => {
      setTransferSuccess(false);
      setTransferModal(null);
      setFromBranch('');
      setToBranch('');
      setTransferQty(1);
    }, 2000);
  };

  return (
    <div className="pb-32 pt-4 px-4 max-w-md mx-auto space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white font-prompt">ตรวจสอบคลังอะไหล่</h1>
        <p className="text-xs text-slate-400">ค้นหา เช็คสถานะ และทำรายการโอนย้ายระหว่างสาขา</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="ค้นหาด้วยรหัส หรือชื่ออะไหล่..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl pl-9 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-500"
        />
        <div className="absolute left-3 top-3.5 text-slate-400">
          <Search size={14} />
        </div>
      </div>

      {/* Categories chips (Horizontal scrolling) */}
      <div className="flex space-x-1.5 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`text-[10px] px-3 py-1.5 rounded-full font-medium border whitespace-nowrap transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-blue-600/20 text-blue-400 border-blue-500/40 glow-blue'
                : 'bg-slate-900/60 text-slate-400 border-slate-800/80 hover:bg-slate-900 hover:text-slate-300'
            }`}
          >
            {cat === 'ALL' ? 'ทั้งหมด' : cat}
          </button>
        ))}
      </div>

      {/* Parts List */}
      <div className="space-y-3">
        {filteredParts.length > 0 ? (
          filteredParts.map((item) => {
            const isExpanded = expandedItem === item.part_no;
            const totalStock = getItemTotalStock(item);
            const status = getStockStatus(item);
            const StatusIcon = status.icon;

            return (
              <div 
                key={item.part_no}
                className="glass-card rounded-xl overflow-hidden transition-all duration-300 border border-slate-800/60"
              >
                {/* Accordion Trigger */}
                <div 
                  onClick={() => toggleAccordion(item.part_no)}
                  className="p-4 flex items-center justify-between cursor-pointer active:bg-slate-900/25"
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">{item.part_no}</span>
                    <h3 className="text-xs font-semibold text-slate-200 truncate">{item.name}</h3>
                    <div className="flex items-center space-x-2 mt-1.5">
                      <span className="text-[10px] text-slate-400 flex items-center font-medium">
                        <Layers size={10} className="mr-1 text-slate-500" />
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-1.5 pl-2">
                    {/* Status Badge */}
                    <div className={`flex items-center space-x-1 text-[9px] px-2 py-0.5 rounded-full border font-medium ${status.color}`}>
                      <StatusIcon size={8} />
                      <span>{status.label}</span>
                    </div>
                    {/* Stock Value */}
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-bold text-white">{totalStock}</span>
                      <span className="text-[9px] text-slate-500 font-medium">ชิ้น</span>
                    </div>
                  </div>

                  <div className="text-slate-500 pl-3">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {/* Accordion Expansion Panel */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 bg-slate-950/40 border-t border-slate-900/40 space-y-4">
                    {/* Branch breakdown */}
                    <div className="space-y-2">
                      <h4 className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">จำนวนสินค้าคงเหลือแยกสาขา</h4>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-slate-900/40 p-2.5 rounded-lg border border-slate-900 flex flex-col items-center">
                          <span className="text-[9px] text-slate-400 text-center font-medium truncate w-full">อยุธยา 1</span>
                          <span className={`text-xs font-bold mt-1 ${item.stock_B01 === 0 ? 'text-rose-500' : 'text-slate-200'}`}>
                            {item.stock_B01} ชิ้น
                          </span>
                        </div>

                        <div className="bg-slate-900/40 p-2.5 rounded-lg border border-slate-900 flex flex-col items-center">
                          <span className="text-[9px] text-slate-400 text-center font-medium truncate w-full">อยุธยา 2</span>
                          <span className={`text-xs font-bold mt-1 ${item.stock_B02 === 0 ? 'text-rose-500' : 'text-slate-200'}`}>
                            {item.stock_B02} ชิ้น
                          </span>
                        </div>

                        <div className="bg-slate-900/40 p-2.5 rounded-lg border border-slate-900 flex flex-col items-center">
                          <span className="text-[9px] text-slate-400 text-center font-medium truncate w-full">OMODA อยุธยา</span>
                          <span className={`text-xs font-bold mt-1 ${item.stock_B03 === 0 ? 'text-rose-500' : 'text-slate-200'}`}>
                            {item.stock_B03} ชิ้น
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price Tag & Transfer Trigger */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-500">ราคาแนะนำขาย</span>
                        <span className="text-xs font-bold text-blue-400">{item.unit_price.toLocaleString()} ฿</span>
                      </div>
                      
                      <button
                        onClick={() => {
                          setTransferModal(item);
                          setFromBranch('');
                          setToBranch('');
                        }}
                        className="flex items-center space-x-1 text-[10px] bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded-lg transition-colors shadow-sm"
                      >
                        <ArrowLeftRight size={12} />
                        <span>โอนย้ายสต็อก</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="glass-card rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 space-y-2">
            <Package size={28} className="text-slate-600 animate-pulse" />
            <p className="text-xs font-medium">ไม่พบรายการอะไหล่ตามที่ค้นหา</p>
          </div>
        )}
      </div>

      {/* Stock Transfer Dialog Overlay Modal */}
      {transferModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xs p-5 space-y-4 shadow-2xl relative">
            
            {/* Modal Title */}
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white font-prompt">โอนย้ายสต็อกอะไหล่</h3>
              <p className="text-[10px] text-slate-400 truncate">{transferModal.name}</p>
              <p className="text-[9px] text-slate-500 font-bold font-mono">{transferModal.part_no}</p>
            </div>

            {transferSuccess ? (
              <div className="py-6 flex flex-col items-center justify-center space-y-2 text-emerald-400 animate-bounce">
                <CheckCircle2 size={36} />
                <p className="text-xs font-semibold">ส่งเรื่องโอนย้ายสำเร็จ!</p>
              </div>
            ) : (
              <form onSubmit={handleTransferSubmit} className="space-y-3.5">
                {/* Source Selection */}
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-medium">สาขาต้นทาง (จ่าย)</label>
                  <select
                    required
                    value={fromBranch}
                    onChange={(e) => setFromBranch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">-- เลือกสาขาต้นทาง --</option>
                    <option value="B01" disabled={transferModal.stock_B01 === 0}>Mitsubishi อยุธยา 1 ({transferModal.stock_B01} ชิ้น)</option>
                    <option value="B02" disabled={transferModal.stock_B02 === 0}>Mitsubishi อยุธยา 2 ({transferModal.stock_B02} ชิ้น)</option>
                    <option value="B03" disabled={transferModal.stock_B03 === 0}>OMODA & JAECOO อยุธยา ({transferModal.stock_B03} ชิ้น)</option>
                  </select>
                </div>

                {/* Target Selection */}
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-medium">สาขาปลายทาง (รับ)</label>
                  <select
                    required
                    value={toBranch}
                    onChange={(e) => setToBranch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">-- เลือกสาขาปลายทาง --</option>
                    <option value="B01" disabled={fromBranch === 'B01'}>Mitsubishi อยุธยา 1 ({transferModal.stock_B01} ชิ้น)</option>
                    <option value="B02" disabled={fromBranch === 'B02'}>Mitsubishi อยุธยา 2 ({transferModal.stock_B02} ชิ้น)</option>
                    <option value="B03" disabled={fromBranch === 'B03'}>OMODA & JAECOO อยุธยา ({transferModal.stock_B03} ชิ้น)</option>
                  </select>
                </div>

                {/* Quantity */}
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-medium">จำนวนโอนย้าย (ชิ้น)</label>
                  <input
                    type="number"
                    min="1"
                    max={fromBranch ? transferModal[`stock_${fromBranch}`] : 99}
                    required
                    value={transferQty}
                    onChange={(e) => setTransferQty(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setTransferModal(null)}
                    className="flex-1 bg-slate-850 hover:bg-slate-800 text-slate-300 text-xs font-semibold py-2 rounded-lg transition-colors"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                  >
                    ยืนยันโอนย้าย
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
