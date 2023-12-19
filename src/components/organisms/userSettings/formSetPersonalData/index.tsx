import React, {useEffect} from 'react';
import {useToast} from "@chakra-ui/react";
import {Svg} from "../../../../assets/svgs";
import {useNavigate} from "react-router-dom";
import {svgNames} from "../../../../types/enums";
import {Input, Form} from "../../../../components";
import {useDispatch, useSelector} from "react-redux";
import {SubmitHandler, useForm} from "react-hook-form";
import {IFormSignIn} from "../../../../types/interfaces";
import {emailRegExp, letter} from "../../../../helpers/validation";
import {setUserDataInitialState, updateUserProfile} from "../../../../store/slices/userSlice";

function FormSetPersonalData() {
    const toast = useToast();
    const dispatch = useDispatch();
    const {setUserDataLoad, setUserDataError, setUserDataSuccess, user} = useSelector((state) => state.user);

    const {register, handleSubmit, formState: {errors},} = useForm<IFormSignIn | undefined>(
        {
            defaultValues: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
            mode: 'onChange'
        });


    useEffect(() => {
        if (setUserDataSuccess) {
            dispatch(setUserDataInitialState());
            toast({
                title: 'User edite!!!!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
    }, [setUserDataSuccess]);

    const onSubmit: SubmitHandler<IFormSignIn | undefined> = (data) => {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("image", data.image[0]);
        formData.append("lastName", data.lastName);
        formData.append("firstName", data.firstName);
        dispatch(updateUserProfile(formData));
    };

    return (
        <Form
            formStyles={{
                marginX: 'auto',
                border: 'none',
                borderTopRadius: 0,
                borderBottomRadius: 0
            }}
            title='LastName'
            submit={() => handleSubmit(onSubmit)}
            load={setUserDataLoad}
            btnTitle='EditUser'
            errors={errors}
            errorRequest={setUserDataError}
            inputs={
                [<Input
                    svg={<Svg svgName={svgNames.User}/>}
                    label='FirstName'
                    type="text"
                    register={register}
                    error={errors}
                    name='firstName'
                    key='firstName'
                    options={{
                        required: 'Required',
                        pattern: {
                            value: letter,
                            message: 'Later'
                        },
                        minLength: {
                            value: 3,
                            message: "ErrorMinLength"
                        },
                        maxLength: {
                            value: 30,
                            message: "ErrorMaxLength"
                        },
                    }}
                />,
                    <Input
                        label='LastName'
                        type="text"
                        register={register}
                        error={errors}
                        name='lastName'
                        key='lastName'
                        svg={<Svg svgName={svgNames.User}/>}
                        options={{
                            pattern: {
                                value: letter,
                                message: 'Later'
                            },
                            required: 'Required',
                            minLength: {
                                value: 3,
                                message: "ErrorMinLength"
                            },
                            maxLength: {
                                value: 30,
                                message: "ErrorMaxLength"
                            },
                        }}
                    />, <Input type="file"
                               label='image'
                               register={register}
                               name='image'
                               key='image'/>,
                    <Input
                        label='InputEmail'
                        type="text"
                        register={register}
                        error={errors}
                        name='email'
                        key='email'
                        svg={<Svg svgName={svgNames.Email}/>}
                        options={{
                            required: 'Required',
                            pattern: {
                                value: emailRegExp,
                                message: "EmailError",
                            },
                        }}
                    />,
                ]}
        />
    );
}

export {FormSetPersonalData};
