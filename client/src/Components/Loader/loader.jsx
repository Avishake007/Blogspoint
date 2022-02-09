/*
This is a loader component
*/
import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

//Loader Css 
import styles from './loader.module.css';
const Loader=()=>{
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
    return(
        <>
        <div className={`${styles.loader}`}>
        Loading...
        <Spin indicator={antIcon} />
        </div>
       
        </>
    )
}
export default Loader;
