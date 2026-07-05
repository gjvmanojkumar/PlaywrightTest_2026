import { expect, Locator, Page } from "@playwright/test";
import { Utils } from "../lib/Utils";
import data from "../testData/sit.config.json"
import { EventDetailsPage } from "./eventDetailsPage";
import { bookingPageLoc } from "../locators/bookAnEventLoc";
import { AllEvents } from '../interface/AllEvents.interface';
import { APIRequests } from "./apiRequests";

export class BookingConfirmationPage {
    readonly utils: Utils

    constructor(private page: Page) {
        this.utils = new Utils(page)
    }

    async fillBookingForm(eventTitle: string, ticketCount: number = 1) {
        await this.utils.waitForTimeOut()
        await this.utils.verifyEleText(bookingPageLoc.eventTitleLoc, eventTitle)
        await this.utils.enterEleTextByLabel(bookingPageLoc.fullNameLoc, 'Sundhar')
        await this.utils.enterEleText(bookingPageLoc.emailLoc, data.users.user2.userName)
        await this.utils.enterEleTextByPlaceholder(bookingPageLoc.mobileNumLoc, '8992288111')
        if (ticketCount > 1) {
            for (let i = 1; i < ticketCount; i++) {
                await this.utils.clickEle(bookingPageLoc.btnAddSeats)
            }
        }
        await this.utils.verifyEleText(bookingPageLoc.ticketCountLoc, ticketCount.toString())
        await this.utils.clickEle(bookingPageLoc.btnConfirmBooking)
    }

    async verifyBookingConfirmation() {
        const bookingRef = (await this.utils.findLocator(bookingPageLoc.bookingRefID))
        await this.utils.verifyEleIsVisible(bookingPageLoc.bookingRefID)
        const bookingRefID = (await bookingRef.innerText()).trim()
        return bookingRefID
    }

    async verifyInMyBooking(bookingRefID: string, eventTitle: string) {
        const baseURL: string = 'https://eventhub.rahulshettyacademy.com'
        await this.utils.clickEle(bookingPageLoc.bookingsPageNav)
        await this.utils.verifyPageHasURL(`${baseURL}/bookings`)


        const bookingCard = await this.utils.findLocator('#booking-card')
        await bookingCard.first().isVisible()
        const ID = bookingCard.locator(bookingPageLoc.bookingRefID).filter({ hasText: bookingRefID })
        await this.utils.verifyTextVal(ID, bookingRefID)
        const title = await bookingCard.filter({ hasText: bookingRefID }).locator('h3')
        await this.utils.verifyTextVal(title, eventTitle)

        // VP : "first character of booking ref equals first character of event title"
        await this.validateBookingRefID(eventTitle, bookingRefID)
    }

    async verifySeatReduction(eventsPageInstance: EventDetailsPage, apiRequestInstance: APIRequests, eventTitle: string, totalSeats: string) {
        let availableSeats: string = ''
        const eventsResponseJSON: AllEvents = await apiRequestInstance.getAllEvents()
        eventsResponseJSON.data.forEach((event) => {
            if (event.title === eventTitle) {
                availableSeats = event.availableSeats.toString()
            }
        })
        const seatsCount = await eventsPageInstance.eventsPageHelper(eventTitle)
        await this.utils.verifyValuesOnly(seatsCount.toString(), availableSeats)
    }

    async validateBookingRefID(eventTitle: string, bookingRefID: string) {
        const eventChar: string = eventTitle.substring(0, 1)
        const refIDChar: string = bookingRefID.substring(0, 1)
        await this.utils.verifyValuesOnly(eventChar, refIDChar)
    }

    async verifyRefundEligibility(bookingRefID: string, ticketCount: number) {
        // The refund eligibility button is available on the booking details page, not on the bookings list.
        // Navigate to the correct booking details page first.
        const bookingCard = await this.utils.findLocator('#booking-card')
        const targetCard = bookingCard.filter({ hasText: bookingRefID })
        await targetCard.getByRole('link', { name: 'View Details' }).first().click()

        // Wait for navigation to booking details page to complete
        await this.page.waitForURL(/\/bookings\/\d+/)

        await this.utils.clickEle(bookingPageLoc.refundBtn)
        await this.utils.verifyEleIsVisible(bookingPageLoc.refundSpinner)
        // Assuming the spinner disappears after the check is complete
        await this.utils.waitForElementToDisappear(bookingPageLoc.refundSpinner)

        if (ticketCount === 1) {
            // Verify refund eligibility result (this part depends on how the result is displayed in the UI)
            const refundResult = await this.utils.findLocator(bookingPageLoc.refundResult)
            await this.utils.verifyEleIsVisible(bookingPageLoc.refundResult)
            const resultText = await this.utils.getText(bookingPageLoc.refundResult)
            await this.utils.verifyEleContainsText(bookingPageLoc.refundResult, ' Single-ticket bookings qualify for a full refund.')
        }

        if (ticketCount > 1) {
            const refundResult = await this.utils.findLocator(bookingPageLoc.refundResult)
            await this.utils.verifyEleIsVisible(bookingPageLoc.refundResult)
            const resultText = await this.utils.getText(bookingPageLoc.refundResult)
            await this.utils.verifyEleContainsText(bookingPageLoc.refundResult, `Not eligible for refund.  Group bookings (${ticketCount} tickets) are non-refundable.`)
        }
    }
}