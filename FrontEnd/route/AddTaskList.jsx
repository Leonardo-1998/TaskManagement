import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

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

export default function AddTaskList() {
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({ nama: "", deskripsi: "" });
  const [error, setError] = useState("");

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
    const postData = async () => {
      try {
        await axios.post(
          "http://localhost:3000/api/task_list/create",
          dataForm,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        navigate("/home");
      } catch (error) {
        setError(error.response.data.message);
        console.log("Gagal mengirimkan data.");
      }
    };

    postData();
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Add New Task List</CardTitle>
            <CardDescription>Create a new task list</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <>
                <p style={{ color: "red" }}>{error}</p>
              </>
            )}
            <form onSubmit={onFormSubmit}>
              <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="nama">Nama</Label>

                  <Input
                    id="nama"
                    name="nama"
                    type="text"
                    placeholder="Enter task list name"
                    required
                    onChange={handleChange}
                    value={dataForm.nama}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="deskripsi">Deskripsi</Label>
                  </div>
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
                  Add
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button className="w-full" variant="outline" asChild>
              <Link to="/home">Cancel</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
