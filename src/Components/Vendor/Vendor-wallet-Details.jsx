import React from "react";
import Header from "../Header";
import { useLoaderData, useLocation, useNavigate,useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import VendorSidebar from './Vendor-Sidebar'

const VendorWalletDetails = () => {
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [VendorWallet,setVendorWallet]=useState(null);
  const location=useLocation();
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  
     useEffect(() => {
       if (location.state && location.state.VendorWallet) {
         setVendorWallet(location.state.VendorWallet);
       } else {
         console.error("No VendorWallet data in location.state");
       }
     }, [location.state]);
   console.log(VendorWallet);
  return (
    <div className="min-h-screen bg-[#fae9d7] text-black  ">
      {/* Header */}
      <Header />
    

      {/* Wallet Details */}

      <div className="flex flex-1 overflow-hidden">
      <VendorSidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} id={id} />
  
     <main className={`flex-1 mt-[80px] p-4 transition-all duration-300 
  ${isMenuOpen ? 'lg:ml-[340px]  lg:w-[calc(100%-320px)]' : 'lg:ml-0 lg:w-full'}
  ${isMenuOpen ? 'sm:px-4' : 'sm:px-4'} flex flex-col overflow-hidden`}>
     <div className="bg-white p-4 rounded-md shadow mt-3">
          <h2 className="text-lg font-semibold mb-4">Wallet Information</h2>
          <p className="mb-2">Transaction Id: <span className="font-medium">{VendorWallet?._id}</span></p>
          <p className="mb-2">Transaction Date: <span className="font-medium">{new Date(VendorWallet?.createdOn).toLocaleDateString("en-GB")}  </span></p>
          <p className="mb-2">Transaction Time: <span className="font-medium">{new Date(VendorWallet?.createdOn).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true })}</span></p>
          <p className="mb-2">Transaction Name: <span className="font-medium">{VendorWallet?.transactionName}</span></p>
          <p className="mb-2">Transaction Amount: <span className="font-medium">{VendorWallet?.amountTransaction}</span></p>
          <p>
  Transaction Status:{" "}
  <span
  className={`${VendorWallet?.transactionType === "CREDIT" ? "font-medium text-green-600" : VendorWallet?.transactionType === "DEBIT" ? "font-medium text-red-600" : "font-medium text-orange-500"}`}
>
  {VendorWallet?.transactionType}
</span>

</p>;

        </div>
    

      {/* Query Sequence */}
      <section className="bg-white p-4 rounded-md shadow mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Query Sequence</h2>
          <button className="px-4 py-2 border rounded-md">Sort By</button>
        </div>
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="py-2">QUERY ID</th>
              <th>DATE</th>
              <th>TIME</th>
              <th>QUERY</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 ">#54264</td>
                <td className="">12/JAN/2024</td>
                <td>5:00 AM</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
     </main>
      </div>
    </div>
  );
};

export default VendorWalletDetails;
