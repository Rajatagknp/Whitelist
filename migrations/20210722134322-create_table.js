'use strict';

const uuid = require('uuid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction( async t => {
      await Promise.all([
        queryInterface.createTable('users', {
          id: {
            type: Sequelize.DataTypes.UUID,
            unique: true,
            allowNull: false,
            defaultValue: () => uuid.v4(),
          },
          name: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: '',
            allowNull: false,
          },
          email: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: '',
            allowNull: false,
            validate: {
              isEmail: true
            }
          },
          contact: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          uid: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            unique: true,
            primaryKey: true,
          },
          createdAt:{
            type: Sequelize.DataTypes.DATE,
            field: 'created_at',
            defaultValue: Sequelize.NOW,
            allowNull: false,
          },
          updatedAt: {
            field: 'updated_at',
            type: Sequelize.DataTypes.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
          }
        }, { transaction: t }),
        
        queryInterface.createTable('permissions',{
          role: {
            type: Sequelize.DataTypes.ENUM('admin', 'user'),
            primaryKey: true,
            defaultValue: 'user',
            allowNull: false,
          },
          createdAt:{
            type: Sequelize.DataTypes.DATE,
            field: 'created_at',
            defaultValue: Sequelize.NOW,
            allowNull: false,
          },
          updatedAt: {
            field: 'updated_at',
            type: Sequelize.DataTypes.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
          }
        }, { transaction: t })
      ]);
      await Promise.all([
        queryInterface.createTable('user_permissions',{
          user_uid: {
            type: Sequelize.DataTypes.UUID,
            references: {
              model: 'users',
              key: 'uid'
            },
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          permission_role: {
            type: Sequelize.DataTypes.ENUM('admin', 'user'),
            references: {
              model: 'permissions',
              key: 'role'
            },
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          createdAt:{
            type: Sequelize.DataTypes.DATE,
            field: 'created_at',
            defaultValue: Sequelize.NOW,
            allowNull: false,
          },
          updatedAt: {
            field: 'updated_at',
            type: Sequelize.DataTypes.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
          }
        }, { transaction: t }),
        queryInterface.createTable('service_providers',{
          id:{
            type: Sequelize.DataTypes.UUID,
            unique: true,
            primaryKey: true,
            defaultValue: () => uuid.v4(),
            allowNull: false,
          },
          name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
          },
          contact: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          area: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: '',
            allowNull: false,
          },
          city: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
          },
          district: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
          },
          pincode: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
          },
          state: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
          },
          country: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
          },
          service_type: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          status: {
            type: Sequelize.DataTypes.ENUM('pending', 'rejected', 'approved'),
            defaultValue: 'pending',
            allowNull: false,
          },
          reject_reason: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: '',
            allowNull: false,
          },
          user_uid: {
            type: Sequelize.DataTypes.UUID,
            references: {
              model: 'users',
              key: 'uid'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            allowNull: false,
          },
          createdAt:{
            type: Sequelize.DataTypes.DATE,
            field: 'created_at',
            allowNull: false,
            defaultValue: Sequelize.NOW
          },
          updatedAt: {
            field: 'updated_at',
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
          }
        }, { transaction: t }),
      ])
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
