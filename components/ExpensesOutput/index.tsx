import React from 'react';
import {View, StyleSheet} from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import {GlobalStyles} from '../../constants/styles';

export type Expense = {
  id: string;
  amount: number;
  description: string;
  date: Date;
};

type ExpensesOutputProps = {
  periodName: string;
  expenses: Expense[];
};

function ExpensesOutput(props: ExpensesOutputProps) {
  return (
    <View style={styles.container}>
      <ExpensesSummary
        expenses={props.expenses}
        periodName={props.periodName}
      />
      <ExpensesList expenses={props.expenses} />
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
