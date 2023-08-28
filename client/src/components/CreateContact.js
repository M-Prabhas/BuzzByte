import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CreateContact.css";
import { useCookies } from 'react-cookie';



const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,14}$/;

const CreateContact = () => {
    const History = useNavigate();
    const [userName, setUserName] = useState("");
    const [pwd, setpwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [email, setemail] = useState("");
    const [pwd1, setpwd1] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [validmailId,setvalidmailId]=useState(true)
    const [Cookies,setCookies]=useCookies();
    const [exist,setexist]=useState(false);

    useEffect(() => {
        setValidMatch(pwd === pwd1);
     setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd, pwd1])

    const refer=async() =>{
         if(!validMatch || !validPwd || userName==="" || email.slice(-10)!=="@gmail.com"){
            if(email.slice(-10)!=="@gmail.com"){
                setvalidmailId(false);
            }
            setValidMatch(false);
            setValidPwd(false);
            setUserName("");
            setemail("");
            setpwd("");
            setpwd1("");
            console.log("touchedme");
         }else{
            console.log("hello world")
            await axios.post('http://localhost:5000/signup', {
                username:userName ,
                password:pwd ,
                email:email   
            })
            .then(res => {
              res = res.data;
              console.log(res,"data");
              if(res.success===true){
                  setCookies("user",{username: res.username,email: res.email,history:res.history,password:res.password},{path: "/"})
                  History(`/profile/${res.username}`);
                }else if(res.success===false){
                       setexist(true);
                }})
            .catch(error => {
              console.log(error);
            });

         }
        }
     
       
      
        // 

        //  axios.get("/getdocs",{
        //       search:query
        //     }).then(res=>{
        //            (res.results);
        //     })

    


    return (
        <>
            <div className="secondcomplete">
            <div className="part11">
            <h1>Create Account</h1>
            <br></br>
            <form className="box1">
                <input type="text" placeholder="Enter your userName" required onChange={(e) => setUserName(e.target.value)} value={userName}></input>
                <hr></hr>
                <input type="text" placeholder="Enter your EmailId" required onChange={(e) => setemail(e.target.value)} value={email}></input>
                <hr></hr>
                <input type="password" placeholder="enter password" required onChange={(e) => setpwd(e.target.value)} value={pwd}></input>
                <hr></hr>
                <input type="password" placeholder="confirm password" required onChange={(e) => setpwd1(e.target.value)} value={pwd1}></input>
                <hr></hr>
               < br/>
                <button className="signup" type="button" onClick={() => refer()}>sign up</button>
                <br></br>
                {!validmailId&&<div  style={{color:"red",paddingleft:"5px"}}>Enter mailId of the form xxx@gmail.com</div> || exist&&<div>The User Already Exists</div>}
                {!validMatch && (pwd.length!==0)&& <div style={{color:"red",paddingleft:"5px"}}>The fields of Password and Confirm Password must Match ,check for Strong Password with greater than 8 characters</div>}
                <br></br>
                {!validPwd && <div style={{color:"red",paddingleft:"5px"}}>Your password must contain one Capital Letter,one specialCharacter and a Number.</div>}
                
            </form>
            </div>
            <div className="part12">
            <img src="finance-chart-working-drawing-357a17a4498c7c8724e9149297c99ce5.png" alt="Girl in a jacket" height="20px" width="40px"></img>
            </div>
            </div>
        </>
    )
};

export default CreateContact;