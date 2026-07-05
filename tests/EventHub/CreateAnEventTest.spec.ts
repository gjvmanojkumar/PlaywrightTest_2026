import { test } from '../../lib/fixture'
import data from '../../testData/sit.config.json'

const eventTitle = `Test Event ${Date.now()}`
let totalSeats: string = '50'
let token: string = ""

test.describe.configure({ mode: 'serial' })
test.describe('Book An Event', { tag: ['@EventHub', '@Regression'] }, () => {

    test.beforeAll(async ({ apiRequest }) => {
        token = await apiRequest.loginAPIRequestEventHub(data.users.user3.userName, data.users.user3.password)
        
    })
    test.beforeEach('Login', async ({ loginBookEvent }) => {
        await loginBookEvent.setTokenLocalStorage(token)
        await loginBookEvent.navigateToURL()
        // await loginBookEvent.login()
    })
    test('Create An Event', async ({ eventDetailPage, bookingConfirmationPage, apiRequest }) => {
        await eventDetailPage.createEvent(eventTitle, totalSeats)
        await eventDetailPage.verifyCreatedEventExists(eventTitle, totalSeats)


        await bookingConfirmationPage.fillBookingForm(eventTitle)
        const refID: string = await bookingConfirmationPage.verifyBookingConfirmation()
        await bookingConfirmationPage.verifyInMyBooking(refID, eventTitle)
        // await bookingConfirmationPage.verifySeatReduction(eventDetailPage, apiRequest, eventTitle, totalSeats)
    })
    test.afterAll('Close All', async ({browser}) => {
        const contexts = browser.contexts();
        for (const context of contexts) {
            await context.close();
        }
        console.log('✅ All browser contexts closed.');
    })
})
