import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';
import { UserContext } from './UserContext';

const Sidebar = ({ isMenuOpen, toggleMenu, id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { users } = useContext(UserContext);
  const user = users.find((item) => item.userId === id);
  const fullName = user ? user.fullName : "User not found";

  const tabs = [
    { key: 'profile', label: 'Profile', route: `/user/${id}` },
    { key: 'mealPlans', label: 'Meal Plans', route: `/meal/${id}` },
    { key: 'oneTimeOrder', label: 'One Time Order', route: `/order/${id}` },
    { key: 'plans', label: 'Plans', route: `/plans/${id}` },
    { key: 'wallet', label: 'Wallet', route: `/wallet/${id}` },
    { key: 'allQuery', label: 'All Query', route: `/query/${id}` },
  ];

  const getActiveTab = () => {
    const activeTab = tabs.find(tab => window.location.pathname.includes(tab.route));
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
            <Link className="cursor-pointer" to={`/panel`}>Admin</Link> &gt; 
            <Link className="cursor-pointer" to={`/user/${id}`}> User</Link> &gt; 
            <Link className="cursor-pointer" to={`/user/${id}`}>
              {fullName.split(" ")[0]}
            </Link>            
          </div>
          <button
            onClick={toggleMenu}
            className="text-2xl px-3 py-2 text-[#727272] bg-white shadow rounded-full z-50"
          >
            <i className="ri-menu-line"></i>
          </button>
        </div>

        <nav className="space-y-2 md:space-y-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => navigate(tab.route)}
              className={`w-full text-left py-2 px-4 rounded ${
                activeTab === tab.key
                  ? 'bg-[#FF6600] text-white'
                  : 'bg-white hover:bg-gray-100'
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

export default Sidebar;