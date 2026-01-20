import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";

export default function TaskListDetails() {
  const navigate = useNavigate();
  const { task_list_id } = useParams();
  const [dataTask, setDataTask] = useState([]);

  const token = localStorage.getItem("access_token");
  const fetchData = async () => {
    try {
      if (!task_list_id) {
        navigate("/home");
      }

      const response = await axios.get(
        `http://localhost:3000/api/task/${task_list_id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setDataTask(response.data.message);
    } catch (error) {
      console.log("Gagal mengambil data.");
    }
  };

  const handleDelete = async (task_id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/task/${task_list_id}/delete/${task_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      fetchData();
    } catch (error) {
      console.log("Gagal menghapus data.");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [task_list_id]);

  return (
    <>
      <Link to={`/task_list/${task_list_id}/create_task`}>
        <button>Add Task</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Judul</th>
            <th>Status</th>
            <th>Tanggal Deadline</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataTask.map((task, index) => {
            return (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.judul}</td>
                <td>{task.status}</td>
                <td>{task.tanggal_deadline}</td>
                <td>
                  <Link to={`/task_list/${task_list_id}/update/${task.id}`}>
                    <button>Update</button>
                  </Link>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={4}>
              <Link to="/home">
                <button>Back to Task List</button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
