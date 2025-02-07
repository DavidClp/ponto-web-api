# API PONTO DIGITAL

API desenvolvida para desafio que consistia em desenvolver uma aplicação para realizar o controle de ponto dos colaboradores e permitir que eles tenham visibilidade das suas horas trabalhadas. Onde a solução é foca em três pontos principais:

-   Visualização atualizada das horas trabalhadas no dia atual
-   Possibilidade de iniciar ou finalizar um turno
-   Acompanhamento do total de horas trabalhadas nos dias anteriores

## Funcionalidades

-   Login: Autenticação via código do colaborador.
-   Criação e Atualização de Turnos: Registra e atualiza turnos com data e hora.
-   Consulta de Turnos: Recupera turnos por colaborador e período.

## Tecnologias usadas

-   API Feito com Node.js
-   Docker
-   Typescript
-   Prisma
-   Vitest
-   Express
-   Eslint
-   Prettier
-   técnicas S.O.L.I.D.

## Documentação da API

#### Faz login em um colaborador ou cria um

```http
  POST /collaborator
```

| Parâmetro | Tipo     | Descrição                              |
| :-------- | :------- | :------------------------------------- |
| `code`    | `string` | **Obrigatório**. Codigo do colaborador |

#### Bate o ponto do turno

Caso não exista um turno com data de entrada, cria um novo turno, definindo data de entrada, caso exista, define o ponto de saida do mesmo.

```http
  POST /shift
```

| Parâmetro          | Tipo     | Descrição                              |
| :----------------- | :------- | :------------------------------------- |
| `collaboratorCode` | `string` | **Obrigatório**. Codigo do colaborador |
| `point`            | `string` | **Obrigatório**. Formato ISO 8601      |

#### Retorna todos os turnos filtrados por mes e ano

```http
  GET /shift?collaboratorCode=${collaboratorCode}&year=/${year}&month=/${month}
```

| Parâmetro          | Tipo     | Descrição                              |
| :----------------- | :------- | :------------------------------------- |
| `collaboratorCode` | `string` | **Obrigatório**. Codigo do colaborador |
| `year`             | `string` | **Obrigatório**. Ano a ser filtrado    |
| `month`            | `string` | **Obrigatório**. Mes a se filtrado     |

#### Retorna total de horas trabalhadas filtrados por mes e ano

```http
  GET /total-hours?collaboratorCode=${collaboratorCode}&year=/${year}&month=/${month}
```

| Parâmetro          | Tipo     | Descrição                              |
| :----------------- | :------- | :------------------------------------- |
| `collaboratorCode` | `string` | **Obrigatório**. Codigo do colaborador |
| `year`             | `string` | **Obrigatório**. Ano a ser filtrado    |
| `month`            | `string` | **Obrigatório**. Mes a se filtrado     |

## Instalação e Configuração

1. Clone o Repositório:

```bash
  git clone https://github.com/DavidClp/ponto-web-api
```

2. Instale as Dependências:

```bash
  npm install
```

3. Configure as Variáveis de Ambiente:
   Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

```makefile
  DATABASE_URL=your_database_url
```

4. Suba o container docker com o postgresql

```bash
  docker compose up -d
```

5. rodar as migrations:

```bash
  npx prisma migrate dev
```

6. Execute o Projeto:

```bash
  npm run dev
```

## Testes

Para rodar os testes, utilize:

```bash
  npm run test
```
