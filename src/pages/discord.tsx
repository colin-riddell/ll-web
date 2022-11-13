import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote";

import {
  Heading,
  Text,
  Container,
  Stack,
  InputGroup,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  InputRightElement,
  Checkbox,
  Center,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { Field, Form, Formik } from "formik";
import Link from "next/link";

const validateEmail = (value) => {
  let error = "";
  if (!value) {
    error = "Email Address is required";
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }

  return error;
};

const validateName = (value) => {
  let error = "";
  if (!value) {
    error = "Name is required";
  }

  return error;
};

const Discord = ({}) => {
  const onSubmit = async (data) => {
    await fetch("/api/interest", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => setDetailsSubmitted(true))
      .then(() => window.open("https://discord.gg/fHdBTrXjVx", "_blank"));
  };
  const [detailsSubmitted, setDetailsSubmitted] = useState(false);

  return (
    <div>
      <Container mt={10}>
        <Heading as="h2" noOfLines={1}>
          Join The Discord!
        </Heading>

        <div className="py-16">
          <Text>
            Want to join our free Discord community, meet fellow industry professionals and keep updated ahead of
            our jobs platform launch?
          </Text>

          <Stack spacing={3}>
            <Formik
              initialValues={{ isJobseeker: false, isRecruiter: false }}
              onSubmit={(values, actions) => {
                onSubmit(values);
                // dispatch(createJobListingAsync(values))
                //   .then(() => actions.setSubmitting(false))
              }}
            >
              {(props) => (
                <Form>
                  <Stack>
                    <Field name="name" validate={validateName}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel htmlFor="name">Name</FormLabel>
                          <InputGroup>
                            <Input
                              {...field}
                              id="name"
                              placeholder="e.g. Grace Jones"
                            />
                            {!form.errors.name && form.touched.name && (
                              <InputRightElement
                                children={<CheckIcon color="green.500" />}
                              />
                            )}
                          </InputGroup>

                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="email" validate={validateEmail}>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                        >
                          <FormLabel htmlFor="email">Email Address</FormLabel>
                          <InputGroup>
                            <Input
                              {...field}
                              id="email"
                              placeholder="me@email.com"
                            />
                            {!form.errors.email && form.touched.email && (
                              <InputRightElement
                                children={<CheckIcon color="green.500" />}
                              />
                            )}
                          </InputGroup>

                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="isJobseeker">
                      {({ field, form }) => (
                        <>
                          <InputGroup>
                            <Checkbox {...field} id="isJobseeker">
                              I'm looking for jobs
                            </Checkbox>
                          </InputGroup>
                        </>
                      )}
                    </Field>

                    <Field name="isRecruiter">
                      {({ field, form }) => (
                        <>
                          <InputGroup>
                            <Checkbox {...field} id="isRecruiter">
                              I'm hiring
                            </Checkbox>
                          </InputGroup>
                        </>
                      )}
                    </Field>

                    <Button
                      mt={4}
                      backgroundColor="green.200"
                      color="gray.600"
                      disabled={Object.keys(props.errors).length !== 0}
                      type="submit"
                    >
                      Submit
                    </Button>

                    {Object.keys(props.errors).map((error) => {
                      return <li>{error} required</li>;
                    })}
                  </Stack>
                </Form>
              )}
            </Formik>

            {detailsSubmitted && (
              <div>Thanks for submitting! You'll hear from us soon...</div>
            )}
          </Stack>
        </div>
      </Container>

      <div></div>
    </div>
  );
};

export default Discord;
