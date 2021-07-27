'use strict';

const uuid = require('uuid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    debugger
    const {DataTypes} = Sequelize
    return queryInterface.sequelize.transaction( async t => {
      await Promise.all([
        queryInterface.createTable('users', {
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
            defaultValue: '',
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
          createdAt:{
            type: DataTypes.DATE,
            field: 'created_at',
            defaultValue: Sequelize.NOW,
            allowNull: false,
          },
          updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
          }
        }, { transaction: t }),

        queryInterface.createTable('permissions',{
          role: {
            type: DataTypes.ENUM('admin', 'user'),
            primaryKey: true,
            defaultValue: 'user',
            allowNull: false,
          },
          createdAt:{
            type: DataTypes.DATE,
            field: 'created_at',
            defaultValue: Sequelize.NOW,
            allowNull: false,
          },
          updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
          }
        }, { transaction: t })
      ]);
      await Promise.all([
        queryInterface.createTable('user_permissions',{
          id: {
            type: DataTypes.UUID,
            unique: true,
            allowNull: false,
            defaultValue: () => uuid.v4(),
            primaryKey: true
          },
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
            defaultValue: Sequelize.NOW,
            allowNull: false,
          },
          updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
          }
        }, { transaction: t }),
        queryInterface.createTable('service_providers',{
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
            defaultValue: Sequelize.NOW
          },
          updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
          }
        }, { transaction: t }),
      ]);
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
