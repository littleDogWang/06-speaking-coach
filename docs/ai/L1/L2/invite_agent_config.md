# Scenario Agent Configuration

> Read when changing Mandarin Speaking Coach's prompt, tools, provider chain or turn detection.

## Source Files

- `lib/agent-config.ts`: role, workflow, guardrails and greeting.
- `lib/agent-config.ts`: selected prompt and default/tool mode context.
- `lib/agent-tools.ts`: explicit empty tool list; this scenario has no tool-origin environment setting or business callbacks.
- `app/api/invite-agent/route.ts`: actual SDK builder and session options.
- `lib/runtime-profile.ts`: non-secret configured provider/model display.

There are no generic Ada/ADA_PROMPT constants to edit. Use the scenario config and prompt assembly actually imported by the invite route.

## Request And Startup

The invite body contains `requester_id` and `channel_name`.

The server reads the App ID and App Certificate, builds AgoraClient with the selected area, and creates an Agent. The configured pipeline is Deepgram nova-3 with language multi, OpenAI gpt-4o-mini and MiniMax speech_2_6_turbo with Chinese (Mandarin)_Warm_Bestie. Current provider evidence and live-check limits are in docs/scenario/providers.md. Copy the route's current builder pattern and createSession options; do not add an extra client argument or reproduce older SDK signatures.

The browser and invite route share DEFAULT_AGENT_UID. RTM, transcript/error delivery and metrics remain enabled. Session startup returns the Agent ID, creation timestamp and state; ending uses that same Agent ID.

## Prompt And Tools

Default behavior: Bundled Mandarin lessons from lib/lessons.ts are embedded in the coaching prompt. No business tool is registered.

Tool behavior: There is no saved-progress or external-action mode. New integrations require implementation and separate verification.

No business tools are registered by `lib/agent-tools.ts`. Inspector captures reported session evidence and optional user feedback, not an automatically verified business result.

The coach provides transcript-based teaching only. It cannot assess pronunciation or tones, certify proficiency, save learning progress or perform external actions. It must not request secrets.

## Provider And Turn Detection Changes

Edit the actual constructor blocks and turnDetection.config fields in the invite route. Provider BYOK examples are opt-in; keys stay server-side and are not part of the default two-key environment contract. Preserve the configured 1,200 ms end-of-speech pause and 15-message LLM history unless intentionally changing learner pacing or context retention. The coach can summarize only conversation turns retained in its context.

## Verification

Run `pnpm run verify:api`, `pnpm run verify:scenario` and canonical `pnpm run verify`. Real microphone pacing, interruptions and cloud HTTP execution require separate acceptance; mock Agent startup cannot establish those outcomes.

## See Also

- [Interfaces](../06_interfaces.md)
- [Workflows](../05_workflows.md)
- [Token model](token_model.md)
