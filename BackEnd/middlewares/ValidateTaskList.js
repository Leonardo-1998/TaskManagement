const Joi = require("joi");
const validateDataTaskList = (req, res, next) => {
  const schema = Joi.object({
    nama: Joi.string().min(3).required().messages({
      "string.required": "Nama harus diisi",
      "string.min": "Nama minimal 3 karakter",
    }),
    deskripsi: Joi.string().optional().allow(""),
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
      daftar_tugas: Joi.string().optional().allow(null, ""),
      deskripsi: Joi.string().optional().allow(""),
      id: Joi.number().required().messages({
        "number.required": "Id harus ada.",
      }),
      is_deleted: Joi.boolean().optional(),
      nama: Joi.string().optional(),
      position: Joi.number().required().messages({
        "number.required": "Position harus ada.",
      }),
      user_id: Joi.number().optional(),
    }),
    upperData: Joi.object({
      daftar_tugas: Joi.string().optional().allow(null, ""),
      deskripsi: Joi.string().optional().allow(""),
      id: Joi.number().required().messages({
        "number.required": "Id harus ada.",
      }),
      is_deleted: Joi.boolean().optional(),
      nama: Joi.string().optional(),
      position: Joi.number().required().messages({
        "number.required": "Position harus ada.",
      }),
      user_id: Joi.number().optional(),
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

module.exports = { validateDataTaskList, validateSwapData };
