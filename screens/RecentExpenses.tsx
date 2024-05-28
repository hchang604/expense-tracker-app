import React from 'react';
import ExpensesOutput from '../components/ExpensesOutput';
import {useExpenses} from '../hooks/useExpenses';

function RecentExpenses() {
  const {recentExpenses} = useExpenses();

  return <ExpensesOutput expenses={recentExpenses} periodName="Last 7 Days" />;
}

export default RecentExpenses;
