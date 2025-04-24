import { expect, Locator, Page } from "@playwright/test"
import { emit } from "process"

class LoginPage {

    page: Page

    private readonly inputs: {
        email: Locator
        password: Locator
    }

    private readonly buttons: {
        login: Locator
        forgotPassword: Locator
        register: Locator
        dontHaveAccount: Locator
        alreadyHaveAccount: Locator
    }

    private readonly labels: {
        emailRequired: Locator
        passwordRequired: Locator
        incorrectLogin: Locator
    }

    private readonly toast: {
        loginSuccessfully: Locator
    }

    constructor(page: Page) {
        this.page = page

        this.inputs = {
            email: page.locator('#userEmail'),
            password: page.locator('#userPassword')
        }

        this.buttons = {
            login: page.locator('#login'),
            forgotPassword: page.getByRole('link', { name: 'Forgot password?' }),
            register: page.getByRole('link', { name: 'Register' }),
            dontHaveAccount: page.getByText("Don't have an account ? "),
            alreadyHaveAccount: page.getByText('Already have an account? ')
        }

        this.labels = {

            emailRequired: page.getByText('*Email is required'),
            passwordRequired: page.getByText('*Password is required'),
            incorrectLogin: page.getByLabel('Incorrect email or password.')
        }

        this.toast = {
            loginSuccessfully: page.getByLabel('Login Successfully')
        }
    }

    async loginSuccess({ email, password }: { email: string, password: string }): Promise<void> {
        await this.inputs.email.waitFor({ state: 'visible' })
        await this.inputs.email.fill(email)
        await this.inputs.password.fill(password)
        await this.clickLoginBtn()
        await expect(this.toast.loginSuccessfully).toBeVisible()
        await this.page.waitForLoadState('networkidle');
    }

    async loginIncorrect({ email, password }: { email?: string, password?: string }): Promise<void> {
        await this.inputs.email.waitFor({ state: 'visible' })
        if (email && !password) {
            await this.inputs.email.fill(email)
            await this.clickLoginBtn()
            await expect(await this.labels.passwordRequired).toBeVisible()
        }
        if (!email && password) {
            await this.inputs.password.fill(password)
            await this.clickLoginBtn()
            await expect(await this.labels.emailRequired).toBeVisible()
        }

        if (!email && !password) {
            await this.clickLoginBtn()
            await expect(await this.labels.emailRequired).toBeVisible()
            await expect(await this.labels.passwordRequired).toBeVisible()
        }

        if (email && password) {
            await this.inputs.email.fill(email)
            await this.inputs.password.fill(password)
            await this.clickLoginBtn()
            await expect(await this.labels.incorrectLogin).toBeVisible()
        }
    }

    async clickLoginBtn(): Promise<void> {
        await this.buttons.login.click()
    }

} export default LoginPage