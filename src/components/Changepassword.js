import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,14}$/;

const Changepassword = () => {
      const [p,setp] =useState("");
      const [p1,setp1]=useState("");
      const [validp1,setvalidp1]=useState(false);
      const [p2,setp2]=useState("");
      const [validp2,setvalidp2]=useState(false);
      const [change,setchange]=useState(true);
      const [cookies,setCookies]=useCookies();
      const t=false;
      const [uname,setuname]=useState("");

   const investigate=async()=>{
    // if valid check
       if(!cookies.user){
        t=true;
        console.log("error the person should be logged in .")
        setp(""); 
       }else{
        await axios.post(`/changepassword`, {
          username:uname,  
          password:p,
          email:cookies.user.email  
      })
      .then(res => {
        console.log(res.data,"data");
         if(res.data.success===true){
            setchange(!change)
         }
        else{
          setp(""); 
        }      
      })
      .catch(error => {
        console.log(error);
      });
     
     
       }
      
   } 
    
   useEffect(() => {
    setvalidp2(p1 === p2);
    setvalidp1(PWD_REGEX.test(p1));
}, [p1, p2])


   const send=async()=>{
   console.log("hello")
  //  if valid check
  if(!validp1 || !validp2){
    console.log("both must be same");
    setp1("");
    setp2("");
  }else{
    await axios.post(`/changepasswordtonew`, {  
      password:p1,
      email:cookies.user.email  
  })
  .then(res => {
    console.log(res.data.updatedUser,"data");
    console.log(res.data.updatedUser._id,res.data.updatedUser.password);
       setCookies("user",{id:res.data.updatedUser._id,username: res.data.updatedUser.username,email: res.data.updatedUser.email,history:res.data.updatedUser.History,password:res.data.updatedUser.password},{path: "/"})
       window.location.reload();     
  })
  .catch(error => {
    console.log(error);
  });
  }
   }


  return (
<>
{t&&<div className="error"><span>the user is not logged in</span></div>}
{change ?(
    <div className="ChangePassword">
         <h3>Change Password</h3>
         <p>Enter Current Password</p>
         <input type="password" placeholder='Enter Password' onChange={(e) => setp(e.target.value)} value={p} required></input>
         <p>Enter UserName</p>
         <input type="text" placeholder='Enter UserName' required onChange={(e) => setuname(e.target.value)} value={uname}></input>
         <button type="button" onClick={investigate} >submit</button>
         </div>
):(
    
         <div className="ChangePasswordtonew">
                   <h3>Change Password</h3>
                   <p>Enter New Password</p>
         <input type="password" placeholder='Enter Password' onChange={(e) => setp1(e.target.value)} value={p1} required></input>
                    <p>Re-Enter New Password</p>
         <input type="password" placeholder='Re-Enter Password' onChange={(e) => setp2(e.target.value)} value={p2} required></input> 
         <button type="button" onClick={send}>submit</button>  
         {!validp1 && (p1.length!==0) && <div className="bothnot1">Your password must contain one Capital Letter,<br></br>one specialCharacter and a Number.</div>}
         <br></br>
         {!validp2 && <div className="single1">both password and confirm password fields must match</div>}
                   </div>
     )
 

}                
    </>
  )
}

export default Changepassword