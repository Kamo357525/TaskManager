import {Svg} from "../../assets/svgs";
import {Tasks} from '../../assets/images';
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {IFormSignIn} from "../../types/interfaces";
import {useDispatch, useSelector} from "react-redux";
import {SubmitHandler, useForm} from "react-hook-form";
import {Form, Header, Input, Text} from '../../components';
import {emailRegExp, letter, passwordRegExp} from "../../helpers/validation";
import {userRegister, registerInitialState} from "../../store/slices/userSlice";
import {colorMode, colorMode as colorModeEnum, svgNames} from "../../types/enums";
import {Box, Flex, Spacer, Image,  useToast} from '@chakra-ui/react';

function SignUp() {
    const toast = useToast();
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const [passwordType, setPasswordType] = useState('password');
    const {registerError, registerLoad, isRegister} = useSelector((state) => state.user);
    const {register, handleSubmit, formState: {errors},} = useForm<IFormSignIn | undefined | null>(
        {
            mode: 'onChange'
        });
    const onSubmit: SubmitHandler<IFormSignIn | undefined> = (data) => {
        dispatch(userRegister(data))
    };

    useEffect(() => {
        if (isRegister) {navigation('/');
        toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
        dispatch(registerInitialState())
        }
    }, [isRegister]);

    return (
        <Box>
            <Header/>
            <Flex
                width='100vw'
                height='100vh'
                bgColor={colorMode === colorModeEnum.Light ? 'white' : 'blackAlpha.100'}
                bgSize="cover"
                bgPos="center"
            >
                <Flex width='50%'
                      alignItems={'center'}
                      justifyContent={'center'}
                >
                    <Box>
                        <Image
                            src={Tasks}
                            boxSize="500px"
                            objectFit="cover"
                        />
                    </Box>
                </Flex>
                <Spacer/>
                <Flex width='50%'
                      alignItems='center'
                      justifyContent='flex-end'
                      pr='1%'
                >
                    <Form
                        title='SignUp'
                        submit={() => handleSubmit(onSubmit)}
                        load={registerLoad}
                        btnTitle='SignUp'
                        errors={errors}
                        errorRequest={registerError}
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
                                />, <Input
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
                            />, <Input
                                label='Password'
                                type={passwordType}
                                register={register}
                                error={errors}
                                name='password'
                                key='password'
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
                    > <Text
                        onClick={() => navigation('/')}
                        marginY={'10px'}
                        color='teal'
                        cursor='pointer'
                        _hover={{color: "gray"}}>
                        LoginPage
                    </Text>
                    </Form>
                </Flex>
            </Flex>
        </Box>
    );
}

export {SignUp};
