import { NextApiRequest, NextApiResponse } from "next"
import nc from 'next-connect';
import { getAllJobs } from "../../../../lib/mongodb";

const getAllJobsTemp = async (req: NextApiRequest, res: NextApiResponse) => {
  const jobs =  await getAllJobs();
  return res.status(200).json(jobs);
}



const handler = nc({ attachParams: true })
  .get(getAllJobsTemp) // TODO: move this to pub API

  export default handler;
