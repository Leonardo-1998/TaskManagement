import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

export default function UpdateTaskList() {
  const navigate = useNavigate();
  const { task_list_id } = useParams();
  const [dataForm, setDataForm] = useState({ nama: "", deskripsi: "" });
  const token = localStorage.getItem("access_token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const updateData = async () => {
      try {
        await axios.put(
          `http://localhost:3000/api/task_list/update/${task_list_id}`,
          dataForm,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        navigate("/home");
      } catch (error) {
        console.log("Gagal mengirimkan data.");
      }
    };

    updateData();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/task_list/update/${task_list_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setDataForm(response.data.message);
      } catch (error) {
        console.log("Gagal mengambil data.");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="nama">Nama</label>
              </td>
              <td>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  onChange={handleChange}
                  value={dataForm.nama}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="deskripsi">Deskripsi</label>
              </td>
              <td>
                <input
                  type="text"
                  name="deskripsi"
                  id="deskripsi"
                  onChange={handleChange}
                  value={dataForm.deskripsi}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type="submit">Update</button>
                <Link to="/home">
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
