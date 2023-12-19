import React, {useEffect} from 'react';
import {Flex} from "@chakra-ui/react";
import {Text} from "../../components/atoms/text";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function NotFound(props) {
    const navigation=useNavigate();
    const {user} = useSelector((state) => state.user);

    useEffect(()=>{
        setTimeout(() => {
            user?navigation('/tasks'):navigation('/')
        }, 2000);
    },[])

    return (
        <Flex
            marginTop='15%'
            width='100%'
            height='100%'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
        >
            <Text fontSiz='30px'>404</Text>
            <Text fontSize='35px'>Not Found</Text>
        </Flex>
    );
}

export {NotFound};
