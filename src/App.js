import "./App.css";
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import UpdatePost from "./pages/UpdatePost";

function App() {
  const [isAuth, setisAuth] = useState(localStorage.getItem("isAuth"));

  const user = auth.currentUser;

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setisAuth(false);
      window.location.pathname = "/login";
    });
  };
 

  return (
    <Router>
       <nav>
       <div className="user-navbar-1"> 
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Blogger.svg/1200px-Blogger.svg.png"
          className="logo"
          alt=""
        />
        <Link to="/">Bloglar</Link>
        {isAuth && user && <Link to="/createpost">Blog Yarat</Link>}
        </div>
        

            
            <div className="user-navbar-2">
            {!isAuth && !user ? 
            
               <Link to="/login">Giriş</Link> : 
               <>
               <p>Xoş gəldin <br/>{user?.phoneNumber === null  ? user?.displayName : user?.phoneNumber}</p>
             
             {user?.phoneNumber === null && <img
             className="profile-image"
               src={`${user?.photoURL}`}
               alt="dp"
               referrerPolicy="no-referrer"
             />}
             <div className="Logout" onClick={signUserOut}>Çıxış </div>
             </>}
             
            </div>
        
        
      </nav>
      <Routes>
        <Route path="/" element={<Home IsAuth={isAuth} />} />
        {!user && <Route path="/login" element={<Login setIsAuth={setisAuth} />} />}
        <Route path="/createpost/" element={<CreatePost IsAuth={isAuth} />} />
        <Route
          path="/updatepost/:id"
          element={<UpdatePost IsAuth={isAuth} />}
        />

        <Route path="/postdetails/:id" element={<PostDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
