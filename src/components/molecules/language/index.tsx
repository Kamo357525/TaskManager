import React, {useEffect, useState} from 'react';
import {Flex, Image} from "@chakra-ui/react";
import {language as languageEnum} from "../../../types/enums";
import i18n from "i18next";
import {Am, Ru, Eng} from '../../../assets/images'
import '../../../i18n/index';

const Item = ({src, onClick, isActive}) => {
    return (
        <Flex
            alignItems='center'
            justifyContent='center'
            width={isActive?'55px':'40px'}
            cursor='pointer'
            marginX='10px'>
            <Image
                onClick={()=>onClick()}
                src={src}
                borderRadius={'10px'}
                objectFit='contain'/>
        </Flex>
    )
}

function Language() {
    const [activeLanguage, setActiveLanguage]=useState<String>(languageEnum.Eng);

    useEffect(()=>{
        const language=localStorage.getItem('language');
        if(language){
            setActiveLanguage(language);
            i18n.changeLanguage(language).then(r => r);
        }
    },[])

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng).then(r => r);
        setActiveLanguage(lng);
        localStorage.setItem('language', lng);
    };

    return (
        <Flex
            alignItems='center'
            justifyContent='center'
            width='240px'
            height='40px'
            borderRadius='15px'
            p='5px'
        >
            <Item src={Am} onClick={()=>changeLanguage(languageEnum.Am)} isActive={activeLanguage===languageEnum.Am} />
            <Item src={Ru} onClick={()=>changeLanguage(languageEnum.Ru)} isActive={activeLanguage===languageEnum.Ru}/>
            <Item src={Eng} onClick={()=>changeLanguage(languageEnum.Eng)} isActive={activeLanguage===languageEnum.Eng}/>
        </Flex>
    );
}

export {Language};
