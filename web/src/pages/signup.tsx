import {
    AlertIcon,
    Heading,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Textarea,
    Text,
    InputLeftElement,
    InputGroup,
    InputRightElement,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    InputLeftAddon,
    Stack,
    HStack,
    Select,
    Divider,
    Center,
    Box,
    useBreakpointValue,
    Container,
    useColorModeValue,
    Alert,
    AlertDescription,
    AlertTitle,
    Link,
} from '@chakra-ui/react'
import { CheckIcon } from "@chakra-ui/icons";
import { Field, Form, Formik } from "formik";

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const validateFirstName = (value) => {
    let error = "";
    if (!value) {
        error = 'First Name is required'
    }
    return error
}

const validateLastName = (value) => {
    let error = "";
    if (!value) {
        error = 'Last Name is required'
    }
    return error
}

const validateOrganisation = (value) => {
    let error = "";
    if (!value) {
        error = 'Organisation name is required'
    }
    return error
}

const validateEmail = (value) => {
    let error = "";
    if (!value) {
        error = "Email Address is required";
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = "Invalid email address";
    }
    return error;
}


const validatePassword = (value) => {
    let error = "";
    if (!value) {
        error = "Password is required";
    }

    let regexForLowerLetter = /[a-z]/;
    let regexForUpperLetter = /[A-Z]/;
    let regexForNumber = /\d/;
    let regexForSpecialCharacter = /[-+_!@#$%^&*.,?{}()\[\]]/

    if (!regexForLowerLetter.test(value)) {
        error = "Must contain lower case letter"
    }
    if (!regexForUpperLetter.test(value)) {
        error = "Must contain upper case letter"
    }
    if (!regexForNumber.test(value)) {
        error = "Must contain number"
    }
    if (!regexForSpecialCharacter.test(value)) {
        error = "Must contain a special character"
    }
    return error;
}


const Signup = () => {
    const router = useRouter()
    const { role, postLogin } = router.query
    const signupRole = role ? role : "jobseeker";
    const [signupError, setSignupError] = useState(null);


    const register = (values, redir, setSubmitting) => {
        setSubmitting(true)
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(res => {
            if (!res.ok) throw res
            setSubmitting(false)
            router.push(`/confirm?email=${encodeURIComponent(values.email)}&redir=${redir}`,
            )
        }).catch(err => {
            err.json().then(error => {
                setSignupError(error);
                setSubmitting(false)
            })
        })

    }



    const renderOrgField = () => {
        if (signupRole === "recruiter") {
            return (
                <Field name='organisation' validate={validateOrganisation}>
                    {({ field, form }) => (
                        <FormControl isInvalid={form.errors.organisation && form.touched.organisation}>
                            <FormLabel htmlFor='organisation'>Organisation</FormLabel>
                            <InputGroup>
                                <Input {...field} id='organisation' placeholder='Organisation' />
                                {!form.errors.organisation && form.touched.organisation && (<InputRightElement children={<CheckIcon color='green.500' />} />)}
                            </InputGroup>

                            <FormErrorMessage>{form.errors.organisation}</FormErrorMessage>
                        </FormControl>
                    )}
                </Field>
            )
        }
    }

    const renderSignupMessage = () => {
        if (signupRole === "recruiter") {
            return "Signup to advertise job roles"
        }
        return "Join The Coder Career Community"
    }

    const FormSubmitErrors = () => {
        if (signupError) {
            return (
                <>
                    <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>Something's not right..</AlertTitle>
                        <AlertDescription>Have you maybe already registered?</AlertDescription>
                    </Alert>
                </>
            )
        }
        return null;
    }

    return (
        <Container>
            <Stack spacing="6" pt={10}>
                {/* <Logo /> */}
                <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                    <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
                        {renderSignupMessage()}
                    </Heading>
                    <HStack spacing="1" justify="center">
                        <Text color="muted">Have an account?</Text>
                        <Button variant="link" onClick={() => { signIn("cognito", { callbackUrl: postLogin }) }}>
                            Sign In
                        </Button>
                    </HStack>
                </Stack>
            </Stack>
            <Container maxW="lg" py={{ base: '8', md: '12' }} px={{ base: '0', sm: '8' }}>
                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
                    boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                >
                    <Formik
                        enableReinitialize={true}
                        initialValues={{ role: signupRole }}
                        onSubmit={(values, { setSubmitting }) => { register(values, postLogin, setSubmitting) }}
                    >
                        {(props) => (
                            <Form>
                                <Stack>
                                    <Field name='firstName' validate={validateFirstName}>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
                                                <FormLabel htmlFor='lastName'>First Name</FormLabel>
                                                <InputGroup>
                                                    <Input {...field} id='firstName' placeholder='First Name' />
                                                    {!form.errors.firstName && form.touched.firstName && (<InputRightElement children={<CheckIcon color='green.500' />} />)}
                                                </InputGroup>

                                                <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                                            </FormControl>

                                        )}
                                    </Field>

                                    <Field name='lastName' validate={validateLastName}>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                                                <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                                                <InputGroup>
                                                    <Input {...field} id='lastName' placeholder='Last Name' />
                                                    {!form.errors.lastName && form.touched.lastName && (<InputRightElement children={<CheckIcon color='green.500' />} />)}
                                                </InputGroup>

                                                <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    {renderOrgField()}

                                    <Field name='email' validate={validateEmail}>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.email && form.touched.email}>
                                                <FormLabel htmlFor='email'>Email</FormLabel>
                                                <InputGroup>
                                                    <Input {...field} type='email' id='email' placeholder='me@email.com' />
                                                    {!form.errors.email && form.touched.email && (<InputRightElement children={<CheckIcon color='green.500' />} />)}
                                                </InputGroup>

                                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Field name='password' validate={validatePassword}>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.password}>
                                                <FormLabel htmlFor='password'>Password</FormLabel>
                                                <InputGroup>
                                                    <Input {...field} type='password' id='password' placeholder='' />
                                                    {!form.errors.password && form.touched.password && (<InputRightElement children={<CheckIcon color='green.500' />} />)}
                                                </InputGroup>

                                                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Button
                                        mt={4}
                                        backgroundColor='green.200' color='gray.600'
                                        isLoading={props.isSubmitting}
                                        disabled={Object.keys(props.errors).length !== 0}
                                        type='submit'
                                    >
                                        Submit
                                    </Button>

                                    {Object.keys(props.errors).map((error) => {
                                        return (<li>{error} required</li>)
                                    })}
                                    <FormSubmitErrors />
                                </Stack>
                            </Form>
                        )}

                    </Formik>
                </Box>
            </Container>
        </Container>
    )

}

export default Signup;