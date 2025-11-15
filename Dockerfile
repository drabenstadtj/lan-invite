# ---------- Stage 1: build Vite frontend ----------
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Install frontend dependencies
COPY package*.json ./
COPY vite.config.* ./
COPY index.html ./
COPY public ./public
COPY src ./src

RUN npm ci
RUN npm run build
# Vite output: /app/dist


# ---------- Stage 2: runtime (Express + built frontend) ----------
FROM node:20-alpine

WORKDIR /app

# Install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev

# Copy server source
COPY server ./server

# Copy built frontend into a directory served by Express
# (see note below about server.js)
COPY --from=frontend-builder /app/dist ./server/public

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "server/server.js"]
