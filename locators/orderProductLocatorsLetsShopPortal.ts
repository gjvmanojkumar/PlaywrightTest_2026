export const OrderProductLocators = {
    products : '.card-body',
    addToCartBtn : 'button i[class$:"fa-shopping-cart"]',
    cartBtn : '[routerlink="/dashboard/cart"]',
    cartItemName : '.cartSection h3',
    checkoutBtn : 'ul button[type="button"]',
    nameOnCard : '//div[contains(text(),"Name on Card")]/following-sibling::input',
    expiryDetails : '//div[contains(text(),"Expiry Date")]/following-sibling::select',
    selectCountry : 'input[placeholder="Select Country"]',
    countryOptions : 'section[class*="list-group"] button',
    placeOrderBtn : 'a[class*="action__submit"]',
    orderDetails : 'tr.ng-star-inserted label',
    orderHistoryPage : 'label[routerlink="/dashboard/myorders"]',
    rowsLocator : 'table tr.ng-star-inserted',
    orderIDSummaryPage : '//small[contains(text(),"Order Id")]/following-sibling::div',
    productTitle : 'td[class$= "m-3"] div.title'
}as const