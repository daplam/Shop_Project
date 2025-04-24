import test from "@playwright/test";
import POManager from "../../src/pageObjects/POManager";
import { TOPOPTIONS } from "../../src/pageObjects/topMenuPage";
import UtilsUI from "../../src/utils/utilsUI";

let webContext

test.beforeAll(async ({ browser }) => {

    // Used when there are several keys on the storage or there are several data saved in different places

    //create context and new page
    const context = await browser.newContext()
    const page = await context.newPage()
    const utils = new UtilsUI(page)

    const loginMail = 'starwayheavengod@gmail.com'
    const password = 'Alejandro.123'

    //Make login
    await utils.userLogin({ email: loginMail, password: password })
    await context.storageState({ path: 'state.json' }) //create the file with the storage state info with the previous login
    webContext = await browser.newContext({ storageState: 'state.json' }) // create a new context with the json file that contains all the login storage
})

test('TC01 - Creating webbrowser context with json', async () => {

    const page = await webContext.newPage() // create a new page using the context with the session storage data injected with the json file

    const poManager = new POManager(page)
    const utils = new UtilsUI(page)
    await page.goto('https://rahulshettyacademy.com/client');

    const dashboardPage = poManager.getDashboardPage()
    const paymentMethodPage = poManager.getPaymentMethodPage()
    const myCartPage = poManager.getMyCartPage()
    const thankYouPage = poManager.getThankYouPage()
    const yourOrdersPage = poManager.getYourOrdersPage()


    const productName = 'ZARA COAT 3'
    await dashboardPage.addProduct({ productName: productName })
    await utils.selectTopMenuOption({ option: TOPOPTIONS.CART })
    await myCartPage.clickCheckout()
    const ccard = '4542 9931 9292 2293'
    await page.pause()

    await paymentMethodPage.fillPersonalInformation({ cardNo: ccard, cvv: '123', expireMonth: '06', expireYear: '25', cardName: 'Daniel' })
    await paymentMethodPage.fillShippingInformation({ country: 'India' })

    await paymentMethodPage.clickPlaceOrder()
    let orders = await thankYouPage.getOrdersId()
    await utils.selectTopMenuOption({ option: TOPOPTIONS.ORDERS })
    await yourOrdersPage.verifyOrder({ orderId: orders })
});

