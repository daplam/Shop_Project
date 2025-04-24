import test from "@playwright/test";
import POManager from "../../src/pageObjects/POManager";
import { TOPOPTIONS } from "../../src/pageObjects/topMenuPage";
import UtilsUI from "../../src/utils/utilsUI";


test('TC01 - Empty cart', async ({ page }) => {
    const poManager = new POManager(page)
    const myCartPage = poManager.getMyCartPage()
    const topMenu = poManager.getTopMenu()

    const utils = new UtilsUI(page)
    const loginMail = 'starwayheavengod@gmail.com'
    const password = 'Alejandro.123'
    await utils.userLogin({ email: loginMail, password: password })
    await topMenu.clickTopOption({ option: TOPOPTIONS.CART })
    await myCartPage.verifyCart()

});

test('TC02 - Complete order - 1 Product', async ({ page }) => {
    const poManager = new POManager(page)
    const utils = new UtilsUI(page)

    const dashboardPage = poManager.getDashboardPage()
    const paymentMethodPage = poManager.getPaymentMethodPage()
    const myCartPage = poManager.getMyCartPage()
    const thankYouPage = poManager.getThankYouPage()
    const yourOrdersPage = poManager.getYourOrdersPage()

    const loginMail = 'starwayheavengod@gmail.com'
    const password = 'Alejandro.123'

    await utils.userLogin({ email: loginMail, password: password })
    const productName = 'ZARA COAT 3'
    await dashboardPage.addProduct({ productName: productName })
    await utils.selectTopMenuOption({ option: TOPOPTIONS.CART })
    await myCartPage.clickCheckout()
    const ccard = '4542 9931 9292 2293'

    await paymentMethodPage.fillPersonalInformation({ cardNo: ccard, cvv: '123', expireMonth: '06', expireYear: '25', cardName: 'Daniel' })
    await paymentMethodPage.fillShippingInformation({ country: 'India' })

    await paymentMethodPage.clickPlaceOrder()
    let orders = await thankYouPage.getOrdersId()
    await utils.selectTopMenuOption({ option: TOPOPTIONS.ORDERS })
    await yourOrdersPage.verifyOrder({ orderId: orders })
});


test('TC03 - Complete order - 2 Products', async ({ page }) => {
    const poManager = new POManager(page)
    const utils = new UtilsUI(page)

    const dashboardPage = poManager.getDashboardPage()
    const paymentMethodPage = poManager.getPaymentMethodPage()
    const myCartPage = poManager.getMyCartPage()
    const thankYouPage = poManager.getThankYouPage()
    const yourOrdersPage = poManager.getYourOrdersPage()

    const loginMail = 'starwayheavengod@gmail.com'
    const password = 'Alejandro.123'
    const productName = 'ZARA COAT 3'
    const productName2 = 'ADIDAS ORIGINAL'

    await utils.userLogin({ email: loginMail, password: password })


    await dashboardPage.addProduct({ productName: productName })
    await dashboardPage.addProduct({ productName: productName2 })

    await utils.selectTopMenuOption({ option: TOPOPTIONS.CART })

    await myCartPage.clickCheckout()

    const ccard = '4542 9931 9292 2293'

    await paymentMethodPage.fillPersonalInformation({ cardNo: ccard, cvv: '123', expireMonth: '06', expireYear: '25', cardName: 'Daniel' })
    await paymentMethodPage.fillShippingInformation({ country: 'India' })

    await paymentMethodPage.clickPlaceOrder()
    let orders = await thankYouPage.getOrdersId()
    await utils.selectTopMenuOption({ option: TOPOPTIONS.ORDERS })
    await page.pause()

    await yourOrdersPage.verifyOrder({ orderId: orders })
});


test('TC04 - Get orders', async ({ page }) => {
    const poManager = new POManager(page)
    const utilsUI = new UtilsUI(page)
    const yourOrdersPage = poManager.getYourOrdersPage()

    const loginMail = 'starwayheavengod@gmail.com'
    const password = 'Alejandro.123'
    await utilsUI.userLogin({ email: loginMail, password: password })

    await utilsUI.selectTopMenuOption({ option: TOPOPTIONS.ORDERS })
    const allOrders = await yourOrdersPage.getOrders()
    console.log(allOrders)

});