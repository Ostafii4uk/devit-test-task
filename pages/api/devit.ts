import { rateLimitMiddleware } from '@/utils/midelware'
import { delay, random } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { APPLICATION_CONSTANTS } from '@/constants/application.constants'
import { STATUS_CODES } from '@/constants/status-codes.constants'

interface ResponseData {
  index?: string;
  error?: string
}

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { API_RESPONSE_DELAY_MS } = APPLICATION_CONSTANTS
  const { SUCCESS } = STATUS_CODES

  if (req.method === 'POST') {
    const data = JSON.parse(req.body)
    delay(() => {
      res.status(SUCCESS.OK).json({ index: data.index })
    }, random(API_RESPONSE_DELAY_MS.MIN, API_RESPONSE_DELAY_MS.MAX))
  }
}

export default rateLimitMiddleware(handler)