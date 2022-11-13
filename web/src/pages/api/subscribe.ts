import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from "@auth0/nextjs-auth0";
import nc from 'next-connect';
import Stripe from 'stripe';
import { idText } from 'typescript';
import { getCustomerById, updateCustomerAddSubscriptionId } from '../../lib/mongodb';


const createSubscription = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = getSession(req, res);
    const user = session?.user;

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });
        const { customerId, priceId } = req.body;

        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            payment_behavior: 'default_incomplete',
            metadata: {
                // TODO: You can save details about user here to DB
            },
            expand: ['latest_invoice.payment_intent'],
        });

        
        const foundCustomer = await updateCustomerAddSubscriptionId(subscription.id, user.sub);


        // Send the subscription ID and a client secret that the
        // Stripe subscription API creates. The subscription ID
        // and client secret will be used to
        // complete the payment on the frontend later.
        res.status(200).json({
            code: 'subscription_created',
            subscriptionId: subscription.id,
            subscriptionObject: subscription,
            clientSecret:
                subscription.latest_invoice.payment_intent.client_secret,
        });
    } catch (e) {
        console.error(e);
        res.status(400).json({
            code: 'subscription_creation_failed',
            error: e,
        });
    }
};


const cancelSubscription = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });
        const { subscriptionId } = req.body;

        const deletedSubscription = await stripe.subscriptions.del(
            subscriptionId
        );

        // TODO: remove subscription from DB?

        res.status(200).json({
            code: 'subscription_deleted',
            deletedSubscription,
        });
    } catch (e) {
        console.error(e);
        res.status(400).json({
            code: 'subscription_deletion_failed',
            error: e,
        });
    }
};

const getSubscription = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = getSession(req, res);
    const user = session?.user;
    // lookup customer in db by their tcc customer id
    const foundCustomer = await getCustomerById(user.sub)

    if (foundCustomer.stripeSubscriptionId === undefined) {
        return res.status(400).json({
            code: 'no_subscription_against_user',
        });
    }

    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

        const subscription = await stripe.subscriptions.retrieve(foundCustomer.stripeSubscriptionId)

        res.status(200).json({
            code: 'subscription_retrieved',
            subscriptionId: subscription.id,
            subscriptionObject: subscription,

        });
    } catch (e) {
        console.error(e);
        res.status(400).json({
            code: 'subscription_get_failed',
            error: e,
        });
    }
};

const handler = nc({ attachParams: true })
    .post(createSubscription)
    .delete(cancelSubscription)
    .get(getSubscription);

export default handler;