
FROM node:18-alpine

WORKDIR /app

COPY ../../dist/apps/backend/package.json .

RUN npm install

RUN npm install -g nx@19.6.5

COPY . .

RUN npx nx build backend



EXPOSE 3000

CMD ["node", "main.js"]








