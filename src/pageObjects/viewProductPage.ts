import { Locator, Page } from "@playwright/test"
import TopMenu from "./topMenuPage"

class ViewProductPage {

    page: Page

    private readonly buttons: {
        addToCart: Locator
        continueShopping: Locator
    }

    private readonly productDetails: {
        productName: Locator
        productPrice: Locator
    }

    private readonly toast: {
        addedToCart: Locator
    }

    constructor(page: Page) {
        this.page = page

        this.buttons = {
            addToCart: page.getByRole('button', { name: 'Add to Cart' }),
            continueShopping: page.getByRole('link', { name: 'Continue Shopping❯' })
        }

        this.toast = {
            addedToCart: page.getByLabel('Product Added To Cart')
        }
    }

    async clickAddToCart(): Promise<void> {
        await this.buttons.addToCart.click()
    }

    async clickContinueShopping(): Promise<void> {
        await this.buttons.continueShopping.click()
    }

} export default ViewProductPage