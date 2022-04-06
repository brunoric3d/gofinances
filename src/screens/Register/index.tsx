import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { InputForm } from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import { useNavigation } from '@react-navigation/native';

import { Container, Header, Title, Form, Fields, TransactionButtonsContainer } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'
import { TransactionCardData } from '../../components/TransactionCard';
import { useAuth } from '../../hooks/auth';

type NavigationProps = {
  navigate: (screen: string) => void;
}

interface Transaction {
  id: string;
  name: string;
  amount: string;
  type: string;
  category: string;
  date: string;
}

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Campo obrigatório'),
  amount: Yup.number()
    .required('Campo obrigatório')
    .positive('Valor deve ser positivo'),
})

export function Register() {

  const { user } = useAuth();

  const dataKey = `@gofinances:transactions_user:${user.id}`;

  const [transactionType, setTransactionType] = useState('');

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const { control, reset, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const navigation = useNavigation<NavigationProps>();


  function handleTransactionTypeSelection(type: 'income' | 'expense' | '') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleSubmitRegister(form: TransactionCardData) {
    if (!transactionType) {
      return Alert.alert('Erro', 'Selecione o tipo da transação');
    }
    if (category.key === 'category') {
      return Alert.alert('Erro', 'Selecione uma categoria');
    }

    const newTransaction: Transaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date().toISOString(),
    }
    try {
      const currentData = await AsyncStorage.getItem(dataKey);
      const parsedData = currentData ? JSON.parse(currentData) : [];
      await AsyncStorage.setItem(dataKey, JSON.stringify([...parsedData, newTransaction]));

      clearFormInputs();

      navigation.navigate('Dashboard');

    } catch (error) {
      Alert.alert('Erro', 'Erro ao registrar transação');
    }
  }

  async function clearFormInputs() {
    reset();
    setTransactionType('');
    setCategory({
      key: 'category',
      name: 'Categoria',
    })
  }



  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <Header>
            <Title>Cadastro</Title>
          </Header>

          <Form>
            <Fields>
              <InputForm
                name="name"
                placeholder='Nome'
                control={control}
                autoCapitalize="sentences"
                autoCorrect={false}
                error={errors.name && errors.name.message}
              />
              <InputForm
                name="amount"
                placeholder='Valor'
                control={control}
                keyboardType="numeric"
                error={errors.amount && errors.amount.message}
              />
              <TransactionButtonsContainer>
                <TransactionTypeButton
                  isActive={transactionType === 'income'}
                  type='income'
                  title='Income'
                  onPress={() => handleTransactionTypeSelection('income')}
                />
                <TransactionTypeButton
                  isActive={transactionType === 'expense'}
                  style={{ marginLeft: 8 }}
                  type='expense'
                  title='Expense'
                  onPress={() => handleTransactionTypeSelection('expense')}
                />

              </TransactionButtonsContainer>

              <CategorySelectButton
                onPress={handleOpenSelectCategoryModal}
                title={category.name}

              />


            </Fields>

            <Button
              title={"Register " + transactionType}
              onPress={handleSubmit(handleSubmitRegister)}
            />
          </Form>
          <Modal visible={categoryModalOpen}>
            <CategorySelect
              category={category}
              setCategory={setCategory}
              closeSelectCategory={handleCloseSelectCategoryModal} />
          </Modal>
        </>


      </TouchableWithoutFeedback>

    </Container>
  )
}