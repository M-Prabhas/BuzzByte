import "../styles/Library.css";
import { useState, useEffect } from 'react';
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Changepassword from "./Changepassword";
import ChangeUsername from "./ChangeUsername";


 const Library= ()=>{   //here we get props for news company code from database;
      const [password,setpassword]=useState(false);
      const [username,setusername]=useState(false);

    


    function clearHistory(){
        // clear me
        console.log("clear me");
    }



return(
    <>
    <div className="NewsCollection">
    <h2>User Settings</h2>
    <div className="inner">
    <p style={{cursor:"pointer"}} onClick={()=>setpassword(true)}>Change Password</p>
    <p style={{cursor:"pointer"}}  onClick={()=>setusername(true)}>Change Username</p>
    <p style={{cursor:"pointer"}} onClick={clearHistory}>Clear Watch-History</p>
    </div>
    </div>
    <div className="output">
    {password&&<span className="heading1" onClick={()=>{setpassword(false)}}>x</span>}
    {username&&<span className="heading2" onClick={()=>{setusername(false)}}>x</span>}
    {password&&<div className="dialogue2"><Changepassword /></div>}
    {username&&<div className="dialogue1">      
    <ChangeUsername/></div>}
    </div>
    </>
)
};

export default Library;