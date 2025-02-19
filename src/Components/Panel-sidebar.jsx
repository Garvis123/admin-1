import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PanelSidebar = ({ isMenuOpen, toggleMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { key: "profile", label: "User", route: `/panel` },
    { key: "oneTimeOrder", label: "Vendor", route: `/vendor` },
    { key: "mealPlans", label: "Delivery", route: `/delivery` },
    { key: "Vendermangement", label: "Vender Manager", route: `/manager` },
  ];

  const getActiveTab = () => {
    const activeTab = tabs.find((tab) => location.pathname.includes(tab.route));
    return activeTab ? activeTab.key : null;
  };

  const activeTab = getActiveTab();

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-[75px] left-0 h-[calc(100vh-75px)] w-[80%] sm:w-[280px] md:w-[320px] bg-[#fae9d7] border-r-2 border-white z-40 p-4 space-y-4 transform transition-transform duration-300 ease-out  
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} sm:${isMenuOpen ? "translate-x-0 " : "-translate-x-full "}`}
      >
        <div className="flex justify-between items-center">
          <div className="text-lg md:text-xl font-semibold">Admin Panel</div>
          <button
            onClick={toggleMenu}
            className="text-2xl px-3 py-2 text-[#727272] bg-white shadow rounded-full z-50 "
          >
            <i className="ri-menu-line"></i>
          </button>
        </div>

        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                navigate(tab.route);
                if (window.innerWidth < 640) {
                  toggleMenu();
                }
              }}
              className={`w-full text-left py-2 px-4 rounded ${
                activeTab === tab.key
                  ? "bg-[#FF6600] text-white"
                  : "bg-white hover:bg-gray-100"
              } transition-colors duration-200`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Sidebar Toggle Button */}
      {!isMenuOpen && (
        <div className="fixed top-[75px] left-0 h-[calc(100vh-75px)] w-[0px] sm:w-[90px] border-white border-r-2 outline-none bg-[#fae9d7] sm:block hidden">
          <button
            className="mt-[30px] ml-[20px] px-3 py-2 text-[#727272] bg-white shadow rounded-full z-50"
            onClick={toggleMenu}
          >
            <i className="ri-menu-line text-2xl"></i>
          </button>
        </div>
      )}

      {/* Mobile Toggle Button */}
      <button
        className={`fixed top-[90px] left-4 px-3 py-2 text-[#727272] bg-white shadow rounded-full z-50 sm:hidden ${
          isMenuOpen ? "hidden" : "block"
        }`}
        onClick={toggleMenu}
      >
        <i className="ri-menu-line text-2xl"></i>
      </button>
    </>
  );
};

export default PanelSidebar;
