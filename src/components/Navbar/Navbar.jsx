import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Avatar,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FiUser, FiHome } from "react-icons/fi";
import { LuMessageCircle } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { Link, NavLink } from "react-router";
import icon from "../../assets/route.png";

const NavbarComp = () => {
  const { userData, setToken, setUserData } = useContext(AuthContext);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setToken(null);
    setUserData(null);
  }

  return (
    <Navbar
      maxWidth="full"
      className="w-full px-4 md:px-8 bg-white shadow-sm overflow-x-hidden"
    >
      {/* Left */}
      <NavbarContent justify="start">
        <NavbarBrand className="flex items-center gap-2">
          <img src={icon} className="w-10 h-10 rounded-xl" />
          <h1 className="font-bold text-lg hidden sm:block">
            Route Posts
          </h1>
        </NavbarBrand>
      </NavbarContent>

      {/* Center */}
      <NavbarContent justify="center" className="flex-1">
        <div className="flex items-center gap-4 md:gap-6 bg-[#f8fafc] border border-gray-200 px-3 md:px-4 py-2 md:py-3 rounded-2xl">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 font-medium ${
                isActive ? "text-blue-600" : "text-gray-600"
              }`
            }
          >
            <FiHome size={20} />
            <span className="hidden md:block">Feed</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 font-medium ${
                isActive ? "text-blue-600" : "text-gray-600"
              }`
            }
          >
            <FiUser size={20} />
            <span className="hidden md:block">Profile</span>
          </NavLink>

          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `flex items-center gap-2 font-medium ${
                isActive ? "text-blue-600" : "text-gray-600"
              }`
            }
          >
            <LuMessageCircle size={20} />
            <span className="hidden md:block">Notifications</span>
          </NavLink>
        </div>
      </NavbarContent>

      {/* Right */}
      <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="flex items-center gap-2 md:gap-3 bg-gray-100 px-3 md:px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition">

              <Avatar
                size="sm"
                src={userData?.profilePicture || "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"}
              />

              <span className="font-medium text-sm hidden md:block">
                {userData?.username || "Guest"}
              </span>

              <Button
                isIconOnly
                variant="light"
                size="sm"
                className="text-lg pointer-events-none"
              >
                ☰
              </Button>

            </div>
          </DropdownTrigger>

          <DropdownMenu
            aria-label="User menu"
            className="w-56 rounded-lg shadow-lg p-2"
          >
            <DropdownItem
              key="profile"
              as={Link}
              to="/profile"
              startContent={<FiUser size={20} />}
            >
              Profile
            </DropdownItem>

            <DropdownItem
              key="settings"
              as={Link}
              to="/settings"
              startContent={<CiSettings size={20} />}
            >
              Settings
            </DropdownItem>

            <DropdownItem
              key="logout"
              onClick={handleLogout}
              className="bg-[#fff1f2] border-t border-gray-200 mt-2"
            >
              <span className="text-[#ec003f] font-bold">
                Logout
              </span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarComp;