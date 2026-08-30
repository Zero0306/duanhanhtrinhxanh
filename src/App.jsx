import { useState, useEffect } from "react";
import {
  Activity,
  Anchor,
  ArrowDownToLine,
  ArrowUpFromLine,
  Bell,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Droplets,
  Home,
  Leaf,
  LogOut,
  MapPin,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Navigation,
  Package,
  Plus,
  ReceiptText,
  Search,
  Ship,
  Sparkles,
  UserRound,
  Wallet,
  Phone,
  X,
  Landmark,
  CreditCard,
  Map,
  ShieldCheck,
  Upload,
  LockKeyhole,
  Users,
  Route,
  Gauge,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  QrCode,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  UserCheck,
  SlidersHorizontal,
  Waves,
  Compass,
  Fish,
  Wheat,
  Boxes,
  Navigation2,
  CheckCheck,
  ArrowLeft,
  LayoutGrid,
  LayoutDashboard,
  TrendingUp,
  Star,
  Thermometer,
  Wind,
  AlertTriangle,
} from "lucide-react";
import appLogo from "./assets/logo.png";
const userNavItems = [
  { id: "home", label: "Trang chủ", mobileLabel: "Trang chủ", icon: Home },
  { id: "activity", label: "Hoạt động", mobileLabel: "Hoạt động", icon: Activity },
  { id: "payment", label: "Thanh toán", mobileLabel: "Thanh toán", icon: Wallet },
  { id: "notifications", label: "Thông báo", mobileLabel: "Thông báo", icon: Bell },
  { id: "profile", label: "Tôi", mobileLabel: "Tôi", icon: UserRound },
];

const htxNavItems = [
  { id: "home", label: "Tổng quan", mobileLabel: "Tổng quan", icon: Activity },
  { id: "members", label: "Xã viên", mobileLabel: "Xã viên", icon: Users },
  { id: "pooling", label: "Gom đơn & HĐ", mobileLabel: "Đơn & HĐ", icon: Boxes },
  { id: "environment", label: "Môi trường", mobileLabel: "Môi trường", icon: Droplets },
  { id: "profile", label: "Tôi", mobileLabel: "Tôi", icon: UserRound },
];

function getFormattedCurrentDateLong() {
  const now = new Date();
  const days = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const dayName = days[now.getDay()];
  const date = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  return `${dayName}, ngày ${date} tháng ${month}, ${year}`;
}

function getCurrentDateShort() {
  const now = new Date();
  const date = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${date}/${month}/${year}`;
}

const journeys = [
  {
    id: "HT-2048",
    title: "Lúa ST25 Bạc Liêu",
    weight: "5 tấn",
    origin: "Xã Ninh Quới (Bạc Liêu)",
    destination: "Xã Phước Long (Bạc Liêu)",
    route: "Xã Ninh Quới (Bạc Liêu) → Xã Phước Long (Bạc Liêu)",
    boat: "Ghe Thành Công",
    plate: "AG 1888",
    status: "Đang giao",
    tone: "green",
    progress: 45,
    eta: "Còn 1 giờ 15 phút (Đang qua Kênh Quản Lộ)",
    mapMarker: "9.458,105.421",
    stops: ["Xã Ninh Quới (Bạc Liêu)", "Kênh Quản Lộ", "Xã Phước Long (Bạc Liêu)"],
    createdAt: "Hôm nay, 10:15",
  },
  {
    id: "HT-1982",
    title: "Cua biển Năm Căn",
    weight: "150 kg",
    origin: "Xã Năm Căn (Cà Mau)",
    destination: "Phường Cà Mau (TP Cà Mau)",
    route: "Xã Năm Căn (Cà Mau) → Phường Cà Mau (TP Cà Mau)",
    boat: "Ghe Phúc Lộc",
    plate: "CT 5521",
    status: "Đã hoàn thành",
    tone: "blue",
    progress: 100,
    eta: "Đã cập bến Cà Mau an toàn",
    mapMarker: "9.176,105.150",
    stops: ["Xã Năm Căn (Cà Mau)", "Sông Bảy Háp", "Phường Cà Mau (TP Cà Mau)"],
    createdAt: "Hôm qua, 14:30",
  },
  {
    id: "HT-1873",
    title: "Tôm sú sinh thái",
    weight: "300 kg",
    origin: "Xã Đất Mũi (Cà Mau)",
    destination: "Cảng cá Sông Đốc (Cà Mau)",
    route: "Xã Đất Mũi (Cà Mau) → Cảng cá Sông Đốc (Cà Mau)",
    boat: "Ghe Minh Anh",
    plate: "TG 0912",
    status: "Đã hủy",
    tone: "gray",
    progress: 0,
    eta: "Đã hủy bởi người gửi (biển động)",
    mapMarker: "9.045,104.835",
    stops: ["Xã Đất Mũi (Cà Mau)", "Cửa biển Sông Đốc", "Cảng cá Sông Đốc (Cà Mau)"],
    createdAt: "27/08/2026",
  },
];
const notices = [
  {
    id: 1,
    icon: Droplets,
    title: "Cảnh báo độ mặn",
    text: "Khúc sông B đang ở mức 5‰. Hệ thống đã đề xuất tuyến thay thế.",
    time: "12 phút trước",
    unread: true,
    color: "orange",
  },
  {
    id: 2,
    icon: Sparkles,
    title: "AI ghép chuyến thành công",
    text: "Chuyến xoài Cao Lãnh đã tìm được ghe phù hợp, tiết kiệm 15%.",
    time: "1 giờ trước",
    unread: true,
    color: "green",
  },
  {
    id: 3,
    icon: Anchor,
    title: "Ghe đã cập bến",
    text: "Ghe Phúc Lộc đã hoàn tất giao lúa tại bến Ninh Kiều.",
    time: "Hôm qua",
    unread: false,
    color: "blue",
  },
];
const caMauLocations = [
  // Bạc Liêu - Phước Long & Hồng Dân
  "Xã Ninh Quới (Bạc Liêu)",
  "Xã Ninh Quới A (Bạc Liêu)",
  "Xã Phước Long (Bạc Liêu)",
  "Thị trấn Phước Long (Bạc Liêu)",
  "Xã Vĩnh Phú Đông (Bạc Liêu)",
  "Xã Vĩnh Phú Tây (Bạc Liêu)",
  "Xã Hưng Phú (Bạc Liêu)",
  "Xã Hồng Dân (Bạc Liêu)",
  "Xã Lộc Ninh (Bạc Liêu)",
  // Bạc Liêu - Giá Rai, Gành Hào
  "Thị xã Giá Rai (Bạc Liêu)",
  "Thị trấn Hộ Phòng (Bạc Liêu)",
  "Xã Gành Hào (Bạc Liêu)",
  "Xã Phong Thạnh Tây (Bạc Liêu)",
  "Xã Vĩnh Lợi (Bạc Liêu)",
  "Phường Bạc Liêu (TP Bạc Liêu)",
  // Cà Mau - TP Cà Mau (Post-merger)
  "Phường Cà Mau (TP Cà Mau)",
  "Phường 2 (Sáp nhập P9 - Cà Mau)",
  "Phường 4 (Sáp nhập P5 - Cà Mau)",
  "Phường Tân Xuyên (Cà Mau)",
  "Phường Tân Thành (Cà Mau)",
  "Xã Lý Văn Lâm (Cà Mau)",
  "Xã Tắc Vân (Sáp nhập Định Bình - Cà Mau)",
  // Cà Mau - Các huyện
  "Xã Năm Căn (Cà Mau)",
  "Cảng cá Sông Đốc (Cà Mau)",
  "Xã Trần Văn Thời (Cà Mau)",
  "Xã Cái Nước (Cà Mau)",
  "Xã Thới Bình (Cà Mau)",
  "Xã U Minh (Cà Mau)",
  "Xã Đầm Dơi (Cà Mau)",
  "Xã Phú Tân (Cà Mau)",
  "Xã Đất Mũi (Cà Mau)",
];

const produceGroupedOptions = [
  {
    label: " Lúa",
    options: [
      { label: "Lúa ST25", value: "Lúa ST25 Bạc Liêu" },
      { label: "Lúa Một Bụi Đỏ", value: "Lúa Một Bụi Đỏ" },
      { label: "Lúa Đài Thơm 8", value: "Lúa Đài Thơm 8" },
      { label: "Lúa OM18", value: "Lúa OM18" },
      { label: "Lúa Hương Lài", value: "Lúa Hương Lài" },
    ]
  },
  {
    label: " Trái cây",
    options: [
      { label: "Cam sành", value: "Cam sành" },
      { label: "Mít Thái", value: "Mít Thái" },
      { label: "Ổi nữ hoàng", value: "Ổi nữ hoàng" },
      { label: "Mận An Phước", value: "Mận An Phước" },
      { label: "Chuối sáp", value: "Chuối sáp" },
      { label: "Xoài Cát Hòa Lộc", value: "Xoài Cát Hòa Lộc" },
    ]
  },
  {
    label: " Hải sản",
    options: [
      { label: "Cua biển Năm Căn", value: "Cua biển Năm Căn" },
      { label: "Tôm sú sinh thái", value: "Tôm sú sinh thái" },
      { label: "Tôm thẻ chân trắng", value: "Tôm thẻ chân trắng" },
      { label: "Cá bóp", value: "Cá bóp" },
      { label: "Cá chẽm", value: "Cá chẽm" },
      { label: "Ba khía Rạch Gốc", value: "Ba khía Rạch Gốc" },
    ]
  }
];

const weightOptions = ["50 kg", "100 kg", "250 kg", "500 kg", "1 tấn", "2 tấn", "5 tấn", "10 tấn", "20 tấn", "50 tấn"];

function FlexibleInput({ value, onChange, options, grouped, placeholder }) {
  const isCustomValue = value && value !== "Tất cả" && (!options || !options.includes(value)) && (!grouped || !grouped.some(g => g.options.some(o => o.value === value)));
  const [mode, setMode] = useState(isCustomValue ? 'input' : 'select');
  
  if (mode === 'select') {
    return (
      <select 
        value={value || ""} 
        onChange={(e) => {
          if (e.target.value === 'CUSTOM_INPUT') {
            setMode('input');
            onChange('');
          } else {
            onChange(e.target.value);
          }
        }}
        className="w-full bg-transparent outline-none font-semibold text-[#183b32]"
      >
        <option value="" disabled>{placeholder}</option>
        {grouped ? (
          grouped.map(g => (
            <optgroup key={g.label} label={g.label}>
              {g.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </optgroup>
          ))
        ) : (
          options.map(o => <option key={o} value={o}>{o}</option>)
        )}
        <option value="CUSTOM_INPUT" className="font-bold text-[#e9784b]">Khác (Nhập tay...)</option>
      </select>
    );
  }

  return (
    <div className="flex items-center w-full gap-2">
      <input 
        autoFocus
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Nhập thông tin..."
        className="flex-1 bg-transparent outline-none font-semibold text-[#183b32] placeholder:font-normal placeholder:text-[#8ba095]"
      />
      <button onClick={() => { setMode('select'); onChange(options ? options[0] : grouped[0].options[0].value); }} className="text-[#e9784b] p-1 bg-[#fff3ed] rounded-md transition active:scale-95">
        <X size={14} />
      </button>
    </div>
  );
}

const locationCoordinates = {
  "Xã Ninh Quới (Bạc Liêu)": [9.458, 105.421],
  "Xã Ninh Quới": [9.458, 105.421],
  "Xã Phước Long (Bạc Liêu)": [9.382, 105.518],
  "Xã Phước Long": [9.382, 105.518],
  "Xã Hồng Dân (Bạc Liêu)": [9.512, 105.442],
  "Xã Hồng Dân": [9.512, 105.442],
  "Thị xã Giá Rai (Bạc Liêu)": [9.227, 105.448],
  "Thị xã Giá Rai": [9.227, 105.448],
  "Thị trấn Hộ Phòng (Bạc Liêu)": [9.215, 105.385],
  "Thị trấn Hộ Phòng": [9.215, 105.385],
  "Xã Gành Hào (Bạc Liêu)": [9.023, 105.418],
  "Xã Gành Hào": [9.023, 105.418],
  "Xã Phong Thạnh Tây (Bạc Liêu)": [9.25, 105.63],
  "Xã Phong Thạnh Tây": [9.25, 105.63],
  "Xã Vĩnh Lợi (Bạc Liêu)": [9.283, 105.881],
  "Xã Vĩnh Lợi": [9.283, 105.881],
  "Phường Bạc Liêu (TP Bạc Liêu)": [9.294, 105.724],
  "Phường Bạc Liêu": [9.294, 105.724],
  "Phường Cà Mau (TP Cà Mau)": [9.176, 105.15],
  "Phường Cà Mau": [9.176, 105.15],
  "Phường An Xuyên (Cà Mau)": [9.163, 105.145],
  "Phường An Xuyên": [9.163, 105.145],
  "Phường Tân Thành (Cà Mau)": [9.186, 105.17],
  "Phường Tân Thành": [9.186, 105.17],
  "Xã Năm Căn (Cà Mau)": [8.758, 104.985],
  "Xã Năm Căn": [8.758, 104.985],
  "Cảng cá Sông Đốc (Cà Mau)": [9.045, 104.835],
  "Cảng cá Sông Đốc": [9.045, 104.835],
  "Xã Trần Văn Thời (Cà Mau)": [9.05, 104.99],
  "Xã Trần Văn Thời": [9.05, 104.99],
  "Xã Cái Nước (Cà Mau)": [9.004, 105.023],
  "Xã Cái Nước": [9.004, 105.023],
  "Xã Thới Bình (Cà Mau)": [9.352, 105.184],
  "Xã Thới Bình": [9.352, 105.184],
  "Xã U Minh (Cà Mau)": [9.385, 104.952],
  "Xã U Minh": [9.385, 104.952],
  "Xã Đầm Dơi (Cà Mau)": [8.985, 105.215],
  "Xã Đầm Dơi": [8.985, 105.215],
  "Xã Phú Tân (Cà Mau)": [8.98, 104.78],
  "Xã Phú Tân": [8.98, 104.78],
  "Xã Đất Mũi (Cà Mau)": [8.607, 104.835],
  "Xã Đất Mũi": [8.607, 104.835],
};

function locationPoint(location) {
  return locationCoordinates[location] || locationCoordinates["Xã Ninh Quới (Bạc Liêu)"] || [9.458, 105.421];
}

function getInteractiveMapUrl(locationOrCoord, zoomPadding = 0.04) {
  let lat, lon;
  if (Array.isArray(locationOrCoord)) {
    [lat, lon] = locationOrCoord;
  } else if (typeof locationOrCoord === "string") {
    [lat, lon] = locationPoint(locationOrCoord);
  } else {
    lat = 9.458;
    lon = 105.421;
  }
  const west = (Number(lon) - zoomPadding).toFixed(4);
  const east = (Number(lon) + zoomPadding).toFixed(4);
  const south = (Number(lat) - zoomPadding).toFixed(4);
  const north = (Number(lat) + zoomPadding).toFixed(4);
  return `https://www.openstreetmap.org/export/embed.html?bbox=${west}%2C${south}%2C${east}%2C${north}&layer=mapnik&marker=${lat}%2C${lon}`;
}

const riverSegments = [
  {
    id: "quan-lo",
    name: "Kênh Quản Lộ (Ninh Quới, Ninh Quới A, Vĩnh Phú Đông, TT Phước Long)",
    shortName: "Quản Lộ - Phụng Hiệp",
    route: "Ninh Quới ↔ Ninh Quới A ↔ Vĩnh Phú Đông ↔ Phước Long ↔ Cà Mau",
    origin: "Xã Ninh Quới (Bạc Liêu)",
    destination: "Xã Phước Long (Bạc Liêu)",
    lat: 9.458,
    lon: 105.421,
    distance: "18.5 km",
    duration: "1h 15m",
    tide: "Nước lớn (+1.2m)",
    tideStatus: "Thuận dòng",
    clearance: "Tĩnh không 4.5m",
    traffic: "Ghe tải đến 30 tấn lưu thông tốt",
    salinity: "0.4‰ (Nước ngọt)",
    highlights: "Vựa lúa ST25 & Nông sản Bạc Liêu",
    stops: ["Ninh Quới", "Ninh Quới A", "Vĩnh Phú Đông", "Phước Long", "Cà Mau"],
  },
  {
    id: "ca-mau-bac-lieu",
    name: "Sông Cà Mau - Bạc Liêu",
    shortName: "Sông Cà Mau - Bạc Liêu",
    route: "Giá Rai ↔ Hộ Phòng ↔ TP Cà Mau",
    origin: "Thị xã Giá Rai (Bạc Liêu)",
    destination: "Phường Cà Mau (TP Cà Mau)",
    lat: 9.227,
    lon: 105.448,
    distance: "28.0 km",
    duration: "2h 00m",
    tide: "Nước ròng nhẹ (-0.3m)",
    tideStatus: "Bình thường",
    clearance: "Tĩnh không 5.2m",
    traffic: "Tuyến QL1A thủy - ghe tàu liên tỉnh tấp nập",
    salinity: "4.2‰",
    highlights: "Chợ đầu mối thủy hải sản Giá Rai",
    stops: ["Giá Rai", "Hộ Phòng", "Hòa Bình", "TP Cà Mau"],
  },
  {
    id: "ganh-hao",
    name: "Sông & Cửa biển Gành Hào",
    shortName: "Sông Gành Hào",
    route: "TP Cà Mau ↔ Đông Hải ↔ Gành Hào",
    origin: "Phường Cà Mau (TP Cà Mau)",
    destination: "Xã Gành Hào (Bạc Liêu)",
    lat: 9.023,
    lon: 105.418,
    distance: "42.0 km",
    duration: "2h 45m",
    tide: "Triều cường (+1.8m)",
    tideStatus: "Nước dâng",
    clearance: "Luồng sâu cho xà lan lớn",
    traffic: "Cửa biển mở rộng - tàu bè ra vào liên tục",
    salinity: "18.5‰ (Nước mặn)",
    highlights: "Cảng cá & Tôm biển xuất khẩu",
    stops: ["TP Cà Mau", "Đầm Dơi", "Đông Hải", "Gành Hào"],
  },
  {
    id: "bay-hap",
    name: "Sông Bảy Háp & Sông Cửa Lớn",
    shortName: "Sông Bảy Háp - Năm Căn",
    route: "Cái Nước ↔ Năm Căn ↔ Đất Mũi",
    origin: "Xã Năm Căn (Cà Mau)",
    destination: "Xã Đất Mũi (Cà Mau)",
    lat: 8.758,
    lon: 104.985,
    distance: "35.0 km",
    duration: "2h 15m",
    tide: "Nước triều dâng (+1.4m)",
    tideStatus: "Thuận dòng",
    clearance: "Luồng sông rộng sâu >8m",
    traffic: "Vận chuyển Cua biển & Tôm sinh thái",
    salinity: "22.0‰",
    highlights: "Thủ phủ Cua Năm Căn & Tôm rừng",
    stops: ["Cái Nước", "Phú Tân", "Năm Căn", "Đất Mũi"],
  },
  {
    id: "song-trem",
    name: "Sông Trẹm & Kênh U Minh",
    shortName: "Sông Trẹm - U Minh",
    route: "Thới Bình ↔ U Minh Hạ",
    origin: "Xã Thới Bình (Cà Mau)",
    destination: "Xã U Minh (Cà Mau)",
    lat: 9.352,
    lon: 105.184,
    distance: "22.0 km",
    duration: "1h 30m",
    tide: "Dòng chảy êm ả",
    tideStatus: "Nước ngọt",
    clearance: "Tĩnh không 3.8m",
    traffic: "Ghe chở chuối sáp, mật ong, tràm",
    salinity: "0.2‰",
    highlights: "Nông sản rừng tràm sinh thái",
    stops: ["Thới Bình", "Biển Bạch", "Trí Phải", "U Minh Hạ"],
  },
  {
    id: "song-doc",
    name: "Cửa biển Sông Đốc",
    shortName: "Cửa biển Sông Đốc",
    route: "Trần Văn Thời ↔ Cảng cá Sông Đốc",
    origin: "Xã Trần Văn Thời (Cà Mau)",
    destination: "Cảng cá Sông Đốc (Cà Mau)",
    lat: 9.045,
    lon: 104.835,
    distance: "31.0 km",
    duration: "2h 10m",
    tide: "Biển Tây triều cường",
    tideStatus: "Nước lớn",
    clearance: "Cửa biển rộng",
    traffic: "Cảng cá quy mô lớn nhất vùng",
    salinity: "25.0‰",
    highlights: "Thủy sản biển & Chế biến khô",
    stops: ["Trần Văn Thời", "Khánh Hải", "Phong Điền", "Sông Đốc"],
  },
];

function ProduceIcon({ type, className = "w-5 h-5" }) {
  const wrapperClass = "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gray-300 text-gray-700 bg-white";
  switch (type) {
    case "crab":
      return (
        <div className={wrapperClass}>
          <Boxes className={className} strokeWidth={1.5} />
        </div>
      );
    case "rice":
      return (
        <div className={wrapperClass}>
          <Wheat className={className} strokeWidth={1.5} />
        </div>
      );
    case "shrimp":
      return (
        <div className={wrapperClass}>
          <Fish className={className} strokeWidth={1.5} />
        </div>
      );
    case "salted_crab":
      return (
        <div className={wrapperClass}>
          <Boxes className={className} strokeWidth={1.5} />
        </div>
      );
    case "mango":
    default:
      return (
        <div className={wrapperClass}>
          <Leaf className={className} strokeWidth={1.5} />
        </div>
      );
  }
}

const vehicleTypes = [
  { name: "Xà lan", fee: 50000 },
  { name: "Ghe", fee: 50000 },
  { name: "Vỏ", fee: 10000 },
  { name: "Xuồng", fee: 10000 },
];

const cargoRequests = [
  {
    id: "CG-101",
    type: "crab",
    name: "Cua biển Năm Căn",
    subName: "Cua gạch & Cua Y loại 1",
    standard: "OCOP 4 Sao · Chỉ dẫn địa lý Năm Căn",
    amount: "150 kg",
    packaging: "Thùng xốp sục khí oxy",
    route: "Xã Năm Căn (Cà Mau) → Phường Cà Mau (TP Cà Mau)",
    origin: "Xã Năm Căn (Cà Mau)",
    destination: "Phường Cà Mau (TP Cà Mau)",
    time: "Cần ghe trước 15:00 hôm nay",
    sender: "HTX Cua Sinh Thái Năm Căn",
    phone: "0918 234 567",
    urgency: "Hỏa tốc",
    priceEst: "45.000đ/thùng",
    tempReq: "Sục khí liên tục tươi sống",
    matchRate: "98%",
  },
  {
    id: "CG-102",
    type: "rice",
    name: "Lúa ST25 Bạc Liêu",
    subName: "Mô hình Tôm - Lúa Hồng Dân",
    standard: "VietGAP · Thu hoạch tươi",
    amount: "5 tấn",
    packaging: "Bao dệt 50kg chống ẩm",
    route: "Xã Ninh Quới (Bạc Liêu) → Xã Phước Long (Bạc Liêu)",
    origin: "Xã Ninh Quới (Bạc Liêu)",
    destination: "Xã Phước Long (Bạc Liêu)",
    time: "Khởi hành sáng mai (nước lớn)",
    sender: "HTX Nông Nghiệp Ninh Quới",
    phone: "0988 345 678",
    urgency: "Tiêu chuẩn",
    priceEst: "350.000đ/tấn",
    tempReq: "Khô ráo, bạt phủ kín",
    matchRate: "96%",
  },
  {
    id: "CG-103",
    type: "shrimp",
    name: "Tôm sú sinh thái",
    subName: "Tôm rừng ngập mặn Năm Căn",
    standard: "Chứng nhận Sinh thái Naturland",
    amount: "300 kg",
    packaging: "Thùng xốp giữ lạnh 4°C",
    route: "Xã Đất Mũi (Cà Mau) → Cảng cá Sông Đốc (Cà Mau)",
    origin: "Xã Đất Mũi (Cà Mau)",
    destination: "Cảng cá Sông Đốc (Cà Mau)",
    time: "Cần ghe đi gấp trong 2h",
    sender: "Tổ hợp tác Tôm Rừng Đất Mũi",
    phone: "0944 567 890",
    urgency: "Hỏa tốc",
    priceEst: "60.000đ/thùng",
    tempReq: "Bảo quản đá vảy 2-4°C",
    matchRate: "94%",
  },
  {
    id: "CG-104",
    type: "salted_crab",
    name: "Ba khía Rạch Gốc",
    subName: "Đặc sản Di sản văn hóa",
    standard: "OCOP 3 Sao · Ba khía muối",
    amount: "400 kg",
    packaging: "Can nhựa niêm phong",
    route: "Xã Đất Mũi (Cà Mau) → Phường Bạc Liêu (TP Bạc Liêu)",
    origin: "Xã Đất Mũi (Cà Mau)",
    destination: "Phường Bạc Liêu (TP Bạc Liêu)",
    time: "Chuyến định kỳ thứ 4 & thứ 7",
    sender: "Cơ sở Ba Khía Rạch Gốc",
    phone: "0913 888 999",
    urgency: "Định kỳ",
    priceEst: "20.000đ/thùng",
    tempReq: "Nhiệt độ phòng thoáng mát",
    matchRate: "92%",
  },
  {
    id: "CG-105",
    type: "mango",
    name: "Xoài Cát & Trái cây",
    subName: "Xoài cát chu ngọt thanh",
    standard: "GlobalGAP · Trái tuyển chọn",
    amount: "2 tấn",
    packaging: "Sọt nhựa lót mút xốp",
    route: "Xã Thới Bình (Cà Mau) → Thị xã Giá Rai (Bạc Liêu)",
    origin: "Xã Thới Bình (Cà Mau)",
    destination: "Thị xã Giá Rai (Bạc Liêu)",
    time: "Giao trước 17:00 chiều nay",
    sender: "Vựa Trái Cây Thới Bình",
    phone: "0939 123 456",
    urgency: "Trong ngày",
    priceEst: "250.000đ/tấn",
    tempReq: "Che mát, tránh va đập",
    matchRate: "90%",
  },
];

const availableVehicles = [
  {
    name: "Ghe Thành Công",
    type: "Ghe",
    capacity: "5 tấn",
    route: "Xã Ninh Quới (Bạc Liêu) → Xã Phước Long (Bạc Liêu)",
    fee: "50.000đ/chuyến",
    captain: "Anh Thành",
    phone: "0918 111 222",
  },
  {
    name: "Vỏ Minh Anh",
    type: "Vỏ",
    capacity: "500 kg",
    route: "Xã Hồng Dân (Bạc Liêu) → Xã Vĩnh Lợi (Bạc Liêu)",
    fee: "10.000đ/chuyến",
    captain: "Anh Minh",
    phone: "0919 333 444",
  },
  {
    name: "Xà lan Phúc Lộc",
    type: "Xà lan",
    capacity: "20 tấn",
    route: "Xã Phong Thạnh Tây (Bạc Liêu) → Xã Gành Hào (Bạc Liêu)",
    fee: "50.000đ/chuyến",
    captain: "Anh Phúc",
    phone: "0988 555 666",
  },
];

function App() {
  const [authenticated, setAuthenticated] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("reset")) {
      localStorage.removeItem("hanhTrinhXanh.authenticated");
      window.history.replaceState({}, "", window.location.pathname);
      return false;
    }
    return localStorage.getItem("hanhTrinhXanh.authenticated") === "true";
  });
  const [role, setRole] = useState(
    () => localStorage.getItem("hanhTrinhXanh.role") || "farmer",
  );
  const [activeTab, setActiveTab] = useState("home");
  const [origin, setOrigin] = useState("Xã Ninh Quới (Bạc Liêu)");
  const [destination, setDestination] = useState("Xã Phước Long (Bạc Liêu)");
  const [produce, setProduce] = useState("Lúa ST25 Bạc Liêu");
  const [weight, setWeight] = useState("5 tấn");
  const [journeyMode, setJourneyMode] = useState("Tìm phương tiện");
  const [vehicleInfo, setVehicleInfo] = useState({
    type: "Ghe",
    name: "Ghe Thành Công",
    plate: "AG 1888",
    capacity: "5 tấn",
  });
  const [matching, setMatching] = useState(false);
  const [matched, setMatched] = useState(false);
  const [balance, setBalance] = useState(12480000);
  const [toast, setToast] = useState("");
  const [bellOpen, setBellOpen] = useState(false);
  const [customSearchOpen, setCustomSearchOpen] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [routePreview, setRoutePreview] = useState(false);
  const [profilePanel, setProfilePanel] = useState(null);
  const [activeJourneys, setActiveJourneys] = useState(journeys);
  const [selectedCargo, setSelectedCargo] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [allVehiclesOpen, setAllVehiclesOpen] = useState(false);
  const [walletAction, setWalletAction] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [contractOpen, setContractOpen] = useState(false);
  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };
  const findBoat = () => {
    setMatching(true);
    setMatched(false);
    window.setTimeout(() => {
      setMatching(false);
      setMatched(true);
    }, 1700);
  };
  const createJourney = (mode, details = {}) => {
    const originLoc = details.origin || origin || "Xã Ninh Quới (Bạc Liêu)";
    const destinationLoc =
      details.destination || destination || "Xã Phước Long (Bạc Liêu)";
    const route = details.route || `${originLoc} → ${destinationLoc}`;
    const itemTitle = details.title || produce || "Lúa ST25 Bạc Liêu";
    const itemWeight = details.weight || weight || "5 tấn";
    const boatName =
      details.boat ||
      (mode === "Tìm phương tiện" ? "Ghe Thành Công" : vehicleInfo.name);
    const boatPlate =
      details.plate ||
      (mode === "Tìm phương tiện" ? "AG 1888" : vehicleInfo.plate);
    const coords = locationCoordinates[originLoc] || [9.458, 105.421];

    const newJourney = {
      id: `HT-${Date.now().toString().slice(-4)}`,
      title: itemTitle,
      weight: itemWeight,
      route,
      origin: originLoc,
      destination: destinationLoc,
      boat: boatName,
      plate: boatPlate,
      status: "Chuẩn bị xuất phát",
      tone: "green",
      progress: 0, // Vừa mới ghép chuyến: luôn ở vạch xuất phát (0%)
      eta: `Đang neo bến bốc hàng tại ${originLoc} · Khởi hành theo con nước`,
      mapMarker: `${coords[0]},${coords[1]}`,
      stops: [originLoc, "Luồng sông trung chuyển", destinationLoc],
      createdAt: `Hôm nay, ${new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
    };
    setActiveJourneys((current) => [newJourney, ...current]);
    setActiveTab("activity");
    setMatched(false);
    notify(`Đã tạo chuyến: ${itemTitle} (${originLoc} → ${destinationLoc})`);
  };
  const pay = () => {
    const fee =
      vehicleInfo.type === "Ghe" || vehicleInfo.type === "Xà lan"
        ? 50000
        : 10000;
    setBalance((current) => current - fee);
    notify(`Thanh toán cước ${fee.toLocaleString("vi-VN")}đ thành công`);
  };
  const changeRole = (nextRole) => {
    setRole(nextRole);
    localStorage.setItem("hanhTrinhXanh.role", nextRole);
    if (nextRole === "admin") {
      setActiveTab("admin_dashboard");
    } else {
      setActiveTab("home");
    }
    notify(
      nextRole === "farmer"
        ? "Đã chuyển sang Nông dân"
        : nextRole === "cooperative"
          ? "Đã chuyển sang HTX"
          : nextRole === "admin"
            ? "Đã chuyển sang Admin"
            : "Đã chuyển sang Chủ ghe",
    );
  };
  const logout = () => {
    localStorage.removeItem("hanhTrinhXanh.authenticated");
    setAuthenticated(false);
  };
  if (!authenticated) {
    return (
      <LoginView
        onAuthenticated={(assignedRole) => {
          if (assignedRole) {
            setRole(assignedRole);
            localStorage.setItem("hanhTrinhXanh.role", assignedRole);
          }
          setAuthenticated(true);
        }}
      />
    );
  }
  return (
    <div className="app-shell">
      <div className="mx-auto min-h-screen max-w-[1180px] bg-[#f5f8f4] md:border-x md:border-[#e2ebe0]">
        <header className="flex items-center justify-between px-5 pb-3 pt-5 md:px-10 md:pt-7 relative">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (activeTab !== "home") setActiveTab("home");
                else window.history.back();
              }}
              className="mr-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#2f815c] shadow-sm transition hover:bg-gray-100 active:scale-95 border border-[#e0ebe0]"
              aria-label="Quay lại"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex h-10 w-10 overflow-hidden items-center justify-center rounded-[13px] shadow-lg shadow-[#2f815c]/20">
              <img src={appLogo} alt="Hành Trình Xanh Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="display-font text-lg font-bold leading-none">
                Hành trình xanh
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[.16em] text-[#7a9183]">
                Nhanh chóng · tiết kiệm · tận nơi
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBellOpen((current) => !current)}
              className="relative rounded-full bg-white p-2.5 text-[#557264] shadow-sm hover:bg-[#edf6e9] transition"
              aria-label="Thông báo"
            >
              <Bell size={19} />
              {notices.some((notice) => notice.unread) && (
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#e9784b]" />
              )}
            </button>
            {/* Đã xóa nút đăng xuất khỏi header theo yêu cầu */}
            <div className="hidden items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3 text-xs font-semibold shadow-sm sm:flex">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#dcebd3] text-[#397153]">
                NA
              </span>
              <VerifiedName name="Ngọc Anh" />
            </div>
          </div>
        </header>
        {bellOpen && (
          <BellPanel
            onClose={() => setBellOpen(false)}
            onOpenMessages={() => {
              setBellOpen(false);
              setActiveTab("notifications");
            }}
          />
        )}
        <main className="px-5 pb-28 md:px-10">
          {(activeTab === "home" || (role === "cooperative" && ["members", "pooling", "environment"].includes(activeTab))) && (
            <HomeView
              {...{
                notify,
                activeTab,
                origin,
                setOrigin,
                destination,
                setDestination,
                produce,
                setProduce,
                weight,
                setWeight,
                findBoat,
                matching,
                matched,
                setMatched,
                setActiveTab,
                createJourney,
                onCargoDetail: setSelectedCargo,
                onVehicleDetail: setSelectedVehicle,
                onRouteDetail: () => setRoutePreview(true),
                journeyMode,
                setJourneyMode,
                vehicleInfo,
                role,
                onContract: () => setContractOpen(true),
                onOpenCustomSearch: () => setCustomSearchOpen(true),
                onViewAllVehicles: () => setAllVehiclesOpen(true),
              }}
            />
          )}
          {activeTab === "menu" && (
            <MenuView setActiveTab={setActiveTab} />
          )}
          {activeTab === "admin_dashboard" && <AdminDashboard />}
          {activeTab === "admin_users" && (
            <div className="animate-rise p-4"><PageHeading eyebrow="Quản lý" title="Người dùng" /><p className="mt-4 text-[#799085]">Chưa có dữ liệu</p></div>
          )}
          {activeTab === "activity" && (
            <ActivityView
              journeys={activeJourneys}
              notify={notify}
              onDetail={setSelectedJourney}
            />
          )}
          {activeTab === "payment" && (
            <PaymentView
              balance={balance}
              pay={pay}
              notify={notify}
              walletAction={walletAction}
              setWalletAction={setWalletAction}
              setHistoryOpen={setHistoryOpen}
              fee={
                vehicleInfo.type === "Ghe" || vehicleInfo.type === "Xà lan"
                  ? 50000
                  : 10000
              }
            />
          )}
          {activeTab === "notifications" && (
            <NotificationView notify={notify} />
          )}
          {activeTab === "profile" && (
            <ProfileView
              notify={notify}
              vehicleInfo={vehicleInfo}
              setVehicleInfo={setVehicleInfo}
              onProfilePanel={setProfilePanel}
              role={role}
              onRoleChange={changeRole}
              onKycUpload={() => notify("Đã tải ảnh CCCD lên hồ sơ demo")}
            />
          )}
        </main>
        <nav className={`fixed bottom-0 left-0 right-0 z-20 mx-auto grid w-full max-w-[620px] grid-cols-5 items-center border-t border-[#e5ece3] bg-white/95 px-1 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_30px_rgba(36,77,52,.08)] backdrop-blur sm:px-2 md:bottom-4 md:rounded-2xl md:border md:pb-2`}>
          {(role === "cooperative" ? htxNavItems : userNavItems).map(({ id, label, mobileLabel, icon: Icon }) => {
            const isMenuChildActive = false; // Menu is removed
            const isActive = activeTab === id || isMenuChildActive;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-0.5 py-1.5 text-center text-[9px] font-semibold leading-3 transition sm:px-2 sm:text-[10px] sm:leading-normal ${isActive ? "bg-[#edf6e9] text-[#28704d]" : "text-[#8b9e93] hover:text-[#397153]"}`}
              >
                <Icon size={19} strokeWidth={isActive ? 2.5 : 1.8} />
                <span className="max-w-full whitespace-nowrap sm:hidden">
                  {mobileLabel}
                </span>
                <span className="hidden max-w-full whitespace-nowrap sm:block">
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
        {toast && (
          <div className="fixed bottom-24 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#183b32] px-4 py-3 text-xs font-semibold text-white shadow-xl md:bottom-10">
            <Check size={15} className="text-[#9bdf74]" />
            {toast}
          </div>
        )}
      </div>
      {customSearchOpen && (
        <CustomSearchModal
          onClose={() => setCustomSearchOpen(false)}
          onSelectCargo={setSelectedCargo}
          onSelectVehicle={setSelectedVehicle}
          setOrigin={setOrigin}
          setDestination={setDestination}
          setProduce={setProduce}
          setWeight={setWeight}
          notify={notify}
        />
      )}
      {selectedJourney && (
        <JourneyDetail
          journey={selectedJourney}
          onClose={() => setSelectedJourney(null)}
        />
      )}
      {routePreview && <RoutePreview onClose={() => setRoutePreview(false)} />}
      {profilePanel && (
        <ProfilePanel
          panel={profilePanel}
          onClose={() => setProfilePanel(null)}
          notify={notify}
          onLogout={logout}
        />
      )}
      {selectedCargo && (
        <CargoDetail
          cargo={selectedCargo}
          onClose={() => setSelectedCargo(null)}
          onAccept={() => {
            setSelectedCargo(null);
            createJourney(role === "boatOwner" ? "Nhận chuyến" : "Tìm phương tiện", {
              title: selectedCargo.name,
              route: selectedCargo.route,
              weight: selectedCargo.amount,
            });
            if (role === "boatOwner") {
              notify(`Đã nhận chuyến: ${selectedCargo.name}`);
            }
          }}
        />
      )}
      {selectedVehicle && (
        <VehicleDetail
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          onBook={() => {
            setSelectedVehicle(null);
            createJourney("Ghép chuyến", {
              title: "Chuyến đặt phương tiện",
              route: selectedVehicle.route,
              boat: selectedVehicle.name,
            });
          }}
        />
      )}
      {walletAction && (
        <WalletMethodModal
          action={walletAction}
          onClose={() => setWalletAction(null)}
          notify={notify}
        />
      )}
      {historyOpen && (
        <HistoryModal
          onClose={() => setHistoryOpen(false)}
          fee={
            vehicleInfo.type === "Ghe" || vehicleInfo.type === "Xà lan"
              ? 50000
              : 10000
          }
        />
      )}
      {contractOpen && (
        <ContractModal onClose={() => setContractOpen(false)} notify={notify} />
      )}
      {allVehiclesOpen && (
        <AllVehiclesModal 
          vehicles={availableVehicles}
          onClose={() => setAllVehiclesOpen(false)} 
          onVehicleDetail={setSelectedVehicle} 
          createJourney={createJourney}
        />
      )}
    </div>
  );
}

function ZaloIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="12" fill="#0068FF" />
      <path
        d="M12.5 30L19.5 30L12.5 17.5V15H24.5V19H17.5L24.5 31.5V34H12.5V30Z"
        fill="white"
      />
      <path
        d="M29 15H25.5V34H29V15Z"
        fill="white"
      />
      <path
        d="M34.5 20C34.5 17.2 36.8 15 39.5 15C42.2 15 44.5 17.2 44.5 20V34H41V20C41 19.2 40.3 18.5 39.5 18.5C38.7 18.5 38 19.2 38 20V34H34.5V20Z"
        fill="white"
      />
    </svg>
  );
}

function ZaloAuthModal({ onClose, onConfirm }) {
  const [tab, setTab] = useState("quick"); // "quick" | "qr"
  const [loading, setLoading] = useState(false);

  const handleAuthorize = () => {
    setLoading(true);
    setTimeout(() => {
      onConfirm({
        name: "Nguyễn Văn Hùng (Zalo)",
        phone: "0918 889 999",
        role: "farmer",
        authMethod: "zalo",
      });
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm overflow-hidden rounded-[28px] border border-[#d6e5ff] bg-white shadow-2xl animate-rise">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0068FF] to-[#0052cc] p-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 backdrop-blur shadow-inner">
                <span className="font-black text-base tracking-tighter text-white">Zalo</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-blue-100 uppercase tracking-wider">Cổng xác thực</p>
                <h3 className="text-base font-bold">Đăng nhập với Zalo</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition active:scale-95"
            >
              <X size={18} />
            </button>
          </div>

          {/* Sub tabs */}
          <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl bg-black/20 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setTab("quick")}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition ${
                tab === "quick" ? "bg-white text-[#0068FF] shadow-sm font-bold" : "text-white/80 hover:text-white"
              }`}
            >
              <Smartphone size={14} /> 1-Chạm Zalo
            </button>
            <button
              type="button"
              onClick={() => setTab("qr")}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition ${
                tab === "qr" ? "bg-white text-[#0068FF] shadow-sm font-bold" : "text-white/80 hover:text-white"
              }`}
            >
              <QrCode size={14} /> Quét mã QR
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {tab === "quick" ? (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#0068FF]/15 to-[#2f815c]/15 ring-4 ring-[#0068FF]/10">
                <span className="display-font text-xl font-bold text-[#0068FF]">VH</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-base flex items-center justify-center gap-1.5">
                  Nguyễn Văn Hùng <CheckCircle2 size={16} className="text-[#0068FF]" />
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">Số Zalo liên kết: 0918 ••• 999</p>
                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-[#0068FF]">
                  <ShieldCheck size={12} /> Đã liên kết Zalo & VNeID
                </span>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/90 p-3.5 text-left text-xs text-gray-600 space-y-2">
                <p className="font-bold text-gray-800">Quyền truy cập cho Hành Trình Xanh:</p>
                <div className="flex items-center gap-2 text-[11px] text-gray-600">
                  <Check size={13} className="text-emerald-600" /> Tên hiển thị và ảnh đại diện Zalo
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-600">
                  <Check size={13} className="text-emerald-600" /> Số điện thoại xác thực giao nhận nông sản
                </div>
              </div>

              <button
                disabled={loading}
                onClick={handleAuthorize}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0068FF] hover:bg-[#0057d9] active:scale-[0.98] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" /> Đang xác thực tài khoản...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={17} /> Cho phép & Đăng nhập ngay
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4 text-center">
              <p className="text-xs text-gray-600 leading-5">
                Mở ứng dụng <strong>Zalo</strong> trên điện thoại, chọn biểu tượng <strong>Quét mã QR</strong> để đăng nhập tức thì.
              </p>
              <div className="relative mx-auto flex h-44 w-44 items-center justify-center rounded-2xl border-2 border-dashed border-[#0068FF]/30 bg-blue-50/40 p-4">
                <div className="relative flex flex-col items-center justify-center">
                  <QrCode size={100} className="text-[#0068FF]" />
                  <div className="mt-2 rounded bg-[#0068FF] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                    HÀNH TRÌNH XANH
                  </div>
                </div>
              </div>
              <button
                disabled={loading}
                onClick={handleAuthorize}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0068FF] hover:bg-[#0057d9] py-3 text-xs font-bold text-white transition active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" /> Đang xác nhận...
                  </>
                ) : (
                  "Mô phỏng đã quét thành công trên Zalo"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LoginView({ onAuthenticated }) {
  const [authMode, setAuthMode] = useState("login"); // "login" | "register"

  // Login form state
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);

  // Register form state
  const [regFullName, setRegFullName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regRole, setRegRole] = useState("farmer"); // "farmer" | "boatOwner" | "trader"
  const [regPassword, setRegPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [kycUploaded, setKycUploaded] = useState(false);

  // Modal & Feedback
  const [zaloModalOpen, setZaloModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2800);
  };

  // Countdown timer for OTP
  useEffect(() => {
    let interval = null;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  const handleSendOtp = () => {
    if (!phone.trim() || phone.length < 9) {
      showToast("Vui lòng nhập số điện thoại hợp lệ (từ 9 - 11 chữ số)");
      return;
    }
    setOtpSent(true);
    setOtpTimer(60);
    showToast("Mã OTP đã được gửi đến " + phone + " (Mã demo: 123456)");
  };

  const handleFillDemoOtp = () => {
    setOtp("123456");
    showToast("Đã tự động điền mã OTP: 123456");
  };

  const handleLoginSubmit = () => {
    if (!otpSent) {
      handleSendOtp();
      return;
    }
    if (!otp || otp.length < 6) {
      showToast("Vui lòng nhập đủ 6 chữ số mã OTP (Mã demo: 123456)");
      return;
    }
    localStorage.setItem("hanhTrinhXanh.authenticated", "true");
    localStorage.setItem("hanhTrinhXanh.phone", phone);
    localStorage.setItem("hanhTrinhXanh.name", "Ngọc Anh");
    localStorage.setItem("hanhTrinhXanh.role", "farmer");
    localStorage.setItem("hanhTrinhXanh.authMethod", "phone_otp");
    showToast("Đăng nhập thành công!");
    setTimeout(() => {
      onAuthenticated("farmer", "Ngọc Anh");
    }, 250);
  };

  const handleRegisterSubmit = () => {
    if (!regFullName.trim()) {
      showToast("Vui lòng nhập Họ và tên của bạn");
      return;
    }
    if (!regPhone.trim() || regPhone.length < 9) {
      showToast("Vui lòng nhập Số điện thoại hợp lệ (9 - 11 số)");
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      showToast("Mật khẩu / Mã PIN cần tối thiểu 6 ký tự");
      return;
    }
    if (!agreeTerms) {
      showToast("Vui lòng đồng ý với Điều khoản dịch vụ");
      return;
    }

    const assignedRole = regRole === "boatOwner" ? "owner" : "farmer";
    localStorage.setItem("hanhTrinhXanh.authenticated", "true");
    localStorage.setItem("hanhTrinhXanh.phone", regPhone);
    localStorage.setItem("hanhTrinhXanh.name", regFullName.trim());
    localStorage.setItem("hanhTrinhXanh.role", assignedRole);
    localStorage.setItem("hanhTrinhXanh.kyc", kycUploaded ? "verified" : "pending");
    localStorage.setItem("hanhTrinhXanh.authMethod", "register");

    showToast("Tạo tài khoản thành công! Đang chuyển tiếp...");
    setTimeout(() => {
      onAuthenticated(assignedRole, regFullName.trim());
    }, 350);
  };

  const handleZaloSuccess = (userData) => {
    setZaloModalOpen(false);
    localStorage.setItem("hanhTrinhXanh.authenticated", "true");
    localStorage.setItem("hanhTrinhXanh.phone", userData.phone);
    localStorage.setItem("hanhTrinhXanh.name", userData.name);
    localStorage.setItem("hanhTrinhXanh.role", userData.role);
    localStorage.setItem("hanhTrinhXanh.authMethod", "zalo");
    showToast("Đăng nhập Zalo thành công! Xin chào " + userData.name);
    setTimeout(() => {
      onAuthenticated(userData.role, userData.name);
    }, 300);
  };

  const handleQuickDemo = (demoRole) => {
    const isFarmer = demoRole === "farmer";
    const isCoop = demoRole === "cooperative";
    const demoName = isCoop ? "Nguyễn Văn A (Ban quản trị HTX)" : (isFarmer ? "Ngọc Anh (Nông dân)" : "Nguyễn Thành Công (Chủ ghe)");
    const demoPhone = isCoop ? "0900 111 222" : (isFarmer ? "0912 345 678" : "0988 777 666");
    localStorage.setItem("hanhTrinhXanh.authenticated", "true");
    localStorage.setItem("hanhTrinhXanh.phone", demoPhone);
    localStorage.setItem("hanhTrinhXanh.name", demoName);
    localStorage.setItem("hanhTrinhXanh.role", isCoop ? "cooperative" : (isFarmer ? "farmer" : "owner"));
    localStorage.setItem("hanhTrinhXanh.authMethod", "demo_quick");
    showToast(`Đang vào với vai trò ${isCoop ? "Quản lý HTX" : (isFarmer ? "Nông dân" : "Chủ ghe")}...`);
    setTimeout(() => {
      onAuthenticated(isCoop ? "cooperative" : (isFarmer ? "farmer" : "owner"), demoName);
    }, 200);
  };

  return (
    <div className="app-shell flex min-h-screen items-center justify-center p-4 sm:p-6">
      <main className="w-full max-w-lg rounded-[32px] border border-[#dfeade] bg-white p-6 shadow-2xl shadow-[#2f815c]/12 sm:p-8 animate-rise">
        {/* Logo & Brand Header */}
        <div className="mb-6 flex items-center justify-between border-b border-[#eef4ec] pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 overflow-hidden items-center justify-center rounded-2xl shadow-lg shadow-[#2f815c]/25 bg-white">
              <img src={appLogo} alt="Hành Trình Xanh Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="display-font text-xl font-bold tracking-tight text-[#183b32]">
                Hành trình xanh
              </p>
              <p className="text-xs text-[#799085]">
                Logistics nông sản đường thủy xanh
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#edf6e9] px-2.5 py-1 text-[11px] font-bold text-[#28704d]">
            <Sparkles size={13} /> Bản mới v2.0
          </span>
        </div>

        {/* Tab Switcher: Đăng nhập vs Đăng ký mới */}
        <div className="mb-6 grid grid-cols-2 gap-1 rounded-2xl bg-[#edf4ea] p-1.5 text-xs font-bold text-[#678072]">
          <button
            type="button"
            onClick={() => setAuthMode("login")}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 transition-all duration-200 ${
              authMode === "login"
                ? "bg-[#2f815c] text-white shadow-md shadow-[#2f815c]/20"
                : "hover:text-[#183b32]"
            }`}
          >
            <LogIn size={15} /> Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => setAuthMode("register")}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 transition-all duration-200 ${
              authMode === "register"
                ? "bg-[#2f815c] text-white shadow-md shadow-[#2f815c]/20"
                : "hover:text-[#183b32]"
            }`}
          >
            <UserPlus size={15} /> Tạo tài khoản mới
          </button>
        </div>

        {/* ================= MODE: ĐĂNG NHẬP ================= */}
        {authMode === "login" && (
          <div className="animate-fade-in space-y-5">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[.18em] text-[#8ba095]">
                Xác thực danh tính
              </p>
              <h1 className="display-font text-2xl font-bold text-[#183b32] sm:text-3xl">
                Chào mừng trở lại!
              </h1>
              <p className="mt-1.5 text-xs leading-5 text-[#71877b]">
                Đăng nhập để quản lý mùa vụ, gửi nông sản và kết nối chuyến ghe nhanh chóng.
              </p>
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block text-xs font-bold text-[#4d6b5c]">
                Số điện thoại đăng nhập
                <div className="relative mt-2 flex items-center">
                  <span className="absolute left-3.5 text-xs font-semibold text-[#8ba095]">
                    �� +84
                  </span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-2xl border border-[#dce8dc] bg-[#fbfdfa] py-3.5 pl-16 pr-4 text-sm font-semibold text-[#183b32] outline-none transition focus:border-[#2f815c] focus:bg-white focus:ring-4 focus:ring-[#2f815c]/10"
                    placeholder="09xx xxx xxx"
                    inputMode="tel"
                  />
                </div>
              </label>
            </div>

            {/* OTP Input (Shown after Send OTP clicked) */}
            {otpSent && (
              <div className="rounded-2xl border border-[#d6e9d2] bg-[#f4faf2] p-4 animate-slide-down">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#28704d]">
                    Mã xác thực OTP (6 chữ số)
                  </label>
                  <button
                    type="button"
                    onClick={handleFillDemoOtp}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#e9784b] hover:underline"
                  >
                     Điền nhanh 123456
                  </button>
                </div>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="mt-2 w-full rounded-xl border border-[#c3dec0] bg-white py-3 text-center text-lg font-bold tracking-[.35em] text-[#183b32] outline-none focus:border-[#2f815c] focus:ring-4 focus:ring-[#2f815c]/10"
                  placeholder="123456"
                  inputMode="numeric"
                />
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#71877b]">
                  <span>Mã mô phỏng: <strong className="text-[#28704d]">123456</strong></span>
                  {otpTimer > 0 ? (
                    <span className="font-semibold text-[#8ba095]">Gửi lại sau {otpTimer}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="font-bold text-[#28704d] hover:underline"
                    >
                      Gửi lại mã OTP
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Submit Phone Button */}
            <button
              type="button"
              disabled={!phone || (otpSent && !otp)}
              onClick={handleLoginSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#e9784b] hover:bg-[#de6c3e] active:scale-[0.98] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#e9784b]/20 transition-all disabled:cursor-not-allowed disabled:opacity-50"
            >
              {otpSent ? (
                <>
                  <ShieldCheck size={18} /> Xác nhận OTP & Đăng nhập
                </>
              ) : (
                <>
                  Nhận mã OTP <ArrowRight size={16} />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="w-full border-t border-[#e6eee4]"></div>
              <span className="absolute bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-[#98aba0]">
                Hoặc đăng nhập nhanh
              </span>
            </div>

            {/* Zalo Login Button */}
            <button
              type="button"
              onClick={() => setZaloModalOpen(true)}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#0068FF] hover:bg-[#0057d9] active:scale-[0.98] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all"
            >
              <ZaloIcon className="h-5 w-5" />
              <span>Đăng nhập bằng Zalo</span>
            </button>

            {/* Fast Demo Access */}
            <div className="rounded-2xl border border-[#e2ede0] bg-[#f8fbf7] p-3.5">
              <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-wider text-[#799085]">
                 Dùng thử nhanh 1-chạm (Không cần OTP)
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => handleQuickDemo("farmer")}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-[#cee2c9] bg-white py-2.5 text-xs font-bold text-[#28704d] hover:bg-[#edf6e9] active:scale-95 transition shadow-sm"
                >
                   Nông dân
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("cooperative")}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-[#cee2c9] bg-white py-2.5 text-xs font-bold text-[#28704d] hover:bg-[#edf6e9] active:scale-95 transition shadow-sm"
                >
                   HTX
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("owner")}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-[#cee2c9] bg-white py-2.5 text-xs font-bold text-[#28704d] hover:bg-[#edf6e9] active:scale-95 transition shadow-sm"
                >
                   Chủ ghe
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= MODE: TẠO TÀI KHOẢN MỚI (REGISTER) ================= */}
        {authMode === "register" && (
          <div className="animate-fade-in space-y-4">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[.18em] text-[#8ba095]">
                Dành cho thành viên mới
              </p>
              <h1 className="display-font text-2xl font-bold text-[#183b32] sm:text-3xl">
                Tạo tài khoản
              </h1>
              <p className="mt-1 text-xs leading-5 text-[#71877b]">
                Tham gia mạng lưới logistics đường thủy xanh để tối ưu vận chuyển nông sản.
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-[#4d6b5c]">
                Họ và tên
                <div className="relative mt-1.5 flex items-center">
                  <UserRound size={17} className="absolute left-3.5 text-[#8ba095]" />
                  <input
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    className="w-full rounded-2xl border border-[#dce8dc] bg-[#fbfdfa] py-3 pl-10 pr-4 text-sm font-semibold text-[#183b32] outline-none transition focus:border-[#2f815c] focus:bg-white focus:ring-4 focus:ring-[#2f815c]/10"
                    placeholder="Ví dụ: Nguyễn Văn Hùng"
                  />
                </div>
              </label>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-[#4d6b5c]">
                Số điện thoại
                <div className="relative mt-1.5 flex items-center">
                  <Phone size={17} className="absolute left-3.5 text-[#8ba095]" />
                  <input
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full rounded-2xl border border-[#dce8dc] bg-[#fbfdfa] py-3 pl-10 pr-4 text-sm font-semibold text-[#183b32] outline-none transition focus:border-[#2f815c] focus:bg-white focus:ring-4 focus:ring-[#2f815c]/10"
                    placeholder="09xx xxx xxx"
                    inputMode="tel"
                  />
                </div>
              </label>
            </div>

            {/* Select Role */}
            <div>
              <label className="block text-xs font-bold text-[#4d6b5c] mb-1.5">
                Vai trò chính của bạn
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setRegRole("farmer")}
                  className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 text-center transition active:scale-95 ${
                    regRole === "farmer"
                      ? "border-[#2f815c] bg-[#edf6e9] text-[#1f5c40] ring-2 ring-[#2f815c]/20"
                      : "border-[#dfeade] bg-[#fbfdfa] text-[#71877b] hover:bg-[#f4faf2]"
                  }`}
                >
                  <span className="text-xl"></span>
                  <span className="mt-1 text-[11px] font-bold leading-tight">Nông dân & Chủ ghe</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRegRole("cooperative")}
                  className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 text-center transition active:scale-95 ${
                    regRole === "cooperative"
                      ? "border-[#2f815c] bg-[#edf6e9] text-[#1f5c40] ring-2 ring-[#2f815c]/20"
                      : "border-[#dfeade] bg-[#fbfdfa] text-[#71877b] hover:bg-[#f4faf2]"
                  }`}
                >
                  <span className="text-xl"></span>
                  <span className="mt-1 text-[11px] font-bold leading-tight">HTX</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRegRole("trader")}
                  className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 text-center transition active:scale-95 ${
                    regRole === "trader"
                      ? "border-[#2f815c] bg-[#edf6e9] text-[#1f5c40] ring-2 ring-[#2f815c]/20"
                      : "border-[#dfeade] bg-[#fbfdfa] text-[#71877b] hover:bg-[#f4faf2]"
                  }`}
                >
                  <span className="text-xl"></span>
                  <span className="mt-1 text-[11px] font-bold leading-tight">Thương lái</span>
                </button>
              </div>
            </div>

            {/* Password / PIN */}
            <div>
              <label className="block text-xs font-bold text-[#4d6b5c]">
                Mật khẩu / Mã PIN bảo mật
                <div className="relative mt-1.5 flex items-center">
                  <LockKeyhole size={17} className="absolute left-3.5 text-[#8ba095]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full rounded-2xl border border-[#dce8dc] bg-[#fbfdfa] py-3 pl-10 pr-11 text-sm font-semibold text-[#183b32] outline-none transition focus:border-[#2f815c] focus:bg-white focus:ring-4 focus:ring-[#2f815c]/10"
                    placeholder="Tối thiểu 6 ký tự hoặc số"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-[#8ba095] hover:text-[#183b32]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>
            </div>

            {/* KYC Identity Uploader */}
            <div className="rounded-2xl border border-[#d6e8d2] bg-[#f4faf2] p-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#28704d]">
                  <ShieldCheck size={16} /> Định danh số CCCD / VNeID
                </div>
                {kycUploaded && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#2f815c] px-2 py-0.5 text-[10px] font-bold text-white">
                    <Check size={10} /> Đã xác thực
                  </span>
                )}
              </div>
              <p className="mt-1 text-[11px] leading-4 text-[#71877b]">
                Tải lên 2 mặt CCCD để nhận huy hiệu xác thực tín nhiệm xanh.
              </p>
              <button
                type="button"
                onClick={() => {
                  setKycUploaded(!kycUploaded);
                  showToast(kycUploaded ? "Đã hủy tải ảnh CCCD" : "Đã tải lên 2 mặt CCCD thành công!");
                }}
                className={`mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition active:scale-95 ${
                  kycUploaded
                    ? "border border-[#2f815c] bg-white text-[#2f815c]"
                    : "border border-dashed border-[#9fc898] bg-white text-[#397153] hover:bg-[#eef6ec]"
                }`}
              >
                <Upload size={14} />
                {kycUploaded ? "Đã đính kèm ảnh CCCD (Click để đổi)" : "Tải ảnh CCCD mặt trước & sau"}
              </button>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2.5 text-xs text-[#557264] cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-[#9fc898] text-[#2f815c] focus:ring-[#2f815c]"
              />
              <span className="leading-5">
                Tôi đồng ý với <strong>Điều khoản dịch vụ</strong> và <strong>Quy chế bảo vệ môi trường đường thủy</strong> của Hành Trình Xanh.
              </span>
            </label>

            {/* Submit Register Button */}
            <button
              type="button"
              onClick={handleRegisterSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2f815c] hover:bg-[#256c4c] active:scale-[0.98] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#2f815c]/25 transition-all"
            >
              <UserCheck size={18} /> Đăng ký tài khoản ngay
            </button>

            {/* Footer switcher */}
            <p className="text-center text-xs text-[#71877b]">
              Đã có tài khoản?{" "}
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className="font-bold text-[#2f815c] hover:underline"
              >
                Đăng nhập tại đây
              </button>
            </p>
          </div>
        )}
      </main>

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#183b32] px-5 py-3 text-xs font-semibold text-white shadow-2xl animate-rise">
          <Check size={15} className="text-[#9bdf74]" />
          {toastMsg}
        </div>
      )}

      {/* Zalo Authentication Modal */}
      {zaloModalOpen && (
        <ZaloAuthModal
          onClose={() => setZaloModalOpen(false)}
          onConfirm={handleZaloSuccess}
        />
      )}
    </div>
  );
}

function VerifiedName({ name }) {
  return (
    <span
      className="inline-flex items-center gap-1"
      title="Tài khoản đã xác thực"
    >
      {name}
      <ShieldCheck
        size={14}
        className="text-[#3e9b61]"
        aria-label="Tài khoản đã xác thực"
      />
    </span>
  );
}

function SectionTitle({ eyebrow, title, action, onAction }) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[.18em] text-[#8ba095]">
          {eyebrow}
        </p>
        <h2 className="display-font text-xl font-bold tracking-tight text-[#183b32]">
          {title}
        </h2>
      </div>
      {action && (
        <button
          onClick={onAction}
          className="flex items-center gap-1 text-xs font-bold text-[#28704d]"
        >
          {action}
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}
function Field({ label, icon: Icon, children }) {
  return (
    <label className="block rounded-xl border border-[#e6eee4] bg-[#fbfdfb] px-3 py-2.5">
      <span className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.1em] text-[#8ba095]">
        <Icon size={12} />
        {label}
      </span>
      {children}
    </label>
  );
}
function InteractiveRiverMap({
  origin,
  destination,
  setOrigin,
  setDestination,
  onRouteDetail,
}) {
  const [activeSegmentId, setActiveSegmentId] = useState("quan-lo");
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Active segment
  const currentSegment =
    riverSegments.find((s) => s.id === activeSegmentId) || riverSegments[0];

  // Dynamic location to display on map
  const displayLocation = selectedLocation || origin || currentSegment.origin;
  const mapUrl = getInteractiveMapUrl(displayLocation, 0.04);

  const handleSelectSegment = (segment) => {
    setActiveSegmentId(segment.id);
    setSelectedLocation(segment.origin);
    if (setOrigin) setOrigin(segment.origin);
    if (setDestination) setDestination(segment.destination);
  };

  const handleSetAsOrigin = () => {
    if (setOrigin && displayLocation) {
      setOrigin(displayLocation);
    }
  };

  const handleSetAsDestination = () => {
    if (setDestination && displayLocation) {
      setDestination(displayLocation);
    }
  };

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#d6e8d4] bg-white shadow-sm transition hover:shadow-md">
      {/* Map Header with Real-time Waterway Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#eef5ec] bg-[#fbfdfa] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#2f815c]/10 text-[#2f815c]">
            <Compass size={17} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#183b32] sm:text-sm">
              Mạng lưới Sông ngòi Cà Mau - Bạc Liêu
            </h4>
            <p className="text-[10px] text-[#71877b]">
              Định vị vệ tinh · Giám sát con nước & tĩnh không cầu
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-[#edf6e9] px-2.5 py-1 text-[10px] font-bold text-[#28704d]">
            <Waves size={12} className="text-[#3b9b66]" />
            {currentSegment.tide}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#fef5ec] px-2.5 py-1 text-[10px] font-bold text-[#d9733e]">
            {currentSegment.clearance}
          </span>
        </div>
      </div>

      {/* Waterway Fast Selector Switcher */}
      <div className="border-b border-[#eef5ec] bg-white p-2.5">
        <p className="mb-1.5 px-1 text-[10px] font-bold uppercase tracking-wider text-[#8ba095]">
          Chọn nhanh khúc sông trọng điểm:
        </p>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {riverSegments.map((seg) => {
            const isActive = activeSegmentId === seg.id;
            return (
              <button
                key={seg.id}
                type="button"
                onClick={() => handleSelectSegment(seg)}
                className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition active:scale-95 ${
                  isActive
                    ? "bg-[#2f815c] text-white shadow-sm shadow-[#2f815c]/25 font-bold"
                    : "border border-[#e0ece0] bg-[#f8fbf7] text-[#557264] hover:bg-[#edf6e9]"
                }`}
              >
                <span></span>
                <span>{seg.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Embedded Dynamic OpenStreetMap */}
      <div className="relative h-64 w-full bg-[#d8eed4] sm:h-72">
        <iframe
          title="Bản đồ sông ngòi Cà Mau - Bạc Liêu"
          className="h-full w-full border-0"
          src={mapUrl}
          loading="lazy"
        />

        {/* Live Floating Location Badge */}
        <div className="absolute left-3 top-3 z-10 flex max-w-[85%] items-center gap-2 rounded-xl bg-white/95 px-3 py-2 text-xs font-bold text-[#183b32] shadow-md backdrop-blur border border-[#e0ebe0]">
          <span className="flex h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-[#e9784b]" />
          <span className="truncate">
            Đang trỏ: <strong className="text-[#2f815c]">{displayLocation}</strong>
          </span>
        </div>

        {/* Action button */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5">
          <button
            type="button"
            onClick={onRouteDetail}
            className="flex items-center gap-1.5 rounded-xl bg-[#183b32]/95 hover:bg-[#183b32] px-3.5 py-2 text-[11px] font-bold text-white shadow-lg backdrop-blur transition active:scale-95"
          >
            <Map size={13} /> Xem lộ trình toàn tuyến
          </button>
        </div>
      </div>

      {/* Navigation Metrics & River Information Panel */}
      <div className="bg-[#f8fbf7] p-4">
        <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
          <div className="rounded-xl border border-[#e2ede0] bg-white p-2.5">
            <p className="text-[10px] text-[#71877b]">Khúc sông</p>
            <p className="mt-0.5 font-bold text-[#183b32] truncate">{currentSegment.name}</p>
          </div>
          <div className="rounded-xl border border-[#e2ede0] bg-white p-2.5">
            <p className="text-[10px] text-[#71877b]">Cự ly thủy ước tính</p>
            <p className="mt-0.5 font-bold text-[#2f815c]">{currentSegment.distance} (~{currentSegment.duration})</p>
          </div>
          <div className="rounded-xl border border-[#e2ede0] bg-white p-2.5">
            <p className="text-[10px] text-[#71877b]">Khả năng lưu thông</p>
            <p className="mt-0.5 font-bold text-[#28704d] truncate">{currentSegment.traffic}</p>
          </div>
          <div className="rounded-xl border border-[#e2ede0] bg-white p-2.5">
            <p className="text-[10px] text-[#71877b]">Độ mặn cảm biến</p>
            <p className="mt-0.5 font-bold text-[#e9784b]">{currentSegment.salinity}</p>
          </div>
        </div>

        {/* Quick Assign Buttons */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-[#e8f2e6]">
          <div className="text-[11px] text-[#71877b]">
            <p>
              Tuyến sông: <strong className="text-[#183b32]">{currentSegment.route}</strong>
            </p>
            {origin && destination && (
              <p className="text-[10px] text-[#2f815c] font-semibold mt-0.5">
                Chuyến đang chọn: {origin} → {destination}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSetAsOrigin}
              className="rounded-xl border border-[#2f815c] bg-white px-3 py-1.5 text-[11px] font-bold text-[#2f815c] hover:bg-[#edf6e9] transition active:scale-95"
            >
              � Gán làm Điểm Đi
            </button>
            <button
              type="button"
              onClick={handleSetAsDestination}
              className="rounded-xl bg-[#2f815c] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#256a4b] transition active:scale-95"
            >
               Gán làm Điểm Đến
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomSearchModal({
  onClose,
  setOrigin,
  setDestination,
  setProduce,
  setWeight,
  notify,
}) {
  const [selectedProduce, setSelectedProduce] = useState("Tất cả");
  const [filterOrigin, setFilterOrigin] = useState("Tất cả");
  const [filterDestination, setFilterDestination] = useState("Tất cả");
  const [filterUrgency, setFilterUrgency] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  const produceCategories = [
    { id: "Tất cả", label: "Tất cả" },
    { id: "rice", label: " Lúa (ST25, Một bụi...)" },
    { id: "fruit", label: " Trái cây (Cam, Mít, Ổi...)" },
    { id: "seafood", label: " Hải sản (Cua, Tôm, Cá...)" },
  ];

  // Filter cargo requests
  const filteredCargos = cargoRequests.filter((cargo) => {
    if (selectedProduce && selectedProduce !== "Tất cả") {
      const p = selectedProduce.toLowerCase();
      if (!cargo.name.toLowerCase().includes(p) && !cargo.type.toLowerCase().includes(p)) return false;
    }
    if (filterOrigin && filterOrigin !== "Tất cả" && !cargo.origin.toLowerCase().includes(filterOrigin.toLowerCase())) return false;
    if (filterDestination && filterDestination !== "Tất cả" && !cargo.destination.toLowerCase().includes(filterDestination.toLowerCase())) return false;
    if (filterUrgency && filterUrgency !== "Tất cả" && cargo.urgency !== filterUrgency) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchText = `${cargo.name} ${cargo.subName} ${cargo.route} ${cargo.sender}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    return true;
  });

  const handleApplyToBooking = (cargo) => {
    if (setOrigin) setOrigin(cargo.origin);
    if (setDestination) setDestination(cargo.destination);
    if (setProduce) setProduce(cargo.name);
    if (setWeight) setWeight(cargo.amount);
    if (notify) notify(`Đã nạp yêu cầu: ${cargo.name} (${cargo.amount})`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-5 backdrop-blur-sm animate-fade-in">
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[28px] border border-[#d6e8d2] bg-white shadow-2xl animate-rise">
        {/* Header */}
        <div className="border-b border-[#eef5ec] bg-gradient-to-r from-[#2f815c] to-[#1f5c40] p-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 backdrop-blur shadow-inner">
                <SlidersHorizontal size={20} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#c5e8ae]">
                  Bộ lọc Logistics Đường Thủy Cà Mau - Bạc Liêu
                </p>
                <h3 className="text-lg font-bold">Tìm kiếm theo yêu cầu</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition active:scale-95"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mt-4">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-white/15 py-2.5 pl-10 pr-4 text-xs font-semibold text-white placeholder:text-white/60 outline-none backdrop-blur focus:bg-white/25 focus:ring-2 focus:ring-white/30"
              placeholder="Nhập tên nông sản, địa danh, HTX (vd: Cua Năm Căn, Ninh Quới, Lúa ST25)..."
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="border-b border-[#eef5ec] bg-[#fbfdfa] p-4 space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-[#71877b] mb-1">
              Loại nông/hải sản đặc sản
            </label>
            <div className="rounded-xl border border-[#dce8dc] bg-white p-1.5 text-xs focus-within:border-[#2f815c]">
              <FlexibleInput
                value={selectedProduce === "Tất cả" ? "" : selectedProduce}
                onChange={(val) => setSelectedProduce(val || "Tất cả")}
                grouped={produceGroupedOptions}
                placeholder="Chọn hoặc nhập loại hàng hóa..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <div>
              <label className="block text-[10px] font-bold text-[#71877b] mb-1">
                Điểm gửi hàng (Điểm đi)
              </label>
              <div className="rounded-xl border border-[#dce8dc] bg-white p-1.5 text-xs focus-within:border-[#2f815c]">
                <FlexibleInput
                  value={filterOrigin === "Tất cả" ? "" : filterOrigin}
                  onChange={(val) => setFilterOrigin(val || "Tất cả")}
                  options={caMauLocations}
                  placeholder="Chọn điểm đi..."
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#71877b] mb-1">
                Điểm giao nhận (Điểm đến)
              </label>
              <div className="rounded-xl border border-[#dce8dc] bg-white p-1.5 text-xs focus-within:border-[#2f815c]">
                <FlexibleInput
                  value={filterDestination === "Tất cả" ? "" : filterDestination}
                  onChange={(val) => setFilterDestination(val || "Tất cả")}
                  options={caMauLocations}
                  placeholder="Chọn điểm đến..."
                />
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-[10px] font-bold text-[#71877b] mb-1">
                Mức độ khẩn cấp
              </label>
              <select
                value={filterUrgency}
                onChange={(e) => setFilterUrgency(e.target.value)}
                className="w-full rounded-xl border border-[#dce8dc] bg-white p-2 text-xs font-semibold text-[#183b32] outline-none focus:border-[#2f815c]"
              >
                <option value="Tất cả">Tất cả thời gian</option>
                <option value="Hỏa tốc">Hỏa tốc trong ngày</option>
                <option value="Tiêu chuẩn">Tiêu chuẩn</option>
                <option value="Định kỳ">Lịch định kỳ</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#71877b]">
            <span>
              Tìm thấy <strong className="text-[#2f815c]">{filteredCargos.length}</strong> yêu cầu phù hợp
            </span>
            {(selectedProduce !== "Tất cả" || filterOrigin !== "Tất cả" || filterDestination !== "Tất cả" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedProduce("Tất cả");
                  setFilterOrigin("Tất cả");
                  setFilterDestination("Tất cả");
                  setSearchQuery("");
                }}
                className="text-[11px] font-bold text-[#e9784b] hover:underline"
              >
                Đặt lại bộ lọc
              </button>
            )}
          </div>

          {filteredCargos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#cfe0cc] bg-[#fbfdfa] p-8 text-center">
              <Boxes size={36} className="mx-auto text-[#8ba095]" />
              <p className="mt-2 text-sm font-bold text-[#183b32]">Không tìm thấy yêu cầu phù hợp</p>
              <p className="mt-1 text-xs text-[#71877b]">
                Vui lòng thử nới lỏng bộ lọc hoặc chọn khu vực lân cận trên bản đồ sông Cà Mau - Bạc Liêu.
              </p>
            </div>
          ) : (
            filteredCargos.map((cargo) => (
              <div
                key={cargo.id}
                className="rounded-2xl border border-[#e0ebe0] bg-white p-4 shadow-sm transition hover:border-[#2f815c] hover:shadow-md"
              >
                <div className="flex items-start gap-3.5">
                  <ProduceIcon type={cargo.type} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-sm text-[#183b32] truncate">{cargo.name}</h4>
                      <span className="shrink-0 rounded-full bg-[#edf6e9] px-2 py-0.5 text-[10px] font-bold text-[#28704d]">
                        Khớp AI {cargo.matchRate}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#4d705d] font-semibold mt-0.5">
                      {cargo.subName} · <span className="text-[#8ba095]">{cargo.standard}</span>
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-[#71877b]">
                      <span className="flex items-center gap-1 rounded-md bg-[#f1f6ef] px-2 py-1 font-semibold text-[#183b32]">
                        <Navigation2 size={12} className="text-[#2f815c]" /> {cargo.route}
                      </span>
                      <span className="rounded-md bg-[#fff4df] px-2 py-1 font-bold text-[#d9733e]">
                        {cargo.amount}
                      </span>
                      <span className="rounded-md bg-[#f5f8f4] px-2 py-1 text-[#557264]">
                        {cargo.packaging}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-[#f0f6ee] text-xs">
                      <span className="text-[11px] text-[#799085]">
                        Gửi bởi: <strong className="text-[#183b32]">{cargo.sender}</strong>
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleApplyToBooking(cargo)}
                          className="flex items-center gap-1 rounded-xl bg-[#2f815c] hover:bg-[#256a4b] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition active:scale-95"
                        >
                          <CheckCheck size={14} /> Ghép chuyến ngay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function CooperativeDashboard({ 
  notify, activeTab, onContract, setActiveTab,
  origin, setOrigin, destination, setDestination,
  produce, setProduce, weight, setWeight,
  findBoat, matching, matched, createJourney, vehicleInfo
}) {
  const stats = [
    { label: "Tổng xã viên", value: "245 Hộ", icon: Users, color: "text-[#2f815c]", bg: "bg-[#edf6e9]" },
    { label: "Sản lượng lúa ST25", value: "1,250 Tấn", icon: Wheat, color: "text-[#e9784b]", bg: "bg-[#fff3ed]" },
    { label: "CO2 Giảm phát thải", value: "45.2 Tấn", icon: Leaf, color: "text-[#28704d]", bg: "bg-[#e5ece3]" },
  ];

  const members = [
    { id: 1, name: "Nguyễn Văn Sáu", area: "2.5 ha", product: "Lúa ST25", expectedYield: "15 tấn", status: "Sẵn sàng thu hoạch" },
    { id: 2, name: "Trần Thị Mai", area: "1.2 ha", product: "Lúa ST25", expectedYield: "8 tấn", status: "Thu hoạch trong 3 ngày" },
    { id: 3, name: "Lê Minh Tâm", area: "3.0 ha", product: "Tôm sinh thái", expectedYield: "2 tấn", status: "Đang thu hoạch" },
    { id: 4, name: "Phạm Văn Bình", area: "4.5 ha", product: "Lúa ST24", expectedYield: "30 tấn", status: "Sẵn sàng thu hoạch" },
    { id: 5, name: "Huỳnh Tuấn Anh", area: "5.0 ha", product: "Lúa ST25", expectedYield: "35 tấn", status: "Sẵn sàng thu hoạch" },
    { id: 6, name: "Lý Kiều Diễm", area: "1.5 ha", product: "Cua biển Năm Căn", expectedYield: "0.5 tấn", status: "Sẵn sàng thu hoạch" },
  ];

  const contracts = [
    { id: "HD-2024-089", buyer: "Công ty Lương Thực Tín Phát", product: "Lúa ST25", amount: "100 Tấn", price: "8,500 đ/kg", status: "Đang giao hàng" },
    { id: "HD-2024-090", buyer: "Siêu thị Co.op Mart", product: "Trái cây các loại", amount: "15 Tấn", price: "25,000 đ/kg", status: "Đã hoàn tất" },
    { id: "HD-2024-091", buyer: "Công ty Xuất Nhập Khẩu Thủy Sản", product: "Tôm sú sinh thái", amount: "5 Tấn", price: "180,000 đ/kg", status: "Chờ lấy hàng" },
  ];

  const [selectedForPooling, setSelectedForPooling] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [inventoryModal, setInventoryModal] = useState(null);

  const togglePool = (id) => {
    setSelectedForPooling((curr) =>
      curr.includes(id) ? curr.filter((item) => item !== id) : [...curr, id]
    );
  };

  return (
    <div className="animate-rise">
      <section className="mb-7 rounded-[24px] bg-gradient-to-br from-[#183b32] to-[#2f815c] px-6 py-7 text-white shadow-xl md:px-9">
        <p className="text-sm font-semibold text-[#c5e8ae]">
           {getFormattedCurrentDateLong()}
        </p>
        <h1 className="display-font mt-2 text-3xl font-bold">
          Bảng điều khiển HTX
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#d7ebdc]">
          Quản lý xã viên, gom đơn lô lớn và điều phối logistics xanh tập trung.
        </p>
      </section>

      {/* Tab Content */}
      {activeTab === "home" && (
        <div className="space-y-6 animate-fade-in">
          <section className="grid grid-cols-4 gap-y-4 gap-x-2 rounded-2xl bg-white p-4 shadow-sm border border-[#e0ebe0]">
            {[
              { icon: Ship, label: "Ghe/Xuồng" },
              { icon: Anchor, label: "Xà Lan" },
              { icon: Boxes, label: "Ghép Đơn" },
              { icon: Droplets, label: "Độ Mặn" },
              { icon: Wheat, label: "Lúa Gạo" },
              { icon: Leaf, label: "Trái Cây" },
              { icon: Fish, label: "Thủy Sản" },
              { icon: LayoutGrid, label: "Tất cả" },
            ].map((item, idx) => (
              <button key={idx} onClick={() => setInventoryModal(item.label)} className="flex flex-col items-center justify-center gap-2 rounded-xl hover:bg-[#f1f6ef] transition p-1 active:scale-95">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4faf2] text-[#2f815c]">
                  <item.icon size={22} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-semibold text-[#71877b] text-center leading-tight whitespace-nowrap">{item.label}</span>
              </button>
            ))}
          </section>

          <section>
             <div className="rounded-2xl bg-gradient-to-r from-[#2f815c] to-[#1f5c40] p-5 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                      <Boxes size={20} className="text-white" />
                   </div>
                   <div>
                      <h3 className="text-lg font-bold">Gom đơn lô lớn</h3>
                      <p className="text-xs text-[#c5e8ae] mt-0.5">Tiết kiệm cước phí lên tới 30%</p>
                   </div>
                </div>
                <button 
                  onClick={() => setActiveTab("pooling")}
                  className="w-full rounded-xl bg-white text-[#1f5c40] py-3 text-sm font-bold shadow-sm hover:bg-[#f1f6ef] transition active:scale-[0.99]"
                >
                  Bắt đầu gom đơn ngay
                </button>
             </div>
          </section>
          <SectionTitle eyebrow="Chỉ số hoạt động" title="Thống kê HTX" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <button key={i} onClick={() => alert("Đang mở phân tích chi tiết: " + stat.label)} className="text-left w-full rounded-2xl border border-[#e0ebe0] bg-white p-4 shadow-sm hover:border-[#2f815c] transition active:scale-95">
                <div className={`mb-3 inline-flex rounded-xl p-2.5 ${stat.bg} ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <p className="text-xs font-semibold text-[#799085]">{stat.label}</p>
                <p className="mt-1 text-lg font-bold text-[#183b32]">{stat.value}</p>
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-[#d6e8d2] bg-[#f4faf2] p-4">
             <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={18} className="text-[#28704d]" />
                <span className="text-sm font-bold text-[#183b32]">Chứng nhận xanh (MRV)</span>
             </div>
             <p className="text-xs text-[#557264] leading-5">HTX đã áp dụng quy trình giảm phát thải, đủ điều kiện nhận tín chỉ carbon từ vận tải đường thủy nội địa. (Mã vùng trồng: VN-94-123)</p>
          </div>
        </div>
      )}

      {activeTab === "members" && (
        <div className="space-y-4 animate-fade-in">
           <div className="flex justify-between items-center mb-2">
             <SectionTitle eyebrow="Danh sách" title="Hộ nông dân" />
             <button onClick={() => {
                const name = window.prompt("Nhập tên xã viên mới:");
                if (name) alert(`Đã thêm xã viên ${name} vào danh sách.`);
             }} className="rounded-xl bg-[#e9784b] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#de6c3e] active:scale-95">
               + Thêm xã viên
             </button>
           </div>
           {members.map(m => (
             <div key={m.id} className="rounded-[20px] border border-[#e0ebe0] bg-white p-4 shadow-sm flex justify-between items-center">
                <div>
                   <p className="text-sm font-bold text-[#183b32]"><VerifiedName name={m.name} /></p>
                   <p className="text-xs text-[#71877b] mt-1">Diện tích: {m.area} · Dự kiến: {m.expectedYield}</p>
                   <span className="inline-block mt-2 rounded-full bg-[#edf6e9] px-2 py-1 text-[10px] font-bold text-[#28704d]">
                     {m.product} - {m.status}
                   </span>
                </div>
             </div>
           ))}
        </div>
      )}

      {activeTab === "pooling" && (
        <div className="space-y-4 animate-fade-in">
           <SectionTitle eyebrow="Quản lý" title="Hợp đồng Bao tiêu & Vận tải" />
           <div className="flex flex-col gap-3 mb-6">
             {contracts.map(c => (
               <div key={c.id} className="rounded-[20px] border border-[#e0ebe0] bg-white p-4 shadow-sm">
                 <div className="flex justify-between items-start mb-3">
                   <div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${c.status === 'Đang giao hàng' ? 'bg-[#fff3ed] text-[#e9784b]' : c.status === 'Đã hoàn tất' ? 'bg-[#edf6e9] text-[#28704d]' : 'bg-[#e5ece3] text-[#557264]'}`}>{c.status}</span>
                      <p className="mt-1.5 text-sm font-bold text-[#183b32]">{c.buyer}</p>
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-2 text-xs text-[#71877b] mb-4">
                   <p>Mặt hàng: <strong>{c.product}</strong></p>
                   <p>Cam kết: <strong>{c.amount}</strong></p>
                   <p>Đơn giá: <strong>{c.price}</strong></p>
                   <p>Mã HĐ: <strong className="text-[#2f815c]">{c.id}</strong></p>
                 </div>
                 <button onClick={onContract} className="w-full rounded-lg bg-[#f1f6ef] py-2 text-xs font-bold text-[#28704d] transition active:scale-95">Xem chi tiết & Đối soát</button>
               </div>
             ))}
           </div>

           <SectionTitle eyebrow="Gom đơn thành lô lớn" title="Khởi tạo lô hàng mới" />
           <p className="text-xs text-[#71877b] mb-4">Chọn các hộ có cùng loại nông sản và sẵn sàng thu hoạch để gom thành lô lớn, gọi xà lan tải trọng cao nhằm tiết kiệm cước.</p>
           <div className="space-y-2">
             {members.filter(m => m.status === "Sẵn sàng thu hoạch").map(m => (
                <label key={m.id} className="flex items-center gap-3 rounded-xl border border-[#e0ebe0] bg-white p-3 cursor-pointer hover:border-[#2f815c]">
                   <input type="checkbox" checked={selectedForPooling.includes(m.id)} onChange={() => togglePool(m.id)} className="w-5 h-5 accent-[#2f815c]"/>
                   <div className="flex-1">
                      <p className="text-sm font-bold text-[#183b32]">{m.name}</p>
                      <p className="text-xs text-[#71877b]">{m.expectedYield} {m.product}</p>
                   </div>
                </label>
             ))}
           </div>
           
           <div className="sticky bottom-20 rounded-2xl bg-[#183b32] p-4 text-white shadow-xl mt-6">
              <div className="flex justify-between items-center mb-3">
                 <span className="text-xs font-semibold text-[#a5c2b4]">Đã chọn:</span>
                 <span className="text-sm font-bold">{selectedForPooling.length} hộ</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                 <span className="text-xs font-semibold text-[#a5c2b4]">Tổng sản lượng ước tính:</span>
                 <span className="text-lg font-bold text-[#c5e8ae]">
                   {selectedForPooling.length > 0 ? selectedForPooling.map(id => parseInt(members.find(m=>m.id===id).expectedYield)).reduce((a,b)=>a+b, 0) : 0} tấn
                 </span>
              </div>
              <button 
                 disabled={selectedForPooling.length === 0}
                 onClick={() => {
                   onContract();
                   alert("Đã tạo lô hàng lớn thành công và chuyển sang giao diện tạo hợp đồng thầu.");
                 }}
                 className="w-full rounded-xl bg-[#e9784b] py-3 text-sm font-bold shadow-sm transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                 Tiến hành mời thầu xà lan
              </button>
           </div>
        </div>
      )}

      {activeTab === "environment" && (
         <div className="space-y-4 animate-fade-in">
           <SectionTitle 
             eyebrow="Đo lường & Cảnh báo" 
             title="Giám sát Môi trường" 
             action={showMap ? "Thu gọn bản đồ" : "Xem tất cả"}
             onAction={() => setShowMap(!showMap)}
           />
           {showMap && (
             <div className="mb-4">
               <InteractiveRiverMap 
                 origin={origin} 
                 destination={destination} 
                 setOrigin={setOrigin} 
                 setDestination={setDestination}
                 onRouteDetail={() => notify("Đang mở bản đồ toàn tuyến cho HTX")}
               />
             </div>
           )}
           <div className="grid grid-cols-2 gap-3">
             <div className="rounded-[20px] border border-[#e0ebe0] bg-white p-4 shadow-sm text-center">
               <Droplets size={28} className="mx-auto mb-2 text-[#2f815c]" />
               <p className="text-[10px] font-bold text-[#71877b] uppercase">Độ mặn (‰)</p>
               <p className="mt-1 text-2xl font-bold text-[#183b32]">3.2</p>
               <p className="text-[10px] text-[#e9784b] mt-1 font-semibold">Cảnh báo: Tăng nhẹ</p>
             </div>
             <div className="rounded-[20px] border border-[#e0ebe0] bg-white p-4 shadow-sm text-center">
               <Thermometer size={28} className="mx-auto mb-2 text-[#d9733e]" />
               <p className="text-[10px] font-bold text-[#71877b] uppercase">Độ phèn (pH)</p>
               <p className="mt-1 text-2xl font-bold text-[#183b32]">6.5</p>
               <p className="text-[10px] text-[#28704d] mt-1 font-semibold">Mức an toàn</p>
             </div>
           </div>
           <div className="rounded-[20px] border border-[#e0ebe0] bg-white p-4 shadow-sm">
             <div className="flex items-center gap-3 mb-3">
                <Wind size={24} className="text-[#397153]" />
                <div>
                  <p className="text-[10px] font-bold text-[#71877b] uppercase">Chất lượng không khí (AQI)</p>
                  <p className="text-xl font-bold text-[#183b32]">42 <span className="text-xs text-[#28704d] font-normal">(Tốt)</span></p>
                </div>
             </div>
             <p className="text-xs text-[#557264] leading-5">Không khí trong lành, rất phù hợp cho các hoạt động canh tác và thu hoạch ngoài trời.</p>
           </div>
           <div className="rounded-[20px] border border-[#e0ebe0] bg-[#fff4df] p-4 shadow-sm mt-4">
             <div className="flex items-center gap-2 mb-2">
               <AlertTriangle size={18} className="text-[#d9733e]" />
               <p className="text-sm font-bold text-[#d9733e]">Dự báo 3 ngày tới</p>
             </div>
             <p className="text-xs text-[#71877b] leading-5">Khả năng xâm nhập mặn sâu ở các thủy cấp sông Cửa Lớn và các địa giới mới sau sáp nhập của TP. Cà Mau (Phường 2 mới - sáp nhập từ Phường 9, Phường 4 mới - sáp nhập từ Phường 5, và các khu vực vùng ven thuộc xã Lý Văn Lâm, Tắc Vân, Định Bình). Khuyến nghị các HTX/xã viên đóng cống, hạn chế lấy nước vào đầm nuôi tôm.</p>
           </div>
         </div>
      )}
      {inventoryModal && <InventoryModal category={inventoryModal} onClose={() => setInventoryModal(null)} />}
    </div>
  );
}

function HomeView({
  notify,
  activeTab,
  origin,
  setOrigin,
  destination,
  setDestination,
  produce,
  setProduce,
  weight,
  setWeight,
  findBoat,
  matching,
  matched,
  setMatched,
  setActiveTab,
  journeyMode,
  setJourneyMode,
  vehicleInfo,
  createJourney,
  onCargoDetail,
  onVehicleDetail,
  onRouteDetail,
  role,
  onContract,
  onOpenCustomSearch,
  onViewAllVehicles,
}) {
  const [showAllEnvs, setShowAllEnvs] = useState(false);

  if (role === "cooperative") {
    return (
      <CooperativeDashboard 
        notify={notify}
        activeTab={activeTab}
        onContract={onContract} 
        setActiveTab={setActiveTab} 
        origin={origin}
        setOrigin={setOrigin}
        destination={destination}
        setDestination={setDestination}
        produce={produce}
        setProduce={setProduce}
        weight={weight}
        setWeight={setWeight}
        findBoat={findBoat}
        matching={matching}
        matched={matched}
        createJourney={createJourney}
        vehicleInfo={vehicleInfo}
      />
    );
  }
  return (
    <div className="animate-rise flex flex-col">
      <section className="relative mb-7 overflow-hidden rounded-[24px] bg-[#2f815c] px-6 py-7 text-white shadow-xl shadow-[#2f815c]/15 md:px-9 md:py-9">
        <div className="relative z-10 max-w-lg">
          <p className="mb-2 text-sm font-semibold text-[#c5e8ae]">
             {getFormattedCurrentDateLong()}
          </p>
          <h1 className="display-font text-3xl font-bold leading-tight md:text-4xl">
            Chào mừng trở lại,
            <br />
            <span className="text-[#c5e8ae]">kết nối mùa vụ hôm nay?</span>
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#d7ebdc]">
            Hệ thống Logistics Đường Thủy Cà Mau - Bạc Liêu · Cắt giảm khâu trung gian · Theo dõi theo con nước
          </p>
        </div>
        <div className="absolute -right-6 -top-12 text-[190px] leading-none text-[#3b815e] opacity-50">
          ⌁
        </div>
        <Ship
          className="absolute bottom-5 right-8 text-[#a4d87f] opacity-80"
          size={42}
        />
      </section>

      <section className="order-3 mb-8">
        <SectionTitle eyebrow="Bắt đầu hành trình" title="Đặt chuyến nhanh" />
        <FastBookingForm 
          origin={origin} setOrigin={setOrigin}
          destination={destination} setDestination={setDestination}
          produce={produce} setProduce={setProduce}
          weight={weight} setWeight={setWeight}
          findBoat={findBoat} matching={matching} matched={matched}
          createJourney={createJourney} vehicleInfo={vehicleInfo}
        />
      </section>

      <section className="order-1 mb-8">
        <SectionTitle
          eyebrow="Đang cần chuyến"
          title="Hàng hóa quanh bạn"
          action="Tìm chuyến theo yêu cầu"
          onAction={onOpenCustomSearch}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {cargoRequests.map((cargo) => (
            <button
              key={cargo.id}
              onClick={() => {
                setProduce(cargo.name);
                setWeight(cargo.amount);
                setOrigin(cargo.origin);
                setDestination(cargo.destination);
                setJourneyMode("Tìm phương tiện");
                onCargoDetail(cargo);
              }}
              className="flex items-start gap-3.5 rounded-[20px] border border-[#e0ebe0] bg-white p-4 text-left shadow-sm transition hover:border-[#2f815c] hover:shadow-md active:scale-[0.99]"
            >
              <ProduceIcon type={cargo.type} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <b className="block text-sm text-[#183b32] truncate">{cargo.name}</b>
                  <span className="shrink-0 rounded-full bg-[#edf6e9] px-2 py-0.5 text-[9px] font-bold text-[#28704d]">
                    {cargo.standard.split(" · ")[0]}
                  </span>
                </div>
                <span className="mt-0.5 block truncate text-[11px] font-semibold text-[#4d705d]">
                  {cargo.subName}
                </span>
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#71877b] truncate max-w-[170px]">
                     {cargo.route}
                  </span>
                  <span className="font-bold text-[#e9784b] shrink-0">
                    {cargo.amount}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-[#f0f6ee] pt-2 text-[10px] text-[#8ba095]">
                  <span>{cargo.packaging}</span>
                  <span className="font-bold text-[#2f815c]">{cargo.time}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
      <section className="order-2 mb-8">
        <SectionTitle
          eyebrow="Sẵn sàng nhận chuyến"
          title="Phương tiện đang trống"
          action="Xem tất cả"
          onAction={onViewAllVehicles}
        />
        <div className="flex gap-3 overflow-x-auto pb-1">
          {availableVehicles.map((vehicle) => (
            <button
              key={vehicle.name}
              onClick={() => {
                setJourneyMode("Ghép chuyến");
                onVehicleDetail(vehicle);
              }}
              className="min-w-[240px] rounded-[18px] border border-[#e0ebe0] bg-white p-4 text-left shadow-sm hover:border-[#2f815c] transition"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold text-[#183b32]">
                  <Ship size={17} className="text-[#2f815c]" />
                  {vehicle.name}
                </span>
                <span className="rounded-full bg-[#edf6e9] px-2 py-1 text-[10px] font-bold text-[#4c9758]">
                  Đang trống
                </span>
              </div>
              <p className="mt-2.5 text-xs text-[#6e8579]">
                {vehicle.type} · tải trọng {vehicle.capacity} · Thuyền trưởng: {vehicle.captain}
              </p>
              <p className="mt-1 text-[11px] text-[#799085] truncate">{vehicle.route}</p>
              <p className="mt-2.5 text-xs font-bold text-[#d96e44]">
                Phí cước {vehicle.fee}
              </p>
            </button>
          ))}
        </div>
      </section>
      <section className="order-4 mb-8">
        <SectionTitle
          eyebrow="Theo dõi dòng chảy thực tế"
          title="Bản đồ luồng sông Cà Mau - Bạc Liêu"
          action="Xem chi tiết"
          onAction={onRouteDetail}
        />
        <InteractiveRiverMap
          origin={origin}
          destination={destination}
          setOrigin={setOrigin}
          setDestination={setDestination}
          onRouteDetail={onRouteDetail}
        />
      </section>
      <section className="order-5 mb-8">
        <SectionTitle
          eyebrow="Mạng lưới cảm biến môi trường"
          title="Cảnh báo môi trường nước"
          action={showAllEnvs ? "Thu gọn" : "Xem tất cả"}
          onAction={() => setShowAllEnvs(!showAllEnvs)}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {(() => {
            const envData = [
              { name: "Kênh Quản Lộ (Ninh Quới, Ninh Quới A, Vĩnh Phú Đông, TT Phước Long)", value: "0.4‰", label: "Nước ngọt an toàn", tone: "safe" },
              { name: "Sông Cà Mau (Phường 2 mới - sáp nhập P9)", value: "4.2‰", label: "Xâm nhập mặn nhẹ", tone: "warning" },
              { name: "Tuyến Sông Gành Hào (Phường 4 mới - sáp nhập P5)", value: "5.5‰", label: "Xâm nhập mặn vừa", tone: "warning" },
              { name: "Cửa biển Gành Hào & Sông Đốc", value: "18.5‰", label: "Nước mặn triều dâng", tone: "danger" },
              { name: "Kênh Tắc Vân (Xã Tắc Vân - sáp nhập Định Bình)", value: "2.1‰", label: "Xâm nhập mặn nhẹ", tone: "warning" },
              { name: "Sông Trẹm (Xã Lý Văn Lâm)", value: "1.2‰", label: "Nước ngọt an toàn", tone: "safe" },
              { name: "Kênh xáng (Phường Tân Xuyên)", value: "0.8‰", label: "Nước ngọt an toàn", tone: "safe" },
              { name: "Sông Ông Đốc (Tuyến ven xã Tân Thành)", value: "12.4‰", label: "Nước mặn triều dâng", tone: "danger" },
              { name: "Sông Bảy Háp (Huyện Năm Căn)", value: "22.0‰", label: "Cảnh báo mặn cao", tone: "danger" },
              { name: "Rạch Rập (Phường 8, Cà Mau)", value: "3.5‰", label: "Nguy cơ nhiễm mặn", tone: "warning" }
            ];
            const visible = showAllEnvs ? envData : envData.slice(0, 4);
            return visible.map((env, i) => (
              <EnvironmentCard key={i} name={env.name} value={env.value} label={env.label} tone={env.tone} />
            ));
          })()}
        </div>
      </section>

    </div>
  );
}

function BoatOwnerHome({ onCargoDetail, setActiveTab }) {
  return (
    <div className="animate-rise">


      <div className="mt-6 grid grid-cols-3 gap-3">
        <button
          onClick={() => setActiveTab("activity")}
          className="rounded-2xl bg-white p-3 text-left shadow-sm border border-[#e0ebe0] hover:border-[#2f815c] transition"
        >
          <Route className="text-[#397153]" size={20} />
          <b className="mt-2 block text-xs">Tối ưu tuyến</b>
          <span className="mt-1 block text-[9px] text-[#799085]">
            Ninh Quới
          </span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className="rounded-2xl bg-white p-3 text-left shadow-sm border border-[#e0ebe0] hover:border-[#2f815c] transition"
        >
          <Gauge className="text-[#e9784b]" size={20} />
          <b className="mt-2 block text-xs">Tải trống</b>
          <span className="mt-1 block text-[9px] text-[#799085]">
            Còn 5 tấn
          </span>
        </button>
        <button
          onClick={() => setActiveTab("activity")}
          className="rounded-2xl bg-[#edf6e9] p-3 text-left shadow-sm border border-[#bde0a9] hover:border-[#2f815c] transition"
        >
          <Package className="text-[#28704d]" size={20} />
          <b className="mt-2 block text-xs text-[#28704d]">Ghép chuyến</b>
          <span className="mt-1 block text-[9px] text-[#397153]">
            Tự động lấp đầy
          </span>
        </button>
      </div>
    </div>
  );
}

const cooperativeFarmers = [
  "Nguyễn Văn Sáu",
  "Trần Thị Mai",
  "Lê Minh Tâm",
  "Phạm Văn Bình",
  "Đặng Thị Lan",
];
function CooperativeFlow({ onContract }) {
  const [selected, setSelected] = useState([0, 1, 2, 3, 4]);
  const toggle = (index) =>
    setSelected((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  return (
    <div className="rounded-[20px] border border-[#bde0a9] bg-[#f7fcf3] p-4">
      <div className="mb-3 flex items-center gap-2">
        <Users size={18} className="text-[#397153]" />
        <div>
          <b className="text-sm">Gom đơn thành lô lớn</b>
          <p className="text-xs text-[#71877b]">
            AI gọi xà lan lớn, cước phí rẻ hơn.
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {cooperativeFarmers.map((farmer, index) => (
          <label
            key={farmer}
            className="flex items-center gap-3 rounded-xl bg-white p-3 text-xs"
          >
            <input
              type="checkbox"
              checked={selected.includes(index)}
              onChange={() => toggle(index)}
              className="h-4 w-4 accent-[#2f815c]"
            />
            <span className="flex-1">
              <VerifiedName name={farmer} />
              <span className="ml-2 text-[#8ba095]">
                {index % 2 ? "8 tấn" : "12 tấn"} lúa
              </span>
            </span>
          </label>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[#dcebd3] pt-3">
        <span className="text-xs font-bold text-[#28704d]">
          {selected.length} hộ · {selected.length * 10} tấn lúa
        </span>
        <button
          onClick={onContract}
          className="rounded-xl bg-[#2f815c] px-3 py-2.5 text-xs font-bold text-white"
        >
          Tạo lô hàng lớn
        </button>
      </div>
    </div>
  );
}
function EnvironmentCard({ name, value, label, tone }) {
  return (
    <div className="flex items-center justify-between rounded-[16px] border border-[#e0ebe0] bg-white p-4 shadow-sm">
      <div>
        <div className="flex items-center gap-2 text-sm font-bold">
          <span
            className={`h-2.5 w-2.5 rounded-full ${tone === "safe" ? "bg-[#65ad62]" : "bg-[#e9784b]"}`}
          />
          {name}
        </div>
        <p className="mt-2 text-xs text-[#799085]">Độ mặn hiện tại</p>
      </div>
      <div className="text-right">
        <p className="display-font text-2xl font-bold">{value}</p>
        <span
          className={`text-[10px] font-bold ${tone === "safe" ? "text-[#4c9758]" : "text-[#d96e44]"}`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
function PageHeading({ eyebrow, title, action }) {
  return (
    <div className="mb-7 flex items-start justify-between pt-3">
      <div>
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[.18em] text-[#8ba095]">
          {eyebrow}
        </p>
        <h1 className="display-font text-3xl font-bold tracking-tight">
          {title}
        </h1>
      </div>
      {action}
    </div>
  );
}
function ActivityView({ journeys: items, notify, onDetail }) {
  const [filter, setFilter] = useState("Tất cả");
  const filters = ["Tất cả", "Đang giao", "Đã hoàn thành", "Đã hủy"];
  const visibleItems =
    filter === "Tất cả"
      ? items
      : items.filter((journey) => journey.status === filter);
  return (
    <div className="animate-rise">
      <PageHeading
        eyebrow="Nhật ký vận chuyển"
        title="Hoạt động"
        action={
          <button
            onClick={() => notify("Tìm kiếm chuyến hàng đang sẵn sàng")}
            className="rounded-full bg-white p-2 text-[#397153] shadow-sm"
            aria-label="Tìm kiếm"
          >
            <Search size={17} />
          </button>
        }
      />
      <div className="mb-5 flex gap-2 overflow-auto pb-1">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold ${filter === item ? "bg-[#2f815c] text-white" : "border border-[#dce8dc] bg-white text-[#6e8579]"}`}
          >
            {item}
            {item === "Tất cả" ? " (8)" : ""}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {visibleItems.map((journey) => (
          <JourneyCard key={journey.id} journey={journey} onDetail={onDetail} />
        ))}
      </div>
    </div>
  );
}
function JourneyCard({ journey, onDetail }) {
  const origin = journey.origin || journey.route.split(" → ")[0];
  const destination = journey.destination || journey.route.split(" → ")[1];

  return (
    <article className="rounded-[20px] border border-[#e0ebe0] bg-white p-4 shadow-sm transition hover:border-[#2f815c] hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex gap-3 min-w-0">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              journey.tone === "green"
                ? "bg-[#e9f5e6] text-[#4c9758]"
                : journey.tone === "blue"
                  ? "bg-[#e8f1f5] text-[#51859c]"
                  : "bg-[#f0f2ef] text-[#8b9e93]"
            }`}
          >
            <Ship size={19} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-[#183b32] truncate">
                {journey.title}
              </p>
              {journey.weight && (
                <span className="rounded-md bg-[#fff4df] px-1.5 py-0.5 text-[10px] font-bold text-[#d9733e]">
                  {journey.weight}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-[#799085] truncate">
              {journey.id} · {journey.route}
            </p>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
            journey.progress === 0
              ? "bg-[#fef7ee] text-[#d9733e]"
              : journey.tone === "green"
                ? "bg-[#eff9e9] text-[#4c9758]"
                : journey.tone === "blue"
                  ? "bg-[#edf5f8] text-[#51859c]"
                  : "bg-[#f1f3f0] text-[#8b9e93]"
          }`}
        >
          {journey.status}
        </span>
      </div>

      {/* Progress Corridor Timeline */}
      <div className="mt-4 rounded-xl bg-[#f5faf3] border border-[#e8f2e6] p-3">
        <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-[#557264]">
          <span className="truncate max-w-[48%]"> {origin}</span>
          <span className="truncate max-w-[48%] text-right"> {destination}</span>
        </div>
        <div className="relative h-2 rounded-full bg-[#d5e7d1]">
          <div
            className="h-full rounded-full bg-[#3b9b66] transition-all duration-500"
            style={{ width: `${Math.max(journey.progress, 4)}%` }}
          />
          <span
            className="absolute -top-1.5 h-5 w-5 rounded-full border-2 border-white bg-[#e9784b] shadow-md flex items-center justify-center text-[8px] text-white font-bold"
            style={{
              left: `calc(${Math.max(Math.min(journey.progress, 96), 0)}% - 10px)`,
            }}
          >
            
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] text-[#71877b]">
          <span>
            {journey.progress === 0
              ? `Đang ở bến xuất phát (${origin})`
              : journey.progress >= 100
                ? `Đã cập bến giao nhận (${destination})`
                : `Đang chạy trên luồng sông (${journey.progress}%)`}
          </span>
          <span className="font-bold text-[#2f815c]">
            {journey.createdAt || "Hôm nay"}
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-[#edf2eb] pt-2.5 text-xs">
        <div>
          <span className="text-[#8b9e93]">Phương tiện: </span>
          <b className="text-[#183b32]">
            {journey.boat} ({journey.plate})
          </b>
        </div>
        <span className="font-semibold text-[#6d8876]">{journey.eta}</span>
      </div>
      <button
        onClick={() => onDetail(journey)}
        className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl bg-[#edf6e9] hover:bg-[#e0f1db] py-2.5 text-xs font-bold text-[#28704d] transition active:scale-[0.99]"
      >
        Xem chi tiết lộ trình trên sông <ChevronRight size={14} />
      </button>
    </article>
  );
}
function PaymentView({
  balance: currentBalance,
  pay,
  setWalletAction,
  setHistoryOpen,
  fee,
}) {
  return (
    <div className="animate-rise">
      <PageHeading
        eyebrow="Ví Hành trình xanh"
        title="Thanh toán"
        action={
          <button
            onClick={() => setHistoryOpen(true)}
            className="rounded-xl bg-white p-2.5 text-[#397153] shadow-sm"
          >
            <ReceiptText size={18} />
          </button>
        }
      />
      <section className="mb-5 rounded-[22px] bg-[#34765b] p-6 text-white shadow-xl shadow-[#34765b]/15">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-[#b6d1bc]">Số dư khả dụng</p>
            <p className="display-font mt-2 text-3xl font-bold">
              {currentBalance.toLocaleString("vi-VN")}{" "}
              <small className="text-base font-medium">đ</small>
            </p>
          </div>
          <Wallet className="text-[#a4d87f]" size={25} />
        </div>
        <div className="mt-7 flex gap-3">
          <button
            onClick={() => setWalletAction("Nạp tiền")}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-xs font-bold hover:bg-white/20"
          >
            <ArrowDownToLine size={15} />
            Nạp tiền
          </button>
          <button
            onClick={() => setWalletAction("Rút tiền")}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-xs font-bold hover:bg-white/20"
          >
            <ArrowUpFromLine size={15} />
            Rút tiền
          </button>
        </div>
      </section>
      <div className="mb-6 grid grid-cols-3 gap-3">
        <QuickAction
          icon={Plus}
          label="Nạp tiền"
          onClick={() => setWalletAction("Nạp tiền")}
        />
        <QuickAction icon={Ship} label="Trả cước" onClick={pay} />
        <QuickAction
          icon={Clock3}
          label="Lịch sử"
          onClick={() => setHistoryOpen(true)}
        />
      </div>
      <SectionTitle
        eyebrow="Giao dịch gần đây"
        title="Lịch sử ví"
        action="Xem tất cả"
        onAction={() => setHistoryOpen(true)}
      />
      <div className="divide-y divide-[#edf2eb] rounded-[20px] border border-[#e0ebe0] bg-white px-4">
        <Transaction
          icon={Ship}
          title="Cước ghe Thành Công"
          date="Hôm nay, 14:08"
          amount={`-${fee.toLocaleString("vi-VN")}đ`}
        />
        <Transaction
          icon={ArrowDownToLine}
          title="Nạp tiền vào ví"
          date="Hôm nay, 09:30"
          amount="+2.000.000đ"
          positive
        />
        <Transaction
          icon={Check}
          title="Hoàn cước chuyến HT-1982"
          date="Hôm qua, 15:45"
          amount={`+${fee.toLocaleString("vi-VN")}đ`}
          positive
        />
      </div>
    </div>
  );
}
function QuickAction({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 rounded-[16px] border border-[#e0ebe0] bg-white py-4 text-xs font-bold text-[#4b6658] shadow-sm"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf6e9] text-[#397153]">
        <Icon size={17} />
      </span>
      {label}
    </button>
  );
}
function Transaction({ icon: Icon, title, date, amount, positive }) {
  return (
    <div className="flex items-center gap-3 py-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf6e9] text-[#397153]">
        <Icon size={16} />
      </span>
      <div className="flex-1">
        <p className="text-xs font-bold">{title}</p>
        <p className="mt-1 text-[10px] text-[#8b9e93]">{date}</p>
      </div>
      <b
        className={`text-xs ${positive ? "text-[#4c9758]" : "text-[#183b32]"}`}
      >
        {amount}
      </b>
    </div>
  );
}
function NotificationView({ notify }) {
  return (
    <div className="animate-rise">
      <PageHeading
        eyebrow="Trao đổi chuyến hàng"
        title="Tin nhắn"
        action={
          <button
            onClick={() => notify("Đã đánh dấu các cuộc trò chuyện là đã đọc")}
            className="text-xs font-bold text-[#28704d]"
          >
            Đánh dấu đã đọc
          </button>
        }
      />
      <div className="space-y-3">
        {[
          {
            icon: Ship,
            title: "Ghe Thành Công · Anh Tùng",
            text: "Anh nhận chuyến xoài ở Phường Cà Mau nhé?",
            time: "Đang hoạt động",
            color: "green",
          },
          {
            icon: UserRound,
            title: "Chị Mai · Người gửi",
            text: "Cho mình xin thời gian ghe đến Xã Năm Căn.",
            time: "8 phút trước",
            color: "blue",
          },
          {
            icon: MessageCircle,
            title: "Hỗ trợ Hành trình xanh",
            text: "Chúng tôi đã cập nhật tuyến sông an toàn.",
            time: "Hôm qua",
            color: "orange",
          },
        ].map((notice) => (
          <div
            key={notice.title}
            onClick={() => notify(`Đã mở chat với ${notice.title}`)}
            className="flex cursor-pointer gap-3 rounded-[18px] border border-[#e0ebe0] bg-white p-4 shadow-sm transition hover:border-[#b7d6ad]"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${notice.color === "orange" ? "bg-[#fff1e9] text-[#e9784b]" : notice.color === "green" ? "bg-[#edf6e9] text-[#4c9758]" : "bg-[#edf5f8] text-[#51859c]"}`}
            >
              <notice.icon size={18} />
            </span>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold">{notice.title}</p>
                {notice.time === "Đang hoạt động" && (
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#e9784b]" />
                )}
              </div>
              <p className="mt-1 text-xs leading-5 text-[#71877b]">
                {notice.text}
              </p>
              <p className="mt-2 text-[10px] font-semibold text-[#a0afa5]">
                {notice.time}
              </p>
            </div>
            <button
              onClick={(event) => {
                event.stopPropagation();
                notify(`Đang gọi ${notice.title}`);
              }}
              className="self-center rounded-full bg-[#edf6e9] p-2.5 text-[#28704d]"
              aria-label={`Gọi ${notice.title}`}
            >
              <Phone size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
function MenuView({ setActiveTab }) {
  return (
    <div className="animate-rise pb-24">
      <PageHeading eyebrow="Tất cả chức năng" title="Chức năng" />
      <div className="grid grid-cols-2 gap-4 mt-4 px-4">
        <button onClick={() => setActiveTab("activity")} className="flex flex-col items-center justify-center p-6 bg-white rounded-[20px] shadow-sm border border-[#e5ece3] hover:border-[#397153] transition-colors">
          <Activity className="text-[#397153] mb-3" size={32} />
          <span className="font-bold text-sm text-[#183b32]">Quản lý chuyến</span>
        </button>
        <button onClick={() => setActiveTab("payment")} className="flex flex-col items-center justify-center p-6 bg-white rounded-[20px] shadow-sm border border-[#e5ece3] hover:border-[#397153] transition-colors">
          <Wallet className="text-[#397153] mb-3" size={32} />
          <span className="font-bold text-sm text-[#183b32]">Thanh toán & Ví</span>
        </button>
        <button onClick={() => setActiveTab("notifications")} className="flex flex-col items-center justify-center p-6 bg-white rounded-[20px] shadow-sm border border-[#e5ece3] hover:border-[#397153] transition-colors">
          <MessageCircle className="text-[#397153] mb-3" size={32} />
          <span className="font-bold text-sm text-[#183b32]">Tin nhắn</span>
        </button>
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="animate-rise pb-24">
      <PageHeading eyebrow="Bảng điều khiển" title="Tổng quan" />
      <div className="mt-4 space-y-4 px-4">
        <div className="p-5 bg-white rounded-[20px] shadow-sm border border-[#e5ece3]">
          <h3 className="font-bold text-[#397153] flex items-center gap-2"><TrendingUp size={20}/> Thống kê chuyến đi</h3>
          <p className="text-3xl font-black mt-2 text-[#183b32]">1,234 <span className="text-sm font-normal text-[#799085]">chuyến tháng này</span></p>
        </div>
        <div className="p-5 bg-white rounded-[20px] shadow-sm border border-[#e5ece3]">
          <h3 className="font-bold text-[#397153] flex items-center gap-2"><Users size={20}/> Người dùng</h3>
          <p className="text-3xl font-black mt-2 text-[#183b32]">5,678 <span className="text-sm font-normal text-[#799085]">thành viên</span></p>
        </div>
        <div className="p-5 bg-[#edf6e9] rounded-[20px] shadow-sm border border-[#bde0a9]">
          <h3 className="font-bold text-[#28704d] flex items-center gap-2"><ShieldCheck size={20}/> Trạng thái hệ thống</h3>
          <p className="text-sm mt-2 text-[#397153] font-medium">Hoạt động bình thường. Không có cảnh báo.</p>
        </div>
      </div>
    </div>
  );
}

function ProfileView({
  notify,
  vehicleInfo,
  setVehicleInfo,
  onProfilePanel,
  role,
  onRoleChange,
  onKycUpload,
}) {
  const [editingVehicle, setEditingVehicle] = useState(false);
  const updateVehicle = (field, value) =>
    setVehicleInfo((current) => ({ ...current, [field]: value }));

  const currentUserName =
    localStorage.getItem("hanhTrinhXanh.name") ||
    (role === "cooperative" ? "Nguyễn Văn A" : (role === "farmer" ? "Ngọc Anh" : "Nguyễn Thành Công"));
  const userInitials =
    currentUserName
      .split(" ")
      .filter(Boolean)
      .slice(-2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "NA";

  return (
    <div className="animate-rise">
      <PageHeading
        eyebrow="Tài khoản của bạn"
        title="Tôi"
        action={
          <button
            onClick={() => notify("Chế độ chỉnh sửa đã sẵn sàng")}
            className="rounded-xl bg-white p-2.5 text-[#397153] shadow-sm"
          >
            <Menu size={18} />
          </button>
        }
      />
      <section className="mb-5 flex items-center gap-4 rounded-[20px] border border-[#e0ebe0] bg-white p-5 shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dcebd3] text-xl font-bold text-[#397153]">
          {userInitials}
        </div>
        <div>
          <h2 className="display-font text-xl font-bold">
            <VerifiedName name={currentUserName} />
          </h2>
          <p className="mt-1 text-xs text-[#799085]">
            {role === "cooperative" ? "Quản lý HTX" : (role === "farmer" ? "Nông dân" : "Chủ ghe")} · Thành viên từ
            2024
          </p>
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#edf6e9] px-2 py-1 text-[10px] font-bold text-[#4c9758]">
            <Check size={11} />
            Tài khoản đã xác thực
          </span>
        </div>
      </section>
      <section className="mb-5 rounded-[20px] border border-[#bde0a9] bg-[#f7fcf3] p-5">
        <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#8ba095]">
          Phân quyền demo
        </p>
        <h2 className="display-font mt-1 text-lg font-bold">
          Chuyển đổi vai trò
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-[#e4f1df] p-1 sm:grid-cols-2">
          <button
            onClick={() => onRoleChange("farmer")}
            className={`rounded-lg px-2 py-3 text-xs font-bold ${role === "farmer" ? "bg-white text-[#28704d] shadow-sm" : "text-[#71877b]"}`}
          >
            Nông dân & Chủ ghe
          </button>
          <button
            onClick={() => onRoleChange("cooperative")}
            className={`rounded-lg px-2 py-3 text-xs font-bold ${role === "cooperative" ? "bg-white text-[#28704d] shadow-sm" : "text-[#71877b]"}`}
          >
            HTX
          </button>
        </div>
      </section>
      {role !== "cooperative" ? (
        <section className="mb-5 rounded-[20px] border border-[#e0ebe0] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[.16em] text-[#8ba095]">
                Thông tin chạy chuyến
              </p>
              <h2 className="display-font text-lg font-bold">
                Phương tiện của tôi
              </h2>
            </div>
            <button
              onClick={() => setEditingVehicle((current) => !current)}
              className="rounded-lg bg-[#edf6e9] px-3 py-2 text-xs font-bold text-[#28704d]"
            >
              {editingVehicle ? "Đóng" : "Nhập phương tiện"}
            </button>
          </div>
          {editingVehicle ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Loại phương tiện" icon={Ship}>
                <select
                  value={vehicleInfo.type}
                  onChange={(event) => updateVehicle("type", event.target.value)}
                >
                  {vehicleTypes.map((vehicle) => (
                    <option key={vehicle.name}>{vehicle.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Tên phương tiện" icon={Anchor}>
                <input
                  value={vehicleInfo.name}
                  onChange={(event) => updateVehicle("name", event.target.value)}
                  placeholder="Ví dụ: Ghe Thành Công"
                />
              </Field>
              <Field label="Số đăng ký / biển số" icon={ReceiptText}>
                <input
                  value={vehicleInfo.plate}
                  onChange={(event) => updateVehicle("plate", event.target.value)}
                />
              </Field>
              <Field label="Trọng tải tối đa" icon={MoreHorizontal}>
                <select
                  value={vehicleInfo.capacity}
                  onChange={(event) =>
                    updateVehicle("capacity", event.target.value)
                  }
                >
                  <option>500 kg</option>
                  <option>1 tấn</option>
                  <option>2 tấn</option>
                  <option>5 tấn</option>
                  <option>10 tấn</option>
                  <option>20 tấn</option>
                </select>
              </Field>
              <button
                onClick={() => {
                  setEditingVehicle(false);
                  notify(`Đã lưu ${vehicleInfo.type} ${vehicleInfo.name}`);
                }}
                className="sm:col-span-2 rounded-xl bg-[#1f6b4b] py-3 text-sm font-bold text-white"
              >
                Lưu phương tiện
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-xl bg-[#f1f6ef] p-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#397153]">
                <Ship size={19} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold">
                  <VerifiedName name={vehicleInfo.name} />
                </p>
                <p className="mt-1 text-xs text-[#799085]">
                  {vehicleInfo.type} · {vehicleInfo.plate} · tải{" "}
                  {vehicleInfo.capacity}
                </p>
              </div>
            </div>
          )}
        </section>
      ) : (
        <section className="mb-5 rounded-[20px] border border-[#e0ebe0] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[.16em] text-[#8ba095]">
                Hồ sơ pháp lý
              </p>
              <h2 className="display-font text-lg font-bold">
                Thông tin Hợp tác xã
              </h2>
            </div>
            <button
              onClick={() => notify("Đang mở trang chỉnh sửa hồ sơ HTX")}
              className="rounded-lg bg-[#edf6e9] px-3 py-2 text-xs font-bold text-[#28704d]"
            >
              Cập nhật
            </button>
          </div>
          <div className="space-y-3">
             <div className="flex items-center gap-3 text-sm border-b border-[#f0f6ee] pb-2">
                <ShieldCheck size={18} className="text-[#397153]" />
                <span className="font-semibold text-[#183b32] w-24">Mã số thuế:</span>
                <span className="text-[#557264]">2001234567</span>
             </div>
             <div className="flex items-center gap-3 text-sm border-b border-[#f0f6ee] pb-2">
                <MapPin size={18} className="text-[#397153]" />
                <span className="font-semibold text-[#183b32] w-24">Địa chỉ:</span>
                <span className="text-[#557264] truncate">Xã Ninh Quới, Hồng Dân, Bạc Liêu</span>
             </div>
             <div className="flex items-center gap-3 text-sm">
                <Leaf size={18} className="text-[#397153]" />
                <span className="font-semibold text-[#183b32] w-24">Chứng nhận:</span>
                <span className="text-[#2f815c] font-bold">VietGAP, MRV Carbon</span>
             </div>
          </div>
        </section>
      )}
      <section className="mb-5 rounded-[20px] border border-[#e0ebe0] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-[#3e9b61]" size={21} />
          <div>
            <b className="text-sm">Định danh & KYC</b>
            <p className="mt-1 text-xs text-[#799085]">
              CCCD mặt trước / mặt sau đã sẵn sàng
            </p>
          </div>
        </div>
        <button
          onClick={onKycUpload}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#9fc898] bg-[#f7fcf3] py-3 text-xs font-bold text-[#28704d]"
        >
          <Upload size={15} /> Tải lên ảnh CCCD mặt trước / sau
        </button>
      </section>
      <div className="overflow-hidden rounded-[20px] border border-[#e0ebe0] bg-white shadow-sm">
        {[
          [UserRound, "Thông tin cá nhân"],
          [Bell, "Cài đặt thông báo"],
          [CircleHelp, "Trung tâm hỗ trợ"],
          [MessageCircle, "Đánh giá chuyến đi"],
        ].map(([Icon, label]) => (
          <button
            key={label}
            onClick={() => onProfilePanel(label)}
            className="flex w-full items-center gap-3 border-b border-[#edf2eb] px-4 py-4 text-left text-sm font-semibold last:border-0"
          >
            <Icon size={18} className="text-[#6c917c]" />
            <span className="flex-1">{label}</span>
            <ChevronRight size={16} className="text-[#9caf9f]" />
          </button>
        ))}
        <button
          onClick={() => onProfilePanel("Đăng xuất")}
          className="flex w-full items-center gap-3 px-4 py-4 text-left text-sm font-semibold text-[#d96e44] border-t border-[#edf2eb]"
        >
          <LogOut size={18} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}

function BellPanel({ onClose, onOpenMessages }) {
  return (
    <div className="absolute right-5 top-20 z-30 w-[min(360px,calc(100%-40px))] rounded-2xl border border-[#dce8dc] bg-white p-4 shadow-2xl md:right-10">
      <div className="mb-3 flex items-center justify-between">
        <b className="display-font">Tin mới</b>
        <button onClick={onClose} aria-label="Đóng">
          <X size={17} />
        </button>
      </div>
      {notices.slice(0, 2).map((notice) => (
        <button
          key={notice.id}
          onClick={onOpenMessages}
          className="mb-2 flex w-full gap-3 rounded-xl bg-[#f5f8f4] p-3 text-left"
        >
          <span className="rounded-lg bg-[#edf6e9] p-2 text-[#397153]">
            <notice.icon size={15} />
          </span>
          <span>
            <b className="block text-xs">{notice.title}</b>
            <span className="mt-1 block text-[11px] leading-4 text-[#71877b]">
              {notice.text}
            </span>
          </span>
        </button>
      ))}
      <button
        onClick={onOpenMessages}
        className="mt-1 flex w-full items-center justify-center gap-1 text-xs font-bold text-[#28704d]"
      >
        Mở tin nhắn <ChevronRight size={14} />
      </button>
    </div>
  );
}

function RoutePreview({ onClose }) {
  const [activeSeg, setActiveSeg] = useState(riverSegments[0]);
  const mapUrl = getInteractiveMapUrl(activeSeg.origin, 0.05);

  return (
    <ModalShell onClose={onClose}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8ba095]">
            Mạng lưới thủy đạo liên tỉnh
          </p>
          <h2 className="display-font text-xl font-bold text-[#183b32]">
            Luồng sông Cà Mau - Bạc Liêu
          </h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="rounded-full bg-[#f1f6ef] p-2 text-[#397153] hover:bg-[#e4efe2] transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* Segment Selector Tabs */}
      <div className="mb-3 flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        {riverSegments.map((seg) => {
          const isSelected = activeSeg.id === seg.id;
          return (
            <button
              key={seg.id}
              onClick={() => setActiveSeg(seg)}
              className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-semibold transition active:scale-95 ${
                isSelected
                  ? "bg-[#2f815c] text-white shadow-sm font-bold"
                  : "border border-[#e0ece0] bg-[#f8fbf7] text-[#557264] hover:bg-[#edf6e9]"
              }`}
            >
               {seg.shortName}
            </button>
          );
        })}
      </div>

      {/* Dynamic Visual Route Map (Shopee Tracking Style) */}
      <div className="relative h-64 overflow-hidden rounded-2xl bg-[#f1f8f3] border border-[#dce8dc]">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#2f815c 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        
        {/* River path curvy aesthetic */}
        <svg className="absolute inset-0 h-full w-full opacity-10" viewBox="0 0 400 200" preserveAspectRatio="none">
          <path d="M -50,150 Q 100,50 200,100 T 450,50" fill="none" stroke="#2f815c" strokeWidth="30" />
          <path d="M -50,180 Q 150,150 250,50 T 450,100" fill="none" stroke="#2f815c" strokeWidth="20" />
        </svg>

        {/* Tracking Line */}
        <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2">
           <div className="h-1.5 w-full rounded-full bg-[#2f815c]" />
           
           {/* Stops */}
           {activeSeg.stops.map((stop, index) => {
             const percent = (index / (activeSeg.stops.length - 1)) * 100;
             return (
               <div key={stop} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" style={{ left: `${percent}%` }}>
                 <div className={`h-5 w-5 rounded-full border-4 border-white shadow-md ${index === 0 || index === activeSeg.stops.length - 1 ? 'bg-[#e9784b] h-6 w-6' : 'bg-[#2f815c]'}`} />
                 <span className={`absolute top-6 w-24 text-center text-[10px] font-bold leading-tight text-[#183b32] line-clamp-2 -translate-x-1/2 left-1/2`}>
                   {stop}
                 </span>
               </div>
             );
           })}
        </div>

        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-2 text-xs font-bold text-[#28704d] shadow">
          <Map size={14} className="text-[#2f815c]" />
          <span>{activeSeg.name}</span>
        </div>
        <div className="absolute bottom-3 right-3 rounded-lg bg-[#183b32]/95 px-3 py-1.5 text-[10px] font-bold text-white shadow">
          {activeSeg.tide} · {activeSeg.clearance}
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-[#f1f6ef] p-3 text-xs">
        <div className="flex items-center justify-between">
          <p className="font-bold text-[#8ba095]">
            Chặng đường: <strong className="text-[#183b32]">{activeSeg.route}</strong>
          </p>
          <span className="font-bold text-[#2f815c]">{activeSeg.distance} ({activeSeg.duration})</span>
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          {activeSeg.stops.map((stop, index) => (
            <span key={stop} className="flex items-center gap-1.5">
              <b className="rounded-lg bg-white px-2.5 py-1 text-[#28704d] shadow-sm">
                {stop}
              </b>
              {index < activeSeg.stops.length - 1 && (
                <ChevronRight size={13} className="text-[#9caf9f]" />
              )}
            </span>
          ))}
        </div>
      </div>
    </ModalShell>
  );
}

function ProfilePanel({ panel, onClose, notify, onLogout }) {
  const content = {
    "Thông tin cá nhân": [
      "Hồ sơ Ngọc Anh",
      "Nguyễn Ngọc Anh · Nông dân",
      "CCCD: 0792 04xx xxxx",
      "Số điện thoại: 09xx xxx 248",
      "Địa chỉ: Ấp Ninh Quới, Xã Ninh Quới, Cà Mau",
    ],
    "Cài đặt thông báo": [
      "Cài đặt thông báo",
      "Thông báo chuyến hàng: Đang bật",
      "Cảnh báo độ mặn: Đang bật",
      "Tin nhắn mới: Đang bật",
    ],
    "Trung tâm hỗ trợ": [
      "Trung tâm hỗ trợ",
      "Hotline: 1900 2026",
      "Hỗ trợ ghép chuyến và thanh toán",
      "Phản hồi trong vòng 5 phút",
    ],
    "Đánh giá chuyến đi": [
      "Đánh giá khách hàng",
      "Chuyến gần nhất: HT-3224",
      "Khách hàng Anh Tùng",
      " 5/5 · Đúng giờ, thân thiện, giao hàng an toàn",
    ],
  }[panel];
  if (panel === "Đăng xuất")
    return (
      <ModalShell onClose={onClose}>
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#fff1e9] text-[#e9784b]">
            <LogOut size={21} />
          </div>
          <h2 className="display-font text-xl font-bold">
            Đăng xuất phiên demo?
          </h2>
          <p className="mt-2 text-sm text-[#71877b]">
            Bạn có thể đăng nhập lại bất cứ lúc nào.
          </p>
          <div className="mt-5 flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-[#dce8dc] py-3 text-sm font-bold text-[#557264]"
            >
              Ở lại
            </button>
            <button
              onClick={() => {
                notify("Đã đăng xuất khỏi phiên demo");
                onLogout();
                onClose();
              }}
              className="flex-1 rounded-xl bg-[#e9784b] py-3 text-sm font-bold text-white"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </ModalShell>
    );
  if (panel === "Đánh giá chuyến đi") {
    const reviews = [
      { id: 1, name: "Anh Tùng", date: "15/08/2026 14:30", rating: 5, text: "Chủ ghe rất nhiệt tình, cẩn thận. Lúa về tới Cà Mau không suy suyển hột nào, cảm ơn anh Sáu nha!", avatar: "T" },
      { id: 2, name: "HTX Nhật Minh", date: "10/08/2026 09:15", rating: 5, text: "Giao hàng đúng hẹn, xe sạch sẽ, có phủ bạt cẩn thận. Sẽ tiếp tục hợp tác các chuyến trái cây sau.", avatar: "N" },
      { id: 3, name: "Chị Bảy", date: "02/08/2026 16:45", rating: 4, text: "Ghe chạy êm, nhưng kẹt con nước nên đến trễ 30 phút. Nói chung vẫn tốt.", avatar: "B" },
      { id: 4, name: "Đại lý Tôm Khô Tấn Phát", date: "25/07/2026 11:20", rating: 5, text: "Tuyệt vời, tôm sống 100%, bảo quản lạnh rất chuẩn.", avatar: "T" }
    ];
    return (
      <ModalShell onClose={onClose}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="display-font text-xl font-bold text-[#183b32]">Đánh giá khách hàng</h2>
          <button onClick={onClose} aria-label="Đóng" className="rounded-full bg-[#f1f6ef] p-2 text-[#397153] hover:bg-[#e4efe2] transition">
            <X size={18} />
          </button>
        </div>
        <div className="flex items-center gap-4 mb-4 bg-[#fffaf5] p-4 rounded-xl border border-[#faecd8]">
          <div className="text-center">
            <p className="text-4xl font-bold text-[#e9784b]">4.8</p>
            <p className="text-xs text-[#d9733e]">trên 5</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex text-[#e9784b]">
              {[1,2,3,4,5].map(i => <Star key={i} size={16} fill={i <= 4 ? "currentColor" : "none"} strokeWidth={i <= 4 ? 0 : 2} />)}
            </div>
            <p className="text-xs text-[#799085]">Dựa trên 120 đánh giá</p>
          </div>
        </div>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto scrollbar-thin pr-1 pb-4">
          {reviews.map(r => (
            <div key={r.id} className="border-b border-[#e0ebe0] pb-4 last:border-0 last:pb-0">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1f6ef] text-[#2f815c] font-bold text-lg border border-[#d6e8d4]">
                  {r.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#183b32]">{r.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex text-[#e9784b]">
                      {[1,2,3,4,5].map(i => <Star key={i} size={12} fill={i <= r.rating ? "currentColor" : "none"} strokeWidth={i <= r.rating ? 0 : 2} />)}
                    </div>
                  </div>
                  <p className="text-[10px] text-[#8ba095] mt-1 mb-2">{r.date}</p>
                  <p className="text-sm text-[#365f4b] leading-5">{r.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ModalShell>
    );
  }

  return (
    <ModalShell onClose={onClose}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="display-font text-xl font-bold text-[#183b32]">{content[0]}</h2>
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="rounded-full bg-[#f1f6ef] p-2 text-[#397153]"
        >
          <X size={18} />
        </button>
      </div>
      <div className="space-y-2 max-h-[60vh] overflow-y-auto">
        {content.slice(1).map((line) => (
          <div
            key={line}
            className="rounded-xl bg-[#f1f6ef] p-3 text-sm font-semibold text-[#365f4b]"
          >
            {line}
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          notify(`Đã lưu ${panel}`);
          onClose();
        }}
        className="mt-4 w-full rounded-xl bg-[#1f6b4b] py-3 text-sm font-bold text-white shadow-md active:scale-95 transition"
      >
        Đã hiểu
      </button>
    </ModalShell>
  );
}

function JourneyDetail({ journey, onClose }) {
  const origin =
    journey.origin ||
    journey.route.split(" → ")[0] ||
    "Xã Ninh Quới (Bạc Liêu)";
  const destination =
    journey.destination ||
    journey.route.split(" → ")[1] ||
    "Xã Phước Long (Bạc Liêu)";
  const stops = journey.stops || [
    origin,
    "Luồng sông trung chuyển",
    destination,
  ];

  // Dynamic Map URL centered on current journey location
  const mapCenterLocation =
    journey.progress >= 90
      ? destination
      : journey.progress <= 10
        ? origin
        : stops[1] || origin;
  const mapUrl = getInteractiveMapUrl(mapCenterLocation, 0.04);

  return (
    <ModalShell onClose={onClose}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#edf6e9] px-2.5 py-0.5 text-[10px] font-bold text-[#28704d]">
              {journey.id}
            </span>
            <span className="text-[10px] text-[#71877b]">
              Khởi tạo: {journey.createdAt || "Hôm nay"}
            </span>
          </div>
          <h2 className="display-font mt-1 text-xl font-bold text-[#183b32]">
            {journey.title}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="rounded-full bg-[#f1f6ef] p-2 text-[#397153] hover:bg-[#e2ece0] transition"
          aria-label="Đóng"
        >
          <X size={18} />
        </button>
      </div>

      {/* Embedded Dynamic GPS Waterway Map (Shopee Tracking Style) */}
      <div className="relative h-60 w-full overflow-hidden rounded-2xl bg-[#f1f8f3] border border-[#dce8dc]">
        {/* Background Grid / Map aesthetics */}
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#2f815c 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        
        {/* River path curvy aesthetic (just for looks) */}
        <svg className="absolute inset-0 h-full w-full opacity-10" viewBox="0 0 400 200" preserveAspectRatio="none">
          <path d="M -50,150 Q 100,50 200,100 T 450,50" fill="none" stroke="#2f815c" strokeWidth="30" />
          <path d="M -50,180 Q 150,150 250,50 T 450,100" fill="none" stroke="#2f815c" strokeWidth="20" />
        </svg>

        {/* Tracking Line Container */}
        <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2">
           {/* Track Background */}
           <div className="h-1.5 w-full rounded-full bg-[#c8dec2]" />
           {/* Track Progress */}
           <div className="absolute left-0 top-0 h-1.5 rounded-full bg-[#2f815c] transition-all duration-1000 ease-in-out" style={{ width: `${journey.progress}%` }} />
           
           {/* Origin Node */}
           <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-4 border-white bg-[#e9784b] shadow-md z-10" />
           <span className="absolute -left-8 top-6 w-24 text-center text-[10px] font-bold leading-tight text-[#397153] line-clamp-2">
             {origin}
           </span>

           {/* Destination Node */}
           <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-4 border-white bg-[#2f815c] shadow-md z-10" />
           <span className="absolute -right-8 top-6 w-24 text-center text-[10px] font-bold leading-tight text-[#397153] line-clamp-2">
             {destination}
           </span>
           
           {/* Moving Boat */}
           <div 
             className="absolute top-1/2 z-20 flex -translate-y-1/2 -translate-x-1/2 items-center justify-center transition-all duration-1000 ease-in-out"
             style={{ left: `${journey.progress}%` }}
           >
             <div className="relative">
               <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#2f815c] bg-white text-[#2f815c] shadow-lg">
                 <Ship size={20} className={journey.progress > 0 && journey.progress < 100 ? "animate-pulse" : ""} />
               </div>
               <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#183b32] px-2.5 py-1 text-[11px] font-bold text-white shadow-md after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-[#183b32]">
                 {journey.progress}%
               </span>
             </div>
           </div>
        </div>

        {/* Live Status Overlay */}
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2 text-[11px] font-bold text-[#183b32] shadow-sm backdrop-blur border border-[#e0ebe0]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#e9784b]" />
          <span>
            {journey.progress <= 5
            ? "Đang neo bến xếp dỡ"
            : journey.progress >= 100
              ? "Đã cập bến an toàn"
              : `Ghe đang chạy: ${stops[1] || "Khúc sông trung chuyển"}`}
          </span>
        </div>
      </div>

      {/* Step-by-Step Waterway Corridor Flow */}
      <div className="mt-4 rounded-2xl border border-[#e2ede0] bg-[#f8fbf7] p-3.5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#8ba095] mb-2.5">
          Tiến trình luồng sông Cà Mau - Bạc Liêu:
        </p>
        <div className="space-y-2.5 text-xs">
          {/* Step 1: Origin */}
          <div className="flex items-start gap-2.5">
            <div
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                journey.progress >= 0
                  ? "bg-[#2f815c] text-white ring-4 ring-[#2f815c]/15"
                  : "bg-[#dce8dc] text-[#71877b]"
              }`}
            >
              1
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-bold text-[#183b32]">
                  Bến xuất phát: {origin}
                </p>
                <span
                  className={`text-[10px] font-bold ${
                    journey.progress <= 10
                      ? "text-[#e9784b]"
                      : "text-[#28704d]"
                  }`}
                >
                  {journey.progress <= 10
                    ? " Đang bốc hàng lên ghe"
                    : " Đã rời bến"}
                </span>
              </div>
              <p className="text-[10px] text-[#71877b] mt-0.5">
                Tiếp nhận nông sản & neo đậu bến bãi an toàn
              </p>
            </div>
          </div>

          {/* Step 2: River transit */}
          <div className="flex items-start gap-2.5">
            <div
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                journey.progress > 10
                  ? "bg-[#2f815c] text-white ring-4 ring-[#2f815c]/15"
                  : "bg-[#e5eee4] text-[#8ba095]"
              }`}
            >
              2
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-bold text-[#183b32]">
                  Lưu thông trên luồng: {stops[1] || "Khúc sông trung chuyển"}
                </p>
                <span
                  className={`text-[10px] font-bold ${
                    journey.progress > 10 && journey.progress < 100
                      ? "text-[#2f815c]"
                      : journey.progress >= 100
                        ? "text-[#28704d]"
                        : "text-[#8ba095]"
                  }`}
                >
                  {journey.progress > 10 && journey.progress < 100
                    ? " Đang chạy đúng con nước"
                    : journey.progress >= 100
                      ? " Đã vượt qua"
                      : " Chờ xuất bến"}
                </span>
              </div>
              <p className="text-[10px] text-[#71877b] mt-0.5">
                Giám sát tĩnh không cầu & nước triều dâng
              </p>
            </div>
          </div>

          {/* Step 3: Destination */}
          <div className="flex items-start gap-2.5">
            <div
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                journey.progress >= 100
                  ? "bg-[#2f815c] text-white ring-4 ring-[#2f815c]/15"
                  : "bg-[#e5eee4] text-[#8ba095]"
              }`}
            >
              3
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-bold text-[#183b32]">
                  Bến giao nhận: {destination}
                </p>
                <span
                  className={`text-[10px] font-bold ${
                    journey.progress >= 100
                      ? "text-[#28704d]"
                      : "text-[#8ba095]"
                  }`}
                >
                  {journey.progress >= 100
                    ? " Đã cập bến giao nhận"
                    : " Đang đón phương tiện"}
                </span>
              </div>
              <p className="text-[10px] text-[#71877b] mt-0.5">
                Nghiệm thu chất lượng nông sản & hoàn tất
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Details Specs */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-xl border border-[#e0ebe0] bg-[#f8fbf7] p-2.5">
          <span className="text-[10px] text-[#71877b]">Phương tiện</span>
          <b className="mt-0.5 block text-[#183b32] truncate">
            {journey.boat} ({journey.plate})
          </b>
        </div>
        <div className="rounded-xl border border-[#e0ebe0] bg-[#f8fbf7] p-2.5">
          <span className="text-[10px] text-[#71877b]">Khối lượng hàng</span>
          <b className="mt-0.5 block text-[#e9784b]">
            {journey.weight || "Theo hợp đồng"}
          </b>
        </div>
        <div className="rounded-xl border border-[#e0ebe0] bg-[#f8fbf7] p-2.5">
          <span className="text-[10px] text-[#71877b]">Thủy triều & luồng</span>
          <b className="mt-0.5 block text-[#28704d]">Nước lớn · Thuận dòng</b>
        </div>
        <div className="rounded-xl border border-[#e0ebe0] bg-[#f8fbf7] p-2.5">
          <span className="text-[10px] text-[#71877b]">Thời gian (ETA)</span>
          <b className="mt-0.5 block text-[#183b32] truncate">{journey.eta}</b>
        </div>
      </div>
      
      {journey.status === "Đã hoàn thành" && (
        <div className="mt-4 rounded-2xl border border-[#e2ede0] bg-white p-4 shadow-sm text-center">
          <h3 className="font-bold text-[#183b32] mb-2">Đánh giá chuyến đi</h3>
          <p className="text-xs text-[#71877b] mb-3">Vui lòng đánh giá trải nghiệm của bạn</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star} 
                onClick={() => setRating(star)}
                className={`${rating >= star ? "text-[#e9784b]" : "text-[#dce8dc]"} transition-transform hover:scale-110`}
              >
                <Star size={28} fill={rating >= star ? "currentColor" : "none"} strokeWidth={2} />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-xs text-[#28704d] mt-2 font-bold animate-rise">Cảm ơn bạn đã đánh giá!</p>
          )}
        </div>
      )}
    </ModalShell>
  );
}

function WalletMethodModal({ action, onClose, notify }) {
  const methods = [
    [Landmark, "Ngân hàng nội địa"],
    [Wallet, "Ví MoMo"],
    [CreditCard, "Thẻ Visa / Mastercard"],
    [ArrowDownToLine, "Chuyển khoản nhanh"],
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#183b32]/35 p-0 backdrop-blur-sm sm:items-center sm:p-5">
      <div className="w-full max-w-md rounded-t-[24px] bg-white p-5 shadow-2xl sm:rounded-[24px]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8ba095]">
              Ví Hành trình xanh
            </p>
            <h2 className="display-font text-xl font-bold">{action} qua</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-[#f1f6ef] p-2 text-[#397153]"
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>
        <div className="space-y-2">
          {methods.map(([Icon, label]) => (
            <button
              key={label}
              onClick={() => {
                notify(`${action} qua ${label}`);
                onClose();
              }}
              className="flex w-full items-center gap-3 rounded-xl border border-[#e0ebe0] p-3 text-left hover:border-[#9fc898]"
            >
              <span className="rounded-lg bg-[#edf6e9] p-2 text-[#397153]">
                <Icon size={17} />
              </span>
              <span className="flex-1 text-sm font-semibold">{label}</span>
              <ChevronRight size={16} className="text-[#9caf9f]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function HistoryModal({ onClose, fee }) {
  return (
    <ModalShell onClose={onClose}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8ba095]">
            Ví Hành trình xanh
          </p>
          <h2 className="display-font text-xl font-bold">Lịch sử giao dịch</h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="rounded-full bg-[#f1f6ef] p-2 text-[#397153]"
        >
          <X size={18} />
        </button>
      </div>
      <div className="space-y-1 rounded-2xl border border-[#e0ebe0] px-4">
        <Transaction
          icon={Ship}
          title="Cước chuyến HT-3224"
          date="Hôm nay, 14:08"
          amount={`-${fee.toLocaleString("vi-VN")}đ`}
        />
        <Transaction
          icon={ArrowDownToLine}
          title="Nạp tiền vào ví"
          date="Hôm nay, 09:30"
          amount="+2.000.000đ"
          positive
        />
        <Transaction
          icon={Check}
          title="Hoàn cước chuyến HT-1982"
          date="Hôm qua, 15:45"
          amount={`+${fee.toLocaleString("vi-VN")}đ`}
          positive
        />
      </div>
      <button
        onClick={onClose}
        className="mt-4 w-full rounded-xl bg-[#2f815c] py-3 text-sm font-bold text-white"
      >
        Đóng lịch sử
      </button>
    </ModalShell>
  );
}

function ModalShell({ children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#183b32]/35 p-0 backdrop-blur-sm sm:items-center sm:p-5">
      <div className="w-full max-w-md rounded-t-[24px] bg-white p-5 shadow-2xl sm:rounded-[24px]">
        {children}
      </div>
    </div>
  );
}

function CargoDetail({ cargo, onClose, onAccept }) {
  return (
    <ModalShell onClose={onClose}>
      <div className="mb-5 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <ProduceIcon type={cargo.type} />
          <div>
            <span className="rounded-full bg-[#edf6e9] px-2 py-0.5 text-[10px] font-bold text-[#28704d]">
              {cargo.standard}
            </span>
            <h2 className="display-font mt-0.5 text-xl font-bold text-[#183b32]">
              {cargo.name}
            </h2>
            <p className="text-xs text-[#557264]">{cargo.subName}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="rounded-full bg-[#f1f6ef] p-2 text-[#397153]"
        >
          <X size={18} />
        </button>
      </div>
      <div className="space-y-2.5 rounded-2xl bg-[#f1f6ef] p-4 text-xs sm:text-sm">
        <div className="flex justify-between">
          <span className="text-[#799085]">Khối lượng hàng</span>
          <b className="text-[#e9784b] text-base">{cargo.amount}</b>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#799085]">Bến xuất phát (Điểm đi)</span>
          <b className="text-right text-[#183b32]">{cargo.origin || cargo.route.split(" → ")[0]}</b>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#799085]">Bến giao nhận (Điểm đến)</span>
          <b className="text-right text-[#183b32]">{cargo.destination || cargo.route.split(" → ")[1]}</b>
        </div>
        <div className="flex justify-between">
          <span className="text-[#799085]">Quy cách đóng gói</span>
          <b>{cargo.packaging}</b>
        </div>
        <div className="flex justify-between">
          <span className="text-[#799085]">Bảo quản đặc biệt</span>
          <b className="text-[#2f815c]">{cargo.tempReq || "Khô ráo"}</b>
        </div>
        <div className="flex justify-between">
          <span className="text-[#799085]">Thời gian yêu cầu</span>
          <b>{cargo.time}</b>
        </div>
        <div className="flex justify-between border-t border-[#dfeade] pt-2">
          <span className="text-[#799085]">Đơn vị gửi hàng</span>
          <b className="text-[#28704d]">{cargo.sender}</b>
        </div>
      </div>
      <button
        onClick={onAccept}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2f815c] hover:bg-[#246747] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#2f815c]/25 transition active:scale-[0.98]"
      >
        <CheckCheck size={18} /> Nhận vận chuyển lô hàng này
      </button>
    </ModalShell>
  );
}

function VehicleDetail({ vehicle, onClose, onBook }) {
  return (
    <ModalShell onClose={onClose}>
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8ba095]">
            Phương tiện đang trống
          </p>
          <h2 className="display-font mt-1 text-2xl font-bold">
            {vehicle.name}
          </h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="rounded-full bg-[#f1f6ef] p-2 text-[#397153]"
        >
          <X size={18} />
        </button>
      </div>
      <div className="rounded-2xl bg-[#f1f6ef] p-4 text-sm">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded-xl bg-white p-3 text-[#397153]">
            <Ship size={22} />
          </span>
          <div>
            <b>
              {vehicle.type} · tải {vehicle.capacity}
            </b>
            <p className="mt-1 text-xs text-[#4c9758]">Sẵn sàng nhận chuyến</p>
          </div>
        </div>
        <p className="text-xs text-[#799085]">
          Tuyến dự kiến: <b className="text-[#183b32]">{vehicle.route}</b>
        </p>
        <p className="mt-2 text-xs font-bold text-[#d96e44]">
          Phí nền tảng {vehicle.fee}
        </p>
      </div>
      <button
        onClick={onBook}
        className="mt-4 w-full rounded-xl bg-[#e9784b] py-3.5 text-sm font-bold text-white"
      >
        Đặt chuyến với phương tiện này
      </button>
    </ModalShell>
  );
}

function ContractModal({ onClose, notify }) {
  const [deposit, setDeposit] = useState("20%");
  const [signed, setSigned] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const fields = [
    ["Tên người mua / chủ ghe", "Anh Tùng · Ghe Thành Công"],
    ["Tên nông dân", "Ngọc Anh · HTX Ninh Quới"],
    ["Loại nông sản", "Lúa ST25 Bạc Liêu"],
    ["Ngày thu hoạch dự kiến", getCurrentDateShort()],
    ["Khối lượng", "50 tấn · Lô HTX-NQ-08"],
    ["Giá chốt cố định", "7.200.000đ / tấn"],
  ];
  const sign = () => {
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      setSigned(true);
      notify("Tiền cọc đã được khóa vào hệ thống an toàn");
    }, 2000);
  };
  return (
    <ModalShell>
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8ba095]">
            Smart Contract · HTX-NQ-08
          </p>
          <h2 className="display-font mt-1 text-xl font-bold">
            Hợp đồng vận tải & Bao tiêu số
          </h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="rounded-full bg-[#f1f6ef] p-2 text-[#397153]"
        >
          <X size={18} />
        </button>
      </div>
      <div className="space-y-2">
        {fields.map(([label, value]) => (
          <label
            key={label}
            className="block rounded-xl bg-[#f1f6ef] px-3 py-2"
          >
            <span className="block text-[10px] font-bold uppercase tracking-[.08em] text-[#8ba095]">
              {label}
            </span>
            <input
              readOnly
              value={value}
              className="mt-1 w-full bg-transparent text-xs font-bold text-[#183b32] outline-none"
            />
          </label>
        ))}
      </div>
      <label className="mt-3 block rounded-xl border border-[#bde0a9] bg-[#f7fcf3] px-3 py-2">
        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[.08em] text-[#8ba095]">
          <LockKeyhole size={12} /> Tỷ lệ cọc
        </span>
        <select
          value={deposit}
          onChange={(event) => setDeposit(event.target.value)}
          className="mt-1 w-full bg-transparent text-sm font-bold text-[#28704d] outline-none"
        >
          <option>10%</option>
          <option>20%</option>
          <option>30%</option>
        </select>
      </label>
      <div
        className={`mt-3 flex items-start gap-2 rounded-xl p-3 text-xs ${signed ? "bg-[#e5f5df] text-[#28704d]" : "bg-[#fff4df] text-[#8b6332]"}`}
      >
        <ShieldCheck size={16} className="mt-0.5 shrink-0" />
        <span>
          {signed
            ? "Đã ký điện tử · Tiền cọc đã khóa an toàn."
            : `Số tiền cọc dự kiến: 72.000.000đ (${deposit})`}
        </span>
      </div>
      <button
        disabled={signed || isSigning}
        onClick={sign}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f6b4b] py-3.5 text-sm font-bold text-white disabled:opacity-70 transition-all"
      >
        {isSigning ? (
          <>
            <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
            Đang chờ Chủ ghe xác nhận...
          </>
        ) : (
          <>
            <LockKeyhole size={17} />
            {signed ? "Hợp đồng đã có hiệu lực" : "Ký tên & Khóa tiền cọc"}
          </>
        )}
      </button>
    </ModalShell>
  );
}

function AllVehiclesModal({ vehicles, onClose, onVehicleDetail, createJourney }) {
  return (
    <ModalShell onClose={onClose}>
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="display-font text-2xl font-bold text-[#183b32]">
            Tất cả phương tiện
          </h2>
          <p className="mt-1 text-xs text-[#799085]">
            Danh sách ghe, xà lan, vỏ đang sẵn sàng
          </p>
        </div>
        <button
          onClick={onClose}
          className="rounded-full bg-[#f1f6ef] p-2 text-[#397153]"
        >
          <X size={18} />
        </button>
      </div>
      <div className="flex flex-col gap-3 h-[60vh] overflow-y-auto">
        {vehicles.map((v) => (
          <div key={v.name} className="rounded-[18px] border border-[#e0ebe0] bg-white p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-[#183b32]">{v.name}</span>
              <span className="font-bold text-[#e9784b]">{v.fee}</span>
            </div>
            <p className="text-xs text-[#71877b] mb-1">Tải trọng: {v.capacity}</p>
            <p className="text-xs text-[#71877b] mb-3">Tuyến: {v.route}</p>
            <div className="flex gap-2">
              <button 
                onClick={() => { onClose(); onVehicleDetail(v); }}
                className="flex-1 rounded-xl border border-[#2f815c] py-2 text-xs font-bold text-[#2f815c] transition active:scale-95"
              >
                Xem chi tiết
              </button>
              <button 
                onClick={() => { 
                  onClose(); 
                  createJourney("Ghép chuyến", {
                    title: "Chuyến đặt phương tiện",
                    route: v.route,
                    boat: v.name,
                  });
                }}
                className="flex-1 rounded-xl bg-[#2f815c] py-2 text-xs font-bold text-white shadow-sm transition active:scale-95"
              >
                Đặt chuyến
              </button>
            </div>
          </div>
        ))}
      </div>
    </ModalShell>
  );
}

function FastBookingForm({
  origin, setOrigin,
  destination, setDestination,
  produce, setProduce,
  weight, setWeight,
  findBoat, matching, matched, createJourney, vehicleInfo
}) {
  return (
    <div className="rounded-[20px] border border-[#e0ebe0] bg-white p-4 shadow-sm md:p-5">
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Điểm đi (Bến xuất phát)" icon={MapPin}>
          <div className="w-full">
            <FlexibleInput
              value={origin}
              onChange={(val) => setOrigin(val)}
              options={caMauLocations}
              placeholder="Chọn điểm đi..."
            />
          </div>
        </Field>
        <Field label="Điểm đến (Bến giao nhận)" icon={Navigation}>
          <div className="w-full">
            <FlexibleInput
              value={destination}
              onChange={(val) => setDestination(val)}
              options={caMauLocations}
              placeholder="Chọn điểm đến..."
            />
          </div>
        </Field>
        <Field label="Loại nông/hải sản đặc sản" icon={Package}>
          <div className="w-full">
            <FlexibleInput
              value={produce}
              onChange={(val) => setProduce(val)}
              grouped={produceGroupedOptions}
              placeholder="Chọn loại hàng hóa..."
            />
          </div>
        </Field>
        <Field label="Khối lượng cần chở" icon={MoreHorizontal}>
          <div className="w-full">
            <FlexibleInput
              value={weight}
              onChange={(val) => setWeight(val)}
              options={weightOptions}
              placeholder="Chọn khối lượng..."
            />
          </div>
        </Field>
      </div>
      <button
        disabled={matching}
        onClick={findBoat}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#e9784b] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#e9784b]/20 transition hover:bg-[#d7653a] disabled:cursor-wait disabled:opacity-70 active:scale-[0.99]"
      >
        {matching ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            AI đang tính toán tuyến sông & con nước...
          </>
        ) : (
          <>
            <Sparkles size={17} />
            Tìm chuyến bằng AI
          </>
        )}
      </button>
      {matched && (
        <button
          onClick={() => createJourney("Tìm phương tiện")}
          className="mt-4 block w-full animate-rise rounded-xl border border-[#bde0a9] bg-[#eff9e9] p-4 text-left transition hover:bg-[#e5f5df]"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4f9b61] text-white">
              <Check size={17} />
            </span>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#27623f]">Tìm chuyến thành công</p>
              <p className="mt-1 text-xs leading-5 text-[#557264]">
                Ghe Thành Công · AG 1888 · Tuyến: {origin} → {destination} ({weight} {produce})
              </p>
              <p className="mt-1.5 text-xs font-bold text-[#db713f]">
                Đang neo bến tại {origin} · Bấm để xem hành trình ngay →
              </p>
            </div>
            <ChevronRight size={18} className="text-[#28704d]" />
          </div>
        </button>
      )}
    </div>
  );
}

function InventoryModal({ category, onClose }) {
  const dataMap = {
    "Ghe/Xuồng": [
      { id: "GX-01", name: "Ghe tải chở lúa (30 Tấn)", owner: "Nguyễn Văn Sáu", capacity: "30 Tấn", status: "Sẵn sàng" },
      { id: "GX-02", name: "Ghe chở trái cây (15 Tấn)", owner: "Lê Thị Bảy", capacity: "15 Tấn", status: "Đang vận chuyển" },
    ],
    "Xà Lan": [
      { id: "XL-01", name: "Xà lan Mũi Né 1", owner: "Trần Văn Tám", capacity: "120 Tấn", status: "Đang neo đậu" },
      { id: "XL-02", name: "Xà lan HTX Miền Tây", owner: "HTX Nhật Minh", capacity: "250 Tấn", status: "Đang ghép đơn" },
    ],
    "Lúa Gạo": [
      { id: "LG-01", name: "Lúa ST25 Hữu cơ", owner: "Hộ Nguyễn Văn A", area: "2.5 ha", yield: "15 Tấn", status: "Chờ thu hoạch" },
      { id: "LG-02", name: "Lúa Đài Thơm 8", owner: "Hộ Trần Thị C", area: "1.2 ha", yield: "8 Tấn", status: "Sẵn sàng bán" },
    ],
    "Trái Cây": [
      { id: "TC-01", name: "Cam sành VietGAP", owner: "Hộ Lê Hữu Khương", area: "0.8 ha", yield: "3 Tấn", status: "Chờ thu hoạch" },
      { id: "TC-02", name: "Xoài Cát Hòa Lộc", owner: "Hộ Nguyễn Tấn Đạt", area: "1.5 ha", yield: "4 Tấn", status: "Đang ra trái" },
    ],
    "Thủy Sản": [
      { id: "TS-01", name: "Tôm sú sinh thái", owner: "Hộ Võ Thành", area: "1.5 ha", yield: "2 Tấn", status: "Sẵn sàng xuất" },
      { id: "TS-02", name: "Cua biển Năm Căn", owner: "Hộ Lê Lâm", area: "2.0 ha", yield: "1.5 Tấn", status: "Sẵn sàng xuất" },
    ],
    "Ghép Đơn": [
      { id: "GD-01", name: "Chuyến ghép nông sản Gành Hào", owner: "Tuyến Cà Mau - Bạc Liêu", capacity: "Trống 15 Tấn", status: "Chờ xuất phát" }
    ],
    "Độ Mặn": [
      { id: "MT-01", name: "Trạm đo Quản Lộ", owner: "HTX Nhật Minh", capacity: "0.4‰", status: "Hoạt động tốt" }
    ]
  };

  const getList = () => {
    if (category === "Tất cả") {
      return Object.entries(dataMap).flatMap(([cat, items]) => items.map(item => ({...item, cat})));
    }
    return dataMap[category] || [];
  };

  const items = getList();

  return (
    <ModalShell onClose={onClose}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8ba095]">Danh sách quản lý</p>
          <h2 className="display-font text-xl font-bold text-[#183b32]">{category === "Tất cả" ? "Toàn bộ Tài sản & Nông sản" : category}</h2>
        </div>
        <button onClick={onClose} className="rounded-full bg-[#f1f6ef] p-2 text-[#397153] hover:bg-[#e4efe2] transition">
          <X size={18} />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="py-10 text-center text-sm font-semibold text-[#8ba095]">Chưa có dữ liệu quản lý cho hạng mục này.</div>
      ) : (
        <div className="space-y-3 max-h-[60vh] overflow-y-auto scrollbar-thin pr-1 pb-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-2 rounded-xl border border-[#e0ebe0] bg-[#f8fcf7] p-3 shadow-sm hover:border-[#2f815c] transition">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#183b32] text-sm">{item.name}</span>
                <span className="rounded-full bg-[#edf6e9] px-2 py-1 text-[10px] font-bold text-[#2f815c] whitespace-nowrap">{item.status}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#557264] mt-1">
                {item.owner && <span>Phụ trách: <strong>{item.owner}</strong></span>}
                {item.capacity && <span>Khối lượng/Tải trọng: <strong>{item.capacity}</strong></span>}
                {item.area && <span>Diện tích: <strong>{item.area}</strong></span>}
                {item.yield && <span>Sản lượng: <strong>{item.yield}</strong></span>}
                {item.cat && <span>Loại: <strong className="text-[#d9733e]">{item.cat}</strong></span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </ModalShell>
  );
}

export default App;
