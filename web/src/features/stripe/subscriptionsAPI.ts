const fetchCreateCustomer = async (createCustomerRequestBody) => {
    const customerResponse = await fetch(
        '/api/customer',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createCustomerRequestBody)
        }
    );
    const customer = await customerResponse.json();
    return customer.customer;
}

const fetchCreateSubscription = async (createSubscriptionRequestBody) => {
    const subscriptionResponse = await fetch(
        '/api/subscribe',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createSubscriptionRequestBody)
        }
    )
    const subscription = await subscriptionResponse.json();
    return subscription;
}

const fetchGetSubscription = async () => {
    const subscriptionResponse = await fetch(
        `/api/subscribe`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
    )
    const subscription = await subscriptionResponse.json();
    return subscription;
}

export {fetchCreateCustomer, fetchCreateSubscription, fetchGetSubscription}