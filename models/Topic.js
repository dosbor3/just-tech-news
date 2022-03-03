const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Topic extends Model {}

Topic.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        topic_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            },
        },
        tag: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tag',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'topic'
    }
);

module.exports = Topic;