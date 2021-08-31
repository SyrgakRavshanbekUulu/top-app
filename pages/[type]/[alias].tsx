import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { WithLayout } from '../../layout/Layout';
import axios from 'axios'
import { MenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategory, TopPageModel } from '../../interfaces/page.interface';
import { ParsedUrlQuery } from 'node:querystring';
import { ProductModel } from '../../interfaces/product.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import { TopPageComponent } from '../../pages-components';
import { Api } from '../../helpers/api';
import Head from 'next/head';

function TopPage({firstCategory, page, products}: TopPageProps) {
  return (
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta name='description' content={page.metaDescription} />
        <meta property='og:title' content={page.metaTitle} />
        <meta property='og:description' content={page.metaDescription} />
        <meta property='ot:type' content='article' />
      </Head>
      <TopPageComponent products={products} page={page} firstCategory={firstCategory} />
    </>
  )
}

export default WithLayout(TopPage)

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = []

  for (const m of firstLevelMenu) {
    const {data: menu} = await axios.post<MenuItem[]>(Api.topPage.find, {
      firstCategory: m.id
    })
    paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)))
  }

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<TopPageProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
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
  try {
    const {data: menu} = await axios.post<MenuItem[]>(Api.topPage.find, {
      firstCategory: firstCategoryItem.id
    })
    if (menu.length == 0) {
      return {
        notFound: true
      }
    }
    const {data: page} = await axios.get<TopPageModel>(Api.topPage.byAllias + params.alias)
    const {data: products} = await axios.post<ProductModel[]>(Api.product.find, {
      category: page.category,
      limit: 10
    })
    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products
      }
    }
  } catch {
    return {
      notFound: true
    }
  }
  
}

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: TopLevelCategory
  page: TopPageModel
  products: ProductModel[]
}

