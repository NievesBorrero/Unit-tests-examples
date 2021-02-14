import React from "react"
import "@testing-library/jest-dom"
import {render, screen} from "@testing-library/react"
import { renderHook, act } from "@testing-library/react-hooks"

import PotionCollection from "../../src/components/PotionCollection"
import { useSearchAllPotions } from "../../src/hooks/useSearchAllPotions"
import { searchAllPotions } from "../../src/services/PotionRepository"
import {potion} from "../constants"

jest.mock('../../src/services/PotionRepository')

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

describe("CourseCollection component", () => {
    it("should list potions", async() => {
        (searchAllPotions as jest.Mock).mockImplementation(() => (
            new Promise((resolve) => jest.fn().mockResolvedValue(resolve(
                [potion])))
        ))

        const { waitForNextUpdate } = renderHook(() =>
            useSearchAllPotions()
        )

        await waitForNextUpdate()

        render(<PotionCollection/>)

        const potionName = await screen.findByText(potion.name)

        expect(potionName).toBeInTheDocument();

        (searchAllPotions as jest.Mock).mockReset()
    })
});
