
FROM node:17.3 

WORKDIR /usr/src/app

COPY package*.json . /usr/src/app/
RUN npm install

COPY . .

RUN npm build

EXPOSE 9000 
CMD [ "npm", "start" ] 
# start comand