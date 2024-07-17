# Authentication Service

Este é um microserviço de autenticação construído com Node.js, Express, Passport e JWT. Ele permite que os usuários se registrem, façam login e acessem endpoints protegidos usando tokens JWT.

## Funcionalidades

- Registro de Usuário
- Login de Usuário
- Autenticação JWT para acessar endpoints protegidos

## Requisitos

- Node.js (versão 16 ou superior)
- Docker (para subir a aplicação com Docker)

## Subindo a Aplicação com Docker Compose

1. Certifique-se de que o Docker e o Docker Compose estão instalados e em execução.

2. Execute o Docker Compose para subir os serviços definidos no `docker-compose.yml`:

    ```bash
    docker-compose up -d
    ```

3. Verifique se os containers estão em execução:

    ```bash
    docker-compose ps
    ```

A aplicação deve estar disponível em `http://localhost:3000`.

## Utilizando a Aplicação

Para detalhes sobre os endpoints disponíveis e como utilizá-los, consulte a especificação OpenAPI localizada na pasta `documentation`.

## Contribuindo

Sinta-se à vontade para abrir issues e pull requests. Feedback e melhorias são sempre bem-vindos!
