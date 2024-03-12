FROM node:16-slim
WORKDIR /app
COPY package.json package-lock.json /app
RUN npm ci
COPY ./src /app
CMD ["node", "index.js"]
