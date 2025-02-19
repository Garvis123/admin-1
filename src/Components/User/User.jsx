"use client";

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import Header from "../Header";
import Sidebar from "./Sidebar";

const User = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { users, fetchUsers } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const user = users.find((item) => item.userId === id) || {};

  useEffect(() => {
    if (!users.length) fetchUsers();
  }, [users, fetchUsers]);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setLoading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-[#FAE9D7] flex flex-col relative">
      <Header />

      {loading && (
        <div className="fixed top-0 left-0 w-full h-2 bg-gray-200">
          <div
            className="h-full bg-[#FF6600] transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />

        {/* Main Content */}
        <div
          className={`flex-1 mt-[80px] p-4 transition-all duration-300 ${
            isMenuOpen ? "lg:ml-[340px] lg:w-[calc(100%-320px)]" : "ml-0 w-full"
          }`}
        >
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Profile Picture */}
              <div className="flex-shrink-0 flex justify-center lg:justify-start">
                <div className="w-24 h-24 lg:w-36 lg:h-36 bg-gray-300 rounded-full"></div>
              </div>

              {/* User Details */}
              <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.keys(user).length > 0 ? (
                  <>
                    <InputField label="Full Name" value={user.fullName} />
                    <InputField label="Email" value={user.email} />
                    <SelectField label="Gender" value={user.gender} options={["Male", "Female", "Other"]} />
                    <DateOfBirthField day={user.dobDay} month={user.dobMonth} year={user.dobYear} />
                  </>
                ) : (
                  <p>Loading user data...</p>
                )}
              </div>
            </div>

            {/* Subscription Section */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              <SubscriptionCard title="Subscribe Plan" planId="#895252" startDate="02/Jan/2024" endDate="02/Jan/2024" />
              <SubscriptionCard title="Subscribe Outlet" planId="#895252" startDate="02/Jan/2024" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input className="w-full px-3 py-2 border rounded-md" defaultValue={value} disabled />
  </div>
);

const SelectField = ({ label, value, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select className="w-full px-3 py-2 border rounded-md bg-white" defaultValue={value} disabled>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const DateOfBirthField = ({ day, month, year }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
    <div className="flex gap-2">
      <select className="w-1/3 px-3 py-2 border rounded-md bg-white" defaultValue={month}>
        <option>{month}</option>
      </select>
      <select className="w-1/3 px-3 py-2 border rounded-md bg-white" defaultValue={day}>
        <option>{day}</option>
      </select>
      <select className="w-1/3 px-3 py-2 border rounded-md bg-white" defaultValue={year}>
        <option>{year}</option>
      </select>
    </div>
  </div>
);

const SubscriptionCard = ({ title, planId, startDate, endDate }) => (
  <div className="bg-[#FFF5EB] p-4 rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>Plan ID -</span>
        <span className="font-semibold">{planId}</span>
      </div>
      <div className="flex justify-between">
        <span>Start Date -</span>
        <span className="font-semibold">{startDate}</span>
      </div>
      {endDate && (
        <div className="flex justify-between">
          <span>End Date -</span>
          <span className="font-semibold">{endDate}</span>
        </div>
      )}
    </div>
  </div>
);

export default User;
