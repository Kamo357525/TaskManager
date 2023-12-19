import React from 'react';
import {svgNames, colorMode as colorModeEnum} from "../../types/enums";
import {useColorMode} from "@chakra-ui/react";
import {Settings} from './settings';
import {Moon} from './moon';
import {Sun} from './sun';
import {Eye} from './eye';
import {Email} from './email';
import {User} from './user';
import {Door} from "./door";


function Svg({svgName}:string) {

    const {colorMode} = useColorMode();
    const color=colorMode===colorModeEnum.Dark?'white':'black';

    switch (svgName){
        case svgNames.Moon:{
            return <Moon color={color}/>
        }
        case svgNames.Sun:{
            return <Sun color={color}/>
        }
        case svgNames.Eye:{
            return <Eye color={color}/>
        }
        case svgNames.Email:{
            return <Email color={color}/>
        }
        case svgNames.User:{
            return <User color={color} />
        }
        case svgNames.Settings:{
            return <Settings color={color}/>
        }
        case svgNames.Door:{
            return <Door color={color}/>
        }
    }
}

export  {Svg};
