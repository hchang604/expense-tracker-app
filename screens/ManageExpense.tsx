import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {RootStackParamList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import IconButton from '../components/UI/IconButton';
import Button from '../components/UI/Button';
import {GlobalStyles} from '../constants/styles';
import {useAppDispatch} from '../store/store';
import {deleteExpense} from '../store/expensesSlice';

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

  function confirmHandler() {
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEditing, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button
          buttonText="Cancel"
          state="flat"
          buttonPressHandler={cancelHandler}
          style={styles.button}
        />
        <Button
          buttonText={isEditing ? 'Update' : 'Add'}
          buttonPressHandler={confirmHandler}
          style={styles.button}
        />
      </View>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
