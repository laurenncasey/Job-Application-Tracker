import { useEffect, useState } from "react";
import "./App.css";
import ModalForm from "./addAppModal";
import EditModalForm from "./EditModalForm";

interface Application {
  id: string;
  company: string;
  role: string;
  status: string;
  applied_date: string;
  salary: number;
  location: string;
}


function App() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchBarText, setSearchBarText] = useState("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
const [currentApp, setCurrentApp] = useState<Application>();

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
      fetchApps();

    } else {
      console.log("Failed to delete");
    }
  })
  .catch(error => console.error(error));
  }

  const editApplication = async (id: string, company: string, role: string, status: string, dateApplied: string, location: string, salary: number) => {
    const res = await fetch(`http://localhost:3000/applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company: company,
        role: role,
        status: status,
        applied_date: dateApplied, 
        location: location, 
        salary: salary, 
      }),
    });

    if (!res.ok) {
      console.error("Failed to update application");
      return;
    }
  
  
    setApplications((prev) =>
    prev.map((app) =>
      app.id === id
        ? { ...app, company, role, status, applied_date: dateApplied, location, salary }
        : app
    )
  );

  };


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
  
    await fetchApps();
  };


  useEffect(() => {
    fetchApps();
  }, [searchBarText]);

  return (
    <div className="main">
      <h1>Job Tracker</h1>
       <div className="mainVstack">
        <div className="searchBarHStack">
        <input className="searchBar"
  type="text"
  placeholder="🔍 Search"
  onChange={(e) => {setSearchBarText(e.target.value);}}
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
          <button onClick={() => {setCurrentApp(app); setEditModalOpen(true); }} className="deleteButton">✏️</button>
          <button onClick={() => deleteApplication(app.id)} className="deleteButton">🗑️</button>

        </div>
      ))}

<EditModalForm isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} editApplication={editApplication} currentApp={currentApp}/>

    </div>
    </div>


   
  );
}

export default App;