import React from "react"
import "@testing-library/jest-dom"
import {render, screen } from "@testing-library/react"

import PotionCollection from "../../src/components/PotionCollection"
import { potion } from "../constants"
import { apiList } from "../../src/services/ApiClient"

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

            render(<PotionCollection/>)

            const potionName = await screen.findByText(potion.name)

            expect(potionName).toBeInTheDocument()
        })
    })
});
