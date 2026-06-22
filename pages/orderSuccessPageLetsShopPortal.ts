import { Page } from "@playwright/test";
import { Utils } from "../lib/Utils";
import { OrderProductLocators } from "../locators/orderProductLocatorsLetsShopPortal";

export class OrderSuccessPage {
    readonly utils: Utils
    protected orderId = ''

    constructor(readonly page: Page) {
        this.utils = new Utils(page)
    }

    async verifyOrderDetails(orderID: string) {
        await this.utils.clickEle(OrderProductLocators.orderHistoryPage)
        await this.utils.waitForFirstEle(OrderProductLocators.rowsLocator)
        const filteredRow = await this.utils.filterEleByText(OrderProductLocators.rowsLocator, orderID)
        await this.utils.element(OrderProductLocators.rowsLocator).filter(orderID).btn('View').click()
        // await this.utils.selectByRoleBtn(OrderProductLocators.rowsLocator, orderID, 'View')
        await this.utils.verifyEleText(OrderProductLocators.orderIDSummaryPage, orderID)
    }
}