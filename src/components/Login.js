import {useState,useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import "../styles/Login.css";
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function Login(){
     const History = useNavigate();
     const [userName,setUserName]=useState("");
     const [pwd,setpwd]=useState("");
     const [valid,setvalid]=useState(true);
     const [cookies, setCookies] = useCookies();
    
     const refer1=async()=>{
        console.log("pressed");
        if(userName===""){
          setvalid(false);
        }
      await axios.post('/login', {
          username:userName ,
          password:pwd     
      })
      .then(res => {
        res = res.data;
        console.log(res,"data");
        if(res.success===true){
            console.log(res.id);
            console.log(res.history);
            setCookies("user",{id:res.id,username: res.username,email: res.email,history:res.history,password:res.password},{path: "/"})
            History(`/profile/${res.username}`);
          }else{
          console.log("error");
          setvalid(false);
          setUserName("");
          setpwd("");
          }})
      .catch(error => {
        console.log(error);
      });

      
     }
     


   return(
    <>
        <div className="complete">
        <div className="part1">
        <h1>Sign-in</h1>
        <form className="box">
        <input type="text" placeholder="Enter your userName"  required onChange={(e) => setUserName(e.target.value)} value={userName}></input>
        <hr></hr>
        <input type="password" placeholder="enter password" required onChange={(e) => setpwd(e.target.value)}  value={pwd}></input>
        <hr></hr>
        <button  className="login" type="button" onClick={()=>refer1()}>sign in</button>
        <hr></hr>
        <br/>
        <Link to="/CreateContact" >Create Account</Link>
        </form> 
        <br></br>
      {!valid&&<div style={{color:"red",paddingleft:"5px"}}>Not correct UserName.</div>}
      <br></br>
      {!valid&&<div style={{color:"red",paddingleft:"5px"}}>Not correct Password.</div>}
                
        </div>
       <div className="part2">
        <img src="c1.PNG" alt="Girl in a jacket" height="20px" width="40px"></img>
        </div>
        </div>
    </>
   )
}