const fetchCreateJobListing = async (createJobListingBody) => {
    const customerResponse = await fetch(
        '/api/jobs',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createJobListingBody)
        }
    );
    const job = await customerResponse.json();
    return job;
}


const fetchGetJobsForCustomer = async () => {
    const customerResponse = await fetch(
        '/api/jobs',
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
    );
    const job = await customerResponse.json();
    return job;
}

export {fetchCreateJobListing, fetchGetJobsForCustomer}