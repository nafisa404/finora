import type { Alert, ChatMessage, Expense } from "@/types";
import { create } from "zustand";

interface FinanceState {
  expenses: Expense[];
  alerts: Alert[];
  chatMessages: ChatMessage[];

  setExpenses: (expenses: Expense[]) => void;
  addExpenseLocal: (expense: Expense) => void;
  removeExpenseLocal: (id: number) => void;

  setAlerts: (alerts: Alert[]) => void;
  dismissAlert: (id: string) => void;
  addAlert: (alert: Alert) => void;

  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;
}

const initialChatMessages: ChatMessage[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content:
      "Hello! I'm Finora, your AI-powered financial assistant. I can help you track expenses, understand spending patterns, and provide personalized insights. What would you like to know?",
    timestamp: Date.now() - 60000,
  },
];

export const useFinanceStore = create<FinanceState>((set) => ({
  expenses: [],
  alerts: [],
  chatMessages: initialChatMessages,

  setExpenses: (expenses) => set({ expenses }),
  addExpenseLocal: (expense) =>
    set((state) => ({ expenses: [expense, ...state.expenses] })),
  removeExpenseLocal: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((e) => e.id !== id),
    })),

  setAlerts: (alerts) => set({ alerts }),
  dismissAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    })),
  addAlert: (alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts],
    })),

  addChatMessage: (message) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, message],
    })),
  clearChat: () => set({ chatMessages: initialChatMessages }),
}));
