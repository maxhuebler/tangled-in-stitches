import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import '../styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tangled in Stitches</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
