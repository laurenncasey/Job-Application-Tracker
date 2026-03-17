import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [applications, setApplications] = useState([]);
  
  const fetchApps = async () => {
    const res = await fetch("http://localhost:3000/applications");
    const data = await res.json();
    setApplications(data);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const addJob = async () => {
    console.log("adding");
  }
  const searchJobs = async (e: string) => {
    console.log("searching");
  }

  const deleteJob = async (e: app) => {
    console.log("deeleting");
  }

  return (
    <div className="main">
      <h1>Job Tracker</h1>
       <div className="mainVstack">
        <div className="searchBarHStack">
        <input className="searchBar"
  type="text"
  placeholder="🔍 Search"
  onChange={(e) => searchJobs(e.target.value)}
/>

<button onClick={addJob} className="addButton">➕</button>
        </div>
      

      <div className="jobInfoHStack">
        <p className="topItems">Status</p>
        <p className="topItems">Date Applied</p>
        <p className="topItems">Company</p>
        <p className="topItems">Role</p>
        <p className="topItems">Salary</p>
        <p className="topItems">Location</p>
        <p className="trashSpacerTopItem"></p>

      </div>
      {applications.map(app => (
        <div className="jobInfoHStack" key={app.id}>
         <p>
  {app.status === "Applied" 
    ? `⚠️ ${app.status}` 
    : app.status === "Rejected" 
      ? `❌ ${app.status}` 
      : `✅ ${app.status}`}
</p>
<p>{app.applied_date}</p>
          <p>{app.company}</p>
          <p>{app.role}</p>
          <p>${app.salary}</p>
          <p>{app.location}</p>
          <button onClick={() => deleteJob(app)} className="deleteButton">🗑️</button>
         
        </div>
      ))}
    </div>
    </div>


   
  );
}

export default App;