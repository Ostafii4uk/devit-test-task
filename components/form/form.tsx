import { useState } from 'react'

import styles from './form.module.scss'

async function sendRequest(index: number) {
  const response = await fetch('/api/devit', {
    method: 'POST',
    body: JSON.stringify(index),
    headers: {
      'Conte-Type': 'application/json'
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!')
  }
}

export const Form = () => {
  const [limit, setLimit] = useState('')
  let countRequests = 0
  const MAX_REQUEST = 1000

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(event.target.value)
  }

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    const requestsFunction = () => {
      if (countRequests < MAX_REQUEST) {

        for (let index = 1; index <= Number(limit); index++) {
          sendRequest(index + countRequests)
        }

        countRequests += Number(limit)
      } else {
        clearInterval(requestInterval)
      }
    }

    const requestInterval = setInterval(requestsFunction, 1000)
  }

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <input
        type="number"
        min="0"
        max="100"
        value={limit}
        onChange={onChangeHandler}
        placeholder='Type limit of requests'
        required
      />
      <button disabled={!limit}>Start</button>
    </form>
  )
}