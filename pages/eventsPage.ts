import { Page } from "@playwright/test";
import { Utils } from "../lib/Utils";
import { eventsPageLoc, bookingPageLoc } from "../locators/bookAnEventLoc"
import { CreateEvent } from "../interface/CreateEvent.interface";

export class EventsPage {
    readonly utils: Utils

    constructor(page: Page) {
        this.utils = new Utils(page)
    }

    async selectEventCard(eventDetails: CreateEvent) {
        //Dummy push
        await this.utils.clickEle(eventsPageLoc.eventsPageNavLoc)
        let actualSeatsCount = await this.utils.element(eventsPageLoc.eventCardLoc).filter(eventDetails.title).locator(eventsPageLoc.seatsAvailableLoc).innerText()
        await this.utils.element(eventsPageLoc.eventCardLoc).filter(eventDetails.title).role("link", "Book Now").click()
        await this.utils.waitForEleAttached(bookingPageLoc.eventTitleLoc)
        await this.utils.verifyEleText(bookingPageLoc.eventTitleLoc, eventDetails.title)
        await this.utils.verifyEleText(bookingPageLoc.eventDescription, eventDetails.description)
        await this.utils.verifyEleText(bookingPageLoc.venueDetails, eventDetails.venue)
        await this.utils.verifyEleText(bookingPageLoc.cityInfo, eventDetails.city)
        await this.utils.verifyEleContainsText(bookingPageLoc.seatsCount, eventDetails.totalSeats.toString()+" seats")
        return actualSeatsCount.split(' ')[0]
    }

    async verifySeatReduction() {

    }
}
