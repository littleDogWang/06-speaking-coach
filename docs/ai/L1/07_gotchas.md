# 07 Gotchas

> High-impact setup and business-state pitfalls.

## Setup Pitfalls

- pnpm 8 does not match lockfile 9; use declared pnpm 9.15.9.
- Missing .env.local values fail doctor; do not log or paste credentials.
- Docker needs a running engine and the public App ID at build time. A runtime-only ID cannot repair an already-built client bundle.
- A private/localhost callback URL cannot be used as a cloud business-tool origin.

## Runtime Pitfalls

Bundled Mandarin lessons from lib/lessons.ts are embedded in the coaching prompt. No business tool is registered.

The coach provides transcript-based teaching only. It cannot assess pronunciation or tones, certify proficiency, save learning progress or perform external actions. It must not request secrets.

The voice app can run as a single Next.js deployment, including a Next.js-compatible serverless host. Retained transcript and Inspector evidence live in the current page; export before refresh. No business database is included.

Keep combined token privileges, StrictMode initialization, toolkit readiness and hook-owned cleanup. A missing transcript is an RTM/event question, not evidence that the model never responded. Tool failures cannot silently fall back to fixture success.

## Documentation Or Contract Drift

The local repository identity is `06-speaking-coach`; retain the official quickstart attribution separately. Keep invite fields, data paths, time zones, Docker volume behavior and pnpm/verification commands synchronized. Run `pnpm run verify:template` for structure/link drift and the canonical checks for source behavior.

## Related Deep Dives

- [Lifecycle](L2/conversation_lifecycle.md)
- [Transcript pipeline](L2/transcript_pipeline.md)
