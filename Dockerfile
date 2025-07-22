FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN mkdir -p src/data

COPY . .

COPY src/data/mockresponse.json src/data/mockResponse.json

RUN npx prisma generate

RUN chmod +x ./entrypoint.sh

EXPOSE 3001

CMD ["./entrypoint.sh"]