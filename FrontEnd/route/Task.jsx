import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams, Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreHorizontalIcon, MoveUp, MoveDown } from "lucide-react";

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

    const token = localStorage.getItem("access_token");
    const updateData = async () => {
      try {
        await axios.put(
          `http://localhost:3000/api/task/${task_list_id}/update/${oldData.id}`,
          {
            judul: oldData.judul,
            status: oldData.status,
            tanggal_deadline: oldData.tanggal_deadline,
          },
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

  useEffect(() => {
    fetchData();

    if (oldData) {
      setClicked(false);
    }
    setDataForm({ ...dataForm, task_list_id: task_list_id });
  }, [task_list_id]);

  return (
    <>
      <div className="flex flex-col items-center gap-6 pt-[5vh]">
        <Card size="sm" className="mx-auto w-full max-w-sm">
          <CardHeader>
            <CardTitle>Invite Collaborator</CardTitle>
            <CardDescription>
              Invite other user to edit this task list by email
            </CardDescription>
          </CardHeader>
          {!addCollaborator && (
            <>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={handleAdd}
                >
                  Invite Collaborator
                </Button>
              </CardFooter>
            </>
          )}

          {addCollaborator && (
            <>
              <CardContent>
                <Select
                  name="email"
                  id="email"
                  onValueChange={(value) =>
                    setDataForm({ ...dataForm, email: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an email" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Email</SelectLabel>
                      {userList.map((user) => {
                        return (
                          <SelectItem value={user.email} key={user.id}>
                            {user.email}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-1/2"
                  onClick={handleInvite}
                >
                  Invite
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-1/2"
                  onClick={handleAdd}
                >
                  Cancel
                </Button>
              </CardFooter>
            </>
          )}
        </Card>

        <Card className="w-[70%] mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl flex justify-center">Task</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className={"table-auto"}>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-base w-16">No.</TableHead>
                  <TableHead className="text-base">Judul</TableHead>
                  <TableHead className="text-base w-32">Status</TableHead>
                  <TableHead className="text-base w-40">
                    Tanggal Deadline
                  </TableHead>
                  <TableHead className="text-right text-base w-24">
                    Actions
                  </TableHead>
                  <TableHead className="text-base w-32">Placement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataTask.map((task, index) => {
                  return (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{task.judul}</TableCell>
                      <TableCell>{task.status}</TableCell>
                      <TableCell>{task.tanggal_deadline}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                            >
                              <MoreHorizontalIcon />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link
                                to={`/task_list/${task_list_id}/update/${task.id}`}
                              >
                                Update
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => handleDelete(task.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => handleSoftDelete(task.id)}
                            >
                              Soft Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={index === 0}
                            onClick={() => handleSwapUp(index)}
                          >
                            <MoveUp />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={index === dataTask.length - 1}
                            onClick={() => handleSwapDown(index)}
                          >
                            <MoveDown />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="flex gap-4">
                      <Button asChild>
                        <Link to="/home">Back to Task List</Link>
                      </Button>
                      <Button asChild>
                        <Link to={`/task_list/${task_list_id}/create_task`}>
                          Add Task
                        </Link>
                      </Button>
                      <Button onClick={handleUndo} disabled={clicked}>
                        Undo
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
