FROM node:alpine

RUN mkdir -p /home/felipe/api-ulide-party

WORKDIR /home/felipe/api-ulide-party

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "start"]
