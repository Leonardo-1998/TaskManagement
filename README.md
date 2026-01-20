# 📋 Task Management System

A full-stack application to manage daily tasks with features like reordering, soft delete, and undo.

## 🚀 Tech Stack

- **Frontend:** React.js, Axios, React Router v6
- **Backend:** Node.js, Express.js, JWT Authentication
- **Database:** PostgreSQL

## 🛠️ Key Features

1. **Authentication:** Secure login using JSON Web Tokens.
2. **Task Reordering:** Swap task positions with atomic SQL updates.
3. **Soft Delete:** Delete tasks safely with a recovery option (Undo).
4. **Responsive UI:** Built with clean table layouts and action buttons.

## 📂 API Endpoints

| Method | Endpoint                         | Description                |
| :----- | :------------------------------- | :------------------------- |
| GET    | `/api/task_list`                 | Get all active tasks       |
| PUT    | `/api/task_list/swap`            | Swap position of two tasks |
| PUT    | `/api/task_list/soft_delete/:id` | Mark a task as deleted     |
| DELETE | `/api/task_list/delete/:id`      | Permanent delete from DB   |

## ⚙️ Installation

1. Clone the repository.
2. Run `npm install` in both `frontend` and `backend` folders.
3. Setup `.env` file for Database URL and JWT Secret.
4. Run `npm start` (Frontend) and `npm run dev` (Backend).
