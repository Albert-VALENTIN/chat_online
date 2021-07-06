FROM node:12-alpine

#docker run -it -p 3000:3000 6a5f66e92f76

WORKDIR /app

COPY . /app

RUN npm install
RUN npm install axios

EXPOSE 3000

CMD [ "npm", "start" ]
