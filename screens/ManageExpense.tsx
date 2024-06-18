import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {RootStackParamList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import IconButton from '../components/UI/IconButton';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import {GlobalStyles} from '../constants/styles';
import {useAppDispatch} from '../store/store';
import {addExpense, deleteExpense, updateExpense} from '../store/expensesSlice';
import {ExpenseFormData} from '../components/ManageExpense/ExpenseForm';

type ManageExpenseScreen = RouteProp<RootStackParamList, 'ManageExpense'>;

function ManageExpense() {
  const route = useRoute<ManageExpenseScreen>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const dispatch = useAppDispatch();

  function deleteExpenseHandler() {
    dispatch(deleteExpense(editedExpenseId));
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData: ExpenseFormData) {
    if (isEditing) {
      dispatch(
        updateExpense({
          id: editedExpenseId,
          updatedExpenseProperties: expenseData,
        }),
      );
    } else {
      dispatch(addExpense(expenseData));
    }
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEditing, navigation]);

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        isEditing={isEditing}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            handleButtonPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
