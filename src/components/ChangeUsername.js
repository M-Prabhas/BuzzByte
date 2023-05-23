import React,{useState} from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios';



const ChangeUsername = () => {
     const [user1,setuser]=useState("");
     const [cookies,setCookies]=useCookies();
     const t=false;

  const changename=async()=>{
    if(user1===""){
      console.log("blank");
    }else if(!cookies.user){
         t=true;
    }
    else{
  await axios.post(`/changeusername`, {
      username:user1,  
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
    <div className="changeUsername">
    {t&&<div className="error"><span>the user is not signed in</span></div>}
    <h3>Change UserName</h3>
    <p>Enter User Name</p>
    <input type="text" placeholder="Enter New UserName" onChange={(e)=>setuser(e.target.value)} value={user1}></input>
    <button type="button" onClick={changename}>click me</button>
    </div>
  )
}

export default ChangeUsername;