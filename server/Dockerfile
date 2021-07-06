FROM node:12-alpine

#docker build -f Dockerfile .
#docker run -it -d 3000:3000 6a5f66e92f76

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]
