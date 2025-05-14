#####################
# Stage 1: Build
#####################

FROM node:22.14-alpine AS builder

WORKDIR /hackthon2025

ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/

RUN pnpm install

COPY . .

WORKDIR /hackthon2025/apps/web

RUN pnpm run build

#####################
# Stage 2: Runtime
#####################

FROM nginx:alpine AS runner

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /hackthon2025/apps/web/dist /usr/share/nginx/html

COPY --from=builder /hackthon2025/apps/web/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl --fail http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
