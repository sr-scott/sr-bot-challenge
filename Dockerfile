FROM node:10

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn

COPY lib/ ./lib
COPY index.js ./

ENTRYPOINT ["yarn", "start"]

EXPOSE 3000