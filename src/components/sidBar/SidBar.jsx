import { BsStars } from "react-icons/bs";
import { LuBuilding2 } from "react-icons/lu";
import { NavLink } from "react-router";
import { IoEarthOutline } from "react-icons/io5";
import { MdSaveAlt } from "react-icons/md";

const navItems = [
  { to: "/", icon: LuBuilding2, label: "Feed" },
  { to: "/user-posts", icon: BsStars, label: "My Posts" },
  { to: "/community", icon: IoEarthOutline, label: "Community" },
  { to: "/saved", icon: MdSaveAlt, label: "Saved" },
];

const SidBar = () => {
  return (
    <aside className="w-full md:w-60 mx-auto shrink-0 bg-white rounded-3xl shadow-sm border border-gray-200 py-5 px-4">

     
      <nav className="grid grid-cols-2 gap-4 md:flex md:flex-col">

        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start 
               gap-2 md:gap-3 px-3 py-4 md:py-2 rounded-xl transition-colors
               ${
                 isActive
                   ? "bg-blue-100 text-blue-600"
                   : " text-gray-600 hover:bg-gray-200"
               }`
            }
          >
            <span className="w-9 h-9 rounded-full flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6" />
            </span>

            <span className="font-bold text-[16px] md:text-[18px]">
              {label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SidBar;