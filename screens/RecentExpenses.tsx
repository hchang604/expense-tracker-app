import React, {useEffect, useState} from 'react';
import ExpensesOutput from '../components/ExpensesOutput';
import {useExpenses} from '../hooks/useExpenses';
import {fetchExpenses} from '../util/http';
import {expensesAdded} from '../store/expensesSlice';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import {useAppDispatch} from '../store/store';

function RecentExpenses() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const {recentExpenses} = useExpenses();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        dispatch(expensesAdded(expenses));
      } catch (error) {
        setError('Could not fetch expenses!');
      }
      setIsLoading(false);
    }

    getExpenses();
  }, [dispatch]);

  const handleErrorOverlayDismiss = () => {
    setError(null);
  };

  if (error && !isLoading) {
    return (
      <ErrorOverlay message={error} onConfirm={handleErrorOverlayDismiss} />
    );
  }

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
