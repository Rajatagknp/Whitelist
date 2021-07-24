
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("permissions", {
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      primaryKey: true,
      defaultValue: 'user',
      allowNull: false,
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