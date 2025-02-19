import Header from "../Header"
import { Link } from "react-router-dom"
import { ArrowLeft, Bell } from "lucide-react"

const AllVendorPanel = () => {
  return (
    <div className="min-h-screen bg-[#Fae9d7] p-4">
      <Header />

      <div className="mt-[30px] mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center justify-between md:justify-start w-full md:w-auto">
          <button className="p-3 rounded-full bg-white">
            <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button className="md:hidden p-3 rounded-full bg-white">
            <Bell className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full md:flex-1">
          {["Total Vendors", "Active Vendors", "Non Active Vendors", "Deleted Vendor"].map((title, index) => (
            <div key={index} className="bg-white p-3 md:p-4 rounded-md shadow flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">👤</div>
              <div>
                <p className="text-base md:text-lg font-bold">1234</p>
                <p className="text-gray-500 text-xs">{title}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="hidden md:block p-3 rounded-full bg-white">
          <Bell className="w-8 h-8" />
        </button>
      </div>

      <div className="bg-white p-4 rounded-md shadow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              {["VENDOR ID", "VENDOR NAME", "OUTLET NAME", "MOBILE NO.", "STATUS"].map((heading, index) => (
                <th key={index} className="p-2 border-b text-xs md:text-sm">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(7)
              .fill()
              .map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">
                    <Link to={`/manager/vender/profile/:id`} className="text-xs md:text-sm">
                      #1234
                    </Link>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <img src="/placeholder.svg?height=40&width=40" alt="Vendor" className="rounded-full w-8 h-8" />
                      <span className="text-xs md:text-sm">JOSE D</span>
                    </div>
                  </td>
                  <td className="p-2 text-xs md:text-sm">CHULHE DA DHABA</td>
                  <td className="p-2 text-xs md:text-sm">8982825992</td>
                  <td className="p-2 text-green-500 text-xs md:text-sm">Open</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        <button className="p-2 bg-gray-200 rounded">&lt;</button>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <button key={num} className={`p-2 rounded ${num === 1 ? "bg-orange-500 text-white" : "bg-white"}`}>
            {num}
          </button>
        ))}
        <button className="p-2 bg-gray-200 rounded">&gt;</button>
      </div>
    </div>
  )
}

export default AllVendorPanel