import { useEffect, useState } from "react";
import "./App.css";
import ModalForm from "./addAppModal";

function App() {
  const [applications, setApplications] = useState([]);
  const [searchBarText, setSearchBarText] = useState("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // TODO: EDIT FUNCTION ... maybe a '...' next to the job or something... 

  const fetchApps = async () => {
    let url = "http://localhost:3000/applications";

    const trimmed = searchBarText?.trim();
    if (trimmed) {
      url += `?search=${encodeURIComponent(searchBarText)}`
    }else{
      url = "http://localhost:3000/applications"
    }
    const res = await fetch(url);
    const data = await res.json();
    setApplications(data);
  };

  const deleteApplication = async (id: string) => {
    fetch(`http://localhost:3000/applications/${id}`, {
  method: "DELETE",
})
  .then(response => {
    if (response.ok) {
      console.log("Application deleted successfully");

    } else {
      console.log("Failed to delete");
    }
  })
  .catch(error => console.error(error));
  }

  const createApplication = async (company: string, role: string, status: string, location: string, salary: number) => {
    const res = await fetch("http://localhost:3000/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company: company,
        role: role,
        status: status,
        location: location, 
        salary: salary, 
      }),
    });
  
    const data = await res.json();
    setApplications(data);
  };


  useEffect(() => {
    fetchApps();
  }, [searchBarText, applications]);

  return (
    <div className="main">
      <h1>Job Tracker</h1>
       <div className="mainVstack">
        <div className="searchBarHStack">
        <input className="searchBar"
  type="text"
  placeholder="🔍 Search"
  onChange={(e) => {setSearchBarText(e.target.value); fetchApps();}}
/>

<button onClick={() => setModalOpen(true)} className="addButton">➕</button>
<ModalForm isOpen={modalOpen} onClose={() => setModalOpen(false)} addApplication={createApplication}/>
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
<p>
  {new Date(app.applied_date).toLocaleDateString('en-US')}
</p>
          <p>{app.company}</p>
          <p>{app.role}</p>
          <p>${app.salary}</p>
          <p>{app.location}</p>
          <button onClick={() => deleteApplication(app.id)} className="deleteButton">🗑️</button>
         
        </div>
      ))}
    </div>
    </div>


   
  );
}

export default App;