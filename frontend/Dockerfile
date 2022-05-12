FROM node:16

WORKDIR /frontend

COPY package*.json ./

RUN npm set-script prepare ""

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build

CMD ["npm", "run", "serve"]
