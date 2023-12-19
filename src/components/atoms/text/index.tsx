import React from 'react';
import {Text as ChakraText} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

function Text({children, ...props}) {

    const {t} = useTranslation();

    return (
        <ChakraText {...props}>
            {t(children)}
        </ChakraText>
    );
}

export {Text};
