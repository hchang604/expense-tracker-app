import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {RootStackParamList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type ManageExpenseScreen = RouteProp<RootStackParamList, 'ManageExpense'>;

function ManageExpense() {
  const route = useRoute<ManageExpenseScreen>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEditing, navigation]);

  return (
    <View>
      <Text>Manage Expense</Text>
    </View>
  );
}

export default ManageExpense;
