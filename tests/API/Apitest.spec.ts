import test, { expect, request } from "@playwright/test";
import POManager from "../../src/pageObjects/POManager";
import UtilsUI from "../../src/utils/utilsUI";
import { TOPOPTIONS } from "../../src/pageObjects/topMenuPage";
import UtilsAPI from "../../src/utils/utilsAPI";
const loginPayload = { userEmail: "starwayheavengod@gmail.com", userPassword: "Alejandro.123" } // created as javascript object
const createOrderPayload = { orders: [{ country: "Armenia", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] }
// with request object, it allows to call apis

let response

test.beforeAll(async () => { // all inside, will be executed before all tests 1 time

    //LOGIN API
    const apiContext = await request.newContext() // it is similar to start 'browser' for web
    const utilsAPI = new UtilsAPI(apiContext, loginPayload) // create instace from utils class and send the apicontext and loginpayload to the constructor, to have them available in all class
    response = await utilsAPI.createOrder({ createOrderPayload: createOrderPayload }) // assign the return value from the method (method is returning Response object)
})


test('Create order', async ({ page }) => {
    const poManager = new POManager(page)
    const utils = new UtilsUI(page)

    const yourOrdersPage = poManager.getYourOrdersPage()
    const orderSummaryPage = poManager.getOrderSummaryPage()

    //to insert the token, its needed to execute a JS code, due PW is not able to do it
    //pw is able to execute JS expressions with 'addInitScript' method
    //pass the argument 'value' 
    await page.addInitScript(value => { // addinit has 2 arguments, 1st is the anonymous function
        //insert in the local storage
        window.localStorage.setItem('token', value); // 'token' is the key value in the local storage browser, value is get from 2nd argument token
    }, response.token) // token is the 2nd argument, sent to Setitem to value

    await page.goto('https://rahulshettyacademy.com/client');

    await utils.selectTopMenuOption({ option: TOPOPTIONS.ORDERS })

    await yourOrdersPage.viewOrder({ orderId: response.orderId })
    await orderSummaryPage.verifyOrderSummary({ order: response.orderId })


});