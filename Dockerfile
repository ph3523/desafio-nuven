FROM node:22

# Criar diretório da aplicação
WORKDIR /app

# Copiar arquivos de definição de pacotes
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código da aplicação
COPY . .

# Gerar o cliente Prisma
RUN npx prisma generate

# Expor a porta da aplicação
EXPOSE 3001

# Comando para executar a aplicação
CMD ["npm", "start"]