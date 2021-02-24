import React from "react"
import "@testing-library/jest-dom"
import {render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import PotionDetail from "../../src/components/PotionDetail"

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

describe("when user click send", () => {
    describe("and there are no errors", () => {
        it("should show a notification", async() => {

            render(<PotionDetail/>)

            const button = screen.getByRole("button", { name: /add/i })

            userEvent.click(button)

            const message = await screen.findByText('Potion added')

            expect(message).toBeInTheDocument()
        })
    })
})
