const pool = require("../config/Config");

class TaskController {
  static async getTaskByTaskListId(req, res, next) {
    try {
      const { task_list_id } = req.params;

      const query = `
        SELECT * FROM "Tasks"
        WHERE task_list_id = $1 AND is_deleted = false
        ORDER BY position
      `;

      const values = [task_list_id];
      const { rows: tasksData } = await pool.query(query, values);

      res.status(200).json({
        statusCode: 200,
        message: tasksData,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createNewTask(req, res, next) {
    try {
      const { judul, status, tanggal_deadline } = req.body;
      const { task_list_id } = req.params;

      let position = 1;
      const lastData =
        await TaskController.getLastDataTaskByTaskListId(task_list_id);
      if (lastData) {
        position = lastData.position + 1;
      }

      const query = `
      INSERT INTO "Tasks" (judul, status, tanggal_deadline, position, is_deleted, task_list_id) 
      VALUES ($1, $2, $3, $4, false, $5)
      RETURNING *
      `;

      const values = [judul, status, tanggal_deadline, position, task_list_id];

      const { rows: tasksList } = await pool.query(query, values);

      res.status(200).json({
        statusCode: 200,
        message: tasksList[0],
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async swapTask(req, res, next) {
    try {
      const { upperData, lowerData } = req.body;

      const searchUpperData = await TaskController.getOneTask(upperData.id);
      const searchLowerData = await TaskController.getOneTask(lowerData.id);
      if (!searchUpperData && searchLowerData) {
        const error = new Error("Tidak ada data yang diupdate.");
        error.statusCode = 400;
        throw error;
      }

      const query = `
            UPDATE "Tasks"
            SET position = CASE
              WHEN id = $1 THEN $2::integer
              WHEN id = $3 THEN $4::integer
            END
            WHERE id IN ($1, $3)
            RETURNING *
            ;
        `;

      const values = [
        upperData.id,
        parseInt(lowerData.position),
        lowerData.id,
        parseInt(upperData.position),
      ];

      const { rows: dataTasks } = await pool.query(query, values);

      res.status(200).json({
        statusCode: 200,
        message: dataTasks[0],
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getTaskById(req, res, next) {
    try {
      const { id } = req.params;
      const taskData = await TaskController.getOneTask(id);

      res.status(200).json({
        statusCode: 200,
        message: taskData,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req, res, next) {
    try {
      const { judul, status, tanggal_deadline } = req.body;
      const { id } = req.params;

      const search = await TaskController.getOneTask(id);
      if (!search) {
        const error = new Error("Tidak ada data yang diupdate.");
        error.statusCode = 400;
        throw error;
      }

      const query = `
            UPDATE "Tasks"
            SET judul = $1,
              status = $2,
              tanggal_deadline=$3
            WHERE id = $4
            RETURNING *
            ;
        `;

      const values = [judul, status, tanggal_deadline, id];

      const { rows: dataTasks } = await pool.query(query, values);

      res.status(200).json({
        statusCode: 200,
        message: dataTasks[0],
      });
    } catch (error) {
      next(error);
    }
  }

  static async softDeleteTask(req, res, next) {
    try {
      const { id } = req.params;

      const search = await TaskController.getOneTask(id);
      if (!search) {
        const error = new Error("Tidak ada data yang diupdate.");
        error.statusCode = 400;
        throw error;
      }

      const query = `
            UPDATE "Tasks"
              SET is_deleted = true
            WHERE id = $1
            RETURNING *
            ;
        `;

      const values = [id];

      const { rows: dataTasks } = await pool.query(query, values);

      res.status(200).json({
        statusCode: 200,
        message: dataTasks[0],
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const { id } = req.params;

      const search = await TaskController.getOneTask(id);
      if (!search) {
        const error = new Error("Tidak ada data yang didelete.");
        error.statusCode = 400;
        throw error;
      }

      const query = `
            DELETE FROM "Tasks"
            WHERE id = $1
            RETURNING *
        `;

      const values = [id];
      const { rows: deletedTask } = await pool.query(query, values);

      res.status(200).json({
        statusCode: 200,
        message: deletedTask[0],
      });
    } catch (error) {
      next(error);
    }
  }

  static async getOneTask(id) {
    const query = `
      SELECT * FROM "Tasks"
      WHERE id = $1
    `;

    const values = [id];
    const { rows: dataTask } = await pool.query(query, values);
    return dataTask[0];
  }

  static async getLastDataTaskByTaskListId(task_list_id) {
    const query = `
      SELECT * FROM "Tasks"
      WHERE task_list_id = $1
      ORDER BY position DESC
      LIMIT 1
    `;

    const values = [task_list_id];
    const { rows: lastData } = await pool.query(query, values);
    return lastData[0];
  }
}

module.exports = TaskController;
