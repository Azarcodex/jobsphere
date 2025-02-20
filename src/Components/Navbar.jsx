import React, { useContext, useEffect, useState } from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import nav_icon from '../Images/promotion.png';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import { AppContext } from '../Context/AppContext';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const { userData, setUserData, setUserToken,userToken } = useContext(AppContext);

  const logout = () => {
       setUserToken(null);
       setUserData(null);
       localStorage.removeItem('userToken');
       localStorage.removeItem('userData');
       navigate('/');
     };

  useEffect(() => {
    console.log('Navbar userData:', userData);
  }, [userData]);

//   useEffect(() => {
//     if (userData) {
//       navigate('/interface');
//     }
//   }, [userData, navigate]);

  return (
    <div>
      <header className="bg-gray-100 w-full flex items-center justify-between p-2">
        <div className="max-w-[180px] w-full flex items-center justify-between">
          <img src={nav_icon} alt="JobSphere Icon" className="w-16" />
          <h2
            className="font-poppins text-violet-950 uppercase text-2xl font-extrabold hxx"
            style={{ textShadow: '3px 3px 6px rgba(0, 0, 0, 0.7)' }}
          >
            JobSphere
          </h2>
        </div>

        <nav>
          <div className="grid grid-cols-2 items-center gap-9">
              {userData &&(
                     <ul className="flex items-center justify-center gap-12 font-poppins font-semibold text-[.8rem] cursor-pointer tracking-wide capitalize text-purple-950">
               <Link to="/">
                 <li className="list-x">Home</li>
               </Link>
               <Link to="/job-applied">
                 <li className="list-x">Job Applied</li>
               </Link>
             </ul>
              )}
          
            {userData ? (
              
              <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-800 to-purple-950 p-1.5 max-w-[280px] rounded-[8px]">
                <p className="font-extrabold text-black text-3xl">&#128075;</p>
                <div
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-800 to-purple-950 p-1.5 rounded-[8px] relative cursor-pointer"
                  onClick={() => setShowLogout(!showLogout)}
                >
                  <p className="text-red-100">
                    Welcome <span className="text-white">{userData.username}</span>
                  </p>
                  {showLogout && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white text-black text-sm p-1 rounded shadow-md cursor-pointer"
                      onClick={logout}
                    >
                      Log out
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <ul className="flex items-center justify-center gap-12 font-poppins font-semibold text-[.8rem] cursor-pointer tracking-wide capitalize text-purple-950">
                  <li className="list-x">Home</li>
                  <li className="list-x">About</li>
                  <li className="list-x">Contact Us</li>
                </ul>
                <div className="hidden"></div>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
