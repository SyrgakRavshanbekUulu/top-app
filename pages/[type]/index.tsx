import axios from 'axios'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Api } from '../../helpers/api'
import { firstLevelMenu } from '../../helpers/helpers'
import { MenuItem } from '../../interfaces/menu.interface'
import { WithLayout } from '../../layout/Layout'

const Type = ({firstCategory}: TypeProps): JSX.Element => {
  return (
    <>Type: {firstCategory}</>
  )
}

export default WithLayout(Type)

export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: firstLevelMenu.map(m => '/' + m.route),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<TypeProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params){
    return {
      notFound: true
    }
  }
  const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type)
  if (!firstCategoryItem){
    return {
      notFound: true
    }
  }
  const {data: menu} = await axios.post<MenuItem[]>(Api.topPage.find, {
    firstCategory: firstCategoryItem.id
  })
  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id
    }
  }
}

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
}