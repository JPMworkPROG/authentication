FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
RUN npx tsc
EXPOSE 3000
CMD ["node", "dist/index.js"]