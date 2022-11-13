import React, { useState } from "react";

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

const RegisterInterest = ({}) => {
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
        {/* <Heading as="h2" noOfLines={1}>
          The Coder Career is a technology careers network
        </Heading> */}

        <article className="prose lg:prose-xl">
          <br />
          <p>
            The Coder Career is a technology careers network for people of all
            backgrounds and experience levels. We help members get a head start
            on their career in tech, level up their existing career and stand
            out in leadership roles.
          </p>

          <p>
            <b>
              <em>
                Our philosophy is that the beginners of today will become the
                expert professional technologists of tomorrow.
              </em>
            </b>
            <p>
              As a result, we need to keep engaging with people from those
              thinking about changing their career, to those who've just
              graduated from a bootcamp or university. We reach them via social
              platforms like TikTok, Instagram, Twitter and YouTube.
            </p>
          </p>

          <p>
            TCC also has a thriving podcast available on all major podcast
            applications, with up to 500 listeners/week. Find out more here.
          </p>
        </article>

        <div className="py-16">
          <Text>
            Want to join our free Discord community and keep updated ahead of
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

export default RegisterInterest;
