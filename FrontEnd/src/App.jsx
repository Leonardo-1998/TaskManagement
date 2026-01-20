import { Routes, Route, Navigate } from "react-router";
import Register from "../route/Register";
import Login from "../route/Login";
import TaskList from "../route/TaskList";
import Task from "../route/Task";
import AddTaskList from "../route/AddTaskList";
import AuthLayout from "../layout/AuthLayout";
import LoginCheck from "../layout/LoginCheck";
import AddTask from "../route/AddTask";
import UpdateTaskList from "../route/UpdateTaskList";
import UpdateTask from "../route/UpdateTask";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<LoginCheck />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/home" element={<TaskList />} />
          <Route path="/add_task_list" element={<AddTaskList />} />
          <Route path="/task_list/:task_list_id" element={<Task />} />
          <Route
            path="/task_list/:task_list_id/update"
            element={<UpdateTaskList />}
          />
          <Route
            path="/task_list/:task_list_id/create_task"
            element={<AddTask />}
          />
          <Route
            path="/task_list/:task_list_id/update/:task_id"
            element={<UpdateTask />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}
