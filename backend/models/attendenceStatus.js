const Sequelize= require('sequelize');

const sequelize= require('../util/database');

const date= sequelize.define('attendenceStatus',
    {
        id:{
            type:Sequelize.INTEGER,
            allowNull: false,
            primaryKey:true,
            autoIncrement:true
        },
        date:{
            type:Sequelize.STRING,
            allowNull: false

        },
        class:{
            type:Sequelize.STRING,
            allowNull: false

        },
        attendenceTaken:{
            type:Sequelize.BOOLEAN,
            allowNull: false

        }
    }
);

module.exports= date;