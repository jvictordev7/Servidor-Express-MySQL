# Servidor-Express-MySQL

Este projeto é uma aplicação Node.js que utiliza o framework Express para criar um servidor web integrado a um banco de dados MySQL. A estrutura do projeto segue o padrão MVC (Model-View-Controller), facilitando a organização e manutenção do código.

## Funcionalidades

- **Integração com MySQL:** Utiliza o driver oficial do MySQL para Node.js, permitindo operações eficientes no banco de dados.
- **Organização modular:** A divisão em pastas específicas para cada responsabilidade facilita a escalabilidade e manutenção do código.
- **Uso de Pug como engine de templates:** Permite a renderização dinâmica de páginas HTML no lado do servidor.
- **Testes de integração:** Implementados para garantir a funcionalidade e a confiabilidade do sistema.

## Estrutura do Projeto

- **configs:** Armazena configurações, como parâmetros de conexão com o banco de dados.
- **controllers:** Contém a lógica de negócio e atua como intermediário entre as models e as views.
- **middlewares:** Funções que processam requisições antes de chegarem aos controllers, úteis para autenticação, logging, entre outros.
- **models:** Define as estruturas de dados e interage diretamente com o banco de dados MySQL.
- **routes:** Define os endpoints da aplicação e direciona as requisições para os controllers apropriados.
- **services:** Contém funcionalidades reutilizáveis que podem ser utilizadas por diferentes partes da aplicação.
- **views:** Responsáveis pela apresentação dos dados ao usuário.

## Pré-requisitos

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/jvictordev7/Servidor-Express-MySQL.git

2. Clone este repositório:
   ```bash
   d Servidor-Express-MySQL

3. Instale as dependências:
   ```bash
   npm install

## Uso

1. Clone este repositório:
   ```bash
   npm start

2. Acesse http://localhost:3000 no seu navegador para interagir com a aplicação.
   
## Testes

Para executar os testes de integração:
 ```bash
   npm test
