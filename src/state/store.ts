import { applyMiddleware, createStore, Middleware, StoreEnhancer } from "redux"
import createSagaMiddleware from "redux-saga"

import rootReducer from "./root_reducer";
import rootSaga from "./root_sagas";
import { WithSagaTaskStore } from "../interfaces/WithSagaTaskStore";

const bindMiddleware = (middleware: Middleware[]): StoreEnhancer => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension")
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware()
  const store: WithSagaTaskStore = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
