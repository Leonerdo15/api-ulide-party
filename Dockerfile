FROM node:lts
RUN mkdir -p /home/node/app/node_modules && -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json  ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 8080
CMD [ "node", "app.js" ]
