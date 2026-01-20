import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";

export default function UpdateTask() {
  const navigate = useNavigate();
  const { task_list_id, task_id } = useParams();
  const [dataForm, setDataForm] = useState({
    judul: "",
    status: "To Do",
    tanggal_deadline: "",
  });
  const token = localStorage.getItem("access_token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const updateData = async () => {
      try {
        await axios.put(
          `http://localhost:3000/api/task/${task_list_id}/update/${task_id}`,
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
        console.log("Gagal mengirimkan data.");
        console.log(error);
      }
    };

    updateData();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/task/${task_list_id}/update/${task_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setDataForm(response.data.message);
        console.log(response.data.message);
      } catch (error) {
        console.log("Gagal mengambil data.");
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
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
                  value={dataForm.judul}
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
                  value={dataForm.tanggal_deadline}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type="submit">Update Task</button>
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
