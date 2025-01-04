const { DataTypes } = require('sequelize');
const db = require('../database/connection');
const { baseConfigs } = require('../database/template')
const { encryptPassword } = require('../utils/functions')

const User = db.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    ...baseConfigs,
    tableName: 'users',
    timestamps: true,
    hooks: {
        beforeCreate: async(instance, options) =>{
            instance.password = encryptPassword(instance.password);
        },
    }
})

module.exports = User;