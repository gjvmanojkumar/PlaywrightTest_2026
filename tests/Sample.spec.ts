import { BrowserContext, expect, Page, test } from "@playwright/test";

let webContext: BrowserContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    const userNameLoc = page.locator('#username')
    const passwordLoc = page.locator('#password')

    await userNameLoc.fill('rahulshettyacademy')
    await passwordLoc.fill('Learning@830$3mK2')
    await page.locator('#signInBtn').click()
    await context.storageState({ path: 'state.json' })
    webContext = await browser.newContext({ storageState: 'state.json' })

})
test.skip('Sample Test', { tag: '@slow' }, async () => {
    const page = await webContext.newPage()

    const userNameLoc = page.locator('#username')
    const passwordLoc = page.locator('#password')
    const cardBodyLoc = page.locator('.card-body a')
    const docRequestLoc = page.locator('[href*="documents-request"]')
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/', { waitUntil: 'load' })
    await userNameLoc.fill('rahulshettyacademy')
    await passwordLoc.fill('Learning@830$3mK2')
    await page.locator('#signInBtn').click()
    await cardBodyLoc.first().waitFor({ state: 'visible' })
    const productTitles: string[] = await cardBodyLoc.allTextContents()
    console.log(productTitles);
})

test.skip('UI Elements Validation', async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const userNameLoc = page.locator('#username')
    const passwordLoc = page.locator('#password')
    const cardBodyLoc = page.locator('.card-body a')
    const docRequestLoc = page.locator('[href*="documents-request"]')
    const dropdownLoc = page.locator('select.form-control')

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/', { waitUntil: 'load' })
    await userNameLoc.fill('rahulshettyacademy')
    await passwordLoc.fill('Learning@830$3mK2')
    await dropdownLoc.selectOption('teach')

    await expect(docRequestLoc).toHaveAttribute('class', 'blinkingText')

    const [newPage]: [Page, void] = await Promise.all([
        context.waitForEvent('page'),
        docRequestLoc.click()
    ])
    const email = await newPage.locator('a[href*="mentor@"]').textContent()
    console.log(email);
})

test.skip('Order A Product', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/')
    await page.locator('#userEmail').fill('bruceWayne1@gmail.com')
    await page.locator('[type="password"]').fill('BruceWayne123@')
    await page.locator('#login').click()

    const cardBody = page.locator('.card-body')
    await cardBody.filter({ hasText: 'ADIDAS ORIGINAL' }).getByRole('button', { name: ' Add To Cart' }).click()
})

test("Practice Web Ele", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    page.on('dialog', (dialog) => dialog.accept())
    await page.locator('#alertbtn').click()

    await page.locator('#mousehover').hover()
    await page.locator('a:has-text("TOP")').click()

    const framePage = page.frameLocator('#courses-iframe')
    await framePage.locator('li a[href*="lifetime-access"]:visible').click()
    const header = framePage.getByRole('heading', { name: "Join 13,522 Happy Subscibers!" })
    await expect(header).toBeVisible()
    console.log(await framePage.locator('div h2 span').innerText());
})