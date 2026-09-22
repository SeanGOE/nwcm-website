import React, { Component, JSX } from 'react';

type Language = 'words' | 'quality' | 'gifts' | 'service' | 'touch';

type Option = {
  language: Language;
  text: string;
};

type Question = {
  prompt: string;
  options: Option[];
};

const LANGUAGE_META: Record<Language, { name: string; blurb: string; color: string }> = {
  words: {
    name: 'Words of Affirmation',
    blurb:
      'You feel most loved when people say it out loud - encouragement, appreciation, and honest compliments land deeper for you than almost anything else. Kind words stay with you, and so do harsh ones.',
    color: '#E8C170',
  },
  quality: {
    name: 'Quality Time',
    blurb:
      "Undivided attention is your currency of love. It's not about what you do together - it's that they chose to be fully present with you, phone down, eyes up.",
    color: '#8FD3C7',
  },
  gifts: {
    name: 'Receiving Gifts',
    blurb:
      "For you, a gift is a physical proof of thought: someone saw something, remembered you, and acted on it. The price tag is irrelevant - the 'I was thinking of you' is everything.",
    color: '#F2A7C3',
  },
  service: {
    name: 'Acts of Service',
    blurb:
      'Love, to you, is a verb. When someone takes something off your plate - the errand, the dishes, the thing you were dreading - that effort speaks louder than any words could.',
    color: '#A8B8E8',
  },
  touch: {
    name: 'Physical Touch',
    blurb:
      "A hug, a hand on the shoulder, sitting close on the couch - physical presence is how love feels real to you. Touch grounds you and says 'I'm here' without a single word.",
    color: '#E88C7D',
  },
};

const QUESTIONS: Question[] = [
  {
    prompt: 'After a long, stressful week, what would make you feel most loved?',
    options: [
      { language: 'words', text: 'A heartfelt message telling me how proud they are of me' },
      { language: 'quality', text: 'A full evening together with phones face-down and nowhere to be' },
      { language: 'gifts', text: 'A small surprise they grabbed because it reminded them of me' },
      { language: 'service', text: 'Coming home to find they already handled the chores I was dreading' },
      { language: 'touch', text: 'A long hug and staying wrapped up on the couch together' },
    ],
  },
  {
    prompt: "It's your birthday. Which gesture would mean the most?",
    options: [
      { language: 'words', text: 'A card filled with specific things they love about me' },
      { language: 'quality', text: 'A whole day planned around just the two of us' },
      { language: 'gifts', text: 'A thoughtful present that proves they really know me' },
      { language: 'service', text: "They quietly took care of everything so I didn't lift a finger" },
      { language: 'touch', text: 'Waking up to a warm embrace before anything else happens' },
    ],
  },
  {
    prompt: "When you're upset, what actually helps?",
    options: [
      { language: 'words', text: "Hearing them say 'you're going to get through this, and here's why'" },
      { language: 'quality', text: "Them dropping what they're doing to just sit with me" },
      { language: 'gifts', text: 'Them showing up with my comfort snack or a little pick-me-up' },
      { language: 'service', text: "Them handling the problem or task that's stressing me out" },
      { language: 'touch', text: 'Being held - no words needed' },
    ],
  },
  {
    prompt: 'How do you naturally show love to the people you care about?',
    options: [
      { language: 'words', text: 'I tell them often - compliments, encouragement, gratitude' },
      { language: 'quality', text: 'I carve out real one-on-one time, no matter how busy I am' },
      { language: 'gifts', text: 'I pick up little things that made me think of them' },
      { language: 'service', text: 'I do things for them before they even ask' },
      { language: 'touch', text: "I'm a hugger - high-fives, shoulder squeezes, all of it" },
    ],
  },
  {
    prompt: 'At the end of a great date, what leaves you glowing?',
    options: [
      { language: 'words', text: "Them saying 'I had the best time with you' and meaning it" },
      { language: 'quality', text: 'Realizing hours flew by because we were so locked in' },
      { language: 'gifts', text: 'A small keepsake from the night to remember it by' },
      { language: 'service', text: 'Them planning every detail so I could just enjoy it' },
      { language: 'touch', text: 'Holding hands the whole walk home' },
    ],
  },
  {
    prompt: 'Which of these would you miss the most if it disappeared?',
    options: [
      { language: 'words', text: "The daily 'good morning' texts and words of encouragement" },
      { language: 'quality', text: 'Our weekly ritual of doing something together, just us' },
      { language: 'gifts', text: 'The random little surprises left for me to find' },
      { language: 'service', text: 'The way they always take care of things for me' },
      { language: 'touch', text: 'Casual affection - the hand-holds, the leaning in' },
    ],
  },
  {
    prompt: "You're long-distance for a few months. What keeps you feeling connected?",
    options: [
      { language: 'words', text: "Voice notes and messages telling me I'm loved and missed" },
      { language: 'quality', text: "Scheduled video calls where we're both fully present" },
      { language: 'gifts', text: 'Care packages and little things arriving in the mail' },
      { language: 'service', text: 'Them handling things for me from afar - booking, planning, helping' },
      { language: 'touch', text: 'Counting down to the reunion hug - nothing else quite substitutes' },
    ],
  },
  {
    prompt: 'Your ideal anniversary celebration looks like...',
    options: [
      { language: 'words', text: 'Exchanging letters about what this year together has meant' },
      { language: 'quality', text: 'A getaway with zero distractions - just us and time' },
      { language: 'gifts', text: 'Exchanging gifts we each put real thought into' },
      { language: 'service', text: 'Them orchestrating a surprise day where every detail is handled' },
      { language: 'touch', text: 'A slow, close evening - dancing in the kitchen counts' },
    ],
  },
  {
    prompt: 'Which small everyday moment makes your whole day?',
    options: [
      { language: 'words', text: "An out-of-nowhere text: 'just thinking about how great you are'" },
      { language: 'quality', text: 'Morning coffee together before the day starts' },
      { language: 'gifts', text: 'Finding my favorite treat waiting on the counter' },
      { language: 'service', text: 'Discovering they already filled my gas tank or packed my lunch' },
      { language: 'touch', text: 'A kiss on the forehead on their way out the door' },
    ],
  },
  {
    prompt: 'A friend wants to cheer you up after bad news. The perfect move is...',
    options: [
      { language: 'words', text: 'A pep talk that reminds me who I am' },
      { language: 'quality', text: "'Cancel your plans - we're hanging out tonight'" },
      { language: 'gifts', text: 'Showing up at my door with something small but perfect' },
      { language: 'service', text: "'Send me your to-do list. I've got half of it'" },
      { language: 'touch', text: 'A bear hug that lasts a beat longer than usual' },
    ],
  },
];

/** Deterministic per-question shuffle so option order varies but stays stable across renders. */
const shuffled = <T,>(arr: T[], seed: number): T[] => {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const SHUFFLED_QUESTIONS: Question[] = QUESTIONS.map((q, i) => ({
  ...q,
  options: shuffled(q.options, (i + 7) * 31),
}));

type QuizProps = {};

type QuizState = {
  step: number; // -1 = intro, 0..9 = questions, 10 = results
  answers: (Language | null)[];
};

/** Standalone love language quiz page, reachable only by direct URL. */
export class LoveLanguageQuiz extends Component<QuizProps, QuizState> {
  constructor(props: QuizProps) {
    super(props);
    this.state = {
      step: -1,
      answers: Array(QUESTIONS.length).fill(null),
    };
  }

  componentDidMount = (): void => {
    window.scrollTo(0, 0);
  };

  doStartClick = (): void => {
    this.setState({ step: 0 });
  };

  doAnswerClick = (lang: Language): void => {
    const answers = [...this.state.answers];
    answers[this.state.step] = lang;
    this.setState({ answers });
    // Brief pause so the selection registers visually before advancing.
    window.setTimeout(() => {
      this.setState({ step: this.state.step + 1 });
    }, 260);
  };

  doBackClick = (): void => {
    this.setState({ step: this.state.step - 1 });
  };

  doRestartClick = (): void => {
    this.setState({ step: -1, answers: Array(QUESTIONS.length).fill(null) });
  };

  getScores = (): Record<Language, number> => {
    const scores: Record<Language, number> = {
      words: 0,
      quality: 0,
      gifts: 0,
      service: 0,
      touch: 0,
    };
    this.state.answers.forEach((a) => {
      if (a !== null) {
        scores[a] += 1;
      }
    });
    return scores;
  };

  render = (): JSX.Element => {
    const page: React.CSSProperties = {
      minHeight: '100vh',
      background:
        'radial-gradient(ellipse 120% 80% at 50% -10%, #3A2540 0%, #241B2F 45%, #1B1424 100%)',
      color: '#EFE6F2',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      boxSizing: 'border-box',
    };

    return (
      <div style={page}>
        <div style={{ width: '100%', maxWidth: 640 }}>
          {this.state.step === -1
            ? this.renderIntro()
            : this.state.step >= QUESTIONS.length
            ? this.renderResults()
            : this.renderQuestion()}
        </div>
      </div>
    );
  };

  renderIntro = (): JSX.Element => {
    return (
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: 13,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#B89BC4',
            marginBottom: 20,
          }}
        >
          Ten questions | Five languages
        </div>
        <h1
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 'clamp(36px, 7vw, 56px)',
            fontWeight: 500,
            lineHeight: 1.1,
            margin: '0 0 20px',
          }}
        >
          How do you <em style={{ color: '#F2A7C3' }}>speak</em> love?
        </h1>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.65,
            color: '#C9B8D4',
            maxWidth: 460,
            margin: '0 auto 36px',
          }}
        >
          Everyone gives and receives love a little differently. Answer honestly - pick the
          option that would genuinely mean the most to you, not the one that sounds nicest.
        </p>
        <button
          onClick={this.doStartClick}
          style={{
            background: '#F2A7C3',
            color: '#241B2F',
            border: 'none',
            borderRadius: 999,
            padding: '15px 44px',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 8px 28px rgba(242,167,195,0.35)',
          }}
        >
          Begin the quiz
        </button>
      </div>
    );
  };

  renderQuestion = (): JSX.Element => {
    const q = SHUFFLED_QUESTIONS[this.state.step];
    const selected = this.state.answers[this.state.step];

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 30 }}>
          <div
            style={{
              flex: 1,
              height: 6,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(this.state.step / QUESTIONS.length) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #F2A7C3, #E8C170)',
                borderRadius: 999,
                transition: 'width 300ms ease',
              }}
            />
          </div>
          <span style={{ fontSize: 13, color: '#9A87A8', whiteSpace: 'nowrap' }}>
            {this.state.step + 1} / {QUESTIONS.length}
          </span>
        </div>

        <h2
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 'clamp(22px, 4.5vw, 30px)',
            fontWeight: 500,
            lineHeight: 1.3,
            margin: '0 0 26px',
          }}
        >
          {q.prompt}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {q.options.map((opt) => {
            const isSelected = selected === opt.language;
            return (
              <button
                key={opt.language}
                onClick={() => this.doAnswerClick(opt.language)}
                style={{
                  textAlign: 'left',
                  background: isSelected ? 'rgba(242,167,195,0.16)' : 'rgba(255,255,255,0.045)',
                  border: isSelected
                    ? '1.5px solid #F2A7C3'
                    : '1.5px solid rgba(255,255,255,0.09)',
                  borderRadius: 14,
                  padding: '16px 18px',
                  color: '#EFE6F2',
                  fontSize: 15.5,
                  lineHeight: 1.5,
                  cursor: 'pointer',
                  transition: 'background 160ms ease, border-color 160ms ease',
                }}
              >
                {opt.text}
              </button>
            );
          })}
        </div>

        {this.state.step > 0 && (
          <button
            onClick={this.doBackClick}
            style={{
              marginTop: 24,
              background: 'transparent',
              border: 'none',
              color: '#9A87A8',
              fontSize: 14,
              cursor: 'pointer',
              padding: '6px 2px',
            }}
          >
            &larr; Back
          </button>
        )}
      </div>
    );
  };

  renderResults = (): JSX.Element => {
    const scores = this.getScores();
    const ranked = (Object.keys(scores) as Language[])
      .map((k) => ({ key: k, score: scores[k], ...LANGUAGE_META[k] }))
      .sort((a, b) => b.score - a.score);
    const top = ranked[0];
    const tied = ranked.filter((r) => r.score === top.score);
    const maxScore = Math.max(top.score, 1);

    return (
      <div>
        <div
          style={{
            fontSize: 13,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#B89BC4',
            marginBottom: 14,
            textAlign: 'center',
          }}
        >
          Your love language
        </div>
        <h1
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 'clamp(30px, 6vw, 46px)',
            fontWeight: 500,
            textAlign: 'center',
            margin: '0 0 8px',
            color: top.color,
          }}
        >
          {tied.length > 1 ? tied.map((t) => t.name).join(' + ') : top.name}
        </h1>
        {tied.length > 1 && (
          <p style={{ textAlign: 'center', color: '#C9B8D4', fontSize: 15, margin: '0 0 12px' }}>
            A tie - you speak more than one language fluently.
          </p>
        )}
        <p
          style={{
            fontSize: 16.5,
            lineHeight: 1.65,
            color: '#DFD3E6',
            textAlign: 'center',
            maxWidth: 520,
            margin: '8px auto 36px',
          }}
        >
          {top.blurb}
        </p>

        <div
          style={{
            background: 'rgba(255,255,255,0.045)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: '26px 24px',
          }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#B89BC4',
              marginBottom: 18,
            }}
          >
            Your full profile
          </div>
          {ranked.map((r) => (
            <div key={r.key} style={{ marginBottom: 16 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 14,
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontWeight: r.score === top.score ? 700 : 400,
                    color: r.score === top.score ? r.color : '#C9B8D4',
                  }}
                >
                  {r.name}
                </span>
                <span style={{ color: '#9A87A8' }}>{r.score}/10</span>
              </div>
              <div
                style={{
                  height: 10,
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.07)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${(r.score / maxScore) * 100}%`,
                    height: '100%',
                    borderRadius: 999,
                    background: r.color,
                    transition: 'width 700ms ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <button
            onClick={this.doRestartClick}
            style={{
              background: 'transparent',
              color: '#F2A7C3',
              border: '1.5px solid rgba(242,167,195,0.5)',
              borderRadius: 999,
              padding: '12px 34px',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Take it again
          </button>
        </div>
      </div>
    );
  };
}