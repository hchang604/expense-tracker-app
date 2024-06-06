import React, {useState} from 'react';
import Input from './Input';
import {StyleSheet, Text, View} from 'react-native';

type ExpenseForm = {
  amount: string;
  date: string;
  description: string;
};

function ExpenseForm() {
  const [inputValues, setInputValues] = useState<ExpenseForm>({
    amount: '',
    date: '',
    description: '',
  });

  function inputChangedHandler(
    inputIdentifier: keyof ExpenseForm,
    enteredAmount: string,
  ) {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredAmount,
      };
    });
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
            value: inputValues.amount,
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
});
