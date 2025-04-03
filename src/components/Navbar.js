



"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BellIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const pathname = usePathname();
  const [cryptoPrices, setCryptoPrices] = useState({ bitcoin: {}, ethereum: {} });
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  useEffect(() => {
    // const eventSource = new EventSource("http://localhost:5000/api/notifications");
    const eventSource = new EventSource("https://cryptonexsus.onrender.com/api/notifications");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prev) => [data, ...prev]);
      setHasNewNotification(true);
    };

    return () => eventSource.close();
  }, []);

  // Function to toggle dropdown & mark notifications as read
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
    setHasNewNotification(false);
  };

  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Navigation Links */}
      <nav className="flex space-x-6">
        <Link href="/" className={pathname === "/" ? "text-green-400 font-bold" : "text-green-300"}>
        Dashboard
      </Link>
        <Link href="/weather" className={pathname === "/weather" ? "text-blue-400 font-bold" : "text-blue-300"}>
          Weather
        </Link>
        <Link href="/crypto" className={pathname === "/crypto" ? "text-yellow-400 font-bold" : "text-yellow-300"}>
          Crypto
        </Link>
        <Link href="/news" className={pathname === "/news" ? "text-red-400 font-bold" : "text-red-300"}>
          News
        </Link>
      </nav>

      {/* Notification Bell */}
      <div className="relative">
        <button onClick={toggleDropdown} className="relative focus:outline-none">
          <BellIcon className="h-6 w-6 text-white" />
          {hasNewNotification && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
          )}
        </button>

        {/* Notification Dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
            <h3 className="font-bold text-gray-700">Notifications</h3>
            {notifications.length > 0 ? (
              <ul className="mt-2">
                {notifications.slice(0, 5).map((notification, index) => (
                  <li key={index} className="p-2 border-b last:border-none text-sm text-gray-600">
                    {notification.type === "price_alert" ? (
                      <>
                        🚀 BTC: ${notification.bitcoin.usd.toFixed(2)} | ETH: ${notification.ethereum.usd.toFixed(2)}
                      </>
                    ) : (
                      <>⚠️ Weather Alert: {notification.weather}</>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No new notifications</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;


// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";

// const Navbar = () => {
//   const pathname = usePathname();
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const ws = new WebSocket("wss://your-project.vercel.app/api/notifications");

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);

//       if (data.type === "price_alert") {
//         setNotifications((prev) => [...prev, `BTC: $${data.bitcoin.usd.toFixed(2)} | ETH: $${data.ethereum.usd.toFixed(2)}`]);
//       }
//     };

//     return () => ws.close();
//   }, []);

//   return (
//     <>
//       <nav className="bg-gray-800 p-4 flex justify-center space-x-6">
//       <Link href="/" className={pathname === "/" ? "text-green-400 font-bold" : "text-green-300"}>
//        Dashboard
//        </Link>
//         <Link href="/weather" className={pathname === "/weather" ? "text-blue-400 font-bold" : "text-blue-300"}>Weather</Link>
//         <Link href="/crypto" className={pathname === "/crypto" ? "text-yellow-400 font-bold" : "text-yellow-300"}>Crypto</Link>
//         <Link href="/news" className={pathname === "/news" ? "text-red-400 font-bold" : "text-red-300"}>News</Link>

//         {/* 🔔 Bell Icon for Notifications */}
//         <div className="relative">
//           <button className="text-white text-xl">🔔</button>
//           {notifications.length > 0 && (
//             <div className="absolute bg-gray-700 text-white text-sm p-2 rounded mt-2 w-48">
//               {notifications.slice(-5).map((notif, index) => (
//                 <div key={index} className="border-b py-1">{notif}</div>
//               ))}
//             </div>
//           )}
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;
