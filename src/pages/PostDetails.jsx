
import React,{useState,useEffect} from 'react'
import {collection,onSnapshot} from 'firebase/firestore'
import { db } from '../firebase-config';
import {useParams} from 'react-router-dom';
import './details.css'


function PostDetails() {
 
  const [newlists, setNewlist] = useState([]);
  const newsCollectionRef = collection(db, "news")


  const {id} = useParams()


 
  

 useEffect(() => { 
  
  const getNews = ()=>{
      onSnapshot((newsCollectionRef),(snapshot)=>{
      setNewlist(snapshot.docs.map(doc=>({...doc.data(),id: doc.id})))
    });
    
  }

  getNews()
  
}, [newsCollectionRef])


const user = newlists.find(u => u.id===String(id))
console.log(user)

  return (
   <div className="details">

     <h1 className="header">{user?.title}</h1>
     <div className="postimg">
       <img src={`${user?.url}`} alt="" />
     </div>
     <h2>Kateqoriya: {user?.category}</h2>
     
     <p>{user?.post}</p>
     <p>Yazar: {user?.author.name}</p>
     <p>Email: {user?.author.id}</p>   
   </div>
  ) 
}

export default PostDetails