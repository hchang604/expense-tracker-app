import {useAppSelector} from '../store/store';
import {getDateMinusDays} from '../util/date';

export const useExpenses = () => {
  const allExpenses = useAppSelector((state) => state.expenses.expenses);
  const recentExpenses = allExpenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  return {
    allExpenses,
    recentExpenses,
  };
};
