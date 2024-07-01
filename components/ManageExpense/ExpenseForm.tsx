import React, {useState} from 'react';
import Input from './Input';
import Button from '../UI/Button';
import {StyleSheet, Text, View} from 'react-native';
import {ExpenseParams} from '../../store/expensesSlice';
import {getFormattedDate} from '../../util/date';
import {GlobalStyles} from '../../constants/styles';

type ExpenseFormProps = {
  onCancel: () => void;
  onSubmit: (expenseData: ExpenseParams) => void;
  isEditing: boolean;
  defaultValues: ExpenseParams | undefined;
};

type ExpenseFormInputs = {
  amount: {
    value: number;
    isValid: boolean;
  };
  date: {
    value: string;
    isValid: boolean;
  };
  description: {
    value: string;
    isValid: boolean;
  };
};

function ExpenseForm(props: ExpenseFormProps) {
  const [inputValues, setInputValues] = useState<ExpenseFormInputs>({
    amount: {
      value: props.defaultValues?.amount ?? 0,
      isValid: true,
    },
    date: {
      value: props.defaultValues
        ? getFormattedDate(new Date(Date.parse(props.defaultValues.date)))
        : new Date().toISOString().slice(0, 10),
      isValid: true,
    },
    description: {
      value: props.defaultValues?.description ?? '',
      isValid: true,
    },
  });

  function inputChangedHandler(
    inputIdentifier: keyof ExpenseFormInputs,
    enteredValue: string,
  ) {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: {
          value: enteredValue,
          isValid: true,
        },
      };
    });
  }

  function submitHandler() {
    const expenseData: ExpenseParams = {
      /*
       * parseFloat used here because <TextInput /> component takes string value only (line 26).
       * but amount property takes number type
       */
      amount: parseFloat(inputValues.amount.value as unknown as string),
      date: new Date(inputValues.date.value).toString(),
      description: inputValues.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputValues((currInput) => {
        return {
          amount: {value: currInput.amount.value, isValid: amountIsValid},
          date: {value: currInput.date.value, isValid: dateIsValid},
          description: {
            value: currInput.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    props.onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          inputContainerStyles={styles.rowInput}
          label="Amount"
          isInvalid={!inputValues.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(null, 'amount'),
            value: inputValues.amount.value.toString(),
          }}
        />
        <Input
          inputContainerStyles={styles.rowInput}
          label="Date"
          isInvalid={!inputValues.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(null, 'date'),
            value: inputValues.date.value,
          }}
        />
      </View>

      <Input
        label="Description"
        isInvalid={!inputValues.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(null, 'description'),
          value: inputValues.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data
        </Text>
      )}
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
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
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
