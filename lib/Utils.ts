import { APIResponse, BrowserContext, expect, Frame, FrameLocator, Locator, Page } from "@playwright/test";
import { ChainableLocator } from './ChainableLocator'

const waitForEle = 100000

export class Utils {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    // Use to navigate to URL
    async navigateToURL(url: string) {
        await this.page.goto(url, { waitUntil: 'networkidle' })
    }

    async waitForTimeOut(): Promise<void> {
        await this.page.waitForTimeout(5000)
    }

    // Use to wait for elements
    async waitForEleAttached(locator: string): Promise<void> {
        await this.page.waitForSelector(locator)
    }

    async waitForFirstEle(locator: string): Promise<void> {
        await this.page.locator(locator).first().waitFor()
    }

    async findLocator(locator: string): Promise<Locator> {
        return this.page.locator(locator)
    }

    /* Use to wait till page navigated successfully with mentioned waitUntil*/
    async waitForPageNavigation(event: string): Promise<void> {
        switch (event) {
            case 'networkIdle':
                await this.page.waitForNavigation({ 'waitUntil': 'networkidle', timeout: waitForEle })
                break
            case 'load':
                await this.page.waitForNavigation({ 'waitUntil': 'load', timeout: waitForEle })
                break
            case 'domContentLoaded':
                await this.page.waitForNavigation({ 'waitUntil': 'domcontentloaded', timeout: waitForEle })
                break
        }
    }

    /* Use to wait till page content loaded successfully with mentioned waitUntil*/
    async waitForPageToLoad(event: string): Promise<void> {
        switch (event.toLowerCase()) {
            case 'networkIdle':
                await this.page.waitForLoadState('networkidle', { timeout: waitForEle })
                break
            case 'load':
                await this.page.waitForLoadState('load', { timeout: waitForEle })
                break
            case 'domContentLoaded':
                await this.page.waitForLoadState('domcontentloaded', { timeout: waitForEle })
                break
        }
    }

    /* Use to add some delay after perform some actions*/
    async delay(time: number): Promise<void> {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        })
    }

    async pausePage() {
        await this.page.pause()
    }

    toLocator(selectorOrLocator: string | Locator): Locator {
        return typeof selectorOrLocator === 'string' 
            ? this.page.locator(selectorOrLocator) 
            : selectorOrLocator;
    }

    /* Use to click on element */
    async clickEle(selectorOrLocator: string | Locator): Promise<void> {
        const locator = this.toLocator(selectorOrLocator)
        await locator.scrollIntoViewIfNeeded()
        await locator.click()
    }

    // Use to fill a text element
    async enterEleText(selectorOrLocator: string | Locator, value: string): Promise<void> {
        const locator = this.toLocator(selectorOrLocator)
        await locator.fill(value)
    }

    async getInnerText(selectorOrLocator: string | Locator) {
        const locator = this.toLocator(selectorOrLocator)
        return await locator.innerText()
    }

    // Use to drag & drop
    async dragDrop(dragEleLocator: string, dropEleLocator: string): Promise<void> {
        await this.waitForEleAttached(dragEleLocator)
        await this.waitForEleAttached(dropEleLocator)
        await this.page.dragAndDrop(dragEleLocator, dropEleLocator)
    }

    /* Use to select option from dropdown */
    async selectOptionFromDropdown(locator: string, option: string): Promise<void> {
        await this.waitForEleAttached(locator)
        const dropdownLoc = await this.findLocator(locator)
        await dropdownLoc.selectOption(option)
    }

    /* Use to select options from dropdown */
    async selectOptionsFromDropdown(locator: string, options: string[]): Promise<void> {
        await this.waitForEleAttached(locator)
        for (const option of options) {
            await this.page.locator(locator).filter({ hasText: option }).click()
        }
    }

    // Use to verify element text
    async verifyEleText(locator: string, expectedVal: string): Promise<void> {
        await this.waitForEleAttached(locator)
        const actualVal: Locator = this.page.locator(locator)
        await expect(actualVal).toHaveText(expectedVal)
    }

    // Use to verify element matched partial text
    async verifyEleContainsText(locator: string, text: string): Promise<void> {
        await this.waitForEleAttached(locator)
        await this.page.locator(locator).waitFor({state: 'visible'})
        await expect(this.page.locator(locator)).toContainText(text)
    }

    /* use to validate element attribute */
    async verifyEleAttribute(locator: string, attribute: string, value: string): Promise<void> {
        await this.waitForEleAttached(locator)
        const textValue: string = await this.page.getAttribute(locator, attribute) ?? ''
        expect(textValue.trim()).toBe(value)
    }

    async verifyTextVal(locator: Locator, value: string) {
        const actualVal: string = await locator.textContent() ?? ''
        expect(actualVal).toBe(value)
    }

    async verifyValuesOnly(actualValue: string, expectedValue: string) {
        expect(actualValue).toBe(expectedValue)
    }

    /* Use to validate element attribute contains partial text */
    async verifyAttributeByPartialMatch(locator: string, attribute: string, value: string): Promise<void> {
        await this.waitForEleAttached(locator)
        const textValue: string = await this.page.getAttribute(locator, attribute) ?? ''
        expect(textValue).toContain(value)
    }

    /* Use to check is element visible or not */
    async verifyEleIsVisible(locator: string): Promise<void> {
        await expect(this.page.locator(locator).first()).toBeVisible({ timeout: waitForEle })

    }

    /* Use to check is element enabled or not */
    async verifyEleIsEnabled(locator: string, errorMessage: string): Promise<void> {
        await expect(this.page.locator(locator)).toBeEnabled()

    }

    // Use to get user input from a text element
    async getEleText(locator: string, value: string): Promise<void> {
        await this.waitForEleAttached(locator)
        const textValue: string = await this.page.locator(locator).inputValue()
        expect(textValue).toBe(value)
    }

    // Use to enter text sequentially
    async enterEleTextSequentially(locator: string, value: string): Promise<void> {
        await this.waitForEleAttached(locator)
        await this.page.locator(locator).pressSequentially(value, { 'delay': 5 })
    }

    async enterEleTextByPlaceholder(locator: string, value: string): Promise<void> {
        await this.page.getByPlaceholder(locator).fill(value)
    }

    async enterEleTextByLabel(locator: string, value: string): Promise<void> {
        await this.page.getByLabel(locator).fill(value)
    }

    //Use to get text content of a locator by removing trailing spaces
    async getText(locator: string): Promise<string> {
        await this.waitForEleAttached(locator)
        const textVal: string = (await this.page.locator(locator).textContent()) ?? ''.trim()
        return textVal
    }

    //Use to get text content of a locator by removing all the spaces
    async getTextByRemovingSpaces(locator: string): Promise<string> {
        await this.waitForEleAttached(locator)
        const textVal: string = (await this.page.locator(locator).textContent()) ?? ''.replace('/\s+/g', '')
        return textVal
    }

    /* returns YYYY-MM-DD format date converted from string format */
    // async convertDateToISOFormat(locator: string): Promise<any> {
    //     await this.waitForEleAttached(locator);
    //     const dateString = await this.page.locator(locator).textContent();
    //     const dateObj = moment(dateString, 'MMMM DD, YYYY');
    //     const formattedDate = dateObj.format('YYYY-MM-DD');
    //     return formattedDate;
    // }

    /* Use to check if the element is not visible */
    async verifyElementIsNotVisible(locator: string): Promise<void> {
        const isVisible: boolean = await this.page.locator(locator).isVisible();
        expect(isVisible).toBeFalsy();
    }

    /* Use to validate element value */
    async verifyElementHasValue(locator: string, value: string): Promise<void> {
        await this.waitForEleAttached(locator);
        const textValue = this.page.locator(locator);
        expect(textValue).toHaveValue(value);
    }

    /* Use to check if the element is not checked */
    async verifyEleIsChecked(locator: string, errorMessage: string): Promise<void> {
        const isChecked: boolean = await this.page.locator(locator).isChecked();
        expect(isChecked).toBeTruthy();
    }

    /* Use to check if the element is not checked */
    async verifyEleIsNotChecked(locator: string, errorMessage: string): Promise<void> {
        const isChecked: boolean = await this.page.locator(locator).isChecked();
        expect(isChecked).toBeFalsy();
    }

    // Use to get count of the elements
    async getCount(locator: string): Promise<number> {
        await this.waitForEleAttached(locator);
        let count: number = await this.page.locator(locator).count();
        return count;
    }

    /* Use to check is element visible and returns the status */
    async returnEleVisibilityStatus(locator: string): Promise<boolean> {
        const flag: boolean = await this.page.locator(locator).isVisible();
        return flag;
    }

    async handleAlert(alertValue: string): Promise<void> {
        alertValue = alertValue.toLowerCase()
        if (alertValue == 'accept') {
            this.page.on('dialog', async (alert) => {
                await alert.accept()
            })
        } else {
            this.page.on('dialog', async (alert) => {
                await alert.dismiss()
            })
        }
    }

    async getFrames(locator: string): Promise<Frame[]> {
        await this.waitForEleAttached(locator)
        const allFrames: Frame[] = this.page.frames()
        return allFrames
    }

    async handleFrame(locator: string) {
        await this.waitForEleAttached(locator)
        const frame: FrameLocator = this.page.frameLocator(locator)
        return frame
    }

    async findEleByText(locator: string, action: string) {
        action.toLowerCase()
        const Locator: Locator = this.page.getByText(locator)
        if (action == 'click') {
            await Locator.click()
        }
    }

    async findEleByRole(role: 'button' | 'link' | 'heading' | 'checkbox', value: string) {
        return this.page.getByRole(role, { name: value })
    }

    element(locator: string): ChainableLocator {
        return new ChainableLocator(this.page.locator(locator), this)
    }

    async selectByRoleBtn(locator: string, productName: string, btnName: string): Promise<void> {
        await this.waitForEleAttached(locator)
        await this.page.locator(locator).filter({ hasText: productName }).getByRole('button', { name: btnName }).click()
    }

    async selectValueByText(locator: string, value: string, text: string): Promise<void> {
        await this.waitForEleAttached(locator)
        await this.page.locator(locator).filter({ hasText: value }).getByText(new RegExp(`^${text}$`, 'i')).click()
    }

    async filterEleByText(locator: string, text: string, action?: string) {
        await this.waitForEleAttached(locator)
        const Locator: Locator = this.page.locator(locator).filter({ hasText: text })
        if (action == 'click') {
            await Locator.click()
        }else {
            return Locator
        }
    }

    async getWindow1(page: Page, locator: string) {
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.locator(locator).click()
        ])
        return newPage
    }

    async getPagesDynamic(context: BrowserContext, page: Page, locator: string, timeout: number = 5000) {
        const existingPages = new Set(context.pages())
        const newPages: Page[] = []

        const pageHandler = (page: Page) => {
            if (!existingPages.has(page)) {
                newPages.push(page)
            }
        }
        context.on('page', pageHandler)
        try {
            await page.locator(locator).click()
            await page.waitForTimeout(timeout)
        } finally {
            context.off('page', pageHandler)
        }
    }

    async apiStatus(response: APIResponse) {
        await expect(response).toBeOK()
    }

    async verifyPageHasURL(url: string): Promise<void> {
        await expect(this.page).toHaveURL(url)
    }

    /**
     * Helper to generate a future date string.
     * Format: YYYY-MM-DDTHH:mm (e.g., 2027-12-12T10:00)
     * This is the standard format for <input type="datetime-local">.
     */
    static futureDateValue(daysInFuture: number = 30): string {
        const date = new Date()
        date.setDate(date.getDate() + daysInFuture)

        const yyyy = date.getFullYear()
        const mm = String(date.getMonth() + 1).padStart(2, '0')
        const dd = String(date.getDate()).padStart(2, '0')

        return `${yyyy}-${mm}-${dd}T10:00`
    }

    async waitForElementToDisappear(locator: string) {
        const ele = await this.page.locator(locator).first().isHidden({ timeout: waitForEle })
        expect(ele).toBeFalsy()
    }
}
