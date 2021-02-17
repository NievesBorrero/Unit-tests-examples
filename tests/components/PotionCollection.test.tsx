import React from "react"
import "@testing-library/jest-dom"
import {render, screen } from "@testing-library/react"

import PotionCollection from "../../src/components/PotionCollection"
import { useSearchAllPotions } from "../../src/hooks/useSearchAllPotions"
import { searchAllPotions } from "../../src/services/ApiClient"
import {potion} from "../constants"

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

jest.mock('../../src/services/ApiClient')

describe("PotionCollection component", () => {
    it("should list potions", async() => {
        (searchAllPotions as jest.Mock).mockImplementation(() => (
            new Promise((resolve) => jest.fn().mockResolvedValue(resolve(
                [ potion ])))
        ))

        render(<PotionCollection/>)

        const potionName = await screen.findByText(potion.name)

        expect(potionName).toBeInTheDocument();

        (searchAllPotions as jest.Mock).mockReset()
    })
});
