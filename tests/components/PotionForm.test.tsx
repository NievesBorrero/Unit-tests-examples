import React from 'react'
import "@testing-library/jest-dom"
import {render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import PotionForm from "../../src/components/PotionForm"
import { potion } from "../constants"
import { BadRequestError } from '../../src/errors'
import { POTION_MESSAGE } from '../../src/constants/message'
import { apiCreate } from '../../src/services/ApiClient'

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

describe("PotionForm component when the user fill in all fields", () => {
    it("should show a success message", async() => {
        (apiCreate as jest.Mock).mockImplementation(() => (
            new Promise((resolve) => jest.fn().mockResolvedValue(resolve(potion)))
        ))
        render(<PotionForm/>)

        const name = screen.getByLabelText(/name/i)
        userEvent.type(name, "My awesome potion")

        const prize = screen.getByLabelText(/prize/i)
        userEvent.type(prize, '1')

        const effect = screen.getByLabelText(/effect/i)
        userEvent.type(effect, "Crazy effect")

        const button = screen.getByRole("button", { name: /create/i })
        userEvent.click(button)


        const message = await screen.findByText(
            POTION_MESSAGE.CREATE.SUCCESS.message
        )


        expect(message).toBeInTheDocument()
    })
    it("should show an message when the user doesn´t fill in all fields", async() => {
        (apiCreate as jest.Mock).mockImplementation(() => (
            new Promise((resolve) => jest.fn().mockResolvedValue(resolve(potion)))
        ))
        render(<PotionForm/>)


        const name = screen.getByLabelText(/name/i)
        userEvent.type(name, "My awesome potion")

        const button = await screen.getByRole("button", { name: /create/i })
        userEvent.click(button)

        const message = await screen.findByText(
            POTION_MESSAGE.CREATE.INVALID.message
        )


        expect(message).toBeInTheDocument()

    })
    it("should show an error when the response throw error", async() => {
        (apiCreate as jest.Mock).mockImplementation(() => (
            new Promise((resolve, reject) => jest.fn().mockRejectedValue(
                reject(new BadRequestError('error')))
        )))
        render(<PotionForm/>)


        const name = screen.getByLabelText(/name/i)
        userEvent.type(name, "My awesome potion")

        const prize = screen.getByLabelText(/prize/i)
        userEvent.type(prize, '1')

        const effect = screen.getByLabelText(/effect/i)
        userEvent.type(effect, "Crazy effect")

        const button = screen.getByRole("button", { name: /create/i })
        userEvent.click(button)

        const message = await screen.findByText(
            POTION_MESSAGE.CREATE.ERROR.message
        )


        expect(message).toBeInTheDocument()
    })
});
