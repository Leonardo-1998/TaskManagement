# 📋 Task Management System

Aplikasi full-stck yang digunakan untuk mengatur daftar tugas dengan fitur membuat, mengedit, undo edit, delete dan soft delete daftar tugas.

## 🚀 Tech Stack

- **Frontend:** React.js, Axios, React Router v7
- **Backend:** JavaScript (Node.js), Express.js, JWT Authentication, Bcryptjs, Joi,
- **Database:** PostgreSQL

## 🛠️ Key Features

1. **Authentication:** Login dengan JSON Web Tokens.
2. **Task Reordering:** Menukar posisi daftar tugas yang terintegrasi ke dalam SQL.
3. **Soft Delete:** Menghapus data yang ditampilkan tapi masih ada di database (Undo).
4. **Undo Update:** Mengembalikan update data terakhir (Undo).

## 📂 API Endpoints

| Method | Endpoint                                  | Description                                      |
| :----- | :---------------------------------------- | :----------------------------------------------- |
| POST   | `/api/user/register`                      | Register new user                                |
| POST   | `/api/user/login`                         | Login with registered user                       |
| GET    | `/api/task_list`                          | Get all active task list (Not marked as deleted) |
| POST   | `/api/task_list/create`                   | Create new task list                             |
| PUT    | `/api/task_list/swap`                     | Swap position of two task lists                  |
| GET    | `/api/task_list/update/:id`               | Get task list that need to be updated            |
| PUT    | `/api/task_list/update/:id`               | Update task list                                 |
| PUT    | `/api/task_list/soft_delete/:id`          | Mark a task list as deleted                      |
| DELETE | `/api/task_list/delete/:id`               | Permanent delete task list from DB               |
| GET    | `/api/task/:task_list_id`                 | Get all active task (Not marked as deleted)      |
| POST   | `/api/task/:task_list_id/create`          | Create new task                                  |
| PUT    | `/api/task/:task_list_id/swap`            | Swap position of two tasks                       |
| GET    | `/api/task/:task_list_id/update/:id`      | Get task that need to be updated                 |
| PUT    | `/api/task/:task_list_id/update/:id`      | Update task                                      |
| PUT    | `/api/task/:task_list_id/soft_delete/:id` | Mark a task as deleted                           |
| DELETE | `/api/task/:task_list_id/delete/:id`      | Permanent delete task from DB                    |

## ⚙️ Installation

1. Clone the repository.
2. Run `npm install` in both `frontend` and `backend` folders.
3. Setup `.env` file for Database URL and JWT Secret.
4. Run `npm start` (Frontend) and `npm run dev` (Backend).
