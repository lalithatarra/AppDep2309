import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';

function EditProfile() {
let firstNameInputRef=useRef();
let lastNameInputRef=useRef();
let ageInputRef=useRef();
let emailInputRef=useRef();
let passwordInputRef=useRef();
let profilePicInputRef=useRef();
let[profilePicPath,setProfilePicPath]=useState("./images/download.png");

let storeObj=useSelector((store)=>{
    return store;
});

useEffect(()=>{
   firstNameInputRef.current.value=storeObj.loginDetails.firstName;
   lastNameInputRef.current.value=storeObj.loginDetails.lastName;
   ageInputRef.current.value=storeObj.loginDetails.age;
   emailInputRef.current.value=storeObj.loginDetails.email;
   setProfilePicPath(`/${storeObj.loginDetails.profilePic}`)
},[]);


let sendUpdateDataToServerThruFD=async()=>{

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
        method:"PUT",
        body:dataToSend,
    };

    let JSONData=await fetch("/updateProfile",reqOptions);

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
        <TopNavigation></TopNavigation>
        <form>
            <h2 >Edit Profile</h2>
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
                <input ref={emailInputRef} readOnly placeholder='enter your email'></input>
            </div>
            <div>
                <label>Password</label>
                <input ref={passwordInputRef} placeholder='enter your password'></input>
            </div>
            
            <div>
                
                <button type='button' onClick={()=>{
                   sendUpdateDataToServerThruFD();
                }}>Update Profile</button>
            </div>
        </form>
       
    </div>
    

  )
}

export default EditProfile;