import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryCard } from '../../components/HistoryCard';
import { VictoryPie } from 'victory-native';
import { ActivityIndicator } from 'react-native';
import { Container, Header, Title, CategoriesList, ChartContainer, MonthSelect, MonthSelectButton, MonthSelectIcon, Month, LoadingContainer } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { TransactionCardData } from '../../components/TransactionCard';
import { categories } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns/esm';
import { ptBR } from 'date-fns/locale';
import { useAuth } from '../../hooks/auth';

interface CategoryData {
  key: string;
  name: string;
  total: number;
  color: string;
  percent: string;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);

  const { user } = useAuth();

  useFocusEffect(useCallback(() => { loadTransactions() }, [selectedDate]));

  function handleDateChange(action: 'next' | 'previous') {

    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }

  async function loadTransactions() {
    setIsLoading(true);
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const rawTransactions = await AsyncStorage.getItem(dataKey)!;
    const parsedTransactions = rawTransactions ? JSON.parse(rawTransactions) : [];

    const transactions = parsedTransactions
      .filter((transaction: TransactionCardData) =>
        new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
        new Date(transaction.date).getFullYear() === selectedDate.getFullYear()
      );


    const transactionsTotal = transactions
      .reduce((accumulator: number, transaction: TransactionCardData) => {
        return accumulator + Number(transaction.amount);
      }, 0);


    const totalByCategory = [] as CategoryData[];

    categories.forEach(category => {
      let categorySum = 0;

      transactions.forEach((expense: TransactionCardData) => {
        if (expense.category === category.key) {
          categorySum += Number(expense.amount);
        }
      });

      if (categorySum > 0) {

        const percent = `${(categorySum / transactionsTotal * 100).toFixed()}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          color: category.color,
          percent: percent
        });
      };
    })
    setCategoriesData(totalByCategory);

    console.log(totalByCategory)

    setIsLoading(false);
  }



  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <MonthSelect>
        <MonthSelectButton onPress={() => handleDateChange('previous')}>
          <MonthSelectIcon name="chevron-left" />
        </MonthSelectButton>

        <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

        <MonthSelectButton onPress={() => handleDateChange('next')}>
          <MonthSelectIcon name="chevron-right" />
        </MonthSelectButton>

      </MonthSelect>
      {
        isLoading ? <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadingContainer> :
          <CategoriesList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: 20,

            }}
          >

            <ChartContainer>
              <VictoryPie
                data={categoriesData}
                x="total" y="total"
                //colorScale={categoriesData.map(category => category.color)}
                labelRadius={80}
                animate={{ easing: 'exp', duration: 2000 }}
                style={{
                  data: {
                    fill: ({ datum }) => datum.color
                  },
                  labels: {
                    fontSize: RFValue(14),
                    fontWeight: 'bold',
                    fill: theme.colors.shape
                  }
                }}

              />
            </ChartContainer>
            {categoriesData.map((category: CategoryData) => (
              <HistoryCard
                key={category.key}
                title={category.name}
                amount={category.total.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
                color={category.color}
              />
            ))}
          </CategoriesList>
      }


    </Container>
  )
}