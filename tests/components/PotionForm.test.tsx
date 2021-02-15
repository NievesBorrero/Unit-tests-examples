import React from 'react'
import "@testing-library/jest-dom"
import {render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import PotionForm from "../../src/components/PotionForm"
import { createPotion } from "../../src/services/ApiClient";
import { potion } from "../constants"
import { RESPONSE_TEXT } from '../../src/constants/response'
import { BadRequestError } from '../../src/errors'

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

describe("PotionForm component when the user fill in all fields", () => {
    it("should show a success notification", async() => {
        (createPotion as jest.Mock).mockImplementation(() => (
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

        const message = await screen.findByText(RESPONSE_TEXT.SUCCESS)

        expect(message).toBeInTheDocument();


        (createPotion as jest.Mock).mockReset()
    })
    it("should show an invalid notification when the user doesn´t fill in all fields", async() => {
        (createPotion as jest.Mock).mockImplementation(() => (
            new Promise((resolve) => jest.fn().mockResolvedValue(resolve(potion)))
        ))

        render(<PotionForm/>)

        const name = screen.getByLabelText(/name/i)
        userEvent.type(name, "My awesome potion")

        const button = await screen.getByRole("button", { name: /create/i })

        userEvent.click(button)

        const message = await screen.findByText(RESPONSE_TEXT.INVALID)

        expect(message).toBeInTheDocument();

        (createPotion as jest.Mock).mockReset()
    })
    it("should show an error notification when the response throw error", async() => {
        (createPotion as jest.Mock).mockImplementation(() => (
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

        const message = await screen.findByText(RESPONSE_TEXT.ERROR)

        expect(message).toBeInTheDocument();

        (createPotion as jest.Mock).mockReset()
    })
});
