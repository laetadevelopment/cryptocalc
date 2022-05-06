FROM node:18

WORKDIR /app

COPY . /app

EXPOSE 8080

RUN npm install http-server -g

RUN yarn build

CMD http-server ./dist
