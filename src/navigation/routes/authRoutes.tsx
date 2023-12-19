import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import AuthGuard from "../guards/authGuard";
import {Layout} from "../layout"
import {Tasks, CreateTasks, UpdateTasks} from '../../screens';

const AuthRoutes = [
    <Route  key="/tasks" element={<AuthGuard component={<Layout/>}/>}>
        <Route path="/tasks" key="/tasks" element={<AuthGuard component={<Tasks/>}/>}/>
        <Route path="/tasks/create" key="/tasks/create"  state={{ from: 'home' }}  element={<AuthGuard component={<CreateTasks/>}/>}/>
        <Route path="/tasks/:id/update"  key="/tasks/:id/update"  state={{ from: 'home' }} element={<AuthGuard component={<UpdateTasks/>}/>}/>
    </Route>

]

export default AuthRoutes;
