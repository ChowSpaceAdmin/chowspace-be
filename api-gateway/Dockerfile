FROM node:10-alpine
WORKDIR /app
RUN npm install -g yarn
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
CMD ["npm", "run", "start"]
