const pool = require("../config/Config");

class TaskListController {
  static async getAllTasksListByUser(req, res, next) {
    try {
      const { id } = req.user;

      const query = `
        SELECT * FROM "Task_Lists"
        WHERE user_id = $1
        ORDER BY position
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

      let position = 1;
      const lastData = await TaskListController.getLastDataTaskList(id);
      if (lastData) {
        position = lastData.position + 1;
      }

      const query = `
            INSERT INTO "Task_Lists" (nama, deskripsi, position, user_id) 
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
      const values = [nama, deskripsi, position, id];
      const { rows: taskListData } = await pool.query(query, values);

      res.status(200).json({
        statusCode: 200,
        message: taskListData[0],
      });
    } catch (error) {
      next(error);
    }
  }

  static async swapTaskList(req, res, next) {
    try {
      const { upperData, lowerData } = req.body;

      const searchUpperData = await TaskListController.getOneById(upperData.id);
      const searchLowerData = await TaskListController.getOneById(lowerData.id);
      if (!searchUpperData && searchLowerData) {
        const error = new Error("Tidak ada data yang diupdate.");
        error.statusCode = 400;
        throw error;
      }

      const query = `
            UPDATE "Task_Lists"
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

  static async getOneTaskList(req, res, next) {
    try {
      const { id } = req.params;

      const taskListData = await TaskListController.getOneById(id);

      res.status(200).json({
        statusCode: 200,
        message: taskListData,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateTaskList(req, res, next) {
    try {
      const { nama, deskripsi } = req.body;
      const { id } = req.params;

      const search = TaskListController.getOneById(id);
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

      const search = await TaskListController.getOneById(id);
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

  static async getOneById(id) {
    const query = `
      SELECT * FROM "Task_Lists"
      WHERE id = $1
    `;

    const values = [id];
    const { rows: dataTaskList } = await pool.query(query, values);

    return dataTaskList[0];
  }

  static async getLastDataTaskList(id) {
    const query = `
      SELECT * FROM "Task_Lists"
      WHERE user_id = $1
      ORDER BY position DESC
      LIMIT 1
    `;

    const values = [id];
    const { rows: lastData } = await pool.query(query, values);
    return lastData[0];
  }
}

module.exports = TaskListController;
