import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UpdateTask() {
  const navigate = useNavigate();
  const { task_list_id, task_id } = useParams();
  const [dataForm, setDataForm] = useState({
    judul: "",
    status: "To Do",
    tanggal_deadline: "",
  });
  const [oldData, setOldData] = useState({
    judul: "",
    status: "To Do",
    tanggal_deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    console.log(dataForm);
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

        navigate(`/task_list/${task_list_id}`, { state: oldData });
      } catch (error) {
        console.log("Gagal mengirimkan data.");
        console.log(error);
      }
    };

    updateData();
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/task/${task_list_id}/update/${task_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setDataForm({
          judul: response.data.message.judul,
          status: response.data.message.status,
          tanggal_deadline: response.data.message.tanggal_deadline,
        });
        setOldData(response.data.message);
      } catch (error) {
        console.log("Gagal mengambil data.");
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Update Task</CardTitle>
            <CardDescription>
              Update a new task for your task list
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="judul">Judul</Label>
                  <Input
                    type="text"
                    name="judul"
                    id="judul"
                    onChange={handleChange}
                    value={dataForm.judul}
                    placeholder="Enter a title"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Status</Label>
                  </div>
                  <Select
                    name="status"
                    value={dataForm.status}
                    onValueChange={(value) =>
                      setDataForm({ ...dataForm, status: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="To Do">To Do</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Done">Done</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tanggal_deadline">Tanggal Deadline</Label>
                  <Input
                    id="tanggal_deadline"
                    name="tanggal_deadline"
                    type="date"
                    onChange={handleChange}
                    value={dataForm.tanggal_deadline}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Update Task
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button className="w-full" asChild>
              <Link to={`/task_list/${task_list_id}`}>
                <button>Cancel</button>
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
