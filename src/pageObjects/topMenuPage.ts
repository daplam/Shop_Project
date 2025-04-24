import { Locator, Page } from "@playwright/test"

export enum TOPOPTIONS {
    HOME = 'HOME',
    ORDERS = 'ORDERS',
    CART = 'CART',
    SIGN_OUT = 'SIGN OUT'
}

class TopMenu {

    page: Page

    private readonly buttons: {
        home: Locator
        orders: Locator
        cart: Locator
        signOut: Locator,
    }

    constructor(page: Page) {
        this.page = page
        this.buttons = {
            home: page.getByRole('button', { name: ' HOME ' }),
            orders: page.getByRole('button', { name: '  ORDERS' }),
            cart: page.getByRole('button', { name: '   Cart' }),
            signOut: page.getByRole('button', { name: ' Sign Out ' })
        }
    }

    async clickTopOption({ option }: { option: TOPOPTIONS }) {
        switch (option) {
            case TOPOPTIONS.HOME:
                await this.buttons.home.click()
                break;

            case TOPOPTIONS.ORDERS:
                await this.buttons.orders.click()
                break;

            case TOPOPTIONS.CART:
                await this.buttons.cart.click()
                break;

            case TOPOPTIONS.SIGN_OUT:
                await this.buttons.signOut.click()
                break;
        }
    }

} export default TopMenu