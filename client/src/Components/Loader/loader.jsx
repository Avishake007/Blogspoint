/*
This is a loader component
*/
import React from 'react';

//React Icons
import { BiLoader } from 'react-icons/bi';

//Loader Css 
import styles from './loader.module.css';
const Loader=()=>{
    return(
        <>
        <div className={`${styles.loader}`}>
        Loading...
        <BiLoader/>
        </div>
       
        </>
    )
}
export default Loader;
