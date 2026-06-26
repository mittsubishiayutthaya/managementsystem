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
    if (total === 0) return { label: 'สินค้าหมด', color: 'text-rose-400 bg-rose-500/10 border-rose-500/25', icon: XCircle };
    if (total <= item.reorder_point) return { label: 'สต็อกต่ำ', color: 'text-amber-400 bg-amber-500/10 border-amber-500/25', icon: AlertTriangle };
    return { label: 'ปกติ', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25', icon: CheckCircle2 };
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
    }, 1800);
  };

  return (
    <div className="pb-32 pt-4 px-4 max-w-md mx-auto space-y-6 font-prompt">
      
      {/* Page Header */}
      <div>
        <h1 className="text-lg font-bold tracking-tight text-white">ตรวจสอบคลังอะไหล่สะสม</h1>
        <p className="text-xs text-slate-400">ค้นหารายละเอียดสินค้า ตรวจสอบคงคลัง และโอนย้ายข้ามสาขา</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="ค้นหาด้วยรหัสอะไหล่ หรือชื่อสินค้า..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0f172a] border border-slate-800 text-slate-200 text-xs rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-500 font-medium"
        />
        <div className="absolute left-3.5 top-4 text-slate-400">
          <Search size={16} />
        </div>
      </div>

      {/* Categories chips (Horizontal scrolling) */}
      <div className="flex space-x-1.5 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-3.5 py-2 rounded-full font-bold border whitespace-nowrap transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-blue-600/20 text-blue-400 border-blue-500/40 shadow-sm'
                : 'bg-slate-900/60 text-slate-400 border-slate-800/80 hover:bg-slate-900'
            }`}
          >
            {cat === 'ALL' ? 'หมวดหมู่ทั้งหมด' : cat}
          </button>
        ))}
      </div>

      {/* Parts List */}
      <div className="space-y-3.5">
        {filteredParts.length > 0 ? (
          filteredParts.map((item) => {
            const isExpanded = expandedItem === item.part_no;
            const totalStock = getItemTotalStock(item);
            const status = getStockStatus(item);
            const StatusIcon = status.icon;

            return (
              <div 
                key={item.part_no}
                className="glass-card rounded-xl overflow-hidden transition-all duration-300 border border-slate-800"
              >
                {/* Accordion Trigger */}
                <div 
                  onClick={() => toggleAccordion(item.part_no)}
                  className="p-4 flex items-center justify-between cursor-pointer active:bg-slate-900/20"
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <span className="text-xs text-slate-500 font-bold tracking-wider block mb-0.5 font-mono">{item.part_no}</span>
                    <h3 className="text-sm font-bold text-slate-200 truncate">{item.name}</h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-slate-400 flex items-center font-bold">
                        <Layers size={12} className="mr-1 text-slate-500" />
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2 pl-2">
                    {/* Status Badge */}
                    <div className={`flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full border font-bold ${status.color}`}>
                      <StatusIcon size={10} />
                      <span>{status.label}</span>
                    </div>
                    {/* Stock Value */}
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-bold text-white">{totalStock}</span>
                      <span className="text-xs text-slate-500 font-bold">ชิ้น</span>
                    </div>
                  </div>

                  <div className="text-slate-500 pl-3">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {/* Accordion Expansion Panel */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 bg-slate-950/40 border-t border-slate-900/50 space-y-4">
                    {/* Branch breakdown */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs text-slate-400 font-bold tracking-wider uppercase">จำนวนสินค้าคงคลังแยกรายสาขา</h4>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800 flex flex-col items-center">
                          <span className="text-xs text-slate-400 text-center font-bold truncate w-full">อยุธยา 1</span>
                          <span className={`text-xs font-bold mt-1 ${item.stock_B01 === 0 ? 'text-rose-500' : 'text-slate-200'}`}>
                            {item.stock_B01} ชิ้น
                          </span>
                        </div>

                        <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800 flex flex-col items-center">
                          <span className="text-xs text-slate-400 text-center font-bold truncate w-full">อยุธยา 2</span>
                          <span className={`text-xs font-bold mt-1 ${item.stock_B02 === 0 ? 'text-rose-500' : 'text-slate-200'}`}>
                            {item.stock_B02} ชิ้น
                          </span>
                        </div>

                        <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800 flex flex-col items-center">
                          <span className="text-xs text-slate-400 text-center font-bold truncate w-full">OMODA อยุธยา</span>
                          <span className={`text-xs font-bold mt-1 ${item.stock_B03 === 0 ? 'text-rose-500' : 'text-slate-200'}`}>
                            {item.stock_B03} ชิ้น
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price Tag & Transfer Trigger */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-900/20">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 font-bold">ราคาแนะนำจำหน่าย</span>
                        <span className="text-sm font-bold text-blue-400">{item.unit_price.toLocaleString()} ฿</span>
                      </div>
                      
                      <button
                        onClick={() => {
                          setTransferModal(item);
                          setFromBranch('');
                          setToBranch('');
                        }}
                        className="flex items-center space-x-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold px-3.5 py-2.5 rounded-lg transition-colors shadow-md"
                      >
                        <ArrowLeftRight size={13} />
                        <span>โอนย้ายสินค้า</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="glass-card rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 space-y-2 border border-slate-800">
            <Package size={32} className="text-slate-600" />
            <p className="text-xs font-bold">ไม่พบรายการอะไหล่ตามที่ระบุ</p>
          </div>
        )}
      </div>

      {/* Stock Transfer Dialog Overlay Modal */}
      {transferModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-850 rounded-2xl w-full max-w-sm p-6 space-y-5 shadow-2xl relative">
            
            {/* Modal Title */}
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-white font-prompt">แบบคำขอโอนย้ายอะไหล่</h3>
              <p className="text-xs text-slate-300 font-semibold truncate">{transferModal.name}</p>
              <p className="text-xs text-slate-550 font-bold font-mono">{transferModal.part_no}</p>
            </div>

            {transferSuccess ? (
              <div className="py-8 flex flex-col items-center justify-center space-y-2 text-emerald-400 animate-pulse">
                <CheckCircle2 size={40} />
                <p className="text-sm font-bold">ระบบอนุมัติการโอนย้ายสำเร็จ!</p>
              </div>
            ) : (
              <form onSubmit={handleTransferSubmit} className="space-y-4">
                {/* Source Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-bold">สาขาต้นทาง (ผู้โอนสินค้าออก)</label>
                  <select
                    required
                    value={fromBranch}
                    onChange={(e) => setFromBranch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 text-slate-200 text-xs rounded-lg px-3 py-2.5 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">-- เลือกศูนย์บริการต้นทาง --</option>
                    <option value="B01" disabled={transferModal.stock_B01 === 0}>Mitsubishi อยุธยา 1 ({transferModal.stock_B01} ชิ้น)</option>
                    <option value="B02" disabled={transferModal.stock_B02 === 0}>Mitsubishi อยุธยา 2 ({transferModal.stock_B02} ชิ้น)</option>
                    <option value="B03" disabled={transferModal.stock_B03 === 0}>OMODA & JAECOO อยุธยา ({transferModal.stock_B03} ชิ้น)</option>
                  </select>
                </div>

                {/* Target Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-bold">สาขาปลายทาง (ผู้รับสินค้าเข้า)</label>
                  <select
                    required
                    value={toBranch}
                    onChange={(e) => setToBranch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-855 text-slate-200 text-xs rounded-lg px-3 py-2.5 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">-- เลือกศูนย์บริการปลายทาง --</option>
                    <option value="B01" disabled={fromBranch === 'B01'}>Mitsubishi อยุธยา 1 ({transferModal.stock_B01} ชิ้น)</option>
                    <option value="B02" disabled={fromBranch === 'B02'}>Mitsubishi อยุธยา 2 ({transferModal.stock_B02} ชิ้น)</option>
                    <option value="B03" disabled={fromBranch === 'B03'}>OMODA & JAECOO อยุธยา ({transferModal.stock_B03} ชิ้น)</option>
                  </select>
                </div>

                {/* Quantity */}
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-bold">จำนวนสินค้าที่ขอโอนย้าย (ชิ้น)</label>
                  <input
                    type="number"
                    min="1"
                    max={fromBranch ? transferModal[`stock_${fromBranch}`] : 99}
                    required
                    value={transferQty}
                    onChange={(e) => setTransferQty(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-855 text-slate-200 text-xs rounded-lg px-3 py-2.5 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2.5 pt-3">
                  <button
                    type="button"
                    onClick={() => setTransferModal(null)}
                    className="flex-1 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold py-2.5 rounded-lg transition-colors border border-slate-700"
                  >
                    ยกเลิกคำขอ
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-lg transition-colors shadow-sm"
                  >
                    อนุมัติโอนย้าย
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
