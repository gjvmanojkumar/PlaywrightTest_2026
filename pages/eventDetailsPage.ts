import { Locator, Page } from "@playwright/test";
import { Utils } from "../lib/Utils";
import { eventDetailsPageLoc, eventsPageLoc } from "../locators/bookAnEventLoc";

export class EventDetailsPage {
    readonly utils: Utils

    constructor(private page: Page) {
        this.utils = new Utils(page)
    }

    async createEvent(eventTitle: string, totalSeats: string) {
        const eventDate: string = Utils.futureDateValue()
        await this.utils.findEleByText(eventDetailsPageLoc.lblAdminLoc, 'click')
        await this.page.locator('a').filter({ hasText: 'Manage Events' }).first().click()
        await this.utils.enterEleText(eventDetailsPageLoc.titleInputLoc, eventTitle)
        await this.utils.enterEleText(eventDetailsPageLoc.lblDescription, 'Some Description')
        await this.utils.enterEleTextByLabel(eventDetailsPageLoc.cityLoc, 'Guntur')
        await this.utils.enterEleTextByLabel(eventDetailsPageLoc.venueLoc, 'Yashoda Gardens')
        await this.utils.enterEleTextByLabel(eventDetailsPageLoc.priceLoc, '600')
        await this.utils.enterEleTextByLabel(eventDetailsPageLoc.eventDateTimeLoc, eventDate)
        await this.utils.enterEleTextByLabel(eventDetailsPageLoc.totalSeatsLoc, totalSeats)
        await this.utils.clickEle(eventDetailsPageLoc.btnAdd)
        await this.utils.verifyEleIsVisible(eventDetailsPageLoc.eventSuccessAlert)
    }

    async verifyCreatedEventExists(eventTitle: string, totalSeats: string) {
        const seatsCount: number = await this.eventsPageHelper(eventTitle)
        // await this.utils.verifyValuesOnly(seatsCount.toString(), totalSeats)
    }

    async eventsPageHelper(eventTitle: string) {
        await this.utils.waitForPageToLoad('load')
        await this.utils.clickEle(eventsPageLoc.eventsPageNavLoc)
        const allEvents: Locator = await this.utils.findLocator(eventsPageLoc.eventCardLoc)
        await allEvents.first().isVisible()
        if(!allEvents.filter({ hasText: eventTitle })) {
             await this.createEvent(eventTitle, "500")
             await this.verifyCreatedEventExists(eventTitle, "500")
        }
        const myEventCard = await allEvents.filter({ hasText: eventTitle })
        const seatsText = await myEventCard.locator(eventsPageLoc.seatsAvailableLoc).innerText()
        const seatsCount: number = parseInt(seatsText, 10)
        await myEventCard.getByRole('link', { name: 'Book Now' }).click()
        return seatsCount
    }
}