const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const UserPermissions = sequelize.define("user_permissions", {
    user_uid: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'uid'
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    permission_role: {
      type: DataTypes.ENUM('admin', 'user'),
      references: {
        model: 'permissions',
        key: 'role'
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    createdAt:{
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
  return UserPermissions;
}