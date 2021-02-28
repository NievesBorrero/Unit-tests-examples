import { POTION } from "./action_types"

export const listPotion = () => ({
    type: POTION.LIST.REQUEST
})

export const listPotionSuccess = (payload: Potion[]) => ({
    type: POTION.LIST.SUCCESS,
    payload: payload
})

export const listPotionError = (payload: string) => ({
    type: POTION.LIST.ERROR,
    payload: payload
})
