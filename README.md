<h1 style="text-align: center;">📌 Frontend - Gerenciador de documentos contábeis 📌</h1>

## Sumário
- [Sobre o projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Como iniciar o projeto?](#como-iniciar-o-projeto)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)

## Sobre o projeto

Esse projeto consiste no desenvolvimento de um frontend em React para gerenciar documentos em uma empresa de contabilidade. O objetivo principal é facilitar a vida do usuário, digitalizando seus documentos, enquanto oferece uma interface intuitiva e eficiente para seu uso no dia a dia.<br>
Ele ainda está em desenvolvimento e o objetivo é que, em breve, o usuário consiga armazenar os documentos no banco de dados da aplicação.

## Tecnologias utilizadas
<img src="https://img.shields.io/static/v1?label=Linguagem&message=JavaScript&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=LIB&message=React&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=LIB&message=SASS&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=LIB&message=Axios&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=LIB&message=Jest js&color=007E84&style=for-the-badge"/><br>
<img src="https://img.shields.io/static/v1?label=Runtime&message=Node.js&color=007E84&style=for-the-badge"/><br>

<details>
<summary>Mais informações das tecnologias</summary>

- [TypeScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript): uma linguagem de programação para, entre outros, criar aplicações dinâmicas na web.
- [React](https://pt-br.react.dev/): React é uma biblioteca JavaScript de código aberto desenvolvida pelo Facebook que permite criar interfaces de usuário interativas e responsivas para aplicativos da web.
- [Sass](https://sass-lang.com/documentation/): Sass é uma linguagem de extensão CSS que permite escrever estilos de forma mais eficiente e organizada, com recursos como variáveis, aninhamento e mixins, tornando o desenvolvimento de folhas de estilo mais poderoso e flexível.
- [Axios](https://axios-http.com/ptbr/docs/intro): Axios é uma biblioteca JavaScript baseada em promessas, que permite fazer requisições HTTP de forma fácil e eficiente em aplicações front-end e back-end.
- [Jest](https://jestjs.io/pt-BR/): Jest é um poderoso Framework de Testes em JavaScript com um foco na simplicidade.
- [Node.js](https://nodejs.org/): um ambiente de execução JavaScript do lado do servidor.

</details>
<br>

## Funcionalidades
<br>
Para visualizar prints das telas, clique para abrir as sessões
<br>
<br>
<details>
<summary>1. Autenticação e autorização: registro e autenticação de usuários através de tokens JWT.</summary>
  Tela de login:
  <img src="https://github.com/im-mhid/digitos-contabilidade-web/assets/79279387/ba1c216a-2756-497c-a6ea-f11aa070db3a" alt="Tela de login">
</details>

<details>
<summary>2. Permissões: o usuário só consegue acessar partes do site que estejam incluídas nas permissões do seu cargo ou pessoais.</summary>
  Tela Minha Área:
  <img src="https://github.com/im-mhid/digitos-contabilidade-web/assets/79279387/8aa60928-b4b5-4bdd-bf33-333671f0eb72" alt="Tela Minha Área">
</details>

<details>
<summary>3. Gerenciamento de cargos: o usuário com a devida permissão pode gerenciar os cargos existentes e suas permissões no sistema.</summary>
  Tela de cargos:
  <img src="https://github.com/im-mhid/digitos-contabilidade-web/assets/79279387/81ea25d1-a0d9-4942-843b-750e36324a38" alt="Tela de cargos">
  Cadastro de cargos:
  <img src="https://github.com/im-mhid/digitos-contabilidade-web/assets/79279387/4d7c50f5-3c7b-4715-92a5-fece6fc72d85" alt="Cadastro de cargos">
</details>

<details>
<summary>4. Gerenciamento de usuários: somente o usuário com as devidas permissões pode gerenciar novos usuários no sistema, com seus dados completos, inclusive senha.</summary>
  Cadastro de usuários:
  <img src="https://github.com/im-mhid/digitos-contabilidade-web/assets/79279387/42a9c982-53f2-4738-80a5-4e4a6f87cfe7" alt="Cadastro de usuários">
</details>

<details>
<summary>5. Gerenciamento de clientes: usuário com as devidas permissões pode gerenciar os dados dos clientes da empresa de contabilidade.</summary>
  Cadastro de clientes:
  <img src="https://github.com/im-mhid/digitos-contabilidade-web/assets/79279387/308055ce-1cb4-4b97-9714-6b8c134ac2d5" alt="Cadastro de clientes">
</details>

<details>
<summary>6. Gerenciamento de tipo do documentos: usuário com as devidas permissões pode gerenciar o tipo do documento e definir quantos anos ele deve ser armazenado.</summary>
  Cadastro de tipo do documento:
  <img src="https://github.com/im-mhid/digitos-contabilidade-web/assets/79279387/98b5fdf0-19ef-4d14-90f5-1bb2c0a8b879" alt="Cadastro de tipo do documento">
</details>


<details>
<summary>7. Gerenciamento de natureza do documentos: usuário com as devidas permissões pode gerenciar se o documento é de natureza digital ou física.</summary>
  Tela de natureza do documento:
  <img src="https://github.com/im-mhid/digitos-contabilidade-web/assets/79279387/91759f39-dadd-4a30-b1b2-c6e14254eba2" alt="Cadastro de natureza do documento">
</details>


<details>
<summary>8. Gerenciamento de local do documentos: usuário com as devidas permissões pode gerenciar o local que o documento está armazenado.</summary>

  Cadastro de local do documento:
  <img src="https://github.com/im-mhid/digitos-contabilidade-web/assets/79279387/be2d92e4-0c4d-45e7-a1e9-0f8370a86a95" alt="Cadastro de local do documento">
</details>

<details>
<summary>9. Gerenciamento de documentos: usuário com as devidas permissões pode gerenciar os dados dos documentos. É possível pesquisar e filtrar os documentos</summary>
  Tela de documentos:
  <img src="https://github.com/im-mhid/digitos-contabilidade-web/assets/79279387/390d703f-cfda-4f66-a30e-6d13583a3732" alt="Tela de documentos">
  Cadastro de documentos:
  <img src="https://github.com/im-mhid/digitos-contabilidade-web/assets/79279387/b931cd97-9074-43da-8d87-c9ea5c774052" alt="Cadastro de documentos">
</details>

## Como iniciar o projeto?
### Pré-requisitos
- [Git](https://git-scm.com)
- [Node.js >= 18.17.1](https://nodejs.org/en/)
### Instalação
1. Clone o projeto do repositório:
   ```
   git clone https://github.com/im-mhid/digitos-contabilidade-web.git
   ```
2. Acesse a pasta do projeto::
   ```
   cd digitos-contabilidade-web
   ```
3. Instale as dependências do projeto:
   ```
   npm install
   ```
4. Inicie o projeto:
   ```
   npm start
   ```

## Preview do projeto



https://github.com/im-mhid/digitos-contabilidade-web/assets/79279387/88847a31-2609-4e66-a128-dd37ebb78715

