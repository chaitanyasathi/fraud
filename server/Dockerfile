#Specify a base image
FROM node:alpine

RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server

#Install some dependencies
COPY ./package*.json ./
RUN npm install
COPY ./ ./

#Default command
CMD ["node","run","start"]