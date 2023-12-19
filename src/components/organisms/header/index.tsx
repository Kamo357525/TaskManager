import React from 'react';
import {useSelector} from "react-redux";
import {Logo} from "../../../assets/images";
import {useNavigate} from "react-router-dom";
import {Language, ColorMode, UserPanel} from "../../";
import { Flex, Image, useDisclosure} from "@chakra-ui/react";
import {UserSettings} from "../../";


function Header() {
    const navigation = useNavigate();
    const {user} = useSelector((state) => state.user);
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <Flex width='100%'
              alignItems='center'
              height='60px'
              justifyContent='space-between'
              p='12px'
              borderBottomWidth='2px'
              borderBottomColor='gray.500'
        >
            <Image
                onClick={() => navigation('/tasks')}
                src={Logo}
                boxSize="58px"
                objectFit="cover"
                alt='Logo'
                cursor='pointer'
            />
            <ColorMode/>
            <Language/>
            {user ? <UserPanel isOpen={isOpen} onOpen={onOpen} onClose={onClose}/> : null}
            <UserSettings isOpen={isOpen} onClose={onClose} user={user}/>
        </Flex>
    );
}

export {Header};
