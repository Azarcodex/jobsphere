import React, { useState } from "react";
import { ViewApplication } from "../Components/Descriptions";
import resume_upload from "../Images/upload.png";

const ViewApplications = () => {
  // State to store the status of each application
  const [statuses, setStatuses] = useState({});

  // Function to update status
  const handleStatusChange = (idx, status) => {
    setStatuses((prev) => ({
      ...prev,
      [idx]: status, // Update only the clicked index
    }));
  };

  return (
    <div className="p-3 h-screen mx-auto">
      <table className="bg-green-50 rounded-[5px] p-2 border-2 border-solid border-purple-950 border-collapse w-full">
        <thead>
          <tr className="bg-white text-center">
            <th className="border-2 border-black p-3 font-semibold text-sm">#</th>
            <th className="border-2 border-black p-3 font-semibold text-sm">Username</th>
            <th className="border-2 border-black p-3 font-semibold text-sm">Job Title</th>
            <th className="border-2 border-black p-3 font-semibold text-sm">Location</th>
            <th className="border-2 border-black p-3 font-semibold text-sm">Resume</th>
            <th className="border-2 border-black p-3 font-semibold text-sm">Action</th>
            <th className="border-2 border-black p-3 font-semibold text-sm">Status</th>
          </tr>
        </thead>
        <tbody>
          {ViewApplication.map((item, idx) => (
            <tr key={idx} className="border-b border-black">
              <td className="text-[.8rem] font-semibold tracking-tight capitalize border-r border-black p-2 text-center h-full">
                {idx + 1}
              </td>
              <td className="flex items-center gap-2 p-2 border-r border-black h-full">
                <img src={item.img} alt="User" className="w-11 h-11 object-cover rounded-full" />
                <span className="text-[.8rem] tracking-tight capitalize">{item.username}</span>
              </td>
              <td className="text-[.8rem] font-semibold tracking-tight capitalize border-r border-black p-2 text-center h-full">
                {item.title}
              </td>
              <td className="text-[.8rem] font-semibold tracking-tight capitalize border-r border-black p-2 text-center h-full">
                {item.location}
              </td>
              <td className="border-r border-black p-2 h-full text-[.8rem]">
                <div className="w-full h-full flex items-center justify-center gap-2">
                  Resume:
                  <img src={resume_upload} alt="Resume Icon" className="w-5 cursor-pointer" />
                </div>
              </td>
              <td className="p-2 text-center h-full relative text-[.8rem] text-violet-950 cursor-pointer group">
                ...
                <div className="absolute top-5 left-12 bg-gray-200 scale-0 group-hover:scale-100 transition duration-300 ease-in p-2 rounded">
                  <button
                    className="cursor-pointer hover:bg-blue-300 p-1 rounded-[8px] block w-full mb-1"
                    onClick={() => handleStatusChange(idx, "Accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="cursor-pointer hover:bg-red-300 p-1 rounded-[8px] block w-full"
                    onClick={() => handleStatusChange(idx, "Rejected")}
                  >
                    Reject
                  </button>
                </div>
              </td>
              <td className="p-2 text-center h-full text-[.8rem] font-semibold">
                {statuses[idx] ? (
                  <span className={statuses[idx] === "Accepted" ? "text-green-600" : "text-red-600"}>
                    {statuses[idx]}
                  </span>
                ) : (
                  <span className="text-gray-400">Pending</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewApplications;
