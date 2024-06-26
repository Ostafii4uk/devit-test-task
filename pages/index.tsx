import Head from 'next/head'
import { Form } from '@/components/form'

const Home = () => {
  return (
    <>
      <Head>
        <title>devit-test-task</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>DevIT Test Task</h1>
        <Form />
      </main>
    </>
  )
}

export default Home