/**
 * Centralized, validated client config. Only `NEXT_PUBLIC_`-prefixed vars reach
 * the browser, and Next only inlines them when accessed as static literals —
 * hence the explicit per-key access below rather than a dynamic lookup.
 *
 * A missing var throws at module load so misconfiguration fails fast and loud
 * instead of surfacing as confusing network errors later.
 */
const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
} as const;

for (const [key, value] of Object.entries(env)) {
  if (!value) {
    throw new Error(`Missing required environment variable for config key "${key}"`);
  }
}

export default env as { [K in keyof typeof env]: NonNullable<(typeof env)[K]> };
