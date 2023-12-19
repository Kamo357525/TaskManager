import React, {useState} from 'react';
import {Svg} from "../../assets/svgs";
import {Tasks} from '../../assets/images';
import {useNavigate} from "react-router-dom";
import {IFormSignIn} from "../../types/interfaces";
import {SubmitHandler, useForm} from "react-hook-form";
import {Box, Flex, Spacer, Image} from '@chakra-ui/react';
import {Form, Header, Input, Text} from '../../components';
import {emailRegExp, passwordRegExp} from "../../helpers/validation";
import {colorMode, colorMode as colorModeEnum, svgNames} from "../../types/enums";

import {useDispatch, useSelector} from "react-redux";
import {userLogin} from "../../store/slices/userSlice";

function SignIn() {

    const dispatch = useDispatch();
    const navigation = useNavigate();
    const [passwordType, setPasswordType] = useState('password');
    const {userLoginError, userLoginLoad} = useSelector((state) => state.user);
    const {register, handleSubmit, formState: {errors},} = useForm<IFormSignIn | undefined | null>(
        {
            mode: 'onChange'
        });
    const onSubmit: SubmitHandler<IFormSignIn | undefined> = (data) => {
        dispatch(userLogin(data))
    };

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
                        title='SignIn'
                        submit={() => handleSubmit(onSubmit)}
                        load={userLoginLoad}
                        btnTitle='SignIn'
                        errors={errors}
                        errorRequest={userLoginError}
                        inputs={
                            [<Input
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
                        onClick={() => navigation('/signup')}
                        marginY={'10px'}
                        color='teal'
                        cursor='pointer'
                        _hover={{color: "gray"}}>
                        SignUpPage
                    </Text>
                    </Form>
                </Flex>
            </Flex>
        </Box>
    );
}

export {SignIn};
