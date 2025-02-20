import { useContext } from 'react';
import { Outlet, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Interface from './Components/Interface';
import Index from './Components/Index';
import JobApply from './Components/JobApply';
import Jobresume from './Components/Jobresume';
import Admin from './Components/Admin';
import Dashboard from './AdminPages/Dashboard';
import ManageJobs from './AdminPages/ManageJobs';
import Addjob from './AdminPages/Addjob';
import AppliedJobs from './Components/AppliedJobs';
import ViewApplications from './AdminPages/ViewApplications';
import 'quill/dist/quill.snow.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecruiterLogin from './Components/RecruiterLogin';
import { AppContext } from './Context/AppContext';
import Login from './Components/Login';

// Admin Layout with Outlet
const AdminLayout = () => {
  return (
    <div>
      <Admin />
      {/* <Outlet /> */}
    </div>
  );
};

function App() {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);
  const { showUserLogin, userToken } = useContext(AppContext);

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Routes with Navbar & Footer */}
        <Route
          path="/*"
          element={
            <>
              {showRecruiterLogin && <RecruiterLogin />}
              {showUserLogin && <Login />}
              <Navbar />
              <Outlet /> {/* This will render nested routes */}
              <Footer />
            </>
          }
        >
          <Route index element={<Index />} />
          <Route path="job-applied" element={<AppliedJobs />} />
          <Route path="interface" element={<Interface />} />
          <Route path="apply/:id" element={<JobApply />} />
          <Route path="resume-upload" element={<Jobresume />} />
        </Route>

        {/* Separate Admin Route */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          {companyToken && (
    <>
      <Route path="dashboard/manage-jobs" element={<ManageJobs />} />
      <Route path="dashboard/add-job" element={<Addjob />} />
      <Route path="dashboard/view-application" element={<ViewApplications />} />
    </>
  )}
        </Route>

        {/* Authentication Routes */}
        <Route
          path="/login"
          element={userToken ? <Navigate to="/interface" /> : <Login />}
        />
        <Route
          path="/"
          element={userToken ? <Navigate to="/interface" /> : <Index />}
        />
      </Routes>
    </>
  );
}

export default App;