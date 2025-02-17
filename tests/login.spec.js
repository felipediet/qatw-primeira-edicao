import { test, expect } from '@playwright/test';
import { obterCodigo2FA } from '../support/db';
import { LoginPage } from '../pages/LoginPage';
import { DashPage } from '../pages/DashPage';
import { LoginActions } from '../actions/LoginActions';
import { getJob, cleanJobs, cleanCompletedJobs } from '../support/redis';

test('Não deve logar quando o código de autenticação é inválido', async ({ page }) => {
  
  const loginPage = new LoginPage(page);
  
  const user = {
    cpf: '00000014141',
    senha: '147258'
  }

  await loginPage.visitar();

  await loginPage.preencherCPF(user.cpf);
  await loginPage.clicarContinuar();

  await loginPage.preencherSenha(user.senha);
  await loginPage.clicarContinuar();

  await loginPage.preenche2FA('123456');
  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});


test('Deve acessar a conta do usuário - REDIS', async ({ page }) => {
  
  const loginPage = new LoginPage(page);
  const dashPage = new DashPage(page);

  const user = {
    cpf: '00000014141',
    senha: '147258'
  }

  await cleanJobs();

  await loginPage.visitar();

  await loginPage.preencherCPF(user.cpf);
  await loginPage.clicarContinuar();

  await loginPage.preencherSenha(user.senha);

  await loginPage.clicarContinuar();

  await page.getByRole('heading', { name: 'Verificação em duas etapas' }).waitFor({timeout: 3000});

  //Consulta no REDIS o código 2FA
  const codigo = await getJob();
  await loginPage.preenche2FA(codigo);

  //Consulta no Banco o código 2FA
  // const codigo2FA = await obterCodigo2FA(usuario.cpf);  
  // await loginPage.preenche2FA(codigo2FA);

  await expect(await dashPage.verificarSaldo()).toHaveText('R$ 5.000,00');
});


test('Deve acessar a conta do usuário - BANCO', async ({ page }) => {
  
  const loginPage = new LoginPage(page);
  const dashPage = new DashPage(page);

  const user = {
    cpf: '00000014141',
    senha: '147258'
  }

  await loginPage.visitar();

  await loginPage.preencherCPF(user.cpf);
  await loginPage.clicarContinuar();

  await loginPage.preencherSenha(user.senha);

  await loginPage.clicarContinuar();

  await page.getByRole('heading', { name: 'Verificação em duas etapas' }).waitFor({timeout: 3000});

  //Consulta no REDIS o código 2FA
  // const codigo = await getJob();
  // await loginPage.preenche2FA(codigo);

  //Consulta no Banco o código 2FA
  const codigo2FA = await obterCodigo2FA(user.cpf);  
  await loginPage.preenche2FA(codigo2FA);

  await expect(await dashPage.verificarSaldo()).toHaveText('R$ 5.000,00');
});


test('Deve acessar a conta do usuário - Actions', async ({ page }) => {
  
  const loginActions = new LoginActions(page);
 
   const user = {
     cpf: '00000014141',
     senha: '147258'
   }
 
   await loginActions.visitar();
 
   await loginActions.preencherCPF(user.cpf);
   await loginActions.clicarContinuar();
 
   await loginActions.preencherSenha(user.senha);
 
   await loginActions.clicarContinuar();
 
   //Checkpoint
   await page.getByRole('heading', { name: 'Verificação em duas etapas' }).waitFor({timeout: 3000});
 
   const codigo2FA = await obterCodigo2FA(user.cpf);
   await loginActions.preenche2FA(codigo2FA);
 
   await expect(await loginActions.verificarSaldo()).toHaveText('R$ 5.000,00');
});
 
