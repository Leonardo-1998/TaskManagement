const pool = require("../config/Config");

class TaskListController {
  static async getAllTasksList(req, res, next) {
    try {
      const query = `
        SELECT * FROM "Task_Lists" 
      `;

      const { rows: tasksListData } = await pool.query(query);

      res.status(200).json({
        statusCode: 200,
        message: tasksListData,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllTasksListByUser(req, res, next) {
    try {
      const { id } = req.user;

      const query = `
        SELECT * FROM "Task_Lists"
        WHERE user_id = $1
      `;

      const values = [id];
      const { rows: tasksListData } = await pool.query(query, values);

      res.status(200).json({
        statusCode: 200,
        message: tasksListData,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createNewTaskList(req, res, next) {
    try {
      const { nama, deskripsi } = req.body;
      const { id } = req.user;

      const query = `
            INSERT INTO "Task_Lists" (nama, deskripsi, user_id) 
            VALUES ($1, $2, $3)
            RETURNING *
        `;

      const values = [nama, deskripsi, id];

      const { rows: taskListData } = await pool.query(query, values);

      res.status(200).json({
        statusCode: 200,
        message: taskListData[0],
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateTaskList(req, res, next) {
    try {
      const { nama, deskripsi } = req.body;
      const { id } = req.params;

      const search = TaskListController.getOneTaskList(id);
      if (!search) {
        const error = new Error("Tidak ada data yang diupdate.");
        error.statusCode = 400;
        throw error;
      }

      const query = `
            UPDATE "Task_Lists"
            SET nama = $1,
              deskripsi = $2
            WHERE id = $3
            RETURNING *
            ;
        `;

      const values = [nama, deskripsi, id];

      const { rows: tasksList } = await pool.query(query, values);

      res.status(200).json({
        statusCode: 200,
        message: tasksList[0],
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTaskList(req, res, next) {
    try {
      const { id } = req.params;

      const search = await TaskListController.getOneTaskList(id);
      console.log(search);
      if (!search) {
        const error = new Error("Tidak ada data yang didelete.");
        error.statusCode = 400;
        throw error;
      }

      const query = `
      DELETE FROM "Task_Lists"
      WHERE id = $1
      RETURNING *
    `;

      const values = [id];
      const { rows: deletedTaskList } = await pool.query(query, values);

      res.status(200).json({
        statusCode: 200,
        message: deletedTaskList[0],
      });
    } catch (error) {
      next(error);
    }
  }

  static async getOneTaskList(id) {
    const query = `
      SELECT * FROM "Task_Lists"
      WHERE id = $1
    `;

    const values = [id];
    const { rows: dataTaskList } = await pool.query(query, values);

    return dataTaskList[0];
  }
}

module.exports = TaskListController;
