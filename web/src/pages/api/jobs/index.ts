import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"
import nc from 'next-connect';
import { getSession } from "@auth0/nextjs-auth0";

import { dbGetJobsForUser } from "../../../lib/mongodb";
import { getCustomerById } from "../../../lib/mongodb";
import { dbCreateJob } from '../../../lib/mongodb'
import { Job } from "../../../lib/types/jobSchema";


const createJob = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);
  const user = session?.user;
  const response =  await dbCreateJob(user.sub, req.body as Job);
  return res.status(200).json(response);
}

const getJobsForUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession(req, res);
  const user = session?.user;
  const response =  await dbGetJobsForUser(user.sub);
  return res.status(200).json(response);
}


const handler = nc({ attachParams: true })
  .post(createJob)
  .get(getJobsForUser) // TODO: move this to pub API

  export default handler;
