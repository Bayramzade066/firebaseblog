import React,{useState,useEffect} from 'react'
import {collection, doc,deleteDoc,onSnapshot} from 'firebase/firestore'
import {auth, db } from '../firebase-config';
import {Link} from 'react-router-dom';


function Home({IsAuth}) {

  const [newlists, setNewlist] = useState([]);
  const newsCollectionRef = collection(db, "news")
  


  const deletePost = async (id)=>{
    const  postDoc = doc(db, "news",id) 
     await deleteDoc(postDoc)
}

useEffect(() => {
  
  const getNews =()=>{
      onSnapshot((newsCollectionRef),(snapshot)=>{
      setNewlist(snapshot.docs.map(doc=>({...doc.data(),id: doc.id})))
    });
    
  }
  getNews()
}, [newsCollectionRef])



 
  return (

 <div className="homePage ">
        {newlists.map((news)=>{
           return <div  className="post">
                  <div className="url">
                    <img src={`${news.url}`} alt="" />
                  </div>
                  <h1 className="postHeader">{news.title} </h1>
                  <p ><span className='header1'>Kateqoriya: </span><span className='category'>{news.category}</span></p>
                  <p><span className='header1'>Yazar: </span> {news.author.name}</p>
                  <Link to={`/postdetails/${news.id}`}  className="learn">Ətraflı oxu</Link>
                  
                  <div className="deletePost">
                    {IsAuth && news.author.id === auth.currentUser.email && (
                       <button onClick={()=>{deletePost(news.id)}}>Sil</button>
                    )}
                   
                  </div>
              </div>
        })}
    </div>
 
   
  )
}

export default Home