const Joi = require("joi");

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().min(3).required().messages({
      "string.email": "Format email tidak valid",
      "string.required": "Email harus diisi",
    }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({ "string.min": "Panjang password minimal 6 karakter" }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    return next(err);
  }

  next();
};

module.exports = { validateUser };
