# 📋 Task Management System

A full-stack task management application featuring dynamic reordering (swap), soft deletion with undo capabilities, and secure JWT authentication.

## 🚀 Tech Stack

- **Frontend:** React.js, Axios, React Router v7, Tailwind CSS 4, Radix UI, Lucide React, Vite 7
- **Backend:** JavaScript (Node.js), Express.js, JWT Authentication, Bcryptjs, Joi
- **Database:** PostgreSQL

## 🛠️ Key Features

1. **Authentication:** Register and login with hashed passwords and JWT.
2. **Task Reordering:** Swap task positions using SQL updates.
3. **Soft Delete:** Safeguard data by marking records as deleted instead of immediate removal.
4. **Undo Update:** Restore recently updated tasks using React Router state.
5. **Request Validation**: Strict data integrity checks using Joi middlewares.

## 📂 Database Schema

The database consists of three main tables:

1. **Users**: Stores credentials (email, hashed password).
2. **Task_Lists**: Groups of tasks belonging to a specific user.
3. **Tasks**: Groups of items with title, status, and tanggal_deadline belongin to a specific task list.
4. **Collaborators**: Groups of items with task_list_id, and user_id.

## 📡 API Endpoints

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

```bash
git clone https://github.com/Leonardo-1998/TaskManagement.git
cd TaskManagement
```

2. Run `npm install` in both `frontend` and `backend` folders.

```bash
# Install backend dependencies

cd backend
npm install

# Install frontend dependencies

cd ../frontend
npm install
```

3. Setup `.env` file for Database user and password and JWT Secret.

```bash
JWT_KEY=#####
USER_DB=#####
PASSWORD_DB=#####
```

4. Run `npm run dev` (Frontend) and `npm run mig`, `npm run dev` (Backend).

```bash
# Run backend (from backend folder)
npm run mig
npm run dev

# Run frontend (from frontend folder)
npm run dev
```

## Fitur bonus yang ditambahkan

- Undo/redo untuk edit task.
- Soft delete untuk task/task list.
