const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const UsersPermission = sequelize.define("UsersPermission", {
    UID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Permission: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
  });
  return UsersPermission;
}