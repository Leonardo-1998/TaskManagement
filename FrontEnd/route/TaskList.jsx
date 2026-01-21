import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontalIcon, MoveUp, MoveDown } from "lucide-react";

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
      await fetchData();
    } catch (error) {
      console.log("Gagal melakukan pertukaran");
      console.log(error);
    }
  };

  const handleSwapUp = (index) => {
    const dataToSwap = {
      upperData: {
        id: dataTaskList[index - 1].id,
        position: dataTaskList[index - 1].position,
      },
      lowerData: {
        id: dataTaskList[index].id,
        position: dataTaskList[index].position,
      },
    };
    handleSwap(dataToSwap);
  };

  const handleSwapDown = (index) => {
    const dataToSwap = {
      upperData: {
        id: dataTaskList[index].id,
        position: dataTaskList[index].position,
      },
      lowerData: {
        id: dataTaskList[index + 1].id,
        position: dataTaskList[index + 1].position,
      },
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
        const token = localStorage.getItem("access_token");
        await axios.put(
          `http://localhost:3000/api/task_list/update/${oldData.id}`,
          { nama: oldData.nama, deskripsi: oldData.deskripsi },
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
        console.log(error);
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
      <div className="flex justify-center item-start pt-[5vh]">
        <Card className="w-[95%] mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Task List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="table-auto">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-base w-16">No.</TableHead>
                  <TableHead className="text-base">Nama</TableHead>
                  <TableHead className="text-base">Deskripsi</TableHead>
                  <TableHead className="text-right text-base w-24">
                    Actions
                  </TableHead>
                  <TableHead className="text-base w-32">Placement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataTaskList.map((taskList, index) => {
                  return (
                    <TableRow key={taskList.id}>
                      <TableCell className="font-medium text-base">
                        {index + 1}
                      </TableCell>
                      <TableCell className="text-base">
                        {taskList.nama}
                      </TableCell>
                      <TableCell className="text-base">
                        {taskList.deskripsi}
                      </TableCell>
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
                              <Link to={`/task_list/${taskList.id}`}>
                                Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/task_list/${taskList.id}/update`}>
                                Update
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => handleDelete(taskList.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => handleSoftDelete(taskList.id)}
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
                            disabled={index === dataTaskList.length - 1}
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
                  <TableCell colSpan={5}>
                    <div className="flex gap-4">
                      <Button asChild>
                        <Link to={"/add_task_list"}>Add Task List</Link>
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
