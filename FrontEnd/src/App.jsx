import { Routes, Route } from "react-router";
import Register from "../route/Register";
import Login from "../route/Login";
import Home from "../route/Home";
import TaskList from "../route/TaskList";
import AddTaskList from "../route/AddTaskList";
import AuthLayout from "../layout/AuthLayout";
import LoginCheck from "../layout/LoginCheck";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<LoginCheck />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/add_task_list" element={<AddTaskList />} />
          <Route path="/task_list/:taskListId" element={<TaskList />} />
        </Route>
      </Routes>
    </>
  );
}
