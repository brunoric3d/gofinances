import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HightlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardData } from '../../components/TransactionCard';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { format } from 'date-fns';

import { LoadingContainer, LogoutButton, Transactions, Title, CardsSlider, Avatar, Container, Greeting, GreetingBox, Header, UserWrapper, PowerIcon, UserBox, UserName, TransactionsList } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

interface HighlightCardProps {
  total: string;
  lastTransaction: string;
}

interface HighlightCardData {
  incomes: HighlightCardProps;
  expenses: HighlightCardProps;
  balance: HighlightCardProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionCardData[]>([]);
  const [highlightCardData, setHighlightCardData] = useState<HighlightCardData>();

  const theme = useTheme();

  const { signOut, user } = useAuth();

  const [firstName, secondName] = user.name.split(' ');

  const dataKey = `@gofinances:transactions_user:${user.id}`;

  useFocusEffect(useCallback(() => { loadTransactions() }, []));

  let incomesTotal = 0;
  let expensesTotal = 0;

  async function loadTransactions() {
    //await AsyncStorage.setItem(dataKey, JSON.stringify([]));
    const rawTransactions = await AsyncStorage.getItem(dataKey)!;
    const parsedTransactions = rawTransactions ? JSON.parse(rawTransactions) : [];
    const formattedTransactions: TransactionCardData[] = parsedTransactions.map(
      (transaction: TransactionCardData) => {

        if (transaction.type === 'income') { incomesTotal = Number(transaction.amount); }
        if (transaction.type === 'expense') { expensesTotal = Number(transaction.amount); }


        const amount = Number(transaction.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',

        });
        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(transaction.date));

        return {
          id: transaction.id,
          name: transaction.name,
          amount,
          type: transaction.type,
          category: transaction.category,
          date,
        }

      });

    setTransactions(formattedTransactions);

    if (formattedTransactions.length < 1) { return setIsLoading(false); }

    const balanceTotal = incomesTotal - expensesTotal;

    function getLastTransaction(
      collection: TransactionCardData[],
      type?: 'income' | 'expense'
    ) {

      const lastTransaction = new Date(
        Math.max.apply(Math, collection
          .filter(transaction => type ? transaction.type === type : transaction)
          .map(transaction => new Date(transaction.date).getTime())))

      if (typeof lastTransaction === Object.getPrototypeOf(Date)) {
        return lastTransaction
      } else {
        return undefined
      }

    }

    const lastIncomeTransaction = getLastTransaction(parsedTransactions, 'income');
    const lastExpenseTransaction = getLastTransaction(parsedTransactions, 'expense');
    const balanceTransactionsRange = `De 01 / ${format(new Date(), 'MM')} à ${format(new Date(), 'dd/MM')}`;

    console.log(lastIncomeTransaction);
    console.log(lastExpenseTransaction);

    setHighlightCardData({
      incomes: {
        total: incomesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastIncomeTransaction ?
          `Última entrada dia ${format(lastIncomeTransaction, 'PPP')}`
          : 'Nenhuma transação',
      },
      expenses: {
        total: expensesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastExpenseTransaction ?
          `Última saída dia ${format(lastExpenseTransaction, 'PPP')}`
          : 'Nenhuma transação',
      },
      balance: {
        total: balanceTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: balanceTransactionsRange ?
          balanceTransactionsRange
          : 'Nenhuma transação',
      },
    });

    setIsLoading(false);
  }




  return (
    <Container>

      {
        isLoading ? <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadingContainer> :
          <>
            <Header>
              <UserWrapper>
                <UserBox>
                  <Avatar source={{ uri: user.avatar }} />
                  <GreetingBox>
                    <Greeting>Olá,</Greeting>
                    <UserName>{firstName + ' ' + secondName}</UserName>
                  </GreetingBox>
                </UserBox>
                <LogoutButton onPress={signOut}>
                  <PowerIcon name="power" />
                </LogoutButton>

              </UserWrapper>
            </Header>
            <CardsSlider>
              <HightlightCard
                title='Entradas'
                amount={highlightCardData?.incomes?.total || '0,00'}
                lastTransaction={highlightCardData?.incomes.lastTransaction}
                type='up'
              />
              <HightlightCard
                title='Saídas'
                amount={highlightCardData?.expenses?.total || '0,00'}
                lastTransaction={highlightCardData?.expenses.lastTransaction}
                type='down'
              />
              <HightlightCard
                title='Total'
                amount={highlightCardData?.balance?.total || '0,00'}
                lastTransaction={highlightCardData?.balance.lastTransaction}
                type='total'
              />
            </CardsSlider>
            <Transactions>
              <Title>Transações</Title>
              <TransactionsList

                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard data={item} />

                } />
            </Transactions>
          </>}
    </Container >
  )
}