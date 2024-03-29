import rateLimitMiddleware from '@/utils/midelware';
import { delay, random } from 'lodash';
import type { NextApiRequest, NextApiResponse } from "next";

interface ResponseData {
  index?: string;
  error?: string
}

function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    const data = JSON.parse(req.body)
    delay(() => {
      res.status(200).json({ index: data.index })
    }, random(1, 1000))
  }
}

export default rateLimitMiddleware(handler)
