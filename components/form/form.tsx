import { useState } from 'react'
import styles from './form.module.scss'
import { sendRequest } from '@/services/send-request.services'
import { APPLICATION_CONSTANTS } from '@/constants/application.constants'

interface ResponseData {
  index: number
}

export const Form = () => {
  const [limit, setLimit] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [responseData, setResponseData] = useState<ResponseData[]>([])
  const { MAX_REQUEST, REQUEST_INTERVAL_TIME } = APPLICATION_CONSTANTS

  let countRequests = 0

  const updateResponseData = async (index: number) => {
    const response = await sendRequest(index)

    setResponseData((prevResponseData) => [...prevResponseData, response])
  }

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(event.target.value)
  }

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    const requestsFunction = () => {
      if (countRequests < MAX_REQUEST) {
        setIsFetching(true)

        for (let index = 1; index <= Number(limit); index++) {
          updateResponseData(index + countRequests)
        }

        countRequests += Number(limit)
      } else {
        setIsFetching(false)
        clearInterval(requestInterval)
      }
    }

    const requestInterval = setInterval(requestsFunction, REQUEST_INTERVAL_TIME)
  }

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <input
        type="number"
        min="0"
        max="100"
        value={limit}
        onChange={onChangeHandler}
        placeholder="Type limit of requests to start"
        required
      />
      <button disabled={!Number(limit) || isFetching}>Start</button>
      {Boolean(responseData.length) && (
        <ul>
          {responseData.map(item => <li key={item.index}>Request index: {item.index}</li>)}
        </ul>
      )}
    </form>
  )
}