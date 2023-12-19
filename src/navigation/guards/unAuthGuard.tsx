import React, {useEffect} from 'react';
import useAuth from "../../hooks/useAuth";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "../../store/slices/userSlice";

const UnAuthGuard =  ({component}) => {
    const {user, token} = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const {signIn} = useAuth();
    useEffect(() => {
        if (token) {
            dispatch(getUserProfile(token))
        }
        if (user) {
            signIn()
        }
    }, [user, token])

    return <React.Fragment>{component}</React.Fragment>
}

export default UnAuthGuard;
