import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

export default function Home() {
  const location = useLocation();
  const oldData = location.state;
  const [dataTaskList, setDataTaskList] = useState([]);
  const [clicked, setClicked] = useState(true);

  const fetchData = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.get("http://localhost:3000/api/task_list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDataTaskList(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      console.log("Gagal mengambil data.");
    }
  };

  const handleSwap = async (dataToSwap) => {
    const token = localStorage.getItem("access_token");
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

  const handleSoftDelete = async (task_list_id) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.put(
        `http://localhost:3000/api/task_list/soft_delete/${task_list_id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setClicked(true);
      fetchData();
    } catch (error) {
      console.log("Gagal menghapus data.");
    }
  };

  const handleDelete = async (task_list_id) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.delete(
        `http://localhost:3000/api/task_list/delete/${task_list_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setClicked(true);
      fetchData();
    } catch (error) {
      console.log("Gagal menghapus data.");
    }
  };

  const handleUndo = async (e) => {
    e.preventDefault();

    const updateData = async () => {
      try {
        await axios.put(
          `http://localhost:3000/api/task_list/update/${oldData.id}`,
          oldData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        fetchData();
        setClicked(true);
      } catch (error) {
        console.log("Gagal mengirimkan data.");
      }
    };

    updateData();
  };

  useEffect(() => {
    fetchData();

    if (oldData) {
      setClicked(false);
    }
  }, []);

  return (
    <>
      <h1>Task List</h1>
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
                  <button onClick={() => handleSoftDelete(taskList.id)}>
                    Soft Delete
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
      <Link to={"/add_task_list"}>
        <button>Add Task List</button>
      </Link>
      <button onClick={handleUndo} disabled={clicked}>
        Undo
      </button>
    </>
  );
}
