import React from 'react';
import {Input, Form} from "../..";
import {Box, Select} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {SubmitHandler, useForm} from "react-hook-form";
import {getCurrentDate} from "../../../helpers/utils";
import {IFormDefault} from "../../../types/interfaces";
import {Text} from "../../atoms/text";

function FormDefault({title, isReset, action, formLoad, errorForm, defaultValues, btnTitle, select}) {

    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors},} = useForm<IFormDefault | undefined | null>(
        {
            mode: 'onChange',
            defaultValues
        });

    const onSubmit: SubmitHandler<IFormDefault | undefined> = (data, e) => {
        if (data) {
            const originalDate = new Date(data.dueDate);
            originalDate.setDate(originalDate.getDate() + 1);
            const req = {...data, dueDate: originalDate.toISOString().split('T')[0]};
            dispatch(action(req));
            isReset ? e?.target.reset() : null;
        }
    };

    return (
        <Form
            formStyles={{
                marginTop: '40px',
                marginLeft: '10px',
                bgColor: 'none',
                borderColor: 'none',
                marginX: "auto",
            }}
            title={title}
            submit={() => handleSubmit(onSubmit)}
            load={formLoad}
            btnTitle={btnTitle}
            errors={errors}
            errorRequest={errorForm}
            inputs={
                [<Input
                    label='Title'
                    type="text"
                    register={register}
                    error={errors}
                    name='title'
                    key='title'
                    options={{
                        required: 'Required',
                        minLength: {
                            value: 3,
                            message: "ErrorMinLength"
                        },
                    }}
                />,
                    <Input
                        label='Description'
                        type="text"
                        register={register}
                        error={errors}
                        name='description'
                        key='description'
                        options={{
                            required: 'Required',
                            minLength: {
                                value: 3,
                                message: "ErrorMinLength"
                            },
                        }}
                    />,
                    select ?
                        <Box key='select'>
                            <Text marginTop='7px'>Status</Text>
                            <Select
                                {...register('status')}
                                marginY='12px'
                                name='status'
                                key='status'>
                                {Object.values(select)
                                    .map((item: string,) =>
                                        <option key={item} value={item}>{item}</option>)
                                }</Select>
                        </Box> : null,
                    <Input
                        label='DueDate'
                        type="date"
                        defaultValue={getCurrentDate()}
                        register={register}
                        error={errors}
                        name='dueDate'
                        key='dueDate'
                    />,
                ]}
        />
    );
}

export {FormDefault};
