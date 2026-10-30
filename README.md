# Mandarin Speaking Coach

Practice Mandarin Chinese with English guidance, everyday role-play and gentle vocabulary or grammar feedback. Designed for overseas English-speaking learners. This independent local application occupies Top 10 slot **06-speaking-coach** and derives from the inspected current 00 voice starter.

The interface is in English. Chinese characters and tone-marked pinyin are intentional teaching content. Read the [public recipe](RECIPE.md), [scenario guide](docs/scenario/README.md), [acceptance cases](docs/scenario/acceptance.md) and [provider evidence](docs/scenario/providers.md).

## Included

- Beginner, intermediate and advanced practice, selected conversationally with the coach.
- Introductions, restaurant ordering and workplace conversation; nine bundled phrase cards show Chinese, pinyin and English meanings.
- Concise expression feedback, repetition, English explanations and topic/difficulty changes.
- A spoken recap on request, grounded in actual practice turns.
- Live transcripts, interruption handling, microphone controls, Inspector and developer guide.

Feedback uses recognized text. There are no pronunciation or tone scores, HSK certification, learner accounts, durable progress records, real orders or scheduled meetings. Inspector feedback is manually selected. Ask for a recap **before** ending the call; End conversation stops the session without generating a recap. Transcript evidence remains in the page until refresh and can be exported.

## Prerequisites

Node.js 22+ (validated with 24), pnpm 9.15.9, and an Agora project with RTC, Signaling and Conversational AI. Live voice requires real project credentials, network access and microphone permission. Hosted microphone access requires HTTPS.

## Run It

From this checkout:

```bash
corepack pnpm install --frozen-lockfile
```

Create `.env.local` from `env.local.example` only if absent. Set `NEXT_PUBLIC_AGORA_APP_ID` and server-only `NEXT_AGORA_APP_CERTIFICATE`. If the local file is labeled synthetic verification, replace both values before attempting speech. No sibling credentials or bindings are included. Default managed models need no third-party API keys.

```bash
corepack pnpm run doctor
corepack pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000). Choose **Preview first** to browse phrase cards, or **Practice Mandarin** for a call. Say “I am a beginner. Help me introduce myself in Mandarin.” Browsing a topic does not configure the coach: state the topic aloud.

The optional ready Agora CLI can write an existing authorized project's values with `agora quickstart env write . --template nextjs --project <your-project> --json`. Check CLI readiness first; project changes need separate authorization.

## Speech Configuration

`lib/runtime-profile.ts` selects managed Deepgram Nova-3 with `language: multi`, OpenAI gpt-4o-mini, and MiniMax speech_2_6_turbo with `Chinese (Mandarin)_Warm_Bestie`. The invite route allows a 1,200 ms end-of-speech pause for learners. Provider documentation establishes configuration intent; it does not establish this Agora project's live language-switching quality. Test Mandarin, English requests and mixed turns before release.

Pinyin is provided in the preview phrase cards and in the header's Phrasebook, which remains available during a call. The coach is instructed to speak Chinese characters and ordinary English, avoiding reading pinyin aloud. Voice speed is not dynamically controlled: requests to slow down use shorter phrases and repetition.

## Customize

| Change | Source |
| --- | --- |
| Lessons, phrases and example corrections | `lib/lessons.ts` |
| Coaching flow, level adaptation and boundaries | `lib/agent-config.ts` |
| Model, recognition language and voice | `lib/runtime-profile.ts` |
| Pause detection and Agent startup | `app/api/invite-agent/route.ts` |
| Identity and feedback | `lib/presentation.ts` |
| Reading aid tabs | `components/LessonPreview.tsx` |

No business tool is registered in `lib/agent-tools.ts`. Do not add persistence or assessment claims without implementing and validating them. The [official upstream](https://github.com/AgoraIO-Conversational-AI/agent-quickstart-nextjs) supplies the underlying quickstart; cloning it does not retrieve this local scenario.

## Verification

```bash
corepack pnpm run verify
corepack pnpm run verify:docker
```

Canonical verification runs doctor, template, lint, types, mocked API, signal, Inspector, lesson/configuration contracts and build. Synthetic values suffice for local checks; no live Agent is started by these tests. Prompt checks do not establish that a model follows every teaching instruction. Run [live acceptance cases](docs/scenario/acceptance.md) separately. Docker verification is independent.

## Deployment

One Next.js application serves frontend and token/invite/stop routes. Agora cloud owns STT, LLM and TTS. Native production uses `pnpm run build` and `pnpm run start`. No database or cloud callback URL is required.

### Docker

```bash
docker build --build-arg NEXT_PUBLIC_AGORA_APP_ID=YOUR_AGORA_APP_ID -t 06-speaking-coach:local .
docker run --rm -p 3000:3000 --env-file .env.local 06-speaking-coach:local
```

The public App ID must match at build and runtime. The certificate is runtime-only. The image runs as UID 1001 on port 3000; no persistence volume is needed. Sample endpoints do not provide production user authentication.

## Troubleshooting

Run doctor for missing configuration. Inspect the exact invite response for startup failures and RTM events for transcript issues. Test English/Mandarin recognition separately if switching fails. Missing metrics remain unknown. Export evidence before refresh.

## Contributing and License

Read [AGENTS.md](AGENTS.md), [architecture](ARCHITECTURE.md) and [internal recipe](docs/ai/RECIPE.md). Changes remain local unless separately authorized for commit or remote publication. Preserve the [MIT License](LICENSE) and [third-party notices](THIRD_PARTY_NOTICES.md).
