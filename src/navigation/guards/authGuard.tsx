import React, { useEffect } from 'react';
import useAuth from "../../hooks/useAuth";
import {useSelector} from "react-redux";
import {deleteCookie, getCookie} from "../../helpers/cookie";

const AuthGuard = ({component}) => {
    const {user,loadToken } = useSelector((state) => state.user);
    const {signOut}=useAuth();

    useEffect(() => {
        if(!user && !loadToken){
            signOut();
        }
    }, [user, loadToken]);

    return <React.Fragment>{component}</React.Fragment>
}

export default AuthGuard;
