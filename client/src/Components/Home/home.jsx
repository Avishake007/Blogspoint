import React from 'react';
import styles from './home.module.css';
import Blogger from './blogger';

const Home=()=>{
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
        </>
    )
}
export default Home;