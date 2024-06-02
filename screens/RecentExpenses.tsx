import React from 'react';
import ExpensesOutput from '../components/ExpensesOutput';
import {useExpenses} from '../hooks/useExpenses';

function RecentExpenses() {
  const {recentExpenses} = useExpenses();

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
}

export default RecentExpenses;
