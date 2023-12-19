import React from "react";
import {Route} from "react-router-dom";
import AnAuthGuard from "../guards/unAuthGuard";
import {SignIn} from "../../screens/signIn";
import {SignUp} from "../../screens/signUp";

const UnAuthRoutes = [
    <Route path="/" key="/signIn" element={<AnAuthGuard component={<SignIn/>}/>}/>,
    <Route path="/signup" key="/signup" element={<AnAuthGuard component={<SignUp/>}/>}/>
]

export default UnAuthRoutes;
