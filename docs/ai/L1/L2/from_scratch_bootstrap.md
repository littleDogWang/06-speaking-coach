# Scenario Baseline Copy Map

> Read when integrating Mandarin Speaking Coach into another application.

## Baseline Rule

This checkout is the 06-speaking-coach scenario derivative of the official Agora Next.js voice quickstart. Read its current source before adapting SDK, token or event behavior. Do not generate a replacement integration from memory.

## Implementation Map

| Need | Source of truth | Guidance |
| --- | --- | --- |
| Setup and env | package.json, env.local.example | [Setup](../01_setup.md) |
| Voice lifecycle | components/LandingPage.tsx, components/ConversationComponent.tsx | [Lifecycle](conversation_lifecycle.md) |
| Scenario prompt and fixtures | lib/agent-config.ts and local data | [Public recipe](../../../../RECIPE.md) |
| Agent providers and tools | app/api/invite-agent/route.ts, lib/agent-tools.ts | [Agent configuration](invite_agent_config.md) |
| API and call scope | app/api, types/conversation.ts | [Interfaces](../06_interfaces.md) |
| Tokens and renewal | app/api/generate-agora-token/route.ts | [Token model](token_model.md) |
| State and deployment | ARCHITECTURE.md, Dockerfile | [Architecture](../../../../ARCHITECTURE.md) |

## Adaptation Sequence

1. Run the existing scenario using Node.js 22+, pnpm 9.15.9 and the documented .env.local contract.
2. Verify an actual call before declaring speech success; local contracts alone are not runtime evidence.
3. Map token, invite, stop, RTC join, RTM subscription and toolkit events into the target app's existing owners.
4. Preserve StrictMode initialization, hook-owned cleanup, combined token privileges, UID remap and interrupted turns.
5. The invite body contains `requester_id` and `channel_name`.
6. Start with default conversation: Bundled Mandarin lessons from lib/lessons.ts are embedded in the coaching prompt. No business tool is registered.
7. Add only requested business tools, preserving their exact call scope and confirmation semantics. The coach provides transcript-based teaching only. It cannot assess pronunciation or tones, certify proficiency, save learning progress or perform external actions. It must not request secrets.
8. Run pnpm run verify and the appropriate separate Docker/live acceptance checks.

## See Also

- [Internal recipe](../../RECIPE.md)
- [Workflows](../05_workflows.md)
- [Interfaces](../06_interfaces.md)
