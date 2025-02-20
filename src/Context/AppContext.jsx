import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [searchFilter, setsearchFilter] = useState({
    title: "",
    location: "",
  });
  const [searched, setSearched] = useState(false);
  const [joblist, setJoblist] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken') || null)
  const [userData, setUserData] = useState(null)
  const [userApplications, setUserApplications] = useState([]);

  const addApplication = (job) => {
    setUserApplications((prevApplications) => [...prevApplications, job]);
  };
  // Function to fetch jobs
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/jobs');
      console.log("Full API response:", data);
      if (data.success) {
        setJoblist(data.jobs);
        console.log("Jobs:", data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to fetch company data
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/company', {
        headers: { token: companyToken },
      });
      if (data.success) {
        setCompanyData(data.company);
        console.log("Company Data:", data.company);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
 //  Function to fetch user data
  //  const fetchUserData = async () => {
  //    try {
  //      console.log("Fetching user data with token:", userToken);
  //      const { data } = await axios.get(backendUrl + '/api/users/user', {
  //        headers: { token: userToken },
  //      });
  //      console.log("API Response:", data); // Log the full API response
  //      if (data.success) {
  //        setUserData(data.user);
  //        console.log("User Data:", data.user); // Log the user data
  //      } else {
  //        console.error("API Error:", data.message); // Log the error message
  //        toast.error(data.message);
  //      }
  //    } catch (error) {
  //      console.error("Fetch User Data Error:", error); // Log the error
  //      toast.error(error.message);
  //    }
  //  };
  const fetchUserData = async () => {
    try {
      console.log('Fetching user data with token:', userToken);
  
      if (!userToken) {
        console.error('No user token found!');
        return; // Stop execution if token is missing
      }
  
      const response = await axios.get(backendUrl + '/api/users/user', {
        headers: { token: userToken },
      });
  
      if (response.data.success) {
        setUserData(response.data.user);
        console.log('User Data Updated in Context:', response.data.user);
        localStorage.setItem('userData', JSON.stringify(response.data.user)); // Store user data persistently
      } else {
        console.error('API Error:', response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Fetch User Data Error:', error?.response?.data || error.message);
      toast.error(error.message);
    }
  };
  

  useEffect(() => {
    fetchJobs();
  }, [companyToken]);

  useEffect(() => {
    const storedCompanyToken = localStorage.getItem('companyToken');
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  useEffect(() => {
    const storedUserToken = localStorage.getItem('userToken');
    if (storedUserToken) {
      setUserToken(storedUserToken);
      fetchUserData(); // Fetch user data if token exists
    }
  }, []);

  useEffect(() => {
    if (userToken) {
      fetchUserData();
    }
  }, [userToken]);

  const value = {
    searchFilter,
    setsearchFilter,
    searched,
    setSearched,
    joblist,
    setJoblist,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    showRecruiterLogin,
    setShowRecruiterLogin,
    backendUrl,
    userApplications,
    setUserApplications,
    showUserLogin,
    setShowUserLogin,
    userData,
    setUserData,
    userToken,
    setUserToken,
    fetchUserData,
    addApplication
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};