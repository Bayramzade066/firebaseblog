import React, { useState } from 'react';
import {  collection,onSnapshot,updateDoc,doc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
// import { useRef } from 'react';




function UpdatePost() {


  const { id } = useParams();
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [category, setCategory] = useState("")
  const [post, setPost] = useState("")
  const newsCollectionRef = collection(db, "news")
  const [loader, setloader] = useState(false)
  const [newlists, setNewlist] = useState([]);
  let navigate = useNavigate();



 

  useEffect(() => {
  
    const getNews =()=>{
        onSnapshot((newsCollectionRef),(snapshot)=>{
        setNewlist(snapshot.docs.map(doc=>({...doc.data(),id: doc.id})))
      });
      
    }
    getNews()
  }, [newsCollectionRef])

  

  const updateUser = async (id,titles,urls,categorys,posts) => {
    setloader(true);
    const userDoc = doc(db, "news", id);
    const newFields = {
      title:title ? title : titles,
      url:url ? url : urls,
      category:category ? category : categorys,
      post: post ? post : posts,
      
    };
    await updateDoc(userDoc, newFields);

    navigate("/")
  };

  
  

  
  const news = newlists.find(u => u.id===String(id))

  return (
    <div className="createPostPage">  
           <div  className="cpContainer">
          <h1>Postu yenilƏ</h1>
            <div className="inputGp">
              <label> Başlıq:</label>
              <input placeholder="Başlıq..." defaultValue={news?.title}   onChange={(event) => {
                setTitle(event.target.value)
              }} />
            </div>
            <div className="inputGp">
              <label> Şəkil URL:</label>
              <input placeholder="URL..." defaultValue={news?.url}  onChange={(event) => {
                setUrl(event.target.value)
              }} />
            </div>
            <div className="inputGp">
              <label> Kateqoriya:</label>
              <input placeholder="Kateqoriya adını yazın..." defaultValue={news?.category}  onChange={(event) => {
                setCategory(event.target.value)
              }} />
            </div>
            <div className="inputGp">
              <label> Blog :</label>
              <textarea placeholder="blog mətini..." defaultValue={news?.post} onChange={(event) => {
                setPost(event.target.value)
              }} />
            </div>
         <button onClick={
          () => updateUser(id,news.title,news.url,news.category,news.post)
         }>  {!loader ? "Postu Düzəlt" : 'Yüklənir..'}</button>
          </div>     
    </div>
  )
}

export default UpdatePost