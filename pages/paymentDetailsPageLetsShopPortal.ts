import { Page } from "@playwright/test";
import { Utils } from "../lib/Utils";
import { OrderProductLocators } from "../locators/orderProductLocatorsLetsShopPortal";
import data from "../testData/sit.config.json"
import { APIRequests } from "../pages/apiRequests"
import { orderDetails } from "../interface/orderDetails.interface";

export class PaymentDetailsPage {
    readonly page: Page
    readonly utils: Utils
    orderID: string = ''

    constructor(page: Page) {
        this.page = page
        this.utils = new Utils(page)
    }

    apiRequest = new APIRequests()

    async verifyPlaceOrder(authToken: string, country: string): Promise<string> {
        await this.utils.enterEleText(OrderProductLocators.nameOnCard, 'Gopal')
        await this.utils.enterEleTextSequentially(OrderProductLocators.selectCountry, 'Ind')
        await this.utils.selectValueByText(OrderProductLocators.countryOptions, country, country)
        await this.utils.clickEle(OrderProductLocators.placeOrderBtn)
        await this.utils.verifyEleText('h1', ' Thankyou for the order. ')
        this.orderID = await this.utils.getText(OrderProductLocators.orderDetails)
        const id: string[] = this.orderID.split(' ')
        this.orderID = id[2]

        // Get Product Name from the API and Assert in the Success Page
        const orderDetails: orderDetails = await this.apiRequest.getOrderDetails(authToken, data.apiURLs.getOrderDetails+this.orderID)
        const productName = orderDetails.data.productName
        this.utils.verifyEleContainsText(OrderProductLocators.productTitle, productName)
        return this.orderID
    }
}