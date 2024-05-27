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
];

type ExpenseParams = {
  description: string;
  amount: number;
  date: Date;
};

const initialState: Expense[] = DUMMY_EXPENSES;

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

      state = [newExpense, ...state];
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state = state.filter((expense) => expense.id !== action.payload);
    },
    updateExpense: (
      state,
      action: PayloadAction<{
        id: string;
        updatedExpenseProperties: ExpenseParams;
      }>,
    ) => {
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id,
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedExpense: Expense = {
        ...updatableExpense,
        ...action.payload.updatedExpenseProperties,
      };

      state[updatableExpenseIndex] = updatedExpense;
    },
  },
});

export const addExpense = expensesSlice.actions.addExpense;

export const deleteExpense = expensesSlice.actions.deleteExpense;

export const updateExpense = expensesSlice.actions.updateExpense;

export default expensesSlice.reducer;
