import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {RootStackParamList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import IconButton from '../components/UI/IconButton';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import {GlobalStyles} from '../constants/styles';
import {store, useAppDispatch} from '../store/store';
import {deleteExpense, storeExpense, updateExpense} from '../util/http';
import {
  ExpenseParams,
  expenseAdded,
  expenseDeleted,
  expenseUpdated,
} from '../store/expensesSlice';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

type ManageExpenseScreen = RouteProp<RootStackParamList, 'ManageExpense'>;

function ManageExpense() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const route = useRoute<ManageExpenseScreen>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const selectedExpense = store
    .getState()
    .expenses.expenses.find((expense) => expense.id === editedExpenseId);
  const dispatch = useAppDispatch();

  function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      dispatch(expenseDeleted(editedExpenseId));
      deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense! Please try again later!');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData: ExpenseParams) {
    setIsSubmitting(true);
    if (isEditing) {
      try {
        dispatch(
          expenseUpdated({
            id: editedExpenseId,
            updatedExpenseProperties: expenseData,
          }),
        );
        updateExpense(editedExpenseId, expenseData);
      } catch (error) {
        setError('Could not save data! Please try again later!');
        setIsSubmitting(false);
      }
    } else {
      const id = await storeExpense(expenseData);
      dispatch(
        expenseAdded({
          ...expenseData,
          id,
        }),
      );
    }
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEditing, navigation]);

  const handleErrorOverlayDismiss = () => {
    setError(null);
  };

  if (error && !isSubmitting) {
    return (
      <ErrorOverlay message={error} onConfirm={handleErrorOverlayDismiss} />
    );
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        isEditing={isEditing}
        defaultValues={selectedExpense}
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
