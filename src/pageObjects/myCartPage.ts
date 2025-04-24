import { expect, Locator, Page } from "@playwright/test"

class MyCartPage {

    page: Page
    card: Locator

    private readonly buttons: {
        continueShopping: Locator
        buyNow: Locator
        delete: Locator
        checkout: Locator
    }

    private readonly labels: {
        noProducts: Locator
    }

    private readonly toast: {
        noProductInCart: Locator
    }

    constructor(page: Page) {
        this.page = page
        this.card = page.locator('.infoWrap')

        this.buttons = {
            continueShopping: page.getByRole('button', { name: 'Continue Shopping' }),
            buyNow: page.getByRole('button', { name: 'Buy Now' }),
            delete: page.getByRole('button', { name: '❯', exact: true }),
            checkout: page.getByRole('button', { name: 'Checkout❯' })
        }

        this.labels = {
            noProducts: page.getByRole('heading', { name: 'No Products in Your Cart !' })
        }

        this.toast = {
            noProductInCart: page.getByLabel('No Product in Your Cart')
        }
    }

    async clickBuyNow(): Promise<void> {
        await this.buttons.buyNow.waitFor()
        await this.buttons.buyNow.click()
    }

    async clickDeleteItem(): Promise<void> {
        await this.buttons.delete.waitFor()
        await this.buttons.delete.click()
    }

    async clickCheckout(): Promise<void> {
        await this.buttons.checkout.waitFor({ state: 'visible' })
        await this.buttons.checkout.click()
    }

    async clickContinueShopping(): Promise<void> {
        await this.buttons.continueShopping.waitFor()
        await this.buttons.continueShopping.click()
    }

    async verifyCart() {
        await this.page.getByRole('heading', { name: 'My Cart' }).waitFor()

        try {
            await expect(await this.labels.noProducts).toBeVisible()
            console.log(await this.labels.noProducts.textContent())
        } catch (e) {
            console.log('No view')
        }
        await this.page.pause()
    }

} export default MyCartPage
