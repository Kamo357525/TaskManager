import React from 'react';
import {Flex, Spinner} from "@chakra-ui/react";

function Loader() {
    return (
        <Flex
            width='100%'
            height='100%'
            alignItems='center'
            justifyContent='center'
        >
            <Spinner color='red.500'/>
        </Flex>
    );
}

export {Loader};
