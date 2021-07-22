const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    Name: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },
    Contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Users;
}