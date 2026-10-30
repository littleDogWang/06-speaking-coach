> **When to Read This:** Load this when modifying transcript rendering, event handling, UID mapping, metrics/error panels, or RTM fallback parsing.

# Transcript Pipeline

## Overview

Transcript and call diagnostics are delivered through AgoraVoiceAI events over RTM, then normalized for UI kit components.

Primary pipeline:

1. RTM/RTC data arrives.
2. `AgoraVoiceAI` emits transcript/state/metrics/error events.
3. `ConversationComponent` stores raw transcript and issue streams.
4. `lib/conversation.ts` normalizes UID/text/timestamps.
5. UI panels render message history + in-progress turn separately.

## Transcript Normalization Stages

- UID remap: toolkit `uid="0"` -> actual local RTC UID string.
- Text cleanup: punctuation spacing normalization.
- Timestamp normalization: seconds vs milliseconds unified.
- Status segmentation:
- `IN_PROGRESS` displayed as live bubble.
- `END` + `INTERRUPTED` included in scrollable history.

## Why `INTERRUPTED` Must Stay in History

If the first agent turn is interrupted and omitted, `messageList` can remain empty and transcript auto-open logic may never engage. Keeping interrupted turns preserves user-visible causality.

## Agent Activity Mapping

`mapSignalState` in `lib/agent-signal.ts` prioritizes transport errors before agent activity:

- An error or `DISCONNECTED`/`DISCONNECTING` maps to `error`.
- `CONNECTING`/`RECONNECTING` or no agent presence maps to `connecting`.
- Connected `listening`, `thinking` and `speaking` retain their semantic state.
- Other connected states map to `idle`; microphone state remains independent.

This avoids showing optimistic speech/listen states while transport is degraded.

## Metrics and Error Streams

Handled signals:

- `AGENT_METRICS` for retained Inspector reports.
- `MESSAGE_ERROR` and `AGENT_ERROR` for surfaced issues.
- `MESSAGE_SAL_STATUS` for registration failures (`VP_REGISTER_FAIL`, `VP_REGISTER_DUPLICATE`).

Fallback parser:

- Raw RTM `message` listener parses JSON payloads for `message.error` and `message.sal_status` to catch issues not raised via higher-level events.

## Coupled Files

- `components/ConversationComponent.tsx`: event subscriptions and issue collection.
- `lib/conversation.ts`: transcript normalization and message segmentation.
- `lib/agent-signal.ts`: transport-aware activity mapping.
- `components/QuickstartTranscriptPanel.tsx`: transcript render sink.
- `components/ScenarioInspector.tsx`: retained metrics and completed-turn render sink.
- `components/ConnectionStatusPanel.tsx`: surfaced connection diagnostics.

## Session Inspection

`ConversationComponent` publishes `AgentSignalSnapshot` and `InspectionSnapshot`. `LandingPage` owns the current/last snapshot and manual outcome. Runtime events come from RTC connection changes and Toolkit transcript, state, module metrics, completed turns, interruptions and errors, with a raw RTM completed-turn fallback.

- Completed turns: at most 50; upsert by Agent ID plus turn ID. Raw reports take precedence over the SDK's normalized report.
- Latency uses server-reported E2E and named segments. Segments are not added into E2E and are not a client stopwatch.
- Toolkit 2.10 converts absent timing fields to zero. SDK-only zero is treated as unknown; raw payload zero is retained as a measurement.
- Median and nearest-rank p95 use only reported E2E samples in the retained window. Small samples are descriptive, not a benchmark.
- Module reports: retain 200; show the latest report by type and name, without implying which stage is currently active.
- Events: retain 100; RTC/state receipt times are browser times. Up to six recent connection issues contribute error evidence. Errors shown are retained records, not a lifetime reliability rate.
- Outcomes are explicitly selected by the visitor. There is no automated correctness score, tool-execution progress, human handoff or ticket creation in this scenario.
- Ended-session evidence persists in memory until a new session or refresh. JSON export includes transcript and diagnostics, never access tokens or credentials. Treat downloaded conversations as user data.

For structured business-stage status, first add actual domain events with stable IDs and state transitions. Configured pipeline labels and Agent thinking state do not prove a particular backend stage is running.
