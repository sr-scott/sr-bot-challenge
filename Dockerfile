FROM node:10

WORKDIR /usr/app

COPY package.json yarn.lock ./

ENV NODE_ENV=production
RUN yarn

COPY lib/ ./lib
COPY index.js ./

RUN mkdir logs
ENV ROUND=4

ENTRYPOINT ["yarn", "start"]

EXPOSE 3000
