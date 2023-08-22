FROM node:18.17-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install && npm cache clean --force
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start:dev:docker"]
