import {Expense} from '../components/ExpensesOutput/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const DUMMY_EXPENSES: Expense[] = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 29.89,
    date: new Date('2022-01-15'),
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2021-12-01'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19'),
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2022-02-18'),
  },
  {
    id: 'e6',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2021-12-01'),
  },
  {
    id: 'e7',
    description: 'A book',
    amount: 14.99,
    date: new Date('2021-12-01'),
  },
  {
    id: 'e8',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2022-02-19'),
  },
  {
    id: 'e9',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2022-02-18'),
  },
];

type ExpenseParams = {
  description: string;
  amount: number;
  date: Date;
};

type ExpensesState = {
  expenses: Expense[];
};

const initialState: ExpensesState = {
  expenses: DUMMY_EXPENSES,
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpenseParams>) => {
      const id = new Date().toString() + Math.random().toString();

      const newExpense: Expense = {
        ...action.payload,
        id,
      };

      state.expenses = [newExpense, ...state.expenses];
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload,
      );
    },
    updateExpense: (
      state,
      action: PayloadAction<{
        id: string;
        updatedExpenseProperties: ExpenseParams;
      }>,
    ) => {
      const updatableExpenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id,
      );
      const updatableExpense = state.expenses[updatableExpenseIndex];
      const updatedExpense: Expense = {
        ...updatableExpense,
        ...action.payload.updatedExpenseProperties,
      };

      state.expenses[updatableExpenseIndex] = updatedExpense;
    },
  },
});

export const addExpense = expensesSlice.actions.addExpense;

export const deleteExpense = expensesSlice.actions.deleteExpense;

export const updateExpense = expensesSlice.actions.updateExpense;

export default expensesSlice.reducer;
