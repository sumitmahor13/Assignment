import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineShoppingBag } from "react-icons/md";
import { HiOutlineHeart, HiOutlineUser } from "react-icons/hi";
import Sidebar from "./Sidebar";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { input, setInput } = useContext(AppContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { totalItems } = useSelector((state) => state.cart);

  return (
    <>
      <div className="header bg-white sticky top-0 z-50 shadow-md">
        <div className="flex flex-wrap justify-between items-center w-10/12 m-auto">
          <div className="relative text-gray-400 text-sm">
            <CiSearch
              size={20}
              className="text-gray-600 absolute right-2 top-2.5"
            />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Search Anything.."
              className="border outline-none py-2 pl-4 rounded-lg"
            />
          </div>
          <div>
            <Link to="/">
              <div class="logo">Helenndo</div>
            </Link>
          </div>
          <li className="flex">
            <Link onClick={toggleSidebar} className="mr-5 text-2xl">
              <HiOutlineHeart />
            </Link>
            <Link className=" mr-5 text-2xl">
              <HiOutlineUser />
            </Link>
            <Link onClick={toggleSidebar} className="relative mr-5 text-2xl">
              <MdOutlineShoppingBag />
              <div className="items_count ">
                <span className="text-white">{totalItems}</span>
              </div>
            </Link>
          </li>
        </div>
      </div>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        closeSidebar={() => toggleSidebar()}
      />
    </>
  );
};

export default Header;
