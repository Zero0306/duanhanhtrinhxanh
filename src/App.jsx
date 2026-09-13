import { useState, useEffect, useRef } from "react";
import L from "leaflet";
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
  Calendar,
  CheckCircle,
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
    origin: "Xã Ninh Quới",
    destination: "Xã Phước Long",
    route: "Xã Ninh Quới → Xã Phước Long",
    boat: "Ghe Thành Công",
    plate: "AG 1888",
    status: "Đang giao",
    tone: "green",
    progress: 45,
    eta: "Còn 1 giờ 15 phút (Đang qua Kênh Quản Lộ)",
    mapMarker: "9.458,105.421",
    stops: ["Xã Ninh Quới", "Kênh Quản Lộ", "Xã Phước Long"],
    createdAt: "Hôm nay, 10:15",
  },
  {
    id: "HT-1982",
    title: "Cua biển Năm Căn",
    weight: "150 kg",
    origin: "Phường Năm Căn",
    destination: "Phường Bạc Liêu",
    route: "Phường Năm Căn → Phường Bạc Liêu",
    boat: "Ghe Phúc Lộc",
    plate: "CT 5521",
    status: "Đã hoàn thành",
    tone: "blue",
    progress: 100,
    eta: "Đã cập bến Cà Mau an toàn",
    mapMarker: "9.176,105.150",
    stops: ["Phường Năm Căn", "Sông Bảy Háp", "Phường Bạc Liêu"],
    createdAt: "Hôm qua, 14:30",
  },
  {
    id: "HT-1873",
    title: "Tôm sú sinh thái",
    weight: "300 kg",
    origin: "Xã Đất Mũi",
    destination: "Phường Sông Đốc",
    route: "Xã Đất Mũi → Phường Sông Đốc",
    boat: "Ghe Minh Anh",
    plate: "TG 0912",
    status: "Đã hủy",
    tone: "gray",
    progress: 0,
    eta: "Đã hủy bởi người gửi (biển động)",
    mapMarker: "9.045,104.835",
    stops: ["Xã Đất Mũi", "Cửa biển Sông Đốc", "Phường Sông Đốc"],
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
    title: "Ghép chuyến thành công",
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
  "Phường Bạc Liêu",
  "Phường Giá Rai",
  "Phường Hiệp Thành",
  "Phường Lý Văn Lâm",
  "Phường Năm Căn",
  "Phường Sông Đốc",
  "Phường Tân Thành",
  "Phường Trần Văn Thời",
  "Phường Vĩnh Trạch",
  "Xã An Trạch",
  "Xã An Xuyên",
  "Xã Biển Bạch",
  "Xã Cái Đôi Vàm",
  "Xã Cái Nước",
  "Xã Châu Thới",
  "Xã Đá Bạc",
  "Xã Đầm Dơi",
  "Xã Đất Mới",
  "Xã Đất Mũi",
  "Xã Định Thành",
  "Xã Đông Hải",
  "Xã Gành Hào",
  "Xã Hòa Bình",
  "Xã Hòa Thành",
  "Xã Hồ Thị Kỷ",
  "Xã Hồng Dân",
  "Xã Hưng Hội",
  "Xã Hưng Mỹ",
  "Xã Khánh An",
  "Xã Khánh Bình",
  "Xã Khánh Hưng",
  "Xã Khánh Lâm",
  "Xã Láng Tròn",
  "Xã Long Điền",
  "Xã Lương Thế Trân",
  "Xã Nguyễn Phích",
  "Xã Nguyễn Việt Khái",
  "Xã Ninh Quới",
  "Xã Ninh Thạnh Lợi",
  "Xã Phan Ngọc Hiển",
  "Xã Phong Hiệp",
  "Xã Phong Thạnh",
  "Xã Phú Mỹ",
  "Xã Phú Tân",
  "Xã Phước Long",
  "Xã Quách Phẩm",
  "Xã Tạ An Khương",
  "Xã Tam Giang",
  "Xã Tân Ân",
  "Xã Tân Hưng",
  "Xã Tân Lộc",
  "Xã Tân Thuận",
  "Xã Tân Tiến",
  "Xã Thanh Tùng",
  "Xã Thới Bình",
  "Xã Trần Phán",
  "Xã Trí Phải",
  "Xã U Minh",
  "Xã Vĩnh Hậu",
  "Xã Vĩnh Lộc",
  "Xã Vĩnh Lợi",
  "Xã Vĩnh Mỹ",
  "Xã Vĩnh Phước",
  "Xã Vĩnh Thanh"
];

const locationCoordinates = {
  "Phường Bạc Liêu": [9.294, 105.724],
  "Phường Giá Rai": [9.227, 105.448],
  "Phường Hiệp Thành": [9.271, 105.762],
  "Phường Lý Văn Lâm": [9.152, 105.141],
  "Phường Năm Căn": [8.745, 104.985],
  "Phường Sông Đốc": [9.052, 104.981],
  "Phường Tân Thành": [9.192, 105.185],
  "Phường Trần Văn Thời": [9.112, 105.025],
  "Phường Vĩnh Trạch": [9.315, 105.748],
  "Xã An Trạch": [9.125, 105.485],
  "Xã An Xuyên": [9.163, 105.145],
  "Xã Biển Bạch": [9.412, 105.215],
  "Xã Cái Đôi Vàm": [8.985, 104.885],
  "Xã Cái Nước": [9.015, 105.025],
  "Xã Châu Thới": [9.312, 105.685],
  "Xã Đá Bạc": [9.185, 104.852],
  "Xã Đầm Dơi": [9.06, 105.21],
  "Xã Đất Mới": [8.785, 105.012],
  "Xã Đất Mũi": [8.612, 104.745],
  "Xã Định Thành": [9.155, 105.342],
  "Xã Đông Hải": [9.085, 105.452],
  "Xã Gành Hào": [9.023, 105.418],
  "Xã Hòa Bình": [9.245, 105.62],
  "Xã Hòa Thành": [9.262, 105.745],
  "Xã Hồ Thị Kỷ": [9.255, 105.185],
  "Xã Hồng Dân": [9.512, 105.442],
  "Xã Hưng Hội": [9.298, 105.765],
  "Xã Hưng Mỹ": [9.085, 105.075],
  "Xã Khánh An": [9.255, 104.985],
  "Xã Khánh Bình": [9.175, 105.045],
  "Xã Khánh Hưng": [9.125, 104.945],
  "Xã Khánh Lâm": [9.315, 104.912],
  "Xã Láng Tròn": [9.208, 105.482],
  "Xã Long Điền": [9.112, 105.395],
  "Xã Lương Thế Trân": [9.115, 105.112],
  "Xã Nguyễn Phích": [9.312, 105.025],
  "Xã Nguyễn Việt Khái": [8.795, 104.815],
  "Xã Ninh Quới": [9.458, 105.421],
  "Xã Ninh Thạnh Lợi": [9.489, 105.372],
  "Xã Phan Ngọc Hiển": [8.655, 104.812],
  "Xã Phong Hiệp": [9.335, 105.502],
  "Xã Phong Thạnh": [9.242, 105.415],
  "Xã Phú Mỹ": [8.915, 104.965],
  "Xã Phú Tân": [8.945, 104.925],
  "Xã Phước Long": [9.382, 105.518],
  "Xã Quách Phẩm": [8.985, 105.185],
  "Xã Tạ An Khương": [9.025, 105.245],
  "Xã Tam Giang": [8.712, 105.085],
  "Xã Tân Ân": [8.685, 104.955],
  "Xã Tân Hưng": [8.985, 105.045],
  "Xã Tân Lộc": [9.285, 105.212],
  "Xã Tân Thuận": [9.045, 105.365],
  "Xã Tân Tiến": [8.965, 105.312],
  "Xã Thanh Tùng": [8.925, 105.215],
  "Xã Thới Bình": [9.342, 105.145],
  "Xã Trần Phán": [9.012, 105.165],
  "Xã Trí Phải": [9.385, 105.172],
  "Xã U Minh": [9.352, 104.955],
  "Xã Vĩnh Hậu": [9.215, 105.682],
  "Xã Vĩnh Lộc": [9.528, 105.412],
  "Xã Vĩnh Lợi": [9.283, 105.881],
  "Xã Vĩnh Mỹ": [9.185, 105.595],
  "Xã Vĩnh Phước": [9.295, 105.715],
  "Xã Vĩnh Thanh": [9.321, 105.565]
};

const produceGroupedOptions = [
  {
    label: "🌾 Lúa",
    options: [
      { label: "Lúa ST25", value: "Lúa ST25 Bạc Liêu" },
      { label: "Lúa Một Bụi Đỏ", value: "Lúa Một Bụi Đỏ" },
      { label: "Lúa Đài Thơm 8", value: "Lúa Đài Thơm 8" },
      { label: "Lúa OM18", value: "Lúa OM18" },
      { label: "Lúa Hương Lài", value: "Lúa Hương Lài" },
    ]
  },
  {
    label: "🍊 Trái cây",
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
    label: "🦐 Hải sản",
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
        className="w-full bg-transparent outline-none font-semibold text-[#1e4638]"
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
        <option value="CUSTOM_INPUT" className="font-bold text-[#ea8156]">Khác (Nhập tay...)</option>
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
        className="flex-1 bg-transparent outline-none font-semibold text-[#1e4638] placeholder:font-normal placeholder:text-[#8ba095]"
      />
      <button onClick={() => { setMode('select'); onChange(options ? options[0] : grouped[0].options[0].value); }} className="text-[#ea8156] p-1 bg-[#fff3ed] rounded-md transition active:scale-95">
        <X size={14} />
      </button>
    </div>
  );
}

function locationPoint(location) {
  return locationCoordinates[location] || locationCoordinates["Xã Ninh Quới"] || [9.458, 105.421];
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
    name: "Kênh Quản Lộ (Xã Ninh Quới - Xã Phước Long)",
    shortName: "Quản Lộ - Phụng Hiệp",
    route: "Xã Ninh Quới ↔ Xã Ninh Thạnh Lợi ↔ Xã Phước Long",
    origin: "Xã Ninh Quới",
    destination: "Xã Phước Long",
    lat: 9.458,
    lon: 105.421,
    distance: "18.5 km",
    duration: "1h 15m",
    tide: "Nước lớn (+1.2m)",
    tideStatus: "Thuận dòng",
    clearance: "Tĩnh không 4.5m",
    traffic: "Ghe tải đến 30 tấn lưu thông tốt",
    salinity: "0.4‰ (Nước ngọt)",
    highlights: "Vựa lúa ST25 & Nông sản sinh thái",
    stops: ["Xã Ninh Quới", "Xã Ninh Thạnh Lợi", "Xã Phước Long"],
  },
  {
    id: "ca-mau-bac-lieu",
    name: "Sông Cà Mau - Bạc Liêu",
    shortName: "Sông Cà Mau - Bạc Liêu",
    route: "Phường Giá Rai ↔ Xã Hòa Bình ↔ Phường Bạc Liêu",
    origin: "Phường Giá Rai",
    destination: "Phường Bạc Liêu",
    lat: 9.227,
    lon: 105.448,
    distance: "28.0 km",
    duration: "2h 00m",
    tide: "Nước ròng nhẹ (-0.3m)",
    tideStatus: "Bình thường",
    clearance: "Tĩnh không 5.2m",
    traffic: "Tuyến giao thương thủy huyết mạch",
    salinity: "4.2‰",
    highlights: "Chợ đầu mối thủy hải sản Giá Rai",
    stops: ["Phường Giá Rai", "Xã Phong Thạnh", "Xã Hòa Bình", "Phường Bạc Liêu"],
  },
  {
    id: "ganh-hao",
    name: "Sông & Cửa biển Gành Hào",
    shortName: "Sông Gành Hào",
    route: "Phường Bạc Liêu ↔ Xã Đầm Dơi ↔ Xã Đông Hải ↔ Xã Gành Hào",
    origin: "Phường Bạc Liêu",
    destination: "Xã Gành Hào",
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
    stops: ["Phường Bạc Liêu", "Xã Đầm Dơi", "Xã Đông Hải", "Xã Gành Hào"],
  },
  {
    id: "bay-hap",
    name: "Sông Bảy Háp & Sông Cửa Lớn",
    shortName: "Sông Bảy Háp - Năm Căn",
    route: "Xã Cái Nước ↔ Phường Năm Căn ↔ Xã Đất Mũi",
    origin: "Phường Năm Căn",
    destination: "Xã Đất Mũi",
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
    stops: ["Xã Cái Nước", "Xã Phú Tân", "Phường Năm Căn", "Xã Đất Mũi"],
  },
  {
    id: "song-trem",
    name: "Sông Trẹm & Kênh U Minh",
    shortName: "Sông Trẹm - U Minh",
    route: "Xã Thới Bình ↔ Xã U Minh",
    origin: "Xã Thới Bình",
    destination: "Xã U Minh",
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
    stops: ["Xã Thới Bình", "Xã Biển Bạch", "Xã Trí Phải", "Xã U Minh"],
  },
  {
    id: "song-doc",
    name: "Cửa biển Sông Đốc",
    shortName: "Cửa biển Sông Đốc",
    route: "Phường Trần Văn Thời ↔ Phường Sông Đốc",
    origin: "Phường Trần Văn Thời",
    destination: "Phường Sông Đốc",
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
    stops: ["Phường Trần Văn Thời", "Xã Khánh Hưng", "Xã Phong Hiệp", "Phường Sông Đốc"],
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
    route: "Phường Năm Căn → Phường Bạc Liêu",
    origin: "Phường Năm Căn",
    destination: "Phường Bạc Liêu",
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
    route: "Xã Ninh Quới → Xã Phước Long",
    origin: "Xã Ninh Quới",
    destination: "Xã Phước Long",
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
    standard: "Tôm sú rừng ngập mặn · Tự nhiên 100%",
    amount: "300 kg",
    packaging: "Thùng xốp giữ lạnh 4°C",
    route: "Xã Đất Mũi → Phường Sông Đốc",
    origin: "Xã Đất Mũi",
    destination: "Phường Sông Đốc",
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
    standard: "Đặc sản truyền thống · Ủ tự nhiên",
    amount: "400 kg",
    packaging: "Can nhựa niêm phong",
    route: "Xã Đất Mũi → Phường Bạc Liêu",
    origin: "Xã Đất Mũi",
    destination: "Phường Bạc Liêu",
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
    standard: "Trái cây miệt vườn · Vườn tuyển chọn",
    amount: "2 tấn",
    packaging: "Sọt nhựa lót mút xốp",
    route: "Xã Thới Bình → Phường Giá Rai",
    origin: "Xã Thới Bình",
    destination: "Phường Giá Rai",
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
    route: "Xã Ninh Quới → Xã Phước Long",
    fee: "50.000đ/chuyến",
    captain: "Anh Thành",
    phone: "0918 111 222",
  },
  {
    name: "Vỏ Minh Anh",
    type: "Vỏ",
    capacity: "500 kg",
    route: "Xã Hồng Dân → Xã Vĩnh Lợi",
    fee: "10.000đ/chuyến",
    captain: "Anh Minh",
    phone: "0919 333 444",
  },
  {
    name: "Xà lan Phúc Lộc",
    type: "Xà lan",
    capacity: "20 tấn",
    route: "Xã Phong Thạnh → Xã Gành Hào",
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [activeTab, role]);
  const [origin, setOrigin] = useState("Xã Ninh Quới");
  const [destination, setDestination] = useState("Xã Phước Long");
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
    const originLoc = details.origin || origin || "Xã Ninh Quới";
    const destinationLoc =
      details.destination || destination || "Xã Phước Long";
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
              className="mr-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#2c7d55] shadow-sm transition hover:bg-gray-100 active:scale-95 border border-[#e0ebe0]"
              aria-label="Quay lại"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex h-10 w-10 overflow-hidden items-center justify-center rounded-[13px] shadow-lg shadow-[#2c7d55]/20">
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
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#ea8156]" />
              )}
            </button>
            {/* Đã xóa nút đăng xuất khỏi header theo yêu cầu */}
            <div className="hidden items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3 text-xs font-semibold shadow-sm sm:flex">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#dcebd3] text-[#367e5b]">
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
        <main className="px-3.5 pt-1 pb-24 sm:px-5 sm:pt-2 sm:pb-28 md:px-10">
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
                className={`flex flex-col items-center justify-center pt-1.5 pb-1 transition-all ${isActive ? "text-[#2c7d55]" : "text-[#8ba095] hover:text-[#4d6b5c]"}`}
              >
                <div className="relative mb-1 transition-transform duration-200 active:scale-95">
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] whitespace-nowrap transition-all ${isActive ? "font-bold" : "font-medium"}`}>
                  <span className="sm:hidden">{mobileLabel}</span>
                  <span className="hidden sm:inline">{label}</span>
                </span>
              </button>
            );
          })}
        </nav>
        {toast && (
          <div className="fixed bottom-24 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#1e4638] px-4 py-3 text-xs font-semibold text-white shadow-xl md:bottom-10">
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
      <rect width="48" height="48" rx="14" fill="currentColor" />
      <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="#ffffff" fontWeight="800" fontSize="22" fontFamily="Arial, sans-serif" letterSpacing="-0.5">Zalo</text>
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
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#0068FF]/15 to-[#2c7d55]/15 ring-4 ring-[#0068FF]/10">
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
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [regFullName, setRegFullName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regRole, setRegRole] = useState("farmer"); // "farmer" | "boatOwner" | "trader"
  const [regPassword, setRegPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [kycUploaded, setKycUploaded] = useState(false);

  // OTP state for registration
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);

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
    if (!regPhone.trim() || regPhone.length < 9) {
      showToast("Vui lòng nhập số điện thoại hợp lệ (từ 9 - 11 chữ số)");
      return;
    }
    setOtpSent(true);
    setOtpTimer(60);
    showToast("Mã OTP đã được gửi đến " + regPhone + " (Mã demo: 123456)");
  };

  const handleFillDemoOtp = () => {
    setOtp("123456");
    showToast("Đã tự động điền mã OTP: 123456");
  };

  const handleLoginSubmit = () => {
    if (!phone.trim() || phone.length < 9) {
      showToast("Vui lòng nhập số điện thoại hợp lệ");
      return;
    }
    if (!loginPassword || loginPassword.length < 6) {
      showToast("Vui lòng nhập mật khẩu hợp lệ (Tối thiểu 6 ký tự)");
      return;
    }
    localStorage.setItem("hanhTrinhXanh.authenticated", "true");
    localStorage.setItem("hanhTrinhXanh.phone", phone);
    localStorage.setItem("hanhTrinhXanh.name", "Khách hàng");
    localStorage.setItem("hanhTrinhXanh.role", "farmer");
    localStorage.setItem("hanhTrinhXanh.authMethod", "password");
    showToast("Đăng nhập thành công!");
    setTimeout(() => {
      onAuthenticated("farmer", "Khách hàng");
    }, 250);
  };

  const handleRegisterSubmit = () => {
    if (!regFullName.trim() || !regPhone.trim() || !regPassword) {
      showToast("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (!agreeTerms) {
      showToast("Vui lòng đồng ý với Điều khoản dịch vụ");
      return;
    }
    if (!otpSent) {
      handleSendOtp();
      return;
    }
    if (!otp || otp.length < 6) {
      showToast("Vui lòng nhập đủ 6 chữ số mã OTP (Mã demo: 123456)");
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
      <main className="w-full max-w-lg rounded-[32px] border border-[#dfeade] bg-white p-6 shadow-2xl shadow-[#2c7d55]/12 sm:p-8 animate-rise">
        {/* Logo & Brand Header */}
        <div className="mb-6 flex items-center justify-between border-b border-[#eef4ec] pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 overflow-hidden items-center justify-center rounded-2xl shadow-lg shadow-[#2c7d55]/25 bg-white">
              <img src={appLogo} alt="Hành Trình Xanh Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="display-font text-xl font-bold tracking-tight text-[#1e4638]">
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
        <div className="mb-8 flex border-b-2 border-[#eef4ec]">
          <button
            type="button"
            onClick={() => setAuthMode("login")}
            className={`flex-1 pb-3.5 text-sm font-bold transition-all ${
              authMode === "login"
                ? "border-b-2 border-[#2c7d55] text-[#1e4638]"
                : "text-[#8ba095] hover:text-[#4d6b5c]"
            }`}
            style={{ marginBottom: "-2px" }}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => setAuthMode("register")}
            className={`flex-1 pb-3.5 text-sm font-bold transition-all ${
              authMode === "register"
                ? "border-b-2 border-[#2c7d55] text-[#1e4638]"
                : "text-[#8ba095] hover:text-[#4d6b5c]"
            }`}
            style={{ marginBottom: "-2px" }}
          >
            Tạo tài khoản
          </button>
        </div>

        {/* ================= MODE: ĐĂNG NHẬP ================= */}
        {authMode === "login" && (
          <div className="animate-fade-in space-y-5">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[.18em] text-[#8ba095]">
                Xác thực danh tính
              </p>
              <h1 className="display-font text-2xl font-bold text-[#1e4638] sm:text-3xl">
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
                     +84
                  </span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-2xl border border-[#dce8dc] bg-[#fbfdfa] py-3.5 pl-16 pr-4 text-sm font-semibold text-[#1e4638] outline-none transition focus:border-[#2c7d55] focus:bg-white focus:ring-4 focus:ring-[#2c7d55]/10"
                    placeholder="09xx xxx xxx"
                    inputMode="tel"
                  />
                </div>
              </label>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-[#4d6b5c]">
                Mật khẩu
                <div className="relative mt-2 flex items-center">
                  <LockKeyhole size={17} className="absolute left-3.5 text-[#8ba095]" />
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full rounded-2xl border border-[#dce8dc] bg-[#fbfdfa] py-3.5 pl-10 pr-12 text-sm font-semibold text-[#1e4638] outline-none transition focus:border-[#2c7d55] focus:bg-white focus:ring-4 focus:ring-[#2c7d55]/10"
                    placeholder="Nhập mật khẩu..."
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3.5 text-[#8ba095] hover:text-[#2c7d55] transition"
                  >
                    {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>
            </div>

            {/* Submit Phone Button */}
            <button
              type="button"
              disabled={!phone || !loginPassword}
              onClick={handleLoginSubmit}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#2c7d55] to-[#3b9f6e] hover:from-[#236b47] hover:to-[#2c7d55] active:scale-[0.98] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#2c7d55]/30 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
            >
              <LogIn size={18} /> Đăng nhập
            </button>

            {/* Divider */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="w-full border-t border-[#e6eee4]"></div>
              <span className="absolute bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-[#98aba0]">
                Hoặc
              </span>
            </div>

            {/* Zalo Login Button */}
            <button
              type="button"
              onClick={() => setZaloModalOpen(true)}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white border border-[#0068FF]/30 hover:border-[#0068FF] hover:bg-[#f0f6ff] active:scale-[0.98] py-3.5 text-sm font-bold text-[#0068FF] shadow-sm hover:shadow-md hover:shadow-[#0068FF]/10 transition-all duration-300"
            >
              <ZaloIcon className="h-5 w-5 text-[#0068FF]" />
              <span>Đăng nhập bằng Zalo</span>
            </button>
          </div>
        )}

        {/* ================= MODE: TẠO TÀI KHOẢN MỚI (REGISTER) ================= */}
        {authMode === "register" && (
          <div className="animate-fade-in space-y-4">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[.18em] text-[#8ba095]">
                Dành cho thành viên mới
              </p>
              <h1 className="display-font text-2xl font-bold text-[#1e4638] sm:text-3xl">
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
                    className="w-full rounded-2xl border border-[#dce8dc] bg-[#fbfdfa] py-3 pl-10 pr-4 text-sm font-semibold text-[#1e4638] outline-none transition focus:border-[#2c7d55] focus:bg-white focus:ring-4 focus:ring-[#2c7d55]/10"
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
                    className="w-full rounded-2xl border border-[#dce8dc] bg-[#fbfdfa] py-3 pl-10 pr-4 text-sm font-semibold text-[#1e4638] outline-none transition focus:border-[#2c7d55] focus:bg-white focus:ring-4 focus:ring-[#2c7d55]/10"
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
                      ? "border-[#2c7d55] bg-[#edf6e9] text-[#1f5c40] ring-2 ring-[#2c7d55]/20"
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
                      ? "border-[#2c7d55] bg-[#edf6e9] text-[#1f5c40] ring-2 ring-[#2c7d55]/20"
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
                      ? "border-[#2c7d55] bg-[#edf6e9] text-[#1f5c40] ring-2 ring-[#2c7d55]/20"
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
                    className="w-full rounded-2xl border border-[#dce8dc] bg-[#fbfdfa] py-3 pl-10 pr-11 text-sm font-semibold text-[#1e4638] outline-none transition focus:border-[#2c7d55] focus:bg-white focus:ring-4 focus:ring-[#2c7d55]/10"
                    placeholder="Tối thiểu 6 ký tự hoặc số"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-[#8ba095] hover:text-[#1e4638]"
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
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#2c7d55] px-2 py-0.5 text-[10px] font-bold text-white">
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
                    ? "border border-[#2c7d55] bg-white text-[#2c7d55]"
                    : "border border-dashed border-[#9fc898] bg-white text-[#367e5b] hover:bg-[#eef6ec]"
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
                className="mt-0.5 h-4 w-4 rounded border-[#9fc898] text-[#2c7d55] focus:ring-[#2c7d55]"
              />
              <span className="leading-5">
                Tôi đồng ý với <strong>Điều khoản dịch vụ</strong> và <strong>Quy chế bảo vệ môi trường đường thủy</strong> của Hành Trình Xanh.
              </span>
            </label>

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
                    className="flex items-center gap-1 text-[11px] font-bold text-[#ea8156] hover:underline"
                  >
                     Điền nhanh 123456
                  </button>
                </div>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="mt-2 w-full rounded-xl border border-[#c3dec0] bg-white py-3 text-center text-lg font-bold tracking-[.35em] text-[#1e4638] outline-none focus:border-[#2c7d55] focus:ring-4 focus:ring-[#2c7d55]/10"
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

            {/* Submit Register Button */}
            <button
              type="button"
              disabled={!regFullName || !regPhone || !regPassword || (otpSent && !otp)}
              onClick={handleRegisterSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2c7d55] hover:bg-[#256c4c] active:scale-[0.98] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#2c7d55]/25 transition-all disabled:cursor-not-allowed disabled:opacity-50"
            >
              {otpSent ? (
                <>
                  <ShieldCheck size={18} /> Xác nhận OTP & Đăng ký
                </>
              ) : (
                <>
                  Nhận mã OTP <ArrowRight size={16} />
                </>
              )}
            </button>

            {/* Footer switcher */}
            <p className="text-center text-xs text-[#71877b]">
              Đã có tài khoản?{" "}
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className="font-bold text-[#2c7d55] hover:underline"
              >
                Đăng nhập tại đây
              </button>
            </p>
          </div>
        )}
      </main>

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#1e4638] px-5 py-3 text-xs font-semibold text-white shadow-2xl animate-rise">
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
        <h2 className="display-font text-xl font-bold tracking-tight text-[#1e4638]">
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
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#2c7d55]/10 text-[#2c7d55]">
            <Compass size={17} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#1e4638] sm:text-sm">
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
                    ? "bg-[#2c7d55] text-white shadow-sm shadow-[#2c7d55]/25 font-bold"
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
        <div className="absolute left-3 top-3 z-10 flex max-w-[85%] items-center gap-2 rounded-xl bg-white/95 px-3 py-2 text-xs font-bold text-[#1e4638] shadow-md backdrop-blur border border-[#e0ebe0]">
          <span className="flex h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-[#ea8156]" />
          <span className="truncate">
            Đang trỏ: <strong className="text-[#2c7d55]">{displayLocation}</strong>
          </span>
        </div>

        {/* Action button */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5">
          <button
            type="button"
            onClick={onRouteDetail}
            className="flex items-center gap-1.5 rounded-xl bg-[#1e4638]/95 hover:bg-[#1e4638] px-3.5 py-2 text-[11px] font-bold text-white shadow-lg backdrop-blur transition active:scale-95"
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
            <p className="mt-0.5 font-bold text-[#1e4638] truncate">{currentSegment.name}</p>
          </div>
          <div className="rounded-xl border border-[#e2ede0] bg-white p-2.5">
            <p className="text-[10px] text-[#71877b]">Cự ly thủy ước tính</p>
            <p className="mt-0.5 font-bold text-[#2c7d55]">{currentSegment.distance} (~{currentSegment.duration})</p>
          </div>
          <div className="rounded-xl border border-[#e2ede0] bg-white p-2.5">
            <p className="text-[10px] text-[#71877b]">Khả năng lưu thông</p>
            <p className="mt-0.5 font-bold text-[#28704d] truncate">{currentSegment.traffic}</p>
          </div>
          <div className="rounded-xl border border-[#e2ede0] bg-white p-2.5">
            <p className="text-[10px] text-[#71877b]">Độ mặn cảm biến</p>
            <p className="mt-0.5 font-bold text-[#ea8156]">{currentSegment.salinity}</p>
          </div>
        </div>

        {/* Quick Assign Buttons */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-[#e8f2e6]">
          <div className="text-[11px] text-[#71877b]">
            <p>
              Tuyến sông: <strong className="text-[#1e4638]">{currentSegment.route}</strong>
            </p>
            {origin && destination && (
              <p className="text-[10px] text-[#2c7d55] font-semibold mt-0.5">
                Chuyến đang chọn: {origin} → {destination}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSetAsOrigin}
              className="rounded-xl border border-[#2c7d55] bg-white px-3 py-1.5 text-[11px] font-bold text-[#2c7d55] hover:bg-[#edf6e9] transition active:scale-95"
            >
              � Gán làm Điểm Đi
            </button>
            <button
              type="button"
              onClick={handleSetAsDestination}
              className="rounded-xl bg-[#2c7d55] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#256a4b] transition active:scale-95"
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
        <div className="border-b border-[#eef5ec] bg-gradient-to-r from-[#2c7d55] to-[#1f5c40] p-5 text-white">
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
            <div className="rounded-xl border border-[#dce8dc] bg-white p-1.5 text-xs focus-within:border-[#2c7d55]">
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
              <div className="rounded-xl border border-[#dce8dc] bg-white p-1.5 text-xs focus-within:border-[#2c7d55]">
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
              <div className="rounded-xl border border-[#dce8dc] bg-white p-1.5 text-xs focus-within:border-[#2c7d55]">
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
                className="w-full rounded-xl border border-[#dce8dc] bg-white p-2 text-xs font-semibold text-[#1e4638] outline-none focus:border-[#2c7d55]"
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
              Tìm thấy <strong className="text-[#2c7d55]">{filteredCargos.length}</strong> yêu cầu phù hợp
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
                className="text-[11px] font-bold text-[#ea8156] hover:underline"
              >
                Đặt lại bộ lọc
              </button>
            )}
          </div>

          {filteredCargos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#cfe0cc] bg-[#fbfdfa] p-8 text-center">
              <Boxes size={36} className="mx-auto text-[#8ba095]" />
              <p className="mt-2 text-sm font-bold text-[#1e4638]">Không tìm thấy yêu cầu phù hợp</p>
              <p className="mt-1 text-xs text-[#71877b]">
                Vui lòng thử nới lỏng bộ lọc hoặc chọn khu vực lân cận trên bản đồ sông Cà Mau - Bạc Liêu.
              </p>
            </div>
          ) : (
            filteredCargos.map((cargo) => (
              <div
                key={cargo.id}
                className="rounded-2xl border border-[#e0ebe0] bg-white p-4 shadow-sm transition hover:border-[#2c7d55] hover:shadow-md"
              >
                <div className="flex items-start gap-3.5">
                  <ProduceIcon type={cargo.type} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-sm text-[#1e4638] truncate">{cargo.name}</h4>
                      <span className="shrink-0 rounded-full bg-[#edf6e9] px-2 py-0.5 text-[10px] font-bold text-[#28704d]">
                        Khớp AI {cargo.matchRate}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#4d705d] font-semibold mt-0.5">
                      {cargo.subName} · <span className="text-[#8ba095]">{cargo.standard}</span>
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-[#71877b]">
                      <span className="flex items-center gap-1 rounded-md bg-[#f1f6ef] px-2 py-1 font-semibold text-[#1e4638]">
                        <Navigation2 size={12} className="text-[#2c7d55]" /> {cargo.route}
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
                        Gửi bởi: <strong className="text-[#1e4638]">{cargo.sender}</strong>
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleApplyToBooking(cargo)}
                          className="flex items-center gap-1 rounded-xl bg-[#2c7d55] hover:bg-[#256a4b] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition active:scale-95"
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






function ModalShell({ children, onClose }) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1e4638]/45 p-3.5 backdrop-blur-sm animate-fade-in sm:p-5"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-2xl sm:rounded-[24px] sm:p-5 max-h-[90vh] overflow-hidden flex flex-col animate-slide-down">
        {children}
      </div>
    </div>
  );
}


function CO2HistoryModal({ onClose }) {
  const monthlyData = [
    { month: "Tháng 4", co2: 5.4, voyages: 12, cargo: "180 Tấn", bar: "45%" },
    { month: "Tháng 5", co2: 6.8, voyages: 16, cargo: "240 Tấn", bar: "55%" },
    { month: "Tháng 6", co2: 7.9, voyages: 19, cargo: "310 Tấn", bar: "68%" },
    { month: "Tháng 7", co2: 8.5, voyages: 22, cargo: "390 Tấn", bar: "76%" },
    { month: "Tháng 8", co2: 9.2, voyages: 25, cargo: "460 Tấn", bar: "88%" },
    { month: "Tháng 9 (Hiện tại)", co2: 7.4, voyages: 18, cargo: "350 Tấn", bar: "70%", current: true },
  ];

  const recentGreenTrips = [
    { 
      route: "Xã Ninh Quới → Phường Bạc Liêu", 
      vehicle: "Sà lan SL-94 (250 Tấn)", 
      cargo: "Lúa sạch & Nông sản gom", 
      reduction: "-18.2 Tấn CO2e",
      equivalent: "Bằng 42 xe tải 5 tấn",
      date: "08/09/2026"
    },
    { 
      route: "Xã Đầm Dơi → Phường Sông Đốc", 
      vehicle: "Sà lan lạnh HTX (35 Tấn)", 
      cargo: "Tôm sú & Cua Năm Căn", 
      reduction: "-4.6 Tấn CO2e",
      equivalent: "Bằng 12 xe tải lạnh",
      date: "05/09/2026"
    },
    { 
      route: "Xã Phong Hiệp → Phường Giá Rai", 
      vehicle: "Ghe bầu GB-68 (45 Tấn)", 
      cargo: "Cam sành, Bưởi & Xoài", 
      reduction: "-5.1 Tấn CO2e",
      equivalent: "Bằng 9 xe tải nhỏ",
      date: "02/09/2026"
    },
  ];

  return (
    <ModalShell onClose={onClose}>
      <div className="mb-4 flex items-start justify-between border-b border-[#e5eee7] pb-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eaf5ed] text-[#246947] shadow-inner">
            <Leaf size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="display-font text-lg font-bold text-[#1e4638]">Nhật ký Giảm phát thải CO2</h3>
              <span className="rounded-full bg-[#edf6eb] px-2 py-0.5 text-[10px] font-bold text-[#2c7d55]">
                MRV Nội Bộ HTX
              </span>
            </div>
            <p className="text-xs text-[#627e70] mt-0.5">Theo dõi lịch sử biến động khí thải & tín chỉ carbon</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full bg-[#f2f7f1] p-2 text-[#466557] hover:bg-[#e4eee3] transition"
        >
          <X size={18} />
        </button>
      </div>

      <div className="overflow-y-auto pr-1 space-y-3.5 scrollbar-thin flex-1 max-h-[75vh]">
        {/* Tổng quan chỉ số giảm phát thải */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#d5ead9] bg-gradient-to-br from-[#f2f8f3] to-[#e6f4ea] p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#638072]">Tổng CO2 Đã Giảm</p>
            <p className="mt-1 text-2xl font-bold text-[#1e4638]">45.2 <span className="text-xs font-normal">Tấn</span></p>
            <p className="text-[10px] text-[#2c7d55] mt-1 font-semibold">↑ +14.2% so với quý trước</p>
          </div>
          <div className="rounded-2xl border border-[#d5ead9] bg-gradient-to-br from-[#f2f8f3] to-[#e6f4ea] p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#638072]">Tín chỉ Carbon ước tính</p>
            <p className="mt-1 text-2xl font-bold text-[#2c7d55]">45.2 <span className="text-xs font-normal">Credits</span></p>
            <p className="text-[10px] text-[#557264] mt-1">Đủ điều kiện ghi nhận MRV</p>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-2xl border border-[#d5ead9] bg-gradient-to-br from-[#f2f8f3] to-[#e6f4ea] p-3.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#638072]">Hiệu quả so với xe tải</p>
            <p className="mt-1 text-2xl font-bold text-[#d87442]">-68.4%</p>
            <p className="text-[10px] text-[#557264] mt-1">Tiết kiệm 8.200 lít dầu DO</p>
          </div>
        </div>

        {/* Biểu đồ thanh biến động CO2 qua các tháng */}
        <div className="rounded-2xl border border-[#e2ece3] bg-white p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1e4638] flex items-center gap-1.5">
              <TrendingUp size={15} className="text-[#2c7d55]" />
              Biến động giảm phát thải 6 tháng gần nhất (2026)
            </h4>
            <span className="text-[11px] text-[#698577]">Đơn vị: Tấn CO2e</span>
          </div>

          <div className="space-y-2.5 pt-1">
            {monthlyData.map((d, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className={`font-medium ${d.current ? "font-bold text-[#1e4638]" : "text-[#557264]"}`}>
                    {d.month} {d.current && "★"}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#7a9588]">({d.voyages} chuyến · {d.cargo})</span>
                    <span className="font-bold text-[#2c7d55]">{d.co2} Tấn</span>
                  </div>
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#edf4ee] overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${d.current ? "bg-[#2c7d55]" : "bg-[#65b38d]"}`}
                    style={{ width: d.bar }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lịch sử các chuyến vận chuyển xanh gần nhất */}
        <div className="rounded-2xl border border-[#e2ece3] bg-white p-4 shadow-xs space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1e4638] flex items-center gap-1.5">
            <Ship size={15} className="text-[#2c7d55]" />
            Chuyến gom đường thủy đóng góp giảm phát thải
          </h4>
          <div className="space-y-2">
            {recentGreenTrips.map((trip, idx) => (
              <div key={idx} className="rounded-xl border border-[#edf4ee] bg-[#f9fcf9] p-3 text-xs flex justify-between items-center">
                <div>
                  <p className="font-bold text-[#1e4638]">{trip.route}</p>
                  <p className="text-[11px] text-[#658173] mt-0.5">{trip.vehicle} · {trip.cargo}</p>
                  <p className="text-[10px] text-[#d87442] mt-0.5">{trip.equivalent}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block rounded-md bg-[#eaf5ed] px-2 py-1 font-bold text-[#2c7d55] text-xs">
                    {trip.reduction}
                  </span>
                  <p className="text-[10px] text-[#8aa396] mt-1">{trip.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModalShell>
  );
}


function MemberDetailModal({ member, onClose, onAddToPool, notify }) {
  if (!member) return null;
  return (
    <ModalShell onClose={onClose}>
      <div className="mb-4 flex items-start justify-between border-b border-[#e8f1e9] pb-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf6eb] text-[#2c7d55] font-bold text-lg shadow-inner">
            {member.name.split(" ").slice(-1)[0][0]}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="display-font text-lg font-bold text-[#1e4638]">{member.name}</h3>
              <span className="rounded-full bg-[#edf6eb] px-2 py-0.5 text-[10px] font-bold text-[#2c7d55]">
                {member.zone}
              </span>
            </div>
            <p className="text-xs text-[#6e8579] mt-0.5">{member.address}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full bg-[#f2f7f1] p-2 text-[#466557] hover:bg-[#e4eee3] transition"
        >
          <X size={18} />
        </button>
      </div>

      <div className="overflow-y-auto pr-1 space-y-3.5 scrollbar-thin flex-1 max-h-[75vh]">
        {/* Thống kê chính: Số lượng công canh tác & Sản lượng */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          <div className="rounded-xl border border-[#e2ede4] bg-[#f8fcf8] p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#7e968a]">Quy mô canh tác</p>
            <p className="mt-1 text-base font-bold text-[#1e4638]">{member.cong}</p>
            <p className="text-[10px] text-[#557264] mt-0.5">({member.area})</p>
          </div>
          <div className="rounded-xl border border-[#e2ede4] bg-[#f8fcf8] p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#7e968a]">Sản lượng dự kiến</p>
            <p className="mt-1 text-base font-bold text-[#2c7d55]">{member.expectedYield}</p>
            <p className="text-[10px] text-[#557264] mt-0.5">{member.product}</p>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-xl border border-[#e2ede4] bg-[#f8fcf8] p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#7e968a]">Dự kiến thu hoạch</p>
            <p className="mt-1 text-sm font-bold text-[#d87442]">{member.harvestDate}</p>
            <p className="text-[10px] text-[#557264] mt-0.5">{member.status}</p>
          </div>
        </div>

        {/* Thông tin canh tác chi tiết theo đặc thù khu vực */}
        <div className="rounded-2xl border border-[#e2ede4] bg-white p-4 space-y-2.5 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1e4638] flex items-center gap-1.5">
            <Wheat size={15} className="text-[#2c7d55]" />
            Thông tin canh tác & Phân vùng địa lý
          </h4>
          <div className="space-y-2 text-xs divide-y divide-[#f0f6f1]">
            <div className="flex justify-between py-1.5">
              <span className="text-[#6e8579]">Phân vùng quản lý HTX:</span>
              <span className="font-bold text-[#1e4638] text-right">{member.subZone}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#6e8579]">Mô hình sản xuất:</span>
              <span className="font-bold text-[#2c7d55] text-right">{member.farmingModel}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#6e8579]">Chủng loại mùa vụ:</span>
              <span className="font-bold text-[#1e4638] text-right">{member.product}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#6e8579]">Đặc điểm thổ nhưỡng & nguồn nước:</span>
              <span className="font-medium text-[#1e4638] text-right max-w-[220px]">{member.soilWaterNote}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#6e8579]">Mã số vùng nội bộ:</span>
              <span className="font-bold text-[#2c7d55]">{member.plotCode}</span>
            </div>
          </div>
        </div>

        {/* Nhật ký nông hộ gần nhất */}
        <div className="rounded-2xl border border-[#e2ede4] bg-[#f8fbf8] p-4 space-y-2 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1e4638] flex items-center gap-1.5">
            <CheckCircle size={15} className="text-[#2c7d55]" />
            Nhật ký sinh trưởng thực địa
          </h4>
          <p className="text-xs text-[#526f61] leading-relaxed bg-white p-3 rounded-xl border border-[#e5efe7]">
            "{member.farmingLog}"
          </p>
          <div className="flex items-center justify-between text-[11px] text-[#7a9487] pt-1 px-1">
            <span>Cập nhật: {member.lastUpdate || "Hôm qua 16:30"}</span>
            <span className="font-semibold text-[#2c7d55]">✓ HTX đã thẩm định</span>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <a
            href={`tel:${member.phone}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#2c7d55] bg-white py-2.5 text-xs font-bold text-[#2c7d55] hover:bg-[#edf6eb] transition active:scale-95 text-center"
          >
            <Phone size={14} />
            Gọi: {member.phone}
          </a>
          <button
            onClick={() => {
              if (onAddToPool) onAddToPool(member.id);
              if (notify) notify(`Đã thêm ${member.name} vào danh sách gom đơn!`);
              onClose();
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#2c7d55] py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#236746] transition active:scale-95"
          >
            <Boxes size={14} />
            Gom đơn sà lan
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

function CooperativeDashboard({ 
  notify, activeTab, onContract, setActiveTab,
  origin, setOrigin, destination, setDestination,
  produce, setProduce, weight, setWeight,
  findBoat, matching, matched, createJourney, vehicleInfo
}) {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedZone, setSelectedZone] = useState("Tất cả vùng");
  const [selectedMemberDetail, setSelectedMemberDetail] = useState(null);
  const [showCO2Modal, setShowCO2Modal] = useState(false);
  const [selectedForPooling, setSelectedForPooling] = useState([1, 4, 8]);
  const [showMap, setShowMap] = useState(false);
  const [inventoryModal, setInventoryModal] = useState(null);

  const stats = [
    { label: "Tổng xã viên", value: "245 Hộ", icon: Users, color: "text-[#2c7d55]", bg: "bg-[#edf6eb]", onClick: () => setActiveTab("members") },
    { label: "Lúa & Nông sản đa dạng", value: "1,250 Tấn", icon: Wheat, color: "text-[#d87442]", bg: "bg-[#fef4ee]", onClick: () => setActiveTab("pooling") },
    { label: "CO2 Giảm phát thải (Xem lịch sử)", value: "45.2 Tấn", icon: Leaf, color: "text-[#246947]", bg: "bg-[#e8f3ea]", onClick: () => setShowCO2Modal(true) },
  ];

  const zones = [
    "Tất cả vùng",
    "Tiểu vùng 1: Ngọt hóa chuyên Lúa & Màu",
    "Tiểu vùng 2: Luân canh Tôm - Lúa sinh thái",
    "Tiểu vùng 3: Vườn cây ăn trái & Cá đồng",
    "Tiểu vùng 4: Thủy sản nước mặn / lợ Năm Căn"
  ];

  const members = [
    { 
      id: 1, 
      name: "Nguyễn Văn Sáu (Sáu Thắng)", 
      phone: "0918.245.890", 
      address: "Ấp Ninh Thạnh, Xã Ninh Quới",
      zone: "Tiểu vùng 1",
      subZone: "Vùng ngọt hóa chuyên Lúa & Màu Hồng Dân",
      farmingModel: "Chuyên canh Lúa giống sạch (Đài Thơm 8 & OM18)",
      cong: "25 Công tầm lớn", 
      area: "2.5 ha", 
      product: "Lúa (Đài Thơm 8 & OM18)", 
      category: "Lúa Gạo",
      plotCode: "VT-HTX-NQ-01",
      expectedYield: "18 Tấn", 
      harvestDate: "Trong 3 ngày tới (14/09)",
      status: "Sẵn sàng thu hoạch",
      contractStatus: "Đã ký bao tiêu HTX 100%",
      soilWaterNote: "Vùng ngọt hóa hoàn toàn, độ mặn 0.0‰, phù sa nội đồng dồi dào.",
      farmingLog: "Lúa trổ đều đồng loạt, hạt chắc mẩy vàng ươm, đã rút ráo nước chân ruộng, máy cắt dự kiến vào ngày 14/09.",
      lastUpdate: "Hôm nay 08:30"
    },
    { 
      id: 2, 
      name: "Trần Thị Mai (Tư Hạnh)", 
      phone: "0944.332.118", 
      address: "Ấp Ninh Phước, Xã Ninh Quới",
      zone: "Tiểu vùng 2",
      subZone: "Vùng luân canh Tôm - Lúa sinh thái",
      farmingModel: "Mô hình Tôm càng xanh luân canh Lúa Một Bụi Đỏ",
      cong: "18 Công đất lúa tôm", 
      area: "1.8 ha", 
      product: "Lúa mùa & Tôm càng xanh", 
      category: "Tôm - Lúa",
      plotCode: "VT-HTX-NQ-02",
      expectedYield: "11 Tấn lúa + 1.2 Tấn tôm", 
      harvestDate: "Dự kiến 22/09/2026",
      status: "Thu hoạch trong 1 tuần",
      contractStatus: "Đã ký bao tiêu HTX",
      soilWaterNote: "Đất lúa tôm tự nhiên giàu vi sinh, kiểm soát cống ngăn mặn tốt.",
      farmingLog: "Lúa vào giai đoạn chín đỏ đuôi, tôm càng xanh thu tỉa đạt 15 con/kg bán giá cao.",
      lastUpdate: "Hôm qua 15:45"
    },
    { 
      id: 3, 
      name: "Lê Minh Tâm (Ba Đạt)", 
      phone: "0939.882.374", 
      address: "Ấp Tam Hiệp, Xã Đầm Dơi",
      zone: "Tiểu vùng 4",
      subZone: "Vùng Thủy sản nước mặn Cà Mau",
      farmingModel: "Nuôi tôm sú sinh thái rừng ngập mặn",
      cong: "30 Công đầm", 
      area: "3.0 ha", 
      product: "Tôm sú sinh thái rừng", 
      category: "Thủy Sản",
      plotCode: "VT-HTX-TS-07",
      expectedYield: "2.5 Tấn", 
      harvestDate: "Đang thu hoạch tỉa cống",
      status: "Đang thu hoạch",
      contractStatus: "Liên kết nhà máy thủy sản Cà Mau",
      soilWaterNote: "Nước mặn tự nhiên rừng đước 18‰, sinh cảnh tự nhiên 100%.",
      farmingLog: "Tôm đạt cỡ 20 con/kg, vỏ sáng bóng khỏe mạnh, đóng thùng oxy vận chuyển đường thủy tươi sống.",
      lastUpdate: "Sáng nay 06:15"
    },
    { 
      id: 4, 
      name: "Phạm Văn Bình (Năm Rạng)", 
      phone: "0913.771.552", 
      address: "Ấp Vĩnh Lộc, Xã Vĩnh Lộc",
      zone: "Tiểu vùng 2",
      subZone: "Vùng luân canh Tôm - Lúa sinh thái",
      farmingModel: "Lúa thơm đặc sản xen canh Tôm sú sạch",
      cong: "40 Công tầm lớn", 
      area: "4.0 ha", 
      product: "Lúa & Tôm sú", 
      category: "Tôm - Lúa",
      plotCode: "VT-HTX-NQ-04",
      expectedYield: "26 Tấn lúa + 2 Tấn tôm", 
      harvestDate: "Sẵn sàng thu hoạch ngay",
      status: "Sẵn sàng thu hoạch",
      contractStatus: "Đã ký bao tiêu HTX",
      soilWaterNote: "Mô hình xen canh tôm lúa bền vững, không dùng thuốc bảo vệ thực vật hóa học.",
      farmingLog: "Đã hoàn tất kiểm tra độ ẩm hạt đạt 14.5%, lúa sạch đạt chuẩn xuất khẩu đi Châu Âu.",
      lastUpdate: "Hôm nay 09:10"
    },
    { 
      id: 5, 
      name: "Huỳnh Tuấn Anh (Bảy Trí)", 
      phone: "0907.612.449", 
      address: "Ấp Phong Hiệp, Xã Phong Hiệp",
      zone: "Tiểu vùng 3",
      subZone: "Vườn cây ăn trái Cù Lao ven sông",
      farmingModel: "Chuyên canh Cây ăn trái (Cam sành, Bưởi, Xoài Cát)",
      cong: "18 Công vườn", 
      area: "1.8 ha", 
      product: "Cam sành, Bưởi da xanh & Xoài", 
      category: "Trái Cây",
      plotCode: "VT-HTX-TC-03",
      expectedYield: "14 Tấn", 
      harvestDate: "Thu hoạch đợt 1 (18/09)",
      status: "Sẵn sàng thu hoạch",
      contractStatus: "Đã bao tiêu chuỗi siêu thị",
      soilWaterNote: "Vườn đắp mô cao thoát nước tốt, tưới nước ngọt sông Hậu quanh năm.",
      farmingLog: "Cam sành vỏ bóng mọng nước, xoài cát ngọt đậm, chuẩn bị sọt tre chuyển ghe tải lớn.",
      lastUpdate: "2 ngày trước"
    },
    { 
      id: 6, 
      name: "Lý Kiều Diễm (Út Diễm)", 
      phone: "0949.123.678", 
      address: "Ấp Rạch Gốc, Xã Phan Ngọc Hiển",
      zone: "Tiểu vùng 4",
      subZone: "Thủy sản biển & Cửa sông Năm Căn",
      farmingModel: "Nuôi Cua biển Năm Căn & Ba khía sinh thái",
      cong: "20 Công vuông", 
      area: "2.0 ha", 
      product: "Cua biển Năm Căn & Ba khía", 
      category: "Thủy Sản",
      plotCode: "VT-HTX-TS-09",
      expectedYield: "1.5 Tấn", 
      harvestDate: "Theo con nước rằm (15 âm lịch)",
      status: "Sẵn sàng thu hoạch",
      contractStatus: "Đã ký đơn hàng ghép sà lan lạnh",
      soilWaterNote: "Vùng nước lợ cửa sông tự nhiên, thức ăn tự nhiên từ phù du biển.",
      farmingLog: "Cua chắc thịt đầy gạch son, dây trói mỏng đúng chuẩn uy tín HTX Cà Mau.",
      lastUpdate: "Hôm nay 07:00"
    },
    { 
      id: 7, 
      name: "Nguyễn Tấn Đạt (Tám Đạt)", 
      phone: "0982.556.789", 
      address: "Ấp Tân Lộc, Xã Tân Lộc",
      zone: "Tiểu vùng 3",
      subZone: "Vườn chuyên canh Trái cây & Cá lóc đồng",
      farmingModel: "Mô hình Vườn - Ao (Bưởi, Xoài, Cá lóc đồng)",
      cong: "15 Công", 
      area: "1.5 ha", 
      product: "Bưởi, Xoài & Cá lóc đồng", 
      category: "Trái Cây",
      plotCode: "VT-HTX-TC-08",
      expectedYield: "9 Tấn trái cây + 3 Tấn cá", 
      harvestDate: "Dự kiến 25/09/2026",
      status: "Đang nuôi trái đẹp",
      contractStatus: "Hợp đồng xuất khẩu đường thủy",
      soilWaterNote: "Thổ nhưỡng đất giàu dinh dưỡng phù sa sông rạch.",
      farmingLog: "Đã bao trái chống ruồi vàng đạt 98%, cá lóc mương vườn phát triển tự nhiên.",
      lastUpdate: "3 ngày trước"
    },
    { 
      id: 8, 
      name: "Võ Văn Khang (Chín Khang)", 
      phone: "0938.112.990", 
      address: "Ấp Vĩnh Hậu, Xã Vĩnh Hậu",
      zone: "Tiểu vùng 1",
      subZone: "Vùng chuyên Bắp ngọt & Khoai lang luân canh Lúa",
      farmingModel: "Rau màu & Lúa ngắn ngày (Bắp ngọt, Khoai lang, Lúa)",
      cong: "22 Công màu", 
      area: "2.2 ha", 
      product: "Bắp ngọt, Khoai lang & Lúa", 
      category: "Rau Màu & Lúa",
      plotCode: "VT-HTX-RM-05",
      expectedYield: "20 Tấn", 
      harvestDate: "Thu hoạch trong 4 ngày tới",
      status: "Sẵn sàng thu hoạch",
      contractStatus: "Đã ký bao tiêu chợ đầu mối",
      soilWaterNote: "Đất giồng cát pha sét nhẹ, tơi xốp, tiêu thoát nước nhanh.",
      farmingLog: "Bắp ngọt hạt đều cùi mẩy, khoai lang củ to đều, sẵn sàng tải sà lan vận chuyển đường thủy.",
      lastUpdate: "Sáng nay 08:00"
    }
  ];

  const contracts = [
    { id: "HD-2026-089", buyer: "Công ty Cổ phần Nông sản Lương Thực Tân Phát", product: "Lúa (Đài Thơm 8, OM18, Lúa mùa)", amount: "100 Tấn", price: "8,500 đ/kg", status: "Đang giao hàng" },
    { id: "HD-2026-090", buyer: "Hệ thống Siêu thị Co.op Mart Miền Tây", product: "Trái cây (Cam sành, Bưởi, Xoài)", amount: "25 Tấn", price: "24,000 đ/kg", status: "Đã hoàn tất" },
    { id: "HD-2026-091", buyer: "Công ty Xuất Nhập Khẩu Thủy Sản Cà Mau", product: "Thủy sản (Tôm sú sinh thái, Cua Năm Căn)", amount: "8 Tấn", price: "185,000 đ/kg", status: "Chờ lấy hàng" },
  ];

  const togglePool = (id) => {
    setSelectedForPooling((curr) =>
      curr.includes(id) ? curr.filter((item) => item !== id) : [...curr, id]
    );
  };

  const filteredMembers = members.filter(m => {
    const matchCat = selectedCategory === "Tất cả" || m.category === selectedCategory || (selectedCategory === "Lúa Gạo" && m.category.includes("Lúa"));
    const matchZone = selectedZone === "Tất cả vùng" || m.subZone.includes(selectedZone.split(":")[1]?.trim() || selectedZone);
    return matchCat && matchZone;
  });

  return (
    <div className="animate-rise">
      {/* Banner HTX tinh tế, dịu mắt */}
      <section className="mb-3.5 rounded-2xl bg-gradient-to-br from-[#246947] via-[#2c7d55] to-[#368d60] px-4 py-3.5 text-white shadow-md shadow-[#2c7d55]/15 sm:rounded-[22px] sm:px-6 sm:py-5 sm:mb-5 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold text-[#c7e9b0] flex items-center gap-1.5">
            <Calendar size={13} /> {getFormattedCurrentDateLong()}
          </p>
          <span className="rounded-full bg-white/15 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold text-white tracking-wide">
            Địa bàn quản lý: Bạc Liêu · Cà Mau (4 Tiểu vùng)
          </span>
        </div>
        <h1 className="display-font mt-1.5 text-2xl font-bold sm:text-3xl">
          Bảng điều khiển Hợp tác xã
        </h1>
        <p className="mt-1.5 text-xs leading-5 text-[#dbeade] sm:text-sm">
          Quản lý xã viên theo phân vùng (Lúa, Tôm - Lúa, Trái cây, Màu, Thủy sản) và điều phối gom đơn vận tải thủy xanh.
        </p>
      </section>

      {/* Tab Content: HOME */}
      {activeTab === "home" && (
        <div className="space-y-4 animate-fade-in sm:space-y-5">
          {/* Menu icon nhanh phân loại */}
          <section className="grid grid-cols-4 gap-2 rounded-2xl bg-white p-3 shadow-xs border border-[#e2ece3] sm:p-4">
            {[
              { icon: Ship, label: "Ghe / Xuồng" },
              { icon: Anchor, label: "Sà Lan Tải Lớn" },
              { icon: Boxes, label: "Gom Đơn Lô" },
              { icon: Droplets, label: "Quan Trắc Nước" },
              { icon: Wheat, label: "Lúa & Màu" },
              { icon: Leaf, label: "Trái Cây" },
              { icon: Fish, label: "Tôm & Cua" },
              { icon: LayoutGrid, label: "Tất cả Nông sản" },
            ].map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => setInventoryModal(item.label)} 
                className="flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-[#f2f7f1] transition p-1.5 active:scale-95"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef7ee] text-[#2c7d55] sm:h-10 sm:w-10">
                  <item.icon size={19} strokeWidth={1.75} />
                </div>
                <span className="text-[10px] font-semibold text-[#5c7769] text-center leading-tight">{item.label}</span>
              </button>
            ))}
          </section>

          {/* 3 Thẻ Chỉ số HTX - Bấm vào CO2 xem lịch sử biến động */}
          <SectionTitle eyebrow="Chỉ số hoạt động" title="Thống kê Hợp tác xã" />
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {stats.map((stat, i) => (
              <button 
                key={i} 
                onClick={stat.onClick}
                className="rounded-2xl border border-[#e2ece3] bg-white p-3 text-left shadow-xs transition hover:border-[#2c7d55] hover:shadow-sm active:scale-95 sm:p-4"
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${stat.bg} ${stat.color} mb-2 sm:h-10 sm:w-10`}>
                  <stat.icon size={18} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#7a9386] sm:text-xs">{stat.label}</p>
                <p className="mt-0.5 text-sm font-bold text-[#1e4638] sm:text-base">{stat.value}</p>
                <p className="mt-1 text-[9px] font-semibold text-[#2c7d55] sm:text-[10px]">
                  {i === 2 ? "📊 Xem biến động →" : "Bấm xem chi tiết →"}
                </p>
              </button>
            ))}
          </div>

          {/* Phân vùng quản lý thực tế của HTX */}
          <div className="rounded-2xl border border-[#e2ece3] bg-white p-4 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1e4638] flex items-center gap-1.5">
                <MapPin size={14} className="text-[#2c7d55]" />
                Phân vùng quản lý sản xuất HTX
              </h3>
              <span className="text-[11px] text-[#2c7d55] font-semibold cursor-pointer" onClick={() => setActiveTab("members")}>
                Xem 245 hộ theo vùng →
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-[#edf4ee] bg-[#f9fcf9] p-2.5">
                <p className="font-bold text-[#1e4638]">🌾 Vùng Ngọt Hóa</p>
                <p className="text-[11px] text-[#638072] mt-0.5">Chuyên Lúa (Đài Thơm 8, OM18, Lúa mùa), Bắp, Khoai lang</p>
              </div>
              <div className="rounded-xl border border-[#edf4ee] bg-[#f9fcf9] p-2.5">
                <p className="font-bold text-[#1e4638]">🦐 Vùng Tôm - Lúa</p>
                <p className="text-[11px] text-[#638072] mt-0.5">Luân canh Lúa Một Bụi Đỏ & Tôm càng xanh, Tôm sú</p>
              </div>
              <div className="rounded-xl border border-[#edf4ee] bg-[#f9fcf9] p-2.5">
                <p className="font-bold text-[#1e4638]">🍊 Vùng Cây Ăn Trái</p>
                <p className="text-[11px] text-[#638072] mt-0.5">Cam sành Tam Bình, Bưởi da xanh, Xoài Cát, Cá đồng</p>
              </div>
              <div className="rounded-xl border border-[#edf4ee] bg-[#f9fcf9] p-2.5">
                <p className="font-bold text-[#1e4638]">🦀 Vùng Thủy Sản Cà Mau</p>
                <p className="text-[11px] text-[#638072] mt-0.5">Cua Năm Căn, Tôm sú rừng ngập mặn, Ba khía</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: QUẢN LÝ XÃ VIÊN TRỰC QUAN THEO PHÂN VÙNG */}
      {activeTab === "members" && (
        <div className="space-y-4 animate-fade-in">
           <div className="flex flex-wrap items-center justify-between gap-2">
             <SectionTitle eyebrow="Cơ sở dữ liệu số" title="Danh sách Xã viên theo Khu vực" />
             <button 
               onClick={() => notify("Đang đồng bộ dữ liệu nông hộ từ hệ thống HTX...")}
               className="rounded-xl border border-[#d2e5d5] bg-white px-3 py-1.5 text-xs font-bold text-[#2c7d55] hover:bg-[#f2f8f3] transition shadow-xs flex items-center gap-1"
             >
               <RefreshCw size={13} /> Làm mới dữ liệu
             </button>
           </div>

           {/* Bộ lọc phân loại nông sản & mô hình */}
           <div className="space-y-2">
             <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
               {["Tất cả", "Lúa Gạo", "Tôm - Lúa", "Trái Cây", "Thủy Sản", "Rau Màu & Lúa"].map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setSelectedCategory(cat)}
                   className={`rounded-xl px-3 py-1.5 text-xs font-bold transition shrink-0 ${
                     selectedCategory === cat
                       ? "bg-[#2c7d55] text-white shadow-xs"
                       : "bg-white text-[#577264] border border-[#e2ece3] hover:bg-[#f2f7f1]"
                   }`}
                 >
                   {cat}
                 </button>
               ))}
             </div>
           </div>

           {/* Danh sách thẻ xã viên trực quan */}
           <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
             {filteredMembers.map((m) => (
               <div 
                 key={m.id} 
                 className="rounded-2xl border border-[#e2ece3] bg-white p-4 shadow-xs hover:border-[#2c7d55] transition flex flex-col justify-between space-y-3"
               >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef7ee] text-[#2c7d55] font-bold text-sm">
                          {m.name.split(" ").slice(-1)[0][0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1e4638]">{m.name}</p>
                          <p className="text-[11px] text-[#6e8579] flex items-center gap-1 mt-0.5">
                            <MapPin size={11} className="text-[#2c7d55]" /> {m.address.split(",")[0]}, {m.address.split(",").slice(-1)[0]}
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full bg-[#fef4ee] px-2 py-0.5 text-[10px] font-bold text-[#d87442] whitespace-nowrap">
                        {m.category}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#2c7d55] font-semibold mt-2 bg-[#f4f9f4] px-2.5 py-1 rounded-lg">
                      📍 {m.subZone}
                    </p>

                    <div className="grid grid-cols-2 gap-2 rounded-xl bg-[#f8fcf8] p-2.5 mt-2.5 text-xs border border-[#edf4ee]">
                      <div>
                        <p className="text-[10px] text-[#789385] font-medium">Quy mô canh tác:</p>
                        <p className="font-bold text-[#1e4638] mt-0.5">{m.cong}</p>
                        <p className="text-[10px] text-[#557264]">({m.area})</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#789385] font-medium">Dự kiến thu hoạch:</p>
                        <p className="font-bold text-[#2c7d55] mt-0.5">{m.expectedYield}</p>
                        <p className="text-[10px] text-[#557264] truncate">{m.product}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 border-t border-[#f2f7f2]">
                    <button 
                      onClick={() => setSelectedMemberDetail(m)}
                      className="flex-1 rounded-xl bg-[#2c7d55] py-2 text-xs font-bold text-white shadow-xs hover:bg-[#236746] transition active:scale-95 text-center"
                    >
                      Xem chi tiết quản lý
                    </button>
                    <button
                      onClick={() => {
                        togglePool(m.id);
                        notify(`Đã thêm ${m.name} vào danh sách gom đơn sà lan!`);
                      }}
                      className={`rounded-xl px-2.5 py-2 text-xs font-bold transition border ${
                        selectedForPooling.includes(m.id)
                          ? "bg-[#eef7ee] border-[#2c7d55] text-[#2c7d55]"
                          : "bg-white border-[#d2e5d5] text-[#4d6b5b] hover:bg-[#f2f7f1]"
                      }`}
                      title="Thêm vào gom đơn"
                    >
                      <Boxes size={15} />
                    </button>
                  </div>
               </div>
             ))}
           </div>
        </div>
      )}

      {/* Tab Content: GOM ĐƠN VÀ HỢP ĐỒNG */}
      {activeTab === "pooling" && (
        <div className="space-y-4 animate-fade-in">
           {/* Hợp đồng bao tiêu */}
           <SectionTitle eyebrow="Hợp tác xã" title="Hợp đồng Bao tiêu & Thu mua" />
           <div className="flex flex-col gap-2.5 mb-5">
             {contracts.map(c => (
               <div key={c.id} className="rounded-2xl border border-[#e2ece3] bg-white p-4 shadow-xs">
                 <div className="flex justify-between items-start gap-2 mb-2.5">
                   <div>
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        c.status === 'Đang giao hàng' 
                          ? 'bg-[#fef4ee] text-[#d87442]' 
                          : c.status === 'Đã hoàn tất' 
                          ? 'bg-[#eef7ee] text-[#2c7d55]' 
                          : 'bg-[#f2f6f3] text-[#557264]'
                      }`}>
                        {c.status}
                      </span>
                      <p className="mt-1.5 text-sm font-bold text-[#1e4638]">{c.buyer}</p>
                   </div>
                   <span className="text-xs font-bold text-[#2c7d55] bg-[#f0f7f1] px-2 py-1 rounded-lg">
                     {c.id}
                   </span>
                 </div>
                 <div className="grid grid-cols-2 gap-2 text-xs text-[#5f7b6d] bg-[#f9fcf9] p-3 rounded-xl border border-[#ebf3ec] mb-3">
                   <p>Mặt hàng: <strong className="text-[#1e4638]">{c.product}</strong></p>
                   <p>Cam kết: <strong className="text-[#1e4638]">{c.amount}</strong></p>
                   <p>Đơn giá: <strong className="text-[#2c7d55]">{c.price}</strong></p>
                   <p>Vận chuyển: <strong className="text-[#1e4638]">Đường thủy nội địa</strong></p>
                 </div>
                 <button 
                   onClick={onContract} 
                   className="w-full rounded-xl bg-[#f2f7f1] py-2 text-xs font-bold text-[#2c7d55] hover:bg-[#e4efe2] transition active:scale-95"
                 >
                   Xem hợp đồng & Đối soát sản lượng →
                 </button>
               </div>
             ))}
           </div>

           {/* Gom đơn thành lô lớn */}
           <div className="rounded-2xl border border-[#d2e6d6] bg-gradient-to-br from-[#f5fbf6] to-[#ebf5ed] p-4 text-[#1e4638] shadow-xs">
             <div className="flex items-center gap-2.5 mb-1.5">
               <Boxes size={18} className="text-[#2c7d55]" />
               <h3 className="text-sm font-bold text-[#1e4638]">Khởi tạo lô gom sà lan theo khu vực</h3>
             </div>
             <p className="text-xs text-[#527161] leading-relaxed">
               Chọn các hộ xã viên (Lúa, Tôm - Cua, Trái cây, Màu) đang sẵn sàng thu hoạch để ghép chuyến sà lan trọng tải lớn, tiết kiệm cước vận chuyển và cắt giảm khí thải CO2.
             </p>
           </div>

           {/* Danh sách chọn hộ gom đơn */}
           <div className="space-y-2 mt-2">
             {members.filter(m => m.status === "Sẵn sàng thu hoạch" || m.status === "Đang thu hoạch").map(m => (
                <label 
                  key={m.id} 
                  className={`flex items-center gap-3 rounded-2xl border p-3 cursor-pointer transition ${
                    selectedForPooling.includes(m.id) 
                      ? "border-[#2c7d55] bg-[#f8fcf8] shadow-xs" 
                      : "border-[#e2ece3] bg-white hover:border-[#c5dec9]"
                  }`}
                >
                   <input 
                     type="checkbox" 
                     checked={selectedForPooling.includes(m.id)} 
                     onChange={() => togglePool(m.id)} 
                     className="w-5 h-5 accent-[#2c7d55] rounded"
                   />
                   <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-[#1e4638]">{m.name}</p>
                        <span className="text-xs font-bold text-[#2c7d55]">{m.expectedYield}</span>
                      </div>
                      <p className="text-xs text-[#5e796c] mt-0.5">
                        {m.product} · {m.cong} ({m.zone})
                      </p>
                   </div>
                </label>
             ))}
           </div>
           
           {/* Thẻ Sticky tổng kết gom đơn với màu sắc dịu nhẹ, kính mờ */}
           <div className="sticky bottom-20 rounded-2xl bg-white/95 backdrop-blur-md border border-[#cbe3d0] p-4 text-[#1e4638] shadow-lg mt-5">
              <div className="flex justify-between items-center mb-2">
                 <span className="text-xs font-semibold text-[#5a7668]">Số hộ nông dân đã ghép:</span>
                 <span className="text-sm font-bold text-[#1e4638]">{selectedForPooling.length} Hộ xã viên</span>
              </div>
              <div className="flex justify-between items-center mb-3.5">
                 <span className="text-xs font-semibold text-[#5a7668]">Tổng sản lượng gom ước tính:</span>
                 <span className="text-lg font-bold text-[#2c7d55]">
                   {selectedForPooling.length > 0 
                     ? selectedForPooling.map(id => parseFloat(members.find(m=>m.id===id)?.expectedYield || 0)).reduce((a,b)=>a+b, 0).toFixed(1) 
                     : 0} Tấn
                 </span>
              </div>
              <button 
                 disabled={selectedForPooling.length === 0}
                 onClick={() => {
                   onContract();
                   alert("Đã khởi tạo lô hàng ghép thành công! Chuyển sang giao diện mời thầu sà lan vận tải.");
                 }}
                 className="w-full rounded-xl bg-[#2c7d55] hover:bg-[#236746] py-3 text-xs font-bold text-white shadow-xs transition active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed sm:text-sm"
              >
                 Mời thầu sà lan / ghe tải trọng lớn
              </button>
           </div>
        </div>
      )}

      {/* Tab Content: MÔI TRƯỜNG */}
      {activeTab === "environment" && (
         <div className="space-y-4 animate-fade-in">
           <SectionTitle 
             eyebrow="Đo lường & Cảnh báo" 
             title="Giám sát Môi trường & Độ mặn" 
             action={showMap ? "Thu gọn bản đồ" : "Xem bản đồ sông"}
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
           <div className="grid grid-cols-2 gap-2.5">
             <div className="rounded-2xl border border-[#e2ece3] bg-white p-3.5 shadow-xs text-center">
               <Droplets size={26} className="mx-auto mb-1.5 text-[#2c7d55]" />
               <p className="text-[10px] font-bold text-[#728d7e] uppercase tracking-wider">Độ mặn hiện tại</p>
               <p className="mt-0.5 text-2xl font-bold text-[#1e4638]">0.8‰</p>
               <p className="text-[10px] text-[#2c7d55] mt-0.5 font-semibold">Ngọt hóa an toàn</p>
             </div>
             <div className="rounded-2xl border border-[#e2ece3] bg-white p-3.5 shadow-xs text-center">
               <Thermometer size={26} className="mx-auto mb-1.5 text-[#d87442]" />
               <p className="text-[10px] font-bold text-[#728d7e] uppercase tracking-wider">Độ pH nước</p>
               <p className="mt-0.5 text-2xl font-bold text-[#1e4638]">6.8</p>
               <p className="text-[10px] text-[#2c7d55] mt-0.5 font-semibold">Tối ưu cho lúa & cây trái</p>
             </div>
           </div>
           <div className="rounded-2xl border border-[#e2ece3] bg-white p-4 shadow-xs">
             <div className="flex items-center gap-3 mb-2">
                <Wind size={22} className="text-[#2c7d55]" />
                <div>
                  <p className="text-[10px] font-bold text-[#728d7e] uppercase">Chỉ số không khí (AQI)</p>
                  <p className="text-lg font-bold text-[#1e4638]">38 <span className="text-xs text-[#2c7d55] font-normal">(Rất trong lành)</span></p>
                </div>
             </div>
             <p className="text-xs text-[#527161] leading-relaxed">Thời tiết thuận lợi cho các hoạt động thu hoạch nông sản và vận tải thủy nội địa.</p>
           </div>
           <div className="rounded-2xl border border-[#fedecb] bg-[#fffaf6] p-4 shadow-xs">
             <div className="flex items-center gap-2 mb-1.5">
               <AlertTriangle size={17} className="text-[#d87442]" />
               <p className="text-xs font-bold text-[#d87442]">Dự báo ranh mặn 3 ngày tới</p>
             </div>
             <p className="text-xs text-[#6e8579] leading-relaxed">
               Dự báo triều cường biển Tây và biển Đông ổn định. Các cống ngăn mặn vùng ngọt hóa Cà Mau - Bạc Liêu tiếp tục duy trì cấp nước ngọt an toàn cho các vùng trồng lúa và chuyên canh cây ăn trái, hoa màu.
             </p>
           </div>
         </div>
      )}

      {/* Modal chi tiết Xã viên khi được bấm vào */}
      {selectedMemberDetail && (
        <MemberDetailModal
          member={selectedMemberDetail}
          onClose={() => setSelectedMemberDetail(null)}
          onAddToPool={(id) => togglePool(id)}
          notify={notify}
        />
      )}

      {/* Modal lịch sử biến động CO2 */}
      {showCO2Modal && (
        <CO2HistoryModal
          onClose={() => setShowCO2Modal(false)}
        />
      )}

      {/* Modal kho nông sản */}
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
      <section className="relative mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#246947] via-[#2c7d55] to-[#368d60] px-4 py-4 text-white shadow-md shadow-[#2c7d55]/15 sm:rounded-[22px] sm:px-6 sm:py-6 sm:mb-6 md:px-9 md:py-8">
        <div className="relative z-10 max-w-lg">
          <p className="mb-2 text-sm font-semibold text-[#c5e8ae]">
             {getFormattedCurrentDateLong()}
          </p>
          <h1 className="display-font text-3xl font-bold leading-tight md:text-4xl">
            Chào mừng trở lại,
            <br />
            <span className="text-[#c5e8ae]">kết nối mùa vụ hôm nay?</span>
          </h1>
          <p className="mt-2 max-w-md text-xs leading-5 text-[#dcf4e4] sm:text-sm sm:leading-6 font-medium tracking-wide">
            Nhanh chóng · Tiết kiệm · Xanh hóa dòng sông
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

      <section className="mb-7">
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

      <section className="mb-7">
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
              className="flex items-start gap-3.5 rounded-[20px] border border-[#e0ebe0] bg-white p-4 text-left shadow-sm transition hover:border-[#2c7d55] hover:shadow-md active:scale-[0.99]"
            >
              <ProduceIcon type={cargo.type} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <b className="block text-sm text-[#1e4638] truncate">{cargo.name}</b>
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
                  <span className="font-bold text-[#ea8156] shrink-0">
                    {cargo.amount}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-[#f0f6ee] pt-2 text-[10px] text-[#8ba095]">
                  <span>{cargo.packaging}</span>
                  <span className="font-bold text-[#2c7d55]">{cargo.time}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
      <section className="mb-7">
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
              className="min-w-[240px] rounded-[18px] border border-[#e0ebe0] bg-white p-4 text-left shadow-sm hover:border-[#2c7d55] transition"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold text-[#1e4638]">
                  <Ship size={17} className="text-[#2c7d55]" />
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
              { name: "Kênh Quản Lộ (Xã Ninh Quới - Xã Phước Long)", value: "0.4‰", label: "Nước ngọt an toàn", tone: "safe" },
              { name: "Sông Cà Mau (Phường Bạc Liêu - Phường Lý Văn Lâm)", value: "4.2‰", label: "Xâm nhập mặn nhẹ", tone: "warning" },
              { name: "Tuyến Sông Gành Hào (Phường Bạc Liêu - Xã Gành Hào)", value: "5.5‰", label: "Xâm nhập mặn vừa", tone: "warning" },
              { name: "Cửa biển Gành Hào & Sông Đốc", value: "18.5‰", label: "Nước mặn triều dâng", tone: "danger" },
              { name: "Kênh Tắc Vân (Phường Tân Thành)", value: "2.1‰", label: "Xâm nhập mặn nhẹ", tone: "warning" },
              { name: "Sông Trẹm (Phường Lý Văn Lâm)", value: "1.2‰", label: "Nước ngọt an toàn", tone: "safe" },
              { name: "Kênh xáng (Phường Tân Thành)", value: "0.8‰", label: "Nước ngọt an toàn", tone: "safe" },
              { name: "Sông Ông Đốc (Phường Sông Đốc)", value: "12.4‰", label: "Nước mặn triều dâng", tone: "danger" },
              { name: "Sông Bảy Háp (Phường Năm Căn)", value: "22.0‰", label: "Cảnh báo mặn cao", tone: "danger" },
              { name: "Rạch Rập (Phường Lý Văn Lâm)", value: "3.5‰", label: "Nguy cơ nhiễm mặn", tone: "warning" }
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
          className="rounded-2xl bg-white p-3 text-left shadow-sm border border-[#e0ebe0] hover:border-[#2c7d55] transition"
        >
          <Route className="text-[#367e5b]" size={20} />
          <b className="mt-2 block text-xs">Tối ưu tuyến</b>
          <span className="mt-1 block text-[9px] text-[#799085]">
            Ninh Quới
          </span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className="rounded-2xl bg-white p-3 text-left shadow-sm border border-[#e0ebe0] hover:border-[#2c7d55] transition"
        >
          <Gauge className="text-[#ea8156]" size={20} />
          <b className="mt-2 block text-xs">Tải trống</b>
          <span className="mt-1 block text-[9px] text-[#799085]">
            Còn 5 tấn
          </span>
        </button>
        <button
          onClick={() => setActiveTab("activity")}
          className="rounded-2xl bg-[#edf6e9] p-3 text-left shadow-sm border border-[#bde0a9] hover:border-[#2c7d55] transition"
        >
          <Package className="text-[#28704d]" size={20} />
          <b className="mt-2 block text-xs text-[#28704d]">Ghép chuyến</b>
          <span className="mt-1 block text-[9px] text-[#367e5b]">
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
        <Users size={18} className="text-[#367e5b]" />
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
              className="h-4 w-4 accent-[#2c7d55]"
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
          className="rounded-xl bg-[#2c7d55] px-3 py-2.5 text-xs font-bold text-white"
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
            className={`h-2.5 w-2.5 rounded-full ${tone === "safe" ? "bg-[#65ad62]" : "bg-[#ea8156]"}`}
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
            className="rounded-full bg-white p-2 text-[#367e5b] shadow-sm"
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
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold ${filter === item ? "bg-[#2c7d55] text-white" : "border border-[#dce8dc] bg-white text-[#6e8579]"}`}
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
    <article className="rounded-[20px] border border-[#e0ebe0] bg-white p-4 shadow-sm transition hover:border-[#2c7d55] hover:shadow-md">
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
              <p className="text-sm font-bold text-[#1e4638] truncate">
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
            className="absolute -top-1.5 h-5 w-5 rounded-full border-2 border-white bg-[#ea8156] shadow-md flex items-center justify-center text-[8px] text-white font-bold"
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
          <span className="font-bold text-[#2c7d55]">
            {journey.createdAt || "Hôm nay"}
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-[#edf2eb] pt-2.5 text-xs">
        <div>
          <span className="text-[#8b9e93]">Phương tiện: </span>
          <b className="text-[#1e4638]">
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
            className="rounded-xl bg-white p-2.5 text-[#367e5b] shadow-sm"
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
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf6e9] text-[#367e5b]">
        <Icon size={17} />
      </span>
      {label}
    </button>
  );
}
function Transaction({ icon: Icon, title, date, amount, positive }) {
  return (
    <div className="flex items-center gap-3 py-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf6e9] text-[#367e5b]">
        <Icon size={16} />
      </span>
      <div className="flex-1">
        <p className="text-xs font-bold">{title}</p>
        <p className="mt-1 text-[10px] text-[#8b9e93]">{date}</p>
      </div>
      <b
        className={`text-xs ${positive ? "text-[#4c9758]" : "text-[#1e4638]"}`}
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
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${notice.color === "orange" ? "bg-[#fff1e9] text-[#ea8156]" : notice.color === "green" ? "bg-[#edf6e9] text-[#4c9758]" : "bg-[#edf5f8] text-[#51859c]"}`}
            >
              <notice.icon size={18} />
            </span>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold">{notice.title}</p>
                {notice.time === "Đang hoạt động" && (
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ea8156]" />
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
        <button onClick={() => setActiveTab("activity")} className="flex flex-col items-center justify-center p-6 bg-white rounded-[20px] shadow-sm border border-[#e5ece3] hover:border-[#367e5b] transition-colors">
          <Activity className="text-[#367e5b] mb-3" size={32} />
          <span className="font-bold text-sm text-[#1e4638]">Quản lý chuyến</span>
        </button>
        <button onClick={() => setActiveTab("payment")} className="flex flex-col items-center justify-center p-6 bg-white rounded-[20px] shadow-sm border border-[#e5ece3] hover:border-[#367e5b] transition-colors">
          <Wallet className="text-[#367e5b] mb-3" size={32} />
          <span className="font-bold text-sm text-[#1e4638]">Thanh toán & Ví</span>
        </button>
        <button onClick={() => setActiveTab("notifications")} className="flex flex-col items-center justify-center p-6 bg-white rounded-[20px] shadow-sm border border-[#e5ece3] hover:border-[#367e5b] transition-colors">
          <MessageCircle className="text-[#367e5b] mb-3" size={32} />
          <span className="font-bold text-sm text-[#1e4638]">Tin nhắn</span>
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
          <h3 className="font-bold text-[#367e5b] flex items-center gap-2"><TrendingUp size={20}/> Thống kê chuyến đi</h3>
          <p className="text-3xl font-black mt-2 text-[#1e4638]">1,234 <span className="text-sm font-normal text-[#799085]">chuyến tháng này</span></p>
        </div>
        <div className="p-5 bg-white rounded-[20px] shadow-sm border border-[#e5ece3]">
          <h3 className="font-bold text-[#367e5b] flex items-center gap-2"><Users size={20}/> Người dùng</h3>
          <p className="text-3xl font-black mt-2 text-[#1e4638]">5,678 <span className="text-sm font-normal text-[#799085]">thành viên</span></p>
        </div>
        <div className="p-5 bg-[#edf6e9] rounded-[20px] shadow-sm border border-[#bde0a9]">
          <h3 className="font-bold text-[#28704d] flex items-center gap-2"><ShieldCheck size={20}/> Trạng thái hệ thống</h3>
          <p className="text-sm mt-2 text-[#367e5b] font-medium">Hoạt động bình thường. Không có cảnh báo.</p>
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
            className="rounded-xl bg-white p-2.5 text-[#367e5b] shadow-sm"
          >
            <Menu size={18} />
          </button>
        }
      />
      <section className="mb-5 flex items-center gap-4 rounded-[20px] border border-[#e0ebe0] bg-white p-5 shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dcebd3] text-xl font-bold text-[#367e5b]">
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
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#367e5b]">
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
                <ShieldCheck size={18} className="text-[#367e5b]" />
                <span className="font-semibold text-[#1e4638] w-24">Mã số thuế:</span>
                <span className="text-[#557264]">2001234567</span>
             </div>
             <div className="flex items-center gap-3 text-sm border-b border-[#f0f6ee] pb-2">
                <MapPin size={18} className="text-[#367e5b]" />
                <span className="font-semibold text-[#1e4638] w-24">Địa chỉ:</span>
                <span className="text-[#557264] truncate">Xã Ninh Quới, Hồng Dân, Bạc Liêu</span>
             </div>
             <div className="flex items-center gap-3 text-sm">
                <Leaf size={18} className="text-[#367e5b]" />
                <span className="font-semibold text-[#1e4638] w-24">Chứng nhận:</span>
                <span className="text-[#2c7d55] font-bold">Canh tác sinh thái, Giảm phát thải MRV</span>
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
          <span className="rounded-lg bg-[#edf6e9] p-2 text-[#367e5b]">
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
          <h2 className="display-font text-xl font-bold text-[#1e4638]">
            Luồng sông Cà Mau - Bạc Liêu
          </h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="rounded-full bg-[#f1f6ef] p-2 text-[#367e5b] hover:bg-[#e4efe2] transition"
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
                  ? "bg-[#2c7d55] text-white shadow-sm font-bold"
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
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#2c7d55 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        
        {/* River path curvy aesthetic */}
        <svg className="absolute inset-0 h-full w-full opacity-10" viewBox="0 0 400 200" preserveAspectRatio="none">
          <path d="M -50,150 Q 100,50 200,100 T 450,50" fill="none" stroke="#2c7d55" strokeWidth="30" />
          <path d="M -50,180 Q 150,150 250,50 T 450,100" fill="none" stroke="#2c7d55" strokeWidth="20" />
        </svg>

        {/* Tracking Line */}
        <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2">
           <div className="h-1.5 w-full rounded-full bg-[#2c7d55]" />
           
           {/* Stops */}
           {activeSeg.stops.map((stop, index) => {
             const percent = (index / (activeSeg.stops.length - 1)) * 100;
             return (
               <div key={stop} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" style={{ left: `${percent}%` }}>
                 <div className={`h-5 w-5 rounded-full border-4 border-white shadow-md ${index === 0 || index === activeSeg.stops.length - 1 ? 'bg-[#ea8156] h-6 w-6' : 'bg-[#2c7d55]'}`} />
                 <span className={`absolute top-6 w-24 text-center text-[10px] font-bold leading-tight text-[#1e4638] line-clamp-2 -translate-x-1/2 left-1/2`}>
                   {stop}
                 </span>
               </div>
             );
           })}
        </div>

        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-2 text-xs font-bold text-[#28704d] shadow">
          <Map size={14} className="text-[#2c7d55]" />
          <span>{activeSeg.name}</span>
        </div>
        <div className="absolute bottom-3 right-3 rounded-lg bg-[#1e4638]/95 px-3 py-1.5 text-[10px] font-bold text-white shadow">
          {activeSeg.tide} · {activeSeg.clearance}
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-[#f1f6ef] p-3 text-xs">
        <div className="flex items-center justify-between">
          <p className="font-bold text-[#8ba095]">
            Chặng đường: <strong className="text-[#1e4638]">{activeSeg.route}</strong>
          </p>
          <span className="font-bold text-[#2c7d55]">{activeSeg.distance} ({activeSeg.duration})</span>
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
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#fff1e9] text-[#ea8156]">
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
              className="flex-1 rounded-xl bg-[#ea8156] py-3 text-sm font-bold text-white"
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
          <h2 className="display-font text-xl font-bold text-[#1e4638]">Đánh giá khách hàng</h2>
          <button onClick={onClose} aria-label="Đóng" className="rounded-full bg-[#f1f6ef] p-2 text-[#367e5b] hover:bg-[#e4efe2] transition">
            <X size={18} />
          </button>
        </div>
        <div className="flex items-center gap-4 mb-4 bg-[#fffaf5] p-4 rounded-xl border border-[#faecd8]">
          <div className="text-center">
            <p className="text-4xl font-bold text-[#ea8156]">4.8</p>
            <p className="text-xs text-[#d9733e]">trên 5</p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex text-[#ea8156]">
              {[1,2,3,4,5].map(i => <Star key={i} size={16} fill={i <= 4 ? "currentColor" : "none"} strokeWidth={i <= 4 ? 0 : 2} />)}
            </div>
            <p className="text-xs text-[#799085]">Dựa trên 120 đánh giá</p>
          </div>
        </div>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto scrollbar-thin pr-1 pb-4">
          {reviews.map(r => (
            <div key={r.id} className="border-b border-[#e0ebe0] pb-4 last:border-0 last:pb-0">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1f6ef] text-[#2c7d55] font-bold text-lg border border-[#d6e8d4]">
                  {r.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#1e4638]">{r.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex text-[#ea8156]">
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
        <h2 className="display-font text-xl font-bold text-[#1e4638]">{content[0]}</h2>
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="rounded-full bg-[#f1f6ef] p-2 text-[#367e5b]"
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








// Mạng lưới thủy đạo chính kết nối các tuyến sông Cà Mau - Bạc Liêu
const riverNodes = {
  ninhQuoi: [9.458, 105.421],
  quanLoJunction: [9.412, 105.470],
  phuocLong: [9.382, 105.518],
  vinhPhuDong: [9.365, 105.542],
  bacLieuCity: [9.294, 105.724],
  hoaBinh: [9.245, 105.620],
  giaRai: [9.227, 105.448],
  hoPhong: [9.215, 105.385],
  tacVan: [9.172, 105.215],
  caMauCity: [9.176, 105.150],
  caiNuoc: [9.015, 105.025],
  damDoi: [9.060, 105.210],
  ganhHao: [9.023, 105.418],
  namCan: [8.745, 104.985],
  songDoc: [9.052, 104.981],
  datMui: [8.612, 104.745],
};

// Hàm nội suy đường cong mềm mại tự nhiên (Catmull-Rom spline) cho dòng sông
function smoothRiverPath(points, samplesPerSegment = 12) {
  if (points.length < 2) return points;
  if (points.length === 2) {
    const [p0, p1] = points;
    const mid1 = [p0[0] * 0.65 + p1[0] * 0.35 + (p1[1] - p0[1]) * 0.08, p0[1] * 0.65 + p1[1] * 0.35 - (p1[0] - p0[0]) * 0.08];
    const mid2 = [p0[0] * 0.35 + p1[0] * 0.65 - (p1[1] - p0[1]) * 0.05, p0[1] * 0.35 + p1[1] * 0.65 + (p0[0] - p1[0]) * 0.05];
    return smoothRiverPath([p0, mid1, mid2, p1], 8);
  }

  const result = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i < points.length - 2 ? points[i + 2] : p2;

    for (let step = 0; step <= samplesPerSegment; step++) {
      const t = step / samplesPerSegment;
      const t2 = t * t;
      const t3 = t2 * t;

      // Catmull-Rom formula
      const lat = 0.5 * (
        (2 * p1[0]) +
        (-p0[0] + p2[0]) * t +
        (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
        (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3
      );
      const lon = 0.5 * (
        (2 * p1[1]) +
        (-p0[1] + p2[1]) * t +
        (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
        (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3
      );

      result.push([lat, lon]);
    }
  }
  return result;
}

function RealWaterwayMap({ origin, destination, progress = 45 }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapLayerType, setMapLayerType] = useState("osm"); // "osm" | "satellite"

  // Lấy tọa độ GPS thực tế
  const getCoords = (name) => {
    if (!name) return riverNodes.ninhQuoi;
    for (const key in locationCoordinates) {
      if (name.includes(key) || key.includes(name)) {
        return locationCoordinates[key];
      }
    }
    return riverNodes.ninhQuoi;
  };

  const originCoords = getCoords(origin);
  const destCoords = getCoords(destination);

  // Xây dựng lộ trình theo đúng các đoạn luồng sông tự nhiên
  const baseWaypoints = (() => {
    // Tìm các điểm nút trung gian hợp lý theo vị trí địa lý
    const waypoints = [originCoords];
    
    // Nếu đi từ vùng Bắc Bạc Liêu (Ninh Quới, Hồng Dân) về Cà Mau / Phước Long
    const avgLat = (originCoords[0] + destCoords[0]) / 2;
    const avgLon = (originCoords[1] + destCoords[1]) / 2;

    // Điểm uốn cong tự nhiên theo lưu vực sông
    const midPoint = [
      avgLat + (Math.sin(originCoords[0] * 10) * 0.012),
      avgLon + (Math.cos(originCoords[1] * 10) * 0.012)
    ];
    waypoints.push(midPoint);
    waypoints.push(destCoords);

    return waypoints;
  })();

  // Tạo đường luồng sông cong mềm mại tự nhiên (không zic zắc)
  const smoothedRiverPath = smoothRiverPath(baseWaypoints, 16);

  // Tính toán vị trí GPS hiện tại của chiếc ghe dọc theo đường cong
  const currentBoatCoords = (() => {
    const t = Math.max(0, Math.min(progress / 100, 1));
    const targetIndex = Math.min(
      Math.floor(t * (smoothedRiverPath.length - 1)),
      smoothedRiverPath.length - 1
    );
    return smoothedRiverPath[targetIndex] || originCoords;
  })();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: currentBoatCoords,
        zoom: 11,
        zoomControl: false,
        attributionControl: false
      });

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Xóa tile layers cũ
    map.eachLayer((layer) => {
      map.removeLayer(layer);
    });

    // Lớp bản đồ OpenStreetMap chuẩn (Hiển thị đầy đủ 100% tên xã, phường, kênh rạch, sông ngòi không bị lỗi API key)
    if (mapLayerType === "osm") {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c'],
      }).addTo(map);
    } else {
      // Lớp bản đồ vệ tinh ESRI World Imagery
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
      }).addTo(map);
    }

    // 1. Dải hào quang bảo vệ luồng lạch (Glow Shadow)
    L.polyline(smoothedRiverPath, {
      color: '#2c7d55',
      weight: 12,
      opacity: 0.25,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    // 2. Tuyến luồng sông uốn lượn màu xanh ngọc rõ nét
    L.polyline(smoothedRiverPath, {
      color: '#2c7d55',
      weight: 4.5,
      opacity: 0.95,
      lineCap: 'round',
      lineJoin: 'round',
      dashArray: progress < 100 ? '6, 6' : undefined
    }).addTo(map);

    // 3. Marker Điểm xuất phát (Callout "Đã bốc hàng từ...")
    const originIcon = L.divIcon({
      className: 'custom-origin-pin',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
          <div style="background: #ffffff; border: 1.5px solid #2c7d55; color: #1e4638; padding: 4px 9px; border-radius: 10px; font-size: 11px; font-weight: bold; white-space: nowrap; box-shadow: 0 4px 14px rgba(0,0,0,0.18);">
            <span style="color: #2c7d55; display: block; font-size: 9px; font-weight: 800;">📍 ĐÃ BỐC HÀNG TỪ:</span>
            <span>${origin.split("(")[0]}</span>
          </div>
          <div style="width: 8px; height: 8px; background: #ffffff; border-right: 1.5px solid #2c7d55; border-bottom: 1.5px solid #2c7d55; transform: rotate(45deg); margin-top: -4px;"></div>
          <div style="width: 14px; height: 14px; border-radius: 50%; background: #2c7d55; border: 2.5px solid #fff; box-shadow: 0 0 10px rgba(44,125,85,0.7); margin-top: 2px;"></div>
        </div>
      `,
      iconSize: [0, 0]
    });
    L.marker(originCoords, { icon: originIcon }).addTo(map);

    // 4. Marker Điểm đến (Pin tròn Callout)
    const destIcon = L.divIcon({
      className: 'custom-dest-pin',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
          <div style="background: #ffffff; border: 1.5px solid #ea8156; color: #1e4638; padding: 4px 9px; border-radius: 10px; font-size: 11px; font-weight: bold; white-space: nowrap; box-shadow: 0 4px 14px rgba(0,0,0,0.18);">
            <span style="color: #ea8156; display: block; font-size: 9px; font-weight: 800;">🏁 ĐIỂM ĐẾN:</span>
            <span>${destination.split("(")[0]}</span>
          </div>
          <div style="width: 8px; height: 8px; background: #ffffff; border-right: 1.5px solid #ea8156; border-bottom: 1.5px solid #ea8156; transform: rotate(45deg); margin-top: -4px;"></div>
          <div style="width: 16px; height: 16px; border-radius: 50%; background: #fff; border: 3.5px solid #ea8156; box-shadow: 0 0 12px rgba(234,129,86,0.7); margin-top: 2px;"></div>
        </div>
      `,
      iconSize: [0, 0]
    });
    L.marker(destCoords, { icon: destIcon }).addTo(map);

    // 5. Marker Chiếc Ghe 3D đang di chuyển dọc tuyến sông
    const boatIcon = L.divIcon({
      className: 'custom-boat-pin',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%);">
          <div style="position: absolute; width: 46px; height: 46px; border-radius: 50%; background: rgba(44, 125, 85, 0.25); animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="width: 40px; height: 40px; border-radius: 13px; background: linear-gradient(135deg, #2c7d55, #1e4638); display: flex; align-items: center; justify-content: center; color: #fff; box-shadow: 0 8px 18px rgba(0,0,0,0.28); border: 2.5px solid #ffffff; z-index: 10;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 10v4"/><path d="M12 2v3"/></svg>
          </div>
          <div style="margin-top: 4px; background: #ffffff; border: 1.5px solid #2c7d55; color: #2c7d55; padding: 2px 7px; border-radius: 7px; font-size: 10px; font-weight: 800; white-space: nowrap; box-shadow: 0 3px 10px rgba(0,0,0,0.18); z-index: 10;">
            ${progress <= 20 ? "Đang đến bến lấy hàng" : progress >= 100 ? "Đã cập bến giao" : `Đang chạy ${progress}% tuyến`}
          </div>
        </div>
      `,
      iconSize: [0, 0]
    });
    L.marker(currentBoatCoords, { icon: boatIcon }).addTo(map);

    // Tự động căn chỉnh bao quát toàn bộ lộ trình
    const bounds = L.latLngBounds(smoothedRiverPath);
    map.fitBounds(bounds, { padding: [48, 48] });

  }, [origin, destination, progress, mapLayerType]);

  const handleFlyToBoat = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(currentBoatCoords, 13, { duration: 1.2 });
    }
  };

  return (
    <div className="relative h-72 w-full overflow-hidden shrink-0 select-none bg-[#eaf2eb]">
      {/* Khung chứa Leaflet Map thật */}
      <div ref={mapContainerRef} className="h-full w-full z-10" />

      {/* Bộ chuyển đổi kiểu bản đồ */}
      <div className="absolute top-3 left-3 z-20 flex gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-[#d2e5d5] shadow-md">
        <button
          onClick={() => setMapLayerType("osm")}
          className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition ${
            mapLayerType === "osm" ? "bg-[#2c7d55] text-white shadow-xs" : "text-[#557264] hover:bg-[#edf6eb]"
          }`}
        >
          Bản đồ hành chính
        </button>
        <button
          onClick={() => setMapLayerType("satellite")}
          className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition ${
            mapLayerType === "satellite" ? "bg-[#2c7d55] text-white shadow-xs" : "text-[#557264] hover:bg-[#edf6eb]"
          }`}
        >
          Vệ tinh
        </button>
      </div>

      {/* Nút GPS tròn định vị tâm ghe */}
      <button
        onClick={handleFlyToBoat}
        className="absolute bottom-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2c7d55] border border-[#d2e5d5] shadow-xl hover:bg-[#f2f7f1] active:scale-90 transition"
        title="Định vị tâm ghe trên sông"
      >
        <Navigation size={18} />
      </button>

      {/* Thông tin thủy triều góc trên phải */}
      <div className="absolute top-3 right-3 z-20 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-[#2c7d55] border border-[#cbe4d0] shadow-md">
        Thuận con nước lớn (+1.8 hải lý/h)
      </div>
    </div>
  );
}


function JourneyDetail({ journey, onClose }) {
  const origin =
    journey.origin ||
    journey.route.split(" → ")[0] ||
    journey.route.split(" - ")[0] ||
    "Xã Ninh Quới";
  const destination =
    journey.destination ||
    journey.route.split(" → ")[1] ||
    journey.route.split(" - ")[1] ||
    "Xã Phước Long";

  const progress = typeof journey.progress === "number" ? journey.progress : 45;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1e4638]/45 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
      <div className="w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-md bg-white text-[#1e4638] flex flex-col sm:rounded-[28px] overflow-hidden shadow-2xl border border-[#e0ebe0] animate-slide-down">
        
        {/* HEADER PHONG CÁCH TIKTOK SHOP / SHOPEE NỀN TRẮNG SÁNG */}
        <div className="flex items-center justify-between px-4 py-3.5 bg-white border-b border-[#e8f1e9] shrink-0 z-20">
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2f7f1] text-[#2c7d55] hover:bg-[#e4eee3] transition active:scale-95"
            aria-label="Quay lại"
          >
            <ArrowLeft size={20} />
          </button>
          
          <h1 className="text-base font-bold tracking-wide text-[#1e4638]">
            Theo dõi kiện hàng
          </h1>

          <button
            onClick={() => alert("Hệ thống định vị thủy đạo vệ tinh GPS kết hợp dữ liệu quan trắc con nước thời gian thực Cà Mau - Bạc Liêu.")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2f7f1] text-[#557264] hover:bg-[#e4eee3] transition"
            aria-label="Trợ giúp"
          >
            <CircleHelp size={19} />
          </button>
        </div>

        {/* BẢN ĐỒ THẬT LEAFLET VỚI ĐƯỜNG MÀU XANH NỐI TỪ ĐIỂM ĐI ĐẾN ĐIỂM ĐẾN */}
        <RealWaterwayMap
          origin={origin}
          destination={destination}
          progress={progress}
        />

        {/* BOTTOM DRAWER THEO DÕI NỀN SÁNG HÀI HÒA */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#f9fbf9] scrollbar-thin">
          
          {/* NGÀY DỰ KIẾN CẬP BẾN & PHÍ DỊCH VỤ 10k / 50k */}
          <div className="space-y-1.5 border-b border-[#e5eee7] pb-3">
            <p className="text-base font-bold text-[#1e4638] leading-tight sm:text-lg">
              Ngày giao dự kiến: <span className="text-[#2c7d55]">Hôm nay, 10:30</span>
            </p>
            <div className="flex items-center gap-2 text-xs text-[#557264]">
              <span className="rounded bg-[#eef7ee] text-[#2c7d55] px-2 py-0.5 text-[10px] font-bold border border-[#d2e8d7]">
                PHÍ NỀN TẢNG
              </span>
              <span>
                Phí kết nối chuyến: <strong className="text-[#2c7d55]">{journey.boat?.includes("Xuồng") || journey.boat?.includes("Vỏ") ? "10.000đ" : "50.000đ"}</strong>
              </span>
            </div>
          </div>

          {/* HỘP CẢNH BÁO CON NƯỚC MÀU CAM DỊU */}
          <div className="rounded-xl bg-[#fff8f3] border border-[#fedecb] p-3 text-xs text-[#9c4a1e] flex items-start gap-2.5 shadow-xs">
            <AlertTriangle size={17} className="text-[#ea8156] shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">
              <span className="font-bold text-[#ea8156]">Thông báo con nước sông: </span>
              Con nước lớn đang dâng thuận dòng giúp ghe di chuyển nhanh hơn 20 phút. Vận tốc dòng chảy đạt +1.8 hải lý/h.
            </div>
          </div>

          {/* TIMELINE CHI TIẾT TỪNG GIAI ĐOẠN ĐƯỜNG THỦY */}
          <div className="rounded-2xl bg-white border border-[#e2ece3] p-3.5 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#638072] flex items-center gap-1.5">
              <Clock3 size={14} className="text-[#2c7d55]" />
              Tiến trình di chuyển thực địa
            </h3>

            <div className="space-y-3.5 text-xs relative pl-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e0ebe0]">
              {/* Giai đoạn 1 */}
              <div className="relative">
                <div className="absolute -left-4 top-0.5 h-3 w-3 rounded-full bg-[#2c7d55] ring-4 ring-[#2c7d55]/15" />
                <p className="font-bold text-[#1e4638]">07:15 - Ghe xuất phát từ bến neo</p>
                <p className="text-[#5e7a6d] text-[11px] mt-0.5">Thuyền trưởng nổ máy tiếp cận bến nông hộ tại {origin}.</p>
              </div>

              {/* Giai đoạn 2 */}
              <div className="relative">
                <div className={`absolute -left-4 top-0.5 h-3 w-3 rounded-full ${progress >= 25 ? "bg-[#2c7d55] ring-4 ring-[#2c7d55]/15" : "bg-[#dce8dc]"}`} />
                <p className="font-bold text-[#1e4638]">07:45 - Đã bốc hàng lên ghe</p>
                <p className="text-[#5e7a6d] text-[11px] mt-0.5">Tiếp nhận {journey.weight || "nông sản"}, niêm phong bạt chống ướt an toàn.</p>
              </div>

              {/* Giai đoạn 3 */}
              <div className="relative">
                <div className={`absolute -left-4 top-0.5 h-3 w-3 rounded-full ${progress >= 60 ? "bg-[#2c7d55] ring-4 ring-[#2c7d55]/15" : "bg-[#dce8dc]"}`} />
                <p className="font-bold text-[#1e4638]">08:50 - Đang hành trình xuôi dòng</p>
                <p className="text-[#5e7a6d] text-[11px] mt-0.5">Vượt qua ngã ba sông & cống kiểm soát triều mặn an toàn.</p>
              </div>

              {/* Giai đoạn 4 */}
              <div className="relative">
                <div className={`absolute -left-4 top-0.5 h-3 w-3 rounded-full ${progress >= 100 ? "bg-[#2c7d55] ring-4 ring-[#2c7d55]/15" : "bg-[#dce8dc]"}`} />
                <p className="font-bold text-[#1e4638]">10:30 - Dự kiến cập bến giao nhận</p>
                <p className="text-[#5e7a6d] text-[11px] mt-0.5">Cập bến {destination}, hoàn tất dỡ hàng và nghiệm thu.</p>
              </div>
            </div>
          </div>

          {/* NÚT THAO TÁC GỌI CHỦ GHE & CHIA SẺ */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => alert("Đang kết nối cuộc gọi thoại với Thuyền trưởng!")}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-white hover:bg-[#edf6eb] py-2.5 text-xs font-bold text-[#2c7d55] transition active:scale-95 border border-[#2c7d55]"
            >
              <Phone size={14} className="text-[#2c7d55]" />
              Gọi chủ ghe
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert("Đã sao chép liên kết theo dõi chuyến sông vào bộ nhớ tạm!");
              }}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-[#2c7d55] hover:bg-[#236746] py-2.5 text-xs font-bold text-white shadow-xs transition active:scale-95"
            >
              Chia sẻ lộ trình
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function CargoDetail({ cargo, onClose, onAccept }) {
  if (!cargo) return null;
  return (
    <ModalShell onClose={onClose}>
      <div className="mb-5 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <ProduceIcon type={cargo.type} />
          <div>
            <span className="rounded-full bg-[#edf6e9] px-2.5 py-0.5 text-[10px] font-bold text-[#2c7d55]">
              {cargo.standard}
            </span>
            <h2 className="display-font mt-0.5 text-xl font-bold text-[#1e4638]">
              {cargo.name}
            </h2>
            <p className="text-xs text-[#557264]">{cargo.subName}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="rounded-full bg-[#f1f6ef] p-2 text-[#367e5b] hover:bg-[#e4efe2] transition"
        >
          <X size={18} />
        </button>
      </div>

      <div className="space-y-3 rounded-2xl bg-[#f8fbf7] border border-[#e0ebe0] p-4 text-xs sm:text-sm">
        <div className="flex justify-between items-center pb-2 border-b border-[#e5eee5]">
          <span className="text-[#799085]">Khối lượng cần vận chuyển</span>
          <b className="text-[#ea8156] text-base font-bold">{cargo.amount}</b>
        </div>
        <div className="flex justify-between items-start gap-4">
          <span className="text-[#799085]">Bến bốc hàng (Điểm đi)</span>
          <b className="text-right text-[#1e4638]">{cargo.origin || (cargo.route && cargo.route.split(" → ")[0])}</b>
        </div>
        <div className="flex justify-between items-start gap-4">
          <span className="text-[#799085]">Bến giao nhận (Điểm đến)</span>
          <b className="text-right text-[#1e4638]">{cargo.destination || (cargo.route && cargo.route.split(" → ")[1])}</b>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#799085]">Quy cách đóng gói</span>
          <b className="text-[#1e4638]">{cargo.packaging}</b>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#799085]">Bảo quản đặc biệt</span>
          <b className="text-[#2c7d55]">{cargo.tempReq || "Khô ráo, thoáng mát"}</b>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#799085]">Thời gian yêu cầu</span>
          <b className="text-[#1e4638]">{cargo.time}</b>
        </div>
        <div className="flex justify-between items-center border-t border-[#e5eee5] pt-2">
          <span className="text-[#799085]">Đơn vị / Hộ gửi hàng</span>
          <b className="text-[#2c7d55]">{cargo.sender}</b>
        </div>
        {cargo.phone && (
          <div className="flex justify-between items-center">
            <span className="text-[#799085]">Liên hệ bến bốc</span>
            <b className="text-[#1e4638]">{cargo.phone}</b>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 rounded-xl border border-[#d6e5d8] py-3 text-xs sm:text-sm font-bold text-[#557264] hover:bg-[#f1f6ef] transition"
        >
          Đóng
        </button>
        <button
          onClick={onAccept}
          className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-[#2c7d55] hover:bg-[#236746] py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#2c7d55]/20 transition active:scale-[0.98]"
        >
          <CheckCheck size={18} /> Nhận vận chuyển lô hàng này
        </button>
      </div>
    </ModalShell>
  );
}

function VehicleDetail({ vehicle, onClose, onBook }) {
  if (!vehicle) return null;
  return (
    <ModalShell onClose={onClose}>
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8ba095]">
            Phương tiện đang trống
          </p>
          <h2 className="display-font mt-1 text-2xl font-bold text-[#1e4638]">
            {vehicle.name}
          </h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="rounded-full bg-[#f1f6ef] p-2 text-[#367e5b] hover:bg-[#e4efe2] transition"
        >
          <X size={18} />
        </button>
      </div>

      <div className="rounded-2xl bg-[#f8fbf7] border border-[#e0ebe0] p-4 text-sm space-y-3">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-[#edf6e9] p-3 text-[#2c7d55]">
            <Ship size={22} />
          </span>
          <div>
            <b className="text-[#1e4638]">
              {vehicle.type} · Tải trọng {vehicle.capacity}
            </b>
            <p className="mt-0.5 text-xs text-[#2c7d55] font-semibold">Sẵn sàng nhận chuyến</p>
          </div>
        </div>

        <div className="pt-2 border-t border-[#e5eee5] space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-[#799085]">Tuyến hoạt động:</span>
            <b className="text-[#1e4638] text-right">{vehicle.route}</b>
          </div>
          <div className="flex justify-between">
            <span className="text-[#799085]">Tài công / Chủ phương tiện:</span>
            <b className="text-[#1e4638]">{vehicle.captain || "Tài công HTX"}</b>
          </div>
          {vehicle.phone && (
            <div className="flex justify-between">
              <span className="text-[#799085]">Số điện thoại:</span>
              <b className="text-[#2c7d55]">{vehicle.phone}</b>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t border-[#e5eee5]">
            <span className="text-[#799085]">Phí nền tảng ghép chuyến:</span>
            <b className="text-sm font-bold text-[#ea8156]">{vehicle.fee}</b>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 rounded-xl border border-[#d6e5d8] py-3 text-xs sm:text-sm font-bold text-[#557264] hover:bg-[#f1f6ef] transition"
        >
          Đóng
        </button>
        <button
          onClick={onBook}
          className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-[#2c7d55] hover:bg-[#236746] py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#2c7d55]/20 transition active:scale-[0.98]"
        >
          <Ship size={18} /> Đặt chuyến với phương tiện này
        </button>
      </div>
    </ModalShell>
  );
}

function WalletMethodModal({ action, onClose, notify }) {
  const methods = [
    [Landmark, "Ngân hàng nội địa (Vietcombank, Agribank, BIDV...)"],
    [Wallet, "Ví điện tử MoMo / ZaloPay"],
    [CreditCard, "Thẻ Quốc tế (Visa / Mastercard)"],
    [ArrowDownToLine, "Chuyển khoản QR Napas 247"],
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-5 animate-fade-in">
      <div className="w-full max-w-md rounded-t-[28px] bg-white p-5 shadow-2xl sm:rounded-[28px] animate-rise">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8ba095]">
              Ví Hành trình xanh
            </p>
            <h2 className="display-font text-xl font-bold text-[#1e4638]">{action} qua cổng thanh toán</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-[#f1f6ef] p-2 text-[#367e5b] hover:bg-[#e4efe2] transition"
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>
        <div className="space-y-2.5">
          {methods.map(([Icon, label]) => (
            <button
              key={label}
              onClick={() => {
                notify(`${action} qua ${label.split(" (")[0]} thành công`);
                onClose();
              }}
              className="flex w-full items-center gap-3 rounded-2xl border border-[#e0ebe0] p-3.5 text-left hover:border-[#2c7d55] hover:bg-[#f6faf5] transition active:scale-[0.99]"
            >
              <span className="rounded-xl bg-[#edf6e9] p-2.5 text-[#2c7d55]">
                <Icon size={18} />
              </span>
              <span className="flex-1 text-xs sm:text-sm font-semibold text-[#1e4638]">{label}</span>
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
          <h2 className="display-font text-xl font-bold text-[#1e4638]">Lịch sử giao dịch</h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="rounded-full bg-[#f1f6ef] p-2 text-[#367e5b] hover:bg-[#e4efe2] transition"
        >
          <X size={18} />
        </button>
      </div>
      <div className="space-y-1 rounded-2xl border border-[#e0ebe0] bg-white px-4 py-2">
        <Transaction
          icon={Ship}
          title="Cước chuyến HT-2048 (Lúa ST25)"
          date="Hôm nay, 10:15"
          amount={`-${fee.toLocaleString("vi-VN")}đ`}
        />
        <Transaction
          icon={ArrowDownToLine}
          title="Nạp tiền vào ví điện tử"
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
        <Transaction
          icon={Ship}
          title="Phí nền tảng ghép chuyến HT-1873"
          date="27/08/2026"
          amount={`-${fee.toLocaleString("vi-VN")}đ`}
        />
      </div>
      <button
        onClick={onClose}
        className="mt-4 w-full rounded-xl bg-[#f1f6ef] py-3 text-xs font-bold text-[#367e5b] hover:bg-[#e4efe2] transition"
      >
        Đóng
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
          className="rounded-full bg-[#f1f6ef] p-2 text-[#367e5b]"
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
              className="mt-1 w-full bg-transparent text-xs font-bold text-[#1e4638] outline-none"
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
          <h2 className="display-font text-2xl font-bold text-[#1e4638]">
            Tất cả phương tiện
          </h2>
          <p className="mt-1 text-xs text-[#799085]">
            Danh sách ghe, xà lan, vỏ đang sẵn sàng
          </p>
        </div>
        <button
          onClick={onClose}
          className="rounded-full bg-[#f1f6ef] p-2 text-[#367e5b]"
        >
          <X size={18} />
        </button>
      </div>
      <div className="flex flex-col gap-3 h-[60vh] overflow-y-auto">
        {vehicles.map((v) => (
          <div key={v.name} className="rounded-[18px] border border-[#e0ebe0] bg-white p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-[#1e4638]">{v.name}</span>
              <span className="font-bold text-[#ea8156]">{v.fee}</span>
            </div>
            <p className="text-xs text-[#71877b] mb-1">Tải trọng: {v.capacity}</p>
            <p className="text-xs text-[#71877b] mb-3">Tuyến: {v.route}</p>
            <div className="flex gap-2">
              <button 
                onClick={() => { onClose(); onVehicleDetail(v); }}
                className="flex-1 rounded-xl border border-[#2c7d55] py-2 text-xs font-bold text-[#2c7d55] transition active:scale-95"
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
                className="flex-1 rounded-xl bg-[#2c7d55] py-2 text-xs font-bold text-white shadow-sm transition active:scale-95"
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
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2c7d55] px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-[#2c7d55]/20 transition hover:bg-[#236746] disabled:cursor-wait disabled:opacity-70 active:scale-[0.99]"
      >
        {matching ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Đang tìm chuyến ghe & con nước phù hợp...
          </>
        ) : (
          <>
            <Ship size={17} />
            Tìm chuyến
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
      { id: "TC-01", name: "Cam sành canh tác sạch", owner: "Hộ Lê Hữu Khương", area: "0.8 ha", yield: "3 Tấn", status: "Chờ thu hoạch" },
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
          <h2 className="display-font text-xl font-bold text-[#1e4638]">{category === "Tất cả" ? "Toàn bộ Tài sản & Nông sản" : category}</h2>
        </div>
        <button onClick={onClose} className="rounded-full bg-[#f1f6ef] p-2 text-[#367e5b] hover:bg-[#e4efe2] transition">
          <X size={18} />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="py-10 text-center text-sm font-semibold text-[#8ba095]">Chưa có dữ liệu quản lý cho hạng mục này.</div>
      ) : (
        <div className="space-y-3 max-h-[60vh] overflow-y-auto scrollbar-thin pr-1 pb-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-2 rounded-xl border border-[#e0ebe0] bg-[#f8fcf7] p-3 shadow-sm hover:border-[#2c7d55] transition">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1e4638] text-sm">{item.name}</span>
                <span className="rounded-full bg-[#edf6e9] px-2 py-1 text-[10px] font-bold text-[#2c7d55] whitespace-nowrap">{item.status}</span>
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
