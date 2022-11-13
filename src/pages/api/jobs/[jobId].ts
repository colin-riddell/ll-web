
import { NextApiRequest, NextApiResponse } from "next"
import nc from 'next-connect';
import { getSession } from "@auth0/nextjs-auth0";
import { getJobByJobId } from '../../../lib/mongodb'
const getJob = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const jobId = query.jobId;

  const session = getSession(req, res);
  const user = session?.user;
  // TODO: check the session but don't use it (security)
  const response =  await getJobByJobId(jobId);

  return res.status(200).json(response);
}


const handler = nc({ attachParams: true })
  .get(getJob)

export default handler;
