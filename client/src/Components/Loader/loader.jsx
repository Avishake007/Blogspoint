/*
This is a loader component
*/
import React from 'react';
import Spinner from '../Spinner/spin';

//Loader Css 
import styles from './loader.module.css';
const Loader=()=>{
   
    return(
        <>
        <div className={`${styles.loader}`}>
        Loading ...
        <Spinner/>
        </div>
       
        </>
    )
}
export default Loader;
