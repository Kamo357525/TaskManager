import React from 'react';
import {Delete} from "./delete";
import {useSelector} from "react-redux";
import {Loader} from "../../atoms/loader";
import {useNavigate} from "react-router-dom";
import {TaskStatus, Text as TextCustom} from "../../../components";
import {Box, Button, Flex, Text} from "@chakra-ui/react";

function TasksLists() {
    const navigation = useNavigate();
    const {tasksList, taskLoad} = useSelector((state) => state.tasks);

    const Item = ({item}) => {
        return (
            <Flex
                flexDirection={'column'}
                justifyContent={'space-between'}
                key={item.id}
                borderWidth='2px'
                marginX='auto'
                p='10px'
                borderColor="gray"
                borderRadius='10px'
                width='30%'
                marginY='10px'>
                <Flex
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                >
                    <TaskStatus status={item.status}/>
                    <Text>id {item.id}</Text>
                    <Text>DueDate {item.dueDate.slice(0, 10)}</Text>
                    <Text>Title {item.title}</Text>
                    <Text>Description</Text>
                    <Text textAlign='center'>{item.description}</Text>
                </Flex>
                <Flex
                    marginY='20px'
                    justifyContent='space-around'
                >
                    <Delete id={item.id}/>
                    <Button onClick={() => navigation(`/tasks/${item.id}/update`)}>
                        <TextCustom>
                            UpDate
                        </TextCustom>
                    </Button>
                </Flex>
            </Flex>)
    }

    if (taskLoad) {
        return (
            <Flex
                marginX='20px'
                alignItems='center'
                justifyContent='center'
            ><Loader/>
            </Flex>
        )
    }

    return (
        <Box>
            {tasksList.length?<TextCustom
                textAlign='center'
                fontSize='24px'
                marginBottom='20px'>
                Tasks
            </TextCustom>:null}
            <Flex
                marginY='15px'
                marginX='auto'
                width='95%'
                flexWrap='wrap'
                justifyContent='space-between'
            >
                {tasksList ? tasksList.map((item) =>
                    <Item key={item.id} item={item}/>
                ) : null}
            </Flex>
        </Box>
    );
}

export {TasksLists} ;
