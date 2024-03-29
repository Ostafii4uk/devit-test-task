import { NextApiRequest, NextApiResponse } from 'next'

const rateLimitMap = new Map()

export default function rateLimitMiddleware(handler: any) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const ip = req.headers['x-forwarded-for']
    const limit = 50 // Limiting requests to 50 per sec per IP
    const windowMs = 1000 // 1 second

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, {
        count: 0,
        lastReset: Date.now()
      })
    }

    const ipData = rateLimitMap.get(ip)

    if (Date.now() - ipData.lastReset > windowMs) {
      ipData.count = 0
      ipData.lastReset = Date.now()
    }

    if (ipData.count >= limit) {
      return res.status(429).send('Too Many Requests')
    }

    ipData.count += 1

    return handler(req, res)
  }
}
