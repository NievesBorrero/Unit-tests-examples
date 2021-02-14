import 'antd/dist/antd.css'

import React from 'react'
import { AppProps } from 'next/app'

import Global from '../components/Global'

const ExtendedApp = (props: AppProps) => {
  const { Component, pageProps } = props

  return (
    <React.Fragment>
      <Global />
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default ExtendedApp
