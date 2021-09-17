import React, { useEffect, useState } from 'react';

//Home.css
import styles from './home.module.css';

//Blogger svg image
import Blogger from './blogger';
import BloggerBro from './bloggerbro'
//Function to get all posts
import { getAllPosts } from '../crud/crud';

//React icons
import {FaAngleDown} from 'react-icons/fa';

//Search Icon
import { Link, useLocation} from 'react-router-dom';
import Loader from '../Loader/loader';

const Home=()=>{
    
    //UseStates
    const [posts, setPosts] = useState([]);
    const [loader,setLoader]=useState(false);
    const [fliterPosts,setFilterPosts]=useState([]);
    const { search } = useLocation();
    
    const [all_posts,setAuto_posts]=useState([]);
    const [authenticate,setAuthenticate]=useState(false);

    //Checking for user authentication
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
            setAuthenticate(false);
            throw error;
        }
        // const data=await res.json();
        
        setAuthenticate(true);
      
    }
        catch(err){
           
            console.log(err);
            setAuthenticate(false);
            // history.push('/signin');
        }
    }
  
  
    useEffect(()=>{
        document.title="Home Page";
      userAuthenticate();
  },[]);
    useEffect(() => {
        const fetchData = async () => { 
            let data = await getAllPosts(search); // params in url
            setPosts(data);
            setAuto_posts(data);
            setLoader(true);
        }
        fetchData();
        
    }, [search]);

    //Function to filter by username
    const filterByUsername=(e)=>{
        var curr_username=e.target.value+'';
  
        setFilterPosts(all_posts.filter((post)=>{
            console.log(post.username.substring(0,curr_username.length)===curr_username)
           
            return (post.username.substring(0,curr_username.length)===curr_username);
        }))
        
        
        if(!curr_username)
        setPosts(all_posts);
        else
        setPosts(fliterPosts);
    //    for(var i=0;i<fliterPosts.length;i++)
    //    console.log(fliterPosts[i].username);
    }
    if(!loader)
    return <Loader/>
    return(
        <>
        <div className={`${styles.container}`}>
        {/* <div className={`${styles.clippath}`}></div>
        <div className={`${styles.clippath2}`}></div> */}
        <div className={`${styles.part}`}>
      
        <div className={`${styles.first}`}>
            <p>Lorem ipsum dolor sit</p>
            {/* <p>WELCOME TO</p>
            <p>Blogspoint</p>
            <p>The best place for bloggers</p> */}
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio velit iure quibusdam iste mollitia. Aliquam quisquam, pariatur sint nulla assumenda labore!</p>
            {
                (authenticate===false)&&<div className={`${styles.signin_signup}`}>
                <Link className={` ${styles.signup}`} to="../signup">Register</Link>
                    OR
                <Link className={`${styles.signin}`} to="../signin">Login</Link>
                </div>
            }
            {
                (authenticate===true)&&<Link className={`${styles.get_started}`} to="../write">Get Started</Link>
            }
        </div>
        <div className={`${styles.second}`}>
            <Blogger/>
        </div>
        </div>
        
        </div>
            <div className={`${styles.down_arrow}`}><a href="#allPosts"><FaAngleDown/></a></div>
        <div className={`${styles.allPosts}`} id="allPosts">
            <div className={`${styles.blogger}`}>
            <BloggerBro/>
            </div>
            <div className={`${styles.outer_cover}`}>
            <p>Posts so far : </p>
            <div className={`${styles.inner_}`}>
                <div className={`${styles.inner_cover}`}>
           
            <div className={`${styles.searchbox}`}>
                <input type="search" name="search" id="search" placeholder="Search by username..." onChange={filterByUsername}/>
            </div>
        {
                posts.length ? posts.map(post => (
                        <div className={`${styles.post}`} >
                       
                            <div className={`${styles.upper}`}>
                            <div className={`${styles.username}`}>{post.username}</div>
                            <Link style={{textDecoration: 'none', color: 'inherit'}} to={`details/${post._id}`}>
                            <button className="btn btn-dark">Read More</button>
                        
                            </Link>
                            
                            </div>
                            <div className={`${styles.title}`}>{post.title}</div>
                            <div className={`${styles.description}`}>{post.description}</div>
                          
                        </div>
                        
                
                )) : <div style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
                        No data is available for selected category
                    </div>

            }
            </div>
            </div>
            </div>
            </div>
        </>
    )
}
export default Home;