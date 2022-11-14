describe("Teste de Home", () => {
  it("Teste do botão de cadastro", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".btnLogin").contains("Fazer Cadastro").click();
    cy.url().should("include", "/register");
  });
  it("Teste do botão de login", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#login").contains("Fazer Login").click();
    cy.url().should("include", "/login");
  });
  it("criar uma url com sucesso", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#inputUrl")
      .type("https://docs.cypress.io/api/commands/")
      .should("have.value", "https://docs.cypress.io/api/commands/");
    cy.get("#submitUrl").contains("encurtar link").click();
    cy.get("#shortLink");
  });
  it("Erro ao criar um url", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#inputUrl")
      .type("testeDeError")
      .should("have.value", "testeDeError");
    cy.get("#submitUrl").contains("encurtar link").click();
    cy.get(".error");
  });
  it("abertura de modal", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#item_table_0").click();
    cy.get("#modal").contains("www.google.com.br");
  });
});

describe("Teste de Login", () => {
  it("teste botão de cadastro", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("#register").contains("Fazer Cadastro").click();
    cy.url().should("include", "/register");
  });
  it("sucesso no login", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("#emailLogin").type("123").should("have.value", "123");
    cy.get("#passwordLogin").type("123").should("have.value", "123");
    cy.get("#buttonLogin").click();
    cy.url().should("include", "/list");
  });
  it("erro no login", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("#emailLogin").type("nãoExiste").should("have.value", "nãoExiste");
    cy.get("#passwordLogin")
      .type("nãoExiste")
      .should("have.value", "nãoExiste");
    cy.get("#buttonLogin").click();
    cy.get(".error");
  });
});

describe("Teste de Register", () => {
  it("teste botão de login", () => {
    cy.visit("http://localhost:5173/register");
    cy.get("#login").contains("Fazer Login").click();
    cy.url().should("include", "/login");
  });
  it("Email invalido", () => {
    cy.visit("http://localhost:5173/register");
    cy.get("#emailRegister").type("123").should("have.value", "123");
    cy.get("#passwordRegister").type("123").should("have.value", "123");
    cy.get("#passwordRepeatRegister").type("123").should("have.value", "123");
    cy.get("#buttonRegister").click();
    cy.get(".error").contains("Email Invalido!");
  });
  it("Senhas diferentes", () => {
    cy.visit("http://localhost:5173/register");
    cy.get("#emailRegister")
      .type("123@gmail.com")
      .should("have.value", "123@gmail.com");
    cy.get("#passwordRegister").type("1234").should("have.value", "1234");
    cy.get("#passwordRepeatRegister").type("123").should("have.value", "123");
    cy.get("#buttonRegister").click();
    cy.get(".error").contains("Senhas não são iguais");
  });
  it("Cadastro com sucesso", () => {
    cy.visit("http://localhost:5173/register");
    cy.get("#emailRegister")
      .type("012@gmail.com")
      .should("have.value", "012@gmail.com");
    cy.get("#passwordRegister").type("1234").should("have.value", "1234");
    cy.get("#passwordRepeatRegister").type("1234").should("have.value", "1234");
    cy.get("#buttonRegister").click();
    cy.get("#HappyBirthday").contains("Parabéns você foi Cadastrado");
    cy.get("#postRegistrationLogin").click();
    cy.url().should("include", "/login");
  });
});
describe("Teste de myList", () => {
  it("Teste de fluxo até minha lista", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("#emailLogin").type("123").should("have.value", "123");
    cy.get("#passwordLogin").type("123").should("have.value", "123");
    cy.get("#buttonLogin").click();
    cy.url().should("include", "/list");
  });
  it("logout", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("#emailLogin").type("123").should("have.value", "123");
    cy.get("#passwordLogin").type("123").should("have.value", "123");
    cy.get("#buttonLogin").click();
    cy.get("#logout").click();
    cy.url().should("include", "/");
  });
  it("criar link encurtado", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("#emailLogin").type("123").should("have.value", "123");
    cy.get("#passwordLogin").type("123").should("have.value", "123");
    cy.get("#buttonLogin").click();
    cy.get("#inputUrl")
      .type("https://docs.cypress.io/api/commands/")
      .should("have.value", "https://docs.cypress.io/api/commands/");
    cy.get("#submitUrl").contains("encurtar link").click();
    cy.get("#shortLink");
  });
  it("Teste modal", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("#emailLogin").type("123").should("have.value", "123");
    cy.get("#passwordLogin").type("123").should("have.value", "123");
    cy.get("#buttonLogin").click();
    cy.get("#item_table_0").click();
    cy.get("#modal").contains("docs.cypress.io");
  });
});
describe("Teste de page not found (404)", () => {
  it("page not found", () => {
    cy.visit("http://localhost:5173/naoexiste");
    cy.get(".box404").contains("OPS! NÃO ENCONTRAMOS ESSA PÁGINA");
  });
  it("Botão Home", () => {
    cy.visit("http://localhost:5173/naoexiste");
    cy.get("#buttonHome").click();
    cy.url().should("include", "/");
  });
});
