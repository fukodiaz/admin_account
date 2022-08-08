FROM node:16.3.0-alpine
RUN npm install -g nodemon
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install && mv /usr/src/app/node_modules /node_modules
RUN mkdir -p /usr/src/app/server
COPY ./server /usr/src/app/server

RUN mkdir -p /usr/src/app/dist
COPY ./dist /usr/src/app/dist
EXPOSE 3001

ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait
RUN sh -c /wait

CMD ["nodemon", "--experimental-modules", "--es-module-specifier-resolution=node", "/usr/src/app/server/server.mjs"]

