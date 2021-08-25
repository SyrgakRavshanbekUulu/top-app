import axios from 'axios'
import { GetStaticProps } from 'next'
import { Api } from '../helpers/api'
import { MenuItem } from '../interfaces/menu.interface'
import { WithLayout } from '../layout/Layout'

const Search = (): JSX.Element => {
  return (
    <>SEarch</>
  )
}

export default WithLayout(Search)

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