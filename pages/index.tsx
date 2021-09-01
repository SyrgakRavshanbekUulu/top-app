import { GetStaticProps } from 'next';
import { WithLayout } from '../layout/Layout';
import axios from 'axios'
import { MenuItem } from '../interfaces/menu.interface';
import { Api } from '../helpers/api';
import React from 'react';
import { HTag } from '../components';

function Home({ menu, firstCategory }: HomeProps) {
  return (
    <div>
      <HTag tag='h1'>Welcome to Top</HTag>
    </div>
  )
}

export default WithLayout(Home)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem[]>(Api.topPage.find, {
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