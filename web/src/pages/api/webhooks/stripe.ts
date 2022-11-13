import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });
import { buffer } from "micro";
import getRawBody from 'raw-body';


const handleStripeWebhook = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const buf = await getRawBody(req);
        const sig = req.headers["stripe-signature"];

        const webhookSecret = "whsec_70897d950e6ca63e716353285f9b0280927b8969c17435d7465d203d52290db8"
        let event;
        try {
            event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
        } catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        console.log(`Stripe Webhook triggered: ${event.type}`)

        switch (event.type) {
            case 'customer.subscription.created': {
                const subscription = event.data.object;
                console.log('sub created')
                // You can use this to detect changes in the subscription
                // subscription.status will return the current status of the subscription
                //
                // Things you can do here:
                // 1. Send a thank you email to the user
                // 2. Send content you've created that would enhance the user's experience/workflow
                break;
            }

            case 'customer.subscription.deleted':
            case 'customer.subscription.updated': {
                const subscription = event.data.object;
                console.log("sub updated/deleted")
                // You can use this to detect changes in the subscription
                // subscription.status will return the current status of the subscription
                //
                // Things you can do here:
                // 1. Send an email to the user notifying them about the change in subscription status
                // 2. If the user cancelled the subscription you could trigger
                // a email campaign to inform users of the beneits they're missing out on.
                break;
            }

            case 'invoice.paid': {
                const invoice = event.data.object;
                console.log("invoice paid")
                // If you have trials, this event is triggered when the trial ended and the user was charged for continued access
                // Things you can do:
                // 1. Notify the user of the charge
                // 2. Thank them for their continued belief in your product
                // 3. Send additional content that could enable better workflows for the user
                break;
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object;
                console.log("invoice pay failed")
                // The payment fails or the user does not have a valid payment method
                // The subscription is now past due
                // You can notify the user that the payment has failed
                // and ask them to use different payment methods
                // or revoke their access
                break;
            }

            default: {
                console.error(`Unhandled event type: ${event.type}`);
                break;
            }
        }

        res.status(200).send({ received: true })
    }
};

export const config = {
    api: {
      bodyParser: false,
    },
  };

const handler = nc({ attachParams: true }).post(handleStripeWebhook);

export default handler;