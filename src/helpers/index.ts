import { head, some, isEmpty } from 'lodash'
import Router from 'next/router'

export const getIdFromLocation = (location: string): string|null => {
    const pattern = /(\d+)/

    try {
        const numbersInLocation = location.match(pattern)

        if(!numbersInLocation) return null

        const id = head(numbersInLocation)

        return id || null

    } catch (err) {
        return null
    }
}

export const redirectTo = (target: string): void => {
    Router.push(target)
}

export const areFieldsValid = (fields: object) => {
    return !some(fields, isEmpty)
}
