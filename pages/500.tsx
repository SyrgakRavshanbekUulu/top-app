import React from 'react'
import { HTag } from '../components'
import { WithLayout } from '../layout/Layout'

function Error500(): JSX.Element {
  return (
    <>
      <HTag tag='h1'>Ошибка 500</HTag>
    </>
  )
}

export default WithLayout(Error500)