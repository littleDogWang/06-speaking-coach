# Speech provider configuration evidence

Checked 2026-10-30. These sources support the configured intent, not a successful live Agora call.

- [Agora Deepgram integration](https://docs.agora.io/en/ai/models/asr/deepgram.md) documents managed nova-3 and the language option.
- [Deepgram Nova-3 language prompting](https://developers.deepgram.com/docs/nova-3-language-prompting) documents nova-3 with language=multi, including English and simplified Mandarin, and switching languages mid-conversation. This scenario uses that multilingual setting without additional language-hint parameters.
- [Agora MiniMax integration](https://docs.agora.io/en/ai/models/tts/minimax.md) documents managed speech-2.6-turbo and configurable voice IDs. The installed SDK also accepts the existing speech_2_6_turbo spelling and maps it to the managed preset.
- [MiniMax system voices](https://platform.minimax.io/docs/faq/system-voice-id) lists Chinese (Mandarin)_Warm_Bestie. This scenario requests that Mandarin voice through the existing managed MiniMax SDK integration.

Canonical checks exercise the installed SDK's serialized configuration. They do not test project entitlements, managed-service rollout, English pronunciation by this Mandarin voice, code-switching quality, acoustic correctness or actual speech delivery. Check all of those in a real bilingual call before release. No live provider keys or sibling credentials were copied.

The coach uses shorter phrases and repetition when asked to slow down. There is no dynamic TTS speed control. Written pinyin belongs to preview cards, and the prompt instructs the coach not to speak romanization.
