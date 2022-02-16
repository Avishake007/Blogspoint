//Third Party imports
import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import styles from "./logout.module.css";
const Logout = () => {
    //UseContext Declarations
    const { dispatch } = useContext(UserContext);
    //UseHistory Declarations
    const history = useHistory();
    const userData = JSON.parse(localStorage.getItem("userLogin"));
    //UseEffect Declarations
    useEffect(() => {
        fetch('/user/logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            
            dispatch({ type: 'USER', payload: false })
            localStorage.setItem("userLogin",JSON.stringify(null));
           console.log("logout")
            history.push('/signin', { replace: true });
           
            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err) => {
            console.log(err)
        })
    });
    if (userData===null) {history.push("/signin")}
    return (
        <>
            <div className={`${styles.logout}`}>
                <p>Thanks for visiting our Website 😊</p>
                <p>Please 🙏 come back Again </p>
            </div>

        </>
    )
}
export default Logout;