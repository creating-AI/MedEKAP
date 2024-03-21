FROM node:20-alpine

RUN mkdir -p /frontend
WORKDIR /frontend

RUN npm install -g @angular/cli

COPY package.json package-lock.json ./

RUN npm ci

COPY . /frontend/

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]