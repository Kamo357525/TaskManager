import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Text, useToast} from "@chakra-ui/react";
import {FormDefault} from "../../components";
import {useNavigate, useParams} from "react-router-dom";
import {todoStatus} from "../../types/enums";
import {
    getTasksFromId,
    updateTasks,
    updateTasksDefault
} from "../../store/slices/tasksSlices";

function UpdateTasks() {
    const toast = useToast();
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const {
        tasksId,
        tasksIdLoad,
        tasksIdError,
        isUpdateTask,
        updateTasksLoad,
        updateTasksId,
        updateTasksError,
    } = useSelector((state) => state.tasks);


    useEffect(() => {
        if (tasksId.id === updateTasksId) {
            if (isUpdateTask) {
                toast({
                    title: 'Todo Update.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                navigation('/tasks');
                dispatch(updateTasksDefault())
            }
            if (updateTasksError) {
                toast({
                    title: updateTasksError,
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
    }, [isUpdateTask, updateTasksError]);

    useEffect(() => {
        dispatch(getTasksFromId(id))
    }, []);

    if (tasksIdLoad || tasksIdError) {
        const text = tasksIdLoad ? 'Loading...' : 'NoTasks'
        return <Text fontSize='24px' textAlign='center' marginY='50px'>{text}</Text>
    }

    return (
        <FormDefault
            title='UpDate'
            action={updateTasks}
            formLoad={updateTasksLoad}
            errorForm={updateTasksError}
            defaultValues={{...tasksId, dueDate: tasksId.dueDate?.slice(0, 10)}}
            btnTitle='Update'
            select={todoStatus}
        />
    );
}

export {UpdateTasks};
