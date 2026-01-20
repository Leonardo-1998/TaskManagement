import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const addTaskList = () => {
    navigate("/add_task_list");
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/task_list",
          { headers: { Authorization: `Bearer ${token}` } },
        );

        setData(response.data.message);
        console.log(response.data.message);
      } catch (error) {
        console.log("Gagal mengambil data.");
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <button onClick={addTaskList}>Add Task List</button>

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((taskList, index) => {
            return (
              <tr key={taskList.id}>
                <td>{index + 1}</td>
                <td>{taskList.nama}</td>
                <td>{taskList.deskripsi}</td>
                <td>
                  <Link to={`/task_list/${taskList.id}`}>Details</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
