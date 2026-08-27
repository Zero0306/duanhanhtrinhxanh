import { useState } from "react";
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
const journeys = [
  {
    id: "HT-2048",
    title: "Xoài Cao Lãnh",
    route: "Xã Ninh Quới → Xã Phước Long",
    boat: "Ghe Thành Công",
    plate: "AG 1888",
    status: "Đang giao",
    tone: "green",
    progress: 68,
    eta: "Còn 2 giờ 15 phút",
    mapMarker: "9.176,105.15",
    stops: ["Xã Ninh Quới", "Xã Hồng Dân", "Xã Phước Long"],
  },
  {
    id: "HT-1982",
    title: "Lúa",
    route: "Xã Hồng Dân → Xã Vĩnh Lợi",
    boat: "Ghe Phúc Lộc",
    plate: "CT 5521",
    status: "Đã hoàn thành",
    tone: "blue",
    progress: 100,
    eta: "Đã cập bến hôm qua",
    mapMarker: "9.004,105.15",
    stops: ["Xã Hồng Dân", "Xã Ninh Quới", "Xã Vĩnh Lợi"],
  },
  {
    id: "HT-1873",
    title: "Thanh long ruột đỏ",
    route: "Xã Phong Thạnh Tây → Xã Gành Hào",
    boat: "Ghe Minh Anh",
    plate: "TG 0912",
    status: "Đã hủy",
    tone: "gray",
    progress: 0,
    eta: "Đã hủy bởi người gửi",
    mapMarker: "9.085,104.92",
    stops: ["Xã Phong Thạnh Tây", "Xã Phước Long", "Xã Gành Hào"],
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
  "Phường Cà Mau",
  "Phường An Xuyên",
  "Phường Tân Thành",
  "Xã Đất Mũi",
  "Xã Năm Căn",
  "Xã Trần Văn Thời",
  "Xã Cái Nước",
  "Xã U Minh",
  "Xã Thới Bình",
  "Xã Phú Tân",
  "Xã Hồng Dân",
  "Xã Ninh Quới",
  "Xã Phước Long",
  "Xã Vĩnh Phú Tây",
  "Xã Phong Thạnh Tây",
  "Xã Gành Hào",
  "Xã Vĩnh Lợi",
  "Phường Bạc Liêu",
];
const vehicleTypes = [
  { name: "Xà lan", fee: 50000 },
  { name: "Ghe", fee: 50000 },
  { name: "Vỏ", fee: 10000 },
  { name: "Xuồng", fee: 10000 },
];
const cargoRequests = [
  {
    name: "Tôm sú tươi",
    amount: "500 kg",
    route: "Xã Phước Long → Xã Ninh Quới",
    time: "Cần chuyến hôm nay",
    icon: "🦐",
  },
  {
    name: "Lúa",
    amount: "5 tấn",
    route: "Xã Hồng Dân → Xã Vĩnh Lợi",
    time: "Cần chuyến ngày mai",
    icon: "🌾",
  },
  {
    name: "Cua biển",
    amount: "100 kg",
    route: "Xã Ninh Quới → Xã Phong Thạnh Tây",
    time: "Cần chuyến hôm nay",
    icon: "🦀",
  },
];
const availableVehicles = [
  {
    name: "Ghe Thành Công",
    type: "Ghe",
    capacity: "5 tấn",
    route: "Xã Ninh Quới → Xã Phước Long",
    fee: "50.000đ/chuyến",
  },
  {
    name: "Vỏ Minh Anh",
    type: "Vỏ",
    capacity: "500 kg",
    route: "Xã Hồng Dân → Xã Vĩnh Lợi",
    fee: "10.000đ/chuyến",
  },
  {
    name: "Xà lan Phúc Lộc",
    type: "Xà lan",
    capacity: "20 tấn",
    route: "Xã Phong Thạnh Tây → Xã Gành Hào",
    fee: "50.000đ/chuyến",
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
  const [origin, setOrigin] = useState("Xã Ninh Quới");
  const [destination, setDestination] = useState("Xã Phước Long");
  const [produce, setProduce] = useState("Xoài Cao Lãnh");
  const [weight, setWeight] = useState("2 tấn");
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
    const route = details.route || `${origin} → ${destination}`;
    const newJourney = {
      id: `HT-${Date.now().toString().slice(-4)}`,
      title: details.title || produce,
      route,
      boat:
        details.boat ||
        (mode === "Tìm phương tiện" ? "Ghe Thành Công" : vehicleInfo.name),
      plate:
        details.plate ||
        (mode === "Tìm phương tiện" ? "AG 1888" : vehicleInfo.plate),
      status: "Đang giao",
      tone: "green",
      progress: 18,
      eta: "Phương tiện đang đến nhận hàng",
      mapMarker: "9.176,105.15",
      stops: [origin, "Xã Hồng Dân", destination],
    };
    setActiveJourneys((current) => [newJourney, ...current]);
    setActiveTab("activity");
    setMatched(false);
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
    return <LoginView onAuthenticated={() => setAuthenticated(true)} />;
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
              className="relative rounded-full bg-white p-2.5 text-[#557264] shadow-sm"
              aria-label="Thông báo"
            >
              <Bell size={19} />
              {notices.some((notice) => notice.unread) && (
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#e9784b]" />
              )}
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

function LoginView({ onAuthenticated }) {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [kycUploaded, setKycUploaded] = useState(false);
  const submit = () => {
    if (!otpSent) {
      setOtpSent(true);
      return;
    }
    localStorage.setItem("hanhTrinhXanh.authenticated", "true");
    localStorage.setItem("hanhTrinhXanh.phone", phone);
    onAuthenticated();
  };
  return (
    <div className="app-shell flex min-h-screen items-center justify-center p-5">
      <main className="w-full max-w-md rounded-[28px] border border-[#dfeade] bg-white p-6 shadow-2xl shadow-[#2f815c]/10 sm:p-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2f815c] text-white">
            <Leaf size={24} />
          </div>
          <div>
            <p className="display-font text-xl font-bold">Hành trình xanh</p>
            <p className="text-xs text-[#799085]">
              Vận chuyển nông sản minh bạch
            </p>
          </div>
        </div>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#8ba095]">
          Định danh số
        </p>
        <h1 className="display-font text-3xl font-bold text-[#183b32]">
          Chào mừng trở lại
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#71877b]">
          Đăng nhập để kết nối mùa vụ với những chuyến ghe hiệu quả hơn.
        </p>
        <label className="mt-6 block text-xs font-bold text-[#557264]">
          Số điện thoại
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="mt-2 w-full rounded-xl border border-[#dce8dc] px-3 py-3 outline-none focus:border-[#4c9758]"
            placeholder="09xx xxx xxx"
            inputMode="tel"
          />
        </label>
        {otpSent && (
          <label className="mt-3 block text-xs font-bold text-[#557264]">
            Mã OTP giả
            <input
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              className="mt-2 w-full rounded-xl border border-[#dce8dc] px-3 py-3 tracking-[.35em] outline-none focus:border-[#4c9758]"
              placeholder="123456"
              inputMode="numeric"
            />
          </label>
        )}
        <button
          disabled={!phone || (otpSent && !otp)}
          onClick={submit}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#e9784b] py-3.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {otpSent ? (
            <>
              <ShieldCheck size={17} /> Xác nhận OTP
            </>
          ) : (
            "Nhận OTP"
          )}
        </button>
        <div className="mt-5 rounded-2xl bg-[#f1f6ef] p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[#28704d]">
            <ShieldCheck size={17} /> Hồ sơ KYC mô phỏng
          </div>
          <p className="mt-1 text-xs leading-5 text-[#71877b]">
            Tải đủ CCCD mặt trước và sau để nhận dấu xác thực xanh.
          </p>
          <button
            onClick={() => setKycUploaded(true)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#9fc898] bg-white py-3 text-xs font-bold text-[#397153]"
          >
            <Upload size={15} />{" "}
            {kycUploaded
              ? "Đã tải 2 ảnh CCCD"
              : "Tải lên ảnh CCCD mặt trước / sau"}
          </button>
        </div>
      </main>
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
          <p className="mb-2 text-sm font-medium text-[#c5e8ae]">
            Thứ hai, 24 tháng 8, 2026
          </p>
          <h1 className="display-font text-3xl font-bold leading-tight md:text-4xl">
            Chào Ngọc Anh,
            <br />
            <span className="text-[#c5e8ae]">mùa này đi đâu?</span>
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#d7ebdc]">
            Nhanh chóng · tiết kiệm · tận nơi
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
          className="rounded-xl bg-[#e9784b] px-2 py-3 text-[11px] font-bold text-white"
        >
          Tìm ghe ghép chuyến
        </button>
        <button
          onClick={onContract}
          className="rounded-xl border border-[#bde0a9] bg-white px-2 py-3 text-[11px] font-bold text-[#28704d]"
        >
          Tạo hợp đồng
        </button>
        <button
          onClick={() =>
            document
              .getElementById("luong-xanh-htx")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="rounded-xl border border-[#bde0a9] bg-white px-2 py-3 text-[11px] font-bold text-[#28704d]"
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
            <Field label="Điểm đi" icon={MapPin}>
              <select
                value={origin}
                onChange={(event) => setOrigin(event.target.value)}
              >
                {caMauLocations.map((location) => (
                  <option key={location}>{location}</option>
                ))}
              </select>
            </Field>
            <Field label="Điểm đến" icon={Navigation}>
              <select
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
              >
                {caMauLocations.map((location) => (
                  <option key={location}>{location}</option>
                ))}
              </select>
            </Field>
            <Field label="Loại nông sản" icon={Package}>
              <select
                value={produce}
                onChange={(event) => setProduce(event.target.value)}
              >
                <option>Xoài Cao Lãnh</option>
                <option>Lúa</option>
                <option>Thanh long ruột đỏ</option>
                <option>Tôm sú tươi</option>
                <option>Cua biển</option>
                <option>Gạo thơm</option>
                <option>Cá đồng</option>
                <option>Trái cây miền Tây</option>
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
              </select>
            </Field>
          </div>
          <button
            disabled={matching}
            onClick={findBoat}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#e9784b] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#e9784b]/20 transition hover:bg-[#d7653a] disabled:cursor-wait disabled:opacity-70"
          >
            {matching ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                AI đang tính tuyến tối ưu...
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
                      ? `${vehicleInfo.name} · ${vehicleInfo.plate} · nhận chuyến lúc 14:30`
                      : "Ghe Thành Công · AG 1888 · khởi hành 14:30 hôm nay"}
                  </p>
                  <p className="mt-2 text-xs font-bold text-[#db713f]">
                    {journeyMode === "Ghép chuyến"
                      ? `Phí nền tảng: ${vehicleInfo.type === "Ghe" || vehicleInfo.type === "Xà lan" ? "50.000đ" : "10.000đ"}/chuyến`
                      : "Đã cắt bỏ cò đò - lợi nhuận tăng thêm 15%"}
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
          action="Tìm theo nhu cầu"
          onAction={() => setJourneyMode("Tìm phương tiện")}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {cargoRequests.map((cargo) => (
            <button
              key={cargo.name}
              onClick={() => {
                setProduce(cargo.name);
                setWeight(cargo.amount);
                setJourneyMode("Tìm phương tiện");
                onCargoDetail(cargo);
              }}
              className="flex items-center gap-3 rounded-[16px] border border-[#e0ebe0] bg-white p-3 text-left shadow-sm transition hover:border-[#b7d6ad]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff4df] text-xl">
                {cargo.icon}
              </span>
              <span className="min-w-0 flex-1">
                <b className="block text-sm">{cargo.name}</b>
                <span className="mt-1 block truncate text-[11px] text-[#799085]">
                  {cargo.route}
                </span>
                <span className="mt-1 block text-[10px] font-bold text-[#e9784b]">
                  {cargo.amount} · {cargo.time}
                </span>
              </span>
              <ChevronRight size={16} className="text-[#9caf9f]" />
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
              className="min-w-[230px] rounded-[16px] border border-[#e0ebe0] bg-white p-4 text-left shadow-sm hover:border-[#b7d6ad]"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold">
                  <Ship size={17} className="text-[#397153]" />
                  {vehicle.name}
                </span>
                <span className="rounded-full bg-[#edf6e9] px-2 py-1 text-[10px] font-bold text-[#4c9758]">
                  Đang trống
                </span>
              </div>
              <p className="mt-3 text-xs text-[#6e8579]">
                {vehicle.type} · tải {vehicle.capacity}
              </p>
              <p className="mt-1 text-[11px] text-[#799085]">{vehicle.route}</p>
              <p className="mt-3 text-xs font-bold text-[#d96e44]">
                Phí {vehicle.fee}
              </p>
            </button>
          ))}
        </div>
      </section>
      <section className="order-4 mb-8">
        <SectionTitle
          eyebrow="Theo dõi dòng chảy"
          title="Bản đồ luồng tuyến"
          action="Xem chi tiết"
          onAction={onRouteDetail}
        />
        <div className="relative h-52 overflow-hidden rounded-[20px] bg-[#86b99b] shadow-sm">
          <iframe
            title="Bản đồ sông Cà Mau"
            className="h-full w-full border-0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=104.75%2C8.55%2C105.35%2C9.45&layer=mapnik&marker=9.176%2C105.15"
          />
          <div className="absolute left-4 top-4 rounded-lg bg-white/90 px-3 py-2 text-[11px] font-bold text-[#245b42] shadow-sm">
            <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#e9784b]" />
            Ghe của bạn
          </div>
          <div className="absolute bottom-4 right-4 rounded-lg bg-[#174c3a]/90 px-3 py-2 text-[10px] font-semibold text-white">
            Cập nhật trực tiếp · 14:12
          </div>
        </div>
      </section>
      <section className="order-5">
        <SectionTitle
          eyebrow="Mạng lưới cảm biến"
          title="Cảnh báo môi trường"
          action="Xem tất cả"
          onAction={() => setActiveTab("notifications")}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <EnvironmentCard
            name="Khúc sông A"
            value="2‰"
            label="An toàn"
            tone="safe"
          />
          <EnvironmentCard
            name="Khúc sông B"
            value="5‰"
            label="Nguy hiểm"
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
        <p className="text-sm text-[#bfe3b0]">
          Xin chào, <VerifiedName name="Anh Tùng" />
        </p>
        <h1 className="display-font mt-2 text-3xl font-bold">
          Tối ưu từng chuyến ghe.
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#d7ebdc]">
          Nhận nguồn hàng phù hợp, chạy đầy tải và giảm chuyến rỗng trên tuyến
          Cái Cui.
        </p>
        <button
          onClick={() => setActiveTab("profile")}
          className="mt-5 rounded-xl bg-[#e9784b] px-4 py-3 text-xs font-bold"
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
            key={cargo.name}
            className="rounded-[18px] border border-[#e0ebe0] bg-white p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{cargo.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-bold">
                  <VerifiedName name="HTX Ninh Quới" />
                </p>
                <p className="mt-1 text-xs text-[#71877b]">
                  {cargo.name} · {cargo.amount} · {cargo.route}
                </p>
                <p className="mt-2 text-[10px] font-bold text-[#e9784b]">
                  {cargo.time}
                </p>
              </div>
              <button
                onClick={onContract}
                className="rounded-lg bg-[#edf6e9] px-3 py-2 text-[10px] font-bold text-[#28704d]"
              >
                Đề xuất
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => setActiveTab("activity")}
          className="rounded-2xl bg-white p-4 text-left shadow-sm"
        >
          <Route className="text-[#397153]" size={20} />
          <b className="mt-3 block text-sm">Tối ưu tuyến đường</b>
          <span className="mt-1 block text-xs text-[#799085]">
            Ninh Quới - Phước Long
          </span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className="rounded-2xl bg-white p-4 text-left shadow-sm"
        >
          <Gauge className="text-[#e9784b]" size={20} />
          <b className="mt-3 block text-sm">Trọng tải trống</b>
          <span className="mt-1 block text-xs text-[#799085]">
            Còn 3,2 tấn hôm nay
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
  return (
    <article className="rounded-[20px] border border-[#e0ebe0] bg-white p-4 shadow-sm transition hover:border-[#b7d6ad]">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${journey.tone === "green" ? "bg-[#e9f5e6] text-[#4c9758]" : journey.tone === "blue" ? "bg-[#e8f1f5] text-[#51859c]" : "bg-[#f0f2ef] text-[#8b9e93]"}`}
          >
            <Ship size={19} />
          </div>
          <div>
            <p className="text-sm font-bold">{journey.title}</p>
            <p className="mt-0.5 text-xs text-[#799085]">
              {journey.id} · {journey.route}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${journey.tone === "green" ? "bg-[#eff9e9] text-[#4c9758]" : journey.tone === "blue" ? "bg-[#edf5f8] text-[#51859c]" : "bg-[#f1f3f0] text-[#8b9e93]"}`}
        >
          {journey.status}
        </span>
      </div>
      {journey.progress > 0 && (
        <div className="mt-4 rounded-xl bg-[#eef6ec] p-3">
          <div className="mb-2 flex justify-between text-[10px] font-semibold text-[#6d8876]">
            <span>{journey.route.split(" → ")[0]}</span>
            <span>{journey.route.split(" → ")[1]}</span>
          </div>
          <div className="relative h-1.5 rounded-full bg-[#d5e7d1]">
            <div
              className="h-full rounded-full bg-[#55a161]"
              style={{ width: `${journey.progress}%` }}
            />
            <span
              className="absolute -top-1.5 h-4 w-4 rounded-full border-2 border-white bg-[#e9784b] shadow"
              style={{ left: `calc(${journey.progress}% - 8px)` }}
            />
          </div>
        </div>
      )}
      <div className="mt-4 flex items-center justify-between border-t border-[#edf2eb] pt-3 text-xs">
        <div>
          <span className="text-[#8b9e93]">{journey.boat} · </span>
          <b>{journey.plate}</b>
        </div>
        <span className="font-semibold text-[#6d8876]">{journey.eta}</span>
      </div>
      <button
        onClick={() => onDetail(journey)}
        className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg bg-[#edf6e9] py-2.5 text-xs font-bold text-[#28704d]"
      >
        Xem chi tiết lộ trình <ChevronRight size={14} />
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
          date="22/08/2026"
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
          NA
        </div>
        <div>
          <h2 className="display-font text-xl font-bold">
            <VerifiedName name="Ngọc Anh" />
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
  const route = ["Xã Ninh Quới", "Xã Hồng Dân", "Xã Phước Long"];
  return (
    <ModalShell onClose={onClose}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8ba095]">
            Bản đồ luồng tuyến
          </p>
          <h2 className="display-font text-xl font-bold">
            Các tuyến sông Cà Mau
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
      <div className="relative h-64 overflow-hidden rounded-2xl">
        <iframe
          title="Luồng tuyến Cà Mau"
          className="h-full w-full border-0"
          src="https://www.openstreetmap.org/export/embed.html?bbox=104.75%2C8.55%2C105.35%2C9.45&layer=mapnik&marker=9.176%2C105.15"
        />
        <div className="absolute left-3 top-3 rounded-lg bg-white/95 px-3 py-2 text-xs font-bold text-[#28704d] shadow">
          <Map size={14} className="mr-1 inline" />
          Luồng chính đang mở
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-[#f1f6ef] p-3">
        <p className="text-xs font-bold text-[#8ba095]">
          Tuyến đề xuất hôm nay
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          {route.map((stop, index) => (
            <span key={stop} className="flex items-center gap-2">
              <b className="rounded-full bg-white px-2.5 py-1.5 text-[#28704d]">
                {stop}
              </b>
              {index < route.length - 1 && (
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
  const marker = journey.mapMarker || "9.176,105.15";
  const stops = journey.stops || journey.route.split(" → ");
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#183b32]/35 p-0 backdrop-blur-sm sm:items-center sm:p-5">
      <div className="w-full max-w-lg rounded-t-[24px] bg-white p-5 shadow-2xl sm:rounded-[24px]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8ba095]">
              Lộ trình cụ thể · {journey.id}
            </p>
            <h2 className="display-font text-xl font-bold">{journey.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-[#f1f6ef] p-2 text-[#397153]"
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>
        <div className="relative h-64 overflow-hidden rounded-2xl bg-[#dcebd3]">
          <iframe
            title="Bản đồ lộ trình Cà Mau"
            className="h-full w-full border-0"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=104.75%2C8.55%2C105.35%2C9.45&layer=mapnik&marker=${marker}`}
          />
          <div className="absolute left-3 top-3 flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-xs font-bold text-[#28704d] shadow">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#e9784b]" />
            Vị trí {journey.boat}
          </div>
          <div className="absolute bottom-3 right-3 rounded-lg bg-[#183b32]/90 px-3 py-2 text-[10px] font-bold text-white">
            Đang ở {stops[1] || "Cà Mau"}
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-[#f1f6ef] p-3 text-xs">
          <span className="font-bold text-[#8ba095]">
            Các chặng trong Cà Mau
          </span>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {stops.map((stop, index) => (
              <span
                key={`${stop}-${index}`}
                className="flex items-center gap-2"
              >
                <b className="rounded-full bg-white px-2.5 py-1.5 text-[#28704d]">
                  {stop}
                </b>
                {index < stops.length - 1 && (
                  <ChevronRight size={13} className="text-[#a0afa5]" />
                )}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl bg-[#f1f6ef] p-3">
            <span className="text-[#8ba095]">Tuyến đi</span>
            <b className="mt-1 block">{journey.route}</b>
          </div>
          <div className="rounded-xl bg-[#f1f6ef] p-3">
            <span className="text-[#8ba095]">Trạng thái</span>
            <b className="mt-1 block text-[#4c9758]">
              {journey.status} · {journey.eta}
            </b>
          </div>
        </div>
      </div>
    </div>
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
          date="22/08/2026"
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
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8ba095]">
            Yêu cầu đang cần chuyến
          </p>
          <h2 className="display-font mt-1 text-2xl font-bold">
            {cargo.icon} {cargo.name}
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
      <div className="space-y-3 rounded-2xl bg-[#f1f6ef] p-4 text-sm">
        <div className="flex justify-between">
          <span className="text-[#799085]">Khối lượng</span>
          <b>{cargo.amount}</b>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#799085]">Điểm đi</span>
          <b className="text-right">{cargo.route.split(" → ")[0]}</b>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#799085]">Điểm đến</span>
          <b className="text-right">{cargo.route.split(" → ")[1]}</b>
        </div>
        <div className="flex justify-between">
          <span className="text-[#799085]">Thời gian</span>
          <b>{cargo.time.replace("Cần chuyến ", "")}</b>
        </div>
      </div>
      <button
        onClick={onAccept}
        className="mt-4 w-full rounded-xl bg-[#1f6b4b] py-3.5 text-sm font-bold text-white"
      >
        Nhận chuyến này
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
    ["Loại nông sản", "Lúa"],
    ["Ngày thu hoạch dự kiến", "28/08/2026"],
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
