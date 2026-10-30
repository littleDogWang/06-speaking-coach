# 02 Architecture

> Topology and state ownership for Mandarin Speaking Coach.

## Components

One Next.js App Router process serves the browser and routes. RTC carries audio; RTM carries transcript, Agent state, metrics and errors. The server SDK manages the cloud STT/LLM/TTS Agent. Scenario files define the business behavior.

## Data And Event Flow

The user start action creates any necessary scenario session, fetches the combined RTC/RTM token and bootstraps RTM plus invite. RTC/microphone hooks wait for the StrictMode guard. Toolkit events feed transcript and Inspector. Renew both token identities consistently; end calls stop, logs out RTM and unmounts hook-owned resources.

The invite body contains `requester_id` and `channel_name`.

No business tools are registered by `lib/agent-tools.ts`. Inspector captures reported session evidence and optional user feedback, not an automatically verified business result.

## Ownership Boundaries

LandingPage owns pre-call bootstrap/RTM; ConversationComponent owns joined RTC/toolkit subscriptions. Token/invite/stop routes own privileged operations. `lib/agent-config.ts` owns assistant behavior; `lib/agent-tools.ts` owns tool definitions. Session evidence and manually selected outcomes are not automatic proof of business completion.

## Runtime Modes

Local development runs one Next.js process at http://localhost:3000 using `.env.local`. Native production uses `pnpm run build` then `pnpm run start`. Docker runs the same app as non-root UID 1001 on port 3000, without a reverse proxy inside the image. The voice app can run as a single Next.js deployment, including a Next.js-compatible serverless host. Retained transcript and Inspector evidence live in the current page; export before refresh. No business database is included.

Docker embeds the public App ID at build and receives the certificate only at runtime. Lesson material is bundled in lib/lessons.ts; no persistent learner record directory or volume is used. See [full architecture](../../../ARCHITECTURE.md).

## Mandarin Lesson Ownership

`lib/lessons.ts` supplies Chinese phrases, tone-marked pinyin, English meanings and illustrative correction examples to `components/LessonPreview.tsx` and the system prompt. Topic tabs do not set live model state. Level and topic are selected conversationally. No pronunciation assessment or learner progress API exists.

## Related Deep Dives

- [Lifecycle](L2/conversation_lifecycle.md)
- [Tokens](L2/token_model.md)
