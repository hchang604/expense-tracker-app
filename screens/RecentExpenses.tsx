import React, {useEffect, useState} from 'react';
import ExpensesOutput from '../components/ExpensesOutput';
import {useExpenses} from '../hooks/useExpenses';
import {fetchExpenses} from '../util/http';
import {expensesAdded} from '../store/expensesSlice';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import {useAppDispatch} from '../store/store';

function RecentExpenses() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {recentExpenses} = useExpenses();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      const expenses = await fetchExpenses();
      setIsLoading(false);

      dispatch(expensesAdded(expenses));
    }

    getExpenses();
  }, [dispatch]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
}

export default RecentExpenses;
