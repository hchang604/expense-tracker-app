import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getFormattedDate} from '../../util/date';
import {GlobalStyles} from '../../constants/styles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type ExpenseItemProps = {
  description: string;
  amount: number;
  date: Date;
  id: string;
};

function ExpenseItem(props: ExpenseItemProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  function expensePressHandler() {
    navigation.navigate('ManageExpense', {
      expenseId: props.id,
    });
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.descriptionText]}>
            {props.description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(props.date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{props.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}
export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
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
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
});
