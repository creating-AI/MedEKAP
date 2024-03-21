FROM node:20-alpine

RUN mkdir -p /frontend
WORKDIR /frontend

RUN npm install -g @angular/cli
RUN npm install bootstrap

COPY package.json package-lock.json ./

RUN npm ci

COPY . /frontend/

EXPOSE 4200

CMD npm run ng serve