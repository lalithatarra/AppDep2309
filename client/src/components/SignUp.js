import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function SignUp() {
let firstNameInputRef=useRef();
let lastNameInputRef=useRef();
let ageInputRef=useRef();
let emailInputRef=useRef();
let passwordInputRef=useRef();
let profilePicInputRef=useRef();
let[profilePicPath,setProfilePicPath]=useState("./images/download.png");

let sendSignupDataToServerThruJSON=async()=>{

    let dataToSend={
        firstName:firstNameInputRef.current.value,
        lastName:lastNameInputRef.current.value,
        age:ageInputRef.current.value,
        email:emailInputRef.current.value,
        password:passwordInputRef.current.value,
        profilePic:profilePicInputRef.current.value,

    };
    let dataToSendInJSON=JSON.stringify(dataToSend);
     
     let myHeader=new Headers();
     myHeader.append("content-type","application/json");

    let reqOptions={
        method:"POST",
        body:dataToSendInJSON,
        headers:myHeader,
    };

   let JSONData=await fetch("/signup",reqOptions);
   
   let JSOData=await JSONData.json();
   console.log(JSOData);
};


let sendSignupDataToServerThruURLE=async()=>{

    let dataToSend=new URLSearchParams();
    dataToSend.append("firstName",firstNameInputRef.current.value);
    dataToSend.append("lastName",lastNameInputRef.current.value);
    dataToSend.append("age",ageInputRef.current.value);
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);
    dataToSend.append("profilePic",profilePicInputRef.current.value);

   let myHeader=new Headers();
   myHeader.append("content-type","application/x-www-form-urlencoded");
    let reqOptions={
        method:"POST",
        body:dataToSend,
        headers:myHeader,
    };

    let JSONData=await fetch("/signup",reqOptions);

    let JSOData=await JSONData.json();
    console.log(JSOData);
};


let sendSignupDataToServerThruFD=async()=>{

    let dataToSend=new FormData();
    dataToSend.append("firstName",firstNameInputRef.current.value);
    dataToSend.append("lastName",lastNameInputRef.current.value);
    dataToSend.append("age",ageInputRef.current.value);
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);

    for(let i=0;i<profilePicInputRef.current.files.length;i++){

        dataToSend.append("profilePic",profilePicInputRef.current.files[i]);
    };
    

    let reqOptions={
        method:"POST",
        body:dataToSend,
    };

    let JSONData=await fetch("/signup",reqOptions);

    let JSOData=await JSONData.json();

    if(JSOData.status=="success"){
        alert(JSOData.msg);
    }else{
        alert(JSOData.msg);
    }
    console.log(JSOData);
};



  return (
    <div className='App'>
        <form>
            <h2 >Sign Up</h2>
            <div>
                <label className='profilePic'>profile Pic</label>
                <input ref={profilePicInputRef} type='file' onChange={(eventObj)=>{
                    let selectedImagePath=URL.createObjectURL(eventObj.target.files[0]);
                   setProfilePicPath(selectedImagePath);
                 }}></input>
            </div>
            <div>
                <img className='profilePic' src={profilePicPath}></img>
            </div>
            <div>
                <label>First Name</label>
                <input ref={firstNameInputRef} placeholder='enter your first name'></input>
            </div>
            <div>
                <label>Last Name</label>
                <input ref={lastNameInputRef} placeholder='enter your last name'></input>
            </div>
            <div>
                <label>Age</label>
                <input ref={ageInputRef} placeholder='enter your age'></input>
            </div>
            <div>
                <label>Email</label>
                <input ref={emailInputRef} placeholder='enter your email'></input>
            </div>
            <div>
                <label>Password</label>
                <input ref={passwordInputRef} placeholder='enter your password'></input>
            </div>
            
            <div>
                
                <button type='button' onClick={()=>{
                    sendSignupDataToServerThruFD();
                }}>Sign Up(Form Data)</button>
            </div>
        </form>
        <div>
       <Link to="/">Login</Link>
       </div>
    </div>
    

  )
}

export default SignUp