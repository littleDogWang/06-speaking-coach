import type { LlmTool } from 'agora-agents';

// This guidance-only demo registers no business tools.
export function getScenarioTools(): LlmTool[] {
  return [];
}
