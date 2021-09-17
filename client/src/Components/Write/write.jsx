import React ,{useState,useEffect} from 'react';

//React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useHistory } from 'react-router-dom';
import { createPost } from '../crud/crud';
import './write.css';
import Loader from '../Loader/loader';
const Write=()=>{
    const history=useHistory();
    const [userData,setUserData]=useState({});
    const [flag,setFlag]=useState(false);
    //Loader 
    const [loader,setLoader]=useState(true);
    const userAuthenticate= async()=>{
      try{
          const res=await fetch('/about',{
          method:"GET",
          headers:{
              // Accept:"application/json",
              'Content-Type':'application/json'
          },
      });
      // console.log(res.json());
      if(!res.status===200)
      {
          const error=new Error(res.error);
          throw error;
      }
      const data=await res.json();
      console.log(data);
      setUserData(data);
      setFlag(true);
    
  }
      catch(err){
         
          console.log(err);
          // history.push('/signin');
      }
  }
  useEffect(()=>{
    document.title="Write";
    userAuthenticate();
    setLoader(false);
},[]);

  const [post,setPost]=useState({
    title:'',description:'',username:'',categories:'jnn',createdDate:new Date()});
    if(flag===true){
    setPost({...post,username:`${userData.username}`})
    setFlag(false);// To stop infinite re renders 
    }
    
 
    
     
      let name,value;
      
      const handleInputs=(e)=>{
        name=e.target.name;
        value=e.target.value;
        setPost({...post,[name]:value});
        
      }
    
     
    const savePost = async (e) => {
      e.preventDefault();
      if(post.title!==""&&post.description!==""){
      await createPost(post);
      setTimeout(toast.success("Post created successfully",{
        position: "top-center",
      }),3000);
      history.push('/');
      }
      else{
        setTimeout(toast.error("Please do not keep the title and description empty",{
          position: "top-center",
        }),3000);
      }
  }
    if(loader)
    return <Loader/>
    return(
        <>
        <ToastContainer/>
          <div className="write">
     
      <form className="writeForm">
        <div className="writeFormGroup" id="field1">
         
          <input
            className="writeInput"
            placeholder="Title"
            value={post.title}
            onChange={handleInputs}
            name="title"
            type="text"
            autoFocus="off"
          />
           <button className="writeSubmit" type="submit" onClick={savePost}>
          Publish
        </button>
        </div>
        <div className="writeFormGroup" id="field2">
          <textarea
            className="writeText"
            placeholder="Tell your story..."
            type="text"
            value={post.description}
            
            onChange={handleInputs}
            name="description"
            autoFocus="off"
          />
        </div>
       
      </form>
    </div>
        </>
    );
}
export default Write;