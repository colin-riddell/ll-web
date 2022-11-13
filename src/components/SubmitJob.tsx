
import { useDispatch, useSelector } from "react-redux";
import {
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
    Select,
    Divider,
    Center,
    Box,
    Avatar,
    Tooltip
} from '@chakra-ui/react'
import { Field, Form, Formik } from "formik";

import { createJobListingAsync } from "../features/jobs/jobsSlice";
import { CheckIcon, PhoneIcon } from "@chakra-ui/icons";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { useState } from "react";
import MarkdownEditor from "./submit-job/MarkdownEditor";
import { useUser } from '@auth0/nextjs-auth0';


/*
{ use Job
    companyName: "Amazon",
    title: "Frontend Developer",
    minSalary: 30000,
    maxSalary: 55000,
    description:
    "We are looking for talented computer scientists/software engineers to support the development of a suite of GUI-based interactive tools at blah blah. This software is crucial in the design and analysis of state-of-the-art semiconductor devices by companies and academic institutions worldwide.",
    location: "Remote, UK",
    companyId: 1234,
    dateAdded: "27th March 2022",
    yearsExp: 0,
    logoUrl: "https://avatars.githubusercontent.com/u/38852603?v=4",
    techTags: ["js", "Java", "k8s"]
},
*/

const validateJobTitle = (value) => {
    let error = "";
    if (!value) {
        error = 'Job Title is required'
    }
    if (value?.length < 5) {
        error = 'Try to give a better job title'
    }
    return error
}

const validateMinSalary = (value) => {
    let error = "";
    if (!value) {
        error = 'Min Salary is required'
    }
    if (value < 15000) {
        error = "Salary can't be < 15k, cmon now..."
    }
    return error;
}

const validateMaxSalary = (value) => {
    let error = "";
    if (!value) {
        error = 'Max Salary is required'
    }
    return error;
}

const validateLocation = (value) => {
    let error = "";
    if (value === undefined) {
        error = "Must chose a location."
    }

    return error;
}

const validateYearsExp = (value)=> {
    let error = "";

    if (value === undefined){
        error = "Must add experience level for the role."
    }
    return error;
}

const validateLogoUrl = (value)=> {
    let error = "";
    if (!/((?:(?:http?|ftp)[s]*:\/\/)?[a-z0-9-%\/\&=?\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?)/gi.test(value)) {
        error = "Invalid logo url";
    }
    return error;
}


const validateTechTags = (value) => {
    let error = "";
    if (!value) {
        error = "Please add tech skills."
    }
    if (value?.length > 5){
        error = "Steady on.. is this a senior role? Consider removing some tech tags";
    }

    return error;

}

const locations = [
    { value: "remote-uk", label: "UK, Remote" },
    { value: "london", label: "London" },
    { value: "Edinburgh", label: "Edinburgh" },
    { value: "glasgow", label: "Glasgow" },
    { value: "manchester", label: "Manchester" },
    { value: "birmingham", label: "Birmingham" },
    { value: "newcastle", label: "Newcastle" },
    { value: "liverpool", label: "Liverpool" },
    { value: "cambridge", label: "Cambridge" },
    { value: "oxford", label: "Oxford" },
    { value: "aberdeen", label: "Aberdeen" }

];

const techTags = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "react", label: "React" },
    { value: "redux", label: "Redux" },
    { value: "vue", label: "vue" },
    { value: "react-native", label: "React Native" },
    { value: "swift", label: "Swift" },
    { value: "java", label: "Java" },
    { value: "python", label: "Python" },
    { value: "scala", label: "Scala" },
    { value: "php", label: "PHP" },
    { value: "laravel", label: "Laravel" },
    { value: "spring-boot", label: "Spring Boot" },
    { value: "k8s", label: "Kubernetes" },
    { value: "terraform", label: "Terraform" },
    { value: "aws", label: "AWS" },
    { value: "azure", label: "Azure" },
    { value: "gcp", label: "GCP" },
  ];

interface TechTag {
    label: string;
    value: string;
}

const SubmitJob = () => {
    const dispatch = useDispatch();
    const { user } = useUser();
    const companyName = user.company_name;


    const [pickerItems, setPickerItems] = useState(techTags);
    const [selectedTechTags, setSelectedTechTags] = useState([]);

    const handleCreateItem = (item) => {
        setPickerItems((curr) => [...curr, item]);
        setSelectedTechTags((curr) => [...curr, item]);
    };

    const handleSelectedItemsChange = (selectedItems, form) => {
        if (selectedItems) {
            setSelectedTechTags(selectedItems);
            form.values.techTags = selectedItems.map((tag)=>tag.value)
        }
    };

    const previewLogo = (ready: boolean, iconUrl: string) => {
        // if it's ready
        // debounce or wait a second
        console.log(iconUrl)
        if(ready){
            return (
                <Avatar size='lg' src={iconUrl} />
            )
        }
        return null;     
    }

  

    return (
        <>
            <Heading > Create Job Listing</Heading>
            <p color='gray.600'>Tell us all the details of the role ..</p>

            <Formik
                initialValues={{ companyName: companyName }}
                onSubmit={(values, actions) => {
                    dispatch(createJobListingAsync(values))
                        .then(() => actions.setSubmitting(false))

                }}
            >
                {(props) => (
                    <Form>
                        <Stack>
                        <Stack direction='row' spacing={30} align='center'>

                            <Field name='title' validate={validateJobTitle}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.title && form.touched.title}>
                                        <FormLabel htmlFor='title'>Job title</FormLabel>
                                        <InputGroup>
                                            <Input {...field} id='title' placeholder='Job Title' />
                                            {!form.errors.title && form.touched.title && (<InputRightElement children={<CheckIcon color='green.500' />} />)}
                                        </InputGroup>

                                        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                                    </FormControl>
                                    
                                )}
                            </Field>

                            <Field disabled={true} name='companyName'>
                                {({ field, form }) => (
                                    <FormControl  isInvalid={form.errors.companyName && form.touched.companyName}>
                                        <FormLabel htmlFor='companyName'>Company / Organisation</FormLabel>
                                        <Tooltip hasArrow label='Your company name is already set.' shouldWrapChildren mt='3'>

                                        <InputGroup>

                                            <Input {...field} id='companyName' disabled={true} placeholder={companyName} />
                                            {!form.errors.companyName && form.touched.companyName && (<InputRightElement children={<CheckIcon color='green.500' />} />)}
                                        </InputGroup>
                                        </Tooltip>


                                        <FormErrorMessage>{form.errors.companyName}</FormErrorMessage>
                                    </FormControl>
                                    
                                )}
                            </Field>
                            </Stack>

                            <Field name='description' validate={() => { }} >
                                {({ field, form }) => {

                                function handleEditorChange({ html, text }) {
                                    console.log(form.values.description = text)
                                }
                                return (
                                    <FormControl isInvalid={form.errors.description && form.touched.description}>
                                        <FormLabel htmlFor='description'>Detailed job description</FormLabel>
                                       
                                        <MarkdownEditor handleEditorChange={handleEditorChange} />
                                       
                                        <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                                    </FormControl>
                                )}}
                            </Field>

                            <Field name='logoUrl' validate={validateLogoUrl}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.logoUrl && form.touched.logoUrl}>
                                        <FormLabel htmlFor='logoUrl'>Logo Url</FormLabel>
                                        We reccomend a link to a logo image that's square.
                                        <InputGroup>
                                            <Input {...field} id='logoUrl' placeholder='Logo URL' />
                                            {!form.errors.logoUrl && form.touched.logoUrl && (<InputRightElement children={<CheckIcon color='green.500' />} />)}
                                        </InputGroup>
                                        {previewLogo(!form.errors.logoUrl && form.touched.logoUrl, field.value)}
                                        <FormErrorMessage>{form.errors.logoUrl}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Heading pt={9}>Compensation</Heading>
                            <Stack direction='row' spacing={30} align='center'>

                                <Field name='minSalary' validate={validateMinSalary}>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.minSalary && form.touched.minSalary}>
                                            <FormLabel htmlFor='minSalary'>Min Salary</FormLabel>
                                            <InputGroup>
                                                <InputLeftAddon children='£' />
                                                <Input {...field} id='minSalary' placeholder='30000' />
                                                {!form.errors.minSalary && form.touched.minSalary && (<InputRightElement children={<CheckIcon color='green.500' />} />)}

                                            </InputGroup>
                                            <FormErrorMessage>{form.errors.minSalary}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name='maxSalary' validate={validateMaxSalary}>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.maxSalary && form.touched.maxSalary}>
                                            <FormLabel htmlFor='maxSalary'>Max Salary</FormLabel>
                                            <InputGroup>
                                                <InputLeftAddon children='£' />
                                                <Input {...field} id='maxSalary' placeholder='50000' />
                                                {!form.errors.maxSalary && form.touched.maxSalary && (<InputRightElement children={<CheckIcon color='green.500' />} />)}

                                            </InputGroup>
                                            <FormErrorMessage>{form.errors.maxSalary}</FormErrorMessage>
                                        </FormControl>

                                    )}
                                </Field>
                            </Stack>
                            
                            <Heading pt={9}>Arrangement</Heading>


                            <Field name='location' validate={validateLocation}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.location && form.touched.location}>
                                        <FormLabel htmlFor='location'>Location</FormLabel>
                                        <InputGroup>
                                            <InputLeftAddon children='🌍' />
                                            <Select {...field} required id="location" placeholder='Select Location..'>
                                                {locations.map((location) => {
                                                    return (<option value={location.value}>{location.label}</option>)
                                                })}
                                            </Select>
                                        </InputGroup>
                                        {!form.errors.location && form.touched.location && (<InputRightElement children={<CheckIcon color='green.500' />} />)}

                                        <FormErrorMessage>{form.errors.location}</FormErrorMessage>
                                    </FormControl>

                                )}
                            </Field>

                            <Stack direction='row' spacing={30} align='center'>

            {/* NOTE: this techTags section uses chakra-ui-autocomplete - 
                which doesn't handle Formik validation yet */}
                                <Field name='techTags' validate={validateTechTags}>
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.techTags}>
                                            {/* <FormLabel htmlFor='techTags'>What tech?</FormLabel> */}

                                            <InputGroup>
                                                <CUIAutoComplete
                                                    {...field}
                                                    id='techTags'
                                                    label="What tech?"
                                                    placeholder="Choose.."
                                                    onCreateItem={handleCreateItem}
                                                    items={pickerItems}
                                                    selectedItems={selectedTechTags}
                                                    onSelectedItemsChange={(changes) =>
                                                        handleSelectedItemsChange(changes.selectedItems, form)
                                                    }
                                                />
                                                {/* {!form.errors.techTags  && (<InputRightElement children={<CheckIcon color='green.500' />} />)} */}

                                            </InputGroup>
                                            <FormErrorMessage>{form.errors.techTags}</FormErrorMessage>
                                        </FormControl>

                                    )}
                                </Field>

                                <Field name='yearsExp' validate={validateYearsExp}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.yearsExp && form.touched.yearsExp}>
                                        <FormLabel htmlFor='yearsExp'>Experience Level</FormLabel>
                                        <InputGroup>
                                            <InputLeftAddon children='🐥' />
                                            <Select {...field}  required id="yearsExp" placeholder='Select years..'>
                                                {[0,1,2,3].map((year) => {
                                                    return (<option key={year} value={year}>{`${year} year`}</option>)
                                                })}
                                            </Select>
                                        </InputGroup>
                                        {!form.errors.yearsExp && form.touched.yearsExp && (<InputRightElement children={<CheckIcon color='green.500' />} />)}

                                        <FormErrorMessage>{form.errors.yearsExp}</FormErrorMessage>
                                    </FormControl>

                                )}
                            </Field>
                                
                                </Stack>

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
                        </Stack>
                    </Form>
                )}

            </Formik>
        </>
    )
}

export default SubmitJob;