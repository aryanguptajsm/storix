// Storix Onboarding Chat Assistant — Knowledge Base & Response Engine

export type Surface = 'landing' | 'auth' | 'dashboard' | 'storefront' | 'pricing';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  quickActions?: QuickAction[];
}

export interface QuickAction {
  label: string;
  action: string; // either a question to ask or a route to navigate
  type: 'question' | 'navigate';
  icon?: string;
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  route?: string;
}

// ── Onboarding Checklist ───────────────────────────────────────────────
export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'create_account',
    title: 'Create your account',
    description: 'Sign up with email or Google to get started.',
    completed: false,
    route: '/signup',
  },
  {
    id: 'setup_store',
    title: 'Name your store',
    description: 'Give your affiliate store a catchy name and description.',
    completed: false,
    route: '/dashboard/settings',
  },
  {
    id: 'choose_theme',
    title: 'Choose a theme',
    description: 'Pick a visual theme that matches your brand personality.',
    completed: false,
    route: '/dashboard/settings',
  },
  {
    id: 'add_first_product',
    title: 'Add your first product',
    description: 'Paste an Amazon or Flipkart link and let AI do the rest.',
    completed: false,
    route: '/dashboard/add-product',
  },
  {
    id: 'preview_store',
    title: 'Preview your storefront',
    description: 'See how your store looks to visitors.',
    completed: false,
  },
  {
    id: 'share_store',
    title: 'Share your store link',
    description: 'Copy your store URL and start promoting!',
    completed: false,
  },
];

// ── FAQ Knowledge Base ─────────────────────────────────────────────────
interface FAQEntry {
  keywords: string[];
  question: string;
  answer: string;
  surface?: Surface[];
  quickActions?: QuickAction[];
}

const FAQ_DATABASE: FAQEntry[] = [
  // ── Getting Started ──
  {
    keywords: ['what is storix', 'about', 'what does', 'explain', 'how does storix work'],
    question: 'What is Storix?',
    answer: `**Storix** is an AI-powered affiliate store builder. You paste product links from Amazon or Flipkart, our AI generates optimized titles and descriptions, and you get a beautiful, ready-to-share storefront — all in minutes.\n\nNo coding, no design skills, no inventory needed. Just pick products you love, and start earning commissions from every click! 🚀`,
    quickActions: [
      { label: 'Get Started Free', action: '/signup', type: 'navigate', icon: '🚀' },
      { label: 'See pricing', action: 'What are the plans?', type: 'question', icon: '💰' },
    ],
  },
  {
    keywords: ['get started', 'start', 'begin', 'how to', 'new', 'first step', 'setup'],
    question: 'How do I get started?',
    answer: `Getting started with Storix is super easy! Here's a quick rundown:\n\n1. **Sign up** — Create a free account with email or Google\n2. **Name your store** — Choose a store name and username (this becomes your URL)\n3. **Pick a theme** — Choose from 4 stunning visual themes\n4. **Add products** — Paste Amazon/Flipkart links, our AI handles the rest\n5. **Share & earn** — Copy your store link and start sharing!\n\nThe whole process takes less than 5 minutes. Ready to go?`,
    quickActions: [
      { label: 'Create Account', action: '/signup', type: 'navigate', icon: '✨' },
      { label: 'How does AI work?', action: 'How does the AI title generation work?', type: 'question', icon: '🤖' },
    ],
  },
  // ── Account & Auth ──
  {
    keywords: ['sign up', 'register', 'create account', 'signup', 'join'],
    question: 'How do I sign up?',
    answer: `You can create your Storix account in two ways:\n\n• **Email & Password** — Enter your email, choose a password, pick a username and store name\n• **Google Sign-In** — One-click signup with your Google account (we auto-generate a username for you)\n\nBoth methods are free and give you instant access to your dashboard!`,
    quickActions: [
      { label: 'Sign Up Now', action: '/signup', type: 'navigate', icon: '🔐' },
      { label: 'Sign In', action: '/login', type: 'navigate', icon: '👋' },
    ],
  },
  {
    keywords: ['login', 'sign in', 'cant login', 'access', 'forgot password'],
    question: 'How do I log in?',
    answer: `Head to the **Sign In** page and enter your email and password, or use Google Sign-In.\n\nIf you forgot your password, click "Forgot password?" on the login page to reset it.\n\n💡 **Tip:** If you signed up with Google, always use the "Continue with Google" button to log in.`,
    quickActions: [
      { label: 'Go to Login', action: '/login', type: 'navigate', icon: '🔑' },
    ],
  },
  // ── Products ──
  {
    keywords: ['add product', 'product', 'paste link', 'amazon', 'flipkart', 'affiliate link', 'import'],
    question: 'How do I add products?',
    answer: `Adding products to your store is as easy as copy-paste!\n\n1. Go to **Dashboard → Add Product**\n2. Paste any Amazon or Flipkart product link\n3. Storix automatically scrapes the title, image, and price\n4. Our **Gemini AI** generates an optimized, click-worthy title\n5. Click "Add to Store" and you're done!\n\nProducts appear on your live storefront instantly. 🎯`,
    surface: ['dashboard'],
    quickActions: [
      { label: 'Add Product Now', action: '/dashboard/add-product', type: 'navigate', icon: '➕' },
      { label: 'View my products', action: '/dashboard/products', type: 'navigate', icon: '📦' },
    ],
  },
  {
    keywords: ['edit product', 'change product', 'update product', 'modify'],
    question: 'Can I edit products after adding them?',
    answer: `Yes! Go to **Dashboard → Products**, click on any product, and you can edit:\n\n• Product title\n• Description\n• Price information\n• Product image\n• Affiliate link\n\nChanges are reflected on your live storefront immediately.`,
    surface: ['dashboard'],
    quickActions: [
      { label: 'My Products', action: '/dashboard/products', type: 'navigate', icon: '📦' },
    ],
  },
  // ── Store & Themes ──
  {
    keywords: ['theme', 'design', 'look', 'appearance', 'style', 'customize', 'color'],
    question: 'How do I customize my store theme?',
    answer: `Storix offers **4 beautiful themes** to make your store stand out:\n\n🔴 **Default** — Clean, Shopify-style with vibrant energy\n🟣 **Midnight Premium** — Sleek dark theme, professional feel\n⚪ **Minimalist** — Pure white-label, distraction-free\n🟢 **Cyber Neon** — Futuristic, bold, and eye-catching\n\nGo to **Store Settings → Visual Themes** to switch. Changes apply instantly to your live storefront!`,
    quickActions: [
      { label: 'Go to Settings', action: '/dashboard/settings', type: 'navigate', icon: '🎨' },
    ],
  },
  {
    keywords: ['store url', 'store link', 'share', 'domain', 'website', 'my store', 'view store'],
    question: 'Where is my store link?',
    answer: `Your store lives at: **storix.ai/store/your-username**\n\nYou can find and copy your store link right from the **Dashboard** — look for the "Copy Link" button at the top.\n\nYou can also click "Live Store" to preview how your storefront looks to visitors!\n\n📱 Share it anywhere — social media, WhatsApp, bio links, blogs, and more.`,
    quickActions: [
      { label: 'Go to Dashboard', action: '/dashboard', type: 'navigate', icon: '🏠' },
    ],
  },
  // ── Plans & Pricing ──
  {
    keywords: ['price', 'pricing', 'plan', 'plans', 'cost', 'free', 'premium', 'pro', 'business', 'upgrade', 'subscription'],
    question: 'What are the plans?',
    answer: `Storix has 3 plans to match your ambitions:\n\n🆓 **Free** — ₹0/month\n• Up to 10 products, 1 storefront\n• Basic themes, click analytics, AI titles\n\n⭐ **Pro** — ₹699/month *(Most Popular)*\n• Up to 100 products, 3 storefronts\n• All premium themes, custom domain\n• AI description writer, WhatsApp integration\n\n🏢 **Business** — ₹1,999/month\n• Unlimited products, 10 storefronts\n• Everything in Pro + bulk import, white-label\n• Priority support\n\nStart free, upgrade when you're ready to scale! 📈`,
    quickActions: [
      { label: 'View Pricing', action: '/pricing', type: 'navigate', icon: '💎' },
      { label: 'Start Free', action: '/signup', type: 'navigate', icon: '🚀' },
    ],
  },
  {
    keywords: ['limit', 'product limit', 'how many', 'maximum', 'restrict'],
    question: 'What are the product limits?',
    answer: `Each plan has different product limits:\n\n• **Free** — Up to 10 products\n• **Pro** — Up to 100 products\n• **Business** — Unlimited products!\n\nYou can check your current usage on the Dashboard. When you're near the limit, we'll prompt you to upgrade. 📊`,
    quickActions: [
      { label: 'Check my usage', action: '/dashboard', type: 'navigate', icon: '📊' },
      { label: 'Upgrade plan', action: '/pricing', type: 'navigate', icon: '⬆️' },
    ],
  },
  // ── AI Features ──
  {
    keywords: ['ai', 'gemini', 'artificial intelligence', 'title generation', 'auto', 'ai title', 'ai description'],
    question: 'How does the AI title generation work?',
    answer: `Storix uses **Google's Gemini AI** to supercharge your product listings:\n\n🤖 **AI Title Generator** — When you paste a product link, Gemini analyzes the product and generates a click-optimized, SEO-friendly title that drives more traffic.\n\n✍️ **AI Description Writer** *(Pro plan)* — Gemini writes compelling product descriptions that convert browsers into buyers.\n\nAll AI-generated content is editable — you always have the final say!`,
    quickActions: [
      { label: 'Try it now', action: '/dashboard/add-product', type: 'navigate', icon: '✨' },
    ],
  },
  // ── Analytics ──
  {
    keywords: ['analytics', 'clicks', 'tracking', 'stats', 'statistics', 'earnings', 'revenue', 'performance'],
    question: 'How do I track my performance?',
    answer: `Your **Dashboard** shows real-time stats at a glance:\n\n📦 **Total Products** — How many items are in your store\n🖱️ **Total Clicks** — Every affiliate click tracked automatically\n💰 **Est. Earnings** — Projected revenue based on click data\n\nFor detailed analytics, check the **Earnings** tab in your dashboard sidebar.\n\n💡 **Pro Tip:** Products with AI-optimized titles get ~3x more clicks!`,
    quickActions: [
      { label: 'View Dashboard', action: '/dashboard', type: 'navigate', icon: '📊' },
      { label: 'View Earnings', action: '/dashboard/earnings', type: 'navigate', icon: '💰' },
    ],
  },
  // ── Technical ──
  {
    keywords: ['support', 'help', 'contact', 'issue', 'problem', 'bug', 'error'],
    question: 'How can I get help?',
    answer: `I'm here to help! Here are your support options:\n\n💬 **Chat with me** — I can answer most questions about setting up and using Storix\n📧 **Email support** — Reach our team at support@storix.ai\n⭐ **Priority support** — Available on the Business plan for faster responses\n\nWhat specific issue can I help you with?`,
  },
  {
    keywords: ['delete', 'remove', 'cancel', 'deactivate', 'close account'],
    question: 'How do I delete my account?',
    answer: `To delete your Storix account:\n\n1. Go to **Store Settings** → **Security** tab\n2. Click **"Request Deletion"** in the Danger Sector\n3. Confirm your decision\n\n⚠️ **Warning:** This permanently deletes your store, all products, and analytics data. This cannot be undone.\n\nIf you're having issues, I'd love to help first before you go!`,
    quickActions: [
      { label: 'Go to Settings', action: '/dashboard/settings', type: 'navigate', icon: '⚙️' },
      { label: 'Tell me your issue', action: 'I need help with something', type: 'question', icon: '💬' },
    ],
  },
];

// ── Surface-Specific Welcome Messages ────────────────────────────────
export function getWelcomeMessage(surface: Surface, storeName?: string): ChatMessage {
  const messages: Record<Surface, { content: string; quickActions: QuickAction[] }> = {
    landing: {
      content: `Hey there! 👋 Welcome to **Storix** — the easiest way to build your own AI-powered affiliate store.\n\nI'm your setup assistant. I can help you understand how Storix works, guide you through creating your store, or answer any questions.\n\nWhat would you like to know?`,
      quickActions: [
        { label: 'What is Storix?', action: 'What is Storix?', type: 'question', icon: '💡' },
        { label: 'How to get started', action: 'How do I get started?', type: 'question', icon: '🚀' },
        { label: 'View pricing', action: 'What are the plans?', type: 'question', icon: '💰' },
        { label: 'Create account', action: '/signup', type: 'navigate', icon: '✨' },
      ],
    },
    auth: {
      content: `Welcome! 🔐 Need help signing in or creating your Storix account?\n\nI can walk you through the signup process or help troubleshoot login issues.`,
      quickActions: [
        { label: 'Help me sign up', action: 'How do I sign up?', type: 'question', icon: '📝' },
        { label: 'Login issues', action: 'I cant login to my account', type: 'question', icon: '🔑' },
        { label: 'What is Storix?', action: 'What is Storix?', type: 'question', icon: '💡' },
      ],
    },
    dashboard: {
      content: `Hey${storeName ? `, **${storeName}**` : ''}! 🎉 Welcome to your command center.\n\nI'm here to help you set up and optimize your affiliate store. Whether you need to add products, customize your theme, or understand your analytics — I've got you covered.\n\nWhat would you like help with?`,
      quickActions: [
        { label: 'Add first product', action: 'How do I add products?', type: 'question', icon: '➕' },
        { label: 'Customize theme', action: 'How do I customize my store theme?', type: 'question', icon: '🎨' },
        { label: 'Track performance', action: 'How do I track my performance?', type: 'question', icon: '📊' },
        { label: 'Find my store link', action: 'Where is my store link?', type: 'question', icon: '🔗' },
      ],
    },
    storefront: {
      content: `Welcome to the storefront preview! 👀\n\nNeed help making your store even better? I can guide you through theme customization, product management, and optimization tips.`,
      quickActions: [
        { label: 'Change theme', action: 'How do I customize my store theme?', type: 'question', icon: '🎨' },
        { label: 'Add more products', action: 'How do I add products?', type: 'question', icon: '➕' },
        { label: 'Optimize for SEO', action: 'How does the AI title generation work?', type: 'question', icon: '🤖' },
      ],
    },
    pricing: {
      content: `Looking at our plans? 💎 Great choice! I can help you find the perfect plan for your needs.\n\nFeel free to ask about features, limits, or anything else!`,
      quickActions: [
        { label: 'Compare plans', action: 'What are the plans?', type: 'question', icon: '📋' },
        { label: 'Product limits', action: 'What are the product limits?', type: 'question', icon: '📦' },
        { label: 'Start free', action: '/signup', type: 'navigate', icon: '🚀' },
      ],
    },
  };

  const msg = messages[surface];
  return {
    id: 'welcome',
    role: 'assistant',
    content: msg.content,
    timestamp: new Date(),
    quickActions: msg.quickActions,
  };
}

// ── Response Engine ────────────────────────────────────────────────────
export function findBestResponse(userMessage: string, surface: Surface): ChatMessage {
  const normalizedInput = userMessage.toLowerCase().trim();
  
  // Score each FAQ entry by keyword match relevance
  let bestMatch: FAQEntry | null = null;
  let bestScore = 0;

  for (const entry of FAQ_DATABASE) {
    // Skip entries that don't apply to this surface
    if (entry.surface && !entry.surface.includes(surface)) continue;

    let score = 0;
    for (const keyword of entry.keywords) {
      if (normalizedInput.includes(keyword)) {
        // Longer keyword matches are worth more
        score += keyword.length;
      }
    }

    // Boost exact question matches
    if (normalizedInput === entry.question.toLowerCase()) {
      score += 100;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      role: 'assistant',
      content: bestMatch.answer,
      timestamp: new Date(),
      quickActions: bestMatch.quickActions,
    };
  }

  // Fallback response
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    role: 'assistant',
    content: `Great question! While I may not have the exact answer, here are some things I can help you with:\n\n• **Getting started** — Set up your affiliate store\n• **Adding products** — Import from Amazon/Flipkart\n• **Customization** — Themes, settings, and branding\n• **Plans & pricing** — Find the right plan for you\n• **Analytics** — Track your clicks and earnings\n\nTry asking about any of these topics, or rephrase your question and I'll do my best! 💬`,
    timestamp: new Date(),
    quickActions: [
      { label: 'How to get started', action: 'How do I get started?', type: 'question', icon: '🚀' },
      { label: 'Add a product', action: 'How do I add products?', type: 'question', icon: '➕' },
      { label: 'View plans', action: 'What are the plans?', type: 'question', icon: '💰' },
      { label: 'Get support', action: 'How can I get help?', type: 'question', icon: '🆘' },
    ],
  };
}

// ── Greeting Messages ──────────────────────────────────────────────────
const GREETING_RESPONSES = [
  'Hey there! 👋 How can I help you with your Storix store today?',
  'Hi! 😊 Welcome! What can I help you with?',
  'Hello! Great to see you. What would you like to know about Storix?',
  'Hey! 🚀 Ready to build something awesome? How can I assist?',
];

export function isGreeting(message: string): boolean {
  const greetings = ['hi', 'hello', 'hey', 'yo', 'sup', 'howdy', 'hola', 'good morning', 'good evening', 'good afternoon', 'thanks', 'thank you', 'ty'];
  const normalized = message.toLowerCase().trim();
  return greetings.some(g => normalized === g || normalized.startsWith(g + ' ') || normalized.startsWith(g + '!'));
}

export function getGreetingResponse(): string {
  return GREETING_RESPONSES[Math.floor(Math.random() * GREETING_RESPONSES.length)];
}
