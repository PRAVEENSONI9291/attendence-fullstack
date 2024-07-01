const Sequelize= require('sequelize');

const sequelize= require('../util/database');

const studentAttendence= sequelize.define('studentAttendence',
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
        date:{
            type:Sequelize.STRING,
            allowNull: false
        },
        attendenceStatus:{
            type:Sequelize.STRING,
            allowNull:false

        },
        studentId:{
            type:Sequelize.INTEGER,
            allowNull:false

        }

    }
);

module.exports= studentAttendence;