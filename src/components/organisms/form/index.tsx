import {Text} from "../../";
import React from 'react';
import {Box, Button, useColorMode} from "@chakra-ui/react";
import {colorMode as colorModeEnum} from "../../../types/enums";
import {ErrorMessage} from "../../";

function Form({title, inputs, errors, submit, btnTitle, load, errorRequest, children, formStyles}) {

    const {colorMode} = useColorMode();
    const colorBg = colorMode === colorModeEnum.Dark ? 'whiteAlpha.100' : 'blackAlpha.400';
    const colorBorder = colorMode === colorModeEnum.Dark ? 'white' : 'blackAlpha.800';

    return (
        <Box
            width='400px'
            bgColor={colorBg}
            borderColor={colorBorder}
            borderWidth='3px'
            borderRadius='10px'
            p='15px'
            {...formStyles}
        >
        <form
            onSubmit={submit()}
        >
            <Text textAlign='center' fontSize='18px'>{title}</Text>
            {errorRequest?<ErrorMessage fontSize='16px' textAlign='center' error={errorRequest}/>:null}
            {inputs}
            {btnTitle?
                <Button bgColor='teal'
                        type='submit'
                        marginY='25px'
                        isDisabled={Object.keys(errors).length !== 0 || load}
                >
                    <Text>{btnTitle}</Text>
                </Button>:null}
            {children}
        </form>
        </Box>
    );
}

export {Form};
