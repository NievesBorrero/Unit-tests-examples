import { POTION } from "./action_types"

const initialState = {
  potionList: []
}

export default function potionReducer (state: PotionState = initialState,
  action: Action) {
    switch (action.type) {
      case POTION.LIST.SUCCESS:
          return {
              ...state,
              potionList: action.payload
          }
      default:
        return state
    }
}
