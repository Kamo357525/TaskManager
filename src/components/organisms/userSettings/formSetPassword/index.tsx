import {useToast} from "@chakra-ui/react";
import {Svg} from "../../../../assets/svgs";
import React, {useEffect, useState} from 'react';
import {svgNames} from "../../../../types/enums";
import {Form, Input} from "../../../../components";
import {useDispatch, useSelector} from "react-redux";
import {SubmitHandler, useForm} from "react-hook-form";
import {IFormSignIn} from "../../../../types/interfaces";
import {passwordRegExp} from "../../../../helpers/validation";
import {updateUserPassword} from "../../../../store/slices/userSlice";

function FormSetPassword() {
    const toast = useToast();
    const dispatch = useDispatch();
    const [passwordType, setPasswordType] = useState('password');
    const {setPasswordLoad, setPasswordError, setPasswordSuccess} = useSelector((state) => state.user);

    const {register, handleSubmit, formState: {errors},} = useForm(
        {
            mode: 'onChange',
        });

    const onSubmit: SubmitHandler<IFormSignIn | undefined> = (data) => {
        dispatch(updateUserPassword(data))
    };

    useEffect(() => {
        if (setPasswordSuccess) {
            toast({
                title: 'Password setting.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
    }, [setPasswordSuccess])

    return (
        <Form
            formStyles={{
                border: 'none',
                borderTopRadius: 0,
                borderBottomRadius: 0
            }}
            title='SetPassword'
            submit={() => handleSubmit(onSubmit)}
            load={setPasswordLoad}
            btnTitle='Edit'
            errors={errors}
            errorRequest={setPasswordError}
            inputs={
                [<Input
                    label='Password'
                    type={passwordType}
                    register={register}
                    error={errors}
                    name='newPassword'
                    key='newPassword'
                    svg={<Svg svgName={svgNames.Eye}/>}
                    svgEvent={() => setPasswordType(passwordType === 'password' ? 'text' : 'password')}
                    options={{
                        required: 'Required',
                        pattern: {
                            value: passwordRegExp,
                            message: "PasswordError",
                        },
                    }}
                />,
                ]}
        />
    );
}

export {FormSetPassword};
