import {Expense} from '../components/ExpensesOutput/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const DUMMY_EXPENSES: Expense[] = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19').toString(),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2022-01-05').toString(),
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2021-12-01').toString(),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19').toString(),
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2022-02-18').toString(),
  },
  {
    id: 'e6',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2022-01-05').toString(),
  },
  {
    id: 'e7',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2021-12-01').toString(),
  },
  {
    id: 'e8',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19').toString(),
  },
  {
    id: 'e9',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2022-02-18').toString(),
  },
];

export type ExpenseParams = {
  description: string;
  amount: number;
  date: string;
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
