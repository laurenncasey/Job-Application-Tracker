import { useState, FC, ChangeEvent, FormEvent, useEffect } from "react";
import "./App.css";

interface Application {
    id: string;
    company: string;
    role: string;
    status: string;
    applied_date: string;
    salary: number;
    location: string;
  }

interface EditModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  editApplication: (id: string, company: string, role: string, status: string, dateApplied: string, location: string, salary: number) => void;
  currentApp: Application | undefined;
}

interface EditFormData {
  company: string;
  role: string;
  status: string;
  dateApplied: string;
  salary: number;
  location: string;
}

const EditModalForm: FC<EditModalFormProps> = ({ isOpen, onClose, editApplication, currentApp }) => {
    if (!isOpen || !currentApp) return null;
  const [formData, setFormData] = useState<EditFormData>({ company: currentApp?.company || "", role: currentApp?.role || "", status: currentApp?.status || "", dateApplied: currentApp?.applied_date || "", salary: currentApp?.salary || 0, location: currentApp?.location || "" });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   editApplication(currentApp.id, formData.company, formData.role, formData.status, formData.dateApplied, formData.location, formData.salary);
//    setFormData({company: "", role: "", status: "", dateApplied: "", salary: 0, location: ""});
    onClose(); 
  };

  if (!isOpen) return null;


  useEffect(() => {
    if (!currentApp) return; // exit if undefined
  
    setFormData({
      company: currentApp.company,
      role: currentApp.role,
      status: currentApp.status,
      dateApplied: currentApp.applied_date,
      salary: currentApp.salary,
      location: currentApp.location,
    });
  }, [currentApp]);

  
  return (
    <div
     className="addForm"
      onClick={onClose}
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Edit Application</h2>
        <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "1rem" }}>
  <label>Status</label>
  <select
    name="status"
    className="formInput"
    value={formData.status}
    onChange={handleChange} 
    style={{ width: "100%" }}
  >
    <option value="Applied">Applied</option>
    <option value="Rejected">Rejected</option>
    <option value="Interviewing">Interviewing</option>
  </select>
</div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Company</label>
            <input
            className="formInput"
              name="company"
              value={formData.company}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Role</label>
            <input
              name="role"
              className="formInput"
              value={formData.role}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Date Applied</label>
            <input
              name="dateApplied"
              className="formInput"
              value={new Date(formData.dateApplied).toLocaleDateString('en-US')}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Salary</label>
            <input
              name="salary"
              className="formInput"
              value={formData.salary}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Location</label>
            <input
              name="location"
              className="formInput"
              value={formData.location}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>
          <button type="submit">Done</button>
          <button type="button" onClick={onClose} style={{ marginLeft: "1rem" }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModalForm;