FROM node:20-alpine

WORKDIR /app

# Copy dependency manifests first for layer caching
COPY package*.json ./
RUN npm install --production

# Copy rest of the backend source
COPY . .

EXPOSE 8000

CMD ["node", "app.js"]