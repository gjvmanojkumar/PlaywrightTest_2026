import { Page } from "@playwright/test";
import { Utils } from "../lib/Utils";
import data from "../testData/sit.config.json"
import {loginPageLSlocators} from "../locators/loginPageLSlocators"


export class LoginPage {
    protected readonly page: Page
    protected readonly utils: Utils

    constructor(page: Page) {
        this.page = page
        this.utils = new Utils(page)
    }

    async navigateToURL() {
        await this.utils.navigateToURL(data.letsShopWebURL)
    }

    async enterLoginDetails(userName: string, password: string) {
        await this.utils.enterEleText(loginPageLSlocators.userName, userName)
        await this.utils.enterEleText(loginPageLSlocators.password, password)
        await this.utils.clickEle(loginPageLSlocators.signInBtn)
    }

    async setTokenInLocalStorage(token: string) {
        await this.page.addInitScript((value) => {
            window.localStorage.setItem('token', value)
        }, token)
    }
}