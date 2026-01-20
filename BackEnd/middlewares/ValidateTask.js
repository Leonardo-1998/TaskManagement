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
      is_deleted: Joi.boolean().optional(),
      judul: Joi.string().min(3).optional().messages({
        "string.required": "Judul harus diisi",
        "string.required": "Judul minimal 3 karakter",
      }),
      position: Joi.number().required(),
      status: Joi.string().optional(),
      tanggal_deadline: Joi.string().optional().allow(""),
      task_list_id: Joi.number().optional(),
    }),
    upperData: Joi.object({
      id: Joi.number().required(),
      is_deleted: Joi.boolean().optional(),
      judul: Joi.string().min(3).optional().messages({
        "string.required": "Judul harus diisi",
        "string.required": "Judul minimal 3 karakter",
      }),
      position: Joi.number().required(),
      status: Joi.string().optional(),
      tanggal_deadline: Joi.string().optional().allow(""),
      task_list_id: Joi.number().optional(),
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
