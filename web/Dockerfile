# Install dependencies only when needed
FROM node:16-alpine AS deps
# for sharp:
# RUN apk add --no-cache libc6-compat
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /node_modules ./node_modules
RUN yarn build
CMD ["yarn", "start"]