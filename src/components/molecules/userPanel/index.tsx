import React from 'react';
import {Text} from "../../";
import {Svg} from "../../../assets/svgs";
import {useNavigate} from "react-router-dom";
import {svgNames} from "../../../types/enums";
import useAuth from "../../../hooks/useAuth";
import {useSelector} from "react-redux";
import {Box, Button, Flex, Image} from "@chakra-ui/react";

function UserPanel({onOpen}) {
    const {signOut} = useAuth();
    const {user} = useSelector((state) => state.user);

    // useEffect(() => {
    //     if (userImagePath) {
    //         dispatch(getUserPhoto(userImagePath))
    //     }
    // }, [userImagePath]);

    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
        >
            <Flex
                alignItems="center"
                cursor='pointer'
                onClick={onOpen}>
                <Box marginX='5px'>
                    {user.file ?
                        <Image src={user.file.imagePath}
                               borderRadius='10px'
                               boxSize="40px"
                               objectFit="cover"
                               cursor='pointer'
                        /> : <Svg svgName={svgNames.User} size={1}/>
                    }
                </Box>
                <Text>{user.lastName + ' ' + user.firstName}</Text>
                <Box marginX='5px'>
                    <Svg svgName={svgNames.Settings}/>
                </Box>
            </Flex>
            <Button onClick={() => signOut()}>
                <Svg svgName={svgNames.Door}/>
            </Button>
        </Flex>
    );
}

export {UserPanel};
