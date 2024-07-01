const express= require('express');
const bodyParser= require('body-parser');
const cors= require('cors');
const Sequelize= require('sequelize');



const sequelize= require('./util/database');
const student= require('./models/students');
const studentAttendence= require('./models/studentAttendence');
// const attendenceStatus= require('./models/attendenceStatus');



const app= express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{

    res.send("dashboard");
        
});

app.get('/attendence',async (req, res)=>{
    try {
        console.log(req.query);
        

        let data= req.query;
        

        let date= data.date;
        let standard= data.class;

        
        
        let resp= await studentAttendence.findAll({where:{date:date,studentClass:standard}})
        let studentList= await student.findAll({where:{studentClass:standard}})

        if (resp.length===0)
            {
                // console.log(studentList);
                  res.json(studentList);

            }
            else{
                res.json(resp)

            }
        
    } catch (error) {
        console.log("error found");
    }
});

app.post('/attendence',async(req, res)=>{
    console.log(req.body);
    // res.send("attendence posted");

    try {
        await student.create(req.body);
        res.status(201);
        
    } catch (error) {
        
    }

   

});

app.post('/attendence/mark', async(req,res)=>{
    // console.log(req.body);

    let data= req.body;
    try {

        await studentAttendence.bulkCreate(data);
       

    } catch (error) {
        console.log("backend error while bulkcreating studentattendence");
        
    }
    
})

app.get('/attendence/report', async(req,res)=>{
    console.log(req.query);
    let studentClass= req.query.studentClass;

    try {
        let resp= await studentAttendence.findAll({where:{studentClass:studentClass}});
        res.json(resp);
        
        
    } catch (error) {
        console.log("error backend fetch");
        
    }
})

// app.get('/attendence/:date',(req, res)=>{
//     res.send("attendence of that date");
// });


// sequelize.sync({force:true})
sequelize.sync()





.then(data=>{
    app.listen(3000);
           
})

.catch(err=>{
    console.log("error");
});


