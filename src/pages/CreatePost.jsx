import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';


function CreatePost() {

  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [category, setCategory] = useState("")
  const [post, setPost] = useState("")
  const newsCollectionRef = collection(db, "news")
  let navigate = useNavigate();



  
  
  const createPost = async () => {
    await addDoc(newsCollectionRef, {
      title,
      url,
      category,
      post,
       author: {
          name: auth.currentUser.displayName,
           id: auth.currentUser.email 
          }
  });
    navigate("/")
  }



  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Yeni post Yarat</h1>
        <div className="inputGp">
          <label> Başlıq:</label>
          <input placeholder="Başlıq..." onChange={(event) => {
            setTitle(event.target.value)
          }} />
        </div>
        <div className="inputGp">
          <label> Şəkil URL:</label>
          <input placeholder="URL..." onChange={(event) => {
            setUrl(event.target.value)
          }} />
        </div>
        <div className="inputGp">
          <label> Kateqoriya:</label>
          <input placeholder="Kateqoriya adını yazın..." onChange={(event) => {
            setCategory(event.target.value)
          }} />
        </div>
        <div className="inputGp">
          <label> Blog :</label>
          <textarea placeholder="blog mətini..." onChange={(event) => {
            setPost(event.target.value)
          }} />
        </div>
        <button onClick={createPost} > Postu yüklə</button>
      </div>
    </div>
  )
}

export default CreatePost