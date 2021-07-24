const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("users", {
    id: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      defaultValue: () => uuid.v4(),
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: 'server@gmail.com',
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    uid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: sequelize.NOW,
      allowNull: false,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      allowNull: false,
    }
  });
}