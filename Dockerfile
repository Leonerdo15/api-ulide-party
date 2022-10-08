FROM node:alpine

WORKDIR /home/felipe/api-ulide-party

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "start"]
