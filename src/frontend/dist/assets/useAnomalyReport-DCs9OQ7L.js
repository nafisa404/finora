var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { t as Subscribable, v as shallowEqualObjects, w as hashKey, x as getDefaultState, y as notifyManager, z as useQueryClient, r as reactExports, A as noop, D as shouldThrowError, c as createLucideIcon, u as useFinanceStore } from "./index-B-5eHoNj.js";
import { u as useQuery } from "./useQuery-DY-ZsIeO.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const SEED_EXPENSES = [
  {
    id: 1,
    amount: 124,
    category: "Food & Dining",
    note: "Dinner at Nobu",
    date: Date.now() - 864e5 * 1
  },
  {
    id: 2,
    amount: 30,
    category: "Transportation",
    note: "Uber ride",
    date: Date.now() - 864e5 * 2
  },
  {
    id: 3,
    amount: 35,
    category: "Shopping",
    note: "Amazon order",
    date: Date.now() - 864e5 * 3
  },
  {
    id: 4,
    amount: 280,
    category: "Food & Dining",
    note: "Team lunch (anomaly)",
    date: Date.now() - 864e5 * 4
  },
  {
    id: 5,
    amount: 55,
    category: "Entertainment",
    note: "Netflix + Spotify",
    date: Date.now() - 864e5 * 5
  },
  {
    id: 6,
    amount: 18.5,
    category: "Transportation",
    note: "Metro pass top-up",
    date: Date.now() - 864e5 * 6
  },
  {
    id: 7,
    amount: 92,
    category: "Healthcare",
    note: "Pharmacy",
    date: Date.now() - 864e5 * 7
  },
  {
    id: 8,
    amount: 1200,
    category: "Housing",
    note: "Monthly rent",
    date: Date.now() - 864e5 * 8
  }
];
function useExpenses() {
  const setExpenses = useFinanceStore((s) => s.setExpenses);
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const storeExpenses = useFinanceStore.getState().expenses;
      if (storeExpenses.length > 0) {
        return storeExpenses;
      }
      setExpenses(SEED_EXPENSES);
      return SEED_EXPENSES;
    },
    staleTime: Number.POSITIVE_INFINITY
  });
}
function useAddExpense() {
  const queryClient = useQueryClient();
  const addExpenseLocal = useFinanceStore((s) => s.addExpenseLocal);
  return useMutation({
    mutationFn: async (req) => {
      const newExpense = { ...req, id: Date.now() };
      addExpenseLocal(newExpense);
      return newExpense;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      queryClient.invalidateQueries({ queryKey: ["anomalyReport"] });
    }
  });
}
function useDeleteExpense() {
  const queryClient = useQueryClient();
  const removeExpenseLocal = useFinanceStore((s) => s.removeExpenseLocal);
  return useMutation({
    mutationFn: async (id) => {
      removeExpenseLocal(id);
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      queryClient.invalidateQueries({ queryKey: ["anomalyReport"] });
    }
  });
}
const DAILY_SPEND_LIMIT = 200;
function detectHighAmountAnomaly(expense, averageExpense) {
  if (averageExpense <= 0) return null;
  if (expense.amount > averageExpense * 2) {
    return {
      id: `anomaly-high-${expense.id}`,
      type: "anomaly",
      severity: "critical",
      title: "Unusual High Expense Detected",
      message: `$${expense.amount.toFixed(2)} in ${expense.category} is more than 2× your average ($${averageExpense.toFixed(2)})`,
      timestamp: expense.date
    };
  }
  return null;
}
function detectCategorySpike(comparison) {
  if (comparison.priorMonthTotal <= 0) return null;
  if (comparison.percentChange > 30) {
    return {
      id: `category-spike-${comparison.category.replace(/\s+/g, "-").toLowerCase()}`,
      type: "category_spike",
      severity: "warning",
      title: `${comparison.category} Spending Increased`,
      message: `Your ${comparison.category} spending increased by ${comparison.percentChange.toFixed(0)}% compared to last month`,
      timestamp: Date.now()
    };
  }
  return null;
}
function detectDailyOverspend(dailyTotal, dayLabel) {
  if (dailyTotal > DAILY_SPEND_LIMIT) {
    return {
      id: `daily-overspend-${dayLabel}`,
      type: "daily_overspend",
      severity: "warning",
      title: "You Are Overspending Today",
      message: `Daily spending of $${dailyTotal.toFixed(2)} exceeds the $${DAILY_SPEND_LIMIT} limit`,
      timestamp: Date.now()
    };
  }
  return null;
}
function generateAlertsFromReport(expenses, averageExpense, categoryComparisons, dailySpending) {
  const alerts = [];
  for (const expense of expenses) {
    const alert = detectHighAmountAnomaly(expense, averageExpense);
    if (alert) alerts.push(alert);
  }
  for (const comparison of categoryComparisons) {
    const alert = detectCategorySpike(comparison);
    if (alert) alerts.push(alert);
  }
  const today = dailySpending[dailySpending.length - 1];
  if (today) {
    const alert = detectDailyOverspend(today.total, today.dayLabel);
    if (alert) alerts.push(alert);
  }
  return alerts;
}
const SEED_REPORT = {
  averageExpense: 88.5,
  expenseAnomalies: [
    {
      expenseId: 4,
      amount: 280,
      category: "Food & Dining",
      date: Date.now() - 864e5 * 4,
      isHighAmount: true
    },
    {
      expenseId: 8,
      amount: 1200,
      category: "Housing",
      date: Date.now() - 864e5 * 8,
      isHighAmount: true
    }
  ],
  categoryComparisons: [
    {
      category: "Food & Dining",
      currentMonthTotal: 454,
      priorMonthTotal: 280,
      percentChange: 62
    },
    {
      category: "Entertainment",
      currentMonthTotal: 55,
      priorMonthTotal: 45,
      percentChange: 22
    },
    {
      category: "Transportation",
      currentMonthTotal: 48.5,
      priorMonthTotal: 60,
      percentChange: -19
    }
  ],
  dailySpending: [
    { dayLabel: "Mon", date: Date.now() - 864e5 * 6, total: 18.5 },
    { dayLabel: "Tue", date: Date.now() - 864e5 * 5, total: 55 },
    { dayLabel: "Wed", date: Date.now() - 864e5 * 4, total: 280 },
    { dayLabel: "Thu", date: Date.now() - 864e5 * 3, total: 35 },
    { dayLabel: "Fri", date: Date.now() - 864e5 * 2, total: 30 },
    { dayLabel: "Sat", date: Date.now() - 864e5 * 1, total: 124 },
    { dayLabel: "Sun", date: Date.now(), total: 92 }
  ]
};
function useAnomalyReport() {
  const { data: expenses = [] } = useExpenses();
  const setAlerts = useFinanceStore((s) => s.setAlerts);
  const query = useQuery({
    queryKey: ["anomalyReport"],
    queryFn: async () => SEED_REPORT,
    staleTime: Number.POSITIVE_INFINITY
  });
  reactExports.useEffect(() => {
    if (query.data && expenses.length > 0) {
      const alerts = generateAlertsFromReport(
        expenses,
        query.data.averageExpense,
        query.data.categoryComparisons,
        query.data.dailySpending
      );
      setAlerts(alerts);
    }
  }, [query.data, expenses, setAlerts]);
  return query;
}
export {
  TriangleAlert as T,
  Zap as Z,
  useAnomalyReport as a,
  useAddExpense as b,
  useDeleteExpense as c,
  generateAlertsFromReport as g,
  useExpenses as u
};
