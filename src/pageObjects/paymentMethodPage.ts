import { Locator, Page } from "@playwright/test"

class PaymentMethodPage {

    page: Page

    private readonly personalInformation: {
        inputCreditCard: Locator
        inputCvv: Locator
        inputNameCard: Locator
        inputApplyCoupon: Locator
        dropdExpireMonth: Locator
        dropdExpireDay: Locator
        btnApplyCoupon: Locator
    }

    private readonly shippingInformation: {
        inputemail: Locator
        inputCountry: Locator
        btnPlaceOrder: Locator
        label: Locator
    }

    constructor(page: Page) {
        this.page = page

        this.personalInformation = {
            inputCreditCard: page.getByText('Credit Card Number ').locator("//following-sibling::input"),
            inputCvv: page.getByText('CVV Code ').locator("//following-sibling::input"),
            inputNameCard: page.getByText('Name on Card ').locator("//following-sibling::input"),
            inputApplyCoupon: page.locator("//input[@name='coupon]"), // page.locator('input[name="coupon"]')
            dropdExpireMonth: page.getByText('Expiry Date ').locator('//following-sibling::select[1]'),
            dropdExpireDay: page.getByText('Expiry Date ').locator('//following-sibling::select[2]'),
            btnApplyCoupon: page.getByRole('button', { name: 'Apply Coupon' })
        }

        this.shippingInformation = {
            inputemail: page.locator('.details__user').locator("//input[@type='text']"),
            inputCountry: page.getByPlaceholder('Select Country'),
            btnPlaceOrder: page.getByText('Place Order'),
            label: page.locator('.details__user').locator('label')
        }
    }

    async fillPersonalInformation({ cardNo, cvv, expireMonth, expireYear, cardName, coupon }:
        { cardNo: string, cvv: string, expireMonth: string, expireYear: string, cardName: string, coupon?: string }): Promise<void> {

        await this.personalInformation.inputCreditCard.fill(cardNo)
        await this.personalInformation.inputCvv.fill(cvv)
        await this.personalInformation.dropdExpireMonth.selectOption(expireMonth)
        await this.personalInformation.dropdExpireDay.selectOption(expireYear)
        await this.personalInformation.inputNameCard.fill(cardName)

        if (coupon) {
            await this.personalInformation.inputApplyCoupon.fill(coupon)
            await this.personalInformation.btnApplyCoupon.click()
        }
    }

    async fillShippingInformation({ email, country }: { email?: string, country: string }) {

        if (email) {
            await this.shippingInformation.inputemail.selectText()
            await this.shippingInformation.inputemail.fill(email)
        }

        await this.shippingInformation.inputCountry.pressSequentially(country)
        await this.page.locator(country).isVisible()
        this.page.getByText(country, { exact: true }).click()
    }

    async clickPlaceOrder() {
        await this.shippingInformation.btnPlaceOrder.isEnabled()
        await this.page.locator('.ta-results').isHidden()
        await this.shippingInformation.btnPlaceOrder.click()
    }

} export default PaymentMethodPage