import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import app1 from '../Images/ApplyJob/office-building.png';
import app2 from '../Images/ApplyJob/pin.png';
import app3 from '../Images/ApplyJob/jobx.png';
import app4 from '../Images/ApplyJob/salary.png';
import axios from 'axios';
import { toast } from 'react-toastify';

const JobApply = () => {
  const { id } = useParams();
  const { backendUrl, userData, userToken, addApplication } = useContext(AppContext);
  const [jobdisplay, setJobdisplay] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/jobs/${id}`, {
          headers: { token: userToken }
        });
        if (data.success) {
          setJobdisplay(data.job);
          setError(null);
        } else {
          toast.error(data.message);
          setError('Job not found');
        }
      } catch (error) {
        toast.error(error.message);
        setError('Error fetching job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, backendUrl, userToken]);

  const applyHandler = () => {
    if (!userData) {
      toast.error("Please login to apply");
      return;
    }

    addApplication(jobdisplay);
    toast.success("Application submitted successfully!");
    navigate('/interface'); // Navigate to the Apply Job page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return jobdisplay ? (
    <div>
      <section className="min-h-[100vh] p-3">
        <div className="border-2 border-solid border-black rounded-[10px] p-4 bg-gradient-to-r from-purple-800 to-purple-950 shadow-lg">
          <h2 className="text-center text-white capitalize text-xl m-4 font-extrabold">
            {jobdisplay.title}
          </h2>
          <div className="grid grid-cols-3 items-center gap-7">
            <div className="flex items-center flex-row bg-transparent col-span-2 justify-between">
              <img
                src={jobdisplay.companyId.image}
                alt=""
                className="w-10 bg-white p-2 rounded-full"
              />
              <ul className="">
                <li className="inline-block mx-6 my-auto text-white font-bold text-sm">
                  <img src={app1} alt="" className="w-7 m-auto" />
                  {jobdisplay.companyId.name}
                </li>

                <li className="inline-block mx-6 my-auto text-white font-bold text-sm">
                  <img src={app2} alt="" className="w-7 m-auto" />
                  {jobdisplay.location}
                </li>

                <li className="inline-block mx-6 my-auto text-white font-bold text-sm">
                  <img src={app3} alt="" className="w-7 m-auto" />
                  {jobdisplay.jobtype}
                </li>

                <li className="inline-block mx-6 my-auto text-white font-bold text-sm">
                  <img src={app4} alt="" className="w-7 m-auto" />
                  {jobdisplay.salary}
                </li>
              </ul>
            </div>
            <button
              className="cursor-pointer col-span-1 border-[.1px] border-solid border-black text-white rounded-[5px] px-5 py-2 capitalize bg-blue-800 text-[.9rem] tracking-wide mx-3"
              onClick={applyHandler}
              aria-label="Apply for this job"
            >
              Apply Now
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-6 p-5">
          <h2 className="font-bold text-2xl capitalize text-left tracking-tighter">
            Job Description
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: jobdisplay.description }}
            className="space-y4"
          ></div>
        </div>
      </section>
    </div>
  ) : (
    <div>No job details available.</div>
  );
};

export default JobApply;