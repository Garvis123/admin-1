import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const UserContext = createContext();

// Context provider component
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]); // State to store users data
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // State for error
  const [progress, setProgress] = useState(0); // State for progress

  // Function to fetch users data from the API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    setProgress(0); 

    let interval; // Declare interval in the outer scope

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      // Start a progress interval
      interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev)); // Increment progress until 90%
      }, 200);

      const response = await fetch('https://aharkosh-backend.onrender.com/api/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      // console.log(data);
      

      if (response.ok) {
        setUsers(data.data.users || []); // Assuming the user data is in data.data.users
        setProgress(100); // Complete progress
      } else {
        setError(data.message || 'Failed to fetch users');
        setProgress(100); // Complete progress on error
      }
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
      setProgress(100); // Complete progress on error
    } finally {
      if (interval) clearInterval(interval); // Clear the interval
      setLoading(false); // Set loading to false
      setTimeout(() => setProgress(0), 500); // Reset progress after a short delay
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, loading, error, fetchUsers, progress }}>
      {children}
    </UserContext.Provider>
  );
};
