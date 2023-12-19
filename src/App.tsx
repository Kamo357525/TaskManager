import {Navigation} from "./navigation";
import {Box} from "@chakra-ui/react";
import {Users} from './services/Api';
import {useDispatch} from 'react-redux';
import {useEffect, useLayoutEffect, useMemo} from "react";
import {getUserProfile} from "./store/slices/userSlice";
import {setCookie,getCookie, deleteCookie} from "./helpers/cookie";

function App() {
    const authToken=getCookie('Token');
    const dispatch=useDispatch();

    useMemo(()=>{
        if(authToken){
            dispatch(getUserProfile())
        };
    },[])

    return (
        <Box id='wrapper'>
            <Navigation/>
        </Box>
    )
}

export default App;
