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
} from "lucide-react";

const navItems = [
  { id: "home", label: "Trang chủ", mobileLabel: "Home", icon: Home },
  { id: "activity", label: "Hoạt động", mobileLabel: "Chuyến", icon: Activity },
  { id: "payment", label: "Thanh toán", mobileLabel: "Ví", icon: Wallet },
  {
    id: "notifications",
    label: "Tin nhắn",
    mobileLabel: "Tin nhắn",
    icon: MessageCircle,
  },
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
  "Xã Ninh Quới (Bạc Liêu)",
  "Xã Phước Long (Bạc Liêu)",
  "Xã Hồng Dân (Bạc Liêu)",
  "Thị xã Giá Rai (Bạc Liêu)",
  "Thị trấn Hộ Phòng (Bạc Liêu)",
  "Xã Gành Hào (Bạc Liêu)",
  "Xã Phong Thạnh Tây (Bạc Liêu)",
  "Xã Vĩnh Lợi (Bạc Liêu)",
  "Phường Bạc Liêu (TP Bạc Liêu)",
  "Phường Cà Mau (TP Cà Mau)",
  "Phường An Xuyên (Cà Mau)",
  "Phường Tân Thành (Cà Mau)",
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
    name: "Kênh Quản Lộ - Phụng Hiệp",
    shortName: "Quản Lộ - Phụng Hiệp",
    route: "Ninh Quới ↔ Phước Long ↔ Cà Mau",
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
  },
];

function ProduceIcon({ type, className = "w-5 h-5" }) {
  switch (type) {
    case "crab":
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/15 to-orange-500/15 text-[#c25e2e] ring-1 ring-amber-500/25">
          <Boxes className={className} strokeWidth={2.2} />
        </div>
      );
    case "rice":
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-yellow-500/15 text-[#b8860b] ring-1 ring-yellow-500/30">
          <Wheat className={className} strokeWidth={2.2} />
        </div>
      );
    case "shrimp":
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 text-[#1b75bb] ring-1 ring-blue-500/25">
          <Fish className={className} strokeWidth={2.2} />
        </div>
      );
    case "salted_crab":
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-500/15 text-[#1e7b57] ring-1 ring-emerald-500/25">
          <Boxes className={className} strokeWidth={2.2} />
        </div>
      );
    case "mango":
    default:
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-500/20 to-emerald-500/15 text-[#2f815c] ring-1 ring-emerald-500/25">
          <Leaf className={className} strokeWidth={2.2} />
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
    setActiveTab("home");
    notify(
      nextRole === "farmer"
        ? "Đã chuyển sang Nông dân / HTX"
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
        <header className="flex items-center justify-between px-5 pb-3 pt-5 md:px-10 md:pt-7">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#2f815c] text-white shadow-lg shadow-[#2f815c]/20">
              <Leaf size={21} />
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
            <button
              onClick={logout}
              title="Bấm để đăng xuất và quay lại màn hình Đăng nhập"
              className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#d96e44] shadow-sm hover:bg-[#fff3ed] transition active:scale-95"
            >
              <LogOut size={14} />
              <span className="hidden xs:inline sm:inline">Đăng xuất</span>
            </button>
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
          {activeTab === "home" && (
            <HomeView
              {...{
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
              }}
            />
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
        <nav className="fixed bottom-0 left-0 right-0 z-20 mx-auto grid w-full max-w-[620px] grid-cols-5 items-center border-t border-[#e5ece3] bg-white/95 px-1 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_30px_rgba(36,77,52,.08)] backdrop-blur sm:px-2 md:bottom-4 md:rounded-2xl md:border md:pb-2">
          {navItems.map(({ id, label, mobileLabel, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-0.5 py-1.5 text-center text-[9px] font-semibold leading-3 transition sm:px-2 sm:text-[10px] sm:leading-normal ${activeTab === id ? "bg-[#edf6e9] text-[#28704d]" : "text-[#8b9e93] hover:text-[#397153]"}`}
            >
              <Icon size={19} strokeWidth={activeTab === id ? 2.5 : 1.8} />
              <span className="max-w-full whitespace-nowrap sm:hidden">
                {mobileLabel}
              </span>
              <span className="hidden max-w-full whitespace-nowrap sm:block">
                {label}
              </span>
            </button>
          ))}
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
            createJourney("Tìm phương tiện", {
              title: selectedCargo.name,
              route: selectedCargo.route,
            });
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
    const demoName = isFarmer ? "Ngọc Anh (Nông dân)" : "Nguyễn Thành Công (Chủ ghe)";
    const demoPhone = isFarmer ? "0912 345 678" : "0988 777 666";
    localStorage.setItem("hanhTrinhXanh.authenticated", "true");
    localStorage.setItem("hanhTrinhXanh.phone", demoPhone);
    localStorage.setItem("hanhTrinhXanh.name", demoName);
    localStorage.setItem("hanhTrinhXanh.role", isFarmer ? "farmer" : "owner");
    localStorage.setItem("hanhTrinhXanh.authMethod", "demo_quick");
    showToast(`Đang vào với vai trò ${isFarmer ? "Nông dân" : "Chủ ghe"}...`);
    setTimeout(() => {
      onAuthenticated(isFarmer ? "farmer" : "owner", demoName);
    }, 200);
  };

  return (
    <div className="app-shell flex min-h-screen items-center justify-center p-4 sm:p-6">
      <main className="w-full max-w-lg rounded-[32px] border border-[#dfeade] bg-white p-6 shadow-2xl shadow-[#2f815c]/12 sm:p-8 animate-rise">
        {/* Logo & Brand Header */}
        <div className="mb-6 flex items-center justify-between border-b border-[#eef4ec] pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2f815c] to-[#1f5c40] text-white shadow-lg shadow-[#2f815c]/25">
              <Leaf size={24} />
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
                    🇻🇳 +84
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
                    ⚡ Điền nhanh 123456
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
                🚀 Dùng thử nhanh 1-chạm (Không cần OTP)
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo("farmer")}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-[#cee2c9] bg-white py-2.5 text-xs font-bold text-[#28704d] hover:bg-[#edf6e9] active:scale-95 transition shadow-sm"
                >
                  🌾 Nông dân / HTX
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("owner")}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-[#cee2c9] bg-white py-2.5 text-xs font-bold text-[#28704d] hover:bg-[#edf6e9] active:scale-95 transition shadow-sm"
                >
                  🚢 Chủ ghe chở hàng
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
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRegRole("farmer")}
                  className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 text-center transition active:scale-95 ${
                    regRole === "farmer"
                      ? "border-[#2f815c] bg-[#edf6e9] text-[#1f5c40] ring-2 ring-[#2f815c]/20"
                      : "border-[#dfeade] bg-[#fbfdfa] text-[#71877b] hover:bg-[#f4faf2]"
                  }`}
                >
                  <span className="text-xl">🌾</span>
                  <span className="mt-1 text-[11px] font-bold leading-tight">Nông dân / HTX</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRegRole("boatOwner")}
                  className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 text-center transition active:scale-95 ${
                    regRole === "boatOwner"
                      ? "border-[#2f815c] bg-[#edf6e9] text-[#1f5c40] ring-2 ring-[#2f815c]/20"
                      : "border-[#dfeade] bg-[#fbfdfa] text-[#71877b] hover:bg-[#f4faf2]"
                  }`}
                >
                  <span className="text-xl">🚢</span>
                  <span className="mt-1 text-[11px] font-bold leading-tight">Chủ ghe / Sà lan</span>
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
                  <span className="text-xl">🏪</span>
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
                <span>🌊</span>
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
              🎯 Gán làm Điểm Đi
            </button>
            <button
              type="button"
              onClick={handleSetAsDestination}
              className="rounded-xl bg-[#2f815c] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#256a4b] transition active:scale-95"
            >
              🏁 Gán làm Điểm Đến
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
    { id: "crab", label: "🦀 Cua biển Năm Căn" },
    { id: "rice", label: "🌾 Lúa ST25 Bạc Liêu" },
    { id: "shrimp", label: "🦐 Tôm sú sinh thái" },
    { id: "salted_crab", label: "📦 Ba khía Rạch Gốc" },
    { id: "mango", label: "🍋 Xoài Cát & Trái cây" },
  ];

  // Filter cargo requests
  const filteredCargos = cargoRequests.filter((cargo) => {
    if (selectedProduce !== "Tất cả" && cargo.type !== selectedProduce) return false;
    if (filterOrigin !== "Tất cả" && cargo.origin !== filterOrigin) return false;
    if (filterDestination !== "Tất cả" && cargo.destination !== filterDestination) return false;
    if (filterUrgency !== "Tất cả" && cargo.urgency !== filterUrgency) return false;
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
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8ba095] mb-1.5">
              Loại nông sản đặc sản Cà Mau & Bạc Liêu:
            </p>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {produceCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedProduce(cat.id)}
                  className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-semibold transition active:scale-95 ${
                    selectedProduce === cat.id
                      ? "bg-[#2f815c] text-white shadow-sm shadow-[#2f815c]/25 font-bold"
                      : "border border-[#e0ebe0] bg-white text-[#557264] hover:bg-[#edf6e9]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <div>
              <label className="block text-[10px] font-bold text-[#71877b] mb-1">
                Điểm gửi hàng (Điểm đi)
              </label>
              <select
                value={filterOrigin}
                onChange={(e) => setFilterOrigin(e.target.value)}
                className="w-full rounded-xl border border-[#dce8dc] bg-white p-2 text-xs font-semibold text-[#183b32] outline-none focus:border-[#2f815c]"
              >
                <option value="Tất cả">Tất cả điểm đi</option>
                {caMauLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#71877b] mb-1">
                Điểm giao nhận (Điểm đến)
              </label>
              <select
                value={filterDestination}
                onChange={(e) => setFilterDestination(e.target.value)}
                className="w-full rounded-xl border border-[#dce8dc] bg-white p-2 text-xs font-semibold text-[#183b32] outline-none focus:border-[#2f815c]"
              >
                <option value="Tất cả">Tất cả điểm đến</option>
                {caMauLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
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

function HomeView({
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
}) {
  if (role === "boatOwner") {
    return (
      <BoatOwnerHome onContract={onContract} setActiveTab={setActiveTab} />
    );
  }
  return (
    <div className="animate-rise flex flex-col">
      <section className="relative mb-7 overflow-hidden rounded-[24px] bg-[#2f815c] px-6 py-7 text-white shadow-xl shadow-[#2f815c]/15 md:px-9 md:py-9">
        <div className="relative z-10 max-w-lg">
          <p className="mb-2 text-sm font-semibold text-[#c5e8ae]">
            📅 {getFormattedCurrentDateLong()}
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
      <div className="order-2 mb-7 grid grid-cols-3 gap-2">
        <button
          onClick={() => setJourneyMode("Tìm phương tiện")}
          className="rounded-xl bg-[#e9784b] px-2 py-3 text-[11px] font-bold text-white shadow-sm transition active:scale-95"
        >
          Tìm ghe ghép chuyến
        </button>
        <button
          onClick={onContract}
          className="rounded-xl border border-[#bde0a9] bg-white px-2 py-3 text-[11px] font-bold text-[#28704d] shadow-sm transition active:scale-95"
        >
          Tạo hợp đồng
        </button>
        <button
          onClick={() =>
            document
              .getElementById("luong-xanh-htx")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="rounded-xl border border-[#bde0a9] bg-white px-2 py-3 text-[11px] font-bold text-[#28704d] shadow-sm transition active:scale-95"
        >
          Gom đơn HTX
        </button>
      </div>
      <section className="order-3 mb-8">
        <SectionTitle eyebrow="Bắt đầu hành trình" title="Đặt chuyến nhanh" />
        <div className="rounded-[20px] border border-[#e0ebe0] bg-white p-4 shadow-sm md:p-5">
          <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl bg-[#f1f6ef] p-1">
            {["Tìm phương tiện", "Ghép chuyến"].map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setJourneyMode(mode);
                  setMatched(false);
                }}
                className={`rounded-lg px-3 py-2.5 text-xs font-bold transition ${journeyMode === mode ? "bg-white text-[#28704d] shadow-sm" : "text-[#779084]"}`}
              >
                {mode === "Tìm phương tiện"
                  ? "Tôi cần ghe"
                  : "Tôi có phương tiện"}
              </button>
            ))}
          </div>
          <p className="mb-3 text-xs text-[#6e8579]">
            {journeyMode === "Tìm phương tiện"
              ? "Nhập hàng hóa để tìm phương tiện phù hợp."
              : "Dùng phương tiện đã đăng ký để nhận chuyến cùng tuyến."}
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Điểm đi (Bến xuất phát)" icon={MapPin}>
              <select
                value={origin}
                onChange={(event) => setOrigin(event.target.value)}
              >
                {caMauLocations.map((location) => (
                  <option key={location}>{location}</option>
                ))}
              </select>
            </Field>
            <Field label="Điểm đến (Bến giao nhận)" icon={Navigation}>
              <select
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
              >
                {caMauLocations.map((location) => (
                  <option key={location}>{location}</option>
                ))}
              </select>
            </Field>
            <Field label="Loại nông sản đặc sản" icon={Package}>
              <select
                value={produce}
                onChange={(event) => setProduce(event.target.value)}
              >
                <option>Lúa ST25 Bạc Liêu</option>
                <option>Cua biển Năm Căn</option>
                <option>Tôm sú sinh thái</option>
                <option>Ba khía Rạch Gốc</option>
                <option>Xoài Cát & Trái cây</option>
                <option>Mật ong U Minh</option>
                <option>Thủy sản biển Sông Đốc</option>
              </select>
            </Field>
            <Field label="Khối lượng cần chở" icon={MoreHorizontal}>
              <select
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
              >
                <option>50 kg</option>
                <option>100 kg</option>
                <option>250 kg</option>
                <option>500 kg</option>
                <option>1 tấn</option>
                <option>2 tấn</option>
                <option>5 tấn</option>
                <option>10 tấn</option>
                <option>20 tấn</option>
                <option>50 tấn</option>
              </select>
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
                {journeyMode === "Tìm phương tiện"
                  ? "Tìm chuyến bằng AI"
                  : "Ghép chuyến bằng AI"}
              </>
            )}
          </button>
          {matched && (
            <button
              onClick={() => createJourney(journeyMode)}
              className="mt-4 block w-full animate-rise rounded-xl border border-[#bde0a9] bg-[#eff9e9] p-4 text-left transition hover:bg-[#e5f5df]"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4f9b61] text-white">
                  <Check size={17} />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#27623f]">
                    {journeyMode === "Ghép chuyến"
                      ? "Ghép chuyến thành công"
                      : "Tìm chuyến thành công"}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#557264]">
                    {journeyMode === "Ghép chuyến"
                      ? `${vehicleInfo.name} · ${vehicleInfo.plate} · Tuyến: ${origin} → ${destination}`
                      : `Ghe Thành Công · AG 1888 · Tuyến: ${origin} → ${destination} (${weight} ${produce})`}
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
      </section>
      <section id="luong-xanh-htx" className="order-3 mb-8">
        <SectionTitle eyebrow="Dành cho HTX" title="Luồng Xanh HTX" />
        <CooperativeFlow onContract={onContract} />
      </section>
      <section className="order-1 mb-8">
        <SectionTitle
          eyebrow="Đang cần chuyến"
          title="Hàng hóa quanh bạn"
          action="Tìm theo yêu cầu"
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
                    📍 {cargo.route}
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
          onAction={() => setJourneyMode("Ghép chuyến")}
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
      <section className="order-5">
        <SectionTitle
          eyebrow="Mạng lưới cảm biến môi trường"
          title="Cảnh báo môi trường nước"
          action="Xem tất cả"
          onAction={() => setActiveTab("notifications")}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <EnvironmentCard
            name="Kênh Quản Lộ (Ninh Quới - Phước Long)"
            value="0.4‰"
            label="Nước ngọt an toàn"
            tone="safe"
          />
          <EnvironmentCard
            name="Cửa biển Gành Hào & Sông Đốc"
            value="18.5‰"
            label="Nước mặn triều dâng"
            tone="danger"
          />
        </div>
      </section>
    </div>
  );
}

function BoatOwnerHome({ onContract, setActiveTab }) {
  return (
    <div className="animate-rise">
      <section className="mb-7 rounded-[24px] bg-[#174c3a] px-6 py-7 text-white shadow-xl md:px-9">
        <p className="text-sm font-semibold text-[#bfe3b0]">
          📅 {getFormattedCurrentDateLong()} · Xin chào,{" "}
          <VerifiedName name="Anh Tùng (Chủ ghe)" />
        </p>
        <h1 className="display-font mt-2 text-3xl font-bold">
          Tối ưu từng chuyến ghe.
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#d7ebdc]">
          Nhận nguồn hàng nông sản phù hợp, chạy đầy tải và giảm chuyến rỗng trên toàn tuyến Cà Mau - Bạc Liêu.
        </p>
        <button
          onClick={() => setActiveTab("profile")}
          className="mt-5 rounded-xl bg-[#e9784b] px-4 py-3 text-xs font-bold shadow-md transition active:scale-95"
        >
          Cập nhật trọng tải trống
        </button>
      </section>
      <SectionTitle
        eyebrow="Nguồn hàng đang tìm ghe"
        title="Cơ hội quanh bạn"
      />
      <div className="space-y-3">
        {cargoRequests.map((cargo) => (
          <article
            key={cargo.id}
            className="rounded-[20px] border border-[#e0ebe0] bg-white p-4 shadow-sm transition hover:border-[#2f815c]"
          >
            <div className="flex items-start gap-3.5">
              <ProduceIcon type={cargo.type} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-[#183b32]">
                    <VerifiedName name={cargo.sender} />
                  </p>
                  <span className="rounded-full bg-[#edf6e9] px-2 py-0.5 text-[10px] font-bold text-[#28704d]">
                    {cargo.standard.split(" · ")[0]}
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold text-[#4d705d]">
                  {cargo.name} ({cargo.subName}) · {cargo.amount}
                </p>
                <p className="mt-1 text-xs text-[#71877b]">
                  📍 {cargo.route}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-[11px] font-bold text-[#e9784b]">
                    {cargo.time} · {cargo.packaging}
                  </p>
                  <button
                    onClick={onContract}
                    className="rounded-xl bg-[#2f815c] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#256a4b] active:scale-95"
                  >
                    Đề xuất nhận chuyến
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => setActiveTab("activity")}
          className="rounded-2xl bg-white p-4 text-left shadow-sm border border-[#e0ebe0] hover:border-[#2f815c] transition"
        >
          <Route className="text-[#397153]" size={20} />
          <b className="mt-3 block text-sm">Tối ưu tuyến đường</b>
          <span className="mt-1 block text-xs text-[#799085]">
            Ninh Quới - Phước Long
          </span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className="rounded-2xl bg-white p-4 text-left shadow-sm border border-[#e0ebe0] hover:border-[#2f815c] transition"
        >
          <Gauge className="text-[#e9784b]" size={20} />
          <b className="mt-3 block text-sm">Trọng tải trống</b>
          <span className="mt-1 block text-xs text-[#799085]">
            Còn 5,0 tấn hôm nay
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
          <span className="truncate max-w-[48%]">📍 {origin}</span>
          <span className="truncate max-w-[48%] text-right">🏁 {destination}</span>
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
            🚢
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
    (role === "farmer" ? "Ngọc Anh" : "Nguyễn Thành Công");
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
            {role === "farmer" ? "Nông dân / HTX" : "Chủ ghe"} · Thành viên từ
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
        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-[#e4f1df] p-1">
          <button
            onClick={() => onRoleChange("farmer")}
            className={`rounded-lg px-2 py-3 text-xs font-bold ${role === "farmer" ? "bg-white text-[#28704d] shadow-sm" : "text-[#71877b]"}`}
          >
            Nông dân / HTX
          </button>
          <button
            onClick={() => onRoleChange("boatOwner")}
            className={`rounded-lg px-2 py-3 text-xs font-bold ${role === "boatOwner" ? "bg-white text-[#28704d] shadow-sm" : "text-[#71877b]"}`}
          >
            Chủ ghe
          </button>
        </div>
      </section>
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
          className="flex w-full items-center gap-3 px-4 py-4 text-left text-sm font-semibold text-[#d96e44]"
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
              🌊 {seg.shortName}
            </button>
          );
        })}
      </div>

      {/* Dynamic Map Frame */}
      <div className="relative h-64 overflow-hidden rounded-2xl border border-[#dce8dc]">
        <iframe
          title="Luồng tuyến Cà Mau - Bạc Liêu"
          className="h-full w-full border-0"
          src={mapUrl}
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-2 text-xs font-bold text-[#28704d] shadow">
          <Map size={14} className="text-[#2f815c]" />
          <span>{activeSeg.name}</span>
        </div>
        <div className="absolute bottom-3 right-3 rounded-lg bg-[#183b32]/95 px-3 py-1.5 text-[10px] font-bold text-white shadow">
          {activeSeg.tide} · {activeSeg.clearance}
        </div>
      </div>

      {/* Stops & specs */}
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
      "⭐⭐⭐⭐⭐ 5/5 · Đúng giờ, thân thiện, giao hàng an toàn",
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
  return (
    <ModalShell onClose={onClose}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="display-font text-xl font-bold">{content[0]}</h2>
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="rounded-full bg-[#f1f6ef] p-2 text-[#397153]"
        >
          <X size={18} />
        </button>
      </div>
      <div className="space-y-2">
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
        className="mt-4 w-full rounded-xl bg-[#1f6b4b] py-3 text-sm font-bold text-white"
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

      {/* Embedded Dynamic GPS Waterway Map */}
      <div className="relative h-60 overflow-hidden rounded-2xl bg-[#dcebd3] border border-[#d5e7d1]">
        <iframe
          title={`Bản đồ lộ trình ${journey.route}`}
          className="h-full w-full border-0"
          src={mapUrl}
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2 text-xs font-bold text-[#183b32] shadow backdrop-blur border border-[#e0ebe0]">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#e9784b]" />
          <span>
            Vị trí {journey.boat}:{" "}
            <strong className="text-[#2f815c]">
              {journey.progress <= 10
                ? origin
                : journey.progress >= 90
                  ? destination
                  : stops[1] || origin}
            </strong>
          </span>
        </div>
        <div className="absolute bottom-3 right-3 rounded-xl bg-[#183b32]/95 px-3 py-1.5 text-[10px] font-bold text-white shadow backdrop-blur">
          {journey.progress <= 5
            ? "Đang neo bến xuất phát"
            : journey.progress >= 100
              ? "Đã cập bến an toàn"
              : `Tiến độ: ${journey.progress}%`}
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
                    ? "🟢 Đang bốc hàng lên ghe"
                    : "✅ Đã rời bến"}
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
                    ? "🌊 Đang chạy đúng con nước"
                    : journey.progress >= 100
                      ? "✅ Đã vượt qua"
                      : "⏳ Chờ xuất bến"}
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
                    ? "🏁 Đã cập bến giao nhận"
                    : "⏳ Đang đón phương tiện"}
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
  const fields = [
    ["Tên người mua / chủ ghe", "Anh Tùng · Ghe Thành Công"],
    ["Tên nông dân", "Ngọc Anh · HTX Ninh Quới"],
    ["Loại nông sản", "Lúa ST25 Bạc Liêu"],
    ["Ngày thu hoạch dự kiến", getCurrentDateShort()],
    ["Khối lượng", "50 tấn · Lô HTX-NQ-08"],
    ["Giá chốt cố định", "7.200.000đ / tấn"],
  ];
  const sign = () => {
    setSigned(true);
    notify("Tiền cọc đã được giữ an toàn trên hệ thống. Hợp đồng có hiệu lực!");
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
        disabled={signed}
        onClick={sign}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f6b4b] py-3.5 text-sm font-bold text-white disabled:opacity-70"
      >
        <LockKeyhole size={17} />
        {signed ? "Hợp đồng đã có hiệu lực" : "Ký tên & Khóa tiền cọc"}
      </button>
    </ModalShell>
  );
}

export default App;
