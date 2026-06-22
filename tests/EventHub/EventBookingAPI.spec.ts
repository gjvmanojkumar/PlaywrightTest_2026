import { CreateEvent } from "../../interface/CreateEvent.interface";
import { test } from "../../lib/fixture";
import { Utils } from "../../lib/Utils";
import data from "../../testData/sit.config.json"

let logintToken = ""
let eventDetails: CreateEvent
let eventTitle: string = ""
let refID: string = ""
let actualSeatsCount = ""

test.describe.configure({ 'mode': 'serial' })
test.describe("Event Booking From Create Event API", () => {

    test.beforeAll(async ({ apiRequest }) => {
        const eventDate = Utils.futureDateValue()
        logintToken = await apiRequest.loginAPIRequestEventHub(data.users.user3.userName, data.users.user3.password)
        eventDetails = await apiRequest.createEvent(eventDate)
        eventTitle = eventDetails.title
    })

    test.beforeEach(async ({ loginBookEvent }) => {
        await loginBookEvent.setTokenLocalStorage(logintToken)
        await loginBookEvent.navigateToURL()
    })

    test("Verify Event on Events Page", async ({ eventsPage, bookingConfirmationPage, eventDetailPage }) => {
        await test.step('Selecting The Event', async () => {
            actualSeatsCount = await eventsPage.selectEventCard(eventDetails)
        })
        await test.step('Booking An Event', async () => {
            await bookingConfirmationPage.fillBookingForm(eventTitle)
            refID = await bookingConfirmationPage.verifyBookingConfirmation()
        })
        // await test.step('Verify Seat Reduction After Booking', async() => {
        //     await bookingConfirmationPage.verifySeatReduction(eventDetailPage, eventTitle, actualSeatsCount)
        // })
    })

    test.afterAll('Close All', async ({ browser }) => {
        const contexts = browser.contexts();
        for (const context of contexts) {
            await context.close();
        }
        console.log('✅ All browser contexts closed.');
    })
})