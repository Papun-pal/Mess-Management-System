import { Link } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const { admin, adminLogout } = useAdminAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white shadow-lg border-b border-cyan-400">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {admin ? (
            <span className="text-lg font-bold">
              Welcome, {admin?.adminname} <span className="text-cyan-400">(as Admin)</span>
            </span>
          ) : user ? (
            <>
              <img
                src={user?.avatar}
                alt="User Photo"
                className="w-12 h-12 rounded-full border-2 border-cyan-400 shadow-lg shadow-cyan-500/50"
              />
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                {user?.username}
              </span>
            </>
          ) : (
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Mess Management System
            </span>
          )}
        </div>

        {/* Right Section for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full bg-slate-800 text-cyan-400 shadow-lg shadow-cyan-500/30 hover:bg-slate-700 transition-all duration-300"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Middle Section: Navigation (Visible on Desktop) */}
        {(admin || user) && (
          <nav className="hidden lg:flex space-x-8 text-lg font-semibold">
            {admin ? (
              <>
                <Link
                  to="/admin/home"
                  className="relative hover:text-cyan-400 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-cyan-400 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin-register"
                  className="relative hover:text-cyan-400 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-cyan-400 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  Create a New Admin
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/myaccount"
                  className="relative hover:text-cyan-400 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-cyan-400 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  My Account
                </Link>
                <Link
                  to="/userhome"
                  className="relative hover:text-cyan-400 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-cyan-400 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  Home
                </Link>
              </>
            )}
          </nav>
        )}

        {/* Right Section: Logout Button (Visible on Desktop) */}
        <div className="hidden lg:block">
          {admin ? (
            <button
              onClick={adminLogout}
              className="flex items-center bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-2 rounded-lg shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/50 hover:scale-105"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          ) : user ? (
            <button
              onClick={logout}
              className="flex items-center bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-2 rounded-lg shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/50 hover:scale-105"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2 rounded-lg shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-emerald-500/50 hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-purple-500 to-indigo-600 px-5 py-2 rounded-lg shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-purple-500/50 hover:scale-105"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-slate-800/95 backdrop-blur-sm text-white shadow-xl shadow-cyan-500/10 rounded-lg mt-2 mx-6 p-4 border border-slate-700">
          <ul className="space-y-4">
            {admin ? (
              <>
                <li>
                  <Link
                    to="/admin/home"
                    className="block text-lg font-semibold hover:text-cyan-400 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin-register"
                    className="block text-lg font-semibold hover:text-cyan-400 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Create a New Admin
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      adminLogout();
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left text-lg font-semibold text-cyan-400 hover:text-cyan-300 transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : user ? (
              <>
                <li>
                  <Link
                    to="/myaccount"
                    className="block text-lg font-semibold hover:text-cyan-400 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="/userhome"
                    className="block text-lg font-semibold hover:text-cyan-400 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left text-lg font-semibold text-cyan-400 hover:text-cyan-300 transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block text-lg font-semibold hover:text-emerald-400 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="block text-lg font-semibold hover:text-purple-400 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;









// import { Link } from "react-router-dom";
// import { LogOut, Menu } from "lucide-react"; // Menu icon for the mobile menu
// import { useAuth } from "../../context/AuthContext";
// import { useAdminAuth } from "../../context/AdminAuthContext"; // Import AdminAuthContext for admin authentication
// import { useState } from "react";

// const Header = () => {
//   const { user, logout } = useAuth(); // User authentication
//   const { admin, adminLogout } = useAdminAuth(); // Admin authentication
//   // console.log(admin);
  
//   const [menuOpen, setMenuOpen] = useState(false); // State to toggle the mobile menu

//   return (
//     <header className="bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 text-white shadow-lg border-b border-indigo-400">
//       <div className="container mx-auto px-6 py-3 flex justify-between items-center">
//         {/* Left Section */}
//         <div className="flex items-center space-x-4">
//           {admin ? (
//             // Admin View
//             <span className="text-lg font-bold">
//               Welcome, {admin?.adminname} <span className="text-yellow-300">(as Admin)</span>
//             </span>
//           ) : user ? (
//             // User View
//             <>
//               <img
//                 src={user?.avatar}
//                 alt="User Photo"
//                 className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
//               />
//               <span className="text-lg font-bold">{user?.username}</span>
//             </>
//           ) : (
//             <span className="text-xl font-extrabold">Mess Management System</span>
//           )}
//         </div>

//         {/* Right Section for Mobile */}
//         <div className="lg:hidden">
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="p-2 rounded-full bg-white text-purple-600 shadow-md hover:bg-gray-200 transition"
//           >
//             <Menu size={24} />
//           </button>
//         </div>

//         {/* Middle Section: Navigation (Visible on Desktop) */}
//         {(admin || user) && (
//           <nav className="hidden lg:flex space-x-8 text-lg font-semibold">
//             {admin ? (
//               <>
//                 <Link
//                   to="/admin/home"
//                   className="relative hover:text-yellow-400 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-yellow-400 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   to="/admin-register"
//                   className="relative hover:text-yellow-400 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-yellow-400 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
//                 >
//                  Create a New Admin
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/myaccount"
//                   className="relative hover:text-yellow-400 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-yellow-400 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
//                 >
//                   My Account
//                 </Link>
//                 <Link
//                   to="/userhome"
//                   className="relative hover:text-yellow-400 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-yellow-400 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
//                 >
//                   Home
//                 </Link>
//               </>
//             )}
//           </nav>
//         )}

//         {/* Right Section: Logout Button (Visible on Desktop) */}
//         <div className="hidden lg:block">
//           {admin ? (
//             <button
//               onClick={adminLogout}
//               className="flex items-center bg-red-500 px-5 py-2 rounded-lg shadow-md transition duration-300 hover:bg-red-600 hover:shadow-red-400 hover:scale-105"
//             >
//               <LogOut size={18} className="mr-2" />
//               Logout
//             </button>
//           ) : user ? (
//             <button
//               onClick={logout}
//               className="flex items-center bg-red-500 px-5 py-2 rounded-lg shadow-md transition duration-300 hover:bg-red-600 hover:shadow-red-400 hover:scale-105"
//             >
//               <LogOut size={18} className="mr-2" />
//               Logout
//             </button>
//           ) : (
//             <div className="space-x-4">
//               <Link
//                 to="/login"
//                 className="bg-green-500 px-5 py-2 rounded-lg shadow-md transition duration-300 hover:bg-green-600 hover:shadow-green-400 hover:scale-105"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="bg-yellow-500 px-5 py-2 rounded-lg shadow-md transition duration-300 hover:bg-yellow-600 hover:shadow-yellow-400 hover:scale-105"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="lg:hidden bg-white text-purple-600 shadow-lg rounded-lg mt-2 mx-6 p-4">
//           <ul className="space-y-4">
//             {admin ? (
//               <>
//                 <li>
//                   <Link
//                     to="/admin/home"
//                     className="block text-lg font-semibold hover:text-yellow-400 transition"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin-register"
//                     className="block text-lg font-semibold hover:text-yellow-400 transition"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     Create a New Admin
//                   </Link>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => {
//                       adminLogout();
//                       setMenuOpen(false);
//                     }}
//                     className="block w-full text-left text-lg font-semibold text-red-500 hover:text-red-600 transition"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : user ? (
//               <>
//                 <li>
//                   <Link
//                     to="/myaccount"
//                     className="block text-lg font-semibold hover:text-yellow-400 transition"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     My Account
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/userhome"
//                     className="block text-lg font-semibold hover:text-yellow-400 transition"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => {
//                       logout();
//                       setMenuOpen(false);
//                     }}
//                     className="block w-full text-left text-lg font-semibold text-red-500 hover:text-red-600 transition"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link
//                     to="/login"
//                     className="block text-lg font-semibold hover:text-green-500 transition"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     Login
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/signup"
//                     className="block text-lg font-semibold hover:text-yellow-500 transition"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     Sign Up
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;


// //{chatgpt}........................................................................................................
// import { Link } from "react-router-dom";
// import { LogOut, Menu } from "lucide-react"; // Menu icon for the mobile menu
// import { useAuth } from "../../context/AuthContext";
// import { useAdminAuth } from "../../context/AdminAuthContext"; // Import AdminAuthContext for admin authentication
// import { useState } from "react";

// const Header = () => {
//   const { user, logout } = useAuth(); // User authentication
//   const { admin, adminLogout } = useAdminAuth(); // Admin authentication
  
//   const [menuOpen, setMenuOpen] = useState(false); // State to toggle the mobile menu

//   return (
//     <header className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white shadow-lg border-b border-cyan-400">
//       <div className="container mx-auto px-6 py-3 flex justify-between items-center">
//         {/* Left Section */}
//         <div className="flex items-center space-x-4">
//           {admin ? (
//             // Admin View
//             <span className="text-lg font-bold text-cyan-300">
//               Welcome, {admin?.adminname} <span className="text-pink-400">(as Admin)</span>
//             </span>
//           ) : user ? (
//             // User View
//             <>
//               <img
//                 src={user?.avatar}
//                 alt="User Photo"
//                 className="w-12 h-12 rounded-full border-2 border-cyan-400 shadow-lg"
//               />
//               <span className="text-lg font-bold text-cyan-300">{user?.username}</span>
//             </>
//           ) : (
//             <span className="text-xl font-extrabold text-pink-400">Mess Management System</span>
//           )}
//         </div>

//         {/* Right Section for Mobile */}
//         <div className="lg:hidden">
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="p-2 rounded-full bg-[#ff00ff] text-white shadow-md hover:bg-[#ff1493] transition"
//           >
//             <Menu size={24} />
//           </button>
//         </div>

//         {/* Middle Section: Navigation (Visible on Desktop) */}
//         {(admin || user) && (
//           <nav className="hidden lg:flex space-x-8 text-lg font-semibold">
//             {admin ? (
//               <>
//                 <Link to="/admin/home" className="text-cyan-300 hover:text-pink-400 transition">Dashboard</Link>
//                 <Link to="/admin-register" className="text-cyan-300 hover:text-pink-400 transition">Create a New Admin</Link>
//               </>
//             ) : (
//               <>
//                 <Link to="/myaccount" className="text-cyan-300 hover:text-pink-400 transition">My Account</Link>
//                 <Link to="/userhome" className="text-cyan-300 hover:text-pink-400 transition">Home</Link>
//               </>
//             )}
//           </nav>
//         )}

//         {/* Right Section: Logout Button (Visible on Desktop) */}
//         <div className="hidden lg:block">
//           {admin ? (
//             <button
//               onClick={adminLogout}
//               className="flex items-center bg-[#ff00ff] px-5 py-2 rounded-lg shadow-md transition duration-300 hover:bg-[#ff1493] hover:scale-105"
//             >
//               <LogOut size={18} className="mr-2" />
//               Logout
//             </button>
//           ) : user ? (
//             <button
//               onClick={logout}
//               className="flex items-center bg-[#ff00ff] px-5 py-2 rounded-lg shadow-md transition duration-300 hover:bg-[#ff1493] hover:scale-105"
//             >
//               <LogOut size={18} className="mr-2" />
//               Logout
//             </button>
//           ) : (
//             <div className="space-x-4">
//               <Link to="/login" className="bg-[#00ffea] px-5 py-2 rounded-lg shadow-md transition duration-300 hover:bg-[#00e5ff] hover:scale-105">Login</Link>
//               <Link to="/signup" className="bg-[#ff00ff] px-5 py-2 rounded-lg shadow-md transition duration-300 hover:bg-[#ff1493] hover:scale-105">Sign Up</Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


//{DeepSeek}..............................................................................................................................................
// import { Link } from "react-router-dom";
// import { LogOut, Menu } from "lucide-react";
// import { useAuth } from "../../context/AuthContext";
// import { useAdminAuth } from "../../context/AdminAuthContext";
// import { useState } from "react";

// const Header = () => {
//   const { user, logout } = useAuth();
//   const { admin, adminLogout } = useAdminAuth();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="bg-[linear-gradient(135deg,_#0f172a_0%,_#1e293b_50%,_#0f172a_100%)] text-white shadow-lg shadow-cyan-500/20 border-b border-slate-700">
//       <div className="container mx-auto px-6 py-3 flex justify-between items-center">
//         {/* Left Section */}
//         <div className="flex items-center space-x-4">
//           {admin ? (
//             <span className="text-lg font-bold">
//               Welcome, {admin?.adminname} <span className="text-cyan-400">(as Admin)</span>
//             </span>
//           ) : user ? (
//             <>
//               <img
//                 src={user?.avatar}
//                 alt="User Photo"
//                 className="w-12 h-12 rounded-full border-2 border-cyan-400 shadow-lg shadow-cyan-500/50"
//               />
//               <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
//                 {user?.username}
//               </span>
//             </>
//           ) : (
//             <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
//               Mess Management System
//             </span>
//           )}
//         </div>

//         {/* Right Section for Mobile */}
//         <div className="lg:hidden">
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="p-2 rounded-full bg-slate-800 text-cyan-400 shadow-lg shadow-cyan-500/30 hover:bg-slate-700 transition-all duration-300"
//           >
//             <Menu size={24} />
//           </button>
//         </div>

//         {/* Middle Section: Navigation (Visible on Desktop) */}
//         {(admin || user) && (
//           <nav className="hidden lg:flex space-x-8 text-lg font-semibold">
//             {admin ? (
//               <>
//                 <Link
//                   to="/admin/home"
//                   className="relative hover:text-cyan-400 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-cyan-400 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   to="/admin-register"
//                   className="relative hover:text-cyan-400 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-cyan-400 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
//                 >
//                   Create a New Admin
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/myaccount"
//                   className="relative hover:text-cyan-400 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-cyan-400 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
//                 >
//                   My Account
//                 </Link>
//                 <Link
//                   to="/userhome"
//                   className="relative hover:text-cyan-400 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-cyan-400 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
//                 >
//                   Home
//                 </Link>
//               </>
//             )}
//           </nav>
//         )}

//         {/* Right Section: Logout Button (Visible on Desktop) */}
//         <div className="hidden lg:block">
//           {admin ? (
//             <button
//               onClick={adminLogout}
//               className="flex items-center bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-2 rounded-lg shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/50 hover:scale-105"
//             >
//               <LogOut size={18} className="mr-2" />
//               Logout
//             </button>
//           ) : user ? (
//             <button
//               onClick={logout}
//               className="flex items-center bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-2 rounded-lg shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/50 hover:scale-105"
//             >
//               <LogOut size={18} className="mr-2" />
//               Logout
//             </button>
//           ) : (
//             <div className="space-x-4">
//               <Link
//                 to="/login"
//                 className="bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2 rounded-lg shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-emerald-500/50 hover:scale-105"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="bg-gradient-to-r from-purple-500 to-indigo-600 px-5 py-2 rounded-lg shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-purple-500/50 hover:scale-105"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="lg:hidden bg-slate-800/95 backdrop-blur-sm text-white shadow-xl shadow-cyan-500/10 rounded-lg mt-2 mx-6 p-4 border border-slate-700">
//           <ul className="space-y-4">
//             {admin ? (
//               <>
//                 <li>
//                   <Link
//                     to="/admin/home"
//                     className="block text-lg font-semibold hover:text-cyan-400 transition"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin-register"
//                     className="block text-lg font-semibold hover:text-cyan-400 transition"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     Create a New Admin
//                   </Link>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => {
//                       adminLogout();
//                       setMenuOpen(false);
//                     }}
//                     className="block w-full text-left text-lg font-semibold text-cyan-400 hover:text-cyan-300 transition"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : user ? (
//               <>
//                 <li>
//                   <Link
//                     to="/myaccount"
//                     className="block text-lg font-semibold hover:text-cyan-400 transition"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     My Account
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/userhome"
//                     className="block text-lg font-semibold hover:text-cyan-400 transition"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => {
//                       logout();
//                       setMenuOpen(false);
//                     }}
//                     className="block w-full text-left text-lg font-semibold text-cyan-400 hover:text-cyan-300 transition"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link
//                     to="/login"
//                     className="block text-lg font-semibold hover:text-emerald-400 transition"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     Login
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/signup"
//                     className="block text-lg font-semibold hover:text-purple-400 transition"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     Sign Up
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;


