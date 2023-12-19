import React from 'react';
import {Outlet} from 'react-router-dom'
import {Header} from "../../components";

function Layout(props) {
    return (
        <>
            <Header/>
                 <Outlet/>
        </>
    );
}

export {Layout};
