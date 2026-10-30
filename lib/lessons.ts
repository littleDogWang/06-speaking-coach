export const lessons = [
  {
    id: 'introductions', title: 'Introduce yourself',
    setting: 'Meet a Mandarin-speaking neighbor in Boston. Use a fictional name.',
    request: 'I am a beginner. Help me introduce myself in Mandarin.',
    question: '你叫什么名字？',
    phrases: [
      { chinese: '你好，我叫 Alex。', pinyin: 'Nǐ hǎo, wǒ jiào Alex.', english: 'Hello, my name is Alex.' },
      { chinese: '我住在波士顿。', pinyin: 'Wǒ zhù zài Bōshìdùn.', english: 'I live in Boston.' },
      { chinese: '很高兴认识你。', pinyin: 'Hěn gāoxìng rènshi nǐ.', english: 'Nice to meet you.' },
    ],
    correction: { learner: '我名字是 Alex。', alternative: '我叫 Alex。', explanation: 'Your meaning is clear. 我叫 is a more natural way to introduce your name.' },
  },
  {
    id: 'restaurant', title: 'Order a meal',
    setting: 'Role-play at a fictional Chinese restaurant in Seattle. No real order is placed.',
    request: 'Let us practice ordering food in Mandarin. Explain new words in English.',
    question: '你想吃什么？',
    phrases: [
      { chinese: '我想要一碗面。', pinyin: 'Wǒ xiǎng yào yì wǎn miàn.', english: 'I would like a bowl of noodles.' },
      { chinese: '请不要放辣椒。', pinyin: 'Qǐng bú yào fàng làjiāo.', english: 'Please do not add chili peppers.' },
      { chinese: '可以给我一杯水吗？', pinyin: 'Kěyǐ gěi wǒ yì bēi shuǐ ma?', english: 'Could I have a glass of water?' },
    ],
    correction: { learner: '我要一个面。', alternative: '我想要一碗面。', explanation: 'Use 碗 for a bowl of noodles. 我想要 makes the request softer.' },
  },
  {
    id: 'workplace', title: 'Talk with a colleague',
    setting: 'Practice with a fictional Mandarin-speaking colleague at a U.S. office. No meeting is scheduled.',
    request: 'I am intermediate. Practice a workplace conversation with me in Mandarin.',
    question: '你今天忙吗？',
    phrases: [
      { chinese: '你今天有时间吗？', pinyin: 'Nǐ jīntiān yǒu shíjiān ma?', english: 'Do you have time today?' },
      { chinese: '我们一起看看这个项目吧。', pinyin: 'Wǒmen yìqǐ kànkan zhège xiàngmù ba.', english: 'Let us look at this project together.' },
      { chinese: '你可以再说一遍吗？', pinyin: 'Nǐ kěyǐ zài shuō yí biàn ma?', english: 'Could you say that again?' },
    ],
    correction: { learner: '我明天去会议。', alternative: '我明天参加会议。', explanation: '参加会议 is the usual expression for attending a meeting.' },
  },
] as const;

export function getLessonContext(): string {
  return lessons.map((lesson) => [
    `## ${lesson.title}`, lesson.setting, `Starter question: ${lesson.question}`,
    ...lesson.phrases.map((phrase) => `${phrase.chinese} | Reading aid: ${phrase.pinyin} | Meaning: ${phrase.english}`),
    `Illustrative correction ONLY, not an actual learner response: ${JSON.stringify(lesson.correction)}`,
  ].join('\n')).join('\n\n');
}
