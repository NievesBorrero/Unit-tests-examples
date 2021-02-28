import 'antd/dist/antd.css'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import React from 'react'
import { AppProps } from 'next/app'

import Global from '../components/Global'
import createStore from '../state/store'

const ExtendedApp = (props: AppProps) => {
  const { Component, pageProps } = props

  return (
    <React.Fragment>
      <Global />
      <Component {...pageProps} />
    </React.Fragment>
  )
}


export default withRedux(createStore)(withReduxSaga(ExtendedApp))
