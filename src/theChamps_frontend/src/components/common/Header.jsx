import React, { useState, useEffect } from "react";

// import { FiShoppingCart } from "react-icons/fi";
import { FaWallet } from "react-icons/fa";
import Sidebar from "./Sidebar";
// import { GiHamburgerMenu, GiToaster } from "react-icons/gi";
// import {
//   ConnectButton,
//   ConnectDialog,
//   useConnect,
//   useDialog,
// } from "@connect2ic/react";
// import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  useAnimation,
  useMotionValueEvent,
  useScroll,
  motion,
} from "framer-motion";
import { HiOutlineBars4 } from "react-icons/hi2";

const Header = () => {
  const controls = useAnimation();
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const sideNavToggle = () => {
    setIsSidenavOpen((prev) => !prev);
    if (isSidenavOpen) {
      controls.start({ x: 288, transition: { duration: 0.4 } });
      document.documentElement.style.overflowY = "auto";
    } else {
      controls.start({ x: 0, transition: { duration: 0.4 }, opacity: 1 });
      document.documentElement.style.overflow = "hidden";
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 1024) {
      if (isSidenavOpen) {
        controls.start({ x: 0, transition: { duration: 0.3 } });
      } else {
        controls.start({ x: 288, transition: { duration: 0.3 } });
      }
    } else {
      controls.start({ x: 288, transition: { duration: 0.3 } });
      setIsSidenavOpen(false);
    }
  }, [windowWidth]);

  return (
    <>
      <div className="flex flex-col z-50 overflow-hidden">
        <motion.div
          className={`sticky top-0 px-6 md:px-24 max-h-24 min-h-24 flex items-center h-full w-screen ${
            isSidenavOpen ? "bg-white" : "bg-transparent"
          }`}
        >
          <div className="flex justify-between w-full items-center">
            <HeaderContent />
            <HeaderIcon onToggle={sideNavToggle} />
          </div>
        </motion.div>
        <HeaderClone onToggle={sideNavToggle} isSidenavOpen={isSidenavOpen} />
        <motion.div
          className="fixed bg-white right-0 max-w-72 min-w-72 mt-24 z-50 flex scrollBox"
          animate={controls}
          initial={{ opacity: 0 }}
        >
          <Sidebar />
        </motion.div>
      </div>
      {isSidenavOpen ? (
        <div className="h-screen w-screen fixed bg-[rgba(0,0,0,0.5)] z-40 overflow-hidden"></div>
      ) : null}
    </>
  );
};

const HeaderContent = () => {
  return (
    <div className="flex items-center w-full">
      <div className="text-3xl font-black font-orbitron">CHAMPS</div>
      <div className="flex w-full justify-center items-center">
        <div className="hidden lg:flex justify-center w-full">
          <NavLinkItem to="/" text="Home" />
          {["Collection", "About", "Contact"].map((item, index) => (
            <NavLinkItem
              key={index}
              to={"/" + item.toLowerCase()}
              text={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const NavLinkItem = ({ to, text }) => {
  return (
    <Link to={to} className={`px-6 py-3 font-bold home-navigation rounded-lg`}>
      {text}
    </Link>
  );
};

const HeaderIcon = ({ onToggle }) => {
  return (
    <div className="flex items-center">
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="min-w-max px-4 md:px-7 py-2 rounded-md cursor-pointer button flex"
        onClick={onToggle}
      >
        <FaWallet size={24} color="white" />
      </motion.div>
      <span className="lg:hidden cursor-pointer  hover:bg-gray-300 rounded-full p-2 transition-all duration-200">
        <HiOutlineBars4 size={32} />
      </span>
    </div>
  );
};

const HeaderClone = ({ onToggle, isSidenavOpen }) => {
  const { scrollY } = useScroll();
  const controls = useAnimation();

  useMotionValueEvent(scrollY, "change", (scrollVal) => {
    if (scrollVal > 0) {
      controls.start({ y: 0, opacity: 1, transition: { duration: 0.3 } });
    } else {
      controls.start({ y: -200, opacity: 0 });
    }
  });

  return (
    <motion.div
      className="flex flex-col fixed z-50"
      animate={controls}
      initial={{ y: -200 }}
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(15px)",
      }}
    >
      <div
        className={`top-0 px-6 md:px-24 max-h-24 min-h-24 w-screen flex items-center ${
          isSidenavOpen ? "bg-white" : ""
        }`}
      >
        <div className="flex justify-between w-full items-center">
          <HeaderContent />
          <HeaderIcon onToggle={onToggle} />
        </div>
      </div>
    </motion.div>
  );
};

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [colorChange, setColorchange] = useState(false);
//   const { isConnected, disconnect } = useConnect();

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     setIsSidebarOpen(false);
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//     setIsMenuOpen(false);
//   };

//   const changeNavbarColor = () => {
//     if (window.scrollY >= 80) {
//       setColorchange(true);
//     } else {
//       setColorchange(false);
//     }
//   };

//   window.addEventListener("scroll", changeNavbarColor);

//   // useEffect(() => {
//   //   // Disable scroll when modal is open
//   //   if (isSidebarOpen) {
//   //     document.body.style.overflow = "hidden";
//   //   } else {
//   //     document.body.style.overflow = "auto";
//   //   }

//   //   // Cleanup: Enable scroll when component unmounts
//   //   return () => {
//   //     document.body.style.overflow = "auto";
//   //   };
//   // }, [isSidebarOpen]);

//   return (
//     <div className="relative z-[35]">
//       <div className="w-full">
//         {/* {isSidebarOpen && (
//           <div
//             className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-25"
//             onClick={toggleSidebar}
//           ></div>
//         )} */}
//         <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />{" "}
//       </div>
//       {/* Move Sidebar outside of header */}
//       <div
//         className={`top-0 left-0 fixed right-0 flex flex-wrap justify-between items-center z-30 px-6 lg:px-24 py-7 ${
//           colorChange ? "page-header" : ""
//         } ${
//           isSidebarOpen || isMenuOpen ? "bg-white shadow-md" : "bg-transparent"
//         }`}
//         style={{
//           boxShadow: isSidebarOpen
//             ? " 0px -4px 10px rgba(0, 0, 0, 0.4)"
//             : "none",
//         }}
//       >
//         <h1 className="text-3xl font-bold font-orbitron">CHAMPS</h1>
//         <div className=" mr-8  justify-center items-center nav-menu  md:block hidden">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive
//                 ? "nav-link font-bold tracking-wider text-gray-900"
//                 : "nav-link font-semibold tracking-wider text-gray-900"
//             }
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/collection"
//             className={({ isActive }) =>
//               isActive
//                 ? "nav-link font-bold tracking-wider text-gray-900"
//                 : "nav-link font-semibold tracking-wider text-gray-900"
//             }
//           >
//             Collection
//           </NavLink>
//           <NavLink
//             to="/about"
//             className={({ isActive }) =>
//               isActive
//                 ? "nav-link font-bold tracking-wider text-gray-900"
//                 : "nav-link font-semibold tracking-wider text-gray-900"
//             }
//           >
//             About
//           </NavLink>
//           <NavLink
//             to="/contact"
//             className={({ isActive }) =>
//               isActive
//                 ? "nav-link font-bold tracking-wider text-gray-900"
//                 : "nav-link font-semibold tracking-wider text-gray-900"
//             }
//           >
//             Contact
//           </NavLink>
//           <div class="animation rounded-xl"></div>
//         </div>
//         <div className="md:hidden">
//           <button className="text-2xl focus:outline-none" onClick={toggleMenu}>
//             <GiHamburgerMenu />
//           </button>
//         </div>
//         <div className="flex gap-7 text-center items-center">
//           <button
//             onClick={toggleSidebar}
//             className="flex gap-3 text-lg items-center border border-black rounded-md px-8 py-2"
//           >
//             <FaWallet size={24} />
//           </button>
//         </div>
//       </div>
//       {isMenuOpen && (
//         <div className="z-40 md:hidden fixed top-24 left-100 h-screen right-0 flex flex-col w-[38%] bg-white px-8 py-4">
//           <ul className="flex flex-col gap-4 text-lg text-left font-bold">
//             <Link to="/">Home</Link>
//             <Link to="/collection">Collection</Link>
//             <Link to="/about">About</Link>
//             <Link to="/contact">contact</Link>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

export default Header;
