import { APIRequestContext } from "@playwright/test"

class UtilsAPI {

    apiContext: APIRequestContext
    loginPayload: {}
    urlLogin: string


    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext
        this.loginPayload = loginPayload
        this.urlLogin = 'https://rahulshettyacademy.com/api/ecom/auth/login'
    }

    async getToken() {
        // With this context, instead of pages like in web, here we have API calls.
        //Check the API and see the method
        // .post require URL, Data (the payload information sent to the endpoint)
        const loginResponse = await this.apiContext.post(this.urlLogin, // post give a response back, so we store it in variable loginResponse
            {
                data: this.loginPayload // login data
            }
        )
        //expect((loginResponse).ok()).toBeTruthy() // verify that we get status 200 (ok),
        const loginResponseJson = await loginResponse.json() // grab the json response in variable
        const token = loginResponseJson.token
        console.log(token)
        return token
    }

    async createOrder({ createOrderPayload }: { createOrderPayload: {} }) {
        let response: any = {} //js object, it allows to add properties
        response.token = await this.getToken() // add token property to response and assign token value
        // CREATE ORDER API
        const createOrderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: createOrderPayload,//receive the orderpayload ex. { orders: [{ country: "Armenia", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] }
                headers: {
                    'Authorization': response.token, // receive token value to Authorization
                    'Content-Type': 'application/json' // sometimes is needed to specify 'content-type'
                },
            })

        //expect((createOrderResponse).ok()).toBeTruthy() // verify that we get status 200 (ok),
        const createOrderResponseJson = await createOrderResponse.json() // grab the json response in variable
        console.log(createOrderResponseJson)
        const orderId = createOrderResponseJson.orders
        response.orderId = orderId // add orderId property to response and assign orderid value
        return response // return the object with token and orderid property/values
    }

} export default UtilsAPI