FROM node:lts

WORKDIR /home/felipe/api-ulide-party

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "start"]
