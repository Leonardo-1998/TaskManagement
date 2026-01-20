import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Home() {
  const [dataTaskList, setDataTaskList] = useState([]);

  const token = localStorage.getItem("access_token");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/task_list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDataTaskList(response.data.message);
    } catch (error) {
      console.log("Gagal mengambil data.");
    }
  };

  const handleSwap = async (dataToSwap) => {
    try {
      await axios.put(`http://localhost:3000/api/task_list/swap`, dataToSwap, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      fetchData();
    } catch (error) {
      console.log("Gagal melakukan pertukaran");
      console.log(error);
    }
  };

  const handleSwapUp = (index) => {
    const dataToSwap = {
      upperData: dataTaskList[index - 1],
      lowerData: dataTaskList[index],
    };
    handleSwap(dataToSwap);
  };

  const handleSwapDown = (index) => {
    const dataToSwap = {
      upperData: dataTaskList[index],
      lowerData: dataTaskList[index + 1],
    };
    handleSwap(dataToSwap);
  };

  const handleDelete = async (task_list_id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/task_list/delete/${task_list_id}`,
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
  }, []);

  return (
    <>
      <Link to={"/add_task_list"}>
        <button>Add Task List</button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Action</th>
            <th>Placement</th>
          </tr>
        </thead>
        <tbody>
          {dataTaskList.map((taskList, index) => {
            return (
              <tr key={taskList.id}>
                <td>{index + 1}</td>
                <td>{taskList.nama}</td>
                <td>{taskList.deskripsi}</td>
                <td>
                  <Link to={`/task_list/${taskList.id}`}>
                    <button>Details</button>
                  </Link>
                  <Link to={`/task_list/${taskList.id}/update`}>
                    <button>Update</button>
                  </Link>
                  <button onClick={() => handleDelete(taskList.id)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    disabled={index === 0 ? true : false}
                    onClick={() => handleSwapUp(index)}
                  >
                    ^
                  </button>
                  <button
                    disabled={index === dataTaskList.length - 1 ? true : false}
                    onClick={() => handleSwapDown(index)}
                  >
                    v
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
