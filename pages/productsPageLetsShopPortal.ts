import { BrowserContext, Page } from "@playwright/test";
import { Utils } from "../lib/Utils";
import { OrderProductLocators } from "../locators/orderProductLocatorsLetsShopPortal";
import { BasePage } from "../lib/BasePage";

const btnName: string = ' Add To Cart'

export class ProductsPage { // class should extends BasePage
    readonly utils: Utils

    constructor( page: Page) {
        // super(context)
        this.utils = new Utils(page)
    }

    async selectAProduct(productName: string) {
        await this.utils.element(OrderProductLocators.products).filter(productName).btn(btnName).click()
        await this.utils.clickEle(OrderProductLocators.cartBtn)           
        await this.utils.verifyEleText(OrderProductLocators.cartItemName, productName)
        await this.utils.clickEle(OrderProductLocators.checkoutBtn)
    }
}