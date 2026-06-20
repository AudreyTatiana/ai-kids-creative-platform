# ─────────────────────────────────────────
# Stage 1 — Builder
# ─────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copie uniquement les fichiers de dépendances d'abord (optimisation cache)
COPY package*.json ./

# Installation des dépendances de production uniquement
RUN npm ci --omit=dev

# ─────────────────────────────────────────
# Stage 2 — Production
# ─────────────────────────────────────────
FROM node:20-alpine AS production

# Métadonnées de l'image
LABEL maintainer="AudreyTatiana <audreytatiana07@yahoo.com>"
LABEL version="0.1.0"
LABEL description="AI Kids Creative Platform — Backend API"

WORKDIR /app

# Copie les dépendances depuis le builder
COPY --from=builder /app/node_modules ./node_modules

# Copie le code source
COPY . .

# Crée le dossier uploads avec les bonnes permissions
RUN mkdir -p uploads

# ⚠️ Sécurité : création d'un utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app

# Bascule sur l'utilisateur non-root
USER appuser

# Port exposé
EXPOSE 5000

# Healthcheck — vérifie que l'API répond
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

# Démarrage en forme exec (obligatoire)
CMD ["node", "server.js"]
