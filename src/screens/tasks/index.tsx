import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {todoStatus} from "../../types/enums";
import {getCurrentDate} from "../../helpers/utils";
import {SubmitHandler, useForm} from "react-hook-form";
import {Pagination, Form, Text} from "../../components";
import {getTasks} from "../../store/slices/tasksSlices";
import {Button, Flex,  Select, Input} from "@chakra-ui/react";
import {IFormDefault} from "../../types/interfaces";
import {TasksLists} from "../../components/organisms/tasksList";

function Tasks() {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const [activePage, setActivePage] = useState(0);
    const {taskLoad, taskError, tasksPageCount, tasksList} = useSelector((state) => state.tasks);

    const {register, handleSubmit, formState: {errors}} = useForm<IFormDefault | undefined>(
        {
            mode: 'onChange',
            defaultValues: {}
        });

    const onSubmit: SubmitHandler<IFormDefault | undefined> = (data,) => {
        console.log(data)
        dispatch(getTasks({
            ...data,
            skip: activePage * 12
        }))
    };
    useEffect(()=>{
        dispatch(getTasks({
            dueDate:getCurrentDate(),
            skip: activePage * 12
        }))
    },[])

    return (
        <Flex flexDirection={'column'}>
            <Form
                title='SearchTasks'
                load={taskLoad}
                btnTitle='Search'
                errors={errors}
                errorRequest={taskError}
                formStyles={{
                    justifyContent: 'row',
                    marginTop: '15px',
                    bgColor: 'none',
                    marginX: "auto",
                    border: 'none',
                }}
                submit={() => handleSubmit(onSubmit)}
                inputs={
                    [
                        <Select
                            {...register("status")}
                            marginY='12px'
                            defaultValue="All"
                            name='status'
                            key='select'>
                            <option key='All' value=''>All</option>
                            {Object.values(todoStatus).map((item: string,) =>
                                <option key={item} value={item}>
                                    {item}
                                </option>)}
                        </Select>,
                        <Input
                            {...register("dueDate")}
                            label='DueDate'
                            type="date"
                            defaultValue={getCurrentDate()}
                            name='dueDate'
                            key='dueDate'
                        />,
                    ]}
            >
                <Button marginLeft='180px' onClick={() => navigation('/tasks/create')}>
                    <Text>AddTasks</Text>
                </Button>
            </Form>
            {tasksList.length?
                <Pagination
                    totalPages={tasksPageCount}
                    key='pagination'
                    activePage={activePage}
                    setActivePage={setActivePage}
                    onPageChange={handleSubmit(onSubmit)}
                />:<Text textAlign='center' fontSize='24px' marginTop='50px'>NoTasks</Text>}
            <TasksLists/>

        </Flex>
    );
}

export {Tasks};
