import { expect, Locator, Page } from "@playwright/test"

class DashboardPage {

    page: Page
    card: Locator
    sideOptions: Locator

    private readonly products: {
        productName: Locator
        productPrice: Locator
        viewBtn: Locator
        addToCartBtn: Locator
    }

    private readonly buttons: {
        viewBtn: Locator,
        addToCartBtn: Locator
    }

    private readonly inputs: {
        searchFilter: Locator
        minPrice: Locator
        maxPrice: Locator
    }

    public readonly checkboxCategories: {
        fashion: Locator
        electronics: Locator
        household: Locator
    }

    private readonly checkboxSubCategories: {
        tshirts: Locator
        shirts: Locator
        shoes: Locator
        mobiles: Locator
        laptops: Locator
    }

    private readonly checkboxSearchFor: {
        men: Locator
        women: Locator
    }

    private readonly toast: {
        addedToCart: Locator
    }

    constructor(page: Page) {
        this.page = page
        this.card = page.locator('.card-body')
        this.sideOptions = page.locator('#sidebar div')

        this.buttons = {
            viewBtn: page.getByRole('button', { name: 'View' }),
            addToCartBtn: page.getByRole('button', { name: ' Add To Cart' })
        }

        this.inputs = {
            searchFilter: page.getByPlaceholder('search'),
            minPrice: page.getByPlaceholder('Min Price'),
            maxPrice: page.getByPlaceholder('Max Price')
        }

        this.checkboxCategories = {
            fashion: this.sideOptions.getByText('fashion').locator("//preceding-sibling::input"),
            electronics: this.sideOptions.getByText('electronics').locator("//preceding-sibling::input"),
            household: this.sideOptions.getByText('household').locator("//preceding-sibling::input")
        }

        this.checkboxSubCategories = {
            tshirts: this.sideOptions.getByText('tshirts').locator("//preceding-sibling::input"),
            shirts: this.sideOptions.getByText('shirts').locator("//preceding-sibling::input"),
            shoes: this.sideOptions.getByText('shoes').locator("//preceding-sibling::input"),
            mobiles: this.sideOptions.getByText('mobiles').locator("//preceding-sibling::input"),
            laptops: this.sideOptions.getByText('laptops').locator("//preceding-sibling::input")
        }

        this.checkboxSearchFor = {
            men: this.sideOptions.getByText('men').locator("//preceding-sibling::input"),
            women: this.sideOptions.getByText('women').locator("//preceding-sibling::input"),
        }

        this.toast = {
            addedToCart: page.getByLabel('Product Added To Cart')
        }
    }

    async addProduct({ productName }: { productName: string }) {

        const allProducts = await this.card.locator('b').allInnerTexts()
        //console.log(allProducts)
        // if (allProducts.includes(productName)) {
        await this.card.filter({ hasText: productName }).getByRole('button', { name: ' Add To Cart' }).click()
        await expect(this.toast.addedToCart).toBeVisible()
    }

} export default DashboardPage