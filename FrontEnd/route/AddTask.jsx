import axios from "axios";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddTask() {
  const navigate = useNavigate();
  const { task_list_id } = useParams();
  const [dataForm, setDataForm] = useState({
    judul: "",
    status: "To Do",
    tanggal_deadline: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    const postData = async () => {
      try {
        await axios.post(
          `http://localhost:3000/api/task/${task_list_id}/create`,
          dataForm,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        navigate(`/task_list/${task_list_id}`);
      } catch (error) {
        setError(error.response.data.message);
        console.log("Gagal mengirimkan data.");
      }
    };

    postData();
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
          <CardDescription>
            Create a new task for your task list
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="judul">Judul</Label>
                <Input
                  id="judul"
                  name="judul"
                  type="text"
                  placeholder="Enter task title"
                  onChange={handleChange}
                  value={dataForm.judul}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
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
              <div className="flex gap-2">
                <Button type="submit" className="w-1/2">
                  Add Task
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-1/2"
                  asChild
                >
                  <Link to={`/task_list/${task_list_id}`}>Cancel</Link>
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
