import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import {GlobalStyles} from '../../constants/styles';

export type Expense = {
  id: string;
  amount: number;
  description: string;
  date: string;
};

type ExpensesOutputProps = {
  periodName: string;
  expenses: Expense[];
  fallbackText: string;
};

function ExpensesOutput(props: ExpensesOutputProps) {
  let content = <Text style={styles.infoText}>{props.fallbackText}</Text>;

  if (props.expenses.length > 0) {
    content = <ExpensesList expenses={props.expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary
        expenses={props.expenses}
        periodName={props.periodName}
      />
      {content}
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
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
