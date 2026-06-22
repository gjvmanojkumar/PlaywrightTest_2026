import { expect, Locator, test } from '@playwright/test'

test('Place an order', async ({ page }) => {
    const url2: string = 'https://rahulshettyacademy.com/client/#/auth/login'
    const uName: string = "bruceWayne@gmail.com";
    const pwd: string = "BruceWayne123";

    const productName: string = 'iphone 13 pro'
    const country: string = ' India'
    let orderID: string = ''
    const userNameLoc: Locator = page.locator('#userEmail')
    const passwordLoc: Locator = page.locator('#userPassword')
    const btnSignIn: Locator = page.locator('[class*="login-btn"]')
    const products: Locator = page.locator('.card-body')
    const btnCart: Locator = page.locator('[routerlink="/dashboard/cart"]')
    const cartItemName: Locator = page.locator('.cartSection h3')
    const btnCheckout: Locator = page.locator('ul button[type="button"]')
    const nameOnCard: Locator = page.locator('//div[contains(text(),"Name on Card")]/following-sibling::input')
    const expiryDetails: Locator = page.locator('//div[contains(text(),"Expiry Date")]/following-sibling::select')
    const selectCountry: Locator = page.locator('input[placeholder="Select Country"]')
    const countryOptions: Locator = page.locator('section[class*="list-group"] button')
    const btnPlaceOrder: Locator = page.locator('a[class*="action__submit"]')
    const orderDetails: Locator = page.locator('tr.ng-star-inserted label')
    const ordersHistoryPage: Locator = page.locator('label[routerlink="/dashboard/myorders"]')
    const rows: Locator = page.locator('table tr.ng-star-inserted')
    const orderIDSummaryPge = page.locator('//small[contains(text(),"Order Id")]/following-sibling::div')

    //Sign-In
    await page.goto(url2)
    await userNameLoc.fill(uName)
    await passwordLoc.fill(pwd)
    await btnSignIn.click()

    await products.first().waitFor()
    await products.filter({hasText: productName}).getByRole('button', {name: 'Add To Cart'}).click()
    await btnCart.click()

    //Cart section page
    await page.locator('div li').first().waitFor()
    await expect(cartItemName).toHaveText(productName)
    await btnCheckout.click()
    await nameOnCard.fill('Sundar')

    // await expiryDetails.first().selectOption((Math.floor(Math.random() * 12) + 1).toString())
    // await expiryDetails.last().selectOption((Math.floor(Math.random() * 30)).toString())
    await selectCountry.pressSequentially('Ind')
    await countryOptions.first().waitFor()

    await countryOptions.filter({ 'hasText': country }).getByText(new RegExp(`^${country}$`, 'i')).click()
    await btnPlaceOrder.click()
    await expect(page.locator('h1')).toHaveText(' Thankyou for the order. ')
    orderID = (await orderDetails.textContent())!
    const id: string[] = orderID.split(' ')
    orderID = id[2]

    await ordersHistoryPage.click()
    await rows.first().waitFor()
    await rows.filter({hasText: orderID}).getByRole('button', {name: 'view'}).click()
    await expect(orderIDSummaryPge).toHaveText(orderID)
})
