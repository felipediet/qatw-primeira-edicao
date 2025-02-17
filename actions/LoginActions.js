import { expect } from "playwright/test";

export class LoginActions {

    constructor(page) {
        this.page = page;
    }

    async visitar() {
        await this.page.goto('http://paybank-mf-auth:3000/');
    }

    async preencherCPF(cpf) {
        await this.page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(cpf);
    }

    async clicarContinuar() {
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async preencherSenha(senha) {
        for (const digito of senha) {
            await this.page.getByRole('button', { name: digito }).click();
        }
    }

    async preenche2FA(codigo2FA) {
        await this.page.getByRole('textbox', { name: '000000' }).fill(codigo2FA);
        await this.page.getByRole('button', { name: 'Verificar' }).click();
    }

    async verificarSaldo() {
        return this.page.locator('#account-balance');
    }

}