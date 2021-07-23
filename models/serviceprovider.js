const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const ServiceProviders = sequelize.define("service_providers", {
    id:{
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true,
      defaultValue: () => uuid.v4(),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    service_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'rejected', 'approved'),
      defaultValue: 'pending',
      allowNull: false,
    },
    reject_reason: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
    },
    user_uid: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'uid'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
    },
    createdAt:{
      type: DataTypes.DATE,
      field: 'created_at',
      allowNull: false,
      defaultValue: sequelize.NOW
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW
    }
  });
  return ServiceProviders;
}