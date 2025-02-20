// // ApplyJob.js
import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';

// const ApplyJob = () => {
//   const { userApplications } = useContext(AppContext);

//   return (
//     <div className="p-5">
//       <h2 className="text-2xl font-bold mb-5">Applied Jobs</h2>
//       <table className="min-w-full bg-white border border-gray-300">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b">Job Title</th>
//             <th className="py-2 px-4 border-b">Company</th>
//             <th className="py-2 px-4 border-b">Location</th>
//             <th className="py-2 px-4 border-b">Job Type</th>
//             <th className="py-2 px-4 border-b">Salary</th>
//           </tr>
//         </thead>
//         <tbody>
//           {userApplications.map((job, index) => (
//             <tr key={index}>
//               <td className="py-2 px-4 border-b">{job.title}</td>
//               <td className="py-2 px-4 border-b">{job.companyId.name}</td>
//               <td className="py-2 px-4 border-b">{job.location}</td>
//               <td className="py-2 px-4 border-b">{job.jobtype}</td>
//               <td className="py-2 px-4 border-b">{job.salary}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ApplyJob;




const ApplyJob = () => {
  const { userApplications } = useContext(AppContext);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5 text-purple-950 tracking-tighter">Applied Jobs</h2>
      <table className="min-w-full bg-blue-400 border-2 border-purple-700 border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Job Title</th>
            <th className="py-2 px-4 border-b">Company</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Job Type</th>
            <th className="py-2 px-4 border-b">Salary</th>
          </tr>
        </thead>
        <tbody>
          {userApplications.map((job, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-1 text-center text-white font-bold tracking-tight">{job.title}</td>
              <td className="py-2 px-4 border-1 text-center text-white font-bold tracking-tight">{job.companyId?.name}</td> {/* Added optional chaining */}
              <td className="py-2 px-4 border-1 text-center text-white font-bold tracking-tight">{job.location}</td>
              <td className="py-2 px-4 border-1 text-center text-white font-bold tracking-tight">{job.jobtype}</td>
              <td className="py-2 px-4 border-1 text-center text-white font-bold tracking-tight">{job.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplyJob;