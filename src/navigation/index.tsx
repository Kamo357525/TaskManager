import React from 'react';
import AuthRoutes from "./routes/authRoutes";
import {NotFound} from "../screens";
import UnAuthRoutes from "./routes/unAuthRoutes";
import { Route, Routes} from 'react-router-dom';

const Navigation: React.FC = () => {
    return (
        <Routes>
            {UnAuthRoutes}
            {AuthRoutes}
            <Route path='*' element={<NotFound/>} />
        </Routes>
        )
};

export {Navigation};
