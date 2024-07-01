let studentList= document.getElementById('studentList');
let attendenceform= document.getElementById('getAttendenceForm');
let addNewStudentForm= document.getElementById('addNewStudentForm');
// let markAttendenceButton= document.getElementById('markAttendenceButton');
let fetchReport= document.getElementById('fetchReport');



attendenceform.addEventListener('submit', getAttendenceReport);
addNewStudentForm.addEventListener('submit', addStudent);
// markAttendenceButton.addEventListener('click', markAttendence);
fetchReport.addEventListener('click', fetchStudentReport);



let url= 'http://localhost:3000/attendence'

async function fetchStudentReport(e){
    e.preventDefault();
    studentList.innerHTML="";


let studentClass= document.getElementById('searchClass').value;

try {
    
    let resp= await axios.get(`${url}/report?studentClass=${studentClass}`);
    // console.log(resp.data);
    let myobj={};
    // console.log(resp.data[0].studentId);

    for(let i=0;i<resp.data.length;i++)
        {
            // console.log(myobj.hasOwnProperty(resp.data[i].studentId));
            if(myobj.hasOwnProperty(resp.data[i].studentId))
                {
                    if(resp.data[i].attendenceStatus==="present")
                        {
                            myobj[resp.data[i].studentId].present+=1;
                        }
                        else{
                            myobj[resp.data[i].studentId].absent+=1;

                        }
                }
                else{
                    let present=0;
                    let absent=0;
                    if(resp.data[i].attendenceStatus==="present")
                        {
                            present+=1;
                        }
                        else{
                            absent+=1;

                        }
                        

                    myobj[resp.data[i].studentId]= {studentId:resp.data[i].studentId,  studentName:resp.data[i].studentName, "present":present,"absent":absent };
                    

                }
        
        }
        // console.log(myobj);


        for(let element in myobj){
            let li = document.createElement('li');
            li.className = 'list-group-item';
            li.style.listStyleType = 'none';
            li.style.justifyContent = 'space-between';
            li.style.display = 'flex';
            li.style.backgroundColor = 'rgb(237, 241, 245)';
            
            // console.log(element);

            let name = document.createElement('span');
            // name.id = element.studentId;
            name.textContent = myobj[element].studentName;

            let status = document.createElement('h6');
            let totalPresentCount= myobj[element].present*1;
            let totalAbsentCount= myobj[element].absent*1;
            let totalCount= totalAbsentCount+totalPresentCount;

            let percentage= Math.round(totalPresentCount/totalCount*100);

           


            let attendenceIcon= `${totalPresentCount}/${totalCount}`
            status.textContent = attendenceIcon;



            let status1 = document.createElement('h6');
            // status1.style.marginLeft='5rem';
            

            



            let attendenceIcon1= `${percentage}%`
            status1.textContent = attendenceIcon1;
           

            li.appendChild(name);
            li.appendChild(status);
            li.appendChild(status1);

            studentList.appendChild(li);
            
        }


        // console.log(myobj);
    
} catch (error) {
    
}


}


async function markAttendence(e){
    e.preventDefault();

//    studentList.forEach(element=>{

//    }) 
     let arr=[];
     let isAllDataFilled=true;

    
       
        for(let i=0; i<studentList.childNodes.length-1;i++)
            {
                let item= studentList.childNodes[i];
                let studentId= item.firstChild.id;
                let studentName= item.firstChild.innerHTML;
                let attendenceStatus="";
        
                // const secondnode = document.querySelector('#parent :nth-child(3)');
                // console.log(item);
        
                let radioDiv= document.getElementById(`radioDiv_${studentId}`);
                if(radioDiv.firstChild.checked)
                    {
                        attendenceStatus="present"
                    }
                    else if(radioDiv.children.item(2).checked){
                        attendenceStatus="absent"
                    }
                    else{
                        alert("please mark all the attendence")
                        
                        studentList.innerHTML="";
                        return;
                        
                    }
                    // console.log(radioDiv.children.item(3));
                    let selectDate= document.getElementById('getReportwithdate').value;
                    let selectClass= document.getElementById('selectClass').value;
        
                    let myobj= {
                        studentId:studentId,
                        studentName:studentName,
                        attendenceStatus:attendenceStatus,
                        date:selectDate,
                        studentClass: selectClass
        
                    }
        
                    arr.push(myobj)
                
            }
    

    

   
    
      axios.post(`${url}/mark`,arr)
      studentList.innerHTML='';
      attendenceform.reset();


   

}

function displayList(obj){
    studentList.innerHTML='';
    console.log('this is running');
    console.log(obj);
    if(obj[0] && obj[0].attendenceStatus)
        {
            obj.forEach(element => {
                let li = document.createElement('li');
                li.className = 'list-group-item';
                li.style.listStyleType = 'none';
                li.style.justifyContent = 'space-between';
                li.style.display = 'flex';
                li.style.backgroundColor = 'rgb(237, 241, 245)';
    
                let name = document.createElement('span');
                name.id = element.id;
                name.textContent = element.studentName;
    
                let status = document.createElement('h6');
                status.textContent = element.attendenceStatus;
                if(element.attendenceStatus=="present")
                    {
                        status.style.color='green';
                    }
                    else{
                        status.style.color="red";
                    }
    
                li.appendChild(name);
                li.appendChild(status);
    
                studentList.appendChild(li);
                
            });

            
        }
        else{
            obj.forEach(element => {
                console.log('else obj is ',obj);

                let li = document.createElement('li');
            li.className = 'list-group-item';
            li.style.listStyleType = 'none';
            li.style.justifyContent = 'space-between';
            li.style.display = 'flex';
            li.style.backgroundColor = 'rgb(237, 241, 245)';

            let name = document.createElement('span');
            name.id = element.id;
            name.textContent = element.studentName;

            let div = document.createElement('div');
            div.id= `radioDiv_${element.id}`;

            let presentInput = document.createElement('input');
            presentInput.type = 'radio';
            presentInput.name = `attendence_${element.id}`;
            presentInput.id = `presentmark_${element.id}`;
            presentInput.value = '';

            let presentLabel = document.createElement('label');
            presentLabel.htmlFor = `presentmark_${element.id}`;
            presentLabel.textContent = 'PRESENT';

            let absentInput = document.createElement('input');
            absentInput.type = 'radio';
            absentInput.name = `attendence_${element.id}`;
            absentInput.id = `absentmark_${element.id}`;
            absentInput.style.marginLeft = '2rem';

            absentInput.value = '';

            let absentLabel = document.createElement('label');
            absentLabel.htmlFor = `absentmark_${element.id}`;
            absentLabel.textContent = 'ABSENT';

            div.appendChild(presentInput);
            div.appendChild(presentLabel);
            div.appendChild(absentInput);
            div.appendChild(absentLabel);

            li.appendChild(name);
            li.appendChild(div);

            studentList.appendChild(li);

            })

            let markButton = document.createElement('button');
            markButton.id = 'markAttendenceButton';
            markButton.type = 'button';
            markButton.className = 'btn btn-success';
            markButton.style.marginTop = '1rem';
            markButton.textContent = 'Mark Attendance';
    
            studentList.appendChild(markButton);

            markButton.addEventListener('click', markAttendence);

            
            
        }
        return;
    

}



async function getAttendenceReport(e){
    e.preventDefault();
    
    let date= document.getElementById('getReportwithdate').value;
    let standard= document.getElementById('selectClass').value;

    let myobj={
        date:date,
        class:standard
    }
    
    // console.log(JSON.stringify(myobj));

    try {


        let resp= await axios.get(`${url}?date=${myobj.date}&class=${myobj.class}`);
        displayList(resp.data);

        
    } catch (error) {
        console.log("error found");
        
    }    
    return;

}

async function addStudent(e){
e.preventDefault();

let name= document.getElementById('newStudentName').value;
let enrollmentDate= document.getElementById('enrollmentDate').value;
let standard= document.getElementById('newStudentClass').value;

let myobj={
    studentName: name,
    enrollmentDate:enrollmentDate,
    studentClass:standard
}


console.log(myobj);
addNewStudentForm.reset();



try {

    await axios.post(url, myobj);
    // document.getElementById('newStudentName').value=""
    // document.getElementById('enrollmentDate').value=""
    // document.getElementById('newStudentClass').value=""



    
} catch (error) {
    console.log('error found in frontend');
}
// document.getElementById('addNewStudentForm').reset();

}