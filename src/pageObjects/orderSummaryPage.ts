import { expect, Locator, Page } from "@playwright/test"

class OrderSummaryPage {
    page: Page

    private readonly labels: {
        thankYouForShopping: Locator
        orderSummaryTitle: Locator
        orderId: Locator
    }

    private readonly buttons: {
        viewOrders: Locator
    }

    constructor(page: Page) {
        this.page = page

        this.labels = {
            thankYouForShopping: page.getByText('Thank you for Shopping With Us'),
            orderSummaryTitle: page.getByText(' order summary '),
            orderId: page.getByText('Order Id').locator("//following-sibling::div")
        }

        this.buttons = {
            viewOrders: page.getByText('View Orders')
        }
    }

    async verifyOrderSummary({ order }: { order: string }) {
        await this.labels.orderSummaryTitle.waitFor()
        await expect(this.labels.orderId).toHaveText(order)
    }
} export default OrderSummaryPage