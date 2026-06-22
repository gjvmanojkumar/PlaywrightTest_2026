import { test, expect } from "../../lib/fixture";
import data from "../../testData/sit.config.json"

test.describe('Login Page Test', () => {
    test.beforeEach('Navigation', async ({ loginPage }) => {
        await loginPage.navigateToURL()
    })

    test('Verify Login', async ({ loginPage }) => {
        await loginPage.enterLoginDetails(data.users.user1.userName, data.users.user1.password)
    })
})