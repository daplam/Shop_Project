import test from "@playwright/test";
import POManager from "../../src/pageObjects/POManager";
import UtilsUI from "../../src/utils/utilsUI";


test('TC01 - Login successfully', async ({ page }) => {

    //const poManager = new POManager(page)
    //const loginPage = poManager.getLoginPage()
    const utils = new UtilsUI(page)

    const loginMail = 'starwayheavengod@gmail.com'
    const password = 'Alejandro.123'

    await utils.userLogin({ email: loginMail, password: password })

});

test('TC02 - Missing password', async ({ page }) => {
    const utils = new UtilsUI(page)
    const loginMail = 'starwayheavengod@gmail.com'
    const password = ''

    await utils.incorrectLogin({ email: loginMail, password: password })

});

test('TC03 - Missing Email', async ({ page }) => {
    const utils = new UtilsUI(page)

    const loginMail = ''
    const password = 'Alejandro.123'

    await utils.incorrectLogin({ email: loginMail, password: password })

});

test('TC04 - Incorrect password/email', async ({ page }) => {

    const utils = new UtilsUI(page)
    const loginMail = 'test@test.com'
    const password = 'test'

    await utils.incorrectLogin({ email: loginMail, password: password })

});