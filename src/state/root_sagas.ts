import { all } from "redux-saga/effects"

import { potionSaga } from "./potions/sagas"

function * rootSaga () {
  yield all([...potionSaga])
}

export default rootSaga
