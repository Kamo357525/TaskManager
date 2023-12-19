import React, {useEffect, useState} from 'react';
import {Flex, Text} from "@chakra-ui/react";

const Pagination = ({activePage, setActivePage, totalPages, onPageChange}) => {
    const pages = Array.from({length: totalPages});

    useEffect(() => {
        onPageChange();
    }, [activePage])

    return (
        <Flex marginY='15px' alignItems='center' justifyContent='center'>
            {pages.map((item, i) =>
                <Text
                    marginX='3px'
                    onClick={() => {
                        setActivePage(i);
                    }}
                    fontSize={i === activePage ? 24 : 16}
                    cursor='pointer'
                    key={i}>
                        {i + 1}
                </Text>)
            }
        </Flex>
    );
};

export {Pagination};
