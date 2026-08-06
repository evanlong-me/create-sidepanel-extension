// Runtime configuration, bundled at build time (read-only).
// Override values with PLASMO_PUBLIC_* environment variables
// (see .env.example) — Plasmo inlines them during dev/build.
export const appConfig = {
  features: {
    enableChat: (process.env.PLASMO_PUBLIC_ENABLE_CHAT ?? 'true') === 'true',
    maxTokens: parseInt(process.env.PLASMO_PUBLIC_MAX_TOKENS ?? '1000', 10)
  }
} as const
