import React from 'react';
import {Box, Flex, Input as ChakraInput} from "@chakra-ui/react"
import {Text} from "../../";
import {ErrorMessage} from "../errorMessage";

function Input({
                   label = '',
                   labelStyles = {},
                   containerStyles = {},
                   error={},
                   register,
                   name,
                   firstSubmit,
                   options,
                   svgEvent,
                   svg,
                   ...props
               }) {

    const inputValidColor = error[name] ? 'red' : 'null';

    return (
        <Flex
            flexDirection="column"
            {...containerStyles}
        >
            {label ? <Text {...labelStyles} fontSize='14px' marginY='5px'>{label}</Text> : null}
            <Box>
                <Box position='relative'>
                    {svg ? <Box
                        onClick={svgEvent}
                        position='absolute'
                        cursor='pointer'
                        zIndex={2}
                        top='25%'
                        marginLeft='6px'>
                        {svg}
                    </Box> : null}
                    <ChakraInput
                        paddingLeft={svg ? '35px' : '5px'}
                        width='100%'
                        borderBottomWidth='2px'
                        borderBottomRadius='0'
                        borderBottomColor={inputValidColor}
                        _hover={{borderBottomColor: inputValidColor}}
                        _focus={{borderBottomColor: inputValidColor}}
                        height='40px'
                        {...props}
                        {...(register && register(name, options))}
                    />
                </Box>
                {error[name] ? <ErrorMessage error={error[name].message}/> : null}
            </Box>
        </Flex>
    )
}

export {Input};
