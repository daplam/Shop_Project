import { Locator, Page } from "@playwright/test";
import TopMenu, { TOPOPTIONS } from "./topMenuPage";

class ThankYouPage extends TopMenu {
    page: Page
    orderNum: Locator

    constructor(page: Page) {
        super(page);
        this.page = page
        this.orderNum = page.locator('label.ng-star-inserted')
    }

    async getOrdersId() {
        await this.page.getByRole('heading', { name: ' Thankyou for the order. ' }).waitFor()
        let ordersId: string[] = await this.orderNum.allInnerTexts()
        ordersId = ordersId.map(acc => acc.replaceAll('|', '').trim())
        return ordersId
    }

} export default ThankYouPage