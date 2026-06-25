export const mockData = {
  branches: [
    { id: "B01", name: "Mitsubishi อยุธยา 1" },
    { id: "B02", name: "Mitsubishi อยุธยา 2" },
    { id: "B03", name: "OMODA & JAECOO อยุธยา" }
  ],
  dashboard_kpi: {
    // Consolidated values
    total_sales_mtd: 28450000,
    target_sales_mtd: 35000000,
    inventory_value: 8420000,
    mom_growth_percent: 5.2,
    today_bookings: 18,
    today_deliveries: 14,
    total_cars_mtd: 156,
    target_cars_mtd: 200,
    
    // Branch-specific breakdown for KPIs
    branch_kpi: {
      B01: {
        total_sales_mtd: 11380000,
        inventory_value: 3200000,
        mom_growth_percent: 4.8,
        today_bookings: 7,
        today_deliveries: 6,
        total_cars_mtd: 62
      },
      B02: {
        total_sales_mtd: 9240000,
        inventory_value: 2900000,
        mom_growth_percent: 3.5,
        today_bookings: 5,
        today_deliveries: 4,
        total_cars_mtd: 51
      },
      B03: {
        total_sales_mtd: 7830000,
        inventory_value: 2320000,
        mom_growth_percent: 7.9,
        today_bookings: 6,
        today_deliveries: 4,
        total_cars_mtd: 43
      }
    }
  },
  sales_comparison_mock: [
    { month: "ม.ค.", B01: 9500000, B02: 8100000, B03: 6200000 },
    { month: "ก.พ.", B01: 9800000, B02: 8300000, B03: 6500000 },
    { month: "มี.ค.", B01: 10200000, B02: 8800000, B03: 7100000 },
    { month: "เม.ย.", B01: 9200000, B02: 7900000, B03: 6800000 },
    { month: "พ.ค.", B01: 10800000, B02: 9100000, B03: 7400000 },
    { month: "มิ.ย.", B01: 11380000, B02: 9240000, B03: 7830000 }
  ],
  inventory_mock: [
    {
      part_no: "OIL-5W30-SYN",
      name: "น้ำมันเครื่องสังเคราะห์แท้ 5W-30 (4L)",
      category: "ของเหลวและสารหล่อลื่น",
      stock_B01: 150,
      stock_B02: 80,
      stock_B03: 120,
      reorder_point: 100,
      unit_price: 1850
    },
    {
      part_no: "BF-MIT-XP-F",
      name: "ผ้าเบรกหน้า Xpander",
      category: "ระบบเบรก",
      stock_B01: 12,
      stock_B02: 5,
      stock_B03: 0, // Out of stock in RYG
      reorder_point: 10,
      unit_price: 2450
    },
    {
      part_no: "BF-OMD-C5-F",
      name: "ผ้าเบรกหน้า Omoda C5",
      category: "ระบบเบรก",
      stock_B01: 0,
      stock_B02: 0,
      stock_B03: 25,
      reorder_point: 8,
      unit_price: 3100
    },
    {
      part_no: "FIL-OIL-XP",
      name: "กรองน้ำมันเครื่อง Triton/Xpander",
      category: "ไส้กรอง",
      stock_B01: 340,
      stock_B02: 210,
      stock_B03: 0,
      reorder_point: 80,
      unit_price: 220
    },
    {
      part_no: "BAT-FB-75L",
      name: "แบตเตอรี่แห้ง FB 75 แอมป์",
      category: "ระบบไฟ",
      stock_B01: 8,
      stock_B02: 15,
      stock_B03: 6,
      reorder_point: 10, // Under stock in B01, B03
      unit_price: 3200
    },
    {
      part_no: "SP-NGK-LFR6",
      name: "หัวเทียน NGK Iridium LFR6 (ชุด 4 หัว)",
      category: "ระบบจุดระเบิด",
      stock_B01: 45,
      stock_B02: 32,
      stock_B03: 28,
      reorder_point: 20,
      unit_price: 1600
    },
    {
      part_no: "BLD-WPR-XP",
      name: "ยางปัดน้ำฝน Xpander คู่หน้า",
      category: "อุปกรณ์ภายนอก",
      stock_B01: 4,
      stock_B02: 12,
      stock_B03: 0,
      reorder_point: 10,
      unit_price: 650
    }
  ],
  recent_sales: [
    {
      id: "TX-9021",
      customer: "คุณธีรเดช รัตนพาณิชย์",
      car_model: "Mitsubishi Xpander Cross",
      branch: "B01",
      date: "2026-06-25",
      type: "จอง",
      amount: 946000,
      status: "สำเร็จ"
    },
    {
      id: "TX-9022",
      customer: "คุณพัชราภรณ์ แสนดี",
      car_model: "Omoda C5 EV Premium",
      branch: "B03",
      date: "2026-06-25",
      type: "ส่งมอบ",
      amount: 1249000,
      status: "สำเร็จ"
    },
    {
      id: "TX-9023",
      customer: "คุณสมพงษ์ ดวงดี",
      car_model: "Mitsubishi Triton Athlete",
      branch: "B02",
      date: "2026-06-25",
      type: "จอง",
      amount: 1125000,
      status: "ไฟแนนซ์ผ่านแล้ว"
    },
    {
      id: "TX-9024",
      customer: "คุณอัญชลี ศรีกรุง",
      car_model: "Jaecoo 6 EV",
      branch: "B03",
      date: "2026-06-24",
      type: "จอง",
      amount: 1099000,
      status: "รอไฟแนนซ์"
    },
    {
      id: "TX-9025",
      customer: "คุณวิเชียร ปานประดับ",
      car_model: "Mitsubishi Pajero Sport Elite Edition",
      branch: "B01",
      date: "2026-06-24",
      type: "ส่งมอบ",
      amount: 1679000,
      status: "สำเร็จ"
    }
  ],
  salesperson_ranking: [
    { name: "ศิวกร เลิศวัฒนชัย", branch: "Mitsubishi อยุธยา 1", sales: 25, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" },
    { name: "กมลวรรณ ใจดี", branch: "Mitsubishi อยุธยา 2", sales: 21, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100" },
    { name: "ธนพล อัครเดชากุล", branch: "OMODA & JAECOO อยุธยา", sales: 18, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" },
    { name: "วิภาวี ศรีสมบัติ", branch: "Mitsubishi อยุธยา 1", sales: 17, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" },
    { name: "อนุวัฒน์ คำภีระ", branch: "OMODA & JAECOO อยุธยา", sales: 15, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" }
  ]
};
