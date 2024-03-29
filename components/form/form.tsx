import { useState } from 'react'
import styles from './form.module.scss'

interface ResponseData {
  index: number
}

export const Form = () => {
  const [limit, setLimit] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [responseData, setResponseData] = useState<ResponseData[]>([])

  const MAX_REQUEST = 1000
  const REQUEST_INTERVAL_TIME = 1000
  let countRequests = 0

  async function sendRequest(index: number) {
    const response = await fetch('/api/devit', {
      method: 'POST',
      body: JSON.stringify({ index }),
      headers: {
        'Conte-Type': 'application/json'
      }
    })

    try {
      const data = await response.json()

      setResponseData((prevResponseData) => [...prevResponseData, data])

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!')
      }
    } catch (error) {
      throw new Error('Something went wrong!')
    }
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
          sendRequest(index + countRequests)
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
        placeholder='Type limit of requests to start'
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