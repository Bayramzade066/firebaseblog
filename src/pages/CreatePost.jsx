import React, { useState } from 'react';
import { addDoc, collection} from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';




function CreatePost() {


  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [category, setCategory] = useState("")
  const [post, setPost] = useState("")
  const newsCollectionRef = collection(db, "news")
  const [loader, setloader] = useState(false)

  let navigate = useNavigate();



 

    const createPost = async () => {
      setloader(true);
        await addDoc(newsCollectionRef, {
        title,
        url,
        category,
        post,
         author: {
            name: auth.currentUser.displayName,
             id: auth.currentUser.email,
             number: auth.currentUser.phoneNumber
            }
    });   
    navigate("/login")
  }






  return (
    <div className="createPostPage">
      <div className="cpContainer">
       <h1 className='text-3xl font-bold'>Yeni post Yarat</h1> 
        <div className="inputGp">
          <label> Başlıq:</label>
          <input placeholder="Başlıq..."  onChange={(event) => {
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
      <button onClick={createPost} > {!loader ? "Postu yüklə" : 'Yüklənir..'}</button>  
      </div>
        
      
    </div>
  )
}

export default CreatePost