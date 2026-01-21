const Joi = require("joi");
const validateDataTask = (req, res, next) => {
  const schema = Joi.object({
    judul: Joi.string().min(3).required().messages({
      "string.required": "Judul harus diisi",
      "string.min": "Judul minimal 3 karakter",
    }),
    status: Joi.string()
      .required()
      .messages({ "string.required": "Status tidak boleh kosong" }),
    tanggal_deadline: Joi.string().allow("").optional(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    return next(err);
  }

  next();
};

const validateSwapData = (req, res, next) => {
  const schema = Joi.object({
    lowerData: Joi.object({
      id: Joi.number().required(),
      position: Joi.number().required(),
    }),
    upperData: Joi.object({
      id: Joi.number().required(),
      position: Joi.number().required(),
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    return next(err);
  }

  next();
};

module.exports = { validateDataTask, validateSwapData };
