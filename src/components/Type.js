import React from 'react'
import {useParams} from "react-router-dom";
import "../styles/Opener.css" 
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';  
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import {useState,useEffect} from "react";
import { useCookies } from 'react-cookie';

const Type = () => {
    let {category}=useParams();
    const [news,setNews]=useState([]);
    const [apiKey, setApiKey] = useState("");
    const [msg,setmsg]=useState("");
    const [cookies,setCookies]=useCookies();
   
    useEffect(()=>{
        axios.get('/getkey')
          .then(res => {
            console.log(res.data.key);
            setApiKey(res.data.key);
          })
          .catch(error => {
            console.error(error);
          });
      },[])
    
      useEffect( () => {
        console.log(apiKey);
        console.log(key);
        if (apiKey) {
         axios.get(key)
            .then(response => {
              console.log(response.data.articles);
              const extractedData = response.data.articles.map(article => {
                const { title, url, urlToImage ,description} = article;
                return { title, url, urlToImage ,description};
              });
    
              // Update the state with the extracted data
              setNews(extractedData);
            })
            .catch(error => {
              console.log(error);
            });
        }
      }, [apiKey]);

      const key = `https://newsapi.org/v2/top-headlines?category=${category}&country=in&language=en&apiKey=${apiKey}`;


      const handleit=async(e)=>{
        console.log(e.target.value); 
        if(!cookies.user){
            setmsg("user does not exist just login to enjoy this feature.") ;
        }
        else{
      await axios.post(`/addhistory`, {
          link:e.target.value,  
          email:cookies.user.email  
      })
      .then(res => {
        console.log(res.data.updatedUser,"data");
         console.log(res.data.updatedUser._id,res.data.updatedUser.password);
            setCookies("user",{id:res.data.updatedUser._id,username: res.data.updatedUser.username,email: res.data.updatedUser.email,history:res.data.updatedUser.History,password:res.data.updatedUser.password},{path: "/"})
      })
      .catch(error => {
        console.log(error);
      });
      }
      }


  return (
    <div className="scroller">
        <p className="headnews">NEWS of {category}</p>
        <div className="cards1"> 
      <Row xs={1} md={4} className="g-4">
      {news.map((article, idx) => (
        <Col>
        <Card style={{ width: '18rem'}} key={idx}>
      <Card.Img variant="top" src={article.urlToImage} />
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Link href={article.url}>News Source Link</Card.Link>
        <br></br>
        <br></br>
        <Button variant="primary" onClick={handleit} value={article.url}>ADD to NEWS</Button>
      </Card.Body>
    </Card>
        </Col>
      ))}
    </Row>    
      </div>
    </div>
  )
}

export default Type