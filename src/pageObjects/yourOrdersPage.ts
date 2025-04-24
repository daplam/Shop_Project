import { expect, Locator, Page } from "@playwright/test";

class YourOrdersPage {

    page: Page

    private readonly buttons: {
        view: Locator
        delete: Locator
        goBackShop: Locator
        goBackCart: Locator
    }

    constructor(page: Page) {
        this.page = page

        this.buttons = {
            view: page.getByRole('button'),
            delete: page.getByRole('button'),
            goBackShop: page.getByRole('button', { name: 'Go Back to Shop' }),
            goBackCart: page.getByRole('button', { name: 'Go Back to Cart' })
        }
    }

    async clickGoBackToShop() {
        await this.buttons.goBackShop.click()
    }

    async clickGoBackToCart() {
        await this.buttons.goBackCart.click()
    }

    async verifyOrder({ orderId }: { orderId: any }) {
        await this.page.getByRole('heading', { name: 'Your Orders' }).waitFor()
        let arr: string[] = await this.getOrders()
        console.log('Orders list: ' + arr)
        //console.log(orderId)
        await expect(arr).toEqual(expect.arrayContaining(orderId)); // compare if the orders sent exist in all the orders list (arr)

        /* 
        const tableBody = await this.page.locator('tbody')
         const tableRows = await tableBody.locator('tr')
         const totalRows = await tableRows.count()
         console.log('Total rows: ' + totalRows)
        
        for (let i = 0; i < totalRows; i++) {
             const rowContents = await tableRows.nth(i).locator('td')
             const rowOrder = await tableRows.nth(i).locator('th')
             arr = (await rowOrder[i])
             console.log('Row order:<' + await rowOrder.textContent() + '>')
             if (orderId == (await rowOrder.textContent())) {
                 // expect(await rowContents.nth(1).textContent()).toEqual(productName)
                 console.log(await rowContents.nth(1).textContent())
                 //break
             }
 
         }
         console.log('arr: ' + arr)*/

    }

    async getOrders() {
        await this.page.getByRole('heading', { name: 'Your Orders' }).waitFor()

        const tableBody = await this.page.locator('tbody')
        const tableRows = await tableBody.locator('tr')
        const totalRows = await tableRows.count()
        //console.log('Total rows: ' + totalRows)

        let arr: string[] = []

        return arr = [...await tableRows.locator('th').allInnerTexts()]

        //option 2
        /* if (tableBody) {
             for (let i = 0; i < totalRows; i++) {
                 const rowOrder = await tableRows.locator('th')
                 //arr.push(rowOrder[i].textContent)
                 arr.push(await rowOrder.nth(i).innerText())
             }
         }*/
    }

    async viewOrder({ orderId }: { orderId: any }) {
        await this.page.getByRole('heading', { name: 'Your Orders' }).waitFor()


        const tableBody = await this.page.locator('tbody')
        const tableRows = await tableBody.locator('tr')
        const totalRows = await tableRows.count()
        //console.log('Total rows: ' + totalRows)
        //console.log(orderId)


        for (let i = 0; i < totalRows; i++) {
            const rowContents = await tableRows.nth(i).locator('td')
            const rowOrder = await tableRows.nth(i).locator('th')
            //console.log('Row order:<' + await rowOrder.textContent() + '>')
            if (orderId == (await rowOrder.textContent())) {
                //console.log(await rowContents.nth(1).textContent())
                //console.log('Row order:<' + await rowOrder.textContent() + '>')
                this.buttons.view = rowContents.nth(4).getByText('View')
                break
            }
        }
        await this.buttons.view.click()

    }

    async deleteOrder({ orderId }: { orderId: any }) {
        await this.page.getByRole('heading', { name: 'Your Orders' }).waitFor()

        const tableBody = await this.page.locator('tbody')
        const tableRows = await tableBody.locator('tr')
        const totalRows = await tableRows.count()
        console.log('Total rows: ' + totalRows)
        console.log(orderId)

        for (let i = 0; i < totalRows; i++) {
            const rowContents = await tableRows.nth(i).locator('td')
            const rowOrder = await tableRows.nth(i).locator('th')
            //console.log('Row order:<' + await rowOrder.textContent() + '>')
            if (orderId == (await rowOrder.textContent())) {
                console.log(await rowContents.nth(1).textContent())
                console.log('Row order:<' + await rowOrder.textContent() + '>')
                this.buttons.delete = rowContents.nth(5).getByText('Delete')
                break
            }
        }
        await this.buttons.delete.click()
        await expect(await this.page.getByLabel('Orders Deleted Successfully')).toBeVisible()
    }

} export default YourOrdersPage