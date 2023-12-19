import React from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteUser} from "../store/slices/userSlice";
import {deleteCookie} from "../helpers/cookie";

function UseAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function signIn() {
        navigate('/tasks')
    }

    function signOut() {
        deleteCookie("Token");
        deleteCookie("RefreshToken");
        dispatch(deleteUser())
        navigate('/');
    }

    return {
        signIn,
        signOut
    };
}

export default UseAuth;
