const pool = require("../config/Config");
const { search } = require("../routes/TaskRouter");

class TaskController {
  static async getAllTasks(req, res, next) {
    try {
      const query = `
        SELECT * FROM "Tasks" 
      `;

      const { rows: tasksData } = await pool.query(query);

      res.status(200).json({
        statusCode: 200,
        message: tasksData[0],
      });
    } catch (error) {
      next(error);
    }
  }

  static async createNewTask(req, res, next) {
    try {
      const { judul, status, tanggal_deadline } = req.body;

      let statusString = "";
      if (status === "1") {
        statusString = "To Do";
      } else if (status === "2") {
        statusString = "In Progress";
      } else {
        statusString = "Done";
      }

      const query = `
            INSERT INTO "Tasks" (judul, status, tanggal_deadline) 
            VALUES ($1, $2, $3)
            RETURNING *
        `;

      const values = [judul, statusString, tanggal_deadline];

      const { rows: tasksList } = await pool.query(query, values);

      res.status(200).json({
        statusCode: 200,
        message: tasksList[0],
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

      let statusString = "";
      if (status === "1") {
        statusString = "To Do";
      } else if (status === "2") {
        statusString = "In Progress";
      } else {
        statusString = "Done";
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

      const values = [judul, statusString, tanggal_deadline, id];
      const { rows: dataTasks } = await pool.query(query, values);

      res.status(200).json({
        statusCode: 200,
        message: dataTasks[0],
      });
    } catch (error) {
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
}

module.exports = TaskController;
