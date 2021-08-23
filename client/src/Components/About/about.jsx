/*
    This is about Page
    This Page contains all the details of the user
*/
import React, { useEffect, useState } from 'react';

//User default pic
import defaultpic from './defaultpic.png';


//About Css
import styles from './about.module.css';

//
import {useHistory} from 'react-router-dom';

//Importing the Loader Page
import Loader from '../Loader/loader';

const About=()=>{

    const history=useHistory();
    const [userData,setUserData]=useState({});
    const [loader,setLoader]=useState(true);

    //Checking for user authentication 
    const userAuthenticate= async()=>{
        try{
            const res=await fetch('/about',{
            method:"GET",
            headers:{
                Accept:"application/json",
                'Content-Type':'application/json'
            },
            credentials:"include"
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
      
    }

    //If user not authenticate then redirect to signin page
        catch(err){
           
            console.log(err);
            history.push('/signin');
        }
    }


    useEffect(()=>{
        userAuthenticate();
        setLoader(false);
    },[]);
    
    //Loader section
    if(loader)
    return <Loader/>
    return(
        <>
            <div className={`${styles.container}`}>
                <p>ABOUT</p>
                <div className={`${styles.about_section}`}>
                    <img src={defaultpic} alt="" />
                    <div className={`${styles.info}`}>
                        <div className={`${styles.detail}`}>
                            <label htmlFor="Username">Username</label>
                            <p>{userData.username}</p>
                        </div>
                        <div className={`${styles.detail}`}>
                            <label htmlFor="name">Name : </label>
                            <p>{userData.name}</p>
                        </div>
                        <div className={`${styles.detail}`}>
                            <label htmlFor="about_me">About Me : </label>
                            <p>Hello everyone</p>
                        </div>
                        <div className={`${styles.detail}`}>
                            <label htmlFor="state">State : </label>
                            <p>{userData.state}</p>
                        </div>
                        <div className={`${styles.detail}`}>
                            <label htmlFor="city">City : </label>
                            <p>{userData.city}</p>
                        </div>
                        <div className={`${styles.detail}`}>
                            <label htmlFor="stuorprof">Student/Professional : </label>
                            <p>{userData.stuprof}</p>
                        </div>
                        <div className={`${styles.detail}`}>
                            <label htmlFor="">Age : </label>
                            <p>21</p>
                        </div>
                        <div className={`${styles.detail}`}>
                            <label htmlFor="no_of_blogs">No of Blogs : </label>
                            <p>1</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default About;