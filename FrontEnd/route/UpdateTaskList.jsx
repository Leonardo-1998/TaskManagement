import axios from "axios";
import { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";

export default function UpdateTaskList() {
  const navigate = useNavigate();
  const { task_list_id } = useParams();
  const [dataForm, setDataForm] = useState({ nama: "", deskripsi: "" });
  const [oldData, setOldData] = useState({ nama: "", deskripsi: "" });

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
    const updateData = async () => {
      try {
        await axios.put(
          `http://localhost:3000/api/task_list/update/${task_list_id}`,
          dataForm,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        navigate("/home", { state: oldData });
      } catch (error) {
        console.log("Gagal mengirimkan data.");
      }
    };

    updateData();
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/task_list/update/${task_list_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setDataForm({
          nama: response.data.message.nama,
          deskripsi: response.data.message.deskripsi,
        });
        setOldData(response.data.message);
      } catch (error) {
        console.log("Gagal mengambil data.");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex min-h-[calc(100vh-60px)] items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Update Task List</CardTitle>
            <CardDescription>Update a task list</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onFormSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="nama">Nama</Label>
                  <Input
                    type="text"
                    name="nama"
                    id="nama"
                    onChange={handleChange}
                    value={dataForm.nama}
                    placeholder="Enter task list name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deskripsi">Description</Label>
                  <Textarea
                    placeholder="Type your description here."
                    name="deskripsi"
                    id="deskripsi"
                    type="text"
                    onChange={handleChange}
                    value={dataForm.deskripsi}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Update Task List
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button className="w-full" asChild>
              <Link to={`/home`}>Cancel</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
