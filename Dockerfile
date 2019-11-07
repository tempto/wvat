FROM node:10

RUN apt-get update
RUN apt-get install -y p7zip-full
RUN apt-get install -y nsis
