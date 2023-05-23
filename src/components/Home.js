import  "../styles/home.css";
import Navbar from "./Navbar";
import {useState,useEffect} from 'react';
// import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';





function Home(){
//   const [suggestions,setSuggestions] = useState([]); {/*the use state adds suggesstions from response we get from server*/}

// const fuzzySearch=(event)=>{
//     const query=event.target.value;
 
//     axios.get("/getdocs",{
//       search:query
//     }).then(res=>{
//            setSuggestions(res.results);
//     })
  





// }

   return(
    <div className="ret1">
        <Navbar/>
    <div className="container">
             {/* onChange = { fuzzySearch } --> will use it later in input tag */}
             
             <div className="tank1">
             <p>Welcome to our website, your go-to source for the NEWS on the world of sports or Political or financial or all around the world. Our team of experts is dedicated to providing you with accurate information to help you make informed decisions when it comes to investing your time. Whether you're a beginner or an experienced investor we always help you achieve your goals.</p>
             </div>
             <div className="tank2">
             <img src="indian-stock-market-prediction-for-next-week.jpg" alt="Girl in a jacket" height="20px" width="40px"></img>
             </div>
             </div>     
            
 <div className="carousel">
 <Carousel>
      <Carousel.Item>
        <img
          style={{height: "300px"}}
          className="inside d-block w-100"
          src="n1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>NEWS</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{height: "300px"}}
          className="inside d-block w-100"
          src="n2.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Business</h3>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{height: "300px"}}
          className="inside d-block w-100"
          src="n3.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Sports</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{height: "300px"}}
          className="inside d-block w-100"
          src="n4.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Political</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{height: "300px"}}
          className="inside d-block w-100"
          src="n5.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Breaking News</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>

    <div className="About">
      <p>Contact Us:</p> 
      <div className="icons">
       <img src="facebook.png"></img>
       <img src="linkedin.png"></img>
       <img src="instagram.png"></img>
       <img src="mail.jpg"></img>
      </div>

      <div className="description">
      <p>
      BullsxBears does not provide financial advice and does not issue recommendations or offers to buy stock or sell any security.

Information is provided 'as-is' and solely for informational purposes and is not advice. BullsxBears does not bear any responsibility for any losses or damage that may occur as a result of reliance on this data
      </p>
      <br></br>
       <span>©2023 BullsxBears</span>
      </div>
      
      
    </div>
            {/* <Link   to="" />      */}
            {/* {suggestions.length !== 0 && <DropDown results = {suggestions}  */}
 

     
    </div>
    );
}

export default Home;