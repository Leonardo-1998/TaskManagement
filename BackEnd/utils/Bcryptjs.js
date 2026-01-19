const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
