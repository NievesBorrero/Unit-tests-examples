import { call, put, takeEvery } from "redux-saga/effects"

import { apiList } from "../../services/ApiClient"
import { listPotionError, listPotionSuccess } from "./actions"
import { POTION } from "./action_types"

export function * listPotions(): Generator {
    try {
      const response = yield call(
        apiList,
        'potions'
      )
      yield put(listPotionSuccess(response as Potion[]))
    } catch (e) {
      yield put(listPotionError(e.message))
    }
  }

  export const potionSaga = [
    takeEvery(POTION.LIST.REQUEST, listPotions)
  ]
