import React from "react"
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import configureStore from '../src/state/store'


export * from '@testing-library/react'

const store = configureStore()

export const renderWith = (component: JSX.Element, initialState = {}) => {
  const newStore = {
    ...store,
    state: {
      ...store.getState(),
      ...initialState,
    }
  }

  return render(<Provider store={newStore}>{ component }</Provider>)
}
