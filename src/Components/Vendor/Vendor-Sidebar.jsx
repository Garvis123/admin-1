import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { VendorContext } from "./VendorContext";

const VendorSidebar = ({ isMenuOpen, toggleMenu, id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentItems, setCurrentItems } = useContext(VendorContext);
  console.log(currentItems);
  
  const user = currentItems.find((item) => item.outletId === id);
// console.log(user);
const fullName = user ? user.fullName : "User not found";
  // const { currentItems } = useContext(VendorContext); // Access the context

  // useEffect(() => {
  //   console.log("Vendor context in Sidebar:", { user, currentItems });
  // }, [user, currentItems]);

  const tabs = [
    { key: "profile", label: "Profile", route: `/vendor/profile/${id}` },
    { key: "mealPlans", label: "Meal Plans", route: `/vendor/mealPlan/${id}` },
    { key: "TotalUser", label: "Total User", route: `/vendor/totalUser/${id}` },
    { key: "oneTimeOrder", label: "One Time Order", route: `/vendor/Order/${id}` },
    { key: "plans", label: "Plans", route: `/vendor/plans/${id}` },
    { key: "wallet", label: "Wallet", route: `/vendor/wallet/${id}` },
    { key: "allQuery", label: "All Query", route: `/vendor/query/${id}` },
    { key: "allDocuments", label: "All Documents", route: `/vendor/documents/${id}` },
  ];

  const getActiveTab = () => {
    const activeTab = tabs.find((tab) => location.pathname.includes(tab.route));
    return activeTab ? activeTab.key : null;
  };

  const activeTab = getActiveTab();

  return (
    <>
      <aside
       className={`fixed top-[75px] left-0 h-[calc(100vh-75px)] w-[80%] sm:w-[280px] md:w-[320px] bg-[#fae9d7] border-r-2 border-white z-40 p-4 space-y-4 transform transition-transform duration-300 ease-out ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      >
        <div className="flex justify-between items-center">
          <div className="text-lg md:text-xl font-semibold">
            <Link to={`/panel`}>Admin</Link> &gt; <Link to={`/vendor`}>Vendor</Link> &gt; <Link to={`/vendor/profile/${id}`}> {fullName.split(" ")[0]}</Link>
          </div>
          <button onClick={toggleMenu} className="text-2xl px-3 py-2 text-[#727272] bg-white shadow rounded-full z-50">
            <i className="ri-menu-line"></i>
          </button>
        </div>

        <nav className="space-y-2 md:space-y-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => navigate(tab.route)}
              className={`w-full text-left py-2 px-4 rounded ${
                activeTab === tab.key ? "bg-[#FF6600] text-white" : "bg-white hover:bg-gray-100"
              } transition-colors duration-200`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>
     
      {!isMenuOpen && (
        <div className="h-[calc(100vh-75px)] w-[0px] sm:w-[90px] border-white sm:border-r-2">
          <button
            className="sm:mt-[100px] mt-5 ml-4 sm:ml-5 px-3 py-2 text-[#727272] bg-white shadow rounded-full"
            onClick={toggleMenu}
          >
            <i className="ri-menu-line text-2xl"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default VendorSidebar;
