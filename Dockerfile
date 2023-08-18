FROM node:18.17-alpine
WORKDIR /usr/src/app
COPY prisma package*.json ./
RUN npm install && npx prisma generate && npm cache clean --force
COPY . .
EXPOSE 4000
