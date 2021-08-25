import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Button, HTag, Input, P, Rating, Tag, Textarea } from '../components';
import { WithLayout } from '../layout/Layout';
import axios from 'axios'
import { MenuItem } from '../interfaces/menu.interface';
import { Api } from '../helpers/api';

function Home({menu, firstCategory}: HomeProps) {
  const [rating, setRating] = useState<number>(3)
  return (
    <>
      <HTag tag='h1'>syrgak</HTag>
      <Button appearance='primary' arrow='right'>Knopka</Button>
      <Button appearance='ghost' arrow='down'>Knopka</Button>
      <P size='l'>large</P>
      <P>medium</P>
      <P size='s'>small</P>
      <Tag size='s'>small</Tag>
      <Tag size='s' color='primary'>small</Tag>
      <Tag size='m' color='green'>green med</Tag>
      <Tag  color='red'>red</Tag>
      <Rating rating={rating} isEditable setRating={setRating}/>
      <ul>
        {menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
      </ul>
      <Input placeholder='test2'/>
      <Textarea placeholder="textarea placeholder"/>
    </>
  )
}

export default WithLayout(Home)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  const {data: menu} = await axios.post<MenuItem[]>(Api.topPage.find, {
    firstCategory
  })
  return {
    props: {
      menu,
      firstCategory
    }
  }
}

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
}