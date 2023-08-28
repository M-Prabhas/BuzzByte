import Home from "./components/Home";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Library from "./components/Library";
import CreateContact from "./components/CreateContact";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Opener from "./components/Opener";
import Type from "./components/Type";

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
  <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/CreateContact" element={<CreateContact/>}/>
       <Route path="/Today's/News" element={<Opener/>}/>
       <Route path="/Today's/News/:category" element={<Type/>}/>
       <Route path="/profile/:id" element={<Profile/>}/>
       <Route path="/Login" element={<Login/>}/>
       <Route path="/Settings" element={<Library/>} />
       </Routes>
       </Router> 
  );
}

export default App;
