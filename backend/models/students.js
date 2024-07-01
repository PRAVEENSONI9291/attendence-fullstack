const Sequelize= require('sequelize');

const sequelize= require('../util/database');

const student= sequelize.define('student',
    {
        id:{
            type:Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey:true
        },
        studentName:{
            type:Sequelize.STRING,
            allowNull: false

        },
        studentClass:{
            type:Sequelize.STRING,
            allowNull: false
        },
        enrollmentDate:{
            type:Sequelize.STRING,
            allowNull: false
        }
    }
);

module.exports= student;