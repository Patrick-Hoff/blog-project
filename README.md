# Blog Node.js

<p align="center">
  <img src="https://img.shields.io/static/v1?label=JavaScript&message=linguagem&color=yellow&style=for-the-badge&logo=javascript"/>
  <img src="https://img.shields.io/static/v1?label=Node.js&message=Back-end&color=green&style=for-the-badge&logo=node.js"/>
  <img src="https://img.shields.io/static/v1?label=MongoDB&message=Database&color=brightgreen&style=for-the-badge&logo=mongodb"/>
  <img src="https://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=orange&style=for-the-badge"/>
</p>

### Tópicos 

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)  
:small_blue_diamond: [Funcionalidades](#funcionalidades)  
:small_blue_diamond: [Deploy da aplicação](#deploy-da-aplicação-dash)  
:small_blue_diamond: [Pré-requisitos](#pré-requisitos)  
:small_blue_diamond: [Como rodar a aplicação](#como-rodar-a-aplicação-arrow_forward)  
:small_blue_diamond: [Futuras atualizações](#futuras-atualizações)  
:small_blue_diamond: [Responsável pelo desenvolvimento](#responsável-pelo-desenvolvimento)

---

## Descrição do projeto 

<p align="justify">
  Projeto de blog construído com Node.js e MongoDB, utilizando Handlebars como engine de templates. A proposta é permitir que usuários possam visualizar postagens de acordo com suas categorias favoritas, enquanto administradores têm acesso a funcionalidades exclusivas para gerenciamento de conteúdo.
</p>

---

## Funcionalidades

### Usuários comuns:

:heavy_check_mark: Criar conta e fazer login  
:heavy_check_mark: Visualizar lista de postagens  
:heavy_check_mark: Acessar o conteúdo completo de uma postagem  
:heavy_check_mark: Filtrar postagens por categoria  

### Administradores:

:heavy_check_mark: Todas as funcionalidades de um usuário comum  
:heavy_check_mark: Cadastrar categorias  
:heavy_check_mark: Criar novas postagens com título, conteúdo e categoria associada  

---

## Deploy da aplicação :dash:

> Acesse o projeto em produção:  
> 🔗 [nodejs-blog-project.herokuapp.com](https://nodejs-blog-project-b327ca1b5a7e.herokuapp.com/)

---

## Pré-requisitos

- [Node.js](https://nodejs.org/)
- [MongoDB Atlas (ou local)](https://www.mongodb.com/atlas)
- [Nodemon](https://www.npmjs.com/package/nodemon)

### Dependências utilizadas:
- `express`  
- `express-session`  
- `mongoose`  
- `handlebars`  
- `bcryptjs`  
- `body-parser`  
- `connect-flash`  
- `passport`  
- `passport-local`

---

## Como rodar a aplicação :arrow_forward:

Clone o projeto:
```bash
git clone https://github.com/Patrick-Hoff/blog-project.git
```

Entre na pasta do projeto:
```bash
cd blog-project
```

Instale as dependências:
```bash
npm install
```

Configure a string de conexão com o MongoDB no arquivo `.env` (ou diretamente no código, se aplicável).

Inicie o servidor com:
```bash
npm run dev
```

---

## Futuras atualizações

- [ ] Painel de administração com design próprio  
- [ ] Validação de campos em tempo real  
- [ ] Paginação de postagens  
- [ ] Upload de imagens para postagens  

---

## Responsável pelo desenvolvimento

| [<img src="https://avatars.githubusercontent.com/u/139597982?s=400&u=dec4b8ef35f778a0444c4b55043b7652dfb2606b&v=4" width=115><br><sub>Patrick Hoffmann Campos</sub>](https://github.com/Patrick-Hoff/) |
