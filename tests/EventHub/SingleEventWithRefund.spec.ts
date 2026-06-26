import { test } from '../../lib/fixture';

const eventTitle = `Yoga Workshop`
const ticketCount: number = 1
let refID: string = ''
test.describe.configure({ mode: 'serial' })
test.describe('Verify Event Eligible for Refund @EventHub', () => {
    test.beforeEach('Login', async ({ loginBookEvent }) => {
        await loginBookEvent.navigateToURL()
        await loginBookEvent.login()
    })

    test('Check Result For Refund Eligibility', async ({ bookingConfirmationPage, eventDetailPage }) => {
        // await test.step('Create an Event and Book', async () => {
        //     await eventDetailPage.createEvent(eventTitle, '50')
        //     await eventDetailPage.verifyCreatedEventExists(eventTitle, '50')
        // })
        
        await test.step('Fill Booking Form and Confirm Booking', async () => {
            // Ensure we are on the event booking page before filling in booking details
            await eventDetailPage.eventsPageHelper(eventTitle)
            await bookingConfirmationPage.fillBookingForm(eventTitle)
            refID = await bookingConfirmationPage.verifyBookingConfirmation()
        })
        
        await test.step('Verify Refund Eligibility', async () => {
            await bookingConfirmationPage.verifyInMyBooking(refID, eventTitle)
            await bookingConfirmationPage.verifyRefundEligibility(refID, ticketCount)
        })
    })
});