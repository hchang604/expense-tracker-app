import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from '../../constants/styles';

type ExpenseItemProps = {
  description: string;
  amount: number;
  date: Date;
};

function ExpenseItem(props: ExpenseItemProps) {
  return (
    <Pressable>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.descriptionText]}>
            {props.description}
          </Text>
          <Text style={styles.textBase}>{props.date.toDateString()}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{props.amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}
export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
});