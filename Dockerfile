# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Production
FROM node:18-alpine

RUN apk add --no-cache rsync

WORKDIR /app

# Copy build output to temp
COPY --from=builder /app/.next /tmp/.next
COPY --from=builder /app/node_modules /tmp/node_modules
COPY --from=builder /app/package.json /tmp/package.json
COPY --from=builder /app/public /tmp/public

# Entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3030

CMD ["/entrypoint.sh"]