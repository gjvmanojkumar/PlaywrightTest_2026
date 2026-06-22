import { Locator, Page, request, test } from '@playwright/test'
import { user } from '../pages/smallPractice'

async function getAttributeForElements(page: Page, locator: string, attribute: string): Promise<Set<string>> {
    await page.waitForLoadState('load')
    const elements: Locator[] = await page.locator(locator).all()
    const values = new Set<string>()
    for (const ele of elements) {
        let attr = await ele.getAttribute(attribute)
        values.add(attr ?? '')
    }
    return values
}

async function getRequest(url: string) {
    const apiContext = await request.newContext()
    const apiResponse = await apiContext.get(url)
    if (apiResponse.status() > 400) {
        console.log(`Broken links or images are: ${url}`);
    }
}

test('Find broken links on the page', async ({ page }) => {
    const brokenLinksPage = 'https://rahulshettyacademy.com/AutomationPractice/'
    await page.goto(brokenLinksPage)
    let allHrefs = await getAttributeForElements(page, '//a', 'href')
    let uniqueURLs = [...allHrefs].filter(link => link !== '' && !link.startsWith('#') && !link.startsWith('mailto') && link.startsWith('https'))
    for (const uniqueURL of uniqueURLs) {
        await getRequest(uniqueURL)
    }
})

test('Find broken images', async ({ page }) => {
    const brokenImgsPage = 'https://the-internet.herokuapp.com/broken_images'
    await page.goto(brokenImgsPage)
    const uniqueImgs = await getAttributeForElements(page, '//img', 'src')
    let imgs = [...uniqueImgs].filter(src => src.length > 1)    // Sometimes the src might be zero, for any url to load it should be greater than 1. So we applied filter
    for (const img of imgs) {
        await getRequest(`https://the-internet.herokuapp.com/${img}`)
    }
})
