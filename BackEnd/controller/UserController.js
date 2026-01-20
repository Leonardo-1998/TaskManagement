const pool = require("../config/Config");
const { hashPassword, comparePassword } = require("../utils/Bcryptjs");
const { signToken } = require("../utils/JWT");

class UserController {
  static async registerUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const data = await UserController.getUserByEmail(email);
      if (data) {
        const error = new Error("Email sudah digunakan");
        error.statusCode = 400;
        throw error;
      }

      const hashedPassword = await hashPassword(password);

      const query = `
            INSERT INTO "Users" (email, password) 
            VALUES ($1, $2)
            RETURNing email
        `;

      const values = [email, hashedPassword];

      const { rows: userEmail } = await pool.query(query, values);

      res.status(200).json({
        statusCode: 200,
        message: userEmail,
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const data = await UserController.getUserByEmail(email);

      if (!data) {
        const error = new Error("Email atau Password tidak sesuai!");
        error.statusCode = 400;
        throw error;
      }

      const samePassword = await comparePassword(password, data.password);

      if (!samePassword) {
        const error = new Error("Email atau Password tidak sesuai!");
        error.statusCode = 400;
        throw error;
      }

      const payload = { id: data.id, email: data.email };
      const accessToken = signToken(payload);

      res.status(200).json({
        statusCode: 200,
        access_token: accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserByEmail(email) {
    try {
      const query = `
            SELECT * FROM "Users"
            WHERE email = $1
        `;

      const values = [email];
      const { rows: userData } = await pool.query(query, values);
      return userData[0];
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
