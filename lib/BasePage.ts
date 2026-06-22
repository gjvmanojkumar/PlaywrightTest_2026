import { BrowserContext, Page } from "@playwright/test";

export class BasePage {
    protected context: BrowserContext
    protected page!: Page

    constructor(context: BrowserContext){
        this.context = context
    }

    // Initialize the page
    async initPage() {
        this.page = await this.context.newPage()
    }
}