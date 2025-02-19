import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "./User/UserContext";
import Header from "./Header";
import PanelSidebar from "./Panel-sidebar";

const Panel = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { users, loading, error, fetchUsers, progress } = useContext(UserContext);

  const [userStats, setUserStats] = useState([
    { label: "Total Users", count: 1234 },
    { label: "Active Users", count: 567 },
    { label: "Inactive Users", count: 432 },
    { label: "Deleted Users", count: 123 },
  ]);

  // Filter and sort users based on the search term
  const filteredUsers = [...users]
    .filter((user) =>
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aStarts = a.fullName?.toLowerCase().startsWith(searchTerm.toLowerCase());
      const bStarts = b.fullName?.toLowerCase().startsWith(searchTerm.toLowerCase());
      
      if (aStarts && !bStarts) return -1; // Put exact matches first
      if (!aStarts && bStarts) return 1;
      return 0;
    });

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const calculateUserStats = () => {
    if (users && users.length > 0) {
      const totalUsers = users.length;
      const activeUsers = users.filter((user) => user.isActive).length;
      const inactiveUsers = users.filter((user) => !user.isActive).length;
      const deletedUsers = users.filter((user) => user.isDeleted).length;

      setUserStats([
        { label: "Total Users", count: totalUsers },
        { label: "Active Users", count: activeUsers },
        { label: "Inactive Users", count: inactiveUsers },
        { label: "Deleted Users", count: deletedUsers },
      ]);
    }
  };

  useEffect(() => {
    calculateUserStats();
  }, [users]);

  return (
    <div className="min-h-screen bg-[#FAE9D7] flex flex-col relative">
      <Header setSearchTerm={setSearchTerm} />

      {loading && (
        <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
          <div
            className="h-full bg-[#FF6600] transition-all duration-200 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      <div className="flex flex-1 flex-col lg:flex-row">
        <PanelSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

        <main
          className={`flex-1 sm:mt-[80px] mt-[80px] p-4 transition-all duration-300 ${
            isMenuOpen ? "lg:ml-[340px] lg:w-[calc(100%-320px)]" : "ml-[0px] sm:ml-[100px] w-full"
          }`}
        >
          {loading ? (
            <p>Loading users...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <div>
                {/* User Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {userStats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow flex items-center space-x-4"
                    >
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <i className="ri-user-line"></i>
                      </div>
                      <div>
                        <div className="font-bold">{stat.count}</div>
                        <div className="text-sm text-gray-500">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* User List Table */}
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="px-2 border-b">
                        <th className="p-2 text-left">NAME ▼</th>
                        <th className="p-2 text-left">STATUS ▼</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2">
                              <Link
                                to={`/user/${user.userId}`}
                                state={{ PlayBoy: user }}
                                className="flex items-center space-x-2"
                              >
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                  <i className="ri-user-line"></i>
                                </div>
                                <span className="truncate">{user.fullName || user.name}</span>
                              </Link>
                            </td>
                            <td className="p-2">
                              <span
                                className={
                                  user.isActive ? "text-green-500" : "text-red-500"
                                }
                              >
                                {user.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={2} className="p-2 text-center">
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Panel;
