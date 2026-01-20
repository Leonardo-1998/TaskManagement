import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function AddTaskList() {
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({ nama: "", deskripsi: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    const postData = async () => {
      try {
        await axios.post(
          "http://localhost:3000/api/task_list/create",
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
        setError(error.response.data.message);
        console.log("Gagal mengirimkan data.");
      }
    };

    postData();
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        {error && (
          <>
            <p style={{ color: "red" }}>{error}</p>
          </>
        )}
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
                  required
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
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type="submit">Add</button>
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
