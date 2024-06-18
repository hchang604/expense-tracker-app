import React, {useState} from 'react';
import Input from './Input';
import Button from '../UI/Button';
import {StyleSheet, Text, View} from 'react-native';

export type ExpenseFormData = {
  amount: number;
  date: string;
  description: string;
};

type ExpenseFormProps = {
  onCancel: () => void;
  onSubmit: (expenseData: ExpenseFormData) => void;
  isEditing: boolean;
};

function ExpenseForm(props: ExpenseFormProps) {
  const [inputValues, setInputValues] = useState<ExpenseFormData>({
    amount: 0,
    date: '',
    description: '',
  });

  function inputChangedHandler(
    inputIdentifier: keyof ExpenseFormData,
    enteredAmount: string,
  ) {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredAmount,
      };
    });
  }

  function submitHandler() {
    const expenseData: ExpenseFormData = {
      amount: inputValues.amount,
      date: new Date(inputValues.date).toString(),
      description: inputValues.description,
    };

    props.onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          inputContainerStyles={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(null, 'amount'),
            value: inputValues.amount.toString(),
          }}
        />
        <Input
          inputContainerStyles={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(null, 'date'),
            value: inputValues.date,
          }}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(null, 'description'),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttons}>
        <Button
          buttonText="Cancel"
          state="flat"
          buttonPressHandler={props.onCancel}
          style={styles.button}
        />
        <Button
          buttonText={props.isEditing ? 'Update' : 'Add'}
          buttonPressHandler={submitHandler}
          style={styles.button}
        />
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
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
});
