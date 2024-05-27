import React from 'react';
import {View, StyleSheet} from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import {DUMMY_EXPENSES} from '../../store/expensesSlice';
import {GlobalStyles} from '../../constants/styles';

export type Expense = {
  id: string;
  amount: number;
  description: string;
  date: Date;
};

type ExpensesOutputProps = {
  periodName: string;
};

function ExpensesOutput(props: ExpensesOutputProps) {
  return (
    <View style={styles.container}>
      <ExpensesSummary
        expenses={DUMMY_EXPENSES}
        periodName={props.periodName}
      />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
