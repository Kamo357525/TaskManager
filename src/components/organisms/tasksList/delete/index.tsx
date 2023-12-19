import React, {useEffect} from 'react'
import {Text} from '../../../../components'
import {useDispatch, useSelector} from "react-redux";
import {deleteTasks} from "../../../../store/slices/tasksSlices";
import {
    Button,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure, useToast
} from "@chakra-ui/react";

function Delete({id}) {
    const toast = useToast();
    const dispatch = useDispatch();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {isDeleteTask, deleteTasksLoad, deleteTasksLoadError, deleteTasksId} = useSelector((state) => state.tasks);

    const handlerDelete = () => {
        dispatch(deleteTasks(id))
    }

    useEffect(() => {
        if (id === deleteTasksId) {
            if (isDeleteTask) {
                toast({
                    title: 'Task Deleted.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                onClose();
            }
            if (deleteTasksLoadError) {
                toast({
                    title: deleteTasksLoadError,
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
    }, [isDeleteTask, deleteTasksLoadError])

    return (
        <>
            <Button onClick={onOpen} bgColor='red' marginRight='15px'>
                <Text>Delete</Text>
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Delete Task ID {id}?</ModalHeader>
                    <ModalCloseButton/>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='red' onClick={handlerDelete} disabled={deleteTasksLoad}>Yes</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export {Delete};
