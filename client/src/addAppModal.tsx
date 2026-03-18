import { useState, FC, ChangeEvent, FormEvent } from "react";
import "./App.css";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  addApplication: (company: string, role: string, status: string, location: string, salary: number) => void;
}

interface FormData {
  company: string;
  role: string;
  salary: number, 
  location: string
}

const ModalForm: FC<ModalFormProps> = ({ isOpen, onClose, addApplication }) => {
  const [formData, setFormData] = useState<FormData>({ company: "", role: "", salary: 0, location: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   addApplication(formData.company, formData.role, "Applied", formData.location, formData.salary);
   setFormData({company: "", role: "", salary: 0, location: ""});
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div
     className="addForm"
      onClick={onClose}
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Add Application</h2>
        <form onSubmit={handleSubmit}>

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
          <button type="submit">Add</button>
          <button type="button" onClick={onClose} style={{ marginLeft: "1rem" }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;