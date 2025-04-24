import { Page } from "@playwright/test";
import POManager from "../pageObjects/POManager";
import TopMenu, { TOPOPTIONS } from "../pageObjects/topMenuPage";

class UtilsUI {

    page
    poManager: POManager

    constructor(page) {
        this.page = page
        this.poManager = new POManager(this.page)
    }

    async userLogin({ email, password }: { email: string, password: string }) {

        const loginPage = this.poManager.getLoginPage()
        await this.page.goto('https://rahulshettyacademy.com/client')
        await loginPage.loginSuccess({ email: email, password: password })
    }

    async incorrectLogin({ email, password }: { email: string, password: string }) {
        const loginPage = this.poManager.getLoginPage()
        await this.page.goto('https://rahulshettyacademy.com/client')
        await loginPage.loginIncorrect({ email: email, password: password })

    }

    async selectTopMenuOption({ option }: { option: TOPOPTIONS }) {
        const topMenu = this.poManager.getTopMenu()
        await topMenu.clickTopOption({ option: option })
    }
} export default UtilsUI








