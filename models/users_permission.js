module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user_permissions", {
    user_uid: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'uid'
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      primaryKey: true
    },
    permission_role: {
      type: DataTypes.ENUM('admin', 'user'),
      references: {
        model: 'permissions',
        key: 'role'
      },
      defaultValue: 'user',
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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