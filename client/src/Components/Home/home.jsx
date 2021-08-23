import React, { useEffect, useState } from 'react';

//Home.css
import styles from './home.module.css';

//Blogger svg image
import Blogger from './blogger';

//Function to get all posts
import { getAllPosts } from '../crud/crud';

//Search Icon
import { Link, useLocation } from 'react-router-dom';
import Loader from '../Loader/loader';

const Home=()=>{
    
    //UseStates
    const [posts, setPosts] = useState([]);
    const [loader,setLoader]=useState(false);
    const [fliterPosts,setFilterPosts]=useState([]);
    const { search } = useLocation();
    const [all_posts,setAuto_posts]=useState([]);


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
    //    console.log(curr_username[0])
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
        
        <div className={`${styles.part}`}>
        <div className={`${styles.clippath}`}></div>
        <div className={`${styles.first}`}>
        
            <p>WELCOME TO</p>
            <p>Blogspoint</p>
            <p>The best place for bloggers</p>
        </div>
        <div className={`${styles.second}`}>
            <Blogger/>
        </div>
        </div>
        
        </div>
        <div className={`${styles.allPosts}`}>
            <p>Posts so far : </p>
            <div className={`${styles.searchbox}`}>
                <input type="search" name="search" id="search" placeholder="Search by username..." onChange={filterByUsername}/>
                {/* <HiSearch/> */}
                {

                }
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
        </>
    )
}
export default Home;