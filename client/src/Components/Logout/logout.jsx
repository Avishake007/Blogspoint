import React, { useEffect,useContext } from 'react';

//React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useHistory } from 'react-router-dom';

import {UserContext} from '../../App';
const Logout=()=>{
    const {state,dispatch}=useContext(UserContext);
    console.log(state);
    //Promises
    const history=useHistory();
    useEffect(()=>{
        fetch('./logout',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res)=>{
            dispatch({type:'USER',payload:false})
            setTimeout(toast.success("Successfully Logout",{
                position: "top-center",
              }),3000);
              window.location.reload(false);
            history.push('/signin',{replace:false});
            if(!res.status===200){
                const error=new Error(res.error);
                throw error;
            }
        }).catch((err)=>{
            console.log(err);
        })
    });
    return(
        <>
        <ToastContainer/>
        </>
    )
}
export default Logout;