import  { memo,useEffect, useState } from "react";
//import React from "react";
import {

  Menu,
  X , // Add this import
 
} from "lucide-react";

// interface Task {
//   id: number;
//   title: string;
//   time: string;
//   date: string;
//   completed: boolean;
// }

interface CircularProgressProps {
  percentage: number;
  color: string;
  ticker: "crypto" | "forex";
}



const cryptoData = [
  { icon: "₿", pair: "BTC/USDT", value: "42,389.50" },
  { icon: "Ξ", pair: "ETH/USDT", value: "2,890.75" },
  { icon: "○", pair: "DOT/USDT", value: "15.23" },
  { icon: "Ł", pair: "LTC/USDT", value: "68.45" },
  { icon: "●", pair: "BNB/USDT", value: "312.80" },
];

const forexData = [
  { icon: "$", pair: "EUR/USD", value: "1.0924" },
  { icon: "£", pair: "GBP/USD", value: "1.2645" },
  { icon: "¥", pair: "USD/JPY", value: "148.12" },
  { icon: "₣", pair: "USD/CHF", value: "0.8851" },
  { icon: "$", pair: "AUD/USD", value: "0.6584" },
];


// Circular Progress Component
interface TickerItem {
  icon: string;
  pair: string;
  value: string;
}



interface TickerRowProps {
  label: string;
  items: TickerItem[];
  tickerType: 'crypto' | 'forex';  // Changed 'type' to 'tickerType' to avoid conflicts
}


const TickerRow = memo(
  ({ label, items,  tickerType }: TickerRowProps) => {
    const [position, setPosition] = useState(0);
    const [width, setWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
      const ticker = document.getElementById(`ticker-${label}`);
      const container = document.getElementById(`container-${label}`);
      if (ticker && container) {
        setWidth(ticker.scrollWidth);
        setContainerWidth(container.offsetWidth);
      }
    }, [label]);

    useEffect(() => {
      if (width > 0) {
        const animation = setInterval(() => {
          setPosition((prev) => {
            if (prev <= -width) {
              return containerWidth;
            }
            return prev - 1;
          });
        }, 10);

        return () => clearInterval(animation);
      }
    }, [width, containerWidth]);

 // Determine background and text colors based on tickerType
 const bgColor = tickerType === "crypto" ? "bg-blue-100" : "bg-pink-100";
 const labelColor = tickerType === "crypto" ? "text-blue-600" : "text-pink-600";
 const valueColor = tickerType === "crypto" ? "text-blue-500" : "text-pink-500";
 const value = tickerType === "crypto" ? "text-blue-500" : "text-blue-500";

    return (
      <div className="p-2 relative overflow-hidden border border-black rounded-lg bg-white dark:bg-transparent">
        <div
          className={`flex items-center gap-4 bg-${bgColor}/10 py-2 px-4 rounded-lg`}
        >
          <span className={`${labelColor} font-medium min-w-[80px]`}>
            {label}
          </span>
          <div id={`container-${label}`} className="flex-1 overflow-hidden">
            <div
              id={`ticker-${label}`}
              className="flex items-center whitespace-nowrap"
              style={{
                transform: `translateX(${position}px)`,
                transition:
                  position === containerWidth
                    ? "none"
                    : "transform 0.1s linear",
              }}
            >
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2 mr-8">
                  <span className={`${value}  font-medium`}>
                    {item.icon} {item.pair}:
                  </span>
                  <span className={`${valueColor} font-semibold`}>
                    {item.value}
                  </span>
                </div>
              ))}
              {items.map((item, index) => (
                <div
                  key={`dup-${index}`}
                  className="flex items-center gap-2 mr-8"
                >
                  <span className={`${value}  font-medium`}>
                    {item.icon} {item.pair}:
                  </span>
                  <span className={`${valueColor} font-semibold`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

const CircularProgress = memo(
  ({ percentage, color }: CircularProgressProps) => {
    //const { isDark } = useTheme();
    // const baseCircleColor = isDark ? "#374151" : "#1f2937";

    return (
      <div className="relative w-24 h-24">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="15.9155"
            stroke="#000" // Black border
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="18"
            cy="18"
            r="15.9155"
            stroke={color}
            strokeWidth="3"
            fill="none"
            strokeDasharray={`${percentage}, 100`}
            transform="rotate(-90 18 18)"
          />
        </svg>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        >
          {percentage}%
        </div>
      </div>
    );
  }
);


const recentBonuses = [
  { amount: 70, date: "22 May 2023", type: "Other Bonus" },
  { amount: 0.07, date: "24 Apr 2023", type: "Other Bonus" },
  { amount: 7, date: "18 Apr 2023", type: "Other Bonus" },
  { amount: 192500, date: "31 Jan 2023", type: "LTG Bonus" },
  { amount: 7, date: "18 Jan 2023", type: "Other Bonus" },
  { amount: 7, date: "16 Jan 2023", type: "Other Bonus" },
];

const poolData = [
  {
    name: "Diamond",
    value: "72735.6375",
    multiplier: "1547.5667553",
    points: 47,
  },
  {
    name: "Blue Diamond",
    value: "72735.6375",
    multiplier: "2508.1254310",
    points: 29,
  },
  {
    name: "Black Diamond",
    value: "72735.6375",
    multiplier: "3306.1653409",
    points: 22,
  },
  {
    name: "Royal Diamond",
    value: "72735.6375",
    multiplier: "4278.5669117",
    points: 17,
  },
  {
    name: "Crown Diamond",
    value: "290942.55",
    multiplier: "747.9242930",
    points: 389,
  },
];

const getColor = (tier: string): string => {
  const colors: Record<string, string> = {
    Diamond: "#10B981",
    "Blue Diamond": "#0EA5E9",
    "Black Diamond": "#6B7280",
    "Royal Diamond": "#F59E0B",
    "Crown Diamond": "#6366F1",
  };
  return colors[tier] || "#6B7280";
};

const Dashboard = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = !menuOpen ? 'hidden' : 'unset';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById('mobile-nav');
      const hamburger = document.getElementById('hamburger-button');
      
      if (
        nav && 
        !nav.contains(event.target as Node) && 
        hamburger && 
        !hamburger.contains(event.target as Node) && 
        menuOpen
      ) {
        setMenuOpen(false);
        document.body.style.overflow = 'unset';
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);


  // const stats = {
  //   employees: 78,
  //   hirings: 56,
  //   projects: 203,
  // };

  // const onboardingTasks: Task[] = [
  //   {
  //     id: 1,
  //     title: "Interview",
  //     time: "08:30",
  //     date: "Sep 13",
  //     completed: true,
  //   },
  //   {
  //     id: 2,
  //     title: "Team Meeting",
  //     time: "10:30",
  //     date: "Sep 13",
  //     completed: true,
  //   },
  //   {
  //     id: 3,
  //     title: "Project Update",
  //     time: "13:00",
  //     date: "Sep 13",
  //     completed: false,
  //   },
  //   {
  //     id: 4,
  //     title: "Discuss Q3 Goals",
  //     time: "14:45",
  //     date: "Sep 13",
  //     completed: false,
  //   },
  //   {
  //     id: 5,
  //     title: "HR Policy Review",
  //     time: "16:30",
  //     date: "Sep 13",
  //     completed: false,
  //   },
  // ];

  return (
    <div className="w-full min-h-screen custom-gradient rounded-3xl shadow-lg p-6 font-poppins space-y-8">
      {/* Navbar */}
      <nav className="relative flex items-center justify-between w-full mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 bg-white rounded-full border border-gray-200 shadow-lg px-3 py-1 sm:px-4 sm:py-2">
          <img
            className="w-8 h-8 sm:w-10 sm:h-10"
            src="https://cticlub.org/assets/images/brand/itclogow.png"
            alt="logo"
          />
          <div className="text-lg sm:text-xl font-semibold text-gray-600">ITC</div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="flex items-center space-x-3 bg-white rounded-full border border-gray-200 shadow-md py-1 px-3">
            <button className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium">
              Dashboard
            </button>
            {["People", "Hiring", "Devices", "Apps", "Salary"].map((item) => (
              <button
                key={item}
                className="px-2 py-1 text-gray-600 hover:text-gray-900 text-sm"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-md py-2 px-3">
              <span>Connectwallet</span>
            </button>
          </div>
        </div>
       
        <div className="lg:hidden flex items-center gap-3">
  <button
    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-md py-1.5 px-3 text-sm mr-auto"
  >
    <span>Connectwallet</span>
  </button>
  {/* Hamburger Menu Button */}
  <button
    id="hamburger-button"
    className="lg:hidden flex items-center justify-center p-2 border border-gray-300 rounded-md bg-white z-50"
    onClick={toggleMenu}
    aria-label="Toggle menu"
  >
    {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
  </button>
</div>


        {/* Mobile Navigation Menu */}
        {/* Mobile Navigation Menu */}
<div
  id="mobile-nav"
  className={`lg:hidden fixed top-0 left-0 right-0 h-full w-full bg-white transform transition-transform duration-300 ease-in-out z-40 ${
    menuOpen ? 'translate-x-0' : 'translate-x-full'
  }`}
>
  <div className="flex flex-col p-4 space-y-4 mt-16">
    <button className="px-2 py-2 bg-gray-900 text-white rounded-full text-sm font-medium w-1/3">
      Dashboard
    </button>
    {["People", "Hiring", "Devices", "Apps", "Salary"].map((item) => (
      <button
        key={item}
        className="px-2 py-2 text-gray-600 hover:text-gray-900 text-sm w-full text-left"
      >
        {item}
      </button>
    ))}
   
  </div>
</div>
      </nav>



      {/* Header */}
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Section */}

      {/* Employee Stats */}

      {/* Task Progress Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
  {/* Total Bonus Section */}
  <div className="col-span-1 text-black p-6  shadow-md flex flex-col items-center rounded-lg border border-black">
    <h3 className="text-lg font-semibold mb-4">Total Bonus</h3>
    <span className="text-6xl mb-4">🏛️</span>
    <div className="text-4xl font-bold mb-1">286920.02</div>
    <p className="text-lg">Total Earnings</p>
  </div>

  {/* Bonus Details Section */}
  <div className="col-span-1 sm:col-span-2 lg:col-span-3 p-6 rounded-lg shadow-md border border-black">
    <h3 className="text-xl font-semibold text-gray-800 mb-6">Bonus Details</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
      {[
        {
          title: "Level Bonus",
          value: 100,
          percent: 0.03,
          color: "#22c55e",
        },
        {
          title: "Upgrade Credits",
          value: 56790.77,
          percent: 19.79,
          color: "#f97316",
        },
        {
          title: "Pool Bonus",
          value: 37529.24,
          percent: 13.08,
          color: "#eab308",
        },
        {
          title: "LTG Bonus",
          value: 192500,
          percent: 67.09,
          color: "#0ea5e9",
        },
        { title: "Defi Bonus", value: 0, percent: 0, color: "#a855f7" },
      ].map((bonus) => (
        <div
          key={bonus.title}
          className="flex flex-col items-center text-center space-y-3"
        >
          <CircularProgress percentage={bonus.percent} color={bonus.color} ticker="crypto" />
          <p className="text-lg font-medium text-gray-700">{bonus.title}</p>
          <p className="text-2xl font-bold text-gray-800">{bonus.value}</p>
          <p className="text-sm text-gray-600">{bonus.percent}% in Bonus</p>
        </div>
      ))}
    </div>
  </div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
  {[
    {
      title: "E-Wallet",
      value: "2389.56",
      desc: "Deposits and Internal Transfers",
      icon: "💳",
    },
    {
      title: "Bonus Wallet",
      value: "178556.89",
      desc: "Level, LTG & Other earnings",
      icon: "🪙",
    },
    {
      title: "Upgrade Credits",
      value: "56788.77",
      desc: "Used to upgrade Ranks",
      icon: "💰",
    },
    {
      title: "Arch Coins",
      value: "36000",
      desc: "Free Air Drop",
      icon: "🎁",
    },
  ].map((item) => (
    <div
      key={item.title}
      className="text-black p-6 rounded-lg border border-black"
    >
      <div className="text-2xl mb-4">{item.icon}</div>
      <h3 className="text-black text-lg mb-2">{item.title}</h3>
      <div className="text-2xl text-black font-bold mb-2">{item.value}</div>
      <div className="text-black text-sm">{item.desc}</div>
    </div>
  ))}
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
  {[
    {
      title: "Game Wallet",
      value: "570",
      desc: "Play Games",
      icon: "🎮",
    },
    {
      title: "Win Wallet",
      value: "509.28",
      desc: "Won on Games",
      icon: "💵",
    },
    { title: "Cticonnect", value: "455.58", desc: "Wallet", icon: "🔄" },
  ].map((item) => (
    <div
      key={item.title}
      className="text-black p-6 rounded-lg text-center border border-black"
    >
      <span className="text-4xl mb-4 block">{item.icon}</span>
      <h3 className="text-black text-lg mb-2">{item.title}</h3>
      <div className="text-2xl text-black font-bold mb-1">{item.value}</div>
      <div className="text-black">{item.desc}</div>
    </div>
  ))}
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Global Pool */}
  <div className="text-black p-6 rounded-lg border border-black">
    <div>Global Pool</div>
    <br />
    <div className="space-y-4">
      <div className="flex justify-between items-center text-gray-400 mb-2">
        <span className="text-black">Total</span>
        <span className="text-pink-500">581885.1</span>
      </div>
      {poolData.map((item) => (
        <div key={item.name} className="flex justify-between items-center">
          <div>
            <div className="text-black">{item.name}</div>
            <div className="text-sm text-black">
              {item.multiplier} × {item.points}
            </div>
          </div>
          <span className="text-black">{item.value}</span>
        </div>
      ))}
    </div>
  </div>

  {/* Estimated ITCs & Points */}
  <div className="text-black p-6 rounded-lg border border-black">
    <div>Estimated ITCs & Points</div>
    <br />
    <div className="space-y-6">
      {poolData.map((item) => (
        <div key={item.name} className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: getColor(item.name) }}
          >
            0
          </div>
          <div className="flex-grow">
            <div className="text-black">{item.name}</div>
            <div className="text-sm text-gray-500">0</div>
          </div>
          <div
            className="px-3 py-1 rounded-full text-sm text-white"
            style={{ backgroundColor: getColor(item.name) }}
          >
            {item.points} Points
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Elite Earnings */}
  <div className="text-black p-6 rounded-lg border border-black">
    <div>Your Elite Earnings</div>
    <br />
    <div className="space-y-4">
      <div className="flex justify-between items-center text-gray-400 mb-2">
        <span className="text-black">Total</span>
        <span className="text-orange-500">0</span>
      </div>
      {poolData.map((item) => (
        <div key={item.name} className="flex justify-between items-center">
          <span className="text-black">{item.name}</span>
          <span className="text-orange-500">0%</span>
        </div>
      ))}
    </div>
  </div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
  {/* Left Column */}
  <div className="space-y-6">
    {/* Referral Link Section */}
    <div className="text-black p-4 rounded-lg border border-black">
      <h3 className="text-black text-base mb-2">Referral Link</h3>
      <div className="flex items-center gap-4">
        <img
          src="/image.png"
          alt="QR Code"
          className="w-24 h-24 border border-gray-200"
        />
        <div className="flex flex-col gap-2 flex-grow">
          <div className="flex items-center justify-between">
            <span className="text-sm">
              https://cticlub.org/register/624515f380c05
            </span>
            <button className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm">
              Copy Link
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Use referral link to build community
          </p>
        </div>
      </div>
    </div>

    {/* Deposits Section */}
    <div className="text-black p-4 rounded-lg border border-black">
      <h3 className="text-black text-lg mb-4">Deposits</h3>
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Please enter number of coins"
          className="flex-grow text-black bg-transparent p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
          Deposit
        </button>
      </div>
      <p className="text-blue-400 mt-4">ITC coins are accepted</p>
    </div>
  </div>

  {/* Recent Bonus Section - Right Column */}
  <div className="text-black p-2 rounded-lg border border-black h-full overflow-y-auto">
    <h3 className="text-sm font-semibold mb-1">Recent Bonus</h3>
    <div className="space-y-1">
      {recentBonuses.map((bonus, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 rounded-lg border"
        >
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-blue-500 rounded-full" />
            <div>
              <div className="text-black text-xs font-semibold">
                {bonus.amount} ITC
              </div>
              <div className="text-gray-700 text-xs">{bonus.date}</div>
            </div>
          </div>
          <div
            className={`px-1.5 py-0.5 rounded-full text-xs text-white ${
              bonus.type === "LTG Bonus" ? "bg-blue-500" : "bg-pink-500"
            }`}
          >
            {bonus.type === "LTG Bonus" ? "LTG" : "Other"}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

<div className="text-black mt-6 border border-black">
  <div className="text-black overflow-hidden">
    <div className="grid grid-rows-2 divide-y text-black">
      <TickerRow
        label="CRYPTO"
        items={cryptoData}
        
       tickerType="crypto"
      />
      <TickerRow
        label="FOREX"
        items={forexData}
         tickerType="forex"
      />
    </div>
  </div>
</div>

<div className="mt-6 text-center text-black">
  <p>Copyright © 2025 ITC CLUB All rights reserved.</p>
</div>

    </div>
  );
};

export default Dashboard;
