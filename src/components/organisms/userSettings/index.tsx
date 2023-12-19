import React from 'react';
import {Text} from "../../";
import {FormSetPassword} from "./formSetPassword";
import {FormSetPersonalData} from "./formSetPersonalData";
import {
    Button,
    Flex,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";


function UserSettings({isOpen, onClose}) {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader marginX='auto'>
                    <Text>
                    UserSettings
                </Text>
                </ModalHeader>
                <Flex>
                    <FormSetPersonalData/>
                    <FormSetPassword/>
                </Flex>
                <ModalCloseButton/>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        <Text>
                            Close
                        </Text>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export {UserSettings};
