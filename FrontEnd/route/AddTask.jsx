import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

export default function AddTask() {
  const navigate = useNavigate();
  const { task_list_id } = useParams();
  const [dataForm, setDataForm] = useState({
    judul: "",
    status: "To Do",
    tanggal_deadline: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    const postData = async () => {
      try {
        await axios.post(
          `http://localhost:3000/api/task/${task_list_id}/create`,
          dataForm,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        navigate(`/task_list/${task_list_id}`);
      } catch (error) {
        setError(error.response.data.message);
        console.log("Gagal mengirimkan data.");
      }
    };

    postData();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        {error && (
          <>
            <p style={{ color: "red" }}>{error}</p>
          </>
        )}
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="judul">Judul :</label>
              </td>
              <td>
                <input
                  type="text"
                  name="judul"
                  id="judul"
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="status">Status :</label>
              </td>
              <td>
                <select
                  name="status"
                  id="status"
                  onChange={handleChange}
                  value={dataForm.status}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="tanggal_deadline">Tanggal Deadline :</label>
              </td>
              <td>
                <input
                  type="date"
                  name="tanggal_deadline"
                  id="tanggal_deadline"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type="submit">Add Task</button>
                <Link to={`/task_list/${task_list_id}`}>
                  <button>Cancel</button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}
