# 06 Interfaces

> Actual scenario API, event and configuration boundaries.

## Browser Or User-Facing APIs

- `GET /api/generate-agora-token`: optional uid/channel; returns `{ token, uid, channel }`; server credential/configuration errors return failure.
- `POST /api/invite-agent`: requester/channel are required. The invite body contains `requester_id` and `channel_name`. Returns Agent ID, creation time and state; input and runtime failures are reported explicitly.
- `POST /api/stop-conversation`: requires agent_id; already-stopping/not-found handling is idempotent.
- `POST /api/chat/completions`: optional custom-LLM proxy, not used by the default managed pipeline.

No business tools are registered by `lib/agent-tools.ts`. Inspector captures reported session evidence and optional user feedback, not an automatically verified business result.

Bundled Mandarin lessons from lib/lessons.ts are embedded in the coaching prompt. No business tool is registered.

There is no saved-progress or external-action mode. New integrations require implementation and separate verification.

### Activity and Inspector

`AgentSignalState` is `idle | connecting | listening | thinking | speaking | error | ended`. Transport/error takes precedence over semantic Agent state. `AgentSignalSnapshot` carries independent microphone state and an optional real track volume source. The canvas samples tracks without React frame updates.

`InspectionSnapshot` contains lifecycle, transport, semantic state, microphone state, normalized transcript, completed turns, module reports, events and interruption count. HTTP payload contracts remain unchanged; `AgoraTokenData.startedAt` is client-only. `startupError` records a nonfatal invite failure in runtime evidence.

`lib/inspection.ts` preserves missing fields as null, prefers raw `turn.finished` reports to SDK normalization, upserts by Agent ID/turn ID and caps retained turns at 50. SDK-only zero is unknown because Toolkit 2.10 supplies zero for absent metrics. Raw measured zero is valid. Module reports are capped at 200, events at 100. Statistics use measured E2E only. See [session inspection](L2/transcript_pipeline.md#session-inspection) for retention and measurement semantics.

See [scenario guide](../../scenario/README.md) and the scenario source for exact business request shapes, validation errors and ownership rules.

## Events And Media

RTC carries microphone and synthesized audio. RTM/toolkit provides TRANSCRIPT_UPDATED, AGENT_STATE_CHANGED, AGENT_METRICS, completed-turn, error and SAL events where reported. Normalize toolkit local uid zero before display and retain interrupted turns. Preserve missing metric fields and data provenance; Inspector outcomes are manually confirmed.

## Environment Contract

Local Next.js reads `.env.local` from tracked `env.local.example`. Hosted/Docker servers inject runtime values; the public App ID must also be supplied to the browser build.

| Variable | Required | Owner / exposure | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_AGORA_APP_ID` | Required | Next.js build and runtime; public | App ID from the selected Agora project; Docker must receive the same value at build and runtime. |
| `NEXT_AGORA_APP_CERTIFICATE` | Required | Next.js server runtime; secret | Signs RTC/RTM credentials and authenticates managed Agent operations; never a build argument. |

## External Services

The server uses agora-agents with the configured managed STT/LLM/TTS providers. The browser uses RTC, Signaling and the Agent Client Toolkit. Optional business tools call this same app over public HTTPS, and their returned success is required before reporting an action complete. Provider BYOK blocks are opt-in, server-only and require separate verification.

## Mandarin Lesson Ownership

`lib/lessons.ts` supplies Chinese phrases, tone-marked pinyin, English meanings and illustrative correction examples to `components/LessonPreview.tsx` and the system prompt. Topic tabs do not set live model state. Level and topic are selected conversationally. No pronunciation assessment or learner progress API exists.

## Related Deep Dives

- [Tokens](L2/token_model.md)
- [Transcript pipeline](L2/transcript_pipeline.md)
- [Agent configuration](L2/invite_agent_config.md)
