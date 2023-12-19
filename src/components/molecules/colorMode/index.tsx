import React from 'react';
import {Text} from '../../';
import {Svg} from "../../../assets/svgs";
import {Box, Flex, useColorMode} from "@chakra-ui/react";
import {colorMode as colorModeEnum, svgNames} from "../../../types/enums";

const Item = ({isActive, icon, text, onPress}) => {
    return (
        <Box
            width='50%'
            height='100%'
            onClick={onPress?() => onPress():null}
            cursor='pointer'
            borderRadius={isActive ? '10px' : '0'}
            bgColor={isActive ? 'blackAlpha.500' : 'rgba(255, 0, 0, 0)'}
        >
            <Flex
                width='100%'
                height='100%'
                alignItems='center'
                justifyContent='center'
            >
                <Text marginX={'10px'}>{text}</Text>
                {icon}
            </Flex>
        </Box>
    )
}

function ColorMode(props) {
    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <Box
            width='240px'
            height='40px'
            borderRadius='15px'
            p='5px'
            bgColor={colorMode === colorModeEnum.Dark ? 'whiteAlpha.400' : 'blackAlpha.400'}
        >
            <Flex width='100%'
                  height='100%'>
                <Item
                    isActive={colorMode === colorModeEnum.Dark}
                    text='Dark'
                    icon={<Svg svgName={svgNames.Moon} />}
                    onPress={colorMode === colorModeEnum.Dark ? null : toggleColorMode}
                />
                <Item
                    isActive={colorMode === colorModeEnum.Light}
                    text='Light'
                    icon={<Svg svgName={svgNames.Sun} />}
                    onPress={colorMode === colorModeEnum.Light ? null : toggleColorMode}
                />
            </Flex>
        </Box>
    );
}

export {ColorMode};
