import React from "react"
import "@testing-library/jest-dom"
import {render, screen } from "@testing-library/react"
import { Provider } from 'react-redux'

import PotionCollection from "../../src/components/PotionCollection"
import { potion } from "../constants"
import { apiList } from "../../src/services/ApiClient"
import configureStore from "../../src/state/store"

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
})

const store = configureStore()

afterEach(() => {
    jest.clearAllMocks()
})

jest.mock('../../src/services/ApiClient')

describe("When user access", () => {
    describe("and there are no errors", () => {
        it("should show potions", async() => {
            (apiList as jest.Mock).mockImplementation(() => (
                new Promise((resolve) => jest.fn().mockResolvedValue(resolve(
                    [ potion ])))
            ))

            render(<Provider store={store}><PotionCollection/></Provider>)

            const potionName = await screen.findByText(potion.name)

            expect(potionName).toBeInTheDocument()
        })
    })
});
