import React, { createContext, useState, useEffect } from 'react';

export const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  // Initialize state with data from localStorage if available
  const [currentItems, setCurrentItems] = useState(() => {
    const savedData = localStorage.getItem('vendors');
    return savedData ? JSON.parse(savedData) : [];
  });

  // Function to fetch data from an API or other source
  const fetchVendors = async () => {
    try {
      const response = await fetch('/api/vendors'); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch vendors');
      }
      const data = await response.json();
      setCurrentItems(data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  // Fetch data when the context initializes, only if `currentItems` is empty
  useEffect(() => {
    if (!currentItems.length) {
      fetchVendors();
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (currentItems.length) {
      localStorage.setItem('vendors', JSON.stringify(currentItems));
    }
  }, [currentItems]);

  return (
    <VendorContext.Provider value={{ currentItems, setCurrentItems }}>
      {children}
    </VendorContext.Provider>
  );
};
