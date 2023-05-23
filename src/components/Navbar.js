import  "../styles/Navbar.css";
import { Link } from "react-router-dom";
// import "../styles/Navbar.css";
import { useCookies } from 'react-cookie';
import {useState,useEffect} from 'react';


function Navbar(){
    const [cookies] = useCookies(['user']);
    const [present, setPresent] = useState(false);

     

      // User cookie is present
    //    profileUrl = `/profile/${cookies.user.username}`;
    useEffect(() => {
        if (cookies.user) {
          setPresent(true);
         
        } else {
          setPresent(false);
        }
      }, [cookies.user]);

   

    return(
        <header>
         <p>BuzzByte</p>
        <div className="Navbar">
        <Link to="/"><span>Home</span></Link>
        {present&&<Link to={`/profile/${cookies.user.username}`}><span>Profile</span></Link>}
        {!present&&<Link to="/login"><span>login</span></Link>}
        <Link to="/Today's/News">NEWS</Link>
        <Link to="/Settings">Settings</Link>
        </div> 
       </header>
    );
}

export default Navbar