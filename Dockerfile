FROM node:alpine

WORKDIR /node/api-ulide-party

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
