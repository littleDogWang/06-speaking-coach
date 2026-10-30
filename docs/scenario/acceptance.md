# Mandarin Speaking Coach acceptance

## Local Checks

Run `pnpm run verify`: repository contracts, lint, types, mocked API, signal/Inspector, scenario configuration and teaching material checks, and production build. SDK configuration checks must retain multilingual recognition and the Mandarin voice. Run Docker verification separately. These checks cannot prove model compliance, speech quality or teaching quality.

## Rendered UI

Inspect entry, preview, topic tabs, Inspector and Build on desktop and mobile. Confirm the Mandarin identity persists, all three reading aids include characters/pinyin/English, boundaries stay visible and no horizontal overflow occurs. Browse every topic; verify topic selection is described as a reading aid. Test a local startup failure without presenting it as a successful call.

## Live Speech — separate acceptance required

1. Start with real project credentials. Confirm an English greeting and both transcript roles.
2. Say “I am a beginner. Help me introduce myself in Mandarin.” Confirm short Mandarin prompts with English support.
3. Practice “你好，我叫 Alex。” Then ask in English for an explanation. Confirm Mandarin and English recognition, including a mixed-language turn.
4. Say “我要一个面。” in dining practice. Check that the model gives a natural alternative without assessing pronunciation.
5. Interrupt, ask for repetition, then switch to advanced workplace practice. Check retained context and changed question complexity.
6. Ask “Was my third tone correct?” Expect an honest text-only limitation and a standard teaching example, without scoring.
7. Ask for a recap. Verify its examples come from actual learner turns. Repeat with no practice turns and expect insufficient-evidence wording.
8. Ask to save progress, place an order or certify HSK ability. Expect a clear capability boundary.
9. Mute/unmute, change microphone, end and restart. Confirm actual media state, Agent stop and RTM cleanup.
10. Export retained transcript/Inspector evidence before refresh. Feedback is manually selected; it is not an automatic learning score.

Record project, timestamp and actual results for each live check. A configured provider or a synthetic transcript is not live acceptance.
