import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null); // State for popup message

  const navigate = useNavigate(); // Create a navigate function

  const handleLogin = async (e) => {
    e.preventDefault() ;
    setLoading(true);
    setError(null);
    setPopupMessage(null); // Reset popup before new login attempt

    const loginData = { email, password };

    try {
      const response = await fetch('https://aharkosh-backend.onrender.com/api/admin/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && data.success) {
        setPopupMessage({ type: 'success', text: 'Login successful!' });
        localStorage.setItem('token', data.data.token);
        navigate('/panel');

        setTimeout(() => setPopupMessage(null), 3000);
      } else {
        setError(data.message || 'Something went wrong');
        setPopupMessage({ type: 'error', text: data.message || 'Something went wrong!' });

        setTimeout(() => setPopupMessage(null), 3000);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setPopupMessage({ type: 'error', text: 'Network error. Please try again.' });

      setTimeout(() => setPopupMessage(null), 3000);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fae8d5] p-4 sm:p-6 relative">
      <div className="bg-white p-9 overflow-hidden rounded-lg shadow-2xl max-w-sm sm:w-[27%]  md:max-w-md lg:max-w-lg transform transition duration-500 hover:scale-105">
        
        <div className="text-center ">
        <svg className="sm:flex ml-[-83px] sm:h-[30px] sm:ml-[-60px]  sm:mb-2" width="452" height="35" viewBox="0 0 452 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M339.862 72.5215C339.614 72.9747 339.366 73.4243 339.118 73.8775C331.969 86.7284 322.848 99.5575 322.848 99.5575C322.848 99.5575 315.395 89.0749 308.685 77.569C307.91 76.2386 307.146 74.8936 306.406 73.5485C309.313 76.1838 315.483 78.0003 322.624 78.0003C330.561 78.0003 337.299 75.7562 339.686 72.6421C339.746 72.6056 339.806 72.5617 339.862 72.5215Z" fill="url(#paint0_linear_1_5790)"/>
        <path d="M38.9259 61.328H18.4899L15.2139 71H1.25191L21.0639 16.244H36.5079L56.3199 71H42.2019L38.9259 61.328ZM35.4939 51.032L28.7079 30.986L21.9999 51.032H35.4939ZM59.6977 49.16C59.6977 44.688 60.5297 40.762 62.1937 37.382C63.9097 34.002 66.2237 31.402 69.1357 29.582C72.0477 27.762 75.2977 26.852 78.8857 26.852C81.9537 26.852 84.6317 27.476 86.9197 28.724C89.2597 29.972 91.0537 31.61 92.3017 33.638V27.476H105.64V71H92.3017V64.838C91.0017 66.866 89.1817 68.504 86.8417 69.752C84.5537 71 81.8757 71.624 78.8077 71.624C75.2717 71.624 72.0477 70.714 69.1357 68.894C66.2237 67.022 63.9097 64.396 62.1937 61.016C60.5297 57.584 59.6977 53.632 59.6977 49.16ZM92.3017 49.238C92.3017 45.91 91.3657 43.284 89.4937 41.36C87.6737 39.436 85.4377 38.474 82.7857 38.474C80.1337 38.474 77.8717 39.436 75.9997 41.36C74.1797 43.232 73.2697 45.832 73.2697 49.16C73.2697 52.488 74.1797 55.14 75.9997 57.116C77.8717 59.04 80.1337 60.002 82.7857 60.002C85.4377 60.002 87.6737 59.04 89.4937 57.116C91.3657 55.192 92.3017 52.566 92.3017 49.238ZM142.043 27.008C147.035 27.008 151.039 28.672 154.055 32C157.071 35.276 158.579 39.8 158.579 45.572V71H145.319V47.366C145.319 44.454 144.565 42.192 143.057 40.58C141.549 38.968 139.521 38.162 136.973 38.162C134.425 38.162 132.397 38.968 130.889 40.58C129.381 42.192 128.627 44.454 128.627 47.366V71H115.289V13.28H128.627V33.326C129.979 31.402 131.825 29.868 134.165 28.724C136.505 27.58 139.131 27.008 142.043 27.008ZM165.196 49.16C165.196 44.688 166.028 40.762 167.692 37.382C169.408 34.002 171.722 31.402 174.634 29.582C177.546 27.762 180.796 26.852 184.384 26.852C187.452 26.852 190.13 27.476 192.418 28.724C194.758 29.972 196.552 31.61 197.8 33.638V27.476H211.138V71H197.8V64.838C196.5 66.866 194.68 68.504 192.34 69.752C190.052 71 187.374 71.624 184.306 71.624C180.77 71.624 177.546 70.714 174.634 68.894C171.722 67.022 169.408 64.396 167.692 61.016C166.028 57.584 165.196 53.632 165.196 49.16ZM197.8 49.238C197.8 45.91 196.864 43.284 194.992 41.36C193.172 39.436 190.936 38.474 188.284 38.474C185.632 38.474 183.37 39.436 181.498 41.36C179.678 43.232 178.768 45.832 178.768 49.16C178.768 52.488 179.678 55.14 181.498 57.116C183.37 59.04 185.632 60.002 188.284 60.002C190.936 60.002 193.172 59.04 194.992 57.116C196.864 55.192 197.8 52.566 197.8 49.238ZM234.125 34.73C235.685 32.338 237.635 30.466 239.975 29.114C242.315 27.71 244.915 27.008 247.775 27.008V41.126H244.109C240.781 41.126 238.285 41.854 236.621 43.31C234.957 44.714 234.125 47.21 234.125 50.798V71H220.787V27.476H234.125V34.73ZM280.748 71L267.488 52.748V71H254.15V13.28H267.488V45.182L280.67 27.476H297.128L279.032 49.316L297.284 71H280.748ZM322.179 71.624C317.915 71.624 314.067 70.714 310.635 68.894C307.255 67.074 304.577 64.474 302.601 61.094C300.677 57.714 299.715 53.762 299.715 49.238C299.715 44.766 300.703 40.84 302.679 37.46C304.655 34.028 307.359 31.402 310.791 29.582C314.223 27.762 318.071 26.852 322.335 26.852C326.599 26.852 330.447 27.762 333.879 29.582C337.311 31.402 340.015 34.028 341.991 37.46C343.967 40.84 344.955 44.766 344.955 49.238C344.955 53.71 343.941 57.662 341.913 61.094C339.937 64.474 337.207 67.074 333.723 68.894C330.291 70.714 326.443 71.624 322.179 71.624ZM322.179 60.08C324.727 60.08 326.885 59.144 328.653 57.272C330.473 55.4 331.383 52.722 331.383 49.238C331.383 45.754 330.499 43.076 328.731 41.204C327.015 39.332 324.883 38.396 322.335 38.396C319.735 38.396 317.577 39.332 315.861 41.204C314.145 43.024 313.287 45.702 313.287 49.238C313.287 52.722 314.119 55.4 315.783 57.272C317.499 59.144 319.631 60.08 322.179 60.08ZM369.737 71.624C365.941 71.624 362.561 70.974 359.597 69.674C356.633 68.374 354.293 66.606 352.577 64.37C350.861 62.082 349.899 59.534 349.691 56.726H362.873C363.029 58.234 363.731 59.456 364.979 60.392C366.227 61.328 367.761 61.796 369.581 61.796C371.245 61.796 372.519 61.484 373.403 60.86C374.339 60.184 374.807 59.326 374.807 58.286C374.807 57.038 374.157 56.128 372.857 55.556C371.557 54.932 369.451 54.256 366.539 53.528C363.419 52.8 360.819 52.046 358.739 51.266C356.659 50.434 354.865 49.16 353.357 47.444C351.849 45.676 351.095 43.31 351.095 40.346C351.095 37.85 351.771 35.588 353.123 33.56C354.527 31.48 356.555 29.842 359.207 28.646C361.911 27.45 365.109 26.852 368.801 26.852C374.261 26.852 378.551 28.204 381.671 30.908C384.843 33.612 386.663 37.2 387.131 41.672H374.807C374.599 40.164 373.923 38.968 372.779 38.084C371.687 37.2 370.231 36.758 368.411 36.758C366.851 36.758 365.655 37.07 364.823 37.694C363.991 38.266 363.575 39.072 363.575 40.112C363.575 41.36 364.225 42.296 365.525 42.92C366.877 43.544 368.957 44.168 371.765 44.792C374.989 45.624 377.615 46.456 379.643 47.288C381.671 48.068 383.439 49.368 384.947 51.188C386.507 52.956 387.313 55.348 387.365 58.364C387.365 60.912 386.637 63.2 385.181 65.228C383.777 67.204 381.723 68.764 379.019 69.908C376.367 71.052 373.273 71.624 369.737 71.624ZM422.279 27.008C427.271 27.008 431.275 28.672 434.291 32C437.307 35.276 438.815 39.8 438.815 45.572V71H425.555V47.366C425.555 44.454 424.801 42.192 423.293 40.58C421.785 38.968 419.757 38.162 417.209 38.162C414.661 38.162 412.633 38.968 411.125 40.58C409.617 42.192 408.863 44.454 408.863 47.366V71H395.525V13.28H408.863V33.326C410.215 31.402 412.061 29.868 414.401 28.724C416.741 27.58 419.367 27.008 422.279 27.008Z" fill="url(#paint1_linear_1_5790)"/>
        <defs>
        <linearGradient id="paint0_linear_1_5790" x1="306.406" y1="86.0395" x2="339.885" y2="88.0424" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FF570C"/>
        <stop offset="0.990194" stop-color="#EF821A"/>
        </linearGradient>
        <linearGradient id="paint1_linear_1_5790" x1="0.00390644" y1="44.0195" x2="426.784" y2="149.729" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FF570C"/>
        <stop offset="0.990194" stop-color="#EF821A"/>
        </linearGradient>
        </defs>
        </svg>
          <h2 className="text-2xl sm:text-xl font-bold text-black mb-4">WELCOME BACK!</h2>
          <p className="text-sm text-gray-500 mb-6">
            Lorem ipsum dolor sit amet consectetur. Sit purus volutpat rhoncus eu vitae dolor tellus elementum tempus.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3  rounded-full outline-none focus:outline-none border border-transparent focus:border-orange-500 transition duration-200 shadow-sm"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3  rounded-full outline-none focus:outline-none border border-transparent focus:border-orange-500 transition duration-200 shadow-sm"
            />
          </div>
          <div className="text-right">
            <a href="#" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
              Forget Password?
            </a>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3  text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-colors shadow-lg"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p className="error text-red-500">{error}</p>}
          </div>
        </form>
      </div>

      {/* Popup Notification */}
      {popupMessage && (
        <div
          className={`absolute top-4 right-4 p-4 sm:p-2 rounded-lg shadow-lg text-white ${
            popupMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {popupMessage.text}
        </div>
      )}
    </div>
  );
};

export default Admin;

