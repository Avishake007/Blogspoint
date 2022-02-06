//Third Party imports
import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
const Logout = () => {
    //UseContext Declarations
    const { state, dispatch } = useContext(UserContext);
    //UseHistory Declarations
    const history = useHistory();
    //UseEffect Declarations
    useEffect(() => {
        fetch('./logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            dispatch({ type: 'USER', payload: false })
            
            window.location.reload(false);
            history.push('/about', { replace: false });
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err) => {
            console.log(err);
        })
    });
    return (
        <>
            <div ></div>

        </>
    )
}
export default Logout;