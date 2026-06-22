import { test as baseTest, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPageLetsShopPortal'
import { Utils } from './Utils'
import { ProductsPage } from '../pages/productsPageLetsShopPortal'
import { PaymentDetailsPage } from '../pages/paymentDetailsPageLetsShopPortal'
import { OrderSuccessPage } from '../pages/orderSuccessPageLetsShopPortal'
import { LoginBookEvent } from "../pages/login_registerEventPage"
import { APIRequests } from '../pages/apiRequests'
import { EventDetailsPage } from '../pages/eventDetailsPage'
import { BookingConfirmationPage } from '../pages/bookingConfirmationPage'
import { EventsPage } from "../pages/eventsPage"

type TestFixtures = {   // test-scoped fixtures
    loginPage: LoginPage
    utils: Utils
    productsPage: ProductsPage
    paymentDetailsPage: PaymentDetailsPage
    orderSuccessPage: OrderSuccessPage

    loginBookEvent: LoginBookEvent
    eventDetailPage: EventDetailsPage
    bookingConfirmationPage: BookingConfirmationPage
    eventsPage: EventsPage
}

type WorkerFixtures = { // worker-scoped fixtures. Used in beforeAll()
    apiRequest: APIRequests
}

/**
 * Say if any test require context to be created instead of page, then we need to implement as below:
 * const paymentsPage = new PaymentsPage(context)
 * await paymentsPage.init()
 * await use paymentsPage
 */
export const test = baseTest.extend<TestFixtures, WorkerFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    utils: async ({ page }, use) => {
        await use(new Utils(page))
    },
    apiRequest: [
        async ({ }, use) => {
            await use(new APIRequests())
        },
        { scope: 'worker' }
    ],
    productsPage: async ({ page }, use) => {
        // const productsPage = new ProductsPage(context)
        // await productsPage.initPage()
        // await use(productsPage);
        await use(new ProductsPage(page))
    },
    paymentDetailsPage: async ({ page }, use) => {
        await use(new PaymentDetailsPage(page))
    },
    orderSuccessPage: async ({ page }, use) => {
        await use(new OrderSuccessPage(page))
    },
    loginBookEvent: async ({ page }, use) => {
        await use(new LoginBookEvent(page))
    },
    eventDetailPage: async ({ page }, use) => {
        await use(new EventDetailsPage(page))
    },
    bookingConfirmationPage: async ({ page }, use) => {
        await use(new BookingConfirmationPage(page))
    },
    eventsPage: async({page}, use) => {
        await use(new EventsPage(page))
    }
})

export { expect }