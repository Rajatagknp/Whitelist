const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const ServiceProviders = sequelize.define("ServiceProviders", {
    UID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Area: {
      type: DataTypes.STRING,
    },
    City: {
      type: DataTypes.STRING,
    },
    District: {
      type: DataTypes.STRING,
    },
    Pincode: {
      type: DataTypes.STRING,
    },
    State: {
      type: DataTypes.STRING,
    },
    Country: {
      type: DataTypes.STRING,
    },
    Service: {
      type: DataTypes.STRING,
    },
    Status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending',
    },
    RejectReason: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
  });
  return ServiceProviders;
}