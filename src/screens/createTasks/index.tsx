import React, {useEffect} from 'react';
import {useToast} from "@chakra-ui/react";
import {FormDefault} from "../../components";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createTasks, createTasksDefault} from "../../store/slices/tasksSlices";

function CreateTasks() {
    const toast = useToast();
    const dispatch=useDispatch();
    const navigation=useNavigate();
    const {addTasksLoad, addTasksError, isCreate} = useSelector((state) => state.tasks);

    useEffect(()=>{
        if(isCreate){
            toast({
                title: 'Tasks Create!!!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            dispatch(createTasksDefault());
            navigation('/tasks')

        }
    },[isCreate]);

    return (
        <FormDefault
            title='CreateTasksTitle'
            isReset={true}
            action={createTasks}
            formLoad={addTasksLoad}
            errorForm={addTasksError}
            btnTitle='Create'/>
    );
}

export {CreateTasks};



