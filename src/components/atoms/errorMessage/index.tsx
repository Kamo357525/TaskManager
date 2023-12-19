import React from 'react';
import {Text} from "../../";

function ErrorMessage({error,...props}) {
    return (
        <Text
            color='red'
            fontSize='13px'
            {...props}
        >
            {error}
        </Text>
    );
}

export {ErrorMessage};
