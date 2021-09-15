import React ,{useState,useEffect} from 'react';

//React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Loader
import Loader from '../Loader/loader';
import { useHistory } from 'react-router-dom';
import { getPost,updatePost } from '../crud/crud';
const UpdatePage=({match})=>{
    const history=useHistory();
    const [loader,setLoader]=useState(true);
    const [post,setPost]=useState({
      title:'',description:'',username:'',categories:'',createdDate:new Date()
    });
    useEffect(() => {
      document.title="Update Page";
      const fetchData = async () => {
          let data = await getPost(match.params.id);
          setPost(data);
          setLoader(false);
      }
      fetchData();
    }, [])
      console.log(match);
      let name,value;
      const handleInputs=(e)=>{
        name=e.target.name;
        value=e.target.value;
        setPost({...post,[name]:value});
        
      }
     
      const updateBlogPost = async () => {
        await updatePost(match.params.id, post);
        setTimeout(toast.success("Post updated successfully",{
          position: "top-center",
        }),3000);
        history.push(`/details/${match.params.id}`);  
    }

    if(loader)
    return <Loader/>
    return(
        <>
        <ToastContainer/>
          <div className="write">
      <img
        className="writeImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <form className="writeForm">
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            className="writeInput"
            placeholder="Title"
            value={post.title}
            onChange={(e)=>handleInputs(e)}
            name="title"
            type="text"
            autoFocus="off"
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeText"
            placeholder="Tell your story..."
            type="text"
            value={post.description}
           
            onChange={(e)=>handleInputs(e)}
            name="description"
            autoFocus="off"
          />
        </div>
        <div className="writeSubmit"  onClick={()=>updateBlogPost()}>
          Update
        </div>
      </form>
    </div>
        </>
    );
}
export default UpdatePage;