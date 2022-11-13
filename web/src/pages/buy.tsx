import { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {  Spinner } from '@chakra-ui/react';

import CheckoutForm from "../components/CheckoutForm";
import { useAppSelector } from '../app/hooks';
import { createStripeCustomerAsync, selectPriceChoice, selectStripeCustomer } from '../features/stripe/stripeSlice';
import { useDispatch } from 'react-redux';


const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const PricingPage = ({user}): JSX.Element => {
    const dispatch = useDispatch();
    const customer = useAppSelector(selectStripeCustomer)
    const chosenPriceId = useAppSelector(selectPriceChoice)
    
    useEffect(async ()=>{
        console.log("calling createStripeCustomerAsync with email and given_name", user.email, user.given_name)
        await dispatch(createStripeCustomerAsync({ email: user.email, name: user.given_name })).unwrap()
    }, []);
   
    const elementsOptions = {
        fonts: [
            {
              cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
            },
          ],
    }
    return (
        <>
            <Elements stripe={stripePromise} options={elementsOptions} >
            {
                customer ?
                    <CheckoutForm customerId={customer.id} priceId={chosenPriceId} /> :
                    <Spinner />
            }
            </Elements>
        </>
    )
}

PricingPage.auth = { roles: ["recruiter"], error: () => (<h2>Nope</h2>) }

export default PricingPage;