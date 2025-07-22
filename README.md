# Desafio Nuven - API de Processamento de Documentos

### Visão Geral

Este projeto é uma API REST desenvolvida para o desafio técnico da Nuven. A aplicação permite que usuários se registrem, façam login, criem datasets, realizem upload de arquivos (PDF e CSV) e façam consultas de informações contidas nesses documentos usando uma simulação de IA.

### Funcionalidades

- Autenticação de usuários (registro e login)
- Gerenciamento de datasets
- Upload e processamento de arquivos CSV e PDF
- Consultas à IA simulada para obter informações dos documentos
- Busca de registros por texto
- Histórico de consultas

### Tecnologias Utilizadas

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT para autenticação
- Multer para upload de arquivos
- Swagger para documentação da API
- Docker e Docker Compose


### Pré-requisitos

- Node.js (v14 ou superior)
- Docker e Docker Compose
- PostgreSQL

### Como Executar o Projeto

Usando Docker

1. Clone o repositório:

```sh
git clone https://github.com/ph3523/desafio-nuven.git
cd desafio-nuven
```

2. Configure as variáveis de ambiente: Crie um arquivo ``.env`` na raiz do projeto com as seguintes variáveis:`

```sh
DATABASE_URL="postgresql://postgres:senha@db:5432/nuvem?schema=public"
JWT_SECRET=seu_segredo_jwt
PORT=3001
```

3. Execute o Docker Compose:

```sh
docker-compose up
```

A API estará disponível em ``http://localhost:3001`` e a documentação do Swagger em ``http://localhost:3001/api-docs``.

##### Executando Localmente

1. Clone o repositório:

```sh
git clone https://github.com/ph3523/desafio-nuven.git
cd desafio-nuven
```

2. Instale as dependências:

```sh
npm install
```

3. Configure as variáveis de ambiente: Crie um arquivo ``.env`` na raiz do projeto, ajustando a URL do banco de dados conforme sua configuração local:

```sh
DATABASE_URL="postgresql://seu_usuario:senha@localhost:5432/nuvem?schema=public"
JWT_SECRET=seu_segredo_jwt
PORT=3001
```

4. Execute as migrações do Prisma:

```sh
npx prisma migrate deploy
```

5. Inicie a aplicação:

```sh
npm start
```

##### Para desenvolvimento:

```sh
npm run dev
```

### Estrutura do Projeto

```
desafio-nuven/
├── prisma/               # Configuração e migrações do Prisma
├── src/
│   ├── controller/       # Controladores da API
│   ├── data/             # Dados mockados para simulação da IA
│   ├── middleware/       # Middlewares (auth, upload)
│   ├── models/           # Modelos para acesso ao banco de dados
│   ├── routes/           # Rotas da API
│   ├── app.js            # Configuração do Express
│   ├── prisma.js         # Cliente Prisma
│   ├── server.js         # Entrada da aplicação
│   └── swagger.js        # Configuração do Swagger
├── uploads/              # Diretório para arquivos enviados
├── .env                  # Variáveis de ambiente
├── docker-compose.yaml   # Configuração do Docker Compose
├── Dockerfile            # Configuração Docker
└── package.json          # Dependências e scripts
```

### API Endpoints

##### Autenticação

- ``POST /auth/register`` - Registrar novo usuário
- ``POST /auth/login`` - Fazer login
- ``GET /auth/me`` - Obter informações do usuário autenticado`

##### Datasets

- ``POST /datasets`` - Criar novo dataset
- ``GET /datasets`` - Listar datasets do usuário
- ``GET /datasets/{id}`` - Obter dataset específico
- ``GET /datasets/{id}/records`` - Obter registros de um dataset
- ``POST /datasets/upload`` - Fazer upload de arquivo para dataset

##### Records

- ``GET /records?query=texto`` - Buscar registros por texto

##### Consultas

- ``POST /queries`` - Criar nova consulta à IA mock
- ``GET /queries`` - Listar histórico de consultas

### Documentação

A documentação detalhada da API está disponível através do Swagger em: ``http://localhost:3001/api-docs``

### Licença

Este projeto está licenciado sob a GNU General Public License v3.0.