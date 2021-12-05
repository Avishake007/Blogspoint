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
import {IoMdArrowDropdownCircle,IoMdArrowDropupCircle} from 'react-icons/io';
import {ImCross} from 'react-icons/im'
//Search Icon
import { Link, useLocation} from 'react-router-dom';
import Loader from '../Loader/loader';

const Home=()=>{
    
    //UseStates
    const [posts, setPosts] = useState([]);
    const [loader,setLoader]=useState(false);
    const [fliterPosts,setFilterPosts]=useState([]);
    const { search } = useLocation();
    const [tags,setTags]=useState(["poo","ppko"]);
    const [showTags,setShowTags]=useState(false);
    const [all_posts,setAuto_posts]=useState([]);
    const [authenticate,setAuthenticate]=useState(false);
    const [activeTags,setActiveTags]=useState([]);
    var arr=[];
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
            setAuthenticate(false);
            const error=new Error(res.error);
            
            throw error;
        }
        const data=await res.json();
        console.log(data);
        setAuthenticate(true);
      
    }
        catch(err){
           
            console.log(err);
            setAuthenticate(false);
            // history.push('/signin');
        }
    }
  
  
    useEffect(()=>{
        document.title="Home Page - Blogspoint";
      userAuthenticate();
  },[]);
    useEffect(() => {
        const fetchData = async () => { 
            let data = await getAllPosts(search); // params in url
            setPosts(data);
            setAuto_posts(data);
            setFilterPosts(data)
            setLoader(true);
        }
        fetchData();
       
        
    }, [search]);
    useEffect(()=>{
        console.log("po")
    //   var t=new Set()
    //   all_posts.map(post=>{
    //       post.categories.map(tag=>{
    //           t.add(tag)
    //       })
    //   })
    //    setTags(t);
    },[])

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
        setPosts(all_posts.filter((post)=>{
            console.log(post.username.substring(0,curr_username.length)===curr_username)
           
            return (post.username.substring(0,curr_username.length)===curr_username);
        }));
    //    for(var i=0;i<fliterPosts.length;i++)
    //    console.log(fliterPosts[i].username);
    }
    const filterByTags=(tag)=>{
        setFilterPosts(fliterPosts.filter(post=>{
           return post.categories.includes(tag)===true;
        }))
        
        setPosts(fliterPosts.filter(post=>{
            return post.categories.includes(tag)===true;
         }));
        
    }
   const activeTag=(tag)=>{
        // e.style.background="red";
        if(activeTags.includes(tag)===false)
        setActiveTags([...activeTags,tag])
        filterByTags(tag)
   }
    const toggleTags=()=>{
        console.log("ja raha hain")
        if(showTags===true)
        setShowTags(false);
        else
        setShowTags(true);

       
    //     if(tags.length===0){
        posts.map(post=>{
            for(var i=0;i<post.categories.length;i++){
                console.log("pl"+post.categories[i])
                if(arr.includes(post.categories[i])===false)
                arr.push(post.categories[i])
                // setTags([...tags,post.categories[i]])

            }

        })
        arr.map(tag=> console.log(tag))
       console.log(arr);
        setTags(arr) 
        console.log(tags)
    // }
        
    }
    const removeFilter=(tag)=>{
       var po=[]
       all_posts.map(post=>{
           let flag=1;
        for(var i=0;i<activeTags.length;i++)
        {
            if(activeTags[i]!==tag&&post.categories.includes(activeTags[i])===false)
            {
            flag=0;
            break
            }
        }
        if(flag==1)
        po.push(post);
})
console.log(po)
setPosts(po)
        setFilterPosts( po)
    if(activeTags.length===1)
    setPosts(all_posts)
    }
    const removeTags=(_)=>{
        setActiveTags( activeTags.filter((tag,index)=>index!==_))
        console.log(activeTags[_])
        removeFilter(activeTags[_])
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
                <div className={`${styles.tags}`} onClick={()=>toggleTags()}>Tags <span>
                    {(showTags===false)?<IoMdArrowDropdownCircle/>:<IoMdArrowDropupCircle/>}</span></div>
               
            </div>
            {
            (showTags===true)&&<div className={`${styles.allTags}`}>
                {/* {tags.key.length===true} */}
                {/* {tags.map((tag)=>{
                        <div>{tag}</div>
                        // <div className={`${styles.tag}`} name={tag} onClick={()=>activeTag(tag)}>{tag}</div>
                        // tag
                    })} */}
                {
                    all_posts.length&&all_posts.map((post,_)=>(
                        post.categories.map(tag=>(
                        <div className={`${styles.tag}`} name={tag} onClick={()=>activeTag(tag)}>{tag}</div>
                        ))
                    ))
                    
                }
                
                </div>
}
                
                    <div className={`${styles.activeTags}`}>
                        {
                    activeTags.map((tag,_)=>(
                        <div className={`${styles.tagActive}`}>{tag}<span onClick={()=>removeTags(_)}><ImCross/></span></div>
                    ))
                }
                </div>
                {/* {posts.length} */}
        {
             
                posts.length ? posts.map(post => (
                    
                        <div className={`${styles.post}`} >
                       
                            <div className={`${styles.upper}`}>
                            <div className={`${styles.username}`}>{post.username}</div>
                            <Link style={{textDecoration: 'none', color: 'inherit'}} to={`details/${post._id}`}>
                            <button className={`btn ${styles.read_me}`}>Read More</button>
                        
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