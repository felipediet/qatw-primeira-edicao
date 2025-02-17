import { expect } from "playwright/test";

export class DashPage {

    constructor(page) {
        this.page = page;
    }

    async verificarSaldo() {
        return this.page.locator('#account-balance');
    }
}