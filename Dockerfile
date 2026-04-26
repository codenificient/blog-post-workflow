FROM public.ecr.aws/docker/library/node:22-alpine


# wget is used by the healthcheck below
RUN apk add --no-cache wget

# Non-root runtime user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S -u 1001 -G nodejs nodejs

WORKDIR /app

# Install runtime deps. The Action's build/test deps aren't needed for
# the demo server; --omit=dev keeps the image lean.
COPY --chown=nodejs:nodejs package.json package-lock.json* yarn.lock* ./

ENV HUSKY=0
RUN if [ -f package-lock.json ]; then \
      npm ci --omit=dev --ignore-scripts || npm install --omit=dev --ignore-scripts; \
    else \
      npm install --omit=dev --ignore-scripts; \
    fi

# Copy the rest of the app (express.js, public/, src/, etc.)
COPY --chown=nodejs:nodejs . .

USER nodejs

ENV NODE_ENV=production \
    PORT=9000

EXPOSE 9000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:9000/api/health || exit 1

CMD ["node", "express.js"]
