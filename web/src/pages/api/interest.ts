import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { dbRegisterInterest } from '../../lib/mongodb';



const registerInterest = async (req: NextApiRequest, res: NextApiResponse) => {
    const registerInterestRequest = JSON.parse(req.body);
    const result = await dbRegisterInterest(registerInterestRequest);
    return res.status(200).json({}); 
};



const handler = nc({ attachParams: true })
    .post(registerInterest);

export default handler;