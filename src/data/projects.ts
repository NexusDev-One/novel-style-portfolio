export interface Chapter {
  id: string;
  number: number;
  romanNumeral: string;
  title: string;
  subtitle: string;
  tagline: string;
  role: string;
  duration: string;
  team: string;
  tools: string[];
  color: string;
  accentColor: string;
  textColor: string;
  wireframeImage: string;
  finalImage: string;
  sketchImage: string;
  sections: Section[];
  outcome: Outcome;
  tags: string[];
}

export interface Section {
  id: string;
  label: string;
  heading: string;
  body: string[];
  quote?: string;
  pullQuote?: string;
  marginNote?: string;
  type: 'text' | 'reveal' | 'comparison' | 'metrics';
  metrics?: Metric[];
}

export interface Metric {
  value: string;
  label: string;
  delta?: string;
}

export interface Outcome {
  headline: string;
  summary: string;
  metrics: Metric[];
}

export const chapters: Chapter[] = [
  {
    id: "vaultbank",
    number: 1,
    romanNumeral: "I",
    title: "The Architecture of Trust",
    subtitle: "VaultBank — A Mobile Banking Redesign",
    tagline: "How do you make people feel safe with their money in the digital age?",
    role: "Lead UX Designer",
    duration: "6 months · 2023",
    team: "4 designers, 3 engineers, 1 PM",
    tools: ["Figma", "Maze", "Hotjar", "Lottie"],
    color: "#1a2744",
    accentColor: "#b8963e",
    textColor: "#f5f0e8",
    wireframeImage: "/images/project1-wireframe.png",
    finalImage: "/images/project1-final.png",
    sketchImage: "/images/sketch-bg.png",
    tags: ["Fintech", "Mobile", "iOS", "Android"],
    sections: [
      {
        id: "prologue",
        label: "Prologue",
        type: "text",
        heading: "The Problem with Invisible Money",
        body: [
          "Money used to have weight. You could feel it, count it, fold it into your pocket. Digital banking stripped all of that away — leaving users with a sea of numbers, notifications, and a creeping anxiety they couldn't quite name.",
          "VaultBank came to us with a single, deceptively simple request: make people feel their money is safe. Not just know it — feel it. The distinction would become the compass for every decision we made over the next six months.",
          "We inherited an app that worked. Transactions processed. Balances displayed. But our NPS score of 23 told a different story — one of users who used the app because they had to, not because they wanted to."
        ],
        marginNote: "NPS of 23 meant 42% of users were active detractors",
        pullQuote: "Make people feel their money is safe. Not just know it — feel it."
      },
      {
        id: "research",
        label: "Chapter I",
        type: "text",
        heading: "Listening Before Drawing",
        body: [
          "We conducted 34 contextual interviews across three cities, shadowing users as they checked balances, transferred funds, and worried silently about overdrafts. We watched a retired teacher refresh her balance four times in two minutes — not because the number changed, but because the act of looking made her feel in control.",
          "Pattern after pattern emerged: users didn't want more features. They wanted fewer surprises. Every unexpected notification, every ambiguous pending charge, every 3-second loading spinner eroded the trust we were trying to build.",
          "Our affinity mapping session filled three walls with sticky notes. When we stepped back, the clusters were undeniable: the app spoke in bank language, not human language."
        ],
        quote: "\"I don't need the app to be fancy. I just need to trust it.\" — Interview participant #17",
        marginNote: "34 interviews, 8 contextual shadowing sessions, 2,400 survey responses"
      },
      {
        id: "wireframes",
        label: "Chapter II",
        type: "reveal",
        heading: "Sketching Safety Into Structure",
        body: [
          "The wireframing phase began with a radical constraint: no feature additions for the first three weeks. Every sketch had to earn its place by solving an existing problem, not introducing new complexity.",
          "We explored 14 different dashboard architectures before settling on what we called the 'Ledger View' — a design language borrowed from the clarity and permanence of handwritten accounting books. Numbers felt anchored. Transactions felt intentional.",
          "The breakthrough came on a Tuesday afternoon when a junior designer suggested treating pending transactions as 'footnotes' — visually subordinate to confirmed balances, but accessible and honest. It was so obvious in retrospect."
        ],
        marginNote: "14 dashboard concepts explored, 3 survived user testing"
      },
      {
        id: "design",
        label: "Chapter III",
        type: "comparison",
        heading: "From Blueprint to Breath",
        body: [
          "When wireframes became high-fidelity screens, we made a controversial choice: we went dark. Not for aesthetics, but for psychology. Research on cognitive load suggested that darker interfaces reduced visual noise and helped users focus on what mattered — their numbers.",
          "Navy and gold became our vocabulary. Not because they look like a bank, but because they feel like a vault — secure, permanent, precious. Every micro-interaction was choreographed to feel like the satisfying click of a well-engineered mechanism.",
          "We built a custom Lottie animation system for transaction confirmations that lasted exactly 600 milliseconds — short enough to not delay the user, long enough to feel meaningful. The haptic feedback pattern was tuned over 22 iterations."
        ],
        marginNote: "22 haptic feedback iterations, 6 user testing rounds",
        pullQuote: "Every micro-interaction was choreographed to feel like the satisfying click of a well-engineered mechanism."
      },
      {
        id: "testing",
        label: "Chapter IV",
        type: "metrics",
        heading: "The Numbers That Rewrote the Story",
        body: [
          "We ran a 6-week beta with 1,200 users across our existing customer base. The results arrived quietly — just a spreadsheet pinged to the team Slack at 7am on a Thursday. But the numbers inside changed everything.",
          "The redesigned app didn't just perform better. It changed how users talked about the experience. Where beta participants once used words like 'stressful' and 'confusing,' post-redesign sessions surfaced words like 'calm,' 'clear,' and — most movingly — 'trustworthy.'"
        ],
        metrics: [
          { value: "NPS +67", label: "Net Promoter Score", delta: "From 23 to 71" },
          { value: "−41%", label: "Support Tickets", delta: "Confusion-related tickets" },
          { value: "+28%", label: "Daily Active Use", delta: "Users checking voluntarily" },
          { value: "4.8★", label: "App Store Rating", delta: "From 3.2★" }
        ]
      }
    ],
    outcome: {
      headline: "Trust, at last, had a design.",
      summary: "The VaultBank redesign proved that safety is a feeling, not a feature — and that the most powerful UX work is often invisible. Users didn't notice the new design. They just stopped worrying.",
      metrics: [
        { value: "71", label: "New NPS Score" },
        { value: "1.2M", label: "Users Served" },
        { value: "4.8★", label: "App Store" }
      ]
    }
  },
  {
    id: "maison",
    number: 2,
    romanNumeral: "II",
    title: "The Desire to Belong",
    subtitle: "Maison Éclat — Luxury E-Commerce Experience",
    tagline: "Can a website make you feel the weight of a cashmere scarf?",
    role: "Senior Product Designer",
    duration: "4 months · 2023",
    team: "2 designers, 5 engineers, 1 Creative Director",
    tools: ["Figma", "After Effects", "Webflow", "UserTesting"],
    color: "#2c1810",
    accentColor: "#c4a882",
    textColor: "#f5f0e8",
    wireframeImage: "/images/project2-wireframe.png",
    finalImage: "/images/project2-final.png",
    sketchImage: "/images/sketch-bg.png",
    tags: ["E-Commerce", "Luxury", "Web", "Animation"],
    sections: [
      {
        id: "prologue",
        label: "Prologue",
        type: "text",
        heading: "Selling Without Selling",
        body: [
          "The best luxury boutiques don't sell you anything. They welcome you in, offer you champagne, and trust that the experience will do the rest. Maison Éclat's website, meanwhile, was a catalog with a shopping cart — functional, sterile, unworthy of what it was trying to sell.",
          "A €2,800 cashmere coat deserves more than a product grid. It deserves context, story, aspiration. The creative director handed me a single mood board and said: 'Make people want to live in this world.'",
          "That briefing became a north star that would guide every pixel decision over the next four months."
        ],
        pullQuote: "Make people want to live in this world."
      },
      {
        id: "research",
        label: "Chapter I",
        type: "text",
        heading: "The Anatomy of Aspiration",
        body: [
          "We began by studying not competitors, but experiences. The hush of a Parisian atelier. The weight of a handwritten thank-you note. The precise moment when a saleswoman holds up a garment and you understand, viscerally, why it costs what it costs.",
          "Our user research revealed that Maison Éclat's customers didn't abandon carts because of price. They abandoned because the site failed to bridge the gap between the physical experience they'd had in-store and the transactional coldness of the website.",
          "We called this gap 'the prestige drop' — the measurable loss of perceived value between in-person and digital touchpoints. Our entire redesign was engineered to eliminate it."
        ],
        marginNote: "Cart abandonment at 71%, industry average for luxury is 58%",
        quote: "\"The website feels cheap. The clothes aren't.\" — Customer focus group participant"
      },
      {
        id: "wireframes",
        label: "Chapter II",
        type: "reveal",
        heading: "Editorial Over Commerce",
        body: [
          "We made an early, risky decision: bury the shop. Not hide it — but subordinate it to editorial content. The homepage became a magazine cover, not a storefront. Products appeared in the context of how they'd be worn, not in isolation on white backgrounds.",
          "The wireframes were deliberately slow. White space was generous to the point of discomfort for the commerce team. But white space in luxury retail isn't empty — it's breathing room. It signals that these objects are worth pausing for.",
          "Navigation itself became an experience — a full-screen overlay that felt like opening the pages of a beautifully printed lookbook."
        ],
        marginNote: "Navigation open rate increased 3× in testing"
      },
      {
        id: "design",
        label: "Chapter III",
        type: "comparison",
        heading: "Texture in a Flat Medium",
        body: [
          "The final visual language drew from the vocabulary of printed luxury: cream paper, deep chocolate ink, gold leaf accents. We used variable-weight typography to give headlines the quality of hand-set type — each letter feeling individually chosen.",
          "Product imagery was treated as art direction. Images were never cropped to standard ratios. Instead, they breathed at their natural proportions, accompanied by what we called 'material stories' — brief, sensory descriptions of how each piece was made.",
          "The checkout flow was redesigned as a private consultation — only three steps, each screen feeling as calm and considered as the pause before signing something important."
        ],
        pullQuote: "White space in luxury retail isn't empty — it's breathing room."
      },
      {
        id: "testing",
        label: "Chapter IV",
        type: "metrics",
        heading: "What Beauty Did to the Bottom Line",
        body: [
          "The redesigned site launched in October, timed to coincide with the autumn collection. Within the first month, the data told a story the creative director framed better than any A/B test report could: 'People are staying longer and leaving with more.'",
          "The numbers vindicated every uncomfortable conversation about white space, every argument for fewer products per page, every hour spent obsessing over hover state animations."
        ],
        metrics: [
          { value: "−34%", label: "Cart Abandonment", delta: "71% → 47%" },
          { value: "+189%", label: "Avg. Order Value", delta: "Session-driven increase" },
          { value: "3:47", label: "Avg. Time on Site", delta: "Up from 1:12" },
          { value: "+62%", label: "Return Visitors", delta: "Within 30 days" }
        ]
      }
    ],
    outcome: {
      headline: "The website became the boutique.",
      summary: "Maison Éclat's digital transformation proved that luxury e-commerce isn't about convenience — it's about conviction. The redesign didn't just improve metrics; it repositioned the brand in the customer's mind.",
      metrics: [
        { value: "−34%", label: "Cart Abandonment" },
        { value: "+189%", label: "Avg. Order Value" },
        { value: "4.9★", label: "Customer Rating" }
      ]
    }
  },
  {
    id: "serene",
    number: 3,
    romanNumeral: "III",
    title: "The Quiet Revolution",
    subtitle: "Serene — Mental Wellness App",
    tagline: "Designing for people who are trying to feel better, one breath at a time.",
    role: "UX Lead & Research Director",
    duration: "8 months · 2024",
    team: "3 designers, 4 engineers, 1 clinical psychologist",
    tools: ["Figma", "ProtoPie", "Notion", "Dovetail"],
    color: "#1e3a2f",
    accentColor: "#7eb59a",
    textColor: "#f0f5f2",
    wireframeImage: "/images/project3-wireframe.png",
    finalImage: "/images/project3-final.png",
    sketchImage: "/images/sketch-bg.png",
    tags: ["Health", "Mobile", "Accessibility", "iOS"],
    sections: [
      {
        id: "prologue",
        label: "Prologue",
        type: "text",
        heading: "Designing for the Hard Days",
        body: [
          "Most apps are designed for users at their best. Mental wellness apps are used, most critically, by people at their worst — on days when every interaction feels harder than it should, when the friction of logging in is enough to abandon the attempt.",
          "Serene came to us after two failed launches. Their content was excellent. Their clinical team was world-class. But their app felt like a hospital waiting room — functional, but cold. Users who needed it most were leaving before they started.",
          "We were asked to redesign with a single guiding principle: reduce the cost of trying."
        ],
        pullQuote: "Reduce the cost of trying."
      },
      {
        id: "research",
        label: "Chapter I",
        type: "text",
        heading: "Research as Responsibility",
        body: [
          "Designing for mental health requires a different kind of research ethic. Every interview began with a clear debrief protocol, co-designed with our clinical psychologist advisor. We talked to 28 people about their wellness journeys — moments of progress, moments of abandonment, and the spaces in between.",
          "We learned that the biggest barrier to engagement wasn't motivation. It was shame — the quiet, persistent shame of opening an app and seeing how many days you'd missed your streak. Every gamification mechanic we'd inherited was a tiny punisher.",
          "The design direction crystallized in a single insight: this app should feel like a friend who's glad you showed up, not a system that tracks your failures."
        ],
        quote: "\"I stopped using it because it made me feel worse about not using it.\" — Research participant",
        marginNote: "28 participants, trauma-informed research protocols, IRB-reviewed methodology"
      },
      {
        id: "wireframes",
        label: "Chapter II",
        type: "reveal",
        heading: "The Architecture of Gentleness",
        body: [
          "Every wireframe decision was filtered through what we called the 'hard day test': would a user in genuine distress be able to complete this action? If a flow required more than two taps to reach a breathing exercise, we redesigned it.",
          "We abolished streaks entirely and replaced them with 'moments found' — a gentle acknowledgment of whenever a user showed up, without comparison to when they hadn't. The language throughout the app was rewritten to feel like a conversation, not a system.",
          "Accessibility was elevated from compliance to philosophy. Every design choice was evaluated for its impact on users with anxiety, ADHD, and depression — not as edge cases, but as the core audience."
        ],
        marginNote: "WCAG AAA compliance, dyslexia-optimized font choices, reduced motion modes"
      },
      {
        id: "design",
        label: "Chapter III",
        type: "comparison",
        heading: "Color as Medicine",
        body: [
          "The visual language of Serene was built around a single color insight: humans find sage green physiologically calming. Studies of color psychology in clinical settings consistently show reduced cortisol response to green-adjacent palettes.",
          "We built a color system that gently shifted throughout the day — cooler and more muted in the morning, warmer and more golden in the evening. The app's interface adapted to circadian rhythms, never demanding attention with high-contrast alerts.",
          "Typography was set in an extended, generous line spacing that encouraged reading at a slower pace. Nothing about the interface hurried you."
        ],
        pullQuote: "The app's interface adapted to circadian rhythms, never demanding attention."
      },
      {
        id: "testing",
        label: "Chapter IV",
        type: "metrics",
        heading: "Measuring What Matters",
        body: [
          "We tracked outcomes we'd never tracked before: not just retention, but self-reported wellbeing scores at 30, 60, and 90 days. We partnered with a clinical research team to run a parallel study measuring anxiety levels in a sample of 400 users.",
          "The results were the most meaningful metrics of my career — not because they were large, but because of what they represented. Behind each percentage point was a person who'd had a slightly easier day."
        ],
        metrics: [
          { value: "+84%", label: "30-Day Retention", delta: "From 31% to 57%" },
          { value: "−29%", label: "Anxiety Scores", delta: "Clinical measurement at 90 days" },
          { value: "2.1M", label: "Sessions Monthly", delta: "At 6-month post-launch" },
          { value: "4.9★", label: "App Store Rating", delta: "\"Finally an app that gets it\"" }
        ]
      }
    ],
    outcome: {
      headline: "Gentleness, it turns out, is good design.",
      summary: "Serene proved that the most radical design choices are sometimes the most human ones. By removing pressure, removing judgment, and centering the user's experience over measurable engagement, we built something people actually wanted to return to.",
      metrics: [
        { value: "+84%", label: "Retention" },
        { value: "−29%", label: "Anxiety Scores" },
        { value: "2.1M", label: "Monthly Sessions" }
      ]
    }
  }
];
