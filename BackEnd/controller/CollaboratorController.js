const pool = require("../config/Config");
const { getUserByEmail } = require("./UserController");

class CollaboratorController {
  static async addCollaborator(req, res, next) {
    try {
      const { task_list_id, email } = req.body;
      const user = await getUserByEmail(email);

      const checkUser = await CollaboratorController.getOneCollaborator(
        task_list_id,
        user.id,
      );

      console.log(checkUser);
      if (checkUser) {
        const error = new Error("Collaborator sudah terdaftar");
        error.statusCode = 400;
        throw error;
      }

      const query = `
            INSERT INTO "Collaborators" (task_list_id, user_id) 
            VALUES ($1, $2)
            RETURNING *
        `;

      const values = [task_list_id, user.id];
      console.log(values);
      const { rows: userData } = await pool.query(query, values);
      res.status(200).json({
        statusCode: 200,
        message: userData,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getOneCollaborator(task_list_id, user_id) {
    try {
      const query = `
        SELECT * FROM "Collaborators"
        WHERE task_list_id = $1 AND user_id = $2 
      `;

      const values = [task_list_id, user_id];
      const { rows: user } = await pool.query(query, values);
      return user[0];
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CollaboratorController;
