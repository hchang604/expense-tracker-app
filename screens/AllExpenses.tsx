import React from 'react';
import ExpensesOutput from '../components/ExpensesOutput';
import {useExpenses} from '../hooks/useExpenses';

function AllExpenses() {
  const {allExpenses} = useExpenses();

  return <ExpensesOutput expenses={allExpenses} periodName="Total" />;
}

export default AllExpenses;
