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
      date={new Date(Date.parse(itemData.item.date))}
      id={itemData.item.id}
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
