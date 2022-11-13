import {connectToMongo} from '../lib/db'
import { Job } from './types/jobSchema';
import {ObjectId} from 'mongodb';

// for the dynamo-db version: https://gist.github.com/colin-riddell/bfe25872a3ae9dcf2b9d78fc817a90af

export const dbRegisterInterest = async(registerInterestRequest) =>{
    const db = await connectToMongo();
    const interestCollection = db.collection("interest");
    const result = await interestCollection.insertOne({...registerInterestRequest})
  
}

export const createCustomer = async (userId, stripeCustomerId) => {
    const docToInsert = {
        // _id: mongojs.ObjectId(userId),
        userId: userId,
        stripeCustomerId: stripeCustomerId
    }

    const db = await connectToMongo();
    const customersCollection = db.collection("customers");
    const filter = { userId: userId }
    const options = { upsert: true, returnOriginal : true }
    const updateDoc = {"$setOnInsert": docToInsert}
    const result = await customersCollection.updateOne(filter, updateDoc, options)
    let found;
    if (result.result?.upserted[0]){
        const idToFind = result.result?.upserted[0]?._id;
        found = await customersCollection.findOne({_id: idToFind})
    }
    
    return found;
   
  
  }

  export const dbCreateJob = async (userId, job:Job) => {
    const docToInsert = {
        CustomerId: userId,
        ...job
    }
   
    const db = await connectToMongo();
    const jobsCollection = db.collection("jobs");
    const result = await jobsCollection.insertOne(docToInsert)
    let inserted;
    if (result.result?.inserted[0]){
        const idToFind = result.result?.inserted[0]?._id;
        inserted = await jobsCollection.findOne({_id: idToFind})
    }
    return inserted;

  
  }

  export const getCustomerById = async (id) => {

    const db = await connectToMongo();
    const customersCollection = db.collection("customers");
    const found = await customersCollection.findOne({userId: id})

    return found;

  }


  export const getAllJobs = async () => {
    const db = await connectToMongo();
    const jobsCollection = db.collection("jobs");

    const query = {}
    const options = {}

    const result  = await jobsCollection.find(query, options).toArray();
    const parsedObj = JSON.parse(JSON.stringify(result))
    return parsedObj;

  }

  export const getJobByJobId = async (jobId) => {

    const db = await connectToMongo();
    const jobsCollection = db.collection("jobs");

    const query = {_id: new ObjectId(jobId)}
    const options = {}

    const result  = await jobsCollection.findOne(query, options);
    const parsedObj = JSON.parse(JSON.stringify(result))
    return parsedObj;

  }

  export const dbGetJobsForUser = async (id) => {
    const db = await connectToMongo();
    const jobsCollection = db.collection("jobs");

    const query = {customer_id: id}
    const options = {}

    const result  = await jobsCollection.find(query, options).toArray();
    const parsedObj = JSON.parse(JSON.stringify(result))
    return parsedObj;
  
 
  }


  export const incrementJobViewCount = async (jobId) =>{
    const db = await connectToMongo();
    const jobsCollection = db.collection("jobs");
    const filter = { id: jobId }
    const options = { $inc: { viewCount: 1} }
    
    const result = await jobsCollection.updateOne(filter, options)
    
  }

  export const updateCustomerAddSubscriptionId = async (subscriptionId, id) => {
    const db = await connectToMongo();
    const customersCollection = db.collection("customers");
    const filter = { userId: id }
    const options = { upsert: true, returnOriginal : true }
    const updateDoc = {"$set": {stripeSubscriptionId: subscriptionId}}

    const result = await customersCollection.updateOne(filter, updateDoc, options)

    let found;
    if (result.result?.upserted[0]){
        const idToFind = result.result?.upserted[0]?._id;
        found = await customersCollection.findOne({_id: idToFind})
    }
    return found;
}