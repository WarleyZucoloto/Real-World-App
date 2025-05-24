# 🧪 Testes E2E com Cypress – Explorando o RealWorld App 💸

Bem-vindo(a) ao meu projeto de testes automatizados! Este repositório é dedicado a exercitar e consolidar conhecimentos em testes End-to-End (E2E) utilizando o **Cypress**[cite: 16]. Aqui, simulamos interações reais em um aplicativo bancário fictício, o **RealWorld App**, para garantir que as funcionalidades operem como esperado e proporcionar uma experiência de usuário impecável[cite: 15].

---

## 🚀 O Que Você Encontrará Aqui?

Este projeto foi desenhado para te ajudar a entender e visualizar na prática diversos cenários de teste, com foco em:

* **Login Descomplicado**: Testamos diferentes situações de login[cite: 16], desde o sucesso até as falhas propositais, para garantir que apenas os usuários corretos tenham acesso.
* **Gestão de Contas e Usuários**: Cenários que abordam a criação de novas contas e o cadastro de usuários no sistema[cite: 16].
* **Transações Bancárias Seguras**: Verificamos a execução de transações financeiras entre usuários, simulando operações do dia a dia[cite: 16].
* **Validação de Campos Essenciais**: Testamos a obrigatoriedade dos campos, evitando que dados importantes sejam omitidos[cite: 16].
* **Tratamento de Erros Eficaz**: Verificamos como o sistema lida com erros e as mensagens de retorno para o usuário[cite: 16].

---

## 🛠️ Ferramentas Utilizadas

Para construir e executar esses testes, contamos com as seguintes tecnologias:

* **Cypress**: O framework de testes end-to-end [cite: 17] que nos permite simular as interações do usuário de forma robusta e confiável.
* **JavaScript**: A linguagem de programação que utilizamos para escrever nossos testes[cite: 17], tornando-os flexíveis e poderosos.
* **Node.js**: O ambiente de execução [cite: 17] que permite rodar o JavaScript fora do navegador.
* **VSCode**: Nosso editor de código preferido[cite: 17], para um desenvolvimento ágil e organizado.

> 💡 **Foco nos Fundamentos**: Optamos por não utilizar frameworks adicionais, garantindo que o aprendizado e a prática se concentrem totalmente nos fundamentos do Cypress [cite: 17] e na lógica de testes.

---

## ▶️ Como Rodar este Projeto (e o RealWorld App!)

Para que você possa explorar e rodar os testes deste repositório, é fundamental ter o **RealWorld App** (a aplicação que estamos testando) rodando localmente. Siga os passos abaixo:

1.  **Clone o Projeto Original (RealWorld App):**
    Primeiro, você precisará clonar o repositório da aplicação que será testada. Acesse o link oficial do projeto: [cypress-io/cypress-realworld-app](https://github.com/cypress-io/cypress-realworld-app) e clone-o para sua máquina[cite: 17].

    ```bash
    git clone [https://github.com/cypress-io/cypress-realworld-app.git](https://github.com/cypress-io/cypress-realworld-app.git)
    ```

2.  **Navegue até o Diretório do RealWorld App:**

    ```bash
    cd cypress-realworld-app
    ```

3.  **Instale as Dependências do RealWorld App:**

    ```bash
    npm install
    ```

4.  **Inicie a Aplicação RealWorld App (Localmente):**
    Com as dependências instaladas, você pode iniciar o servidor da aplicação[cite: 17].

    ```bash
    npm start
    ```
    Isso fará com que o RealWorld App esteja disponível localmente, geralmente em `http://localhost:8080` (verifique a saída do seu terminal para a porta exata).

5.  **Agora, Clone ESTE Repositório (Seus Testes!):**
    Em um novo terminal, clone o seu repositório de testes.

    ```bash
    git clone SEU_LINK_DO_REPOSITORIO_AQUI.git
    ```

6.  **Navegue até o Diretório dos Seus Testes:**

    ```bash
    cd SEU_DIRETORIO_DE_TESTES_AQUI
    ```

7.  **Instale as Dependências Deste Projeto (Cypress):**

    ```bash
    npm install
    ```

8.  **Execute os Testes Cypress!**
    Com o RealWorld App rodando e as dependências dos testes instaladas, você pode finalmente executar os testes:

    ```bash
    npx cypress open
    ```
    Isso abrirá a interface do Cypress, onde você poderá selecionar e rodar os testes individualmente ou em conjunto.

---