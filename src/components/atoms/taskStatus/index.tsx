import React from 'react';
import {Flex} from "@chakra-ui/react";
import {todoStatus} from "../../../types/enums";
import {Text} from "../text";

function TaskStatus({status}:string) {

    const colors={
        [todoStatus.Done]:'green',
        [todoStatus.Failed]:'red',
        [todoStatus.InProgress]:'gold',
        [todoStatus.ToDO]:'grey'
    }

    return (
        <Flex
            bgColor={colors[status]}
            width='150px'
            height='25px'
            justifyContent='center'
            alignItems='center'
        >
            <Text color='black' fontSize='18px'>{status}</Text>
        </Flex>
    );
}

export {TaskStatus};
