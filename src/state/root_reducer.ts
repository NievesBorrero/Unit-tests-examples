import { combineReducers } from "redux"

import potionReducer from "./potions/reducer"

const rootReducer = combineReducers({
  potion: potionReducer
})

export default rootReducer
