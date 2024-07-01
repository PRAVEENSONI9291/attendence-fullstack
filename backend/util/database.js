const Sequelize= require('sequelize');

const sequelize= new Sequelize('attendence','root','Helloworld1*',{
    dialect:"mysql",
    host:"localhost"
});


module.exports= sequelize;