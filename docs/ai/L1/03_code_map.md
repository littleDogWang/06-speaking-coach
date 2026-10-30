# 03 Code Map

> Source navigation for Mandarin Speaking Coach.

## Directory Tree

```text
app/                    Next.js pages and API routes
components/             voice lifecycle, transcript and scenario UI
lib/                    Agent config, tools, presentation and lifecycle helpers
types/                  application and Agent/presentation contracts
docs/scenario/          business guide and acceptance cases
scripts/                environment, scenario and delivery verification
docs/ai/L1/L2/          deeper lifecycle and integration guidance
```

## Core Files

- `app/api/generate-agora-token/route.ts`: combined RTC/RTM tokens.
- `app/api/invite-agent/route.ts`: prompt/provider assembly and Agent startup.
- `app/api/stop-conversation/route.ts`: Agent stop.
- `app/api/chat/completions/route.ts`: optional custom-LLM HTTP entry.
- `lib/chat-completions.ts`: OpenAI-compatible SSE handler and injected provider dependencies.
- `components/LandingPage.tsx`: browser bootstrap, RTM, token renewal and end.
- `components/ConversationComponent.tsx`: RTC/toolkit, transcript and activity/evidence events.
- `lib/agent-tools.ts`: explicit empty tool list for this guidance-only demo; no tool-origin configuration.
- `lib/agent-config.ts`: this application’s instructions, greeting and prompt assembly.
- `lib/presentation.ts`: Presentation.
- `package.json`: pinned pnpm and canonical verification.
- `Dockerfile`, `scripts/verify-docker.mjs`: actual image and container smoke contract.
- `scripts/verify-signal-states.ts`, `scripts/verify-inspection.ts`: shared activity and Inspector checks.
- `scripts/verify-template.mjs`: required paths, identity, link and command consistency.

## Ownership Map

Business data and behavior are owned by the scenario sources above. README owns runnable setup/deployment instructions; ARCHITECTURE owns topology; internal RECIPE owns integration invariants and stable interfaces. The root RECIPE is the eight-part public narrative. CI invokes the same documented commands.

## Mandarin Lesson Ownership

`lib/lessons.ts` supplies Chinese phrases, tone-marked pinyin, English meanings and illustrative correction examples to `components/LessonPreview.tsx` and the system prompt. Topic tabs do not set live model state. Level and topic are selected conversationally. No pronunciation assessment or learner progress API exists.

## Related Deep Dives

- [Lifecycle](L2/conversation_lifecycle.md)
- [Baseline copy map](L2/from_scratch_bootstrap.md)
