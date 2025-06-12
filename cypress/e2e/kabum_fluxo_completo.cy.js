// cypress/e2e/kabum_fluxo_completo.cy.js

require('cypress-xpath');

describe('Fluxo completo de compra e remoção no Kabum', () => {
  const email = 'ericklucena2020@gmail.com'
  const senha = '@Teste123'

  beforeEach(() => {
    cy.visit('https://www.kabum.com.br/login?redirect_uri=https://www.kabum.com.br/ofertas/matchdeofertas')

    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Aceitar")').length) {
        cy.contains('button', 'Aceitar').click({ force: true })
      }
    })
  })

  it('Realiza login, compra e remove item do carrinho', () => {
   
    //Insere e-mail
    cy.get('input[name="login"]').type(email)
    
    //Insere a senha
    cy.get('input[name="password"]').type(senha)
    
    //Clica em "Entrar"
    cy.get('button[type="submit"]').contains('ENTRAR').click()

    cy.url({ timeout: 10000 }).should('include', '/ofertas/matchdeofertas')
    
    cy.visit('https://www.kabum.com.br/produto/621162/ssd-kingston-nv3-1-tb-m-2-2280-pcie-4-0-x4-nvme-leitura-6000-mb-s-gravacao-4000-mb-s-azul-snv3s-1000g')

    //Clica no botão de adicionar ao arrinho
    cy.xpath('//*[@id="container-purchase"]/div[2]/div/div/button[2]')
      .should('be.visible')
      .click({ force: true });

    //Valida mensagem que o produto foi adicionado ao carrinho
    cy.contains(/produto adicionado com sucesso no carrinho/i, { timeout: 10000 }).should('be.visible')

    //Clica no botão de abrir o carrinho
    cy.xpath('//*[@id="linkCarrinhoHeaderMobile"]/span')
      .should('be.visible')
      .click({ force: true });

    //Clica no botão "remover"
    cy.contains('Remover').click()

    // Confirma modal com botão "Sim"
    cy.contains('Sim').click({ force: true });

    cy.contains(/O seu carrinho está vazio\./i).should('be.visible')
  })
})