import { useState } from 'react';
import { Container, Stack, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons'
import { CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe, StripeCardElementOptions } from '@stripe/stripe-js';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { creteStripeSubscriptionAsync, selectStripeSubscription } from '../features/stripe/stripeSlice';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';


interface CheckoutFormProps {
    customerId: string;
    priceId: string;
}

const CheckoutForm = (props: CheckoutFormProps): JSX.Element => {
    const [error, setError] = useState(undefined);
    const [disabled, setDisabled] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const subscription = useAppSelector(selectStripeSubscription);
    const router = useRouter();


    function handleCardInputChange(event) {
        // Listen for changes in card input
        // and display errors, if any, to the user
        // Also control the disabled state of the submit button
        // if the input field is empty
        setDisabled(event?.empty);
        setError(event?.error?.message ?? '');
    }

    async function handleCheckoutFormSubmit(event) {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet.
            return;
        }

        dispatch(creteStripeSubscriptionAsync({ customerId: props.customerId, priceId: props.priceId })).unwrap()
            .then(async (subscription) => {
                const payResponse = await stripe.confirmCardPayment(
                    subscription.clientSecret, // returned by subscribe endpoint
                    {
                        payment_method: {
                            card: elements.getElement(CardNumberElement)
                        }
                    }
                )

                if (payResponse.error) {
                    setError(payResponse.error.message);
                } else {
                    router.push("/hiring-dashboard?newSub=true")    
                }
            })
    }

    const cardElementOptions: StripeCardElementOptions =
    {
        iconStyle: 'solid',
        hideIcon: false,
        style: {
            base: {
                iconColor: '#c4f0ff',
                color: '#00ff',
                fontWeight: 500,
                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                fontSize: '16px',
                fontSmoothing: 'antialiased',

                ':-webkit-autofill': {
                    color: '#fce883',
                },
                '::placeholder': {
                    color: '#87BBFD',
                },
            },
            invalid: {
                iconColor: '#FFC7EE',
                color: '#ff0000',
            },
        },
    }


    return (
        <Container>
            <div className='py-16'>
                <form onSubmit={handleCheckoutFormSubmit}>
                    <Stack spacing={3}>
                        <div className='p-6 h-12 mt-2 rounded-md border-2'>
                            <input type={"text"} />
                        </div>
                        <InputGroup>

                            <InputLeftElement
                                pointerEvents='none'
                                children={
                                    <div className='align-middle'>
                                        <Icon viewBox='0 0 30 29' color='red.300'>
                                            <path
                                                fill='currentColor'
                                                d='M26.58 21H2.42A2.4 2.4 0 0 1 0 18.62V4.38A2.4 2.4 0 0 1 2.42 2h24.16A2.4 2.4 0 0 1 29 4.38v14.25A2.4 2.4 0 0 1 26.58 21zM10 7.83c0-.46-.35-.83-.78-.83H3.78c-.43 0-.78.37-.78.83v3.34c0 .46.35.83.78.83h5.44c.43 0 .78-.37.78-.83V7.83zM25 17c.65 0 1-.3 1-1s-.35-1-1-1h-3c-.65 0-1 .3-1 1s.35 1 1 1h3zm-6 0c.65 0 1-.3 1-1s-.35-1-1-1h-3c-.65 0-1 .3-1 1s.35 1 1 1h3zm-6 0c.65 0 1-.3 1-1s-.35-1-1-1h-3c-.65 0-1 .3-1 1s.35 1 1 1h3zm-6 0c.65 0 1-.3 1-1s-.35-1-1-1H4c-.65 0-1 .3-1 1s.35 1 1 1h3z'
                                            />
                                        </Icon>
                                    </div>
                                }
                            />
                            <div className='h-12 w-screen rounded-md border-2'>
                                <div className='pl-12 text-slate-500'>
                                    Card Number
                                    <CardNumberElement onChange={handleCardInputChange} options={cardElementOptions} />
                                </div>
                            </div>
                        </InputGroup>


                        <div className='flex'>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={
                                        <div className='align-middle'>
                                            <Icon viewBox='0 0 30 29' color='red.300'>
                                                <path
                                                    fill='currentColor'
                                                    d='M26.58 21H2.42A2.4 2.4 0 0 1 0 18.62V4.38A2.4 2.4 0 0 1 2.42 2h24.16A2.4 2.4 0 0 1 29 4.38v14.25A2.4 2.4 0 0 1 26.58 21zM10 7.83c0-.46-.35-.83-.78-.83H3.78c-.43 0-.78.37-.78.83v3.34c0 .46.35.83.78.83h5.44c.43 0 .78-.37.78-.83V7.83zM25 17c.65 0 1-.3 1-1s-.35-1-1-1h-3c-.65 0-1 .3-1 1s.35 1 1 1h3zm-6 0c.65 0 1-.3 1-1s-.35-1-1-1h-3c-.65 0-1 .3-1 1s.35 1 1 1h3zm-6 0c.65 0 1-.3 1-1s-.35-1-1-1h-3c-.65 0-1 .3-1 1s.35 1 1 1h3zm-6 0c.65 0 1-.3 1-1s-.35-1-1-1H4c-.65 0-1 .3-1 1s.35 1 1 1h3z'
                                                />
                                            </Icon>
                                        </div>
                                    }
                                />
                                <div className='flex-1 w-12 mr-1 h-12 rounded-md border-2 pl-12 text-slate-500'>
                                    Expirey
                                    <CardExpiryElement />
                                </div>

                                <div className='flex-1  ml-1 h-12 w-2/5 rounded-md border-2'>
                                    <CardCvcElement />
                                </div>
                            </InputGroup>

                        </div>

                        <button
                            disabled={!stripe && disabled}
                            type='submit'
                            className='main-cta-filled'
                        >
                            Pay Now
                        </button>
                    </Stack>
                </form>
            </div>
        </Container>
    );
}

export default CheckoutForm;