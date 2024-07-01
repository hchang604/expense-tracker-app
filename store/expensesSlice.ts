import {Expense} from '../components/ExpensesOutput/index';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

/* dummy data for test purposes */
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
    expenseAdded: (state, action: PayloadAction<Expense>) => {
      state.expenses = [action.payload, ...state.expenses];
    },
    expensesAdded: (state, action: PayloadAction<Expense[]>) => {
      const inverted = action.payload.reverse();
      state.expenses = inverted;
    },
    expenseDeleted: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload,
      );
    },
    expenseUpdated: (
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

export const expenseAdded = expensesSlice.actions.expenseAdded;

export const expensesAdded = expensesSlice.actions.expensesAdded;

export const expenseDeleted = expensesSlice.actions.expenseDeleted;

export const expenseUpdated = expensesSlice.actions.expenseUpdated;

export default expensesSlice.reducer;
