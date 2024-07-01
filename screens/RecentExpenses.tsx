import React, {useEffect} from 'react';
import ExpensesOutput from '../components/ExpensesOutput';
import {useExpenses} from '../hooks/useExpenses';
import {fetchExpenses} from '../util/http';
import {expensesAdded} from '../store/expensesSlice';
import {useAppDispatch} from '../store/store';

function RecentExpenses() {
  const {recentExpenses} = useExpenses();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses();

      dispatch(expensesAdded(expenses));
    }

    getExpenses();
  }, [dispatch]);

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
}

export default RecentExpenses;
