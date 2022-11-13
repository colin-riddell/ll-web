
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"
import nc from 'next-connect';

import { incrementJobViewCount } from "../../../../lib/mongodb";

const registerJobView = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query } = req;
    const jobId = query.jobId;


    incrementJobViewCount(jobId)
        .then()
        .catch(e =>console.error(e))

    return res.status(200);
}
  
  
  
const handler = nc({ attachParams: true })
    .post(registerJobView)
  
export default handler;
  