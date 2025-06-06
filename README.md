# 🛡️ Real World App - Testes Automatizados com Cypress

![Real World App](./Pictures/Real_World_App.jpg)

![Cypress Logo](https://img.shields.io/badge/Cypress-10.0.0-green?style=for-the-badge&logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-v18+-brightgreen?style=for-the-badge&logo=node.js&logoColor=white)
---

Este repositório contém a suíte de testes automatizados End-to-End para a aplicação "Real World App" (RWA), desenvolvida utilizando o **Cypress**. O objetivo é garantir a qualidade e o bom funcionamento das principais funcionalidades da aplicação, como autenticação, gerenciamento de contas bancárias, transações e perfis de usuário.

---

## ✨ Funcionalidades Testadas

Os testes automatizados cobrem os seguintes cenários:

1.  **Autenticação de Usuários**
    * Registro de novos usuários (Sign Up) com dados válidos e validação de campos.
    * Login bem-sucedido com credenciais válidas.
    * Falhas de login:
        * Tentativas de login com usuário inexistente.
        * Senhas incorretas.
        * Campos de usuário/senha em branco.
    * Recuperação de senha.

2.  **Gerenciamento de Contas Bancárias**
    * Criação bem-sucedida de novas contas bancárias com dados válidos.
    * Validação de campos obrigatórios e formato (ex: nome do banco em branco, números de roteamento/conta inválidos).
    * Exclusão de contas bancárias existentes.

3.  **Transações Financeiras**
    * Criação de transações peer-to-peer (P2P) entre usuários.
    * Criação de transações para "request" (pedidos de pagamento).
    * Visualização e filtro do histórico de transações.

4.  **Gerenciamento de Perfil**
    * Visualização e edição das informações do perfil do usuário.
    * Atualização de senhas.

5.  **Notificações**
    * Marcação de notificações como lidas.

---

## 🛠️ Tecnologias Utilizadas

* **Cypress**: Framework de automação de testes End-to-End.
* **JavaScript**: Linguagem de programação.
* **Node.js**: Ambiente de execução para o JavaScript (necessário para o Cypress e npm).
* **npm / Yarn**: Gerenciador de pacotes.

---

## 🚀 Como Rodar os Testes

### Pré-requisitos

Certifique-se de ter o **Node.js** (versão 18 ou superior recomendada) e o **npm** (que vem com o Node.js) ou **Yarn** instalados em sua máquina.

### 1. Configuração do Projeto

Este repositório já inclui tanto a aplicação "Real World App" quanto a suíte de testes Cypress.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/WarleyZucoloto/RealWorldApp.git](https://github.com/WarleyZucoloto/RealWorldApp.git) # Substitua pelo URL real do seu repositório
    cd RealWorldApp
    ```

2.  **Instale as dependências da aplicação e dos testes:**
    ```bash
    npm install # ou yarn install
    ```

### 2. Iniciar a Aplicação (Backend e Frontend)

Para rodar os testes, a aplicação RWA precisa estar em execução. O projeto RWA geralmente tem um comando unificado para iniciar tanto o backend (API) quanto o frontend.

```bash
npm start # ou npm run dev, se este for o comando para iniciar ambos

```

## 🚀 Integração Contínua (CI/CD)

Este projeto utiliza **GitHub Actions** para automatizar a execução dos testes End-to-End. A cada novo `push` para a branch principal (`main`) ou a cada `pull request` aberto, um pipeline de CI/CD é automaticamente acionado para:

* Configurar o ambiente de execução.
* Instalar as dependências do projeto e do Cypress.
* Iniciar a aplicação (backend e frontend).
* Executar toda a suíte de testes Cypress em um ambiente headless.

Isso garante que qualquer nova alteração no código seja validada automaticamente, identificando regressões e mantendo a qualidade da aplicação e dos testes de forma contínua.

Você pode acompanhar o status das execuções e ver os logs detalhados dos testes na aba [Actions](https://github.com/WarleyZucoloto/RealWorldApp/actions) do repositório.

## 📞 Contato

* **Nome:** Warley Zucoloto
* **LinkedIn:** [https://www.linkedin.com/in/warleydomingueszucoloto](https://www.linkedin.com/in/warleydomingueszucoloto/)
* **GitHub:** [https://github.com/WarleyZucoloto](https://github.com/WarleyZucoloto)
