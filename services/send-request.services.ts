export const sendRequest = async (index: number) => {
  const response = await fetch('/api/devit', {
    method: 'POST',
    body: JSON.stringify({ index }),
    headers: {
      'Conte-Type': 'application/json'
    }
  })

  try {
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!')
    }

    return data
  } catch (error) {
    throw new Error('Something went wrong!')
  }
}
