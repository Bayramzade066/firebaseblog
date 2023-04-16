import './App.css';
import {BrowserRouter as Router, Routes,Route,Link} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import { useState } from 'react';
import { signOut } from "firebase/auth";

import {auth} from './firebase-config'


function App() {
  const [isAuth, setisAuth] = useState(localStorage.getItem("isAuth"))


  const signUserOut=()=>{
    signOut(auth).then(()=>{
      localStorage.clear();
      setisAuth(false);
      window.location.pathname="/login";
    })
}

 

  return (
    <Router>
    <nav>
    <img src="https://global-uploads.webflow.com/5e157548d6f7910beea4e2d6/63d3b61e2146472489101c0b_Screen%20Shot%202023-01-27%20at%201.22.09%20AM.png" className='logo' alt="" />
      <Link to="/">Bloglar</Link>
      
      {!isAuth ? (<Link to="/login">Giriş</Link>) : 
      <>
      <Link to="/createpost">Blog Yarat</Link>
      <div className="Logout" onClick={signUserOut}>Çıxış</div>
      </>
      }
    </nav>
      <Routes>
        <Route path="/" element={<Home IsAuth={isAuth} />} />
        <Route path="/login"  element={<Login setIsAuth={setisAuth} />} />
        <Route path="/createpost" element={<CreatePost IsAuth={isAuth} />} />
        <Route path="/postdetails/:id" element={<PostDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
