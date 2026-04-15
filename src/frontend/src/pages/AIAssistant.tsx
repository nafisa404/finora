import { PageContainer, PageHeader } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useFinanceStore } from "@/store/useFinanceStore";
import { format } from "date-fns";
import {
  Bot,
  Send,
  Sparkles,
  Trash2,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Mock responses — at least 10 varied canned answers
// ---------------------------------------------------------------------------
const MOCK_RESPONSES: Record<string, string> = {
  default:
    "Based on your recent patterns, your top expense category is Food & Dining at 19% of your monthly budget. Would you like specific tips to optimise your spending?",

  budget:
    "Your current monthly budget is $2,350. You've used about 68% so far this month. To stay on track, aim to keep daily spending under $78 for the rest of the month.",

  spending:
    "Your spending this week is up 12% compared to last week. The biggest driver is Food & Dining (+$45) and Entertainment (+$30). Want a breakdown of where the extra spending occurred?",

  save: "You're at 52% of your $50,000 savings goal — great progress! At your current rate you'll reach it in ~14 months. Increasing monthly savings by just $150 could shave 2 months off that timeline.",

  food: "Your Food & Dining spend this month is $454 — that's 19% of your total budget. The average for your income bracket is closer to 12%. Meal prepping 3 days a week could save you ~$80/month.",

  transport:
    "Transportation costs you $187 this month. If you use public transit 3 days a week instead of rideshares, you could save approximately $55/month — that's $660/year.",

  entertainment:
    "Entertainment spend is $120 this month, which is within a healthy 5–8% range. Your streaming subscriptions alone total $42/month — worth reviewing which ones you actively use.",

  invest:
    "With your current savings rate, you could comfortably start investing $200–300/month. Low-cost index funds (e.g. S&P 500 ETFs) are great for beginners — they're diversified and historically return ~10%/year long-term.",

  tip: "Here are 3 quick financial wins: (1) Set up automatic transfers to savings on payday. (2) Use the 48-hour rule before any purchase over $50. (3) Review subscriptions monthly — the average person overpays $240/year on unused subs.",

  help: "I can help you with: spending analysis, budget planning, savings strategies, anomaly detection, category-specific advice, and investment basics. Just ask me anything about your finances!",

  anomaly:
    "I've detected 2 unusual transactions recently — a $280 Food & Dining charge (3.2× your average) and a $1,200 Housing payment. The food charge is flagged as a likely anomaly. Would you like me to explain how anomaly detection works?",

  goal: "Your savings goal of $50,000 is 52% complete ($26,000 saved). Based on your monthly surplus of ~$1,850, you're on pace to hit the target in 14 months. Want to simulate how extra contributions would affect the timeline?",

  debt: "Managing debt effectively: prioritise high-interest debt first (avalanche method). If you have multiple debts, I'd recommend listing them by interest rate — paying off the highest rate first saves the most money long-term.",

  hello:
    "Hello! I'm Finora, your personal AI financial assistant. I can help you understand your spending patterns, detect anomalies, suggest savings strategies, and answer financial questions. How can I help you today?",
};

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey"))
    return MOCK_RESPONSES.hello;
  if (
    lower.includes("food") ||
    lower.includes("dining") ||
    lower.includes("restaurant")
  )
    return MOCK_RESPONSES.food;
  if (
    lower.includes("transport") ||
    lower.includes("uber") ||
    lower.includes("rideshare") ||
    lower.includes("commut")
  )
    return MOCK_RESPONSES.transport;
  if (
    lower.includes("entertain") ||
    lower.includes("subscri") ||
    lower.includes("stream")
  )
    return MOCK_RESPONSES.entertainment;
  if (
    lower.includes("invest") ||
    lower.includes("stock") ||
    lower.includes("fund") ||
    lower.includes("portfolio")
  )
    return MOCK_RESPONSES.invest;
  if (lower.includes("budget")) return MOCK_RESPONSES.budget;
  if (lower.includes("spend")) return MOCK_RESPONSES.spending;
  if (lower.includes("sav") || lower.includes("goal"))
    return MOCK_RESPONSES.save;
  if (
    lower.includes("tip") ||
    lower.includes("advice") ||
    lower.includes("suggest")
  )
    return MOCK_RESPONSES.tip;
  if (lower.includes("help") || lower.includes("what can"))
    return MOCK_RESPONSES.help;
  if (
    lower.includes("anomal") ||
    lower.includes("unusual") ||
    lower.includes("alert") ||
    lower.includes("warning")
  )
    return MOCK_RESPONSES.anomaly;
  if (
    lower.includes("debt") ||
    lower.includes("loan") ||
    lower.includes("credit")
  )
    return MOCK_RESPONSES.debt;
  if (lower.includes("goal") || lower.includes("target"))
    return MOCK_RESPONSES.goal;
  return MOCK_RESPONSES.default;
}

// ---------------------------------------------------------------------------
// Quick prompts
// ---------------------------------------------------------------------------
const QUICK_PROMPTS = [
  { label: "Budget overview", icon: Wallet },
  { label: "Tips to save more", icon: TrendingDown },
  { label: "Any unusual spending?", icon: TrendingUp },
  { label: "Investment basics", icon: Sparkles },
];

// ---------------------------------------------------------------------------
// Typing indicator dots
// ---------------------------------------------------------------------------
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="flex gap-3 items-end"
      data-ocid="ai.typing_indicator"
    >
      <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
        <Bot className="h-4 w-4 text-primary" />
      </div>
      <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-card">
        <div className="flex gap-1.5 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-muted-foreground/50"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 0.7,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function AIAssistant() {
  const messages = useFinanceStore((s) => s.chatMessages);
  const addChatMessage = useFinanceStore((s) => s.addChatMessage);
  const clearChat = useFinanceStore((s) => s.clearChat);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const messageCount = messages.length;

  // Scroll to bottom when messages or typing indicator change
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll trigger only cares about count/typing
  useEffect(scrollToBottom, [messageCount, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    addChatMessage({
      id: `user-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: Date.now(),
    });

    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay 800–1600ms
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 800));

    addChatMessage({
      id: `ai-${Date.now()}`,
      role: "assistant",
      content: getMockResponse(text),
      timestamp: Date.now(),
    });
    setIsTyping(false);

    // Refocus input after response
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <PageContainer className="flex flex-col h-[calc(100vh-4rem)] py-4 md:py-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <PageHeader
          title="AI Assistant"
          description="Ask Finora anything about your finances"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={clearChat}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-smooth mt-0.5 flex-shrink-0"
          data-ocid="ai.clear_chat_button"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Clear chat</span>
        </Button>
      </div>

      {/* Chat message area */}
      <div
        className="flex-1 overflow-y-auto rounded-2xl bg-card border border-border shadow-card min-h-0 flex flex-col"
        data-ocid="ai.chat_container"
      >
        {/* Inner scroll area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className={cn(
                  "flex gap-2.5 items-end",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row",
                )}
                data-ocid={`ai.message.item.${idx + 1}`}
              >
                {/* Avatar — assistant only */}
                {msg.role === "assistant" && (
                  <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mb-0.5">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={cn(
                    "max-w-[78%] md:max-w-[70%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-card break-words",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary/80 text-foreground border border-border/60 rounded-bl-sm",
                  )}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <p
                    className={cn(
                      "text-[10px] mt-1.5 select-none",
                      msg.role === "user"
                        ? "text-primary-foreground/60 text-right"
                        : "text-muted-foreground",
                    )}
                  >
                    {format(new Date(msg.timestamp), "HH:mm")}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Quick prompts */}
      <div className="flex gap-2 mt-3 flex-wrap" data-ocid="ai.quick_prompts">
        {QUICK_PROMPTS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => sendMessage(label)}
            disabled={isTyping}
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-border bg-card hover:bg-secondary/70 text-muted-foreground hover:text-foreground transition-smooth disabled:opacity-40 disabled:cursor-not-allowed shadow-card"
            data-ocid="ai.quick_prompt"
          >
            <Icon className="h-3 w-3" />
            {label}
          </button>
        ))}
      </div>

      {/* Input row */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 mt-3 items-end"
        data-ocid="ai.chat_form"
      >
        <div className="flex-1 relative">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your finances… (Enter to send, Shift+Enter for newline)"
            className="resize-none min-h-[44px] max-h-32 pr-4 rounded-xl border-border bg-card shadow-card text-sm transition-smooth focus:shadow-card-hover"
            rows={1}
            disabled={isTyping}
            data-ocid="ai.message_input"
          />
        </div>
        <Button
          type="submit"
          size="icon"
          className="h-11 w-11 flex-shrink-0 rounded-xl shadow-card transition-smooth"
          disabled={!input.trim() || isTyping}
          data-ocid="ai.send_button"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </PageContainer>
  );
}
