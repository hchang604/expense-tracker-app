import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {Expense} from './index';
import ExpenseItem from './ExpenseItem';

type ExpensesListProps = {
  expenses: Expense[];
};

function renderExpenseItem(itemData: ListRenderItemInfo<Expense>) {
  return (
    <ExpenseItem
      description={itemData.item.description}
      amount={itemData.item.amount}
      date={itemData.item.date}
    />
  );
}

function ExpensesList(props: ExpensesListProps) {
  return (
    <FlatList
      data={props.expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
