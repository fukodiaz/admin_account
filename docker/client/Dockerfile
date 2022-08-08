FROM node:16.3.0-alpine
WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app/src
COPY ./src /usr/src/app/src
COPY ./.babelrc /usr/src/app
COPY ./webpack.config.js /usr/src/app
COPY ./index.html /usr/src/app
COPY package.json /usr/src/app
RUN npm install
EXPOSE 8081

ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait
RUN sh -c /wait

CMD ["npm", "run", "dev"]