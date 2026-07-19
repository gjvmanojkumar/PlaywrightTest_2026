import { test } from "../../lib/fixture"
import data from "../../testData/sit.config.json"
import { LoginPage } from "../../pages/loginPageLetsShopPortal"
import { APIRequests } from "../../pages/apiRequests"

const productName: string = 'iphone 13 pro'
const country: string = ' India'
let orderID: string = ''
let token: string = ''

test.describe.configure({ mode: 'serial' })
test.describe('Place An Order', () => {
    
    test.beforeAll(async ({ apiRequest }) => {
        token = await apiRequest.authTokenGenerator(data.apiURLs.loginPageURL, data.users.user3.userName, data.users.user3.password)
        
    })

    test.beforeEach(async ({ loginPage, utils }) => {
        await loginPage.setTokenInLocalStorage(token)
        await loginPage.navigateToURL()
        await utils.waitForPageToLoad('load')
    })

    test('@Web Verify Placing an Order', async ({ productsPage, paymentDetailsPage, orderSuccessPage }) => {
        await test.step('Add a Product To Cart', async () => {
            await productsPage.selectAProduct(productName)
        })
        await test.step('Payment Details Page', async () => {
            orderID = await paymentDetailsPage.verifyPlaceOrder(token, country)
        })
        await test.step('Validate Order Details', async () => {
            await orderSuccessPage.verifyOrderDetails(orderID)
        })
    })
})