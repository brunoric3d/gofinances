import React from 'react';
import { categories } from '../../utils/categories';

import { Container, Title, Amount, Footer, Category, CategoryIcon, CategoryName, Date } from './styles'

interface Category {
  name: string;
  icon: string;
}

export interface TransactionCardData {
  id: string;
  name: string;
  amount: string;
  category: string;
  date: Date;
  type: 'income' | 'expense'
}

interface Props {
  data: TransactionCardData
}

export function TransactionCard({ data }: Props) {
  const [category] = categories.filter(item => item.key === data.category);
  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === 'expense' && '- '}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <CategoryIcon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}