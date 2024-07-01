import axios from 'axios';
import {ExpenseParams} from '../store/expensesSlice';
import {Expense} from '../components/ExpensesOutput';

const BACKEND_URL = 'https://expense-tracker-be-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData: ExpenseParams) {
  const response = await axios.post(BACKEND_URL + '/expense.json', expenseData);
  const id = response.data.name;

  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + '/expense.json');

  const expenses: Expense[] = [];

  for (const key in response.data) {
    const expenseObj: Expense = {
      id: key,
      amount: response.data[key].amount,
      date: response.data[key].date,
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id: string, expenseData: ExpenseParams) {
  return axios.put(BACKEND_URL + `/expense/${id}.json`, expenseData);
}

export function deleteExpense(id: string) {
  return axios.delete(BACKEND_URL + `/expense/${id}.json`);
}
