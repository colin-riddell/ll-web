import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from "@auth0/nextjs-auth0";
import nc from 'next-connect';
import Stripe from 'stripe';
import {getCustomerById, createCustomer as dbCreateCustomer} from '../../lib/mongodb'

const getStripeCustomer = async (id: string) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });
        const foundStripeCustomer = await stripe.customers.retrieve(id);
        return foundStripeCustomer;
    } catch (e) {
        console.error(e);
    }
}

const getStripeCustomerReq = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = getSession(req, res);
    const user = session?.user;
    const foundCustomer = await getCustomerById(user.sub);


    const foundCustomerDetails = await getStripeCustomer(foundCustomer.stripeCustomerId);

    res.status(200).json({
        foundCustomerDetails
    });
}

const createCustomer = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = getSession(req, res);
    const user = session?.user;

    const foundCustomer = await getCustomerById(user.sub)


    // if they've a stripeCustomerId then get that customer object
    if (foundCustomer?.stripeCustomerId) {
        // from stripe and return it
        const foundStripeCustomer = await getStripeCustomer(foundCustomer.stripeCustomerId);
        return res.status(200).json({
            code: 'customer_created',
            customer: foundStripeCustomer,
        });
    }
    // if they don't then create a stripe customer, set the stripeCustomerId in db and return
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });
        const { email, name } = req.body;
        const customer = await stripe.customers.create({
            email,
            name,
        });

     
        dbCreateCustomer(user.sub, customer.id);
        


        return res.status(200).json({
            code: 'customer_created',
            customer,
        });
    } catch (e) {
        console.error(e);
        res.status(400).json({
            code: 'customer_creation_failed',
            error: e,
        });
    }
};


const handler = nc({ attachParams: true })
    .post(createCustomer)
    .get(getStripeCustomerReq);

export default handler;