import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams, Link, data } from "react-router";

export default function Task() {
  const location = useLocation();
  const oldData = location.state;
  const navigate = useNavigate();
  const { task_list_id } = useParams();
  const [userList, setUserList] = useState([]);
  const [dataTask, setDataTask] = useState([]);
  const [clicked, setClicked] = useState(true);
  const [addCollaborator, setAddCollaborator] = useState(false);
  const [dataForm, setDataForm] = useState({ task_list_id: "", email: "" });
  const [error, setError] = useState("");

  const fetchData = async () => {
    const token = localStorage.getItem("access_token");
    try {
      if (!task_list_id) {
        navigate("/home");
      }

      const response = await axios.get(
        `http://localhost:3000/api/task/${task_list_id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setDataTask(response.data.message);

      const user = await axios.get(`http://localhost:3000/api/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserList(user.data.message);
    } catch (error) {
      console.log("Gagal mengambil data.");
    }
  };

  const handleSwap = async (dataToSwap) => {
    const token = localStorage.getItem("access_token");
    console.log(dataToSwap);
    try {
      await axios.put(
        `http://localhost:3000/api/task/${task_list_id}/swap`,
        dataToSwap,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      fetchData();
    } catch (error) {
      console.log("Gagal melakukan pertukaran");
    }
  };

  const handleSwapUp = (index) => {
    const dataToSwap = {
      upperData: dataTask[index - 1],
      lowerData: dataTask[index],
    };
    handleSwap(dataToSwap);
  };

  const handleSwapDown = (index) => {
    const dataToSwap = {
      upperData: dataTask[index],
      lowerData: dataTask[index + 1],
    };
    handleSwap(dataToSwap);
  };

  const handleDelete = async (task_id) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.delete(
        `http://localhost:3000/api/task/${task_list_id}/delete/${task_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setClicked(true);
      fetchData();
    } catch (error) {
      console.log("Gagal menghapus data.");
      console.log(error);
    }
  };

  const handleUndo = async (e) => {
    e.preventDefault();

    const updateData = async () => {
      try {
        await axios.put(
          `http://localhost:3000/api/task/${task_list_id}/update/${oldData.id}`,
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

  const handleSoftDelete = (task_id) => {
    const token = localStorage.getItem("access_token");
    const updateData = async () => {
      try {
        await axios.put(
          `http://localhost:3000/api/task/${task_list_id}/soft_delete/${task_id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        setClicked(true);
        fetchData();
      } catch (error) {
        console.log("Gagal mengirimkan data.");
      }
    };

    updateData();
  };

  const handleInvite = async (e) => {
    e.preventDefault;

    try {
      console.log(dataForm);
      const token = localStorage.getItem("access_token");
      await axios.post("http://localhost:3000/api/collaborator/add", dataForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddCollaborator(false);
      setError("");
    } catch (error) {
      setAddCollaborator(false);
      setError(error.response.data.message);
      console.log("Gagal mengirimkan data");
      console.log(error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault;

    setAddCollaborator(!addCollaborator);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  useEffect(() => {
    fetchData();

    if (oldData) {
      setClicked(false);
    }
    setDataForm({ ...dataForm, task_list_id: task_list_id });
  }, [task_list_id]);

  return (
    <>
      <h1>Tugas</h1>
      {error && (
        <>
          <p style={{ color: "red" }}>{error}</p>
        </>
      )}
      {!addCollaborator && (
        <>
          <button onClick={handleAdd}>Invite Collaborator</button>
        </>
      )}
      {addCollaborator && (
        <>
          <table>
            <tbody>
              <tr>
                <td colSpan={2}>
                  <select name="email" id="email" onChange={handleChange}>
                    <option value=""></option>
                    {userList.map((user) => {
                      return (
                        <option value={user.email} key={user.id}>
                          {user.email}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <button onClick={handleInvite}>Invite</button>
                </td>
                <td>
                  <button onClick={handleAdd}>Cancel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Judul</th>
            <th>Status</th>
            <th>Tanggal Deadline</th>
            <th>Action</th>
            <th>Placement</th>
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
                  <button onClick={() => handleSoftDelete(task.id)}>
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
                    disabled={index === dataTask.length - 1 ? true : false}
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
      <Link to="/home">
        <button>Back to Task List</button>
      </Link>
      <Link to={`/task_list/${task_list_id}/create_task`}>
        <button>Add Task</button>
      </Link>
      <button onClick={handleUndo} disabled={clicked}>
        Undo
      </button>
    </>
  );
}
