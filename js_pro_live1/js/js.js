  
var courseName=document.getElementById("courseName");
var courseCat=document.getElementById("courseCat");
var coursePrice=document.getElementById("coursePrice");
var courseDesc=document.getElementById("courseDesc");
var addBtn=document.getElementById("click");//add btn
var data=document.getElementById("data");//tbody
var belbtn=document.getElementById("del-btn");//del all
var currentIndex;



var courses=[];//to mack it global 
//therefor if i declar arr inside fun it will creat an new one each time

if(localStorage.getItem("courselist")==null){
  courses=[];
}else{

//var test=localStorage.getItem("courselist");console.log(test);
courses=JSON.parse(localStorage.getItem("courselist")) ;
readData();
}

addBtn.onclick=function(){
  // alert(courseName.value);
   // document.getElementById("courseName").value;

   //we creat an obj rather than creat var for each one of filds 
   if(addBtn.innerHTML=='Add course'){
    addData();  
   }else {
   // console.log("test");
   updatCourse();
   addBtn.innerHTML="Add course";
   }

  //red
  readData();
//clear 
 clearData();
}



function addData(){
  
   var course={
    name:courseName.value,
    cat:courseCat.value,
    price:coursePrice.value,
    dec:courseDesc.value

   };
   // here we stor in arr then on local storage
   courses.push(course);
   localStorage.setItem("courselist",JSON.stringify(courses) );
}

function readData(){

    var result="";
    for(var i=0 ; i<courses.length; i++){
      result +=`<tr> 
      <td>${i}</td>
      <td>${courses[i].name}</td>  
      <td>${courses[i].cat}</td>
      <td>${courses[i].price}</td>
      <td>${courses[i].dec}</td>
      <td>
      <button type="button" onclick="deletCourse(${i})" class="btn btn-outline-danger">delete </button>
      <button type="button"   onclick="getdata(${i})" class="btn btn-outline-info">update </button>
      </td>
      </tr>`;
    }
   data.innerHTML=result;
  
}

function clearData(){
courseName.value=" ";
courseCat.value=" ";
coursePrice.value=" ";
courseDesc.value=" ";
}

function deletCourse(index){
    courses.splice(index,1);
    localStorage.setItem("courselist",JSON.stringify(courses) );
    readData();
   
}
//delet all 
belbtn.onclick=function(){
  localStorage.removeItem('courselist');
  courses=[];//mack the arr to be empty not just from local storge this delet from arr 
  data.innerHTML="";//the body oh table
}

function search(content){
 // alert("test search fun");
  // if(courses[i].name==content.value){here the reusult does not apper until you write th whole world
 //with include when i start writing the results will start apper
    //e.value insted of this.value in html
 var result = "";
 for( var i=0;i<courses.length;i++){
    if(courses[i].name.toLowerCase().includes(content.value.toLowerCase())){
    console.log(courses);
    result += `<tr> 
    <td>${i}</td>
    <td>${courses[i].name}</td>  
    <td>${courses[i].cat}</td>
    <td>${courses[i].price}</td>
    <td>${courses[i].dec}</td>
    <td>
    <button type="button" onclick="deletCourse(${i})" class="btn btn-outline-danger">delete </button>
    <button type="button"  class="btn btn-outline-info">update </button>
    </td>
    </tr>`;
  }
 }
 data.innerHTML=result;
}
 function getdata(index){  
 // console.log(index); to make sure that i hold the tag in true way 
 var course=courses[index];
 courseName.value=course.name;
 courseCat.value=course.cat;
 courseDesc.value=course.dec;
 coursePrice.value=course.price;
 addBtn.innerHTML="updat Course";
 currentIndex=index;
 }

function updatCourse(){
  var updatcourse={
    name:courseName.value,
    cat:courseCat.value,
    price:coursePrice.value,
    dec:courseDesc.value

   };
   courses[currentIndex].name=updatcourse.name;
   courses[currentIndex].courseCat=updatcourse.cat; 
   courses[currentIndex].courseDesc=updatcourse.dec;
   courses[currentIndex].price=updatcourse.price;
   
   localStorage.setItem("courselist",JSON.stringify(courses));

}