import { Advantages, HhData, HTag, P, Product, Sort, Tag } from '../../components';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css'
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReducer } from '../../components/Sort/sort.reducer';

export const TopPageComponent = ({ firstCategory, products, page }: TopPageComponentProps): JSX.Element => {
  const [{products: sortedProducts, sort}, dispatchSort] = useReducer(sortReducer, {products, sort: SortEnum.Rating})
  const setSort = (sort: SortEnum) => {
    dispatchSort({type: sort})
  }

  useEffect(() => {
    dispatchSort({type: 'reset', initialState: products})
  }, [products])
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <HTag tag='h1'>{page.title}</HTag>
        {products && <Tag color='grey' size='m' aria-label={products.length + 'элементов'}>{products.length}</Tag>}
        <Sort sort={sort} setSort={setSort}/>
      </div>
      <div>
        {sortedProducts && sortedProducts.map(p => (<Product layout key={p._id} product={p}/>))}
      </div>
      <div className={styles.hhTitle}>
        <HTag tag='h2'>Ваканции - {page.category}</HTag>
        <Tag color='red' size='m'>hh.ru</Tag>
      </div>
      {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
      {page.advantages && page.advantages.length > 0 && <>
        <HTag tag='h2'>Преимущества</HTag>
        <Advantages advantages={page.advantages} />
      </>}
      {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}}/>}
      <HTag tag='h2'>Получаемые навыки</HTag>
      {page.tags.map(t => <Tag key={t} color='primary'>{t}</Tag>)}
    </div>
  )
}