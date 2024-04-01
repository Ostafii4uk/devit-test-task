import { NextApiRequest, NextApiResponse } from 'next'
import { APPLICATION_CONSTANTS } from '@/constants/application.constants'
import { STATUS_CODES } from '@/constants/status-codes.constants'

const rateLimitMap = new Map()

export const rateLimitMiddleware = (handler: any) => {
  const { LIMIT_REQUESTS, REQUESTS_PER_MS } = APPLICATION_CONSTANTS
  const { CLIENT_ERROR } = STATUS_CODES

  return (req: NextApiRequest, res: NextApiResponse) => {
    const ip = req.headers['x-forwarded-for']

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, {
        count: 0,
        lastReset: Date.now()
      })
    }

    const ipData = rateLimitMap.get(ip)

    if (Date.now() - ipData.lastReset > REQUESTS_PER_MS) {
      ipData.count = 0
      ipData.lastReset = Date.now()
    }

    if (ipData.count >= LIMIT_REQUESTS) {
      return res.status(CLIENT_ERROR.TOO_MANY_REQUESTS).send('Too Many Requests')
    }

    ipData.count += 1

    return handler(req, res)
  }
}
