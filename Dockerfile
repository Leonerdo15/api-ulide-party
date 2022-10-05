FROM node:lts

WORKDIR /home/node/app
COPY package*.json  ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 8080
CMD [ "node", "app.js" ]
