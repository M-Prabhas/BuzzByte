import {Link, useParams} from "react-router-dom";
import {useState,useEffect} from "react";
import  "../styles/profile.css";
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Profile(){
  let {id}=useParams();
  console.log(useParams());
  const [hidediv,setHideDiv]=useState(true);
  const [news,setNews]=useState([]);
  const [cookies, setCookies] = useCookies();
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/getkey')
      .then(res => {
        console.log(res.data.key);
        setApiKey(res.data.key);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const toggleDiv = () => {
    setHideDiv(!hidediv);
  };

  useEffect(() => {
    console.log(apiKey);
    console.log(key);
    if (apiKey) {
      axios.get(key)
        .then(response => {
          console.log(response.data.articles);
          const extractedData = response.data.articles.map(article => {
            const { title, url, urlToImage } = article;
            return { title, url, urlToImage };
          });

          // Update the state with the extracted data
          setNews(extractedData);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [apiKey]);

  const key = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${apiKey}`;

    return(
     <>
     <div className="whole">
      <div className="first">
      <h3>Today's Business News</h3>
      {news.map((article, index) => (
         <div className="Link" key={index}>
         <img className="imgurl" src={article.urlToImage} alt="img"></img>
         <a className="description" href={article.url}>{article.title}</a>
         </div>  
      ))}  
      </div>     
      <div className="second">
      <h1 >Hello welcome to your profile</h1> 
      <br></br>
      <h3>@ {cookies.user.username}</h3>
      <br></br> 
      <p onClick={toggleDiv}
       style={{cursor:"pointer",color:"blueviolet", fontSize: "2rem"}}>
         {hidediv ? "Your NEWS" : "Close NEWS"}
       </p>
      <div className={hidediv ? "hideshow" : "show"}>
             <a href="/apple">hello</a>
             <a href="/ball">world</a>
      </div>
      </div>
      </div>
     </>
    )
 }

 export default Profile;