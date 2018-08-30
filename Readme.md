# NodeJS Challenge Example

## Installation
1. Install Docker: https://docs.docker.com/docker-for-mac/install/

## Run Server
1. Build docker container: `docker build -t docker-bot-challenge-nodejs .`
2. Execute: `docker run -d --rm -p 1235:3000 docker-bot-challenge-nodejs`
3. Bot Server now available on localhost:1235

**The included Dockerfile is extremely minimal, if you add additional files you will need to add them to your dockerfile as well to be copied in.  e.g.: `ADD ./lib ./lib`**
