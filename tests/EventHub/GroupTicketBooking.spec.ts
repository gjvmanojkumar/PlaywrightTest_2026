import { test } from '../../lib/fixture';

const eventTitle = `Yoga Workshop`
const ticketCount: number = 3
let refID: string = ''
test.describe.configure({ mode: 'serial' })
test.describe('Verify Group Tickets Booking Is Not Eligible For Refund', () => {
    test.beforeEach('Login', async ({ loginBookEvent }) => {
        await loginBookEvent.navigateToURL()
        await loginBookEvent.login()
    })

    test('Check Result For Refund Eligibility', async ({ bookingConfirmationPage, eventDetailPage }) => {
        // test.slow()
        
        await test.step('Fill Booking Form and Confirm Booking', async () => {
            // Ensure we are on the event booking page before filling in booking details
            await eventDetailPage.eventsPageHelper(eventTitle)
            await bookingConfirmationPage.fillBookingForm(eventTitle, ticketCount)
            refID = await bookingConfirmationPage.verifyBookingConfirmation()
        })
        
        await test.step('Verify Refund Eligibility', async () => {
            await bookingConfirmationPage.verifyInMyBooking(refID, eventTitle)
            await bookingConfirmationPage.verifyRefundEligibility(refID, ticketCount)
        })
    })
});