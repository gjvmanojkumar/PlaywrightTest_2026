import { Page } from "@playwright/test"
import { Utils } from "../lib/Utils"
import data from "../testData/sit.config.json"
import { loginPageLocators, registerLocators } from "../locators/bookAnEventLoc"

export class LoginBookEvent {
    readonly utils: Utils

    constructor(private page: Page) {
        this.utils = new Utils(page)
    }

    async navigateToURL() {
        await this.utils.navigateToURL(data.eventHubWebURL)
    }

    async login() {
        await this.utils.enterEleTextByPlaceholder(loginPageLocators.userNameLoc, data.users.user3.userName)
        await this.utils.enterEleTextByLabel(loginPageLocators.passwordLoc, data.users.user2.password)
        await this.utils.clickEle(loginPageLocators.signInBtnLoc)
        await this.utils.waitForPageNavigation('load')
        // await page.waitForTimeout(5000)
        const visible = await (await this.utils.findEleByRole('link', 'Register')).isVisible()
        if (visible) {
            await this.register(data.users.user2.userName, data.users.user2.password)
        }
    }

    async setTokenLocalStorage(token: string) {
        await this.page.addInitScript((value) => {
            window.localStorage.setItem('eventhub_token', value)
        }, token)
        await this.page.reload({ waitUntil: 'load' });
    }

    async register(userName: string, password: string) {
        (await this.utils.findEleByRole('link', 'Register')).click()
        await this.utils.enterEleTextByPlaceholder(registerLocators.userNameLoc, userName)
        await this.utils.enterEleText(registerLocators.passwordLoc, password)
        await this.utils.enterEleText(registerLocators.confirmPwdLoc, password)
        await this.utils.clickEle(registerLocators.registerBtnLoc)
        await this.utils.clickEle(loginPageLocators.logoutBtnLoc)
        await this.login()
    }
}