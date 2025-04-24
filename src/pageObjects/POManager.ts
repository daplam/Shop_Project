import { Page } from "@playwright/test";
import LoginPage from "./loginPage";
import DashboardPage from "./dashboardPage";
import PaymentMethodPage from "./paymentMethodPage";
import MyCartPage from "./myCartPage";
import TopMenu from "./topMenuPage";
import ThankYouPage from "./thankYouOrderPage";
import YourOrdersPage from "./yourOrdersPage";
import ViewProductPage from "./viewProductPage";
import OrderSummaryPage from "./orderSummaryPage";

class POManager {

    page: Page
    loginPage: LoginPage;
    dashboardPage: DashboardPage
    paymentMethodPage: PaymentMethodPage
    myCartPage: MyCartPage
    topMenu: TopMenu
    thankYouPage: ThankYouPage
    yourOrderPage: YourOrdersPage
    viewProductPage: ViewProductPage
    orderSummaryPage: OrderSummaryPage

    constructor(page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.dashboardPage = new DashboardPage(this.page)
        this.paymentMethodPage = new PaymentMethodPage(this.page)
        this.myCartPage = new MyCartPage(this.page)
        this.topMenu = new TopMenu(this.page)
        this.thankYouPage = new ThankYouPage(this.page)
        this.yourOrderPage = new YourOrdersPage(this.page)
        this.viewProductPage = new ViewProductPage(this.page)
        this.orderSummaryPage = new OrderSummaryPage(this.page)
    }

    getLoginPage() {
        return this.loginPage
    }

    getDashboardPage() {
        return this.dashboardPage
    }

    getPaymentMethodPage() {
        return this.paymentMethodPage
    }

    getMyCartPage() {
        return this.myCartPage
    }

    getTopMenu() {
        return this.topMenu
    }

    getThankYouPage() {
        return this.thankYouPage
    }

    getYourOrdersPage() {
        return this.yourOrderPage
    }

    getViewProductPage() {
        return this.viewProductPage
    }

    getOrderSummaryPage() {
        return this.orderSummaryPage
    }
} export default POManager